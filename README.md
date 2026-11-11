# Dr. Haitham AlHatiem — Vascular & Endovascular Surgery

Bilingual (English / Arabic) website and clinic dashboard for Dr. Haitham AlHatiem, consultant vascular surgeon (FRCS, UK).

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis smooth scroll · React Bits · Motion

## Run it

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/ (includes sitemap.xml and robots.txt)
npm run lint       # oxlint
npm run prerender  # after build: static HTML for every public page + llms.txt (needs Playwright's Chromium)
```

### Environment

All settings are read at build time. Copy `.env.example` to `.env.local` for local builds, or set them in Vercel (Project → Settings → Environment Variables) or GitHub (Settings → Secrets and variables → Actions → **Variables**). Empty means off.

| Variable | What it does |
| --- | --- |
| `VITE_SITE_URL` (or `SITE_URL`) | Public address, no trailing slash. Used for canonical and `hreflang` links, structured data, `sitemap.xml` and `robots.txt`. If empty: Vercel's production domain on Vercel, otherwise `https://mazcodex-fdt.github.io/DrHaithamAlHatiem`. Set it once the site has its own domain. |
| `BASE_PATH` | Deploy sub-path, e.g. `/DrHaithamAlHatiem/` on GitHub Pages (the workflow sets it). Shell/CI only; default `/`. |
| `VITE_GA4_ID` | Google Analytics 4 measurement ID (`G-…`). Empty: GA4 is not loaded. |
| `VITE_META_PIXEL_ID` | Meta (Facebook) Pixel ID. Empty: the pixel is not loaded. |

`npm run prerender` reads `SITE_URL` / `BASE_PATH` from the shell (not from `.env.local`).

## What's inside

### Website (`/`)
| Route | Page |
| --- | --- |
| `/` | Home: hero, conditions ticker, doctor intro, values, services rail, patient journey, clinic, reviews, health tips, FAQ |
| `/about` | Doctor profile and credentials |
| `/services`, `/services/:slug` | All services and one page per condition or procedure |
| `/guide`, `/guide/:slug` | Patient guide (health tips) |
| `/book` | Appointment request form |
| `/contact` | The three clinics (address, days, start time, Google Maps link), weekly schedule, phone, WhatsApp, question form |

The language switch flips the whole site to Arabic and RTL (IBM Plex Sans Arabic). English uses Manrope.

### Booking: WhatsApp only
Every booking and message goes to the clinic's WhatsApp. That covers the floating **Book** button, the request section on the home, contact and service pages, `/book`, and the contact form. When the patient presses **Send**, WhatsApp opens with their name, phone, branch, service, preferred day and time and notes already written, addressed to the clinic number. The patient sends it from their own WhatsApp. **The website stores no patient data.**

Floating **WhatsApp** and **Call** buttons sit on every page. With more than one phone number, Call lists every branch's numbers.

### Dashboard (`/dashboard`)
The dashboard manages website content only:
- **Overview:** content summary, where bookings go, branches at a glance.
- **Services, Health tips, Reviews:** edit what the site shows.
- **Settings:**
  - doctor profile;
  - clinic WhatsApp (receives all bookings) and email;
  - clinic phone numbers;
  - **clinics**: any number, each with a name, an address, its clinic days, a start time, a Google Maps link and optional numbers of its own;
  - social links, announcement bar and homepage figures.

There are no patient, appointment or treatment records.

### SEO and GEO (search engines and AI assistants)
- **Two languages, two sets of addresses:** English at `/…`, Arabic at `/ar/…`. The language switch moves to the same page in the other language, and a visitor's choice is remembered.
- **Pre-rendered HTML:** `npm run prerender` (run by the deploy workflow after `vite build`) opens every public page in both languages in a headless browser and saves the finished HTML. Crawlers that don't run JavaScript still read the full text.
- **Every page has:**
  - its own title, description and canonical address;
  - `hreflang` links between English and Arabic;
  - Open Graph tags;
  - schema.org data (`src/lib/schema.ts`): Physician, Person, MedicalClinic per clinic with its days, MedicalWebPage, MedicalCondition, FAQPage, Article and BreadcrumbList.
- **Generated at build:** `vite build` writes `sitemap.xml` (every public page in both languages, with `hreflang` alternates) and `robots.txt` (AI crawlers welcome; `/dashboard` and `/ar/dashboard` excluded) into `dist/`, from the page list in `scripts/seo.ts`, so they exist on Vercel too. The pre-render step adds `llms.txt` and `llms-full.txt` (plain summaries for AI assistants).
- **Service pages** carry long-form content and FAQs from `src/data/serviceContent.ts`: what it is, causes, diagnosis, treatment, recovery, when to see a surgeon. It is static content, edited in code rather than in the dashboard. Update `REVIEWED` in `src/lib/schema.ts` when the doctor re-reviews it.
- **`robots.txt` only takes effect at a domain root.** Move the site to its own domain (and set `SITE_URL`), then submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.

### Analytics (optional)
Google Analytics 4 and the Meta Pixel load only when `VITE_GA4_ID` / `VITE_META_PIXEL_ID` are set (`src/lib/analytics.ts`), only on the public pages (never on `/dashboard`), and never during the pre-render. They send:
- a page view on every page change in the app (GA4 `page_view`, Meta `PageView`);
- a lead (GA4 `generate_lead`, Meta `Lead`) when a visitor taps a WhatsApp or phone link, or sends the booking or contact form. The `method` parameter says which: `whatsapp`, `phone`, `booking_form`, `contact_form`.

In GA4, turn off **Admin → Data streams → Enhanced measurement → Page views → "Page changes based on browser history events"**, otherwise page changes are counted twice. Mark `generate_lead` as a key event. No cookie-consent banner is built in; add one if the clinic's privacy policy or the visitors' local law requires it.

## Before going live

- **Website content is stored in the browser only** (`localStorage`, see `src/data/store.tsx`), so dashboard edits are visible only on the device that made them. To publish edits for every visitor, either put the content behind a small API (replace `load`/`save` in `useStore()`), or edit the defaults in `src/data/seed.ts` and redeploy.
- **The dashboard login is a front-end demo gate** (`src/pages/dashboard/DashboardApp.tsx`, password `vascular2026`). It is not security: anyone reading the page source can find it. Production needs server-side authentication.
- **Clinic photos are placeholders.** Replace `public/brand/consultation-room.jpg`, `waiting-area.jpg` and `credentials-wall.jpg` with real photos at the same names.
- **Clinics:** New Giza (Sat/Mon/Wed from 4 PM), Arab Contractors Hospital (Sun/Tue from 2 PM) and Misr University Hospital – Souad Kafafi (Sat/Mon/Thu from 2 PM) are in `src/data/seed.ts`. Their map links are Google Maps searches; replace them with exact share links when available. Social links are still generic.

## Brand

The colours, type and icon style follow the brand guidelines. Tokens are defined in `src/index.css`: Artery Navy `#003478`, Clinical Mist `#F3F3F3`, Vessel Blue `#8DAFBC`, Pulse Blush `#C9B3AC`. The wordmark and portraits are in `public/brand/`.

## Credits

The components in `src/components/reactbits/` come from [React Bits](https://github.com/DavidHDev/react-bits) (MIT + Commons Clause).

## Deploy

This is a static SPA. `public/_redirects` (Netlify) and `vercel.json` route every path to `index.html`. On Apache/cPanel, add an `.htaccess` rewrite to `index.html`.

- **GitHub Pages:** `.github/workflows/deploy.yml` builds, pre-renders and publishes on every push to `main`.
- **Vercel:** runs `npm run build` only (no pre-render, so no `llms.txt` and no static HTML per page). `sitemap.xml` and `robots.txt` are still produced, using the project's production domain unless `VITE_SITE_URL` is set.
