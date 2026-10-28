-- Endurecimiento de seguridad (BD compartida con el ERP proyecto-amasar)
-- Puntos: 1) escalada de rol en perfiles, 3) subidas anónimas a Storage,
--         4) RLS en recetas / receta_ingredientes, 5) handle_new_user expuesta por RPC

begin;

-- 1. PERFILES: nadie puede cambiar su propio rol ---------------------------------
-- Antes: UPDATE con using (auth.uid() = id) sin with check y sobre todas las columnas.
-- Ahora: cada usuario edita solo nombre y teléfono de su fila. El rol se cambia
-- desde el dashboard de Supabase o con service_role.
drop policy if exists edicion_propia on public.perfiles;

create policy edicion_propia on public.perfiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

revoke update on public.perfiles from anon, authenticated;
grant update (nombre, telefono) on public.perfiles to authenticated;

-- 3. STORAGE: solo admins suben imágenes ------------------------------------------
drop policy if exists "ver y subir productos 1hmvp5f_0" on storage.objects; -- INSERT público en 'productos'
drop policy if exists "prueba 1lb6ppj_1" on storage.objects;                -- INSERT público en 'imagenes-productos'
drop policy if exists "Permitir subida a autenticados" on storage.objects;  -- INSERT de cualquier autenticado

create policy "productos_subida_admin" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'productos'
    and (select rol from public.perfiles where id = (select auth.uid())) = 'admin'
  );

-- 4. RECETAS: activar RLS -----------------------------------------------------------
-- Lectura para usuarios autenticados (execute_production_order corre como el llamador),
-- escritura solo admin. Sin acceso anónimo.
alter table public.recetas enable row level security;
alter table public.receta_ingredientes enable row level security;

create policy recetas_lectura_auth on public.recetas
  for select to authenticated using (true);

create policy recetas_gestion_admin on public.recetas
  for all to authenticated
  using ((select rol from public.perfiles where id = (select auth.uid())) = 'admin')
  with check ((select rol from public.perfiles where id = (select auth.uid())) = 'admin');

create policy receta_ingredientes_lectura_auth on public.receta_ingredientes
  for select to authenticated using (true);

create policy receta_ingredientes_gestion_admin on public.receta_ingredientes
  for all to authenticated
  using ((select rol from public.perfiles where id = (select auth.uid())) = 'admin')
  with check ((select rol from public.perfiles where id = (select auth.uid())) = 'admin');

-- 5. FUNCIONES ------------------------------------------------------------------------
-- handle_new_user es un trigger: no necesita EXECUTE para dispararse.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
alter function public.handle_new_user() set search_path = '';

-- search_path fijo (lint 0011). crear_pedido_con_stock ya califica todo con public.;
-- execute_production_order usa nombres sin esquema, por eso 'public'.
alter function public.crear_pedido_con_stock(text, bigint, text, numeric, jsonb) set search_path = '';
alter function public.crear_pedido_con_stock(text, uuid, text, numeric, jsonb, uuid) set search_path = '';
alter function public.execute_production_order(uuid, numeric) set search_path = public;

commit;
