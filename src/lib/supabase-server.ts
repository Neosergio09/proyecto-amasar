import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import type { AstroCookies } from 'astro';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

/**
 * Cliente de Supabase ligado a la sesión del usuario (cookies).
 * Las consultas se ejecutan con su JWT, así que RLS aplica como usuario autenticado.
 * Los headers que pide Supabase al refrescar la sesión se acumulan en `responseHeaders`
 * para que el middleware los aplique a la respuesta.
 */
export function createSupabaseServerClient(request: Request, cookies: AstroCookies) {
  const responseHeaders: Record<string, string> = {};

  const client = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '').map(({ name, value }) => ({
          name,
          value: value ?? '',
        }));
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value, options }) => cookies.set(name, value, options));
        Object.assign(responseHeaders, headers);
      },
    },
  });

  return { client, responseHeaders };
}
