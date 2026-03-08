import { c as createAstro, a as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_COMcyEop.mjs';
import { s as supabase } from '../chunks/supabase_DZdNAR0C.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://amasar.co");
const prerender = false;
const $$Rastreo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Rastreo;
  let pedido = null;
  let errorBusqueda = null;
  const tag = Astro2.url.searchParams.get("tag")?.toUpperCase().trim();
  if (tag) {
    const { data, error } = await supabase.from("pedidos").select("*").eq("tag_rastreo", tag).single();
    if (error) {
      errorBusqueda = "No encontramos esa orden. Revisa el c\xF3digo que te enviamos por WhatsApp.";
    } else {
      pedido = data;
    }
  }
  const estados = [
    { nombre: "Preparaci\xF3n", icono: "\u{1F963}" },
    { nombre: "En horno", icono: "\u{1F525}" },
    { nombre: "Empacado", icono: "\u{1F381}" },
    { nombre: "En camino", icono: "\u{1F69A}" },
    { nombre: "Entregado", icono: "\u2728" }
  ];
  const indiceEstado = pedido ? estados.findIndex((e) => e.nombre.toLowerCase() === pedido.estado.toLowerCase()) : -1;
  const porcentajeProgreso = indiceEstado === -1 ? 0 : (indiceEstado + 1) / estados.length * 100;
  const title = "Sigue tu Pedido | Amasar";
  const description = "Sigue el progreso de tu orden de galletas, caf\xE9 o eventos en Bogot\xE1 en tiempo real.";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description, "data-astro-cid-gjj5tfbf": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-background min-h-[80vh] py-24" data-astro-cid-gjj5tfbf> <div class="max-w-3xl mx-auto px-6" data-astro-cid-gjj5tfbf> <div class="text-center mb-12" data-astro-cid-gjj5tfbf> <h1 class="text-5xl md:text-6xl font-serif text-secondary mb-4" data-astro-cid-gjj5tfbf>Sigue la <span class="text-primary italic" data-astro-cid-gjj5tfbf>Magia</span></h1> <p class="text-slate-500 max-w-md mx-auto leading-relaxed" data-astro-cid-gjj5tfbf>
Ingresa el código que recibiste al confirmar tu pedido para ver en qué etapa se encuentra.
</p> </div> <form action="/rastreo" method="GET" class="relative mb-16" data-astro-cid-gjj5tfbf> <input type="text" name="tag"${addAttribute(tag || "", "value")} placeholder="Ej: AM-2026-8812" class="w-full p-8 pr-44 rounded-full border-none bg-white focus:ring-4 focus:ring-primary/20 outline-none text-xl font-bold transition-all shadow-xl shadow-secondary/5" required data-astro-cid-gjj5tfbf> <button type="submit" class="absolute right-3 top-3 bottom-3 bg-secondary text-white px-10 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-primary transition-all active:scale-95" data-astro-cid-gjj5tfbf>
Rastrear
</button> </form> ${pedido ? renderTemplate`<div class="bg-white rounded-[4rem] p-10 md:p-16 shadow-2xl border border-primary/5 animate-fade-in relative overflow-hidden" data-astro-cid-gjj5tfbf> <div class="absolute top-0 right-0 p-8 opacity-5 text-8xl pointer-events-none" data-astro-cid-gjj5tfbf>🍪</div> <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10" data-astro-cid-gjj5tfbf> <div data-astro-cid-gjj5tfbf> <p class="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-2" data-astro-cid-gjj5tfbf>Orden en curso</p> <h2 class="text-4xl font-serif text-secondary" data-astro-cid-gjj5tfbf> ${indiceEstado === 1 ? "\xA1Ya est\xE1 en el horno!" : pedido.estado} </h2> <p class="text-sm text-slate-400 mt-2" data-astro-cid-gjj5tfbf>Para: <span class="font-bold text-secondary" data-astro-cid-gjj5tfbf>${pedido.cliente_nombre}</span></p> </div> <div class="bg-slate-50 px-6 py-4 rounded-3xl border border-slate-100" data-astro-cid-gjj5tfbf> <p class="text-[10px] uppercase font-black text-slate-400 mb-1" data-astro-cid-gjj5tfbf>Código de Rastreo</p> <p class="text-secondary font-mono font-bold" data-astro-cid-gjj5tfbf>${pedido.tag_rastreo}</p> </div> </div> <div class="relative pt-1 mb-20" data-astro-cid-gjj5tfbf> <div class="flex mb-6 items-center justify-between" data-astro-cid-gjj5tfbf> <div data-astro-cid-gjj5tfbf> <span class="text-[10px] font-black inline-block py-2 px-4 uppercase rounded-full text-white bg-secondary tracking-widest shadow-lg shadow-secondary/20" data-astro-cid-gjj5tfbf> ${Math.round(porcentajeProgreso)}% completado
</span> </div> </div> <div class="overflow-hidden h-6 mb-4 flex rounded-full bg-slate-100 p-1.5 border border-slate-50" data-astro-cid-gjj5tfbf> <div${addAttribute(`width: ${porcentajeProgreso}%`, "style")} class="shadow-inner flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary rounded-full transition-all duration-1000 ease-out relative" data-astro-cid-gjj5tfbf> <div class="absolute right-0 w-8 h-8 bg-white rounded-full shadow-md scale-125 border-4 border-primary" data-astro-cid-gjj5tfbf></div> </div> </div> </div> <div class="grid grid-cols-2 md:grid-cols-5 gap-8" data-astro-cid-gjj5tfbf> ${estados.map((est, index) => renderTemplate`<div${addAttribute(`text-center transition-all duration-700 ${index <= indiceEstado ? "scale-100 opacity-100" : "scale-90 opacity-20 grayscale"}`, "class")} data-astro-cid-gjj5tfbf> <div${addAttribute(`w-14 h-14 mx-auto rounded-3xl mb-4 flex items-center justify-center text-2xl shadow-sm border-2 ${index <= indiceEstado ? "bg-white border-primary" : "bg-slate-50 border-slate-100"}`, "class")} data-astro-cid-gjj5tfbf> ${est.icono} </div> <p class="text-[10px] uppercase font-black tracking-tighter leading-tight text-secondary" data-astro-cid-gjj5tfbf>${est.nombre}</p> </div>`)} </div> <div class="mt-16 pt-10 border-t border-slate-50 text-center" data-astro-cid-gjj5tfbf> <p class="text-xs text-slate-400 italic" data-astro-cid-gjj5tfbf>¿Tienes dudas con tu pedido? <a href="/contacto" class="text-primary font-bold hover:underline" data-astro-cid-gjj5tfbf>Escríbenos por WhatsApp</a></p> </div> </div>` : !errorBusqueda && renderTemplate`<div class="text-center p-12 bg-white/50 rounded-[3rem] border border-dashed border-slate-200" data-astro-cid-gjj5tfbf> <p class="text-slate-400 text-sm" data-astro-cid-gjj5tfbf>El código lo puedes encontrar en el mensaje de confirmación que enviamos a tu WhatsApp.</p> </div>`} ${errorBusqueda && renderTemplate`<div class="bg-white p-12 rounded-[3rem] text-center shadow-xl border-b-4 border-red-400 animate-shake" data-astro-cid-gjj5tfbf> <span class="text-5xl block mb-6" data-astro-cid-gjj5tfbf>🔍</span> <h3 class="text-xl font-serif text-secondary mb-2" data-astro-cid-gjj5tfbf>¡Ups! No lo encontramos</h3> <p class="text-slate-500 text-sm mb-6" data-astro-cid-gjj5tfbf>${errorBusqueda}</p> <a href="/rastreo" class="text-primary font-black uppercase text-[10px] tracking-widest border-b-2 border-primary pb-1" data-astro-cid-gjj5tfbf>Intentar de nuevo</a> </div>`} </div> </section> ` })} `;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/rastreo.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/rastreo.astro";
const $$url = "/rastreo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Rastreo,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
