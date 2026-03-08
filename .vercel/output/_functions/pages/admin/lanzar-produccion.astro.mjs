import { c as createAstro, a as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_De1jJxF6.mjs';
import { g as getSupabaseServer } from '../../chunks/supabase_DZdNAR0C.mjs';
/* empty css                                                */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://amasar.co");
const $$LanzarProduccion = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LanzarProduccion;
  const supabase = await getSupabaseServer(Astro2.cookies);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return Astro2.redirect("/admin/login");
  const { data: productsWithRecipes } = await supabase.from("productos").select(
    `
    id,
    nombre,
    recetas!inner(id) 
  `
  ).eq("categoria", "Galletas").order("nombre");
  const productList = productsWithRecipes || [];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Lanzar Producci\xF3n", "data-astro-cid-vqok4w3k": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-2xl mx-auto space-y-8" data-astro-cid-vqok4w3k> <!-- Hero / Header --> <div class="text-center space-y-4" data-astro-cid-vqok4w3k> <div class="inline-flex items-center justify-center p-4 bg-orange-100 text-orange-600 rounded-full mb-4" data-astro-cid-vqok4w3k> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-vqok4w3k> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" data-astro-cid-vqok4w3k></path> </svg> </div> <h1 class="text-3xl font-black text-slate-800" data-astro-cid-vqok4w3k>
Lanzar Orden de Producción
</h1> <p class="text-slate-500 max-w-lg mx-auto" data-astro-cid-vqok4w3k>
Selecciona el producto y la cantidad a producir. El sistema
                descontará automáticamente los insumos del inventario.
</p> </div> <!-- Form Card --> <div class="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-100" data-astro-cid-vqok4w3k> <form id="productionForm" class="space-y-6" data-astro-cid-vqok4w3k> <div data-astro-cid-vqok4w3k> <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" data-astro-cid-vqok4w3k>Producto</label> <div class="relative" data-astro-cid-vqok4w3k> <select id="productoSelect" required class="w-full bg-slate-50 border-none rounded-xl h-14 px-4 font-bold text-slate-700 focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer" data-astro-cid-vqok4w3k> <option value="" data-astro-cid-vqok4w3k>Selecciona un producto...</option> ${productList.map((p) => renderTemplate`<option${addAttribute(p.id, "value")} data-astro-cid-vqok4w3k>${p.nombre}</option>`)} </select> <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" data-astro-cid-vqok4w3k> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-astro-cid-vqok4w3k> <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" data-astro-cid-vqok4w3k></path> </svg> </div> </div> </div> <div data-astro-cid-vqok4w3k> <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2" data-astro-cid-vqok4w3k>Cantidad a Producir</label> <input type="number" id="cantidadInput" required min="1" placeholder="Ej. 50" class="w-full bg-slate-50 border-none rounded-xl h-14 px-4 font-bold text-slate-700 focus:ring-2 focus:ring-orange-500" data-astro-cid-vqok4w3k> </div> <button type="submit" id="submitBtn" class="w-full py-4 bg-orange-500 text-white font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300 transform active:scale-95" data-astro-cid-vqok4w3k>
Ejecutar Producción
</button> </form> </div> </div>  <dialog id="successModal" class="bg-white rounded-[2.5rem] p-0 w-full max-w-md backdrop:bg-slate-900/40 backdrop:backdrop-blur-sm open:animate-fade-in text-center shadow-2xl" data-astro-cid-vqok4w3k> <div class="p-8" data-astro-cid-vqok4w3k> <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6" data-astro-cid-vqok4w3k> <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-vqok4w3k> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-astro-cid-vqok4w3k></path> </svg> </div> <h3 class="text-2xl font-black text-slate-800 mb-2" data-astro-cid-vqok4w3k>
¡Producción Registrada!
</h3> <p class="text-slate-500 mb-8 text-sm" data-astro-cid-vqok4w3k>
El stock de los ingredientes ha sido descontado correctamente.
</p> <div class="space-y-3" data-astro-cid-vqok4w3k> <a id="whatsappBtn" href="#" target="_blank" class="flex items-center justify-center gap-2 w-full py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200" data-astro-cid-vqok4w3k> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-vqok4w3k> <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.658-.698c.983.586 2.051.968 3.284.972l.004.001c3.177 0 5.765-2.587 5.765-5.766.001-5.632-4.062-5.772-6.251-6.16zM5.838 12.012c.002-3.415 2.78-6.194 6.196-6.194 3.414.004 6.19 2.78 6.191 6.193-.001 3.42-2.779 6.193-6.192 6.193-1.07-.001-2.062-.279-2.909-.731l-3.219.845.859-3.136c-.538-.938-.857-2.022-.858-3.17z" data-astro-cid-vqok4w3k></path> </svg>
Elegir Contacto WhatsApp
</a> <button id="copyBtn" class="flex items-center justify-center gap-2 w-full py-4 bg-orange-100 text-orange-600 font-bold rounded-xl hover:bg-orange-200 transition-colors" data-astro-cid-vqok4w3k> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-vqok4w3k> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" data-astro-cid-vqok4w3k></path> </svg>
Copiar Instrucciones
</button> <button id="closeModalBtn" class="w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors" data-astro-cid-vqok4w3k>
Cerrar y Continuar
</button> </div> </div> </dialog> ` })} ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/lanzar-produccion.astro?astro&type=script&index=0&lang.ts")} `;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/lanzar-produccion.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/lanzar-produccion.astro";
const $$url = "/admin/lanzar-produccion";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$LanzarProduccion,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
