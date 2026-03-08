import { a as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_De1jJxF6.mjs';
import { s as supabase } from '../../chunks/supabase_DZdNAR0C.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Pedidos = createComponent(async ($$result, $$props, $$slots) => {
  const title = "Gesti\xF3n de Pedidos y Rastreo | Amasar";
  const { data: pedidos, error } = await supabase.from("pedidos").select("*, clientes(nombre_comercial)").order("created_at", { ascending: false });
  if (error) console.error("Error cargando pedidos:", error.message);
  const estadosLogistica = [
    "Preparaci\xF3n",
    "En horno",
    "Empacado",
    "En camino",
    "Entregado"
  ];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": title }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full"> <div class="w-full"> <div class="bg-white rounded-2xl md:rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden"> <table class="w-full text-left border-collapse"> <thead> <tr class="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-400"> <th class="px-3 md:px-8 py-5">Código (Tag)</th> <th class="px-3 md:px-8 py-5">Panadería</th> <th class="px-3 md:px-8 py-5">Estado</th> <th class="px-3 md:px-8 py-5 text-center">Acciones</th> </tr> </thead> <tbody class="divide-y divide-slate-50"> ${pedidos?.map((ped) => renderTemplate`<tr class="hover:bg-slate-50/50 transition-colors"> <td class="px-3 md:px-8 py-6 font-black text-primary text-xs tracking-tighter"> ${ped.tag_rastreo} </td> <td class="px-3 md:px-8 py-6"> <p class="font-bold text-secondary text-sm"> ${ped.clientes?.nombre_comercial || "Cliente no encontrado"} </p> <p class="text-[9px] text-slate-400 uppercase tracking-widest">
Bogotá, Colombia
</p> </td> <td class="px-3 md:px-8 py-6"> <div class="flex items-center gap-2"> <select class="status-select bg-slate-100 text-[10px] font-black uppercase px-4 py-2 rounded-xl border-none outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"> ${estadosLogistica.map((est) => renderTemplate`<option${addAttribute(est, "value")}${addAttribute(est === ped.estado, "selected")}> ${est} </option>`)} </select> <button class="update-btn p-2 bg-secondary text-white rounded-xl hover:bg-primary transition-all active:scale-90 text-[10px] font-bold uppercase shadow-md shadow-secondary/10"${addAttribute(ped.id, "data-id")}>
Guardar
</button> </div> </td> <td class="px-3 md:px-8 py-6 text-center flex items-center justify-center gap-2"> <!-- Edit Button --> <button class="edit-order text-blue-500 hover:bg-blue-50 p-2 rounded-full transition-colors"${addAttribute(ped.id, "data-id")}${addAttribute(JSON.stringify(ped.detalles || []), "data-detalles")}${addAttribute(ped.total || 0, "data-total")} title="Editar Cantidades">
✏️
</button> <!-- Cancel Button --> ${ped.estado !== "Cancelado" && renderTemplate`<button class="cancel-order text-orange-500 hover:bg-orange-50 p-2 rounded-full transition-colors"${addAttribute(ped.id, "data-id")}${addAttribute(JSON.stringify(ped.detalles || []), "data-detalles")} title="Cancelar Pedido (Restaurar Stock)">
🚫
</button>`} <!-- Delete Button --> <button class="delete-order text-red-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"${addAttribute(ped.id, "data-id")} title="Eliminar (Solo Registro)">
🗑️
</button> </td> </tr>`)} </tbody> </table> </div> </div> </div>  <dialog id="editModal" class="bg-white rounded-2xl md:rounded-[2.5rem] shadow-2xl p-0 w-[95%] md:w-full max-w-lg backdrop:bg-gray-900/20 backdrop:backdrop-blur-sm"> <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center"> <h3 class="text-xl font-black text-gray-900">Editar Pedido</h3> <button onclick="document.getElementById('editModal').close()" class="bg-gray-100 p-2 rounded-full text-gray-500 hover:bg-gray-200">
✖
</button> </div> <div class="p-8 space-y-4" id="modalContent"> <!-- Inject Items Here --> </div> <div class="p-6 md:p-8 border-t border-gray-100 bg-gray-50 rounded-b-2xl md:rounded-b-[2.5rem] flex justify-end gap-3"> <button onclick="document.getElementById('editModal').close()" class="bg-white border border-gray-200 text-gray-600 font-bold px-6 h-12 rounded-[2.5rem] hover:bg-gray-50">Cancelar</button> <button id="saveEditBtn" class="bg-blue-600 text-white font-bold px-8 h-12 rounded-[2.5rem] hover:bg-blue-500 shadow-lg shadow-blue-200">Guardar Cambios</button> </div> </dialog> ` })} ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/pedidos.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/pedidos.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/pedidos.astro";
const $$url = "/admin/pedidos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pedidos,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
