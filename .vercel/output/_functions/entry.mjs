import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_MQRQWtPh.mjs';
import { manifest } from './manifest_Bkb49vTl.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/clientes.astro.mjs');
const _page2 = () => import('./pages/admin/dashboard.astro.mjs');
const _page3 = () => import('./pages/admin/estadisticas.astro.mjs');
const _page4 = () => import('./pages/admin/formulas.astro.mjs');
const _page5 = () => import('./pages/admin/gastos.astro.mjs');
const _page6 = () => import('./pages/admin/inventario.astro.mjs');
const _page7 = () => import('./pages/admin/lanzar-produccion.astro.mjs');
const _page8 = () => import('./pages/admin/login.astro.mjs');
const _page9 = () => import('./pages/admin/pedidos.astro.mjs');
const _page10 = () => import('./pages/admin/productos/nuevo.astro.mjs');
const _page11 = () => import('./pages/admin/productos.astro.mjs');
const _page12 = () => import('./pages/api/contact.astro.mjs');
const _page13 = () => import('./pages/api/production/launch.astro.mjs');
const _page14 = () => import('./pages/api/recipes.astro.mjs');
const _page15 = () => import('./pages/ayuda.astro.mjs');
const _page16 = () => import('./pages/contacto.astro.mjs');
const _page17 = () => import('./pages/login.astro.mjs');
const _page18 = () => import('./pages/nosotros.astro.mjs');
const _page19 = () => import('./pages/productos/_categoria_.astro.mjs');
const _page20 = () => import('./pages/productos.astro.mjs');
const _page21 = () => import('./pages/rastreo.astro.mjs');
const _page22 = () => import('./pages/vendedores/clientes/nuevo.astro.mjs');
const _page23 = () => import('./pages/vendedores/clientes.astro.mjs');
const _page24 = () => import('./pages/vendedores/confirmar.astro.mjs');
const _page25 = () => import('./pages/vendedores/historial.astro.mjs');
const _page26 = () => import('./pages/vendedores/pedidos.astro.mjs');
const _page27 = () => import('./pages/vendedores.astro.mjs');
const _page28 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/clientes.astro", _page1],
    ["src/pages/admin/dashboard.astro", _page2],
    ["src/pages/admin/estadisticas.astro", _page3],
    ["src/pages/admin/formulas.astro", _page4],
    ["src/pages/admin/gastos.astro", _page5],
    ["src/pages/admin/inventario.astro", _page6],
    ["src/pages/admin/lanzar-produccion.astro", _page7],
    ["src/pages/admin/login.astro", _page8],
    ["src/pages/admin/pedidos.astro", _page9],
    ["src/pages/admin/productos/nuevo.astro", _page10],
    ["src/pages/admin/productos.astro", _page11],
    ["src/pages/api/contact.ts", _page12],
    ["src/pages/api/production/launch.ts", _page13],
    ["src/pages/api/recipes.ts", _page14],
    ["src/pages/ayuda.astro", _page15],
    ["src/pages/contacto.astro", _page16],
    ["src/pages/login.astro", _page17],
    ["src/pages/nosotros.astro", _page18],
    ["src/pages/productos/[categoria].astro", _page19],
    ["src/pages/productos/index.astro", _page20],
    ["src/pages/rastreo.astro", _page21],
    ["src/pages/vendedores/clientes/nuevo.astro", _page22],
    ["src/pages/vendedores/clientes.astro", _page23],
    ["src/pages/vendedores/confirmar.astro", _page24],
    ["src/pages/vendedores/historial.astro", _page25],
    ["src/pages/vendedores/pedidos.astro", _page26],
    ["src/pages/vendedores/index.astro", _page27],
    ["src/pages/index.astro", _page28]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "5d38b691-a762-46fe-ad34-42397ecf1dea",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
