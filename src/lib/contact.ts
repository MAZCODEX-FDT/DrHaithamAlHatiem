import type { Branch, DayKey, Lang, Settings } from '@/data/types'
import { dayNames, formatTime } from '@/lib/i18n'

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

/** wa.me link to the clinic number, optionally with the message already written */
export const waHref = (number: string, text?: string) => `https://wa.me/${number.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`

const clean = (phones: string[]) => phones.map((p) => p.trim()).filter(Boolean)
export const branchPhones = (b: Branch) => clean(b.phones)
export const clinicPhones = (s: Settings) => clean(s.phones)

/** Every number to offer for a call: the clinic-wide ones first, then any branch's own */
export const allPhones = (s: Settings) => [...new Set([...clinicPhones(s), ...s.branches.flatMap(branchPhones)])]

/** The number shown where there is room for only one */
export const primaryPhone = (s: Settings) => allPhones(s)[0] ?? ''

/** Opens WhatsApp with the message written out; the patient only has to press Send */
export function sendWhatsApp(number: string, text: string) {
  window.open(waHref(number, text), '_blank', 'noopener')
}

/** The Egyptian week, Saturday first */
export const WEEK: DayKey[] = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri']

/** "Saturday · Monday · Wednesday" in week order */
export const branchDays = (b: Branch, lang: Lang) =>
  WEEK.filter((d) => b.days.includes(d))
    .map((d) => dayNames[d][lang])
    .join(lang === 'ar' ? ' و' : ' · ')

/** "4:00 PM" — the time the doctor starts at this clinic */
export const branchFrom = (b: Branch, lang: Lang) => formatTime(b.from, lang)
