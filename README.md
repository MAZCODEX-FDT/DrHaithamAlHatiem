# Dr. Haitham AlHatiem — Vascular & Endovascular Surgery

Bilingual (English / Arabic) website and clinic dashboard for Dr. Haitham AlHatiem, consultant vascular surgeon (FRCS, UK).

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis smooth scroll · React Bits · Motion

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run lint     # oxlint
```

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
- **Generated at build:** `sitemap.xml` (with language alternates), `robots.txt` (AI crawlers welcome; the dashboard excluded), `llms.txt` and `llms-full.txt` (plain summaries for AI assistants).
- **Service pages** carry long-form content and FAQs from `src/data/serviceContent.ts`: what it is, causes, diagnosis, treatment, recovery, when to see a surgeon. It is static content, edited in code rather than in the dashboard. Update `REVIEWED` in `src/lib/schema.ts` when the doctor re-reviews it.
- **`robots.txt` only takes effect at a domain root.** Move the site to its own domain (and set `SITE_URL`), then submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.

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
