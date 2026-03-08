import { c as createAstro, a as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$VendedorLayout } from '../../../chunks/VendedorLayout_DeExs2xI.mjs';
import { g as getSupabaseServer } from '../../../chunks/supabase_DZdNAR0C.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://amasar.co");
const $$Nuevo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Nuevo;
  const supabase = await getSupabaseServer(Astro2.cookies);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/admin/login");
  }
  return renderTemplate`${renderComponent($$result, "VendedorLayout", $$VendedorLayout, { "title": "Nuevo Cliente | Amasar Go" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 pb-24"> <!-- Header Sticky --> <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 px-6 py-4 rounded-b-[2rem] flex items-center justify-between"> <button onclick="window.history.back()" class="p-2 rounded-full hover:bg-gray-100 transition-colors"> <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> </button> <h1 class="text-lg font-black text-gray-900 tracking-tight">
Nuevo Prospecto
</h1> <div class="w-10"></div> </header> <main class="p-6"> <div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 space-y-5"> <div class="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3"> <div class="bg-blue-200 p-2 rounded-full text-blue-700 mt-1"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> </div> <div> <p class="text-sm font-bold text-blue-900">
Registro Rápido
</p> <p class="text-xs text-blue-700 mt-1">
Este cliente se te asignará automáticamente.
</p> </div> </div> <form id="newClientForm" class="space-y-4"> <input type="hidden" id="vendedorId"${addAttribute(user.id, "value")}> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Nombre del Negocio / Cliente <span class="text-red-500">*</span></label> <input type="text" id="nombre" required placeholder="Ej. Tienda Don Pepe" class="w-full h-14 bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 rounded-2xl px-5 text-base font-medium transition-all shadow-sm"> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Nombre de Contacto</label> <input type="text" id="contacto" placeholder="Ej. Juan Pérez" class="w-full h-14 bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 rounded-2xl px-5 text-base font-medium transition-all shadow-sm"> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Dirección <span class="text-red-500">*</span></label> <input type="text" id="direccion" required placeholder="Calle 123 # 45-67" class="w-full h-14 bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 rounded-2xl px-5 text-base font-medium transition-all shadow-sm"> </div> <div class="grid grid-cols-2 gap-4"> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Barrio <span class="text-red-500">*</span></label> <input type="text" id="barrio" required placeholder="El Prado" class="w-full h-14 bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 rounded-2xl px-5 text-base font-medium transition-all shadow-sm"> </div> <div> <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Teléfono <span class="text-red-500">*</span></label> <input type="tel" id="telefono" required placeholder="300..." class="w-full h-14 bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 rounded-2xl px-5 text-base font-medium transition-all shadow-sm"> </div> </div> <div class="pt-4"> <button type="submit" id="submitBtn" class="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-[2.5rem] shadow-xl shadow-blue-200 text-lg flex items-center justify-center gap-2 active:scale-95 transition-all"> <span>Guardar Cliente</span> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> </button> </div> </form> </div> </main> </div> ` })} ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/clientes/nuevo.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/clientes/nuevo.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/clientes/nuevo.astro";
const $$url = "/vendedores/clientes/nuevo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Nuevo,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
