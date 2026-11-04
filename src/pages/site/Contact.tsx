import { useState, type FormEvent } from 'react'
import clsx from 'clsx'
import { ArrowUpRight, CalendarDays, Check, Mail, MapPin, Phone } from 'lucide-react'
import { PageHero, Reveal } from '@/components/site/ui'
import { usePublicData } from '@/data/store'
import { dayFromIndex, dayNames, useI18n } from '@/lib/i18n'
import { FaqSection } from './home/Sections'
import { BookingSection, WhatsAppIcon } from '@/components/site/BookingRequest'
import { WEEK, allPhones, branchDays, branchFrom, branchPhones, sendWhatsApp, telHref, waHref } from '@/lib/contact'
import { trackLead } from '@/lib/analytics'

import { Seo } from '@/components/seo/Seo'
import { breadcrumbs, practice } from '@/lib/schema'

export default function Contact() {
  const { t, tr, lang } = useI18n()
  const { settings, services } = usePublicData()
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
    trackLead('contact_form')
    setSent(true)
    setForm({ name: '', phone: '', email: '', message: '' })
  }

  return (
    <>
      <Seo title={t('seo.contact.title')} description={t('seo.contact.desc')} path="/contact" jsonLd={[practice(settings, services, lang), breadcrumbs([{ name: t('nav.home'), path: '/' }, { name: t('nav.contact'), path: '/contact' }], lang)]} />
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
                  <p className="mt-3 flex w-fit items-start gap-2 rounded-2xl bg-blue-20 px-3 py-2 text-sm font-semibold text-navy">
                    <CalendarDays size={15} strokeWidth={1.8} className="mt-0.5 shrink-0" />
                    <span>
                      {branchDays(b, lang)} · {t('contact.from')} <span className="whitespace-nowrap">{branchFrom(b, lang)}</span>
                    </span>
                  </p>
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
              ...allPhones(settings).map((ph) => ({ Icon: Phone, label: t('cta.call'), value: ph, href: telHref(ph) })),
              { Icon: WhatsAppIcon, label: t('cta.whatsapp'), value: `+${settings.whatsapp}`, href: waHref(settings.whatsapp) },
              { Icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
            ].map(({ Icon, label, value, href }, i, all) => (
              <Reveal key={value} delay={0.1 + i * 0.06} className={all.length % 2 === 1 && i === all.length - 1 ? 'sm:col-span-2' : undefined}>
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
                <p className="label">{t('contact.schedule')}</p>
                <ul className="mt-6 divide-y divide-white/10">
                  {WEEK.map((day) => {
                    const here = settings.branches.filter((b) => b.days.includes(day)).sort((a, b) => a.from.localeCompare(b.from))
                    return (
                      <li key={day} className={clsx('flex items-start justify-between gap-4 py-3 text-sm', day === todayKey && 'font-semibold')}>
                        <span className="flex shrink-0 items-center gap-2">
                          {day === todayKey && <span className="h-2 w-2 animate-pulse-dot rounded-full bg-vessel" />}
                          {tr(dayNames[day])}
                        </span>
                        {here.length ? (
                          <span className="space-y-1 text-end text-white/80">
                            {here.map((b) => (
                              <span key={b.id} className="block">
                                {tr(b.name)} · <span dir="ltr">{branchFrom(b, lang)}</span>
                              </span>
                            ))}
                          </span>
                        ) : (
                          <span className="text-white/40">{t('contact.closed')}</span>
                        )}
                      </li>
                    )
                  })}
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
