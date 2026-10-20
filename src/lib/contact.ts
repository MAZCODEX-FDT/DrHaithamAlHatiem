import type { Branch, Settings } from '@/data/types'

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`

/** wa.me link to the clinic number, optionally with the message already written */
export const waHref = (number: string, text?: string) => `https://wa.me/${number.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const branchPhones = (b: Branch) => b.phones.map((p) => p.trim()).filter(Boolean)

/** The number shown where there is room for only one: the first branch's first phone */
export const primaryPhone = (s: Settings) => s.branches.flatMap(branchPhones)[0] ?? ''

/** Opens WhatsApp with the message written out; the patient only has to press Send */
export function sendWhatsApp(number: string, text: string) {
  window.open(waHref(number, text), '_blank', 'noopener')
}
