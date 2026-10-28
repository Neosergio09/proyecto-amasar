import { supabaseBrowser } from '../lib/supabase-browser';

// Se importa desde cada página del panel; al ser un módulo se ejecuta una sola vez,
// así que el listener no se duplica con las View Transitions.
document.addEventListener('astro:page-load', () => {
  document.getElementById('logoutBtn')?.addEventListener('click', async () => {
    const { error } = await supabaseBrowser.auth.signOut();
    if (!error) window.location.href = '/admin/login';
  });
});
