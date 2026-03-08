import { c as createAstro, a as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute, b as renderScript } from '../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$VendedorLayout } from '../chunks/VendedorLayout_DeExs2xI.mjs';
import { g as getSupabaseServer, a as getOptimizedImage } from '../chunks/supabase_DZdNAR0C.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://amasar.co");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const supabase = await getSupabaseServer(Astro2.cookies);
  const { data: { user } } = await supabase.auth.getUser();
  let perfil = { nombre: "", rol: "" };
  let displayName = "Vendedor";
  if (user) {
    try {
      const { data: profileData, error: profileError } = await supabase.from("perfiles").select("nombre, rol").eq("id", user.id).single();
      if (profileData) {
        perfil = profileData;
        displayName = profileData.nombre || user.email?.split("@")[0] || "Vendedor";
      } else {
        displayName = user.email?.split("@")[0] || "Vendedor";
      }
    } catch (e) {
      console.error("Error fetching profile:", e);
      displayName = user.email?.split("@")[0] || "Vendedor";
    }
  }
  const { data: rawProductos, error } = await supabase.from("productos").select("id, nombre, precio, imagen_url, stock_cantidad, categoria").order("nombre");
  if (error) {
    console.error("Error cargando productos:", error);
  }
  const productos = (rawProductos || []).filter((p) => p.nombre && p.precio != null).map((p) => ({
    ...p,
    categoria: p.categoria || "Varios"
  }));
  const categorias = [...new Set(productos.map((p) => p.categoria))].filter(Boolean).sort();
  return renderTemplate`${renderComponent($$result, "VendedorLayout", $$VendedorLayout, { "title": "Amasar Go - Terminal", "data-astro-cid-z7dwg2ug": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<header class="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 shadow-xl rounded-b-[2.5rem] px-5 py-4 transition-all duration-300" data-astro-cid-z7dwg2ug> <!-- Nivel 1: Identidad --> <div class="flex items-center justify-between mb-4" data-astro-cid-z7dwg2ug> <div class="flex items-center gap-3" data-astro-cid-z7dwg2ug> <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-200" data-astro-cid-z7dwg2ug> ${displayName.charAt(0).toUpperCase()} </div> <div class="flex flex-col" data-astro-cid-z7dwg2ug> <span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest" data-astro-cid-z7dwg2ug>Hola,</span> <span class="text-gray-900 font-bold text-lg leading-none truncate max-w-[160px]" data-astro-cid-z7dwg2ug>${displayName}</span> </div> </div> <button id="logoutBtn" class="group flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-90" title="Cerrar Sesión" data-astro-cid-z7dwg2ug> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-z7dwg2ug> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-astro-cid-z7dwg2ug></path> </svg> </button> </div> <!-- Nivel 2: Branding y Estado --> <div class="flex items-center justify-between mb-5 px-1" data-astro-cid-z7dwg2ug> <div class="flex flex-col" data-astro-cid-z7dwg2ug> <h1 class="text-2xl font-black tracking-tighter text-gray-900 leading-none" data-astro-cid-z7dwg2ug>
Amasar <span class="text-blue-600" data-astro-cid-z7dwg2ug>Go</span> 🚀
</h1> <span id="customerNameRef" class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1" data-astro-cid-z7dwg2ug>
Pedido General
</span> </div> <div class="flex items-center gap-1.5 px-2.5 py-1 bg-green-100/80 text-green-700 rounded-full border border-green-200 shadow-sm" data-astro-cid-z7dwg2ug> <span class="relative flex h-2 w-2" data-astro-cid-z7dwg2ug> <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" data-astro-cid-z7dwg2ug></span> <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500" data-astro-cid-z7dwg2ug></span> </span> <span class="text-[10px] font-bold tracking-wide" data-astro-cid-z7dwg2ug>EN LÍNEA</span> </div> </div> <!-- Quick Action Toolbar --> <div class="grid grid-cols-2 gap-3 mb-4" data-astro-cid-z7dwg2ug> <a href="/vendedores/clientes" class="flex items-center justify-center gap-2 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 p-2.5 rounded-2xl transition-all shadow-sm active:scale-95 group" data-astro-cid-z7dwg2ug> <span class="text-lg" data-astro-cid-z7dwg2ug>👤</span> <span class="font-bold text-gray-700 text-sm group-hover:text-blue-700" data-astro-cid-z7dwg2ug>Mis Clientes</span> </a> <a href="/vendedores/historial" class="flex items-center justify-center gap-2 bg-purple-50/50 hover:bg-purple-50 border border-purple-100 p-2.5 rounded-2xl transition-all shadow-sm active:scale-95 group" data-astro-cid-z7dwg2ug> <span class="text-lg" data-astro-cid-z7dwg2ug>📋</span> <span class="font-bold text-gray-700 text-sm group-hover:text-purple-700" data-astro-cid-z7dwg2ug>Historial</span> </a> </div> <!-- Nivel 3: Buscador y Filtros --> <div class="space-y-3" data-astro-cid-z7dwg2ug> <!-- Buscador --> <div class="relative group" data-astro-cid-z7dwg2ug> <input type="search" id="searchInput" placeholder="Buscar productos..." class="w-full pl-11 pr-4 py-3 bg-gray-100/80 border-2 border-transparent focus:bg-white focus:border-blue-500 rounded-2xl text-base transition-all outline-none placeholder-gray-400 shadow-inner" data-astro-cid-z7dwg2ug> <svg class="w-5 h-5 text-gray-400 absolute left-4 top-3.5 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-z7dwg2ug> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-astro-cid-z7dwg2ug></path> </svg> </div> <!-- Filtros --> <div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-5 px-5 scroll-smooth" data-astro-cid-z7dwg2ug> <button class="filter-btn active whitespace-nowrap px-5 py-2 rounded-2xl text-sm font-bold bg-gray-900 text-white shadow-lg shadow-gray-200 transition-all scale-100" data-cat="todas" data-astro-cid-z7dwg2ug>
Todas
</button> ${categorias.map((cat) => renderTemplate`<button class="filter-btn whitespace-nowrap px-5 py-2 rounded-2xl text-sm font-bold bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-sm"${addAttribute(cat, "data-cat")} data-astro-cid-z7dwg2ug> ${cat} </button>`)} </div> </div> </header>  <div class="h-[340px]" data-astro-cid-z7dwg2ug></div>  <main class="px-4 pb-24 space-y-4" data-astro-cid-z7dwg2ug> ${productos.map((prod) => {
    const stock = prod.stock_cantidad ?? 0;
    const precio = prod.precio ?? 0;
    const sinStock = stock === 0;
    return renderTemplate`<article${addAttribute(`product-card flex items-center p-3 sm:p-4 bg-white rounded-[2.5rem] shadow-xl shadow-gray-100/50 border border-gray-100 transition-all duration-300 ${sinStock ? "opacity-60 grayscale" : "hover:-translate-y-1 hover:shadow-2xl"}`, "class")}${addAttribute((prod.nombre || "").toLowerCase(), "data-nombre")}${addAttribute(prod.categoria, "data-cat")}${addAttribute(prod.id, "data-id")}${addAttribute(precio, "data-price")}${addAttribute(stock, "data-stock")} data-astro-cid-z7dwg2ug> <!-- Miniatura --> <div class="flex-shrink-0 mr-4" data-astro-cid-z7dwg2ug> <img${addAttribute(getOptimizedImage(prod.imagen_url, 200), "src")}${addAttribute(prod.nombre ?? "Producto", "alt")} class="w-20 h-20 rounded-[1.5rem] object-cover bg-slate-100 border border-gray-100 shadow-inner" loading="lazy" width="80" height="80" data-astro-cid-z7dwg2ug> </div> <!-- Info --> <div class="flex-1 min-w-0 pr-1" data-astro-cid-z7dwg2ug> <h3 class="font-bold text-gray-900 text-base leading-tight mb-1 truncate" data-astro-cid-z7dwg2ug>${prod.nombre ?? "Sin nombre"}</h3> <div class="flex flex-wrap items-center gap-2" data-astro-cid-z7dwg2ug> <span class="text-blue-600 font-black text-lg" data-astro-cid-z7dwg2ug>$${precio.toLocaleString("es-CO")}</span> ${sinStock && renderTemplate`<span class="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-100" data-astro-cid-z7dwg2ug>Agotado</span>`} </div> <div class="text-xs font-medium text-gray-400 mt-1 flex items-center gap-1" data-astro-cid-z7dwg2ug> <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-z7dwg2ug><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-astro-cid-z7dwg2ug></path></svg>
Stock: ${stock} </div> </div> <!-- Selector de Cantidad --> <div class="flex flex-col items-center gap-1 bg-gray-50 rounded-2xl p-1.5 border border-gray-100" data-astro-cid-z7dwg2ug> <button class="qty-btn w-9 h-9 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-200 text-blue-600 active:scale-90 active:bg-blue-50 transition-all disabled:opacity-40 disabled:active:scale-100" data-action="increase"${addAttribute(sinStock, "disabled")} data-astro-cid-z7dwg2ug> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-z7dwg2ug><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" data-astro-cid-z7dwg2ug></path></svg> </button> <span class="w-8 text-center font-bold text-gray-900 text-sm tabular-nums qty-display py-0.5" data-astro-cid-z7dwg2ug>0</span> <button class="qty-btn w-9 h-9 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-200 text-gray-400 hover:text-red-500 active:scale-90 active:bg-red-50 transition-all disabled:opacity-40 disabled:active:scale-100" data-action="decrease" disabled data-astro-cid-z7dwg2ug> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-z7dwg2ug><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4" data-astro-cid-z7dwg2ug></path></svg> </button> </div> </article>`;
  })} <!-- Estado Vacío --> <div id="emptyState"${addAttribute(productos.length === 0 ? "text-center py-12" : "hidden text-center py-12", "class")} data-astro-cid-z7dwg2ug> <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4 text-4xl" data-astro-cid-z7dwg2ug>📦</div> <p class="text-gray-500 font-medium" data-astro-cid-z7dwg2ug>No se encontraron productos.</p> </div> </main>  <div class="fixed bottom-4 left-4 right-4 z-40 pb-safe" data-astro-cid-z7dwg2ug> <div class="bg-gray-900 text-white p-2 pl-5 rounded-[2rem] shadow-2xl shadow-gray-500/50 flex items-center justify-between border border-gray-800 max-w-md mx-auto ring-4 ring-white/20 backdrop-blur-xl" data-astro-cid-z7dwg2ug> <div class="flex flex-col" data-astro-cid-z7dwg2ug> <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider" data-astro-cid-z7dwg2ug>Total</span> <span class="text-xl font-black text-white leading-none" id="totalPrice" data-astro-cid-z7dwg2ug>$0</span> </div> <button id="checkoutBtn" class="bg-blue-600 hover:bg-blue-500 text-white h-12 px-6 rounded-[1.5rem] font-bold text-base shadow-lg shadow-blue-900/50 disabled:opacity-50 disabled:shadow-none disabled:bg-gray-700 flex items-center gap-2 active:scale-95 transition-all" disabled onclick="window.location.href='/vendedores/confirmar'" data-astro-cid-z7dwg2ug> <span data-astro-cid-z7dwg2ug>Confirmar</span> <span class="bg-white text-blue-600 text-[10px] font-black px-1.5 py-0.5 rounded-full hidden" id="itemCountBadge" data-astro-cid-z7dwg2ug>0</span> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-z7dwg2ug><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-astro-cid-z7dwg2ug></path></svg> </button> </div> </div> ${renderScript($$result2, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/index.astro?astro&type=script&index=0&lang.ts")}  ` })}`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/index.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/index.astro";
const $$url = "/vendedores";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
