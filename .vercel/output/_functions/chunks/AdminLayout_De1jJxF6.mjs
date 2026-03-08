import { c as createAstro, a as createComponent, e as addAttribute, r as renderComponent, g as renderHead, d as renderTemplate, h as renderSlot, b as renderScript } from './astro/server_6DCZPHUI.mjs';
import 'piccolore';
/* empty css                            */
import { g as getSupabaseServer } from './supabase_DZdNAR0C.mjs';
import { $ as $$ClientRouter } from './ClientRouter_CAb47kJj.mjs';
/* empty css                            */

const $$Astro = createAstro("https://amasar.co");
const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title = "Panel de Control" } = Astro2.props;
  const supabase = await getSupabaseServer(Astro2.cookies);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  let profileName = "Administrador Principal";
  if (user) {
    user.email || "";
    const { data: profile } = await supabase.from("perfiles").select("nombre").eq("id", user.id).single();
    if (profile?.nombre) {
      profileName = profile.nombre;
    }
  }
  const currentPath = Astro2.url.pathname;
  const isActive = (path) => currentPath.startsWith(path);
  const navItems = [
    {
      name: "Escritorio",
      href: "/admin/dashboard",
      icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    },
    {
      name: "Productos",
      href: "/admin/productos",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    },
    {
      name: "Pedidos",
      href: "/admin/pedidos",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
    },
    {
      name: "Inventario",
      href: "/admin/inventario",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      // Box/Cube icon
    },
    {
      name: "Gastos",
      href: "/admin/gastos",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      // Currency dollar icon
    },
    {
      name: "Estad\xEDsticas",
      href: "/admin/estadisticas",
      icon: "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
      // Chart/Trending icon
    },
    {
      name: "F\xF3rmulas",
      href: "/admin/formulas",
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
      // Beaker/Flask icon
    },
    {
      name: "Producci\xF3n",
      href: "/admin/lanzar-produccion",
      icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      // Play Icon
    },
    {
      name: "Terminal de Ventas",
      href: "/vendedores",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
      // Lightning bolt icon
    },
    {
      name: "Clientes",
      href: "/admin/clientes",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    }
  ];
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} | Amasar Admin</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead()}</head> <body class="bg-gray-50 text-slate-800 font-sans h-screen flex overflow-hidden"> <!-- Mobile Overlay --> <div id="sidebarOverlay" class="fixed inset-0 bg-black/50 z-40 hidden md:hidden backdrop-blur-sm transition-opacity"></div> <!-- Sidebar --> <aside id="adminSidebar" class="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col shrink-0 transform -translate-x-full md:relative md:translate-x-0 transition-transform duration-300"> <div class="p-8 border-b border-gray-100 flex items-center justify-between gap-3"> <div class="flex items-center gap-3"> <div class="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-white font-bold text-sm shadow-md">
A
</div> <div> <span class="font-serif text-xl font-bold text-secondary block leading-none">Amasar</span> <span class="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Admin Panel</span> </div> </div> <!-- Mobile Close Button --> <button id="closeSidebarBtn" class="md:hidden text-gray-400 hover:text-gray-600"> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <nav class="flex-1 p-6 space-y-2 overflow-y-auto"> <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">
Menu Principal
</p> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`flex items-center gap-3 px-4 py-3.5 text-sm font-medium rounded-2xl transition-all ${isActive(item.href) && item.href !== "/admin/dashboard" || item.href === "/admin/dashboard" && currentPath === "/admin/dashboard" || item.href === "/admin/productos" && currentPath.includes("/admin/productos") ? "bg-primary text-white shadow-lg shadow-primary/25" : "text-slate-600 hover:bg-gray-50 hover:text-primary"}`, "class")}> <svg xmlns="http://www.w3.org/2000/svg"${addAttribute(`w-5 h-5 ${isActive(item.href) && item.href !== "/admin/dashboard" || item.href === "/admin/dashboard" && currentPath === "/admin/dashboard" || item.href === "/admin/productos" && currentPath.includes("/admin/productos") ? "text-white" : "text-slate-400"}`, "class")} fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${addAttribute(item.icon, "d")}></path> </svg> ${item.name} </a>`)} </nav> <div class="p-6 border-t border-gray-100"> <button id="logoutBtn" class="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path> </svg>
Cerrar Sesión
</button> </div> </aside> <!-- Main Content --> <main class="flex-1 overflow-auto bg-gray-50 flex flex-col w-full"> <!-- Header --> <header class="bg-white/80 backdrop-blur-md h-20 items-center px-4 md:px-8 border-b border-gray-200 flex justify-between sticky top-0 z-30"> <div class="flex items-center gap-3"> <button id="menuBtn" class="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"> <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> <h2 class="text-xl md:text-2xl font-serif text-secondary truncate max-w-[200px] md:max-w-none"> ${title} </h2> </div> <div class="flex items-center gap-4"> <div class="text-right hidden md:block"> <span class="block text-sm font-bold text-slate-700">${profileName}</span> <span class="block text-xs text-slate-400">Administrador</span> </div> <div class="w-10 h-10 rounded-full bg-gray-100 border border-white shadow-sm overflow-hidden"> <img src="https://ui-avatars.com/api/?name=Admin+Amasar&background=random" alt="Admin" class="w-full h-full object-cover"> </div> </div> </header> <div class="p-4 md:p-8 max-w-7xl w-full mx-auto"> ${renderSlot($$result, $$slots["default"])} </div> </main> ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
