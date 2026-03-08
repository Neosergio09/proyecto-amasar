import { c as createAstro, a as createComponent, e as addAttribute, b as renderScript, d as renderTemplate } from './astro/server_6DCZPHUI.mjs';
import 'piccolore';
import 'clsx';
/* empty css                            */

const $$Astro = createAstro("https://amasar.co");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/e069394d-1499-490f-8c02-e3d8d80039a1/Proyectos/AmasarS/proyecto-amasar/node_modules/astro/components/ClientRouter.astro", void 0);

export { $$ClientRouter as $ };
