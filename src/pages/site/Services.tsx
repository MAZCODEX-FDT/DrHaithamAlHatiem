import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check, Clock } from 'lucide-react'
import { ServiceIcon } from '@/components/brand/Icons'
import { FineRule, VesselTree } from '@/components/brand/Brand'
import { MaskHeading, PageHero, Reveal, ServiceCard } from '@/components/site/ui'
import { usePublicData } from '@/data/store'
import { useI18n } from '@/lib/i18n'
import { CtaBand, FaqSection } from './home/Sections'
import NotFound from './NotFound'

export function ServicesPage() {
  const { t } = useI18n()
  const { services } = usePublicData()
  return (
    <>
      <PageHero label={t('services.label')} title={t('services.title')} sub={t('services.sub')} />
      <section className="pb-24">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.07}>
              <ServiceCard service={s} index={i} className="min-h-[360px]" />
            </Reveal>
          ))}
        </div>
      </section>
      <FaqSection />
      <CtaBand />
    </>
  )
}

export function ServiceDetail() {
  const { slug } = useParams()
  const { t, tr } = useI18n()
  const { services } = usePublicData()
  const service = services.find((s) => s.slug === slug)
  if (!service) return <NotFound />
  const others = services.filter((s) => s.id !== service.id).slice(0, 3)

  return (
    <>
      <section className="on-navy relative isolate overflow-hidden bg-navy pt-36 pb-24 text-white sm:pt-44">
        <VesselTree className="absolute -end-20 -bottom-20 -z-10 h-[560px] opacity-20" color="#8DAFBC" strokeWidth={10} />
        <div className="container-x">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
            <ArrowLeft size={16} className="rtl:-scale-x-100" /> {t('cta.allServices')}
          </Link>
          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Reveal distance={16}>
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-white">
                  <ServiceIcon name={service.icon} size={30} />
                </span>
              </Reveal>
              <MaskHeading as="h1" lines={[tr(service.title)]} className="mt-8 text-[clamp(2.8rem,7vw,6rem)] leading-[0.98] font-bold tracking-tight text-white" />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/75">{tr(service.short)}</p>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/15">
                <Clock size={20} strokeWidth={1.8} className="text-vessel" />
                <div>
                  <p className="label">{t('services.duration')}</p>
                  <p className="mt-1 font-semibold">{tr(service.duration)}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-ink/80">
              {tr(service.body)
                .split('\n')
                .filter(Boolean)
                .map((p, i) => (
                  <p key={i} className={i === 0 ? 'text-2xl leading-snug font-medium text-navy' : ''}>
                    {p}
                  </p>
                ))}
            </div>
            <FineRule className="mt-12 w-40 text-navy" />
            <Link to={`/book?service=${service.id}`} className="btn-primary mt-10">
              {t('cta.bookConsult')} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
            </Link>
          </Reveal>
          <div className="space-y-4 lg:col-span-5">
            <Reveal delay={0.08}>
              <div className="card p-8">
                <p className="label">{t('services.symptoms')}</p>
                <ul className="mt-6 space-y-4">
                  {service.symptoms.map((s, i) => (
                    <li key={i} className="flex gap-3 text-[15px] text-ink/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vessel" />
                      {tr(s)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="on-navy rounded-[28px] bg-navy p-8 text-white">
                <p className="label">{t('services.treatments')}</p>
                <ul className="mt-6 space-y-4">
                  {service.treatments.map((s, i) => (
                    <li key={i} className="flex gap-3 text-[15px]">
                      <Check size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-vessel" />
                      {tr(s)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <p className="label">{t('services.other')}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((s) => (
              <ServiceCard key={s.id} service={s} index={services.indexOf(s)} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
