import { c as createAstro, a as createComponent, d as renderTemplate, f as defineScriptVars, r as renderComponent, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_De1jJxF6.mjs';
import { g as getSupabaseServer } from '../../chunks/supabase_DZdNAR0C.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://amasar.co");
const $$Gastos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Gastos;
  const supabase = await getSupabaseServer(Astro2.cookies);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return Astro2.redirect("/admin/login");
  let formError = "";
  let formSuccess = "";
  if (Astro2.request.method === "POST") {
    try {
      const data = await Astro2.request.formData();
      const descripcion = data.get("descripcion")?.toString();
      const monto = parseFloat(data.get("monto")?.toString() || "0");
      const categoria = data.get("categoria")?.toString();
      const fecha_gasto = data.get("fecha_gasto")?.toString();
      if (!descripcion || isNaN(monto) || monto <= 0 || !categoria || !fecha_gasto) {
        formError = "Todos los campos son obligatorios y el monto debe ser mayor a 0.";
      } else {
        const { error } = await supabase.from("gastos").insert({
          descripcion,
          monto,
          categoria,
          fecha_gasto,
          user_id: user.id
        });
        if (error) {
          console.error("Error inserting expense:", error);
          formError = "Error al guardar el gasto.";
        } else {
          formSuccess = "Gasto registrado correctamente.";
        }
      }
    } catch (e) {
      formError = "Ocurri\xF3 un error inesperado al procesar el formulario.";
    }
  }
  const today = /* @__PURE__ */ new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split("T")[0];
  const { data: gastosData, error: fetchError } = await supabase.from("gastos").select("*").gte("fecha_gasto", firstDayOfMonth).lte("fecha_gasto", lastDayOfMonth).order("fecha_gasto", { ascending: false }).order("created_at", { ascending: false });
  const gastosList = gastosData || [];
  const totalMonth = gastosList.reduce(
    (acc, curr) => acc + Number(curr.monto),
    0
  );
  const formatoPesos = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  });
  const categorias = [
    "Arriendo",
    "Servicios",
    "N\xF3mina",
    "Insumos Extra",
    "Transporte",
    "Mantenimiento"
  ];
  const todayString = today.toISOString().split("T")[0];
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", '\n    const downloadCSVBtn = document.getElementById("downloadCSVBtn");\n\n    if (downloadCSVBtn && gastosList && gastosList.length > 0) {\n        downloadCSVBtn.addEventListener("click", () => {\n            // Generate CSV content\n            // Headers: Fecha, Descripci\xF3n, Categor\xEDa, Monto\n            const headers = ["Fecha", "Descripci\xF3n", "Categor\xEDa", "Monto"].join(\n                ",",\n            );\n\n            const rows = gastosList.map((gasto) => {\n                // Escape quotes in description to prevent CSV breaking\n                const desc = `"${gasto.descripcion.replace(/"/g, \'""\')}"`;\n                return [\n                    gasto.fecha_gasto,\n                    desc,\n                    gasto.categoria,\n                    gasto.monto,\n                ].join(",");\n            });\n\n            const csvContent =\n                "data:text/csv;charset=utf-8," + [headers, ...rows].join("\\n");\n            const encodedUri = encodeURI(csvContent);\n\n            // Create a fake link to trigger download\n            const link = document.createElement("a");\n            link.setAttribute("href", encodedUri);\n\n            // Generate nice filename: gastos-YYYY-MM.csv\n            const today = new Date();\n            const yearStr = today.getFullYear();\n            const monthStr = String(today.getMonth() + 1).padStart(2, "0");\n            link.setAttribute("download", `gastos-${yearStr}-${monthStr}.csv`);\n\n            document.body.appendChild(link); // Required for FF\n            link.click();\n            document.body.removeChild(link);\n        });\n    }\n})();<\/script>'], ["", " <script>(function(){", '\n    const downloadCSVBtn = document.getElementById("downloadCSVBtn");\n\n    if (downloadCSVBtn && gastosList && gastosList.length > 0) {\n        downloadCSVBtn.addEventListener("click", () => {\n            // Generate CSV content\n            // Headers: Fecha, Descripci\xF3n, Categor\xEDa, Monto\n            const headers = ["Fecha", "Descripci\xF3n", "Categor\xEDa", "Monto"].join(\n                ",",\n            );\n\n            const rows = gastosList.map((gasto) => {\n                // Escape quotes in description to prevent CSV breaking\n                const desc = \\`"\\${gasto.descripcion.replace(/"/g, \'""\')}"\\`;\n                return [\n                    gasto.fecha_gasto,\n                    desc,\n                    gasto.categoria,\n                    gasto.monto,\n                ].join(",");\n            });\n\n            const csvContent =\n                "data:text/csv;charset=utf-8," + [headers, ...rows].join("\\\\n");\n            const encodedUri = encodeURI(csvContent);\n\n            // Create a fake link to trigger download\n            const link = document.createElement("a");\n            link.setAttribute("href", encodedUri);\n\n            // Generate nice filename: gastos-YYYY-MM.csv\n            const today = new Date();\n            const yearStr = today.getFullYear();\n            const monthStr = String(today.getMonth() + 1).padStart(2, "0");\n            link.setAttribute("download", \\`gastos-\\${yearStr}-\\${monthStr}.csv\\`);\n\n            document.body.appendChild(link); // Required for FF\n            link.click();\n            document.body.removeChild(link);\n        });\n    }\n})();<\/script>'])), renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Gesti\xF3n de Gastos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-6xl mx-auto space-y-8"> ${formSuccess && renderTemplate`<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert"> <span class="font-medium">¡Éxito!</span> ${formSuccess} </div>`} ${formError && renderTemplate`<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert"> <span class="font-medium">Error:</span> ${formError} </div>`} <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Left Column: Form & Summary --> <div class="lg:col-span-1 space-y-8"> <!-- Monthly Summary Card --> <div class="bg-rose-50 rounded-3xl p-6 border border-rose-100 shadow-sm"> <div class="flex items-center gap-3 mb-4"> <div class="w-10 h-10 rounded-full bg-rose-200 text-rose-600 flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path> </svg> </div> <h2 class="text-rose-800 font-bold text-lg">
Total del Mes
</h2> </div> <div class="text-3xl font-black text-rose-900 mb-1"> ${formatoPesos.format(totalMonth)} </div> <p class="text-sm text-rose-600 font-medium"> ${(/* @__PURE__ */ new Date()).toLocaleDateString("es-CO", {
    month: "long",
    year: "numeric"
  })} </p> </div> <!-- Add Expense Form --> <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200"> <h3 class="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path> </svg>
Registrar Nuevo Gasto
</h3> <form method="POST" class="space-y-4"> <div> <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Descripción</label> <input type="text" name="descripcion" required placeholder="Ej. Pago de luz" class="w-full bg-slate-50 border-none rounded-xl h-12 px-4 text-slate-700 focus:ring-2 focus:ring-rose-500"> </div> <div> <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Monto ($)</label> <input type="number" name="monto" min="1" step="any" required placeholder="Ej. 150000" class="w-full bg-slate-50 border-none rounded-xl h-12 px-4 text-slate-700 focus:ring-2 focus:ring-rose-500 font-mono"> </div> <div> <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Categoría</label> <select name="categoria" required class="w-full bg-slate-50 border-none rounded-xl h-12 px-4 text-slate-700 focus:ring-2 focus:ring-rose-500 appearance-none cursor-pointer"> <option value="" disabled selected>Selecciona una...</option> ${categorias.map((cat) => renderTemplate`<option${addAttribute(cat, "value")}>${cat}</option>`)} </select> </div> <div> <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Fecha del Gasto</label> <input type="date" name="fecha_gasto"${addAttribute(todayString, "defaultValue")} required class="w-full bg-slate-50 border-none rounded-xl h-12 px-4 text-slate-700 focus:ring-2 focus:ring-rose-500"> </div> <button type="submit" class="w-full mt-4 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm shadow-rose-200">
Guardar Gasto
</button> </form> </div> </div> <!-- Right Column: Data Table --> <div class="lg:col-span-2"> <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 h-full flex flex-col"> <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4"> <h3 class="text-xl font-bold text-slate-800">
Historial del Mes
</h3> <button id="downloadCSVBtn" class="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path> </svg>
Descargar Reporte Mensual
</button> </div> ${gastosList.length === 0 ? renderTemplate`<div class="flex-1 flex flex-col items-center justify-center text-center p-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200"> <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h4 class="text-slate-700 font-bold mb-1">
Caja Limpia
</h4> <p class="text-slate-500 text-sm">
No hay gastos registrados este mes. ¡Buen
                                    trabajo manteniendo la caja limpia!
</p> </div>` : renderTemplate`<div class="overflow-x-auto rounded-xl border border-slate-100"> <table class="w-full text-left border-collapse"> <thead> <tr class="bg-slate-50 border-b border-slate-100"> <th class="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
Fecha
</th> <th class="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
Descripción
</th> <th class="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">
Categoría
</th> <th class="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right whitespace-nowrap">
Monto
</th> </tr> </thead> <tbody class="divide-y divide-slate-50"> ${gastosList.map((gasto) => renderTemplate`<tr class="hover:bg-slate-50/50 transition-colors"> <td class="p-4 text-sm text-slate-600 whitespace-nowrap"> ${new Date(
    gasto.fecha_gasto
  ).toLocaleDateString(
    "es-CO"
  )} </td> <td class="p-4 text-sm font-medium text-slate-800"> ${gasto.descripcion} </td> <td class="p-4 text-center"> <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600"> ${gasto.categoria} </span> </td> <td class="p-4 text-sm font-bold text-slate-800 text-right font-mono whitespace-nowrap"> ${formatoPesos.format(
    gasto.monto
  )} </td> </tr>`)} </tbody> </table> </div>`} </div> </div> </div> </div> ` }), defineScriptVars({ gastosList }));
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/gastos.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/admin/gastos.astro";
const $$url = "/admin/gastos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Gastos,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
