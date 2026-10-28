import { createClient } from '@supabase/supabase-js';
import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import type { APIContext } from 'astro';

// Variables de entorno
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY;

// Validación de seguridad
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Error de configuración: Faltan las llaves de Supabase.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Optimiza imágenes de Supabase mediante transformación en el Edge.
 * Ayuda a pasar Lighthouse reduciendo el tamaño del Payload y mejorando el LCP.
 */
export function getOptimizedImage(url: string | null, width = 800) {
  // 1. Manejo de nulos o strings vacíos
  if (!url) return 'https://placehold.co/200x200/f3f4f6/1e293b?text=Amasar';

  let finalUrl = url;

  // 2. Si es solo un nombre de archivo (no es URL completa), asumimos bucket 'productos'
  if (!finalUrl.includes('http') && !finalUrl.includes('://')) {
    if (!finalUrl.startsWith('productos/')) {
      finalUrl = `productos/${finalUrl}`;
    }
    // Construimos la URL completa pública
    finalUrl = `${supabaseUrl}/storage/v1/object/public/${finalUrl}`;
  }

  // 3. Si es una imagen de Supabase, aplicamos transformación al vuelo
  // Redimensionamos, bajamos calidad al 80% y forzamos formato WebP (más ligero)
  if (finalUrl.includes('supabase.co')) {
    // Limpiamos la URL de parámetros previos si existen
    const cleanUrl = finalUrl.split('?')[0];
    return `${cleanUrl}?width=${width}&quality=80&format=webp`;
  }

  // 4. Si es una imagen externa diferente, se devuelve tal cual
  return finalUrl;
}

/**
 * Cliente de Supabase ligado a la sesión del usuario (cookies de @supabase/ssr).
 * Se crea una sola vez por petición (en el middleware) y se reutiliza desde locals,
 * así el refresco del token se hace una vez y las cookies nuevas se guardan en la respuesta.
 */
export const getSupabaseServer = async ({ request, cookies, locals }: Pick<APIContext, 'request' | 'cookies' | 'locals'>) => {
  if (locals.supabase) return locals.supabase;

  locals.supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return parseCookieHeader(request.headers.get('Cookie') ?? '').map(({ name, value }) => ({
          name,
          value: value ?? '',
        }));
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value, options }) => cookies.set(name, value, options));
        locals.supabaseHeaders = { ...locals.supabaseHeaders, ...headers };
      },
    },
  });

  return locals.supabase;
};
