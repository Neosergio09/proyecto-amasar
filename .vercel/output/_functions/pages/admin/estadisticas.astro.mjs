import { c as createAstro, a as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_De1jJxF6.mjs';
import { g as getSupabaseServer } from '../../chunks/supabase_DZdNAR0C.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://amasar.co");
const $$Estadisticas = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Estadisticas;
  const supabase = await getSupabaseServer(Astro2.cookies);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return Astro2.redirect("/admin/login");
  const url = Astro2.url;
  const period = url.searchParams.get("period") || "30";
  let startDateStr = "";
  if (period !== "all") {
    const days = parseInt(period, 10);
    const date = /* @__PURE__ */ new Date();
    date.setDate(date.getDate() - days);
    startDateStr = date.toISOString().split("T")[0];
  }
  let query = supabase.from("pedidos").select("detalles, total").neq("estado", "Cancelado");
  if (period !== "all" && startDateStr) {
    query = query.gte("created_at", startDateStr);
  }
  const { data: pedidosList, error: pedidosError } = await query;
  const validPedidos = pedidosList || [];
  const { data: productosList, error: productosError } = await supabase.from("productos").select("id, nombre, categoria").eq("is_active", true);
  const masterProducts = productosList || [];
  const productStats = {};
  masterProducts.forEach((prod) => {
    productStats[prod.id] = {
      qty: 0,
      revenue: 0,
      id: prod.id,
      name: prod.nombre
    };
  });
  let totalUnitsSold = 0;
  const categoryRevenue = {};
  validPedidos.forEach((pedido) => {
    const detalles = pedido.detalles || [];
    detalles.forEach((item) => {
      const id = item.id;
      const qty = item.cantidad || item.qty || 0;
      const price = item.precio || item.price || 0;
      const rev = qty * price;
      totalUnitsSold += qty;
      if (productStats[id]) {
        productStats[id].qty += qty;
        productStats[id].revenue += rev;
      } else {
        productStats[id] = {
          qty,
          revenue: rev,
          id,
          name: item.name || item.visualName || "Producto inactivo"
        };
      }
    });
  });
  masterProducts.forEach((prod) => {
    const pStat = productStats[prod.id];
    if (pStat && pStat.revenue > 0) {
      if (!categoryRevenue[prod.categoria]) {
        categoryRevenue[prod.categoria] = 0;
      }
      categoryRevenue[prod.categoria] += pStat.revenue;
    }
  });
  let mostProfitableCategory = "N/A";
  let maxCatRev = -1;
  for (const cat in categoryRevenue) {
    if (categoryRevenue[cat] > maxCatRev) {
      maxCatRev = categoryRevenue[cat];
      mostProfitableCategory = cat;
    }
  }
  const sortedProducts = Object.values(productStats).sort(
    (a, b) => b.qty - a.qty
  );
  const top5 = sortedProducts.slice(0, 5);
  const bottom5 = sortedProducts.slice(-5).reverse();
  const maxTopQty = top5.length > 0 ? top5[0].qty : 1;
  const maxBottomQty = bottom5.length > 0 ? Math.max(...bottom5.map((p) => p.qty), 1) : 1;
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Estad\xEDsticas e Inteligencia de Negocios" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-6xl mx-auto space-y-8"> <!-- Header & Time Filter --> <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"> <div> <h1 class="text-3xl font-black text-slate-800">
Tendencias de Ventas
</h1> <p class="text-slate-500">
Analiza el movimiento de tus productos para evitar pérdidas
                    de inventario.
</p> </div> <div class="inline-flex bg-slate-100 rounded-xl p-1 shadow-sm"> <a href="?period=7"${addAttribute(`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${period === "7" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`, "class")}>7 Días</a> <a href="?period=30"${addAttribute(`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${period === "30" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`, "class")}>30 Días</a> <a href="?period=all"${addAttribute(`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${period === "all" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-800"}`, "class")}>Histórico</a> </div> </div> <!-- High-Level Metric Cards --> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl p-6 shadow-lg shadow-indigo-200 text-white relative overflow-hidden"> <div class="relative z-10"> <p class="text-xs uppercase tracking-widest font-bold text-indigo-100 mb-2">
Unidades Totales Vendidas
</p> <h3 class="text-5xl font-black">${totalUnitsSold}</h3> <p class="text-indigo-200 text-sm mt-2"> ${period === "all" ? "En todo el tiempo" : `En los \xFAltimos ${period} d\xEDas`} </p> </div> <!-- Graphic absolute bg --> <svg class="absolute -right-6 -bottom-6 w-40 h-40 text-white/10" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path></svg> </div> <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 relative overflow-hidden flex flex-col justify-center"> <p class="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">
Categoría Más Rentable
</p> <div class="flex items-center gap-4"> <div class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path> </svg> </div> <h3 class="text-3xl font-black text-slate-800"> ${mostProfitableCategory} </h3> </div> </div> </div> <!-- Lists Grid --> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"> <!-- Top 5 Card --> <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100"> <div class="flex items-center gap-3 mb-8"> <div class="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path> </svg> </div> <div> <h2 class="text-xl font-bold text-slate-800">
Top 5: Más Vendidos
</h2> <p class="text-xs text-slate-400">
Los productos estrella del periodo.
</p> </div> </div> <div class="space-y-6"> ${top5.map((prod, index) => {
    const bgPercent = maxTopQty > 0 ? prod.qty / maxTopQty * 100 : 0;
    return renderTemplate`<div> <div class="flex justify-between items-end mb-1"> <span class="text-sm font-bold text-slate-700 flex items-center gap-2"> <span class="text-slate-400 font-normal">
#${index + 1} </span>${" "} ${prod.name} </span> <span class="text-sm font-black text-slate-800"> ${prod.qty}${" "} <span class="text-[10px] text-slate-400 font-normal uppercase">
unidades
</span> </span> </div> <div class="w-full bg-slate-100 rounded-full h-2"> <div class="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"${addAttribute(`width: ${bgPercent}%`, "style")}></div> </div> </div>`;
  })} </div> </div> <!-- Bottom 5 Card --> <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100"> <div class="flex items-center gap-3 mb-8"> <div class="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path> </svg> </div> <div> <h2 class="text-xl font-bold text-slate-800">
Baja Rotación
</h2> <p class="text-xs text-red-400 font-medium">
⚠️ Riesgo de pérdida de inventario
</p> </div> </div> <div class="space-y-6 flex flex-col justify-end"> ${bottom5.map((prod, index) => {
    const bgPercent = maxBottomQty > 0 ? prod.qty / maxBottomQty * 100 : 0;
    const barColor = prod.qty === 0 ? "bg-red-500" : "bg-orange-400";
    return renderTemplate`<div> <div class="flex justify-between items-end mb-1"> <span class="text-sm font-bold text-slate-700 clamp-1"> ${prod.name} </span> <span${addAttribute(`text-sm font-black ${prod.qty === 0 ? "text-red-600" : "text-slate-800"}`, "class")}> ${prod.qty}${" "} <span class="text-[10px] text-slate-400 font-normal uppercase">
unidades
</span> </span> </div> <div class="w-full bg-slate-100 rounded-full h-1.5 opacity-80"> <div${addAttribute(`${barColor} h-1.5 rounded-full transition-all duration-1000 ease-out`, "class")}${addAttribute(`width: ${prod.qty === 0 ? 100 : bgPercent}%`, "style")}></div> </div> </div>`;
  })} </div> </div> </div> </div> ` })}`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/estadisticas.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/estadisticas.astro";
const $$url = "/admin/estadisticas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Estadisticas,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
