/**
 * The public pages of the site, and the sitemap.xml / robots.txt built from them.
 *
 * Used by the Vite build (the `seoFiles()` plugin writes both files into dist/) and by
 * scripts/prerender.mjs (which renders the same list of pages to static HTML).
 *
 * Env: SITE_URL or VITE_SITE_URL (absolute, no trailing slash). On Vercel the project's
 * production domain is used when neither is set; otherwise the GitHub Pages address.
 */
import type { Plugin } from 'vite'
import { services, tips } from '../src/data/seed.ts'

export const LANGS = ['en', 'ar'] as const
export type Lang = (typeof LANGS)[number]

const GITHUB_PAGES_URL = 'https://mazcodex-fdt.github.io/DrHaithamAlHatiem'

/** The public address of the site, without a trailing slash */
export function siteUrl(env: Record<string, string | undefined> = process.env) {
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : ''
  return (env.SITE_URL || env.VITE_SITE_URL || vercel || GITHUB_PAGES_URL).replace(/\/$/, '')
}

export const activeServices = services.filter((s) => s.active).sort((a, b) => a.order - b.order)
export const publishedTips = tips.filter((t) => t.published)

/**
 * Every public route (router paths, the same in both languages). The dashboard is not
 * listed: it is private, is never pre-rendered and is kept out of the sitemap.
 */
export const routes = [
  '/',
  '/about',
  '/services',
  ...activeServices.map((s) => `/services/${s.slug}`),
  '/guide',
  ...publishedTips.map((t) => `/guide/${t.slug}`),
  '/contact',
  '/book',
]

/** Absolute URL of a route in a language, with the trailing slash the pre-rendered pages are served at */
export const urlOf = (site: string, route: string, lang: Lang) => `${site}${lang === 'ar' ? '/ar' : ''}${route === '/' ? '' : route}/`

const xml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function sitemapXml(site: string, today = new Date().toISOString().slice(0, 10)) {
  const lastmod = (route: string) => publishedTips.find((t) => route === `/guide/${t.slug}`)?.date || today
  const entries = routes.flatMap((route) =>
    LANGS.map(
      (lang) => `  <url>
    <loc>${xml(urlOf(site, route, lang))}</loc>
    <lastmod>${lastmod(route)}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${xml(urlOf(site, route, 'en'))}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${xml(urlOf(site, route, 'ar'))}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${xml(urlOf(site, route, 'en'))}"/>
  </url>`,
    ),
  )
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
}

/** robots.txt only takes effect at a domain root; `base` is the deploy base path ('/' or '/Repo/') */
export function robotsTxt(site: string, base = '/') {
  const privatePaths = `Disallow: ${base}dashboard
Disallow: ${base}ar/dashboard`
  return `# Search engines and AI assistants are welcome to read and cite this site.
User-agent: *
Allow: /
${privatePaths}

User-agent: GPTBot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
Allow: /
${privatePaths}

Sitemap: ${site}/sitemap.xml
`
}

/** Vite plugin: writes sitemap.xml and robots.txt into the build output */
export function seoFiles(site: string): Plugin {
  let base = '/'
  return {
    name: 'seo-files',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml(site) })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt(site, base) })
    },
  }
}
