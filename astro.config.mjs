// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import  VitePWA  from '@vite-pwa/astro';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://locai.o5d.dev",
	base: "/",
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor';
            if (id.includes('/src/components/')) return 'components';
          },
          chunkFileNames: '_astro/[name]-[hash].js',
        },
      },
    },
  },
  integrations: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      workbox: { globPatterns: ['**/*.{html,js,css,svg}'], maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, },
      manifest: { name: 'App', short_name: 'App', start_url: '/', display: 'standalone' }
    })
  ],
});