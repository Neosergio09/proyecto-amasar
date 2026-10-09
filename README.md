# 🍪 Amasar

Sitio web y sistema de gestión para **Amasar**, panadería y café artesanal de Bogotá. Combina un sitio público con catálogo de productos y un sistema interno (ERP ligero) para administradores y vendedores: pedidos, clientes, inventario de materias primas, recetas, producción y gastos.

---

## ✨ Funcionalidades

**Sitio público**
- Página de inicio, nosotros, ayuda y contacto.
- Catálogo de productos por categoría (`/productos/[categoria]`) con carruseles (Embla).
- Formulario de contacto con envío de correo vía [Resend](https://resend.com/).
- Rastreo de pedidos para clientes (`/rastreo`).
- SEO: componente `SEO.astro`, sitemap automático y Vercel Web Analytics.

**Panel de administración (`/admin`)**
- Dashboard y estadísticas de ventas.
- Gestión de productos, pedidos y clientes.
- Inventario de materias primas.
- Fórmulas (recetas) por producto y lanzamiento de órdenes de producción: descuenta los insumos de forma transaccional mediante una función RPC de Postgres que valida stock antes de producir.
- Registro de gastos.

**Terminal de vendedores (`/vendedores`)**
- Registro de clientes, toma y confirmación de pedidos, historial de ventas.

**Control de acceso**
- Middleware que protege `/admin` y `/vendedores` según el rol de la tabla `perfiles` (`admin` o `vendedor`) y redirige a cada usuario a su área.

---

## 🚀 Stack

| Capa | Tecnología |
| :--- | :--- |
| Framework | [Astro 5](https://astro.build/) en modo SSR |
| Estilos | Tailwind CSS v4 |
| Base de datos y auth | [Supabase](https://supabase.com/) (Postgres, Auth, Storage, RPC) |
| Correo | Resend |
| UI | Embla Carousel, Fontsource (Inter, Playfair Display) |
| Imágenes | `browser-image-compression` (compresión en el cliente antes de subir) |
| Rendimiento | `web-vitals` |
| Despliegue | Vercel (`@astrojs/vercel`, Node 20.x) |

---

## 🛠️ Instalación

Requiere Node.js 20.x.

```bash
pnpm install
pnpm dev   # http://localhost:4321
```

### Variables de entorno

Crea un archivo `.env`:

```env
PUBLIC_SUPABASE_URL="https://tu-proyecto.supabase.co"
PUBLIC_SUPABASE_ANON_KEY="tu-anon-key"
RESEND_API_KEY="re_xxxxxxxx"
```

---

## 🛢️ Base de datos

Los scripts SQL están en la raíz del proyecto. Ejecútalos en el SQL Editor de Supabase:

| Archivo | Contenido |
| :--- | :--- |
| `supabase_migration.sql` | Columnas de stock y precio en `productos` y políticas RLS |
| `inventory_triggers.sql` | Triggers de estado de pedidos e inventario |
| `production_module.sql` | Tablas `recetas` y `receta_ingredientes` y la función `execute_production_order` |
| `gastos.sql` | Tabla de gastos |

---

## ⚙️ Comandos

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm preview` | Previsualiza el build |

---

## 🗂️ Estructura

```text
src/
├── components/      # SEO y monitor de rendimiento
├── layouts/         # MainLayout, AdminLayout, VendedorLayout
├── lib/             # Cliente Supabase y lógica de producción
├── pages/
│   ├── admin/       # Dashboard, pedidos, productos, inventario, fórmulas, producción, gastos
│   ├── vendedores/  # Terminal de ventas
│   ├── api/         # Contacto, recetas, lanzamiento de producción
│   └── *.astro      # Páginas públicas
├── types/           # Tipos de la base de datos
└── middleware.ts    # Autenticación y control de roles
```

---

Desarrollado por [Sergio](https://github.com/Neosergio09).
