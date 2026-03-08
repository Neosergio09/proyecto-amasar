import { c as createAstro, a as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute, b as renderScript } from '../../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_De1jJxF6.mjs';
import { s as supabase } from '../../chunks/supabase_DZdNAR0C.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://amasar.co");
const prerender = false;
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const title = "Escritorio de Control | Amasar";
  const resultados = await Promise.all([
    supabase.from("contactos").select("*", { count: "exact", head: true }),
    supabase.from("productos").select("*", { count: "exact", head: true }),
    supabase.from("pedidos").select("*", { count: "exact", head: true }).neq("estado", "Entregado"),
    supabase.from("contactos").select("*").order("creado_en", { ascending: false }).limit(10)
  ]);
  const totalContactos = resultados[0].count ?? 0;
  const totalProductos = resultados[1].count ?? 0;
  const pedidosActivos = resultados[2].count ?? 0;
  const { data: ultimosContactos, error: contactError } = resultados[3];
  if (contactError) console.error("Error en Dashboard:", contactError.message);
  (/* @__PURE__ */ new Date()).toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const getBadgeStyles = (tipo) => {
    switch (tipo) {
      case "Empresa":
        return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "Particular":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "Panaderia":
        return "bg-blue-50 text-blue-600 border-blue-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": title }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16"> <div class="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100"> <p class="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-4">
Total Contactos
</p> <h3 class="text-6xl font-serif text-secondary leading-none"> ${totalContactos} </h3> </div> <div class="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100"> <p class="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-4">
Productos
</p> <h3 class="text-6xl font-serif text-secondary leading-none"> ${totalProductos} </h3> </div> <div class="bg-secondary p-10 rounded-[3rem] shadow-xl text-white"> <p class="text-[10px] uppercase tracking-widest text-white/60 font-black mb-4">
Órdenes Activas
</p> <h3 class="text-6xl font-serif leading-none">${pedidosActivos}</h3> </div> </div> <section class="bg-white rounded-[3.5rem] shadow-sm border border-slate-100 overflow-hidden"> <div class="p-10 border-b border-slate-50 space-y-8"> <div class="flex justify-between items-center"> <h2 class="text-2xl font-serif text-secondary">
Últimas <span class="text-primary italic">Solicitudes</span> </h2> </div> <div class="flex flex-col md:flex-row gap-4"> <div class="flex-grow relative"> <span class="absolute left-4 top-1/2 -translate-y-1/2 opacity-30">🔍</span> <input type="text" id="searchInput" placeholder="Buscar por panadería o encargado..." class="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-primary text-sm transition-all"> </div> <select id="typeFilter" class="p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-primary text-sm font-bold text-secondary cursor-pointer"> <option value="todos">Todos los segmentos</option> <option value="Panaderia">Panaderías</option> <option value="Empresa">Empresas</option> <option value="Particular">Particulares</option> </select> </div> </div> <div class="overflow-x-auto"> ${ultimosContactos && ultimosContactos.length > 0 ? renderTemplate`<table class="w-full text-left" id="contactsTable"> <thead> <tr class="bg-slate-50/50 text-[10px] uppercase tracking-widest text-slate-400"> <th class="px-10 py-6">Tipo</th> <th class="px-10 py-6">Entidad / Nombre</th> <th class="px-10 py-6">Interés</th> <th class="px-10 py-6 text-right">Acción</th> </tr> </thead> <tbody class="divide-y divide-slate-50"> ${ultimosContactos.map((con) => renderTemplate`<tr class="contact-row hover:bg-slate-50/30 transition-colors"${addAttribute(con.tipo_cliente, "data-tipo")}> <td class="px-10 py-8"> <span${addAttribute(`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getBadgeStyles(con.tipo_cliente)}`, "class")}> ${con.tipo_cliente || "N/A"} </span> </td> <td class="px-10 py-8"> <p class="font-bold text-secondary text-lg search-target"> ${con.panaderia_nombre} </p> <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tighter search-target"> ${con.contacto_nombre} </p> </td> <td class="px-10 py-8 text-sm font-medium text-slate-600"> ${con.interes_producto} </td> <td class="px-10 py-8 text-right"> <a${addAttribute(`https://wa.me/57${con.whatsapp}`, "href")} target="_blank" class="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all">
WhatsApp
</a> </td> </tr>`)} </tbody> </table>` : renderTemplate`<div class="p-20 text-center text-slate-400 italic">
No hay solicitudes nuevas.
</div>`} </div> </section> ${renderScript($$result2, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/dashboard.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/dashboard.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
