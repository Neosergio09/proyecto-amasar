import { a as createComponent, r as renderComponent, b as renderScript, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_6DCZPHUI.mjs';
import 'piccolore';
import { $ as $$MainLayout } from '../chunks/MainLayout_COMcyEop.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Contacto = createComponent(async ($$result, $$props, $$slots) => {
  const title = "Contacto y Pedidos | Amasar Bogot\xE1";
  const description = "Solicita galletas artesanales, caf\xE9 y detalles para eventos. Atendemos panader\xEDas, empresas y familias en Bogot\xE1 con entrega garantizada.";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": title, "description": description, "data-astro-cid-2mxdoeuz": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-background min-h-screen py-24 relative overflow-hidden" data-astro-cid-2mxdoeuz> <div class="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" data-astro-cid-2mxdoeuz></div> <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10" data-astro-cid-2mxdoeuz> <div data-astro-cid-2mxdoeuz> <span class="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-6" data-astro-cid-2mxdoeuz>
Atención Personalizada
</span> <h1 class="text-6xl md:text-7xl font-serif text-secondary mb-8 leading-tight" data-astro-cid-2mxdoeuz>
Calidad artesanal para <span class="text-primary italic" data-astro-cid-2mxdoeuz>momentos</span> únicos.
</h1> <p class="text-lg text-slate-600 mb-10 leading-relaxed" data-astro-cid-2mxdoeuz>
Desde el abastecimiento recurrente para tu **panadería**, el catering
          de tu **empresa**, hasta el detalle especial para tu **hogar**. En
          Amasar Bogotá, horneamos soluciones a tu medida.
</p> <div class="space-y-8" data-astro-cid-2mxdoeuz> <div class="flex items-center gap-5 group" data-astro-cid-2mxdoeuz> <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-primary/10 transition-colors" data-astro-cid-2mxdoeuz>
🚚
</div> <div data-astro-cid-2mxdoeuz> <p class="text-sm font-black text-secondary uppercase tracking-widest" data-astro-cid-2mxdoeuz>
Cobertura Total
</p> <p class="text-xs text-slate-400" data-astro-cid-2mxdoeuz>
Despachos diarios en toda Bogotá.
</p> </div> </div> <div class="flex items-center gap-5 group" data-astro-cid-2mxdoeuz> <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-primary/10 transition-colors" data-astro-cid-2mxdoeuz>
✨
</div> <div data-astro-cid-2mxdoeuz> <p class="text-sm font-black text-secondary uppercase tracking-widest" data-astro-cid-2mxdoeuz>
Personalización
</p> <p class="text-xs text-slate-400" data-astro-cid-2mxdoeuz>
Galletas impresas con tu logo o temática.
</p> </div> </div> </div> </div> <div class="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-primary/5" data-astro-cid-2mxdoeuz> <form id="contactForm" class="space-y-6" data-astro-cid-2mxdoeuz> <div class="grid grid-cols-1 gap-6" data-astro-cid-2mxdoeuz> <div data-astro-cid-2mxdoeuz> <label class="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2" data-astro-cid-2mxdoeuz>¿Cómo te categorizas?</label> <select name="tipo_cliente" required class="w-full p-4 rounded-2xl bg-background border-none focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-secondary text-sm" data-astro-cid-2mxdoeuz> <option value="Panaderia" data-astro-cid-2mxdoeuz>Panadería / Pastelería</option> <option value="Empresa" data-astro-cid-2mxdoeuz>Empresa / Evento Corporativo</option> <option value="Particular" data-astro-cid-2mxdoeuz>Particular (Fiesta o Hogar)</option> </select> </div> <div data-astro-cid-2mxdoeuz> <label class="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2" data-astro-cid-2mxdoeuz>Nombre de la Entidad o Evento</label> <input type="text" name="panaderia" placeholder="Ej: Masa Madre, Cumpleaños de Luciana..." required class="w-full p-4 rounded-2xl bg-background border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm" data-astro-cid-2mxdoeuz> </div> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-astro-cid-2mxdoeuz> <div data-astro-cid-2mxdoeuz> <label class="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2" data-astro-cid-2mxdoeuz>Tu Nombre</label> <input type="text" name="nombre" required class="w-full p-4 rounded-2xl bg-background border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm" data-astro-cid-2mxdoeuz> </div> <div data-astro-cid-2mxdoeuz> <label class="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2" data-astro-cid-2mxdoeuz>WhatsApp</label> <input type="tel" name="whatsapp" required placeholder="3XX XXX XXXX" class="w-full p-4 rounded-2xl bg-background border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm" data-astro-cid-2mxdoeuz> </div> </div> <div data-astro-cid-2mxdoeuz> <label class="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2" data-astro-cid-2mxdoeuz>Tu Email</label> <input type="email" name="email" required placeholder="ejemplo@correo.com" class="w-full p-4 rounded-2xl bg-background border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm" data-astro-cid-2mxdoeuz> </div> <div data-astro-cid-2mxdoeuz> <label class="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2" data-astro-cid-2mxdoeuz>Producto de interés</label> <select name="interes" class="w-full p-4 rounded-2xl bg-background border-none focus:ring-2 focus:ring-primary outline-none transition-all font-bold text-secondary text-sm" data-astro-cid-2mxdoeuz> <option value="Galletas" data-astro-cid-2mxdoeuz>Galletas Decoradas</option> <option value="Cafe" data-astro-cid-2mxdoeuz>Café de Origen</option> <option value="Chocolateria" data-astro-cid-2mxdoeuz>Chocolatería</option> <option value="Varios" data-astro-cid-2mxdoeuz>Varios / Mix</option> </select> </div> <div data-astro-cid-2mxdoeuz> <label class="block text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2" data-astro-cid-2mxdoeuz>Detalles del pedido</label> <textarea name="mensaje" rows="3" placeholder="Cuéntanos cantidades o fecha del evento..." class="w-full p-4 rounded-2xl bg-background border-none focus:ring-2 focus:ring-primary outline-none transition-all text-sm" data-astro-cid-2mxdoeuz></textarea> </div> <button id="submitBtn" type="submit" class="w-full py-5 bg-secondary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-primary transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" data-astro-cid-2mxdoeuz> <span id="btnText" data-astro-cid-2mxdoeuz>Enviar Solicitud</span> </button> </form> <div id="successMessage" class="hidden text-center py-12 animate-fade-in" data-astro-cid-2mxdoeuz> <div class="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6" data-astro-cid-2mxdoeuz>
✓
</div> <h3 class="text-3xl font-serif text-secondary mb-3" data-astro-cid-2mxdoeuz>
¡Mensaje enviado con éxito!
</h3> <p class="text-slate-500 mb-10 leading-relaxed" data-astro-cid-2mxdoeuz>
Hemos recibido tu información. Un maestro artesano de Amasar te
            escribirá pronto.
</p> <button id="btnReset" class="text-primary font-black text-[10px] uppercase tracking-[0.2em] border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-all" data-astro-cid-2mxdoeuz>
Enviar otro mensaje
</button> </div> </div> </div> </section> ` })} ${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/contacto.astro?astro&type=script&index=0&lang.ts")} `;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/contacto.astro", void 0);

const $$file = "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/pages/contacto.astro";
const $$url = "/contacto";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contacto,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
