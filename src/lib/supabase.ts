import { createClient } from '@supabase/supabase-js';

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
  if (!url) return '/placeholder.jpg';

  // 2. Si es una imagen de Supabase, aplicamos transformación al vuelo
  // Redimensionamos, bajamos calidad al 80% y forzamos formato WebP (más ligero)
  if (url.includes('supabase.co')) {
    // Limpiamos la URL de parámetros previos si existen
    const cleanUrl = url.split('?')[0];
    return `${cleanUrl}?width=${width}&quality=80&format=webp`;
  }

  // 3. Si es una imagen externa o local, se devuelve tal cual
  return url;
}

/**
 * Creates a Supabase client for Server-Side Rendering (SSR) in Astro.
 * It reads the access token from cookies to authenticate the user.
 */
export const getSupabaseServer = async (cookies: any) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  const refreshToken = cookies.get("sb-refresh-token")?.value;

  const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  if (accessToken && refreshToken) {
    await client.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  return client;
};