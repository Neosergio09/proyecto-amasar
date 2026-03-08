import { c as createAstro, a as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_De1jJxF6.mjs';
import { g as getSupabaseServer } from '../../chunks/supabase_DZdNAR0C.mjs';
/* empty css                                         */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://amasar.co");
const $$Inventario = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Inventario;
  const supabase = await getSupabaseServer(Astro2.cookies);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return Astro2.redirect("/admin/login");
  const { data: materias, error } = await supabase.from("materias_primas").select("*").order("nombre", { ascending: true });
  if (error) {
    console.error("Error fetching inventory:", error);
  }
  const rawInventory = materias || [];
  const enrichedInventory = rawInventory.map((item) => {
    const stockActual = Number(item.stock_actual);
    const stockMin = Number(item.stock_minimo);
    const isLowStock = stockActual <= stockMin;
    const maxVis = Math.max(stockMin * 3, stockActual * 1.2);
    const percentage = Math.min(stockActual / maxVis * 100, 100);
    return {
      ...item,
      isLowStock,
      percentage
    };
  });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Inventario de Materia Prima", "data-astro-cid-icitgclc": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6" data-astro-cid-icitgclc> <!-- Header --> <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl md:rounded-[2.5rem] shadow-sm" data-astro-cid-icitgclc> <div data-astro-cid-icitgclc> <h1 class="text-2xl font-black text-gray-900 tracking-tight" data-astro-cid-icitgclc>
Materia Prima
</h1> <p class="text-gray-500 text-sm mt-1" data-astro-cid-icitgclc>
Gestiona el stock de tus insumos.
</p> </div> <button id="openCreateModal" class="w-full md:w-auto h-12 px-6 rounded-[2.5rem] bg-amber-500 text-white font-bold hover:bg-amber-600 shadow-xl shadow-amber-200 transition-all flex items-center justify-center gap-2" data-astro-cid-icitgclc> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-icitgclc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" data-astro-cid-icitgclc></path></svg>
Nuevo Insumo
</button> </div> <!-- Inventory Table --> <div class="bg-white rounded-2xl md:rounded-[2.5rem] shadow-sm overflow-hidden border border-gray-100" data-astro-cid-icitgclc> <div class="overflow-x-auto" data-astro-cid-icitgclc> <table class="w-full text-left border-collapse" data-astro-cid-icitgclc> <thead class="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider font-bold" data-astro-cid-icitgclc> <tr data-astro-cid-icitgclc> <th class="px-3 md:px-6 py-5" data-astro-cid-icitgclc>Insumo</th> <th class="px-3 md:px-6 py-5" data-astro-cid-icitgclc>Stock Actual</th> <th class="px-3 md:px-6 py-5" data-astro-cid-icitgclc>Mínimo</th> <th class="px-3 md:px-6 py-5" data-astro-cid-icitgclc>Última Actualización</th> <th class="px-3 md:px-6 py-5 text-right" data-astro-cid-icitgclc>Acciones</th> </tr> </thead> <tbody class="divide-y divide-gray-100 text-sm" data-astro-cid-icitgclc> ${enrichedInventory.map((item) => {
    return renderTemplate`<tr${addAttribute(`group transition-colors ${item.isLowStock ? "bg-red-50" : "hover:bg-gray-50/50"}`, "class")} data-astro-cid-icitgclc> <td class="px-3 md:px-6 py-4" data-astro-cid-icitgclc> <div${addAttribute(`font-bold ${item.isLowStock ? "text-red-700" : "text-gray-900"}`, "class")} data-astro-cid-icitgclc> ${item.nombre} </div> <div class="text-xs text-gray-400" data-astro-cid-icitgclc>
Unidad: ${item.unidad} </div> </td> <td class="px-3 md:px-6 py-4 min-w-[150px] md:min-w-[200px]" data-astro-cid-icitgclc> <div class="flex justify-between text-xs font-bold mb-1" data-astro-cid-icitgclc> <span${addAttribute(
      item.isLowStock ? "text-red-600" : "text-gray-600",
      "class"
    )} data-astro-cid-icitgclc> ${item.stock_actual}${" "} ${item.unidad} </span> </div> <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden" data-astro-cid-icitgclc> <div${addAttribute(`h-full rounded-full transition-all duration-500 ${item.isLowStock ? "bg-red-500" : "bg-green-500"}`, "class")}${addAttribute(`width: ${item.percentage}%`, "style")} data-astro-cid-icitgclc></div> </div> </td> <td class="px-3 md:px-6 py-4 text-gray-500 font-medium" data-astro-cid-icitgclc> ${item.stock_minimo} ${item.unidad} </td> <td class="px-3 md:px-6 py-4 text-gray-400 text-xs" data-astro-cid-icitgclc> ${new Date(
      item.ultima_actualizacion
    ).toLocaleDateString()}${" "} ${new Date(
      item.ultima_actualizacion
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })} </td> <td class="px-3 md:px-6 py-4 text-right" data-astro-cid-icitgclc> <button class="open-update-btn text-blue-600 hover:text-blue-800 font-bold text-xs bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"${addAttribute(JSON.stringify(item), "data-item")} data-astro-cid-icitgclc>
Actualizar Stock
</button> </td> </tr>`;
  })} </tbody> </table> </div> ${enrichedInventory.length === 0 && renderTemplate`<div class="p-12 text-center text-gray-400" data-astro-cid-icitgclc>
No hay materias primas registradas.
</div>`} </div> </div>   <dialog id="createModal" class="bg-white rounded-2xl md:rounded-[2.5rem] shadow-2xl p-0 w-[95%] md:w-full max-w-lg backdrop:bg-gray-900/20 backdrop:backdrop-blur-sm open:animate-fade-in text-left" data-astro-cid-icitgclc> <form method="dialog" class="flex flex-col h-full" data-astro-cid-icitgclc> <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center" data-astro-cid-icitgclc> <h3 class="text-xl font-black text-gray-900" data-astro-cid-icitgclc>Nuevo Insumo</h3> <button type="button" class="close-modal bg-gray-100 p-2 rounded-full text-gray-500 hover:bg-gray-200" data-astro-cid-icitgclc> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-icitgclc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-icitgclc></path></svg> </button> </div> <div class="p-8 space-y-4" data-astro-cid-icitgclc> <div data-astro-cid-icitgclc> <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" data-astro-cid-icitgclc>Nombre</label> <input type="text" id="newNombre" required class="w-full bg-gray-50 border-transparent focus:border-amber-500 focus:bg-white focus:ring-0 rounded-2xl h-12 px-4 font-medium transition-colors" placeholder="Ej. Harina de Trigo" data-astro-cid-icitgclc> </div> <div class="grid grid-cols-2 gap-4" data-astro-cid-icitgclc> <div data-astro-cid-icitgclc> <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" data-astro-cid-icitgclc>Unidad</label> <select id="newUnidad" class="w-full bg-gray-50 border-transparent focus:border-amber-500 focus:bg-white focus:ring-0 rounded-2xl h-12 px-4 font-medium appearance-none transition-colors" data-astro-cid-icitgclc> <option value="kg" data-astro-cid-icitgclc>Kilogramos (kg)</option> <option value="gr" data-astro-cid-icitgclc>Gramos (gr)</option> <option value="lt" data-astro-cid-icitgclc>Litros (lt)</option> <option value="unidades" data-astro-cid-icitgclc>Unidades</option> <option value="laminas" data-astro-cid-icitgclc>Láminas</option> </select> </div> <div data-astro-cid-icitgclc> <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" data-astro-cid-icitgclc>Stock Mínimo</label> <input type="number" id="newMin" value="10" class="w-full bg-gray-50 border-transparent focus:border-amber-500 focus:bg-white focus:ring-0 rounded-2xl h-12 px-4 font-medium transition-colors" data-astro-cid-icitgclc> </div> </div> <div data-astro-cid-icitgclc> <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" data-astro-cid-icitgclc>Stock Inicial</label> <input type="number" id="newStock" value="0" class="w-full bg-gray-50 border-transparent focus:border-amber-500 focus:bg-white focus:ring-0 rounded-2xl h-12 px-4 font-medium transition-colors" data-astro-cid-icitgclc> </div> </div> <div class="p-6 md:p-8 border-t border-gray-100 bg-gray-50 rounded-b-2xl md:rounded-b-[2.5rem] flex justify-end gap-3" data-astro-cid-icitgclc> <button type="button" class="close-modal bg-white border border-gray-200 text-gray-600 font-bold px-6 h-12 rounded-[2.5rem] hover:bg-gray-50" data-astro-cid-icitgclc>Cancelar</button> <button type="button" id="saveNewBtn" class="bg-amber-500 text-white font-bold px-8 h-12 rounded-[2.5rem] hover:bg-amber-600 shadow-lg shadow-amber-200" data-astro-cid-icitgclc>Guardar</button> </div> </form> </dialog>  <dialog id="updateModal" class="bg-white rounded-2xl md:rounded-[2.5rem] shadow-2xl p-0 w-[95%] md:w-full max-w-md backdrop:bg-gray-900/20 backdrop:backdrop-blur-sm open:animate-fade-in text-left" data-astro-cid-icitgclc> <form method="dialog" class="flex flex-col h-full" data-astro-cid-icitgclc> <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center" data-astro-cid-icitgclc> <h3 class="text-xl font-black text-gray-900" data-astro-cid-icitgclc>
Actualizar Stock
</h3> <button type="button" class="close-modal bg-gray-100 p-2 rounded-full text-gray-500 hover:bg-gray-200" data-astro-cid-icitgclc> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-icitgclc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-icitgclc></path></svg> </button> </div> <div class="p-8 space-y-6" data-astro-cid-icitgclc> <input type="hidden" id="updateId" data-astro-cid-icitgclc> <div class="bg-blue-50 p-4 rounded-xl" data-astro-cid-icitgclc> <p class="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1" data-astro-cid-icitgclc>
ITEM SELECCIONADO
</p> <p class="text-xl font-black text-blue-900" id="updateName" data-astro-cid-icitgclc>
...
</p> <p class="text-sm text-blue-700 mt-1" data-astro-cid-icitgclc>
Stock Actual: <span id="currentStockDisplay" class="font-bold" data-astro-cid-icitgclc>0</span> </p> </div> <div data-astro-cid-icitgclc> <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" data-astro-cid-icitgclc>Tipo de Movimiento</label> <div class="grid grid-cols-2 gap-3" data-astro-cid-icitgclc> <label class="cursor-pointer" data-astro-cid-icitgclc> <input type="radio" name="moveType" value="add" checked class="peer sr-only" data-astro-cid-icitgclc> <div class="h-12 rounded-2xl border-2 border-gray-200 flex items-center justify-center font-bold text-gray-500 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 transition-all" data-astro-cid-icitgclc>
+ Agregar / Sumar
</div> </label> <label class="cursor-pointer" data-astro-cid-icitgclc> <input type="radio" name="moveType" value="set" class="peer sr-only" data-astro-cid-icitgclc> <div class="h-12 rounded-2xl border-2 border-gray-200 flex items-center justify-center font-bold text-gray-500 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 transition-all" data-astro-cid-icitgclc>
= Definir Total
</div> </label> </div> </div> <div data-astro-cid-icitgclc> <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" data-astro-cid-icitgclc>Cantidad</label> <input type="number" id="updateAmount" required class="w-full bg-gray-50 border-transparent focus:border-blue-500 focus:bg-white focus:ring-0 rounded-2xl h-14 px-4 text-2xl font-black text-gray-900 transition-colors" placeholder="0" data-astro-cid-icitgclc> <p class="text-xs text-gray-400 mt-2" id="helperText" data-astro-cid-icitgclc>
Ingresa la cantidad a sumar al stock actual.
</p> </div> </div> <div class="p-6 md:p-8 border-t border-gray-100 bg-gray-50 rounded-b-2xl md:rounded-b-[2.5rem] flex justify-end gap-3" data-astro-cid-icitgclc> <button type="button" class="close-modal bg-white border border-gray-200 text-gray-600 font-bold px-6 h-12 rounded-[2.5rem] hover:bg-gray-50" data-astro-cid-icitgclc>Cancelar</button> <button type="button" id="saveUpdateBtn" class="bg-blue-600 text-white font-bold px-8 h-12 rounded-[2.5rem] hover:bg-blue-700 shadow-lg shadow-blue-200" data-astro-cid-icitgclc>Confirmar</button> </div> </form> </dialog> ` })} ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/inventario.astro?astro&type=script&index=0&lang.ts")} `;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/inventario.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/inventario.astro";
const $$url = "/admin/inventario";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Inventario,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
