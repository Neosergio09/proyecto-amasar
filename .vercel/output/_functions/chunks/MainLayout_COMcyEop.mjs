import { c as createAstro, a as createComponent, d as renderTemplate, am as unescapeHTML, e as addAttribute, m as maybeRenderHead, b as renderScript, r as renderComponent, h as renderSlot, g as renderHead } from './astro/server_6DCZPHUI.mjs';
import 'piccolore';
import 'clsx';
/* empty css                            */
import { $ as $$ClientRouter } from './ClientRouter_CAb47kJj.mjs';
import { $ as $$Image } from './_astro_assets_jDIA5lyk.mjs';
/* empty css                            */
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://amasar.co");
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SEO;
  const {
    title,
    description,
    image = "/og-image.jpg",
    // Asegúrate de tener esta imagen en public/
    canonicalURL = Astro2.url.href
  } = Astro2.props;
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WholesaleStore",
    name: "Amasar - Proveedor Mayorista de Panader\xEDa",
    description: "Distribuidor l\xEDder en Bogot\xE1 de galletas artesanales, caf\xE9 premium y concentrados de jugos para panader\xEDas.",
    url: "https://amasar.co",
    // Cambia esto por tu dominio real
    telephone: "+573000000000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Alamos Norte",
      // O la dirección específica
      addressLocality: "Bogot\xE1",
      addressRegion: "Cundinamarca",
      addressCountry: "CO"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.6097,
      // Coordenadas de Bogotá
      longitude: -74.0817
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      opens: "08:00",
      closes: "18:00"
    }
  });
  return renderTemplate(_a || (_a = __template(['<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', '><link rel="canonical"', '><link rel="sitemap" href="/sitemap-index.xml"><title>', ' | Amasar - Proveedor Mayorista en Bogot\xE1</title><meta name="title"', '><meta name="description"', '><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><meta name="robots" content="index, follow"><meta name="googlebot" content="index, follow"><meta name="geo.region" content="CO-DC"><meta name="geo.placename" content="Bogot\xE1"><meta name="geo.position" content="4.6097;-74.0817"><meta name="ICBM" content="4.6097, -74.0817"><script type="application/ld+json">', "<\/script>"])), addAttribute(Astro2.generator, "content"), addAttribute(canonicalURL, "href"), title, addAttribute(`${title} | Amasar`, "content"), addAttribute(description, "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(image, Astro2.url), "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(image, Astro2.url), "content"), unescapeHTML(schema));
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/components/SEO.astro", void 0);

createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="web-vitals-monitor" class="fixed bottom-4 right-4 z-50 p-3 bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 text-xs font-mono hidden hover:opacity-100 transition-opacity duration-200"> <div class="grid grid-cols-3 gap-x-4 gap-y-1"> <div class="flex flex-col items-center"> <span class="text-gray-400 font-semibold mb-0.5">LCP</span> <span id="lcp-val" class="font-bold text-gray-500">--</span> </div> <div class="flex flex-col items-center border-l border-gray-700 pl-4"> <span class="text-gray-400 font-semibold mb-0.5">CLS</span> <span id="cls-val" class="font-bold text-gray-500">--</span> </div> <div class="flex flex-col items-center border-l border-gray-700 pl-4"> <span class="text-gray-400 font-semibold mb-0.5">INP</span> <span id="inp-val" class="font-bold text-gray-500">--</span> </div> </div> </div> ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/components/dev/PerformanceMonitor.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/components/dev/PerformanceMonitor.astro", void 0);

const $$Astro = createAstro("https://amasar.co");
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="es" class="scroll-smooth"> <head>${renderComponent($$result, "SEO", $$SEO, { "title": title, "description": description })}${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body class="bg-background text-secondary antialiased selection:bg-primary selection:text-white min-h-screen flex flex-col"> <header class="sticky top-0 z-[100] bg-background/80 backdrop-blur-xl border-b border-primary/10"> <nav class="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between z-[100]" aria-label="Navegación principal"> <div class="relative group flex items-center h-full shrink-0"> ${renderComponent($$result, "Image", $$Image, { "src": "/favicon.svg", "alt": "Logotipo de Amasar", "width": 48, "height": 48, "loading": "eager", "class": "w-12 h-12 md:w-70 md:h-70 transition-transform duration-300 ease-in-out lg:group-hover:scale-110 pointer-events-none" })} <a href="/" class="absolute inset-0 z-10" aria-label="Amasar - Volver al Inicio"></a> </div> <div class="hidden lg:flex items-center gap-10"> <ul class="flex items-center gap-8 font-bold text-[11px] uppercase tracking-[0.2em] text-secondary"> <li class="relative group"> <a href="/productos" class="hover:text-primary transition-colors flex items-center gap-1 py-8" aria-haspopup="true">
Productos
<svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path> </svg> </a> <ul class="absolute top-full -left-4 w-64 bg-white shadow-2xl rounded-3xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-primary/5 translate-y-2 group-hover:translate-y-0 z-[100]" role="menu"> <li role="none"> <a href="/productos/galletas" class="flex items-center gap-3 p-3 hover:bg-background rounded-xl transition-colors" role="menuitem"> <span class="text-xl">🍪</span> <div class="flex flex-col"> <span class="normal-case tracking-normal text-sm font-bold text-secondary">Galletas</span> <span class="normal-case tracking-normal text-[10px] text-slate-500 font-medium">Artesanales y decoradas</span> </div> </a> </li> <li role="none"> <a href="/productos/cafe" class="flex items-center gap-3 p-3 hover:bg-background rounded-xl transition-colors" role="menuitem"> <span class="text-xl">☕</span> <div class="flex flex-col"> <span class="normal-case tracking-normal text-sm font-bold text-secondary">Café de Origen</span> <span class="normal-case tracking-normal text-[10px] text-slate-500 font-medium">Tostión artesanal</span> </div> </a> </li> <li role="none"> <a href="/productos/chocolateria" class="flex items-center gap-3 p-3 hover:bg-background rounded-xl transition-colors" role="menuitem"> <span class="text-xl">🍫</span> <div class="flex flex-col"> <span class="normal-case tracking-normal text-sm font-bold text-secondary">Chocolatería</span> <span class="normal-case tracking-normal text-[10px] text-slate-500 font-medium">Detalles premium</span> </div> </a> </li> <li role="none"> <a href="/productos/jugos" class="flex items-center gap-3 p-3 hover:bg-background rounded-xl transition-colors" role="menuitem"> <span class="text-xl">🥤</span> <div class="flex flex-col"> <span class="normal-case tracking-normal text-sm font-bold text-secondary">Concentrados</span> <span class="normal-case tracking-normal text-[10px] text-slate-500 font-medium">100% fruta natural</span> </div> </a> </li> <li role="none"> <a href="/productos/gelatina" class="flex items-center gap-3 p-3 hover:bg-background rounded-xl transition-colors" role="menuitem"> <span class="text-xl">🍮</span> <div class="flex flex-col"> <span class="normal-case tracking-normal text-sm font-bold text-secondary">Gelatina</span> <span class="normal-case tracking-normal text-[10px] text-slate-500 font-medium">Frescura y sabor</span> </div> </a> </li> </ul> </li> <li> <a href="/nosotros" class="hover:text-primary transition-colors">Nosotros</a> </li> <!-- 
            <li>
              <a
                href="/rastreo"
                class="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span class="relative flex h-2 w-2">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                  ></span>
                  <span
                    class="relative inline-flex rounded-full h-2 w-2 bg-green-500"
                  ></span>
                </span>
                Rastreo
              </a>
            </li> 
            --> <li> <a href="/ayuda" class="hover:text-primary transition-colors">Ayuda</a> </li> </ul> <div class="h-8 w-[1px] bg-secondary/10 mx-2" aria-hidden="true"></div> <a href="/contacto" class="bg-secondary text-white px-8 py-3.5 rounded-full shadow-xl shadow-secondary/10 font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:shadow-primary/30 transition-all active:scale-95">
Hacer Pedido
</a> </div> <button id="mobileMenuBtn" class="lg:hidden p-2 text-secondary" aria-label="Abrir Menú de navegación"> <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path> </svg> </button> </nav> <div id="mobileMenu" class="hidden lg:hidden bg-white border-b border-slate-100 px-6 py-10 space-y-6"> <a href="/productos" class="block font-black text-xs uppercase tracking-widest text-secondary">Productos</a> <a href="/nosotros" class="block font-black text-xs uppercase tracking-widest text-secondary">Nosotros</a> <a href="/rastreo" class="block font-black text-xs uppercase tracking-widest text-green-600">Rastrear Pedido</a> <a href="/contacto" class="block bg-secondary text-white text-center py-4 rounded-2xl font-black text-xs uppercase tracking-widest">Hacer Pedido</a> </div> <main class="flex-grow"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="bg-secondary text-white py-20"> <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16"> <div class="space-y-6"> ${renderComponent($$result, "Image", $$Image, { "src": "/favicon.svg", "alt": "Logo Amasar Blanco", "width": 64, "height": 64, "class": "w-16 h-16 brightness-0 invert" })} <p class="text-sm leading-relaxed max-w-xs text-white/90">
Pastelería artesanal y café de origen para panaderías, eventos
              corporativos y celebraciones inolvidables en Bogotá.
</p> </div> <div class="flex flex-col justify-center gap-4 italic font-serif text-white border-l border-white/10 pl-10 hidden md:flex"> <p class="text-2xl">
"Transformamos lo artesanal en momentos memorables."
</p> </div> <div class="space-y-4"> <p class="font-bold text-white mb-4 uppercase tracking-widest text-[10px]">
Atención al Cliente
</p> <ul class="text-sm space-y-3 text-white/90"> <li class="flex items-center gap-2">📍 Bogotá, Colombia</li> <li class="flex items-center gap-2">
✉️ <a href="mailto:hola@amasar.co" class="hover:text-primary transition-colors">hola@amasar.co</a> </li> <li class="flex items-center gap-2">📱 +57 300 1958529</li> <li class="flex items-center gap-2">☎️ +57 601 4740056</li> </ul> </div> </div> <div class="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center"> <div class="text-[10px] uppercase tracking-[0.3em] text-white/70 font-bold">
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Amasar S.A.S. — Una experiencia diseñada
            por Otterock
</div> </div> </footer> ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/layouts/MainLayout.astro?astro&type=script&index=0&lang.ts")} ${false} </header> </body></html>`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
