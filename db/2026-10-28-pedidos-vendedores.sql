-- Pedidos de vendedores: crear, editar y cancelar con stock correcto.
-- Las funciones son SECURITY DEFINER porque tocan productos (stock) y clientes,
-- que el vendedor no puede modificar directamente; por eso cada una valida
-- el rol y que el pedido sea del vendedor antes de hacer nada.

begin;

-- 1. La versión vieja (ids bigint, columnas que ya no existen) no la usa la app.
drop function if exists public.crear_pedido_con_stock(text, bigint, text, numeric, jsonb);

-- 2. Crear pedido: el vendedor siempre queda como dueño y el stock sí se descuenta.
create or replace function public.crear_pedido_con_stock(
  p_cliente_nombre text,
  p_cliente_id uuid,
  p_tag_rastreo text,
  p_total numeric,
  p_detalles jsonb,
  p_vendedor_id uuid
)
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_rol text;
  v_vendedor uuid;
  v_total numeric := 0;
  item jsonb;
begin
  select rol into v_rol from public.perfiles where id = v_uid;
  if v_rol is null or v_rol not in ('admin', 'vendedor') then
    raise exception 'No autorizado';
  end if;

  -- Un vendedor solo registra pedidos a su nombre
  v_vendedor := case when v_rol = 'admin' then coalesce(p_vendedor_id, v_uid) else v_uid end;

  if jsonb_typeof(p_detalles) <> 'array' or jsonb_array_length(p_detalles) = 0 then
    raise exception 'El pedido no tiene productos';
  end if;

  for item in select * from jsonb_array_elements(p_detalles)
  loop
    if coalesce((item->>'cantidad')::int, 0) <= 0 then
      raise exception 'Cantidad inválida';
    end if;
    v_total := v_total + (item->>'cantidad')::int * coalesce((item->>'precio')::numeric, 0);

    update public.productos
    set stock_cantidad = stock_cantidad - (item->>'cantidad')::int
    where id = (item->>'id')::uuid;
  end loop;

  insert into public.pedidos (cliente_id, vendedor_id, total, detalles, tag_rastreo, estado)
  values (p_cliente_id, v_vendedor, v_total, p_detalles, p_tag_rastreo, 'Preparación');

  if p_cliente_id is not null then
    update public.clientes set ultima_compra_at = now() where id = p_cliente_id;
  end if;

  return json_build_object('success', true);
end;
$$;

-- 3. Editar cantidades: devuelve el stock anterior y descuenta el nuevo.
create or replace function public.editar_pedido(p_pedido_id uuid, p_detalles jsonb)
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_rol text;
  v_pedido public.pedidos;
  v_nuevos jsonb := '[]'::jsonb;
  v_total numeric := 0;
  v_linea jsonb;
  v_qty int;
  v_qty_antes int;
  v_precio numeric;
  v_stock int;
  v_nombre text;
  item jsonb;
begin
  select rol into v_rol from public.perfiles where id = v_uid;
  if v_rol is null or v_rol not in ('admin', 'vendedor') then
    raise exception 'No autorizado';
  end if;

  select * into v_pedido from public.pedidos where id = p_pedido_id for update;
  if not found or (v_rol <> 'admin' and v_pedido.vendedor_id is distinct from v_uid) then
    raise exception 'Pedido no encontrado';
  end if;
  if v_pedido.estado in ('Cancelado', 'Entregado') then
    raise exception 'El pedido ya está % y no se puede editar', lower(v_pedido.estado);
  end if;

  -- Devolver al stock lo que tenía el pedido
  for item in select * from jsonb_array_elements(coalesce(v_pedido.detalles, '[]'::jsonb))
  loop
    update public.productos
    set stock_cantidad = stock_cantidad + coalesce((item->>'cantidad')::int, (item->>'qty')::int, 0)
    where id = (item->>'id')::uuid;
  end loop;

  -- Aplicar las cantidades nuevas
  for item in select * from jsonb_array_elements(p_detalles)
  loop
    v_qty := coalesce((item->>'cantidad')::int, 0);
    if v_qty < 0 then
      raise exception 'Cantidad inválida';
    end if;
    continue when v_qty = 0;

    -- Línea original (conserva su precio); si no existía, precio actual del producto
    select o into v_linea
    from jsonb_array_elements(coalesce(v_pedido.detalles, '[]'::jsonb)) o
    where o->>'id' = item->>'id'
    limit 1;
    v_qty_antes := coalesce((v_linea->>'cantidad')::int, (v_linea->>'qty')::int, 0);

    select stock_cantidad, nombre, coalesce((v_linea->>'precio')::numeric, (v_linea->>'price')::numeric, precio)
    into v_stock, v_nombre, v_precio
    from public.productos
    where id = (item->>'id')::uuid
    for update;
    if not found then
      raise exception 'Producto no encontrado';
    end if;
    if v_qty > v_qty_antes and v_qty > v_stock then
      raise exception 'Stock insuficiente para %: quedan % uds', v_nombre, v_stock;
    end if;

    update public.productos set stock_cantidad = stock_cantidad - v_qty where id = (item->>'id')::uuid;

    v_nuevos := v_nuevos || jsonb_build_array(
      (coalesce(v_linea, '{}'::jsonb) - 'qty' - 'price')
      || jsonb_build_object('id', item->>'id', 'cantidad', v_qty, 'precio', v_precio)
    );
    v_total := v_total + v_qty * v_precio;
  end loop;

  if jsonb_array_length(v_nuevos) = 0 then
    raise exception 'El pedido quedó sin productos: cancélalo en lugar de editarlo';
  end if;

  update public.pedidos set detalles = v_nuevos, total = v_total where id = p_pedido_id;

  return json_build_object('success', true, 'total', v_total);
end;
$$;

-- 4. Cancelar: devuelve el stock y marca el pedido como Cancelado.
create or replace function public.cancelar_pedido(p_pedido_id uuid)
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_rol text;
  v_pedido public.pedidos;
  item jsonb;
begin
  select rol into v_rol from public.perfiles where id = v_uid;
  if v_rol is null or v_rol not in ('admin', 'vendedor') then
    raise exception 'No autorizado';
  end if;

  select * into v_pedido from public.pedidos where id = p_pedido_id for update;
  if not found or (v_rol <> 'admin' and v_pedido.vendedor_id is distinct from v_uid) then
    raise exception 'Pedido no encontrado';
  end if;
  if v_pedido.estado in ('Cancelado', 'Entregado') then
    raise exception 'El pedido ya está % y no se puede cancelar', lower(v_pedido.estado);
  end if;

  for item in select * from jsonb_array_elements(coalesce(v_pedido.detalles, '[]'::jsonb))
  loop
    update public.productos
    set stock_cantidad = stock_cantidad + coalesce((item->>'cantidad')::int, (item->>'qty')::int, 0)
    where id = (item->>'id')::uuid;
  end loop;

  update public.pedidos set estado = 'Cancelado' where id = p_pedido_id;

  return json_build_object('success', true);
end;
$$;

-- 5. Solo usuarios con sesión (la función valida además el rol)
revoke execute on function public.crear_pedido_con_stock(text, uuid, text, numeric, jsonb, uuid) from public, anon;
revoke execute on function public.editar_pedido(uuid, jsonb) from public, anon;
revoke execute on function public.cancelar_pedido(uuid) from public, anon;
grant execute on function public.crear_pedido_con_stock(text, uuid, text, numeric, jsonb, uuid) to authenticated;
grant execute on function public.editar_pedido(uuid, jsonb) to authenticated;
grant execute on function public.cancelar_pedido(uuid) to authenticated;

-- 6. Los vendedores pueden registrar clientes nuevos a su nombre
create policy clientes_insercion_vendedor on public.clientes
  for insert to authenticated
  with check (vendedor_id = (select auth.uid()));

commit;
