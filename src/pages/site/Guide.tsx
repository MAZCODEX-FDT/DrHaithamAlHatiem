import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { FineRule, PulseLine } from '@/components/brand/Brand'
import { MaskHeading, PageHero, Reveal } from '@/components/site/ui'
import { usePublicData } from '@/data/store'
import { formatDate, useI18n } from '@/lib/i18n'
import { CtaBand } from './home/Sections'
import NotFound from './NotFound'

export function GuidePage() {
  const { t, tr, lang } = useI18n()
  const { tips } = usePublicData()
  // categories in order of first appearance, keyed by their English name
  const categories = [...new Map(tips.map((tip) => [tip.category.en, tip.category])).values()]
  const [topic, setTopic] = useState<string | null>(null)
  const shown = topic ? tips.filter((tip) => tip.category.en === topic) : tips
  // the large featured card only leads the unfiltered list
  const lead = topic ? undefined : shown[0]
  const rest = topic ? shown : shown.slice(1)
  return (
    <>
      <PageHero label={t('tips.label')} title={t('tips.title')} />
      <section className="pb-24">
        <div className="container-x space-y-4">
          {categories.length > 1 && (
            <div className="no-scrollbar -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label={t('tips.label')}>
              {[{ key: null, label: t('tips.all') }, ...categories.map((c) => ({ key: c.en, label: tr(c) }))].map(({ key, label }) => (
                <button
                  key={key ?? 'all'}
                  onClick={() => setTopic(key)}
                  aria-pressed={topic === key}
                  className={clsx('h-11 shrink-0 rounded-full px-5 text-sm font-semibold whitespace-nowrap transition', topic === key ? 'bg-navy text-white' : 'bg-white text-navy ring-1 ring-navy/10 hover:bg-blue-20')}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          {lead && (
            <Reveal>
              <Link to={`/guide/${lead.slug}`} className="group on-navy relative grid overflow-hidden rounded-[32px] bg-navy p-8 text-white sm:p-12 lg:grid-cols-2 lg:gap-12">
                <div>
                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">{tr(lead.category)}</span>
                  <h2 className="mt-8 text-[clamp(2rem,4vw,3.4rem)] leading-tight font-bold tracking-tight">{tr(lead.title)}</h2>
                </div>
                <div className="mt-8 flex flex-col justify-between lg:mt-0">
                  <p className="text-lg leading-relaxed text-white/75">{tr(lead.excerpt)}</p>
                  <div className="mt-10 flex items-center justify-between">
                    <span className="text-sm text-white/60">
                      {formatDate(lead.date, lang)} · {lead.readMins} {t('tips.min')}
                    </span>
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-navy transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight size={18} className="rtl:-scale-x-100" />
                    </span>
                  </div>
                </div>
                <PulseLine className="pointer-events-none absolute inset-x-0 bottom-0 h-16 opacity-30" strokeWidth={1.2} pulseAt={0.8} />
              </Link>
            </Reveal>
          )}
          <div className="grid gap-4 md:grid-cols-3">
            {rest.map((tip, i) => (
              <Reveal key={tip.id} delay={(i % 3) * 0.07}>
                <Link to={`/guide/${tip.slug}`} className="group card flex h-full flex-col p-8 transition hover:-translate-y-1">
                  <span className="w-fit rounded-full bg-blue-20 px-3 py-1.5 text-xs font-semibold text-navy">{tr(tip.category)}</span>
                  <h3 className="mt-8 text-2xl leading-tight font-semibold tracking-tight text-navy">{tr(tip.title)}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink/65">{tr(tip.excerpt)}</p>
                  <span className="mt-auto pt-8 text-xs text-deep">
                    {formatDate(tip.date, lang)} · {tip.readMins} {t('tips.min')}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export function TipDetail() {
  const { slug } = useParams()
  const { t, tr, lang } = useI18n()
  const { tips } = usePublicData()
  const tip = tips.find((x) => x.slug === slug)
  if (!tip) return <NotFound />
  return (
    <>
      <article className="pt-36 pb-24 sm:pt-44">
        <div className="container-x max-w-3xl">
          <Link to="/guide" className="inline-flex items-center gap-2 text-sm text-deep transition hover:text-navy">
            <ArrowLeft size={16} className="rtl:-scale-x-100" /> {t('tips.label')}
          </Link>
          <p className="label mt-10">
            {tr(tip.category)} · {tip.readMins} {t('tips.min')}
          </p>
          <MaskHeading as="h1" lines={[tr(tip.title)]} className="display mt-5 text-[clamp(2.4rem,5vw,4rem)] !leading-[1.05]" />
          <p className="mt-6 text-sm text-deep">{formatDate(tip.date, lang)}</p>
          <FineRule className="mt-8 w-40 text-navy" />
          <Reveal>
            <div className="mt-10 space-y-6 text-lg leading-[1.8] text-ink/80">
              <p className="text-xl font-medium text-navy">{tr(tip.excerpt)}</p>
              {tr(tip.body)
                .split('\n')
                .filter(Boolean)
                .map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
            </div>
          </Reveal>
          <div className="mt-14 rounded-[28px] bg-white p-8">
            <p className="text-lg font-semibold text-navy">{t('footer.disclaimer')}</p>
            <Link to="/book" className="btn-primary mt-6">
              {t('cta.bookConsult')}
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
