# Amasar Web

Sitio y panel administrativo de Amasar. Astro 5 (SSR) + Supabase, desplegado en Vercel.

## Requisitos

- Node >= 22
- pnpm (versión fijada en `packageManager`)

## Configuración

```sh
cp .env.example .env   # completar con las llaves del proyecto Supabase
pnpm install
```

En Vercel se deben definir las mismas variables: `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY`.

## Comandos

| Comando        | Acción                                         |
| :------------- | :--------------------------------------------- |
| `pnpm dev`     | Servidor local en `localhost:4321`             |
| `pnpm check`   | Verificación de tipos (`astro check`)          |
| `pnpm build`   | `astro check` + build de producción            |
| `pnpm preview` | Previsualiza el build                          |
