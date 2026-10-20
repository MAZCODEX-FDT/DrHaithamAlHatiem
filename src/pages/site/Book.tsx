import { useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react'
import { ServiceIcon } from '@/components/brand/Icons'
import { FineRule, PulseLine } from '@/components/brand/Brand'
import { MaskHeading, Reveal } from '@/components/site/ui'
import { uid, usePublicData, useStore } from '@/data/store'
import { iso } from '@/data/seed'
import type { AppointmentType } from '@/data/types'
import { formatDate, formatTime, useI18n, type DictKey } from '@/lib/i18n'
import { freeSlots, upcomingDays } from '@/lib/slots'
import { gsap } from '@/lib/smooth'

const types: AppointmentType[] = ['consultation', 'follow-up', 'doppler']

export default function Book() {
  const { t, tr, lang } = useI18n()
  const { services, settings } = usePublicData()
  const { db, upsert } = useStore()
  const [params] = useSearchParams()
  const [step, setStep] = useState(0)
  const [serviceId, setServiceId] = useState(params.get('service') ?? '')
  const [type, setType] = useState<AppointmentType>('consultation')
  const days = useMemo(() => upcomingDays(settings, 14), [settings])
  const [day, setDay] = useState<Date>(days[0])
  const [time, setTime] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' })
  const [done, setDone] = useState<string | null>(null)
  const panel = useRef<HTMLDivElement>(null)

  const slots = useMemo(() => (day ? freeSlots(day, settings, db.appointments) : []), [day, settings, db.appointments])
  const service = services.find((s) => s.id === serviceId)

  useGSAP(() => {
    gsap.fromTo(panel.current, { opacity: 0, y: 24, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'expo.out' })
  }, { dependencies: [step, done], scope: panel })

  const canNext = step === 0 ? !!serviceId : step === 1 ? !!time : form.name.trim().length > 2 && form.phone.replace(/\D/g, '').length >= 8

  function submit() {
    const id = uid('ap')
    // link to an existing patient record by phone
    const digits = form.phone.replace(/\D/g, '')
    const patient = db.patients.find((p) => p.phone.replace(/\D/g, '') === digits)
    upsert('appointments', {
      id,
      patientId: patient?.id,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      serviceId,
      type,
      date: iso(day),
      time,
      status: 'pending',
      source: 'website',
      notes: form.notes.trim() || undefined,
      createdAt: new Date().toISOString(),
    })
    setDone(id.slice(-6).toUpperCase())
  }

  if (!settings.bookingOpen) {
    return (
      <section className="grid min-h-[80vh] place-items-center pt-28 text-center">
        <div className="container-x max-w-xl">
          <p className="text-2xl font-semibold text-navy">{t('book.closed')}</p>
          <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="btn-primary mt-8">
            <Phone size={16} /> <span dir="ltr">{settings.phone}</span>
          </a>
        </div>
      </section>
    )
  }

  const steps: DictKey[] = ['book.step1', 'book.step2', 'book.step3']

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-24 sm:pt-40">
      <div className="pattern-wave-light pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <div className="container-x relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal distance={16}>
            <p className="label">{t('nav.book')}</p>
          </Reveal>
          <MaskHeading as="h1" lines={[t('book.title')]} className="display mt-5 text-[clamp(2.4rem,5vw,4rem)]" />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-ink/70">{t('book.sub')}</p>
            <FineRule className="mt-8 w-40 text-navy" />
          </Reveal>

          {/* stepper */}
          {!done && (
            <ol className="mt-10 space-y-2">
              {steps.map((k, i) => (
                <li key={k}>
                  <button
                    disabled={i > step}
                    onClick={() => setStep(i)}
                    className={clsx('flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-start transition', i === step ? 'bg-white shadow-sm' : 'hover:bg-white/60', i > step && 'opacity-50')}
                  >
                    <span className={clsx('grid h-9 w-9 place-items-center rounded-full text-sm font-bold', i < step ? 'bg-navy text-white' : i === step ? 'bg-blue-20 text-navy ring-2 ring-navy' : 'bg-blue-20 text-deep')}>
                      {i < step ? <Check size={16} /> : i + 1}
                    </span>
                    <span className="font-semibold text-navy">{t(k)}</span>
                  </button>
                </li>
              ))}
            </ol>
          )}

          {/* live summary */}
          {(service || time) && !done && (
            <div className="on-navy mt-6 rounded-[24px] bg-navy p-6 text-white">
              <p className="label">{t('book.summary')}</p>
              {service && <p className="mt-4 text-lg font-semibold">{tr(service.title)}</p>}
              <p className="mt-1 text-sm text-white/70">{t(`book.type.${type}` as DictKey)}</p>
              {time && (
                <p className="mt-3 text-sm text-white/90">
                  {formatDate(iso(day), lang, { weekday: 'long', day: 'numeric', month: 'long' })} · <span dir="ltr">{formatTime(time, lang)}</span>
                </p>
              )}
            </div>
          )}
        </div>

        <div ref={panel} className="lg:col-span-8">
          {done ? (
            <div className="card relative overflow-hidden p-10 text-center sm:p-16">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-navy text-white">
                <Check size={36} strokeWidth={2} />
              </div>
              <h2 className="mt-8 text-4xl font-bold tracking-tight text-navy">{t('book.done')}</h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-ink/70">{t('book.doneSub')}</p>
              <p className="mt-8 inline-flex items-center gap-3 rounded-full bg-blue-20 px-5 py-2.5 text-sm text-navy">
                {t('book.ref')} <span className="font-bold tracking-widest" dir="ltr">#{done}</span>
              </p>
              <div className="mt-6 text-sm text-deep">
                {service && tr(service.title)} · {formatDate(iso(day), lang, { weekday: 'long', day: 'numeric', month: 'long' })} · <span dir="ltr">{formatTime(time, lang)}</span>
              </div>
              <PulseLine className="mt-10 h-16" />
              <Link to="/" className="btn-outline mt-6">
                {t('misc.goHome')}
              </Link>
            </div>
          ) : (
            <div className="card p-6 sm:p-10">
              {step === 0 && (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setServiceId(s.id)}
                        className={clsx(
                          'flex items-center gap-4 rounded-2xl p-4 text-start ring-1 transition',
                          serviceId === s.id ? 'bg-navy text-white ring-navy' : 'bg-mist text-navy ring-transparent hover:ring-navy/30',
                        )}
                      >
                        <span className={clsx('grid h-12 w-12 shrink-0 place-items-center rounded-xl', serviceId === s.id ? 'bg-white/15' : 'bg-white')}>
                          <ServiceIcon name={s.icon} size={22} />
                        </span>
                        <span>
                          <span className="block font-semibold">{tr(s.title)}</span>
                          <span className={clsx('block text-xs', serviceId === s.id ? 'text-white/70' : 'text-deep')}>{tr(s.duration)}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="label mt-10">{t('book.type')}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {types.map((ty) => (
                      <button key={ty} onClick={() => setType(ty)} className={clsx('btn', type === ty ? 'bg-navy text-white' : 'bg-blue-20 text-navy hover:bg-blue-40')}>
                        {t(`book.type.${ty}` as DictKey)}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="no-scrollbar -mx-2 flex gap-2 overflow-x-auto px-2 pb-2" data-lenis-prevent>
                    {days.map((d) => {
                      const active = iso(d) === iso(day)
                      const free = freeSlots(d, settings, db.appointments).length
                      return (
                        <button
                          key={iso(d)}
                          onClick={() => {
                            setDay(d)
                            setTime('')
                          }}
                          className={clsx('flex w-[76px] shrink-0 flex-col items-center rounded-2xl py-4 transition', active ? 'bg-navy text-white' : 'bg-mist text-navy hover:bg-blue-20', free === 0 && 'opacity-40')}
                        >
                          <span className="text-xs font-medium opacity-70">{d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB', { weekday: 'short' })}</span>
                          <span className="mt-1 text-2xl font-bold">{d.getDate()}</span>
                          <span className="text-[11px] opacity-70">{d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB', { month: 'short' })}</span>
                        </button>
                      )
                    })}
                  </div>
                  <p className="label mt-10">{formatDate(iso(day), lang, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                  {slots.length ? (
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
                      {slots.map((s) => (
                        <button key={s} onClick={() => setTime(s)} className={clsx('h-12 rounded-xl text-sm font-semibold transition', time === s ? 'bg-navy text-white' : 'bg-mist text-navy hover:bg-blue-20')} dir="ltr">
                          {formatTime(s, lang)}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 rounded-2xl bg-blue-20 p-5 text-sm text-navy">{t('book.noSlots')}</p>
                  )}
                </>
              )}

              {step === 2 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="sm:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-navy">{t('form.name')}</span>
                    <input className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" required />
                  </label>
                  <label>
                    <span className="mb-2 block text-sm font-semibold text-navy">{t('form.phone')}</span>
                    <input className="field" dir="ltr" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" required />
                  </label>
                  <label>
                    <span className="mb-2 block text-sm font-semibold text-navy">{t('form.email')}</span>
                    <input className="field" dir="ltr" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-navy">{t('form.notes')}</span>
                    <textarea className="field min-h-28" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                  </label>
                </div>
              )}

              <div className="mt-10 flex items-center justify-between border-t border-navy/10 pt-6">
                <button onClick={() => setStep((s) => Math.max(0, s - 1))} className={clsx('btn text-navy hover:bg-blue-20', step === 0 && 'invisible')}>
                  <ArrowLeft size={16} className="rtl:-scale-x-100" /> {t('book.back')}
                </button>
                {step < 2 ? (
                  <button onClick={() => setStep((s) => s + 1)} disabled={!canNext} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40">
                    {t('book.next')} <ArrowRight size={16} className="rtl:-scale-x-100" />
                  </button>
                ) : (
                  <button onClick={submit} disabled={!canNext} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40">
                    {t('book.confirm')} <Check size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
