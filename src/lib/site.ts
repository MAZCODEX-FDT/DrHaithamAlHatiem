import type { Lang } from '@/data/types'

/**
 * Where the site lives and which language a URL is in. English is at the root,
 * Arabic under /ar/, so each language has its own crawlable addresses.
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://mazcodex-fdt.github.io/DrHaithamAlHatiem').replace(/\/$/, '')

const BASE = import.meta.env.BASE_URL // '/' or '/DrHaithamAlHatiem/'

/** The language of the current address */
export function urlLang(pathname = window.location.pathname): Lang {
  return pathname === BASE + 'ar' || pathname.startsWith(BASE + 'ar/') ? 'ar' : 'en'
}

/** Router basename for a language: /base/ or /base/ar */
export const routerBase = (lang: Lang) => (lang === 'ar' ? BASE + 'ar' : BASE)

/** Absolute, canonical URL of a router path in a language, with the trailing slash GitHub Pages serves */
export function absUrl(path: string, lang: Lang) {
  const clean = path.replace(/\/+$/, '')
  return `${SITE_URL}${lang === 'ar' ? '/ar' : ''}${clean}/`
}

/** The same page in the other language, as a full address in this deployment */
export function otherLangHref(target: Lang, loc: Location = window.location) {
  const inner = urlLang(loc.pathname) === 'ar' ? loc.pathname.slice((BASE + 'ar').length) || '/' : '/' + loc.pathname.slice(BASE.length)
  const prefix = target === 'ar' ? BASE + 'ar' : BASE.replace(/\/$/, '')
  return `${prefix}${inner === '/' ? '/' : inner}${loc.search}${loc.hash}`
}
