/**
 * Pre-render every public page, in English and Arabic, to static HTML so search
 * engines and AI crawlers that don't run JavaScript still read the full content.
 * Also writes llms.txt and llms-full.txt. (sitemap.xml and robots.txt are written by
 * `vite build` itself, from the same list of pages in scripts/seo.ts.)
 *
 * Run after `vite build`:  node --experimental-strip-types scripts/prerender.mjs
 * Env: BASE_PATH (e.g. /DrHaithamAlHatiem/), SITE_URL (absolute, no trailing slash)
 */
import { createServer } from 'node:http'
import { copyFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
import { chromium } from 'playwright'
import { settings } from '../src/data/seed.ts'
import { serviceContent } from '../src/data/serviceContent.ts'
import { LANGS, activeServices, publishedTips, routes, siteUrl, urlOf as siteUrlOf } from './seo.ts'

const DIST = resolve('dist')
const BASE = process.env.BASE_PATH || '/'
const SITE = siteUrl()
const urlOf = (route, lang) => siteUrlOf(SITE, route, lang)

// ---------- a tiny static server that behaves like GitHub Pages ----------
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json', '.txt': 'text/plain' }
const shell = await readFile(join(DIST, 'index.html'))
// GitHub Pages serves 404.html for unknown paths: keep it as the bare app shell
await copyFile(join(DIST, 'index.html'), join(DIST, '404.html'))

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  if (p.startsWith(BASE)) p = '/' + p.slice(BASE.length)
  try {
    const file = join(DIST, p)
    const st = await stat(file)
    const target = st.isDirectory() ? join(file, 'index.html') : file
    res.writeHead(200, { 'content-type': types[extname(target)] || 'application/octet-stream' })
    res.end(await readFile(target))
  } catch {
    res.writeHead(404, { 'content-type': types['.html'] })
    res.end(shell)
  }
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const origin = `http://127.0.0.1:${server.address().port}`

// ---------- render ----------
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
// skip the intro animation; never redirect by a remembered language
await ctx.addInitScript(() => {
  try {
    sessionStorage.setItem('dha:intro', '1')
    localStorage.clear()
  } catch {}
})
const page = await ctx.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(e.message))

const rendered = []
for (const lang of LANGS) {
  for (const route of routes) {
    const path = `${BASE}${lang === 'ar' ? 'ar' : ''}${route === '/' ? (lang === 'ar' ? '/' : '') : (lang === 'ar' ? route : route.slice(1))}`
    await page.goto(origin + path, { waitUntil: 'networkidle' })
    await page.waitForSelector('h1', { timeout: 15000 })
    await page.waitForTimeout(800)
    const html = await page.evaluate(() => {
      // static snapshot: show everything at rest (entrance animations leave inline opacity/transform behind)
      for (const el of document.querySelectorAll('#root [style]')) {
        for (const prop of ['opacity', 'transform', 'translate', 'scale', 'rotate', 'filter', 'visibility', 'clip-path', 'will-change']) el.style.removeProperty(prop)
      }
      document.querySelectorAll('.lenis, .lenis-smooth').forEach((el) => el.classList.remove('lenis', 'lenis-smooth', 'lenis-scrolling'))
      return '<!doctype html>\n' + document.documentElement.outerHTML
    })
    const h1 = await page.locator('h1').first().innerText()
    const out = join(DIST, lang === 'ar' ? 'ar' : '', route === '/' ? '' : route.slice(1), 'index.html')
    await mkdir(join(out, '..'), { recursive: true })
    await writeFile(out, html)
    rendered.push({ lang, route, h1: h1.replace(/\s+/g, ' ').slice(0, 60) })
  }
}
await browser.close()
server.close()
if (errors.length) {
  console.error('Page errors while pre-rendering:\n' + errors.join('\n'))
  process.exit(1)
}

// ---------- llms.txt / llms-full.txt (a plain summary for AI assistants) ----------
const d = settings.doctor
const days = { sat: 'Saturday', sun: 'Sunday', mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday' }
const order = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri']
const time = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`
}
const clinicLines = settings.branches.map((b) => `- **${b.name.en}** (${b.name.ar}): ${b.address.en}. Clinic days: ${order.filter((x) => b.days.includes(x)).map((x) => days[x]).join(', ')}, from ${time(b.from)}.${b.mapUrl ? ` Map: ${b.mapUrl}` : ''}`)
const llms = `# ${d.name.en} — ${d.title.en}

> ${d.name.en} (${d.name.ar}) is a ${d.title.en.toLowerCase()} and ${d.credentials.en} in Egypt, treating venous and arterial disease — varicose veins, peripheral arterial disease, diabetic foot, deep vein thrombosis, aortic aneurysm and dialysis access — with minimally invasive and endovascular techniques and same-visit duplex Doppler scans.

## Clinics
${clinicLines.join('\n')}

## Contact and booking
- Phone: ${settings.phones.join(', ')}
- WhatsApp (bookings): +${settings.whatsapp} — appointment requests from the website open in WhatsApp; the clinic replies to confirm.
- Book online: ${urlOf('/book', 'en')}

## Services
${activeServices.map((s) => `- [${s.title.en}](${urlOf(`/services/${s.slug}`, 'en')}): ${s.short.en}`).join('\n')}

## Patient guide
${publishedTips.map((t) => `- [${t.title.en}](${urlOf(`/guide/${t.slug}`, 'en')}): ${t.excerpt.en}`).join('\n')}

## Other pages
- [About ${d.name.en}](${urlOf('/about', 'en')})
- [Clinics, days and directions](${urlOf('/contact', 'en')})
- [Full text of the service pages](${SITE}/llms-full.txt)
- Arabic version of every page: ${SITE}/ar/

Medical information on this site is general and reviewed by ${d.name.en}; it does not replace a consultation.
`
await writeFile(join(DIST, 'llms.txt'), llms)

const full = `# ${d.name.en} — service pages (full text)

${activeServices
  .map((s) => {
    const c = serviceContent[s.id]
    const sections = c ? c.sections.map((sec) => `### ${sec.title.en}\n\n${sec.body.en}`).join('\n\n') : s.body.en
    const faqs = c ? '\n\n### Frequently asked questions\n\n' + c.faqs.map((f) => `**${f.q.en}**\n${f.a.en}`).join('\n\n') : ''
    return `## ${s.title.en}\n\nURL: ${urlOf(`/services/${s.slug}`, 'en')}\n\n${s.body.en}\n\n${sections}${faqs}`
  })
  .join('\n\n---\n\n')}
`
await writeFile(join(DIST, 'llms-full.txt'), full)

console.log(`Pre-rendered ${rendered.length} pages:`)
for (const r of rendered) console.log(`  ${r.lang}  ${r.route.padEnd(42)} ${r.h1}`)
