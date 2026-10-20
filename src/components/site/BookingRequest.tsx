import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { CalendarCheck, Check, MapPin, Phone, X } from 'lucide-react'
import { FineRule } from '@/components/brand/Brand'
import { Reveal } from '@/components/site/ui'
import { usePublicData } from '@/data/store'
import { iso } from '@/data/seed'
import { branchPhones, primaryPhone, sendWhatsApp, telHref, waHref } from '@/lib/contact'
import { formatDate, formatTime, useI18n } from '@/lib/i18n'
import { gsap } from '@/lib/smooth'

/**
 * Appointment request. Nothing is stored: pressing Send opens WhatsApp with the
 * request written out to the clinic number, and the patient sends it from there.
 */
export function BookingRequestForm({ serviceId: preset, compact, onDone }: { serviceId?: string; compact?: boolean; onDone?: () => void }) {
  const { t, tr, lang } = useI18n()
  const { services, settings } = usePublicData()
  const { branches } = settings
  const empty = { name: '', phone: '', branchId: branches.length === 1 ? branches[0].id : '', serviceId: preset ?? '', date: '', time: '', notes: '' }
  const [form, setForm] = useState(empty)
  const [sent, setSent] = useState<string | null>(null)
  const today = useMemo(() => iso(new Date()), [])

  useEffect(() => {
    if (preset) setForm((f) => ({ ...f, serviceId: preset }))
  }, [preset])

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value })
  const valid = form.name.trim().length > 2 && form.phone.replace(/\D/g, '').length >= 8 && !!form.serviceId && (branches.length < 2 || !!form.branchId)

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!valid) return
    const branch = branches.find((b) => b.id === form.branchId)
    const service = services.find((s) => s.id === form.serviceId)
    const lines = [
      `${t('req.msgTitle')} — ${tr(settings.doctor.name)}`,
      '',
      `${t('req.msgName')}: ${form.name.trim()}`,
      `${t('req.msgPhone')}: ${form.phone.trim()}`,
      branch && branches.length > 1 && `${t('req.branch')}: ${tr(branch.name)}`,
      service && `${t('req.service')}: ${tr(service.title)}`,
      form.date && `${t('req.msgDate')}: ${formatDate(form.date, lang, { weekday: 'long', day: 'numeric', month: 'long' })}`,
      form.time && `${t('req.msgTime')}: ${formatTime(form.time, lang)}`,
      form.notes.trim() && `${t('req.msgNotes')}: ${form.notes.trim()}`,
    ]
    const text = lines.filter((l) => l !== false && l !== undefined && l !== null).join('\n')
    sendWhatsApp(settings.whatsapp, text)
    setSent(text)
  }

  if (sent)
    return (
      <div className="text-center" role="status">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white">
          <Check size={24} />
        </span>
        <p className="mt-5 text-2xl font-bold text-navy">{t('req.doneTitle')}</p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-deep">{t('req.doneSub')}</p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <a href={waHref(settings.whatsapp, sent)} target="_blank" rel="noreferrer" className="text-sm font-semibold text-navy underline underline-offset-4">
            {t('req.reopen')}
          </a>
          <button
            type="button"
            className="btn-outline"
            onClick={() => {
              setSent(null)
              setForm(empty)
              onDone?.()
            }}
          >
            {onDone ? t('req.close') : t('req.another')}
          </button>
        </div>
      </div>
    )

  const label = 'mb-1.5 block text-sm font-semibold text-navy'
  const wide = clsx(!compact && 'sm:col-span-2')
  return (
    <form onSubmit={submit} className={clsx('grid gap-4', !compact && 'sm:grid-cols-2')}>
      <label>
        <span className={label}>{t('form.name')}</span>
        <input className="field" value={form.name} onChange={set('name')} autoComplete="name" required />
      </label>
      <label>
        <span className={label}>{t('form.phone')}</span>
        <input className="field" dir="ltr" inputMode="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" required />
      </label>
      {branches.length > 1 && (
        <label className={wide}>
          <span className={label}>{t('req.branch')}</span>
          <select className="field" value={form.branchId} onChange={set('branchId')} required>
            <option value="" disabled>
              {t('req.chooseBranch')}
            </option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {tr(b.name)}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className={wide}>
        <span className={label}>{t('req.service')}</span>
        <select className="field" value={form.serviceId} onChange={set('serviceId')} required>
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
        <input className="field" type="date" min={today} value={form.date} onChange={set('date')} />
      </label>
      <label>
        <span className={label}>{t('req.time')}</span>
        <input className="field" type="time" value={form.time} onChange={set('time')} />
      </label>
      <label className={wide}>
        <span className={label}>{t('form.notes')}</span>
        <textarea className="field min-h-20" rows={compact ? 2 : 3} value={form.notes} onChange={set('notes')} />
      </label>
      <button className={clsx('btn-primary w-full disabled:cursor-not-allowed', wide)} disabled={!valid}>
        <WhatsAppIcon size={18} /> {t('req.send')}
      </button>
    </form>
  )
}

/** Full-width section: heading and direct contact on one side, the request form on the other */
export function BookingSection({ serviceId, className, page }: { serviceId?: string; className?: string; page?: boolean }) {
  // on /book the heading is the page's own h1
  const Heading = page ? 'h1' : 'h2'
  const { t } = useI18n()
  const { settings } = usePublicData()
  const phone = primaryPhone(settings)
  return (
    <section id="request" className={clsx('scroll-mt-28 py-20 sm:py-28', className)}>
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="label">{t('req.label')}</p>
          <Heading className="mt-5 text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02] font-bold tracking-tight text-navy">{t('req.title')}</Heading>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">{t('req.sub')}</p>
          <FineRule className="mt-10 w-40 text-navy" />
          <p className="mt-10 text-sm font-semibold text-navy">{t('req.or')}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {phone && (
              <a href={telHref(phone)} className="btn-outline">
                <Phone size={16} /> <span dir="ltr">{phone}</span>
              </a>
            )}
            <a href={waHref(settings.whatsapp, t('req.waHello'))} target="_blank" rel="noreferrer" className="btn-outline">
              <WhatsAppIcon size={16} /> {t('cta.whatsapp')}
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
 * request form in a panel (a bottom sheet on phones); "Call" dials straight away
 * when the clinic has one number, and lists every branch's numbers otherwise.
 */
export function FloatingContact({ ready }: { ready: boolean }) {
  const { t, tr } = useI18n()
  const { settings } = usePublicData()
  const { pathname } = useLocation()
  const [open, setOpen] = useState<'book' | 'call' | null>(null)
  const stack = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const openers = useRef<Record<string, HTMLButtonElement | null>>({})
  // the booking page already is the form
  const onBookPage = pathname.endsWith('/book')
  const phones = settings.branches.flatMap(branchPhones)
  const withPhones = settings.branches.filter((b) => branchPhones(b).length)

  useEffect(() => setOpen(null), [pathname])

  useEffect(() => {
    if (!open) return
    const which = open
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    panel.current?.querySelector<HTMLElement>('input, select, a')?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      openers.current[which]?.focus()
    }
  }, [open])

  useGSAP(
    () => {
      if (ready) gsap.from('.fab', { y: 24, opacity: 0, scale: 0.8, duration: 0.7, stagger: 0.08, ease: 'back.out(1.6)' })
    },
    { scope: stack, dependencies: [ready] },
  )

  // no CSS transition on opacity/transform: it would freeze the GSAP entrance part-way
  const round = 'fab grid h-14 w-14 place-items-center rounded-full shadow-[0_14px_34px_-12px_rgba(0,36,90,0.55)] transition-shadow hover:shadow-[0_18px_40px_-10px_rgba(0,36,90,0.7)]'
  const toggle = (which: 'book' | 'call') => setOpen((o) => (o === which ? null : which))

  return (
    <>
      {/* shown once the intro preloader has finished */}
      <div ref={stack} className={clsx('fixed end-4 bottom-4 z-30 flex flex-col items-end gap-3 sm:end-6 sm:bottom-6', !ready && 'invisible')}>
        <a href={waHref(settings.whatsapp, t('req.waHello'))} target="_blank" rel="noreferrer" aria-label={t('cta.whatsapp')} className={clsx(round, 'bg-[#25D366] text-white')}>
          <WhatsAppIcon />
        </a>
        {phones.length === 1 ? (
          <a href={telHref(phones[0])} aria-label={t('cta.call')} className={clsx(round, 'bg-white text-navy ring-1 ring-navy/10')}>
            <Phone size={22} strokeWidth={1.8} />
          </a>
        ) : (
          phones.length > 1 && (
            <button
              ref={(el) => {
                openers.current.call = el
              }}
              onClick={() => toggle('call')}
              aria-expanded={open === 'call'}
              aria-controls="call-panel"
              aria-label={t('cta.call')}
              className={clsx(round, 'bg-white text-navy ring-1 ring-navy/10')}
            >
              {open === 'call' ? <X size={22} /> : <Phone size={22} strokeWidth={1.8} />}
            </button>
          )
        )}
        {!onBookPage && (
          <button
            ref={(el) => {
              openers.current.book = el
            }}
            onClick={() => toggle('book')}
            aria-expanded={open === 'book'}
            aria-controls="booking-panel"
            aria-label={t('req.title')}
            className={clsx(round, 'bg-navy text-white sm:inline-flex sm:w-auto sm:items-center sm:gap-2 sm:px-6 sm:text-sm sm:font-semibold')}
          >
            {open === 'book' ? <X size={22} /> : <CalendarCheck size={22} strokeWidth={1.8} />}
            <span className="hidden sm:inline">{t('nav.book')}</span>
          </button>
        )}
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-[55] bg-ink/30 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none" onClick={() => setOpen(null)} />
          <div
            ref={panel}
            id={open === 'book' ? 'booking-panel' : 'call-panel'}
            role="dialog"
            aria-modal="true"
            aria-label={open === 'book' ? t('req.title') : t('cta.call')}
            data-lenis-prevent
            className="thin-scroll fixed inset-x-2 bottom-2 z-[60] max-h-[calc(100dvh-1rem)] overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl sm:inset-x-auto sm:end-6 sm:bottom-24 sm:max-h-[calc(100dvh-11rem)] sm:w-[420px]"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xl font-bold text-navy">{open === 'book' ? t('req.title') : t('cta.call')}</p>
                {open === 'book' && <p className="mt-1 text-sm text-deep">{t('req.subShort')}</p>}
              </div>
              <button onClick={() => setOpen(null)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-blue-20" aria-label={t('req.close')}>
                <X size={18} />
              </button>
            </div>
            {open === 'book' ? (
              <BookingRequestForm compact onDone={() => setOpen(null)} />
            ) : (
              <ul className="space-y-4">
                {withPhones.map((b) => (
                  <li key={b.id}>
                    {withPhones.length > 1 && (
                      <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-navy">
                        <MapPin size={14} /> {tr(b.name)}
                      </p>
                    )}
                    <div className="space-y-2">
                      {branchPhones(b).map((ph) => (
                        <a key={ph} href={telHref(ph)} className="flex h-12 items-center gap-3 rounded-2xl bg-mist px-4 font-semibold text-navy hover:bg-blue-20">
                          <Phone size={16} strokeWidth={1.8} /> <span dir="ltr">{ph}</span>
                        </a>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </>
  )
}

export function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.93 9.93 0 1 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.2 8.2 0 1 1 6.86 3.74Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}
