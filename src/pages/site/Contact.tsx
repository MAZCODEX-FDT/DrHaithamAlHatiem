import { useState, type FormEvent } from 'react'
import clsx from 'clsx'
import { ArrowUpRight, Check, Mail, MapPin, Phone } from 'lucide-react'
import { PageHero, Reveal } from '@/components/site/ui'
import { usePublicData } from '@/data/store'
import { dayFromIndex, dayNames, formatTime, useI18n } from '@/lib/i18n'
import { FaqSection } from './home/Sections'
import { BookingSection, WhatsAppIcon } from '@/components/site/BookingRequest'
import { branchPhones, sendWhatsApp, telHref, waHref } from '@/lib/contact'

export default function Contact() {
  const { t, tr, lang } = useI18n()
  const { settings } = usePublicData()
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const todayKey = dayFromIndex[new Date().getDay()]

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) return
    // nothing is stored: the message opens in WhatsApp, addressed to the clinic
    sendWhatsApp(
      settings.whatsapp,
      [
        `${t('contact.msgTitle')} — ${tr(settings.doctor.name)}`,
        '',
        `${t('req.msgName')}: ${form.name.trim()}`,
        `${t('req.msgPhone')}: ${form.phone.trim()}`,
        ...(form.email.trim() ? [`Email: ${form.email.trim()}`] : []),
        '',
        form.message.trim(),
      ].join('\n'),
    )
    setSent(true)
    setForm({ name: '', phone: '', email: '', message: '' })
  }

  return (
    <>
      <PageHero label={t('contact.label')} title={t('contact.title')} />
      <section className="pb-24">
        <div className="container-x grid gap-4 lg:grid-cols-12">
          <div className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-7">
            {settings.branches.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.06} className={settings.branches.length % 2 === 1 && i === settings.branches.length - 1 ? 'sm:col-span-2' : undefined}>
                <div className="card flex h-full flex-col p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-20 text-navy">
                    <MapPin size={22} strokeWidth={1.8} />
                  </span>
                  <p className="label mt-8">{settings.branches.length > 1 ? tr(b.name) : t('contact.label')}</p>
                  <p className="mt-2 text-lg font-semibold text-navy">{tr(b.address)}</p>
                  <div className="mt-5 space-y-2">
                    {branchPhones(b).map((ph) => (
                      <a key={ph} href={telHref(ph)} className="flex items-center gap-2 font-semibold text-navy hover:underline">
                        <Phone size={16} strokeWidth={1.8} className="text-deep" /> <span dir="ltr">{ph}</span>
                      </a>
                    ))}
                  </div>
                  {b.mapUrl && (
                    <div className="mt-auto pt-6">
                      <a href={b.mapUrl} target="_blank" rel="noreferrer" className="btn-outline">
                        {t('contact.map')} <ArrowUpRight size={15} className="rtl:-scale-x-100" />
                      </a>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
            {[
              { Icon: WhatsAppIcon, label: t('cta.whatsapp'), value: `+${settings.whatsapp}`, href: waHref(settings.whatsapp) },
              { Icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
            ].map(({ Icon, label, value, href }, i) => (
              <Reveal key={label} delay={0.1 + i * 0.06}>
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group card flex h-full flex-col p-7 transition hover:-translate-y-1">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-20 text-navy transition group-hover:bg-navy group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <span className="label mt-8">{label}</span>
                  <span className="mt-2 text-lg font-semibold break-words text-navy" dir="ltr">
                    {value}
                  </span>
                </a>
              </Reveal>
            ))}
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
      <BookingSection className="pt-0! sm:pt-0!" />
      <FaqSection />
    </>
  )
}
