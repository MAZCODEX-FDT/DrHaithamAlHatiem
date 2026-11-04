/**
 * Google Analytics 4 and Meta Pixel, loaded only when their IDs are set at build time
 * (VITE_GA4_ID, VITE_META_PIXEL_ID). With neither set, nothing is loaded and every call
 * here does nothing.
 *
 * They start from the public site layout only, so the dashboard never loads them, and
 * never in a headless browser (the pre-render step), so the saved HTML stays clean.
 */
const GA4_ID = (import.meta.env.VITE_GA4_ID ?? '').trim()
const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID ?? '').trim()

type Fn = (...args: unknown[]) => void
type Fbq = Fn & { callMethod?: Fn; queue: unknown[][]; push: Fbq; loaded: boolean; version: string; disablePushState?: boolean }
declare global {
  interface Window {
    [gaDisable: `ga-disable-${string}`]: boolean | undefined
    dataLayer?: unknown[]
    gtag?: Fn
    fbq?: Fbq
    _fbq?: Fbq
  }
}

let started = false

function addScript(src: string) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

/**
 * Load the configured trackers once (and resume them after a visit to the dashboard).
 * Returns false when there is nothing to load.
 */
export function startAnalytics() {
  if (started) {
    if (GA4_ID) window[`ga-disable-${GA4_ID}`] = false
    return true
  }
  if ((!GA4_ID && !PIXEL_ID) || typeof window === 'undefined' || navigator.webdriver) return false
  started = true

  if (GA4_ID) {
    window.dataLayer = window.dataLayer || []
    // gtag.js expects the arguments object itself, as in Google's snippet
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments)
    }
    window.gtag('js', new Date())
    // page views are sent on every route change below, not automatically
    window.gtag('config', GA4_ID, { send_page_view: false })
    addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`)
  }

  if (PIXEL_ID && !window.fbq) {
    // Meta's standard base code, without the inline <script>
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args)
      else fbq.queue.push(args)
    } as Fbq
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    // page views are sent on every public route change below; don't let the pixel add its own
    fbq.disablePushState = true
    window.fbq = window._fbq = fbq
    addScript('https://connect.facebook.net/en_US/fbevents.js')
    fbq('init', PIXEL_ID)
  }
  return true
}

/** Leaving the public pages (e.g. for the dashboard): GA4 sends nothing more until startAnalytics() runs again */
export function pauseAnalytics() {
  if (started && GA4_ID) window[`ga-disable-${GA4_ID}`] = true
}

/** A page view in the single-page app: call after every route change, including the first page */
export function trackPageView() {
  if (!started) return
  if (GA4_ID) window.gtag?.('event', 'page_view', { page_location: window.location.href, page_path: window.location.pathname, page_title: document.title, send_to: GA4_ID })
  if (PIXEL_ID) window.fbq?.('track', 'PageView')
}

export type LeadMethod = 'whatsapp' | 'phone' | 'booking_form' | 'contact_form'

/** A visitor reached out: GA4 `generate_lead`, Meta `Lead` */
export function trackLead(method: LeadMethod) {
  if (!started) return
  if (GA4_ID) window.gtag?.('event', 'generate_lead', { method, send_to: GA4_ID })
  if (PIXEL_ID) window.fbq?.('track', 'Lead', { content_name: method })
}

/** Which kind of lead a clicked link is, if any */
export function leadMethodOf(href: string): LeadMethod | null {
  if (/^tel:/i.test(href)) return 'phone'
  if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|(web\.)?whatsapp\.com)\//i.test(href)) return 'whatsapp'
  return null
}
