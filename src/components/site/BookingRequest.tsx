import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { CalendarCheck, Check, MessageCircle, Phone, X } from 'lucide-react'
import { FineRule } from '@/components/brand/Brand'
import { Reveal } from '@/components/site/ui'
import { uid, usePublicData, useStore } from '@/data/store'
import { iso } from '@/data/seed'
import { formatDate, formatTime, useI18n } from '@/lib/i18n'
import { freeSlots, upcomingDays } from '@/lib/slots'
import { gsap } from '@/lib/smooth'

const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`
const waHref = (number: string, text: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`

/**
 * Short appointment request: service, preferred day and free slot, name and phone.
 * Creates a pending appointment, the same record the full /book flow creates,
 * so it appears in the dashboard's "Requests to confirm".
 */
export function BookingRequestForm({ serviceId: preset, compact, onDone }: { serviceId?: string; compact?: boolean; onDone?: () => void }) {
  const { t, tr, lang } = useI18n()
  const { services, settings } = usePublicData()
  const { db, upsert } = useStore()
  const id = useId()
  const days = useMemo(() => upcomingDays(settings, 14), [settings])
  const [serviceId, setServiceId] = useState(preset ?? '')
  const [day, setDay] = useState(days[0] ? iso(days[0]) : '')
  const [time, setTime] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', notes: '' })
  const [done, setDone] = useState<{ ref: string; summary: string } | null>(null)

  const dayDate = days.find((d) => iso(d) === day)
  const slots = useMemo(() => (dayDate ? freeSlots(dayDate, settings, db.appointments) : []), [dayDate, settings, db.appointments])
  // a slot taken meanwhile (or a day change) must not stay selected
  useEffect(() => {
    if (time && !slots.includes(time)) setTime('')
  }, [slots, time])
  useEffect(() => {
    if (preset) setServiceId(preset)
  }, [preset])

  const valid = !!serviceId && !!day && !!time && form.name.trim().length > 2 && form.phone.replace(/\D/g, '').length >= 8

  if (!settings.bookingOpen)
    return (
      <div className="space-y-5">
        <p className="text-lg font-semibold text-navy">{t('book.closed')}</p>
        <a href={telHref(settings.phone)} className="btn-primary">
          <Phone size={16} /> <span dir="ltr">{settings.phone}</span>
        </a>
      </div>
    )

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!valid) return
    const apId = uid('ap')
    const digits = form.phone.replace(/\D/g, '')
    const patient = db.patients.find((p) => p.phone.replace(/\D/g, '') === digits)
    upsert('appointments', {
      id: apId,
      patientId: patient?.id,
      name: form.name.trim(),
      phone: form.phone.trim(),
      serviceId,
      type: 'consultation',
      date: day,
      time,
      status: 'pending',
      source: 'website',
      notes: form.notes.trim() || undefined,
      createdAt: new Date().toISOString(),
    })
    const service = services.find((s) => s.id === serviceId)
    const ref = apId.slice(-6).toUpperCase()
    const when = `${formatDate(day, lang, { weekday: 'long', day: 'numeric', month: 'long' })} · ${formatTime(time, lang)}`
    setDone({ ref, summary: `${t('req.waIntro')}\n${service ? tr(service.title) : ''}\n${when}\n${form.name.trim()} · ${form.phone.trim()}\n${t('book.ref')}: ${ref}` })
  }

  if (done)
    return (
      <div className="text-center" role="status">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-navy text-white">
          <Check size={24} />
        </span>
        <p className="mt-5 text-2xl font-bold text-navy">{t('book.done')}</p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-deep">{t('book.doneSub')}</p>
        <p className="mt-4 text-sm text-deep">
          {t('book.ref')}: <b className="font-mono text-navy">{done.ref}</b>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <a href={waHref(settings.whatsapp, done.summary)} target="_blank" rel="noreferrer" className="btn-primary">
            <MessageCircle size={16} /> {t('req.waSend')}
          </a>
          <button
            type="button"
            className="btn-outline"
            onClick={() => {
              setDone(null)
              setTime('')
              setForm({ name: '', phone: '', notes: '' })
              onDone?.()
            }}
          >
            {onDone ? t('req.close') : t('req.another')}
          </button>
        </div>
      </div>
    )

  const label = 'mb-1.5 block text-sm font-semibold text-navy'
  return (
    <form onSubmit={submit} className={clsx('grid gap-4', !compact && 'sm:grid-cols-2')}>
      <label className={clsx(!compact && 'sm:col-span-2')}>
        <span className={label}>{t('req.service')}</span>
        <select className="field" value={serviceId} onChange={(e) => setServiceId(e.target.value)} required>
          <option value="" disabled>
            {t('req.chooseService')}
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {tr(s.title)}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className={label}>{t('req.date')}</span>
        <select className="field" value={day} onChange={(e) => setDay(e.target.value)} required>
          {days.map((d) => (
            <option key={iso(d)} value={iso(d)}>
              {formatDate(iso(d), lang, { weekday: 'long', day: 'numeric', month: 'long' })}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className={label}>{t('req.time')}</span>
        <select className="field" value={time} onChange={(e) => setTime(e.target.value)} required disabled={slots.length === 0} aria-describedby={slots.length === 0 ? `${id}-noslots` : undefined}>
          <option value="" disabled>
            {slots.length ? t('req.chooseTime') : '—'}
          </option>
          {slots.map((s) => (
            <option key={s} value={s}>
              {formatTime(s, lang)}
            </option>
          ))}
        </select>
        {slots.length === 0 && (
          <span id={`${id}-noslots`} className="mt-1.5 block text-xs text-deep">
            {t('book.noSlots')}
          </span>
        )}
      </label>
      <label>
        <span className={label}>{t('form.name')}</span>
        <input className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" required />
      </label>
      <label>
        <span className={label}>{t('form.phone')}</span>
        <input className="field" dir="ltr" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" required />
      </label>
      <label className={clsx(!compact && 'sm:col-span-2')}>
        <span className={label}>{t('form.notes')}</span>
        <textarea className="field min-h-20" rows={compact ? 2 : 3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      </label>
      <button className={clsx('btn-primary w-full disabled:cursor-not-allowed', !compact && 'sm:col-span-2')} disabled={!valid}>
        <CalendarCheck size={16} /> {t('req.send')}
      </button>
    </form>
  )
}

/** Full-width section: heading and direct contact on one side, the request form on the other */
export function BookingSection({ serviceId, className }: { serviceId?: string; className?: string }) {
  const { t } = useI18n()
  const { settings } = usePublicData()
  return (
    <section id="request" className={clsx('scroll-mt-28 py-20 sm:py-28', className)}>
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="label">{t('req.label')}</p>
          <h2 className="mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02] font-bold tracking-tight text-navy">{t('req.title')}</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">{t('req.sub')}</p>
          <FineRule className="mt-10 w-40 text-navy" />
          <p className="mt-10 text-sm font-semibold text-navy">{t('req.or')}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href={telHref(settings.phone)} className="btn-outline">
              <Phone size={16} /> <span dir="ltr">{settings.phone}</span>
            </a>
            <a href={waHref(settings.whatsapp, t('req.waHello'))} target="_blank" rel="noreferrer" className="btn-outline">
              <MessageCircle size={16} /> {t('cta.whatsapp')}
            </a>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="card p-6 shadow-[0_30px_80px_-40px_rgba(0,36,90,0.35)] sm:p-10">
            <BookingRequestForm serviceId={serviceId} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * Floating WhatsApp / call / book buttons on every public page. "Book" opens the
 * request form in a panel (a bottom sheet on phones).
 */
export function FloatingContact({ ready }: { ready: boolean }) {
  const { t } = useI18n()
  const { settings } = usePublicData()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const stack = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLButtonElement>(null)
  // the booking page already is the form
  const onBookPage = pathname.endsWith('/book')

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    panel.current?.querySelector<HTMLElement>('select, input')?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      opener.current?.focus()
    }
  }, [open])

  useGSAP(
    () => {
      if (ready) gsap.from('.fab', { y: 24, opacity: 0, scale: 0.8, duration: 0.7, stagger: 0.08, ease: 'back.out(1.6)' })
    },
    { scope: stack, dependencies: [ready] },
  )

  const round = 'fab grid h-14 w-14 place-items-center rounded-full shadow-[0_14px_34px_-12px_rgba(0,36,90,0.55)] transition-shadow hover:shadow-[0_18px_40px_-10px_rgba(0,36,90,0.7)]'

  return (
    <>
      {/* shown once the intro preloader has finished */}
      <div ref={stack} className={clsx('fixed end-4 bottom-4 z-30 flex flex-col items-end gap-3 sm:end-6 sm:bottom-6', !ready && 'invisible')}>
        <a href={waHref(settings.whatsapp, t('req.waHello'))} target="_blank" rel="noreferrer" aria-label={t('cta.whatsapp')} className={clsx(round, 'bg-[#25D366] text-white')}>
          <WhatsAppIcon />
        </a>
        <a href={telHref(settings.phone)} aria-label={t('cta.call')} className={clsx(round, 'bg-white text-navy ring-1 ring-navy/10')}>
          <Phone size={22} strokeWidth={1.8} />
        </a>
        {!onBookPage && (
          <button
            ref={opener}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="booking-panel"
            aria-label={t('req.title')}
            className={clsx(round, 'bg-navy text-white sm:w-auto sm:gap-2 sm:px-6 sm:text-sm sm:font-semibold', 'sm:inline-flex sm:items-center')}
          >
            {open ? <X size={22} /> : <CalendarCheck size={22} strokeWidth={1.8} />}
            <span className="hidden sm:inline">{t('nav.book')}</span>
          </button>
        )}
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-[55] bg-ink/30 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none" onClick={() => setOpen(false)} />
          <div
            ref={panel}
            id="booking-panel"
            role="dialog"
            aria-modal="true"
            aria-label={t('req.title')}
            data-lenis-prevent
            className="thin-scroll fixed inset-x-2 bottom-2 z-[60] max-h-[calc(100dvh-1rem)] overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl sm:inset-x-auto sm:end-6 sm:bottom-24 sm:max-h-[calc(100dvh-11rem)] sm:w-[420px]"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xl font-bold text-navy">{t('req.title')}</p>
                <p className="mt-1 text-sm text-deep">{t('req.subShort')}</p>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-blue-20" aria-label={t('req.close')}>
                <X size={18} />
              </button>
            </div>
            <BookingRequestForm compact onDone={() => setOpen(false)} />
          </div>
        </>
      )}
    </>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.93 9.93 0 1 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.2 8.2 0 1 1 6.86 3.74Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}
