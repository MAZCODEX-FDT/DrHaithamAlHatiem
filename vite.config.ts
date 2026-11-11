import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { seoFiles, siteUrl } from './scripts/seo.ts'

export default defineConfig(({ mode }) => {
  // One public address for the app (canonical, hreflang, structured data) and for sitemap.xml / robots.txt:
  // SITE_URL / VITE_SITE_URL from the environment or a .env file, else Vercel's production domain, else GitHub Pages
  const site = siteUrl({ ...loadEnv(mode, process.cwd(), ''), ...process.env })
  process.env.VITE_SITE_URL = site

  return {
    // '/' by default; the GitHub Pages workflow sets BASE_PATH=/DrHaithamAlHatiem/
    base: process.env.BASE_PATH ?? '/',
    plugins: [react(), tailwindcss(), seoFiles(site)],
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
  }
})
