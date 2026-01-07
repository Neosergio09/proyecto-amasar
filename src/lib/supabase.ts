import { createClient } from '@supabase/supabase-js';

// Corregido: Agregamos la 'L' al final de URL
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Validación de seguridad para el Líder de Proyecto
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("⚠️ ERROR: Verifica que PUBLIC_SUPABASE_URL esté bien escrita en tu .env y en el código.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);