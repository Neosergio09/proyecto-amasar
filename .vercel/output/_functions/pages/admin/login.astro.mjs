import { a as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../../chunks/MainLayout_COMcyEop.mjs';
export { renderers } from '../../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const title = "Acceso Administrativo | Amasar";
  const description = "Panel de control privado para la gesti\xF3n de Amasar SIA SAS.";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-[80vh] flex items-center justify-center bg-background py-20"> <div class="max-w-md w-full px-6"> <div class="text-center mb-10"> <div class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-xl mx-auto mb-6">
A
</div> <h1 class="text-4xl font-serif text-secondary mb-2">
Panel de Control
</h1> <p class="text-slate-500 text-sm italic">
"Solo personal autorizado de Amasar"
</p> </div> <div class="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-primary/5"> <form id="loginForm" class="space-y-6"> <div> <label class="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Correo Electrónico</label> <input type="email" id="email" required class="w-full p-4 rounded-xl bg-background border-none focus:ring-2 focus:ring-primary outline-none transition-all"> </div> <div> <label class="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Contraseña</label> <input type="password" id="password" required class="w-full p-4 rounded-xl bg-background border-none focus:ring-2 focus:ring-primary outline-none transition-all"> </div> <button type="submit" class="w-full py-5 bg-secondary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-primary transition-all active:scale-95 shadow-lg">
Entrar al Sistema
</button> </form> <p id="errorMessage" class="hidden mt-6 text-center text-xs text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100 animate-shake">
Credenciales incorrectas. Intenta de nuevo.
</p> </div> <div class="mt-8 text-center"> <a href="/" class="text-[10px] uppercase tracking-widest text-slate-400 hover:text-primary transition-colors font-bold">
← Volver a la página pública
</a> </div> </div> </section> ` })} ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/login.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
