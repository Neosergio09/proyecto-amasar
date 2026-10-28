-- Tabla contactos (formulario público) y rastreo de pedidos sin exponer la tabla pedidos
-- BD compartida con el ERP proyecto-amasar.

begin;

-- CONTACTOS ---------------------------------------------------------------------------
-- Inserción pública (formulario /contacto); lectura y gestión solo admin.
-- Los checks hacen de validación del lado del servidor, ya que el insert va directo desde el navegador.
create table public.contactos (
  id uuid primary key default gen_random_uuid(),
  creado_en timestamptz not null default now(),
  tipo_cliente text not null check (tipo_cliente in ('Panaderia', 'Empresa', 'Particular')),
  panaderia_nombre text not null check (char_length(panaderia_nombre) between 2 and 120),
  contacto_nombre text not null check (char_length(contacto_nombre) between 2 and 120),
  whatsapp text not null check (whatsapp ~ '^3[0-9]{9}$'),
  interes_producto text check (char_length(interes_producto) <= 60),
  mensaje text check (char_length(mensaje) <= 2000)
);

create index contactos_creado_en_idx on public.contactos (creado_en desc);

alter table public.contactos enable row level security;

grant insert on public.contactos to anon, authenticated;
grant select, update, delete on public.contactos to authenticated;

create policy contactos_insercion_publica on public.contactos
  for insert to anon, authenticated
  with check (true);

create policy contactos_gestion_admin on public.contactos
  for all to authenticated
  using ((select rol from public.perfiles where id = (select auth.uid())) = 'admin')
  with check ((select rol from public.perfiles where id = (select auth.uid())) = 'admin');

-- RASTREO -----------------------------------------------------------------------------
-- Antes: cualquiera podía leer todos los pedidos con tag (OR tag_rastreo IS NOT NULL).
-- Ahora: la tabla solo la leen el vendedor dueño y los admins; el público usa esta función,
-- que devuelve únicamente código, estado y fecha de un pedido concreto.
create or replace function public.rastrear_pedido(p_tag text)
returns table (tag_rastreo text, estado text, created_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select p.tag_rastreo, p.estado, p.created_at
  from public.pedidos p
  where char_length(p_tag) <= 40
    and p.tag_rastreo = upper(trim(p_tag))
  limit 1;
$$;

revoke execute on function public.rastrear_pedido(text) from public;
grant execute on function public.rastrear_pedido(text) to anon, authenticated;

drop policy if exists pedidos_lectura_permisos on public.pedidos;

create policy pedidos_lectura_permisos on public.pedidos
  for select to authenticated
  using (
    vendedor_id = (select auth.uid())
    or (select rol from public.perfiles where id = (select auth.uid())) = 'admin'
  );

commit;
