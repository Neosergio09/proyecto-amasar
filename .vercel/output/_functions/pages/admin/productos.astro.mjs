import { c as createAstro, a as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_De1jJxF6.mjs';
import { g as getSupabaseServer, a as getOptimizedImage } from '../../chunks/supabase_DZdNAR0C.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://amasar.co");
const $$Productos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Productos;
  const supabase = await getSupabaseServer(Astro2.cookies);
  let productos = [];
  try {
    const { data, error } = await supabase.from("productos").select("*").order("nombre", { ascending: true });
    if (error) {
      throw error;
    }
    productos = data || [];
  } catch (err) {
    console.error("Error fetching products:", err);
  }
  let artistas = [];
  try {
    const { data: profiles, error: profileError } = await supabase.from("perfiles").select("id, nombre, telefono, rol").order("nombre", { ascending: true });
    if (profileError) {
      console.warn("Error fetching profiles:", profileError);
    } else {
      artistas = profiles || [];
    }
  } catch (err) {
    console.error("Error fetching artists:", err);
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Gesti\xF3n de Productos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"> <div> <h1 class="text-3xl font-serif text-secondary mb-2">Inventario</h1> <p class="text-slate-500 text-sm">
Gestiona el stock y precios de tus productos en tiempo real.
</p> </div> <a href="/admin/productos/nuevo" class="w-full md:w-auto bg-primary text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-orange-600 transition-colors text-sm flex items-center justify-center gap-2"> <span>+ Nuevo Producto</span> </a> </div> <div class="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden"> <div class="overflow-x-auto"> <table class="w-full text-left border-collapse"> <thead class="bg-gray-50/50 border-b border-gray-100"> <tr> <th class="px-3 md:px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">Producto</th> <th class="px-3 md:px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">Categoría</th> <th class="px-2 md:px-4 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500 w-auto min-w-[140px] whitespace-nowrap">Precio</th> <th class="px-3 md:px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500 w-32">Stock</th> <th class="px-3 md:px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500 text-right">Estado</th> <th class="px-3 md:px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500 text-center">Acciones</th> </tr> </thead> <tbody class="divide-y divide-gray-100"> ${productos?.map((producto) => renderTemplate`<tr class="hover:bg-slate-50/50 transition-colors group"> <td class="px-3 md:px-6 py-4"> <div class="flex items-center gap-4"> <div class="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100"> <img${addAttribute(getOptimizedImage(producto.imagen_url, 100), "src")}${addAttribute(producto.nombre, "alt")} class="w-full h-full object-cover" loading="lazy" width="48" height="48"> </div> <div> <p class="font-bold text-secondary text-sm"> ${producto.nombre} </p> <p class="text-xs text-slate-400 truncate max-w-[200px]"> ${producto.descripcion?.substring(0, 30)}...
</p> </div> </div> </td> <td class="px-3 md:px-6 py-4"> <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize"> ${producto.categoria} </span> </td> <td class="px-3 md:px-6 py-4 whitespace-nowrap"> <div class="relative"> <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
$
</span> <input type="number"${addAttribute(producto.precio, "value")}${addAttribute(producto.id, "data-id")} data-field="precio" class="editable-input w-full pl-6 pr-3 py-2 text-sm font-medium text-slate-700 bg-transparent border border-transparent hover:border-gray-200 focus:bg-white focus:border-primary rounded-lg transition-all outline-none" placeholder="0.00"> </div> </td> <td class="px-3 md:px-6 py-4"> <div class="flex items-center gap-2"> <span class="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md min-w-[30px] text-center stock-display"${addAttribute(producto.id, "data-id")}> ${producto.stock_cantidad} </span> <input type="number"${addAttribute(producto.id, "data-id")} data-field="stock_cantidad" class="editable-input w-20 px-2 py-1 text-xs font-medium text-slate-700 bg-white border border-gray-200 focus:border-primary rounded-lg transition-all outline-none" placeholder="+/-"> </div> </td> <td class="px-3 md:px-6 py-4 text-right"> <span${addAttribute(`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${producto.stock_cantidad > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`, "class")}> <span${addAttribute(`w-1.5 h-1.5 rounded-full ${producto.stock_cantidad > 0 ? "bg-green-500" : "bg-red-500"}`, "class")}></span> ${producto.stock_cantidad > 0 ? "En Stock" : "Agotado"} </span> </td> <td class="px-3 md:px-6 py-4 text-center"> <button type="button" class="request-production-btn p-2 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 hover:scale-110 transition-all shadow-sm" title="Solicitar Producción a Artista"${addAttribute(JSON.stringify(producto), "data-product")}>
🎨
</button> </td> </tr>`)} </tbody> </table> </div> </div>  <div id="toast" class="fixed bottom-6 right-6 transform translate-y-24 opacity-0 transition-all duration-300 z-50"> <div class="bg-secondary text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <span class="font-medium text-sm">Cambios guardados correctamente</span> </div> </div>  <dialog id="productionModal" class="bg-white rounded-2xl md:rounded-[2.5rem] shadow-2xl p-0 w-[95%] md:w-full max-w-lg backdrop:bg-gray-900/20 backdrop:backdrop-blur-sm open:animate-fade-in"> <form method="dialog" class="flex flex-col h-full"> <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center"> <h3 class="text-xl font-black text-gray-900 flex items-center gap-2">
🎨 Solicitar Producción
</h3> <button type="button" class="close-prod-modal w-11 h-11 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> </button> </div> <div class="p-8 space-y-6"> <!-- Selected Product Preview --> <div class="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100"> <img id="modalProdImage" src="" alt="Producto" class="w-16 h-16 rounded-xl object-cover bg-white shadow-sm"> <div> <h4 id="modalProdName" class="font-bold text-gray-900 leading-tight">
...
</h4> <p class="text-xs text-gray-500 mt-1">Referencia para el artista</p> </div> </div> <!-- Artist Selection --> <div> <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Asignar Artista</label> <div class="relative"> <select id="prodArtistSelect" class="w-full bg-gray-50 border-transparent focus:border-purple-500 focus:bg-white focus:ring-0 rounded-2xl h-12 px-4 font-medium appearance-none transition-colors cursor-pointer"> <option value="">Seleccione un artista...</option> ${artistas.map((a) => renderTemplate`<option${addAttribute(a.telefono, "value")}${addAttribute(a.nombre, "data-name")}> ${a.nombre} ${a.rol ? `(${a.rol})` : ""} </option>`)} </select> <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg> </div> </div> </div> <!-- Instructions --> <div> <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Instrucciones / Notas</label> <textarea id="prodNotes" rows="3" class="w-full bg-gray-50 border-transparent focus:border-purple-500 focus:bg-white focus:ring-0 rounded-2xl p-4 font-medium transition-colors resize-none" placeholder="Ej. Necesitamos 5 unidades urgentes para el stock de la tarde..."></textarea> </div> </div> <div class="p-8 border-t border-gray-100 bg-gray-50 rounded-b-[2.5rem] flex justify-end gap-3"> <button type="button" class="close-prod-modal bg-white border border-gray-200 text-gray-600 font-bold px-6 h-12 rounded-[2.5rem] hover:bg-gray-50">Cancelar</button> <button type="button" id="sendProductionBtn" class="bg-purple-600 text-white font-bold px-8 h-12 rounded-[2.5rem] hover:bg-purple-500 shadow-lg shadow-purple-200 flex items-center gap-2"> <span>Enviar WhatsApp</span> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-.967-.272-.149-.471-.223-.669.124-.198.346-.769.967-.943 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.298-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path></svg> </button> </div> </form> </dialog> ` })} ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/productos.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/productos.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/productos.astro";
const $$url = "/admin/productos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Productos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
