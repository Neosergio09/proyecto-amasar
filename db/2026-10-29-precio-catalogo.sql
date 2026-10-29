-- crear_pedido_con_stock usa el precio del catálogo (productos.precio) en lugar
-- del que envía el navegador; el total y los detalles guardados salen de ahí.
-- Aplicado el 2026-10-29 vía MCP (reemplaza la versión de 2026-10-28-pedidos-vendedores.sql).
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
  v_detalles jsonb := '[]'::jsonb;
  v_qty int;
  v_precio numeric;
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
    v_qty := coalesce((item->>'cantidad')::int, 0);
    if v_qty <= 0 then
      raise exception 'Cantidad inválida';
    end if;

    -- Precio del catálogo: se ignora el que envía el navegador
    update public.productos
    set stock_cantidad = stock_cantidad - v_qty
    where id = (item->>'id')::uuid
    returning precio into v_precio;
    if not found then
      raise exception 'Producto no encontrado';
    end if;

    v_detalles := v_detalles || jsonb_build_array(
      jsonb_build_object('id', item->>'id', 'cantidad', v_qty, 'precio', v_precio)
    );
    v_total := v_total + v_qty * v_precio;
  end loop;

  insert into public.pedidos (cliente_id, vendedor_id, total, detalles, tag_rastreo, estado)
  values (p_cliente_id, v_vendedor, v_total, v_detalles, p_tag_rastreo, 'Preparación');

  if p_cliente_id is not null then
    update public.clientes set ultima_compra_at = now() where id = p_cliente_id;
  end if;

  return json_build_object('success', true, 'total', v_total);
end;
$$;
