import { Link } from 'react-router-dom'
import type { SVGProps } from 'react'
import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import { PulseLine, Wordmark } from '@/components/brand/Brand'
import { usePublicData } from '@/data/store'
import { dayNames, formatTime, useI18n } from '@/lib/i18n'

export function Footer() {
  const { t, tr, lang } = useI18n()
  const { settings, services } = usePublicData()
  const year = new Date().getFullYear()

  return (
    <footer className="on-navy relative overflow-hidden bg-navy text-white">
      <PulseLine className="h-20 opacity-60" color="#8DAFBC" strokeWidth={1.6} pulseAt={lang === 'ar' ? 0.28 : 0.72} />

      <div className="container-x relative grid gap-12 pt-10 pb-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Wordmark tone="white" className="w-full max-w-[380px]" />
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/70">{tr(settings.doctor.credentials)}</p>
          <div className="mt-6 flex gap-2">
            {[
              { href: settings.social.instagram, Icon: Instagram, label: 'Instagram' },
              { href: settings.social.facebook, Icon: Facebook, label: 'Facebook' },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/20 transition hover:bg-white hover:text-navy">
                <Icon width={18} height={18} />
              </a>
            ))}
            <a href={settings.social.google} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-white/20 transition hover:bg-white hover:text-navy">
              Google <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
          <div>
            <p className="label mb-5">{t('nav.services')}</p>
            <ul className="space-y-3 text-sm text-white/80">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.slug}`} className="transition hover:text-white">
                    {tr(s.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label mb-5">{t('contact.hours')}</p>
            <ul className="space-y-2.5 text-sm text-white/80">
              {settings.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-3">
                  <span>{tr(dayNames[h.day])}</span>
                  <span className="text-white/60" dir="ltr">
                    {h.closed ? t('contact.closed') : h.byAppointment ? t('contact.byAppt') : `${formatTime(h.open, lang)} – ${formatTime(h.close, lang)}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label mb-5">{t('nav.contact')}</p>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex gap-3">
                <Phone size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-vessel" />
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} dir="ltr" className="font-semibold text-white">
                  {settings.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-vessel" />
                <span>{tr(settings.address)}</span>
              </li>
            </ul>
            <Link to="/book" className="btn mt-7 bg-white text-navy hover:bg-mist">
              {t('cta.book')}
            </Link>
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl">{t('footer.disclaimer')}</p>
        <div className="flex items-center gap-5">
          <span>
            © {year} {tr(settings.doctor.name)}. {t('footer.rights')}
          </span>
          <Link to="/dashboard" className="underline-offset-4 hover:text-white hover:underline">
            {t('footer.dashboard')}
          </Link>
        </div>
      </div>
    </footer>
  )
}

// lucide dropped brand marks, so these two are drawn in the brand icon style (1.8 stroke, round)
function Instagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  )
}

function Facebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15V3Z" />
    </svg>
  )
}
