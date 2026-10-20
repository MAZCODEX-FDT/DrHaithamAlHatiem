import type { Appointment, Settings } from '@/data/types'
import { iso } from '@/data/seed'
import { dayFromIndex } from './i18n'

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}
const toHHMM = (min: number) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

/** All slot start times for a date, per the clinic's working hours */
export function slotsFor(date: Date, settings: Settings): string[] {
  const h = settings.hours.find((x) => x.day === dayFromIndex[date.getDay()])
  if (!h || h.closed) return []
  const out: string[] = []
  for (let m = toMin(h.open); m + settings.slotMinutes <= toMin(h.close); m += settings.slotMinutes) out.push(toHHMM(m))
  return out
}

/** Slots still free (not booked, not in the past) */
export function freeSlots(date: Date, settings: Settings, appointments: Appointment[]): string[] {
  const d = iso(date)
  const taken = new Set(appointments.filter((a) => a.date === d && a.status !== 'cancelled').map((a) => a.time.padStart(5, '0')))
  const now = new Date()
  const isToday = iso(now) === d
  const nowMin = now.getHours() * 60 + now.getMinutes() + 60
  return slotsFor(date, settings).filter((s) => !taken.has(s) && (!isToday || toMin(s) > nowMin))
}

/** Next N open days starting today */
export function upcomingDays(settings: Settings, count = 14): Date[] {
  const out: Date[] = []
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  for (let i = 0; out.length < count && i < 60; i++) {
    const day = new Date(d)
    day.setDate(d.getDate() + i)
    const h = settings.hours.find((x) => x.day === dayFromIndex[day.getDay()])
    if (h && !h.closed) out.push(day)
  }
  return out
}
