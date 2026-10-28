-- Solo usuarios con sesión pueden crear pedidos y lanzar producción.
revoke execute on function public.crear_pedido_con_stock(text, bigint, text, numeric, jsonb) from public, anon;
revoke execute on function public.crear_pedido_con_stock(text, uuid, text, numeric, jsonb, uuid) from public, anon;
revoke execute on function public.execute_production_order(uuid, numeric) from public, anon;
-- Las funciones nuevas no quedan ejecutables por anon por defecto (dar el permiso explícito si hace falta).
alter default privileges in schema public revoke execute on functions from public, anon;
