import { c as createAstro, a as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$VendedorLayout } from '../../chunks/VendedorLayout_DeExs2xI.mjs';
import { g as getSupabaseServer } from '../../chunks/supabase_DZdNAR0C.mjs';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://amasar.co");
const $$Pedidos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pedidos;
  const supabase = await getSupabaseServer(Astro2.cookies);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/admin/login");
  }
  const { data: pedidos, error } = await supabase.from("pedidos").select("*").eq("vendedor_id", user.id).order("creado_en", { ascending: false }).limit(50);
  if (error) console.error("Error fetching pedidos:", error.message);
  return renderTemplate`${renderComponent($$result, "VendedorLayout", $$VendedorLayout, { "title": "Mis Pedidos | Amasar Go", "data-astro-cid-fr4dblqp": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 pb-24" data-astro-cid-fr4dblqp> <!-- Header --> <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 px-6 py-4 rounded-b-[2rem] flex items-center justify-between" data-astro-cid-fr4dblqp> <button onclick="window.history.back()" class="p-2 rounded-full hover:bg-gray-100 transition-colors" data-astro-cid-fr4dblqp> <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-fr4dblqp><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-fr4dblqp></path></svg> </button> <h1 class="text-lg font-black text-gray-900 tracking-tight" data-astro-cid-fr4dblqp>
Historial de Pedidos
</h1> <div class="w-10" data-astro-cid-fr4dblqp></div> </header> <main class="p-4 space-y-4" data-astro-cid-fr4dblqp> ${!pedidos || pedidos.length === 0 ? renderTemplate`<div class="text-center py-20 text-gray-500" data-astro-cid-fr4dblqp>
No has realizado pedidos aún.
</div>` : pedidos.map((ped) => renderTemplate`<div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-5 overflow-hidden relative group" data-astro-cid-fr4dblqp> <div class="flex justify-between items-start mb-4" data-astro-cid-fr4dblqp> <div data-astro-cid-fr4dblqp> <span class="inline-block bg-blue-50 text-blue-600 text-[10px] font-black uppercase px-2 py-1 rounded-lg mb-1" data-astro-cid-fr4dblqp> ${ped.tag_rastreo} </span> <h3 class="font-bold text-gray-900 leading-tight" data-astro-cid-fr4dblqp> ${ped.cliente_nombre} </h3> <p class="text-xs text-gray-400 mt-0.5" data-astro-cid-fr4dblqp> ${new Date(ped.creado_en).toLocaleDateString("es-CO", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })} </p> </div> <div${addAttribute(`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${ped.estado === "Entregado" ? "bg-green-50 text-green-600 border-green-100" : ped.estado === "Cancelado" ? "bg-red-50 text-red-600 border-red-100" : "bg-orange-50 text-orange-600 border-orange-100"}`, "class")} data-astro-cid-fr4dblqp> ${ped.estado} </div> </div> <div class="bg-gray-50 rounded-xl p-3 mb-4 space-y-1" data-astro-cid-fr4dblqp> ${(ped.detalles || []).map((item) => renderTemplate`<div class="flex justify-between text-xs text-gray-600" data-astro-cid-fr4dblqp> <span data-astro-cid-fr4dblqp>${item.qty}x ${item.visualName || item.name}</span> <span class="font-bold" data-astro-cid-fr4dblqp>$${(item.price * item.qty).toLocaleString()}</span> </div>`)} <div class="border-t border-gray-200 mt-2 pt-2 flex justify-between text-sm font-black text-gray-900" data-astro-cid-fr4dblqp> <span data-astro-cid-fr4dblqp>Total</span> <span data-astro-cid-fr4dblqp>$${(ped.total || 0).toLocaleString()}</span> </div> </div> <!-- Actions (Only if not Cancelled or Delivered) --> ${ped.estado !== "Cancelado" && ped.estado !== "Entregado" && renderTemplate`<div class="flex gap-2" data-astro-cid-fr4dblqp> <button class="edit-order flex-1 bg-blue-50 text-blue-600 font-bold text-xs py-3 rounded-xl hover:bg-blue-100 transition-colors"${addAttribute(ped.id, "data-id")}${addAttribute(JSON.stringify(ped.detalles || []), "data-detalles")} data-astro-cid-fr4dblqp>
✏️ Editar
</button> <button class="cancel-order flex-1 bg-red-50 text-red-600 font-bold text-xs py-3 rounded-xl hover:bg-red-100 transition-colors"${addAttribute(ped.id, "data-id")}${addAttribute(JSON.stringify(ped.detalles || []), "data-detalles")} data-astro-cid-fr4dblqp>
🚫 Cancelar
</button> </div>`} </div>`)} </main> <!-- Edit Modal (Reused) --> <dialog id="editModal" class="bg-white rounded-[2.5rem] shadow-2xl p-0 w-full max-w-lg backdrop:bg-gray-900/20 backdrop:backdrop-blur-sm m-auto" data-astro-cid-fr4dblqp> <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center" data-astro-cid-fr4dblqp> <h3 class="text-lg font-black text-gray-900" data-astro-cid-fr4dblqp>Editar Pedido</h3> <button onclick="document.getElementById('editModal').close()" class="bg-gray-100 p-2 rounded-full text-gray-500 hover:bg-gray-200" data-astro-cid-fr4dblqp>
✖
</button> </div> <div class="p-6 space-y-4 max-h-[60vh] overflow-y-auto" id="modalContent" data-astro-cid-fr4dblqp> <!-- Items --> </div> <div class="p-6 border-t border-gray-100 bg-gray-50 rounded-b-[2.5rem] flex gap-3" data-astro-cid-fr4dblqp> <button onclick="document.getElementById('editModal').close()" class="flex-1 bg-white border border-gray-200 text-gray-600 font-bold h-12 rounded-[2.5rem]" data-astro-cid-fr4dblqp>Cancelar</button> <button id="saveEditBtn" class="flex-1 bg-blue-600 text-white font-bold h-12 rounded-[2.5rem] shadow-lg shadow-blue-200" data-astro-cid-fr4dblqp>Guardar</button> </div> </dialog> </div> ` })} ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/pedidos.astro?astro&type=script&index=0&lang.ts")} `;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/pedidos.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/pedidos.astro";
const $$url = "/vendedores/pedidos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Pedidos,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
