import { c as createAstro, a as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$VendedorLayout } from '../../chunks/VendedorLayout_DeExs2xI.mjs';
import { g as getSupabaseServer } from '../../chunks/supabase_DZdNAR0C.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://amasar.co");
const $$Confirmar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Confirmar;
  const supabase = await getSupabaseServer(Astro2.cookies);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/admin/login");
  }
  return renderTemplate`${renderComponent($$result, "VendedorLayout", $$VendedorLayout, { "title": "Confirmar Pedido | Amasar Go", "data-astro-cid-25cynwtj": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="fixed inset-0 bg-white z-[60] flex flex-col" data-astro-cid-25cynwtj> <!-- Header Simulado --> <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between" data-astro-cid-25cynwtj> <button onclick="window.history.back()" class="p-2 rounded-full hover:bg-gray-100" data-astro-cid-25cynwtj> <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-25cynwtj><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-25cynwtj></path></svg> </button> <h1 class="text-lg font-bold text-gray-900" data-astro-cid-25cynwtj>Resumen del Pedido</h1> <div class="w-10" data-astro-cid-25cynwtj></div> </div> <!-- Contenido Scrollable --> <main class="flex-1 overflow-y-auto p-6 space-y-6" data-astro-cid-25cynwtj> <!-- Sección Cliente --> <section class="bg-blue-50 p-4 rounded-2xl border border-blue-100" data-astro-cid-25cynwtj> <span class="text-[10px] uppercase font-bold text-blue-400 tracking-wider" data-astro-cid-25cynwtj>Cliente Seleccionado</span> <div class="flex items-center gap-3 mt-2" data-astro-cid-25cynwtj> <div class="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold" id="clientAvatar" data-astro-cid-25cynwtj>
?
</div> <div data-astro-cid-25cynwtj> <h3 class="font-bold text-gray-900 text-lg leading-none" id="clientName" data-astro-cid-25cynwtj>
Seleccionando...
</h3> <p class="text-xs text-blue-500 font-medium mt-1 cursor-pointer underline" onclick="window.location.href='/vendedores/clientes'" data-astro-cid-25cynwtj>
Cambiar
</p> </div> </div> </section> <!-- Lista de Items del Carrito --> <section data-astro-cid-25cynwtj> <h2 class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3" data-astro-cid-25cynwtj>
Productos
</h2> <div id="orderItems" class="space-y-3" data-astro-cid-25cynwtj> <!-- Items injectados por JS --> <div class="animate-pulse bg-gray-100 h-16 rounded-xl" data-astro-cid-25cynwtj></div> <div class="animate-pulse bg-gray-100 h-16 rounded-xl" data-astro-cid-25cynwtj></div> </div> </section> <!-- Sección Totales --> <section class="border-t border-gray-100 pt-4 space-y-2" data-astro-cid-25cynwtj> <div class="flex justify-between text-gray-500" data-astro-cid-25cynwtj> <span data-astro-cid-25cynwtj>Subtotal</span> <span id="subtotalDisplay" data-astro-cid-25cynwtj>$0</span> </div> <div class="flex justify-between text-xl font-black text-gray-900" data-astro-cid-25cynwtj> <span data-astro-cid-25cynwtj>Total</span> <span id="totalDisplay" data-astro-cid-25cynwtj>$0</span> </div> </section> </main> <!-- Footer Actions --> <div class="p-6 bg-white border-t border-gray-100 pb-safe" data-astro-cid-25cynwtj> <button id="confirmBtn" class="w-full bg-green-600 hover:bg-green-500 text-white h-14 rounded-2xl font-bold text-lg shadow-xl shadow-green-200 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale" data-astro-cid-25cynwtj> <span data-astro-cid-25cynwtj>Confirmar Pedido</span> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-25cynwtj><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-astro-cid-25cynwtj></path></svg> </button> </div> </div>  <div id="successModal" class="fixed inset-0 bg-black/50 z-[80] hidden flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300" data-astro-cid-25cynwtj> <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden transform scale-95 opacity-0 transition-all duration-300" id="successModalContent" data-astro-cid-25cynwtj> <div class="bg-green-50 p-6 flex flex-col items-center justify-center text-center border-b border-green-100" data-astro-cid-25cynwtj> <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-sm" data-astro-cid-25cynwtj> <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-25cynwtj><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" data-astro-cid-25cynwtj></path></svg> </div> <h2 class="text-2xl font-black text-gray-900 leading-tight" data-astro-cid-25cynwtj>
¡Pedido Guardado<br data-astro-cid-25cynwtj>con Éxito!
</h2> <p class="text-green-700 font-medium mt-2 text-sm" data-astro-cid-25cynwtj>
El inventario se ha actualizado correctamente.
</p> </div> <div class="p-6 space-y-3" data-astro-cid-25cynwtj> <button id="whatsappBtn" class="w-full bg-green-600 hover:bg-green-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg shadow-green-200 flex items-center justify-center gap-2 active:scale-95 transition-all" data-astro-cid-25cynwtj> <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-25cynwtj><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" data-astro-cid-25cynwtj></path></svg> <span data-astro-cid-25cynwtj>Enviar Recibo</span> </button> <button id="homeBtn" class="w-full bg-white hover:bg-gray-50 text-gray-700 py-3.5 px-6 rounded-2xl font-bold text-base border-2 border-gray-200 flex items-center justify-center gap-2 active:scale-95 transition-all" data-astro-cid-25cynwtj> <span data-astro-cid-25cynwtj>Nueva Venta</span> </button> </div> </div> </div>  <div id="loadingOverlay" class="fixed inset-0 bg-white/90 z-[70] hidden flex flex-col items-center justify-center" data-astro-cid-25cynwtj> <div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" data-astro-cid-25cynwtj></div> <h2 class="text-xl font-bold text-gray-900" data-astro-cid-25cynwtj>Procesando Pedido...</h2> <p class="text-gray-500 text-sm mt-2" data-astro-cid-25cynwtj>Actualizando inventario</p> </div> <div id="meta-data"${addAttribute(user.id, "data-vendedor-id")} class="hidden" data-astro-cid-25cynwtj></div> ` })} ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/confirmar.astro?astro&type=script&index=0&lang.ts")} `;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/confirmar.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/confirmar.astro";
const $$url = "/vendedores/confirmar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Confirmar,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
