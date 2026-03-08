import { c as createAstro, a as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_COMcyEop.mjs';
import { s as supabase } from '../chunks/supabase_DZdNAR0C.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_jDIA5lyk.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://amasar.co");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { data: productos } = await supabase.from("productos").select("categoria, imagen_url").order("categoria", { ascending: true });
  const categoriasMap = /* @__PURE__ */ new Map();
  productos?.forEach((p) => {
    if (p.imagen_url) {
      if (!categoriasMap.has(p.categoria)) {
        categoriasMap.set(p.categoria, [p.imagen_url]);
      } else {
        const imagenes = categoriasMap.get(p.categoria);
        if (imagenes.length < 3 && !imagenes.includes(p.imagen_url)) {
          imagenes.push(p.imagen_url);
        }
      }
    }
  });
  const categorias = Array.from(categoriasMap.entries()).map(
    ([nombre, imagenes]) => ({ nombre, imagenes })
  );
  const slugify = (text) => {
    return text.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  };
  const title = "Cat\xE1logo Completo de Suministros | Amasar";
  const description = "Explora toda la variedad de Amasar: Galletas artesanales, caf\xE9 premium y m\xE1s para tu panader\xEDa en Bogot\xE1.";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description }, { "default": async ($$result2) => renderTemplate`     ${maybeRenderHead()}<section class="bg-background min-h-screen py-24"> <div class="max-w-7xl mx-auto px-6"> <div class="mb-16"> <nav class="flex text-[10px] uppercase tracking-[0.2em] text-slate-600 mb-8 gap-2"> <a href="/" class="hover:text-primary transition-colors">Inicio</a> <span>/</span> <span class="text-secondary font-bold">Productos</span> </nav> <h1 class="text-6xl font-serif text-secondary mb-6">
Nuestra <span class="text-primary italic">Despensa</span> </h1> </div> <div class="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto"> ${categorias.map((cat, index) => renderTemplate`<div class="group relative block aspect-[4/3] w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] rounded-[3rem] overflow-hidden bg-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 category-card-link"> <div class="embla-category w-full h-full absolute inset-0 z-0"> <div class="embla__container h-full flex"> ${cat.imagenes.map((img, imgIndex) => renderTemplate`<div class="embla__slide flex-[0_0_100%] min-w-0 h-full relative"> ${renderComponent($$result2, "Image", $$Image, { "src": img, "alt": `Categor\xEDa: ${cat.nombre} - vista ${imgIndex + 1}`, "width": 600, "height": 450, "class": "absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 pointer-events-none select-none", "loading": index < 3 && imgIndex === 0 ? "eager" : "lazy", "decoding": "async", "fetchpriority": index < 3 && imgIndex === 0 ? "high" : "auto" })} </div>`)} </div> </div> <a${addAttribute(`/productos/${slugify(cat.nombre)}`, "href")} class="absolute inset-0 z-10 flex flex-col justify-end"> <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent pointer-events-none"></div> <div class="relative p-10 flex flex-col justify-end pointer-events-none"> <h2 class="text-3xl font-serif text-white mb-2 group-hover:text-primary transition-colors"> ${cat.nombre} </h2> <div class="w-12 h-1 bg-primary rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div> </div> </a> </div>`)} </div> </div> </section> `, "head": async ($$result2) => renderTemplate`<link rel="dns-prefetch" href="https://fonts.googleapis.com"><link rel="dns-prefetch" href="https://dryeeosrkteamqwnfsqo.supabase.co"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preconnect" href="https://dryeeosrkteamqwnfsqo.supabase.co" crossorigin>` })} ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/productos/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/productos/index.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/productos/index.astro";
const $$url = "/productos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
