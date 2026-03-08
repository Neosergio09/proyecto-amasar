import { a as createComponent, g as renderHead, b as renderScript, d as renderTemplate } from '../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><title>Acceso Administrativo | Amasar</title>${renderHead()}</head> <body class="bg-gray-100 flex items-center justify-center h-screen px-4"> <div class="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-10"> <div class="text-center mb-8"> <h1 class="text-2xl font-serif font-bold text-secondary mb-2">
Acceso Administrativo
</h1> <p class="text-slate-500 text-sm">
Ingresa tus credenciales para continuar
</p> </div> <form id="loginForm" class="space-y-6"> <div> <label for="email" class="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">Email</label> <input type="email" id="email" name="email" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="admin@amasar.co" required> </div> <div> <label for="password" class="block text-xs font-bold uppercase tracking-widest text-slate-700 mb-2">Contraseña</label> <input type="password" id="password" name="password" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="••••••••" required> </div> <div id="errorMsg" class="hidden text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-100"></div> <button type="submit" class="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-primary transition-colors shadow-lg shadow-secondary/10">
Iniciar Sesión
</button> </form> </div> ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/login.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
