import { a as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead, e as addAttribute, F as Fragment } from '../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_COMcyEop.mjs';
import { s as supabase } from '../chunks/supabase_DZdNAR0C.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_jDIA5lyk.mjs';
import { h as heroImage } from '../chunks/unnamed_yqYhCIUY.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const title = "Amasar | Galletas Artesanales, Caf\xE9 y Detalles para Momentos \xDAnicos";
  const description = "El sabor artesanal de Bogot\xE1 en tu mesa. Galletas decoradas, caf\xE9 premium y jugos naturales para panader\xEDas, eventos corporativos y celebraciones especiales.";
  const { data: destacados } = await supabase.from("productos").select("id, nombre, descripcion, imagen_url, categoria").limit(9);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description, "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<section class="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background" aria-label="Introducción" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center" data-astro-cid-j7pv25f6> <div class="z-10" data-astro-cid-j7pv25f6> <div class="inline-block py-1 px-4 rounded-full bg-primary/10 mb-6 border border-primary/20" data-astro-cid-j7pv25f6> <span class="text-orange-950 font-black text-[10px] uppercase tracking-[0.2em]" data-astro-cid-j7pv25f6>
ARTESANÍA LOCAL • BOGOTÁ, CO
</span> </div> <h1 class="text-6xl md:text-7xl font-serif leading-[1.1] mb-8 text-secondary" data-astro-cid-j7pv25f6>
El sabor que <span class="italic text-primary" data-astro-cid-j7pv25f6>transforma</span> cada reunión.
</h1> <p class="text-xl text-slate-800 mb-10 max-w-lg leading-relaxed" data-astro-cid-j7pv25f6>
Desde el detalle perfecto para un **cumpleaños**, el refrigerio de tu
          **empresa**, hasta el stock de tu **panadería**. Galletas, café y
          jugos con entrega garantizada.
</p> <div class="flex flex-wrap gap-4" data-astro-cid-j7pv25f6> <a href="/productos" class="bg-secondary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-primary transition-all shadow-xl shadow-secondary/10" aria-label="Explorar nuestro catálogo de productos" data-astro-cid-j7pv25f6>
Explorar Catálogo
</a> <a href="/contacto" class="bg-white border-2 border-slate-300 text-secondary px-10 py-5 rounded-2xl font-bold text-lg hover:border-primary transition-all" data-astro-cid-j7pv25f6>
Cotizar Evento
</a> </div> <div class="mt-12 pt-8 border-t border-slate-200 flex gap-8 opacity-100" data-astro-cid-j7pv25f6> <p class="text-[10px] font-black uppercase tracking-tighter text-slate-950" data-astro-cid-j7pv25f6>
✨ Panaderías
</p> <p class="text-[10px] font-black uppercase tracking-tighter text-slate-950" data-astro-cid-j7pv25f6>
💼 Empresas
</p> <p class="text-[10px] font-black uppercase tracking-tighter text-slate-950" data-astro-cid-j7pv25f6>
🎂 Eventos
</p> </div> </div> <div class="relative" data-astro-cid-j7pv25f6> <div class="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Image", $$Image, { "src": heroImage, "alt": "Bodeg\xF3n de galletas artesanales y caf\xE9 de origen Amasar en Bogot\xE1", "class": "w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000", "loading": "eager", "fetchpriority": "high", "format": "avif", "quality": 80, "width": 800, "data-astro-cid-j7pv25f6": true })} </div> <div class="absolute -bottom-10 -left-10 bg-primary p-10 rounded-full text-white shadow-2xl border-8 border-background animate-bounce-slow" data-astro-cid-j7pv25f6> <p class="text-center font-bold" data-astro-cid-j7pv25f6> <span class="block text-4xl text-white" data-astro-cid-j7pv25f6>Bogotá</span> <span class="text-[10px] uppercase tracking-tighter font-black text-slate-950" data-astro-cid-j7pv25f6>Envío Express</span> </p> </div> </div> </div> </section> <section class="py-24 bg-white" aria-labelledby="soluciones-title" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto px-6" data-astro-cid-j7pv25f6> <h2 id="soluciones-title" class="sr-only" data-astro-cid-j7pv25f6>
Nuestras soluciones por tipo de cliente
</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-astro-cid-j7pv25f6> <div class="p-12 rounded-[3rem] bg-slate-50 border border-slate-100 group hover:bg-primary transition-all duration-500" data-astro-cid-j7pv25f6> <p class="text-4xl mb-6" aria-hidden="true" data-astro-cid-j7pv25f6>🏪</p> <h3 class="text-2xl font-serif mb-4 group-hover:text-white text-secondary" data-astro-cid-j7pv25f6>
Para Negocios
</h3> <p class="text-slate-700 group-hover:text-white/95" data-astro-cid-j7pv25f6>
Suministro recurrente para panaderías y cafeterías que buscan
            calidad premium constante.
</p> </div> <div class="p-12 rounded-[3rem] bg-slate-50 border border-slate-100 group hover:bg-secondary transition-all duration-500" data-astro-cid-j7pv25f6> <p class="text-4xl mb-6" aria-hidden="true" data-astro-cid-j7pv25f6>🏢</p> <h3 class="text-2xl font-serif mb-4 group-hover:text-white text-secondary" data-astro-cid-j7pv25f6>
Corporativo
</h3> <p class="text-slate-700 group-hover:text-white/95" data-astro-cid-j7pv25f6>
Refrigerios para reuniones, regalos empresariales y lanzamientos de
            marca en Bogotá.
</p> </div> <div class="p-12 rounded-[3rem] bg-slate-50 border border-slate-100 group hover:bg-primary transition-all duration-500" data-astro-cid-j7pv25f6> <p class="text-4xl mb-6" aria-hidden="true" data-astro-cid-j7pv25f6>🎁</p> <h3 class="text-2xl font-serif mb-4 group-hover:text-white text-secondary" data-astro-cid-j7pv25f6>
Celebraciones
</h3> <p class="text-slate-700 group-hover:text-white/95" data-astro-cid-j7pv25f6>
Fiestas de cumpleaños, reuniones familiares y detalles
            personalizados para tu hogar.
</p> </div> </div> </div> </section> <section class="py-32 bg-background" aria-labelledby="catalogo-title" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto px-6" data-astro-cid-j7pv25f6> <div class="text-center mb-20" data-astro-cid-j7pv25f6> <h2 id="catalogo-title" class="text-4xl md:text-5xl font-serif text-secondary mb-4" data-astro-cid-j7pv25f6>
Todo lo que necesitas para <span class="text-primary italic" data-astro-cid-j7pv25f6>sorprender</span> </h2> <div class="h-1 w-20 bg-primary mx-auto" data-astro-cid-j7pv25f6></div> </div> <div class="grid grid-cols-1 md:grid-cols-5 gap-8" data-astro-cid-j7pv25f6> ${[
    {
      name: "Galletas",
      desc: "Decoradas y personalizadas",
      icon: "\u{1F36A}",
      href: "/productos/galletas"
    },
    {
      name: "Chocolater\xEDa",
      desc: "Detalles que enamoran",
      icon: "\u{1F36B}",
      href: "/productos/chocolateria"
    },
    {
      name: "Caf\xE9",
      desc: "De origen para tu oficina",
      icon: "\u2615",
      href: "/productos/cafe"
    },
    {
      name: "Jugos",
      desc: "100% naturales y frescos",
      icon: "\u{1F964}",
      href: "/productos/jugos"
    },
    {
      name: "Gelatina",
      desc: "Postres coloridos y deliciosos",
      icon: "\u{1F36E}",
      href: "/productos/gelatina"
    }
  ].map((cat) => renderTemplate`<a${addAttribute(cat.href, "href")} class="group p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-primary transition-all hover:shadow-2xl text-center block" data-astro-cid-j7pv25f6> <span class="text-5xl mb-6 block transform group-hover:scale-110 transition-transform" aria-hidden="true" data-astro-cid-j7pv25f6> ${cat.icon} </span> <h3 class="text-xl font-serif mb-2 group-hover:text-primary transition-colors text-secondary" data-astro-cid-j7pv25f6> ${cat.name} </h3> <p class="text-slate-800 text-xs uppercase tracking-widest font-black" data-astro-cid-j7pv25f6> ${cat.desc} </p> </a>`)} </div> </div> </section> ${destacados && destacados.length > 0 && renderTemplate`<section class="py-32 bg-white" aria-labelledby="favoritos-title" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto px-6" data-astro-cid-j7pv25f6> <div class="flex justify-between items-end mb-16" data-astro-cid-j7pv25f6> <h2 id="favoritos-title" class="text-4xl font-serif text-secondary leading-tight" data-astro-cid-j7pv25f6>
Nuestros favoritos${" "} ${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result3) => renderTemplate` <br data-astro-cid-j7pv25f6> <span class="text-primary italic" data-astro-cid-j7pv25f6>del mes</span> ` })} </h2> <a href="/productos" class="text-orange-950 font-black border-b-2 border-primary pb-1 uppercase text-[10px] tracking-widest hover:text-primary transition-colors" data-astro-cid-j7pv25f6>
Ver catálogo completo
</a> </div> <div class="embla overflow-hidden w-full cursor-grab active:cursor-grabbing" id="favoritos-carousel" data-astro-cid-j7pv25f6> <div class="embla__container flex -ml-6" data-astro-cid-j7pv25f6> ${destacados.map((prod) => renderTemplate`<div class="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6" data-astro-cid-j7pv25f6> <article class="group h-full flex flex-col p-4 bg-white rounded-[3rem] border border-slate-100 shadow-sm relative isolate" data-astro-cid-j7pv25f6> <div class="aspect-square bg-slate-50 rounded-[2rem] mb-6 overflow-hidden relative isolate" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Image", $$Image, { "src": prod.imagen_url, "alt": `Producto: ${prod.nombre}`, "width": 400, "height": 400, "class": "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none select-none", "loading": "lazy", "decoding": "async", "fetchpriority": "low", "data-astro-cid-j7pv25f6": true })} </div> <div class="px-2 flex flex-col flex-grow" data-astro-cid-j7pv25f6> <h3 class="font-serif text-2xl text-secondary mb-2" data-astro-cid-j7pv25f6> ${prod.nombre} </h3> <p class="text-slate-800 text-sm mb-4 line-clamp-2 flex-grow" data-astro-cid-j7pv25f6> ${prod.descripcion} </p> <div class="mt-auto pt-2" data-astro-cid-j7pv25f6> <p class="text-orange-950 font-black text-xs uppercase tracking-widest bg-primary/10 inline-block px-3 py-1 rounded-lg" data-astro-cid-j7pv25f6>
Consultar disponibilidad
</p> </div> </div> </article> </div>`)} </div> </div> </div> </section>`}`, "head": async ($$result2) => renderTemplate`<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` })} ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/index.astro?astro&type=script&index=0&lang.ts")} `;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/index.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
