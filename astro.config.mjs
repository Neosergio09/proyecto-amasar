import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // 1. MODO SERVIDOR (VITAL)
  // Esto permite que tus páginas con 'prerender = false' funcionen.
  // Sin esto, Vercel no sabe que debe procesar datos en tiempo real.
  output: 'server',

  // 2. ADAPTADOR DE VERCEL
  // Configuramos el "puente" para que la comunicación sea fluida.
  adapter: vercel({
    // Opcional: Activa analíticas web gratuitas de Vercel
    webAnalytics: {
      enabled: true,
    },
    // Optimización de imágenes en el servidor de Vercel
    imageService: true,
  }),

  // 3. INTEGRACIONES Y VITE
  vite: {
    plugins: [tailwindcss()],
    // Optimización de construcción
    build: {
      cssMinify: 'lightningcss',
    }
  },

  // 4. SEGURIDAD DE RUTAS (Opcional pero recomendado)
  // Evita que se filtren archivos innecesarios en el despliegue.
  build: {
    inlineStylesheets: 'always',
  }
});