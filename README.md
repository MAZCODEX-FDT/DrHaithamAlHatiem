# Dr. Haitham AlHatiem — Vascular & Endovascular Surgery

Bilingual (English / Arabic) website and clinic dashboard for Dr. Haitham AlHatiem, consultant vascular surgeon (FRCS, UK).

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis smooth scroll · React Bits · Motion · Recharts

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
| `/book` | 3-step booking: service → date & time (from clinic hours) → details |
| `/contact` | Contact form, map and hours |

The language switch flips the whole site to Arabic and RTL (IBM Plex Sans Arabic). English uses Manrope.

### Dashboard (`/dashboard`)
Overview (KPIs, visits chart, case mix, today's schedule) · Appointments (list, week view, CSV export) · Patients (records with ABI, CEAP and risk factors) · Inquiries · Vascular tools (ABI calculator, Wells DVT score, CEAP reference) · Services, Health tips and Reviews CMS · Settings (profile, contact, hours, booking, homepage figures).

Bookings and contact messages from the website appear in the dashboard straight away. Content edited in the dashboard shows on the website.

## Before going live

- **Data is stored in the browser only** (`localStorage`, see `src/data/store.tsx`). Every read and write goes through `useStore()`, so moving to a real backend means replacing `load`/`save` and the mutation functions with API calls.
- **The dashboard login is a front-end demo gate** (`src/pages/dashboard/DashboardApp.tsx`, password `vascular2026`). It is not security. Production needs server-side authentication. Patient records are health data and must sit behind real auth on a server.
- **Clinic photos are placeholders.** Replace `public/brand/consultation-room.jpg`, `waiting-area.jpg` and `credentials-wall.jpg` with real photos at the same names.
- **Fill in real details** in Dashboard → Settings, or in `src/data/seed.ts`: clinic address, map location and social links (currently generic).

## Brand

The colours, type and icon style follow the brand guidelines. Tokens are defined in `src/index.css`: Artery Navy `#003478`, Clinical Mist `#F3F3F3`, Vessel Blue `#8DAFBC`, Pulse Blush `#C9B3AC`. The wordmark and portraits are in `public/brand/`.

## Credits

The components in `src/components/reactbits/` come from [React Bits](https://github.com/DavidHDev/react-bits) (MIT + Commons Clause).

## Deploy

This is a static SPA. `public/_redirects` (Netlify) and `vercel.json` route every path to `index.html`. On Apache/cPanel, add an `.htaccess` rewrite to `index.html`.
