import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, BadgeCheck, Check, Clock } from 'lucide-react'
import { ServiceIcon } from '@/components/brand/Icons'
import { FineRule, VesselTree } from '@/components/brand/Brand'
import { Accordion, MaskHeading, Reveal, SectionHeading, ServiceCard } from '@/components/site/ui'
import { usePublicData } from '@/data/store'
import { formatDate, useI18n } from '@/lib/i18n'
import { CtaBand } from './home/Sections'
import NotFound from './NotFound'
import { BookingSection } from '@/components/site/BookingRequest'
import { Seo } from '@/components/seo/Seo'
import { serviceContent } from '@/data/serviceContent'
import { breadcrumbs, faqPage, REVIEWED, servicePage } from '@/lib/schema'

// A separate chunk: the long-form service content only downloads on service pages
export default function ServiceDetail() {
  const { slug } = useParams()
  const { t, tr, lang } = useI18n()
  const { services } = usePublicData()
  const service = services.find((s) => s.slug === slug)
  if (!service) return <NotFound />
  const others = services.filter((s) => s.id !== service.id).slice(0, 3)
  const more = serviceContent[service.id]
  const description = more ? tr(more.seoDescription) : tr(service.short)

  return (
    <>
      <Seo
        title={more ? tr(more.seoTitle) : tr(service.title)}
        description={description}
        path={`/services/${service.slug}`}
        jsonLd={[
          servicePage(service, lang, description),
          ...(more?.faqs.length ? [faqPage(more.faqs, lang)] : []),
          breadcrumbs([{ name: t('nav.home'), path: '/' }, { name: t('nav.services'), path: '/services' }, { name: tr(service.title), path: `/services/${service.slug}` }], lang),
        ]}
      />
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

      {more && <ServiceInDepth sections={more.sections} faqs={more.faqs} title={tr(service.title)} />}

      <BookingSection serviceId={service.id} className="pt-0! sm:pt-0!" />

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

/** Plain text with paragraphs (blank line) and "- " bullet lines */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\s*\n/).map((block, i) => {
        const lines = block.split('\n').filter(Boolean)
        const bullets = lines.filter((l) => l.trimStart().startsWith('- '))
        if (bullets.length && bullets.length === lines.length)
          return (
            <ul key={i} className="space-y-2.5">
              {bullets.map((l, k) => (
                <li key={k} className="flex gap-3">
                  <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-vessel" />
                  <span>{l.trimStart().slice(2)}</span>
                </li>
              ))}
            </ul>
          )
        return (
          <div key={i} className="space-y-2.5">
            {lines.map((l, k) =>
              l.trimStart().startsWith('- ') ? (
                <p key={k} className="flex gap-3">
                  <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-vessel" />
                  <span>{l.trimStart().slice(2)}</span>
                </p>
              ) : (
                <p key={k}>{l}</p>
              ),
            )}
          </div>
        )
      })}
    </>
  )
}

/** The long-form guide to a condition: contents, six sections and its own FAQ */
function ServiceInDepth({ sections, faqs, title }: { sections: (typeof serviceContent)[string]['sections']; faqs: (typeof serviceContent)[string]['faqs']; title: string }) {
  const { t, tr, lang } = useI18n()
  const { settings } = usePublicData()
  return (
    <>
      <section className="pb-20 sm:pb-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="label">{t('services.guide')}</p>
              <nav aria-label={t('services.guide')} className="mt-5">
                <ol className="space-y-1 border-s border-navy/10">
                  {sections.map((sec, i) => (
                    <li key={sec.id}>
                      <a href={`#${sec.id}`} className="-ms-px flex gap-3 border-s-2 border-transparent py-2 ps-4 text-sm font-medium text-ink/70 transition hover:border-navy hover:text-navy">
                        <span className="text-deep tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                        {tr(sec.title)}
                      </a>
                    </li>
                  ))}
                  {faqs.length > 0 && (
                    <li>
                      <a href="#faq" className="-ms-px flex gap-3 border-s-2 border-transparent py-2 ps-4 text-sm font-medium text-ink/70 transition hover:border-navy hover:text-navy">
                        <span className="text-deep tabular-nums">{String(sections.length + 1).padStart(2, '0')}</span>
                        {t('faq.label')}
                      </a>
                    </li>
                  )}
                </ol>
              </nav>
              <div className="mt-8 flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-navy/[0.06]">
                <BadgeCheck size={22} strokeWidth={1.8} className="mt-0.5 shrink-0 text-navy" />
                <p className="text-sm leading-relaxed text-ink/75">
                  {t('seo.reviewed')} <b className="text-navy">{tr(settings.doctor.name)}</b>, {tr(settings.doctor.title)}
                  <br />
                  <span className="text-xs text-deep">{formatDate(REVIEWED, lang)}</span>
                </p>
              </div>
            </div>
          </aside>
          <div className="space-y-14 lg:col-span-8">
            {sections.map((sec) => (
              <article key={sec.id} id={sec.id} className="scroll-mt-28">
                <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{tr(sec.title)}</h2>
                <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-ink/80">
                  <RichText text={tr(sec.body)} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {faqs.length > 0 && (
        <section id="faq" className="scroll-mt-28 pb-20 sm:pb-28">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading label={t('faq.label')} title={`${title}: ${t('services.faqTitle')}`} />
            </div>
            <div className="lg:col-span-8">
              <Accordion items={faqs.map((f, i) => ({ id: `sfaq-${i}`, q: tr(f.q), a: tr(f.a) }))} />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
