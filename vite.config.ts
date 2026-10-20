import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // '/' by default; the GitHub Pages workflow sets BASE_PATH=/DrHaithamAlHatiem/
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) return 'motion-gsap'
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'motion'
        },
      },
    },
  },
})
