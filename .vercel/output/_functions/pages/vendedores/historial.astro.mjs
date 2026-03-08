import { c as createAstro, a as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead, e as addAttribute, F as Fragment } from '../../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$VendedorLayout } from '../../chunks/VendedorLayout_DeExs2xI.mjs';
import { g as getSupabaseServer } from '../../chunks/supabase_DZdNAR0C.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://amasar.co");
const $$Historial = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Historial;
  const supabase = await getSupabaseServer(Astro2.cookies);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/admin/login");
  }
  const { data: pedidos, error } = await supabase.from("pedidos").select("*, clientes(nombre_comercial, telefono)").eq("vendedor_id", user.id).order("created_at", { ascending: false }).limit(50);
  if (error) console.error("Error fetching pedidos:", error.message);
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const todaysOrders = (pedidos || []).filter((p) => {
    const pDate = new Date(p.created_at);
    pDate.setHours(0, 0, 0, 0);
    return pDate.getTime() === today.getTime();
  });
  const todayTotal = todaysOrders.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const todayCount = todaysOrders.length;
  const estadosLogistica = {
    "Preparaci\xF3n": "bg-blue-50 text-blue-600 border-blue-100",
    "En horno": "bg-indigo-50 text-indigo-600 border-indigo-100",
    "Empacado": "bg-purple-50 text-purple-600 border-purple-100",
    "En camino": "bg-orange-50 text-orange-600 border-orange-100",
    "Entregado": "bg-green-50 text-green-600 border-green-100",
    "Cancelado": "bg-red-50 text-red-600 border-red-100"
  };
  return renderTemplate`${renderComponent($$result, "VendedorLayout", $$VendedorLayout, { "title": "Mis Pedidos | Amasar Go", "data-astro-cid-6ehwya3j": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 pb-24" data-astro-cid-6ehwya3j> <!-- Header --> <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 px-6 py-4 rounded-b-[2rem] mb-6" data-astro-cid-6ehwya3j> <div class="flex items-center justify-between" data-astro-cid-6ehwya3j> <button onclick="window.history.back()" class="p-2 rounded-full hover:bg-gray-100 transition-colors" data-astro-cid-6ehwya3j> <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-6ehwya3j><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-astro-cid-6ehwya3j></path></svg> </button> <h1 class="text-xl font-black text-gray-900 tracking-tight" data-astro-cid-6ehwya3j>
Historial
</h1> <div class="w-10" data-astro-cid-6ehwya3j></div> </div> <!-- Daily Summary --> <div class="mt-6 flex gap-4" data-astro-cid-6ehwya3j> <div class="flex-1 bg-gray-900 rounded-2xl p-4 text-white shadow-lg shadow-gray-200" data-astro-cid-6ehwya3j> <p class="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1" data-astro-cid-6ehwya3j>Ventas Hoy</p> <p class="text-2xl font-black" data-astro-cid-6ehwya3j>$${todayTotal.toLocaleString("es-CO")}</p> </div> <div class="w-24 bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-center items-center shadow-sm" data-astro-cid-6ehwya3j> <p class="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1" data-astro-cid-6ehwya3j>Pedidos</p> <p class="text-2xl font-black text-gray-900" data-astro-cid-6ehwya3j>${todayCount}</p> </div> </div> </header> <main class="px-4 space-y-4" data-astro-cid-6ehwya3j> ${!pedidos || pedidos.length === 0 ? renderTemplate`<div class="text-center py-20" data-astro-cid-6ehwya3j> <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl" data-astro-cid-6ehwya3j>
🥖
</div> <h3 class="text-gray-900 font-bold text-lg" data-astro-cid-6ehwya3j>Sin ventas hoy</h3> <p class="text-gray-500 mt-2" data-astro-cid-6ehwya3j>¡A darle con toda! Tu próxima venta está cerca.</p> <a href="/vendedores" class="inline-block mt-6 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-all" data-astro-cid-6ehwya3j>
Nueva Venta
</a> </div>` : pedidos.map((ped) => {
    const clienteName = ped.clientes?.nombre_comercial || ped.cliente_nombre || "Cliente General";
    const clientePhone = ped.clientes?.telefono || "";
    const badgeClass = estadosLogistica[ped.estado] || "bg-gray-50 text-gray-600 border-gray-100";
    return renderTemplate`<div class="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-5 overflow-hidden relative group transition-all hover:shadow-md" data-astro-cid-6ehwya3j> <div class="flex justify-between items-start mb-4" data-astro-cid-6ehwya3j> <div data-astro-cid-6ehwya3j> <span class="inline-block bg-gray-50 text-gray-400 text-[10px] font-black uppercase px-2 py-1 rounded-lg mb-1 tracking-wider" data-astro-cid-6ehwya3j> ${ped.tag_rastreo} </span> <h3 class="font-bold text-gray-900 leading-tight text-lg" data-astro-cid-6ehwya3j> ${clienteName} </h3> <p class="text-xs text-gray-400 mt-1 font-medium" data-astro-cid-6ehwya3j> ${new Date(ped.created_at).toLocaleDateString("es-CO", { month: "short", day: "numeric" })} • ${new Date(ped.created_at).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })} </p> </div> <div${addAttribute(`text-[10px] font-black uppercase px-3 py-1.5 rounded-full border ${badgeClass}`, "class")} data-astro-cid-6ehwya3j> ${ped.estado} </div> </div> <div class="bg-gray-50 rounded-2xl p-4 mb-4 space-y-2" data-astro-cid-6ehwya3j> ${(ped.detalles || []).slice(0, 3).map((item) => renderTemplate`<div class="flex justify-between text-xs text-gray-600 font-medium" data-astro-cid-6ehwya3j> <span data-astro-cid-6ehwya3j>${item.qty}x ${item.visualName || item.name}</span> <span class="font-bold text-gray-400" data-astro-cid-6ehwya3j>$${(item.price * item.qty).toLocaleString()}</span> </div>`)} ${(ped.detalles || []).length > 3 && renderTemplate`<p class="text-[10px] text-center text-gray-400 italic pt-1" data-astro-cid-6ehwya3j>
+ ${(ped.detalles || []).length - 3} productos más...
</p>`} <div class="border-t border-gray-200 mt-2 pt-3 flex justify-between text-sm font-black text-gray-900" data-astro-cid-6ehwya3j> <span data-astro-cid-6ehwya3j>Total</span> <span data-astro-cid-6ehwya3j>$${(ped.total || 0).toLocaleString()}</span> </div> </div> <!-- Actions --> <div class="grid grid-cols-2 gap-3" data-astro-cid-6ehwya3j>  <button class="resend-wa col-span-2 bg-green-50 text-green-700 font-bold text-sm py-3.5 rounded-xl hover:bg-green-100 transition-colors flex items-center justify-center gap-2 border border-green-100"${addAttribute(clientePhone, "data-phone")}${addAttribute(ped.tag_rastreo, "data-tag")}${addAttribute(clienteName, "data-client")}${addAttribute(JSON.stringify(ped.detalles || []), "data-items")}${addAttribute(ped.total, "data-total")} data-astro-cid-6ehwya3j> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-astro-cid-6ehwya3j><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" data-astro-cid-6ehwya3j></path></svg>
Enviar Recibo
</button> ${ped.estado !== "Cancelado" && ped.estado !== "Entregado" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-6ehwya3j": true }, { "default": async ($$result3) => renderTemplate` <button class="edit-order flex-1 bg-white border border-gray-200 text-gray-600 font-bold text-xs py-3 rounded-xl hover:bg-gray-50 transition-colors"${addAttribute(ped.id, "data-id")}${addAttribute(JSON.stringify(ped.detalles || []), "data-detalles")} data-astro-cid-6ehwya3j>
✏️ Editar
</button> <button class="cancel-order flex-1 bg-white border border-red-100 text-red-500 font-bold text-xs py-3 rounded-xl hover:bg-red-50 transition-colors"${addAttribute(ped.id, "data-id")}${addAttribute(JSON.stringify(ped.detalles || []), "data-detalles")} data-astro-cid-6ehwya3j>
🚫 Cancelar
</button> ` })}`} </div> </div>`;
  })} </main> <!-- Edit Modal (Reused) --> <dialog id="editModal" class="bg-white rounded-[2.5rem] shadow-2xl p-0 w-full max-w-lg backdrop:bg-gray-900/20 backdrop:backdrop-blur-sm m-auto" data-astro-cid-6ehwya3j> <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center" data-astro-cid-6ehwya3j> <h3 class="text-lg font-black text-gray-900" data-astro-cid-6ehwya3j>Editar Pedido</h3> <button onclick="document.getElementById('editModal').close()" class="bg-gray-100 p-2 rounded-full text-gray-500 hover:bg-gray-200" data-astro-cid-6ehwya3j>
✖
</button> </div> <div class="p-6 space-y-4 max-h-[60vh] overflow-y-auto" id="modalContent" data-astro-cid-6ehwya3j> <!-- Items --> </div> <div class="p-6 border-t border-gray-100 bg-gray-50 rounded-b-[2.5rem] flex gap-3" data-astro-cid-6ehwya3j> <button onclick="document.getElementById('editModal').close()" class="flex-1 bg-white border border-gray-200 text-gray-600 font-bold h-12 rounded-[2.5rem]" data-astro-cid-6ehwya3j>Cancelar</button> <button id="saveEditBtn" class="flex-1 bg-blue-600 text-white font-bold h-12 rounded-[2.5rem] shadow-lg shadow-blue-200" data-astro-cid-6ehwya3j>Guardar</button> </div> </dialog> </div> ` })} ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/historial.astro?astro&type=script&index=0&lang.ts")} `;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/historial.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/historial.astro";
const $$url = "/vendedores/historial";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Historial,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
