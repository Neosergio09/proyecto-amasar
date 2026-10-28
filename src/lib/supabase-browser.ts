import { createBrowserClient } from '@supabase/ssr';

// Cliente para los <script> del navegador: guarda la sesión en cookies,
// las mismas que lee el servidor, así ambos comparten un único refresh token.
export const supabase = createBrowserClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);
