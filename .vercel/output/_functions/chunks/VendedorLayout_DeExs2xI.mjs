import { c as createAstro, a as createComponent, e as addAttribute, g as renderHead, h as renderSlot, d as renderTemplate } from './astro/server_6DCZPHUI.mjs';
import 'piccolore';
import 'clsx';
/* empty css                            */
/* empty css                            */

const $$Astro = createAstro("https://amasar.co");
const $$VendedorLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$VendedorLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description" content="Amasar Go - Terminal de Ventas en Ruta"><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="theme-color" content="#ffffff"><title>${title}</title><!-- Apple Touch Icon for Home Screen --><link rel="apple-touch-icon" href="/icon-192.png">${renderHead()}</head> <body class="bg-gray-50 text-gray-900 overflow-x-hidden pb-32"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/src/layouts/VendedorLayout.astro", void 0);

export { $$VendedorLayout as $ };
