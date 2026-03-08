import { c as createAstro, a as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../../chunks/MainLayout_COMcyEop.mjs';
import { s as supabase } from '../../chunks/supabase_DZdNAR0C.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_jDIA5lyk.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://amasar.co");
const prerender = false;
const $$categoria = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$categoria;
  const { categoria } = Astro2.params;
  const categoriasConfig = {
    galletas: { visible: "Galletas Artesanales", db: "GALLETAS" },
    cafe: { visible: "Caf\xE9 de Origen", db: "CAF\xC9" },
    chocolateria: { visible: "Chocolater\xEDa Premium", db: "CHOCOLATER\xCDA" },
    jugos: { visible: "Concentrados de Jugos", db: "JUGOS" },
    gelatina: { visible: "Postres de Gelatina", db: "GELATINA" },
    concentrados: { visible: "Concentrados", db: "CONCENTRADOS" }
  };
  const esValida = categoria && categoria in categoriasConfig;
  const config = esValida ? categoriasConfig[categoria] : { visible: "Nuestros Productos", db: categoria || "" };
  const { data: productos, error } = await supabase.from("productos").select("*").ilike("categoria", `%${config.db}%`).order("nombre", { ascending: true });
  if (error) {
    console.error("Error en Supabase:", error.message);
  }
  const title = `${config.visible} | Amasar Mayorista`;
  const description = `Proveedores de ${config.visible.toLowerCase()} en Bogot\xE1. Calidad artesanal para tu negocio.`;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-background min-h-screen py-24"> <div class="max-w-7xl mx-auto px-6"> <nav class="flex text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-12 gap-3 items-center"> <a href="/" class="hover:text-primary transition-colors">Inicio</a> <span class="opacity-30">/</span> <a href="/productos" class="hover:text-primary transition-colors">Productos</a> <span class="opacity-30">/</span> <span class="text-secondary">${config.visible}</span> </nav> <div class="mb-20"> <h1 class="text-7xl font-serif text-secondary mb-6 leading-none"> ${config.visible.split(" ")[0]} <span class="text-primary italic"> ${config.visible.split(" ").slice(1).join(" ")} </span> </h1> <p class="text-lg text-slate-500 max-w-2xl leading-relaxed">
Nuestra selección de <span class="text-secondary font-bold">${categoria}</span> ha sido curada para ofrecer el balance perfecto entre tradición y calidad.
</p> </div> ${productos && productos.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"> ${productos.map((prod) => renderTemplate`<div class="group"> <div class="relative aspect-square rounded-[3rem] overflow-hidden bg-slate-100 mb-8 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-primary/20"> ${renderComponent($$result2, "Image", $$Image, { "src": prod.imagen_url, "alt": prod.nombre, "width": 400, "height": 400, "class": "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" })} <div class="absolute top-8 left-8"> <span class="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
Artesanal
</span> </div> </div> <div class="px-4"> <h3 class="text-3xl font-serif text-secondary mb-3 group-hover:text-primary transition-colors"> ${prod.nombre} </h3> <p class="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2"> ${prod.descripcion || "Elaborado diariamente con procesos tradicionales para garantizar frescura y sabor."} </p> <div class="flex items-center justify-between border-t border-slate-50 pt-8"> <span class="text-[10px] uppercase font-black tracking-widest text-slate-400">
Consultar disponibilidad
</span> <a${addAttribute(`https://wa.me/573001958529?text=Hola Amasar, quiero cotizar: ${prod.nombre}`, "href")} target="_blank" class="bg-secondary text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-primary hover:-rotate-12 transition-all shadow-lg active:scale-95"> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg> </a> </div> </div> </div>`)} </div>` : renderTemplate`<div class="py-32 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-100"> <span class="text-6xl block mb-6">🍪</span> <h3 class="text-2xl font-serif text-secondary mb-2">
Estamos horneando novedades
</h3> <p class="text-slate-400">
Pronto encontrarás más productos en la categoría${" "} <span class="font-bold">${config.visible}</span>.
</p> </div>`} </div> </section> ` })}`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/productos/[categoria].astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/productos/[categoria].astro";
const $$url = "/productos/[categoria]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$categoria,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
