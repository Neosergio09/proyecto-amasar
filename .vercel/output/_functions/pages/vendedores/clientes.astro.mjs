import { c as createAstro, a as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead, e as addAttribute, F as Fragment } from '../../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$VendedorLayout } from '../../chunks/VendedorLayout_DeExs2xI.mjs';
import { g as getSupabaseServer } from '../../chunks/supabase_DZdNAR0C.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://amasar.co");
const $$Clientes = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Clientes;
  const supabase = await getSupabaseServer(Astro2.cookies);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Astro2.redirect("/admin/login");
  }
  const { data: clientes, error } = await supabase.from("clientes").select("*").eq("vendedor_id", user.id).eq("status", "activo").order("nombre_comercial");
  if (error) {
    console.error("Error fetching clientes:", error);
  }
  const allClients = clientes || [];
  const isInactive = (dateStr) => {
    if (!dateStr) return false;
    const last = new Date(dateStr);
    const now = /* @__PURE__ */ new Date();
    const diff = now.getTime() - last.getTime();
    const days = diff / (1e3 * 3600 * 24);
    return days > 90;
  };
  return renderTemplate`${renderComponent($$result, "VendedorLayout", $$VendedorLayout, { "title": "Mis Clientes | Amasar Go" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 pb-24"> <!-- Header Sticky --> <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 px-6 py-4 rounded-b-[2rem]"> <div class="flex items-center justify-between mb-4"> <a href="/vendedores" class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> </a> <h1 class="text-xl font-black text-gray-900 tracking-tight">
Mis Clientes
</h1> <!-- New Customer Button --> <a href="/vendedores/clientes/nuevo" class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-500 transition-all active:scale-95"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> </a> </div> <!-- Buscador --> <div class="relative"> <input type="search" id="clientSearch" placeholder="Buscar cliente..." class="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 rounded-2xl text-base outline-none transition-all placeholder-gray-400"> <svg class="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> </div> <!-- Filters --> <div class="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1"> <button id="filterActive" class="filter-btn active px-4 py-2 bg-gray-900 text-white rounded-full text-xs font-bold whitespace-nowrap transition-colors">Activos</button> <button id="filterAll" class="filter-btn px-4 py-2 bg-white text-gray-500 border border-gray-100 rounded-full text-xs font-bold whitespace-nowrap transition-colors">Todos</button> </div> </header> <!-- Lista de Clientes --> <main class="p-4 space-y-3 mt-2" id="clientListContainer"> ${allClients.map((cliente) => {
    const needsRecovery = isInactive(cliente.ultima_compra_at);
    const isActive = cliente.status === "activo" || !cliente.status;
    return renderTemplate`<button class="client-card w-full text-left bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 hover:shadow-md active:scale-98 transition-all group relative overflow-hidden"${addAttribute(cliente.id, "data-id")}${addAttribute(cliente.nombre_comercial, "data-nombre")}${addAttribute(cliente.telefono, "data-telefono")}${addAttribute(isActive ? "activo" : "inactivo", "data-status")}> ${needsRecovery && renderTemplate`<div class="absolute top-0 right-0 bg-orange-100 text-orange-600 text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-orange-50">
Recuperar
</div>`} ${!isActive && !needsRecovery && renderTemplate`<div class="absolute top-0 right-0 bg-gray-100 text-gray-500 text-[10px] font-bold px-3 py-1 rounded-bl-xl">
Inactivo
</div>`} <div class="flex items-center gap-4"> <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center font-bold text-lg group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all"> ${cliente.nombre_comercial.charAt(0).toUpperCase()} </div> <div class="flex-1"> <h3 class="font-bold text-gray-900 text-base leading-tight"> ${cliente.nombre_comercial} </h3> <p class="text-xs text-gray-400 mt-1 flex items-center gap-1"> <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path> ` })} </svg> ${cliente.direccion || "Sin direcci\xF3n"} </p> </div> <div class="text-gray-300"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </div> </div> </button>`;
  })} ${allClients.length === 0 && renderTemplate`<div class="text-center py-12 px-6"> <div class="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-gray-400"> <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg> </div> <h3 class="text-gray-900 font-bold text-lg mb-1">
Tu ruta está vacía
</h3> <p class="text-gray-500 text-sm">
No tienes clientes activos asignados en este
                            momento. Contacta a tu administrador si crees que es
                            un error.
</p> </div>`} <div id="noResults" class="hidden text-center py-12"> <p class="text-gray-500">No se encontraron clientes.</p> </div> </main> </div> ` })} ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/clientes.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/clientes.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/vendedores/clientes.astro";
const $$url = "/vendedores/clientes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Clientes,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
