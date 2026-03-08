import { a as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_COMcyEop.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Ayuda = createComponent(($$result, $$props, $$slots) => {
  const title = "Centro de Ayuda | Amasar Bogot\xE1";
  const description = "Todo lo que necesitas saber sobre tus pedidos de galletas, servicios para eventos, env\xEDos en Bogot\xE1 y rastreo de \xF3rdenes.";
  const faqs = [
    {
      cat: "Pedidos y Cantidades",
      icon: "\u{1F6CD}\uFE0F",
      questions: [
        {
          q: "\xBFCu\xE1l es el pedido m\xEDnimo?",
          a: "Para env\xEDos gratuitos en Bogot\xE1, el m\xEDnimo es de $150.000 COP. Sin embargo, para eventos o consumo familiar, puedes hacer pedidos desde $50.000 COP retirando en nuestro punto de despacho o asumiendo el costo del env\xEDo."
        },
        {
          q: "\xBFPuedo personalizar mis galletas?",
          a: "\xA1Claro que s\xED! Personalizamos galletas con logos para empresas, nombres para fiestas infantiles o dise\xF1os exclusivos para vitrinas de panader\xEDas. Solo cu\xE9ntanos tu idea por WhatsApp."
        }
      ]
    },
    {
      cat: "Eventos y Fiestas",
      icon: "\u{1F389}",
      questions: [
        {
          q: "\xBFCon cu\xE1nto tiempo debo pedir para una reuni\xF3n?",
          a: "Para eventos sociales o reuniones empresariales, recomendamos agendar con al menos 8 d\xEDas de anticipaci\xF3n. Si es un pedido masivo (m\xE1s de 500 unidades), una semana es ideal."
        },
        {
          q: "\xBFHacen entregas en salones comunales u oficinas?",
          a: "S\xED, entregamos en cualquier direcci\xF3n dentro del per\xEDmetro urbano de Bogot\xE1. Nuestro equipo log\xEDstico garantiza que el producto llegue fresco para tu evento."
        }
      ]
    }
    /*
    {
      cat: "Rastreo de Órdenes",
      icon: "📍",
      questions: [
        { 
          q: "¿Dónde encuentro mi código (Tag)?", 
          a: "Tu código único (ej: AM-2026-XXXX) se genera automáticamente y te llega por WhatsApp apenas confirmamos el pago de tu pedido." 
        },
        { 
          q: "¿Cómo sé cuándo llega mi pedido?", 
          a: "En nuestra sección de 'Rastreo' verás el progreso real. Cuando el estado cambie a 'En camino', significa que nuestro repartidor ya va hacia tu ubicación." 
        }
      ]
    }
    */
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description, "data-astro-cid-l3wkwppi": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-24 bg-background relative overflow-hidden" data-astro-cid-l3wkwppi> <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" data-astro-cid-l3wkwppi></div> <div class="max-w-4xl mx-auto px-6 relative z-10" data-astro-cid-l3wkwppi> <div class="text-center mb-16" data-astro-cid-l3wkwppi> <span class="text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-4 block" data-astro-cid-l3wkwppi>Soporte al Cliente</span> <h1 class="text-6xl md:text-7xl font-serif text-secondary mb-6 leading-tight" data-astro-cid-l3wkwppi>
Resolvamos tus <span class="text-primary italic" data-astro-cid-l3wkwppi>dudas</span> </h1> <p class="text-slate-500 max-w-lg mx-auto" data-astro-cid-l3wkwppi>
Selecciona una categoría para encontrar la información que necesitas
          sobre Amasar.
</p> </div> <div class="space-y-16" data-astro-cid-l3wkwppi> ${faqs.map((section) => renderTemplate`<div data-astro-cid-l3wkwppi> <div class="flex items-center gap-4 mb-8 border-b border-primary/10 pb-4" data-astro-cid-l3wkwppi> <span class="text-3xl" data-astro-cid-l3wkwppi>${section.icon}</span> <h2 class="text-xs uppercase tracking-[0.3em] text-primary font-black" data-astro-cid-l3wkwppi> ${section.cat} </h2> </div> <div class="grid gap-6" data-astro-cid-l3wkwppi> ${section.questions.map((item) => renderTemplate`<details class="group bg-white rounded-[2rem] border border-slate-100 hover:border-primary/20 transition-all shadow-sm overflow-hidden" data-astro-cid-l3wkwppi> <summary class="flex justify-between items-center p-8 cursor-pointer list-none" data-astro-cid-l3wkwppi> <h3 class="text-lg font-bold text-secondary group-open:text-primary transition-colors pr-4" data-astro-cid-l3wkwppi> ${item.q} </h3> <span class="text-primary transition-transform group-open:rotate-180" data-astro-cid-l3wkwppi> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-l3wkwppi> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-l3wkwppi></path> </svg> </span> </summary> <div class="px-8 pb-8 animate-fade-in-down" data-astro-cid-l3wkwppi> <p class="text-slate-500 leading-relaxed text-sm border-t border-slate-50 pt-6" data-astro-cid-l3wkwppi> ${item.a} </p> </div> </details>`)} </div> </div>`)} </div> <div class="mt-24 relative" data-astro-cid-l3wkwppi> <div class="absolute inset-0 bg-secondary rounded-[3.5rem] -rotate-1" data-astro-cid-l3wkwppi></div> <div class="relative bg-white p-12 md:p-16 rounded-[3.5rem] border border-slate-100 shadow-xl text-center rotate-1" data-astro-cid-l3wkwppi> <h3 class="text-3xl font-serif text-secondary mb-4" data-astro-cid-l3wkwppi>
¿Aún tienes preguntas?
</h3> <p class="text-slate-500 mb-10 max-w-sm mx-auto text-sm" data-astro-cid-l3wkwppi>
Si tu duda es sobre un evento especial o una orden masiva, nuestro
            equipo te atiende personalmente.
</p> <div class="flex flex-col md:flex-row gap-4 justify-center" data-astro-cid-l3wkwppi> <a href="/contacto" class="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-secondary transition-all shadow-lg shadow-primary/20" data-astro-cid-l3wkwppi>
Escribir a Soporte
</a> <a href="https://wa.me/573000000000" target="_blank" class="bg-green-500 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-green-600 transition-all shadow-lg shadow-green-200" data-astro-cid-l3wkwppi>
WhatsApp Directo
</a> </div> </div> </div> </div> </section> ` })} `;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/ayuda.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/ayuda.astro";
const $$url = "/ayuda";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ayuda,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
