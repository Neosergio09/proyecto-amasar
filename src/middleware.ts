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
  const isLoggedIn = Boolean(data?.claims);
  const isLoginPage = pathname === LOGIN_PATH || pathname === `${LOGIN_PATH}/`;

  if (!isLoggedIn && !isLoginPage) return context.redirect(LOGIN_PATH);
  if (isLoggedIn && isLoginPage) return context.redirect('/admin/dashboard');

  const response = await next();
  Object.entries(responseHeaders).forEach(([key, value]) => response.headers.set(key, value));
  // Nada del panel debe quedar en cachés compartidas ni en buscadores.
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
});
