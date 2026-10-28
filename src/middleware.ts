import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from './lib/supabase-server';

const LOGIN_PATH = '/admin/login';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (!pathname.startsWith('/admin')) return next();

  const { client, responseHeaders } = createSupabaseServerClient(context.request, context.cookies);
  context.locals.supabase = client;

  // getClaims valida el JWT (y refresca la sesión si está por vencer); getSession no valida nada.
  const { data } = await client.auth.getClaims();
  const userId = data?.claims?.sub;
  const isLoginPage = pathname === LOGIN_PATH || pathname === `${LOGIN_PATH}/`;

  // El panel es solo para admins; los vendedores usan el ERP. El rol sale de perfiles,
  // la misma fuente que usan las políticas RLS.
  let isAdmin = false;
  if (userId) {
    const { data: perfil } = await client.from('perfiles').select('rol').eq('id', userId).maybeSingle();
    isAdmin = perfil?.rol === 'admin';

    if (!isAdmin) {
      // Cerramos la sesión de este navegador para no dejar al usuario en un bucle login → dashboard.
      await client.auth.signOut({ scope: 'local' });
      if (!isLoginPage) return context.redirect(`${LOGIN_PATH}?error=no-autorizado`);
    }
  }

  if (!isAdmin && !isLoginPage) return context.redirect(LOGIN_PATH);
  if (isAdmin && isLoginPage) return context.redirect('/admin/dashboard');

  const response = await next();
  Object.entries(responseHeaders).forEach(([key, value]) => response.headers.set(key, value));
  // Nada del panel debe quedar en cachés compartidas ni en buscadores.
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
});
