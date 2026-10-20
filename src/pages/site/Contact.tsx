import { useState, type FormEvent } from 'react'
import clsx from 'clsx'
import { Check, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PageHero, Reveal } from '@/components/site/ui'
import { uid, usePublicData, useStore } from '@/data/store'
import { dayFromIndex, dayNames, formatTime, useI18n } from '@/lib/i18n'
import { FaqSection } from './home/Sections'

export default function Contact() {
  const { t, tr, lang } = useI18n()
  const { settings } = usePublicData()
  const { upsert } = useStore()
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const todayKey = dayFromIndex[new Date().getDay()]

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) return
    upsert('inquiries', {
      id: uid('iq'),
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      message: form.message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    })
    setSent(true)
    setForm({ name: '', phone: '', email: '', message: '' })
  }

  const channels = [
    { Icon: Phone, label: t('cta.call'), value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, '')}`, ltr: true },
    { Icon: MessageCircle, label: t('cta.whatsapp'), value: `+${settings.whatsapp}`, href: `https://wa.me/${settings.whatsapp}`, ltr: true },
    { Icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}`, ltr: true },
    { Icon: MapPin, label: t('contact.label'), value: tr(settings.address), href: `https://maps.google.com/?q=${encodeURIComponent(settings.mapQuery)}`, ltr: false },
  ]

  return (
    <>
      <PageHero label={t('contact.label')} title={t('contact.title')} />
      <section className="pb-24">
        <div className="container-x grid gap-4 lg:grid-cols-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {channels.map(({ Icon, label, value, href, ltr }, i) => (
              <Reveal key={label} delay={i * 0.06}>
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group card flex h-full flex-col p-7 transition hover:-translate-y-1">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-20 text-navy transition group-hover:bg-navy group-hover:text-white">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <span className="label mt-10">{label}</span>
                  <span className="mt-2 text-lg font-semibold break-words text-navy" dir={ltr ? 'ltr' : undefined}>
                    {value}
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal className="sm:col-span-2">
              <div className="overflow-hidden rounded-[28px] bg-white">
                <iframe
                  title="map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(settings.mapQuery)}&output=embed`}
                  className="h-80 w-full grayscale-[0.6]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          <div className="space-y-4 lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="on-navy rounded-[28px] bg-navy p-8 text-white">
                <p className="label">{t('contact.hours')}</p>
                <ul className="mt-6 divide-y divide-white/10">
                  {settings.hours.map((h) => (
                    <li key={h.day} className={clsx('flex items-center justify-between py-3 text-sm', h.day === todayKey && 'font-semibold')}>
                      <span className="flex items-center gap-2">
                        {h.day === todayKey && <span className="h-2 w-2 animate-pulse-dot rounded-full bg-vessel" />}
                        {tr(dayNames[h.day])}
                      </span>
                      <span className={h.closed ? 'text-white/40' : 'text-white/80'} dir="ltr">
                        {h.closed ? t('contact.closed') : h.byAppointment ? t('contact.byAppt') : `${formatTime(h.open, lang)} – ${formatTime(h.close, lang)}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <form onSubmit={submit} className="card space-y-4 p-8">
                <p className="text-xl font-semibold text-navy">{t('contact.formTitle')}</p>
                {sent && (
                  <p className="flex items-center gap-2 rounded-2xl bg-blue-20 p-4 text-sm text-navy">
                    <Check size={16} /> {t('contact.sent')}
                  </p>
                )}
                <input className="field" placeholder={t('form.name')} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input className="field" placeholder={t('form.phone')} dir="ltr" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                <input className="field" placeholder={t('form.email')} dir="ltr" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <textarea className="field min-h-32" placeholder={t('form.message')} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                <button className="btn-primary w-full">{t('contact.send')}</button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
      <FaqSection />
    </>
  )
}
