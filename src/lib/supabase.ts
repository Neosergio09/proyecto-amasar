import { createClient } from '@supabase/supabase-js';

// Corregido: Agregamos la 'L' al final de URL
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Validación de seguridad para el Líder de Proyecto
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("⚠️ ERROR: Verifica que PUBLIC_SUPABASE_URL esté bien escrita en tu .env y en el código.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Genera una URL optimizada para imágenes almacenadas en Supabase.
 * @param url - URL original del recurso.
 * @param width - Ancho deseado en píxeles (por defecto 800).
 * @returns URL con parámetros de transformación o placeholder si no hay URL.
 */
export function getOptimizedImage(url: string, width = 800) {
  if (!url) return '/placeholder.jpg';

  // Si la imagen viene de tu bucket de Supabase, añadimos parámetros de transformación
  if (url.includes('supabase.co')) {
    return `${url}?width=${width}&quality=75&format=webp`;
  }
  
  return url;
}