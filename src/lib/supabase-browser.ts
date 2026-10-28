import { createBrowserClient } from '@supabase/ssr';

// Cliente para los scripts del panel admin: guarda la sesión en cookies
// para que el middleware pueda validarla en el servidor.
export const supabaseBrowser = createBrowserClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);
