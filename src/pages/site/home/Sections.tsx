import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { ArrowUpRight, Award, CalendarCheck, HeartPulse, ScanLine, Stethoscope } from 'lucide-react'
import ScrollReveal from '@/components/reactbits/ScrollReveal'
import CountUp from '@/components/reactbits/CountUp'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import ShinyText from '@/components/reactbits/ShinyText'
import Magnet from '@/components/reactbits/Magnet'
import { FineRule, PulseLine, VesselTree } from '@/components/brand/Brand'
import { ServiceIcon } from '@/components/brand/Icons'
import { Accordion, Marquee, Reveal, ReviewCard, SectionHeading, ServiceCard } from '@/components/site/ui'
import { usePublicData } from '@/data/store'
import { formatDate, useI18n, type DictKey } from '@/lib/i18n'
import { gsap, useReducedMotion } from '@/lib/smooth'

/* ─────────── Conditions ticker ─────────── */
export function ConditionsTicker() {
  const { tr } = useI18n()
  const { services } = usePublicData()
  return (
    <section className="border-b border-navy/5 bg-white py-7" aria-hidden>
      <Marquee duration={50} gap="3rem">
        {services.map((s) => (
          <span key={s.id} className="flex shrink-0 items-center gap-4 text-xl font-semibold whitespace-nowrap text-navy sm:text-2xl">
            <ServiceIcon name={s.icon} size={26} className="text-navy" />
            {tr(s.title)}
            <span className="ms-8 h-1.5 w-1.5 rounded-full bg-vessel" />
          </span>
        ))}
      </Marquee>
    </section>
  )
}

/* ─────────── About + stats bento ─────────── */
export function AboutIntro() {
  const { t, tr, lang } = useI18n()
  const { settings } = usePublicData()
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <p className="label flex items-center gap-3">
          <span className="h-px w-8 bg-deep/50" />
          {t('about.label')}
        </p>
        <ScrollReveal
          key={lang}
          baseOpacity={0.12}
          baseRotation={0}
          blurStrength={6}
          splitBy="words"
          containerClassName="max-w-5xl !mt-6"
          textClassName="!text-[clamp(1.8rem,4.2vw,3.6rem)] !leading-[1.18] !font-semibold tracking-tight text-navy"
        >
          {t('about.statement')}
        </ScrollReveal>

        <div className="mt-16 grid gap-4 md:grid-cols-6 lg:grid-cols-12">
          <Reveal className="md:col-span-3 lg:col-span-4 lg:row-span-2">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px] bg-mist">
              <img src="/brand/portrait-crop.jpg" alt={tr(settings.doctor.name)} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/85 p-5 backdrop-blur-xl">
                <p className="text-lg font-bold text-navy">{tr(settings.doctor.name)}</p>
                <p className="text-sm text-deep">{tr(settings.doctor.title)}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-3 lg:col-span-8">
            <div className="card flex h-full flex-col justify-between gap-8 p-8 sm:p-10">
              <p className="max-w-2xl text-lg leading-relaxed text-ink/75">{tr(settings.doctor.bio)}</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-20 px-4 py-2 text-sm font-semibold text-navy">
                  <Award size={16} strokeWidth={1.8} /> {tr(settings.doctor.credentials)}
                </span>
                <Link to="/about" className="btn-outline">
                  {t('cta.learn')} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
                </Link>
              </div>
            </div>
          </Reveal>

          {settings.stats.map((s, i) => (
            <Reveal key={s.id} delay={0.1 + i * 0.06} className="md:col-span-3 lg:col-span-2">
              <div className={clsx('flex h-full flex-col justify-between rounded-[28px] p-6', i === 0 ? 'on-navy bg-navy text-white' : 'bg-white')}>
                <p className={clsx('text-[clamp(2.4rem,4vw,3.2rem)] leading-none font-bold tracking-tight tabular-nums', i === 0 ? 'text-white' : 'text-navy')} dir="ltr">
                  <CountUp to={s.value} duration={2.2} suffix={s.suffix} />
                </p>
                <p className={clsx('mt-6 text-sm leading-snug', i === 0 ? 'text-white/70' : 'text-deep')}>{tr(s.label)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Brand values — spotlight cards ─────────── */
export function Values() {
  const { t } = useI18n()
  const items: { k: DictKey; d: DictKey; Icon: typeof HeartPulse }[] = [
    { k: 'values.precision', d: 'values.precision.d', Icon: ScanLine },
    { k: 'values.reassurance', d: 'values.reassurance.d', Icon: HeartPulse },
    { k: 'values.evidence', d: 'values.evidence.d', Icon: Stethoscope },
    { k: 'values.continuity', d: 'values.continuity.d', Icon: CalendarCheck },
  ]
  return (
    <section className="pb-24 sm:pb-32">
      <div className="container-x">
        <SectionHeading label={t('values.label')} title={t('values.title')} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ k, d, Icon }, i) => (
            <Reveal key={k} delay={i * 0.08}>
              <SpotlightCard theme="light" spotlightColor="rgba(141, 175, 188, 0.35)" className="h-full !rounded-[28px] !p-8">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-vessel tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <Icon size={24} strokeWidth={1.8} className="text-navy" />
                </div>
                <h3 className="mt-12 text-2xl font-semibold text-navy">{t(k)}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{t(d)}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Services — pinned horizontal scroll on desktop ─────────── */
export function ServicesRail() {
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const { t, lang } = useI18n()
  const { services } = usePublicData()
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const el = track.current!
        const distance = () => el.scrollWidth - el.clientWidth
        const sign = lang === 'ar' ? 1 : -1
        gsap.to(el, {
          x: () => sign * distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
        gsap.to('.rail-progress', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: () => `+=${distance()}`, scrub: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref, dependencies: [lang, services.length], revertOnUpdate: true },
  )

  return (
    <section ref={ref} className="on-navy relative overflow-hidden bg-navy py-24 text-white lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
      <div className="pattern-tree-navy pointer-events-none absolute inset-0 opacity-70" />
      <div className="container-x relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading tone="dark" label={t('services.label')} title={t('services.title')} sub={t('services.sub')} />
        <Link to="/services" className="btn-ghost-light shrink-0">
          {t('cta.allServices')} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
        </Link>
      </div>

      <div ref={track} className="no-scrollbar relative mt-14 flex gap-4 overflow-x-auto px-5 sm:px-8 lg:mt-16 lg:overflow-visible lg:px-[max(3rem,calc((100vw-1320px)/2+3rem))]">
        {services.map((s, i) => (
          <div key={s.id} className="w-[82vw] shrink-0 sm:w-[380px] lg:w-[400px]">
            <ServiceCard service={s} index={i} tone={i % 3 === 0 ? 'light' : 'dark'} className="min-h-[380px]" />
          </div>
        ))}
      </div>

      <div className="container-x relative mt-12 hidden lg:block">
        <div className="h-px w-full bg-white/15">
          <div className="rail-progress h-px origin-left scale-x-0 bg-white rtl:origin-right" />
        </div>
      </div>
    </section>
  )
}

/* ─────────── Patient journey — the pulse line never breaks ─────────── */
export function Journey() {
  const ref = useRef<HTMLElement>(null)
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const steps: { k: DictKey; d: DictKey; Icon: typeof HeartPulse }[] = [
    { k: 'journey.1', d: 'journey.1.d', Icon: Stethoscope },
    { k: 'journey.2', d: 'journey.2.d', Icon: ScanLine },
    { k: 'journey.3', d: 'journey.3.d', Icon: HeartPulse },
    { k: 'journey.4', d: 'journey.4.d', Icon: CalendarCheck },
  ]

  useGSAP(
    () => {
      if (reduced) return
      gsap.fromTo(
        '.jr-fill',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.jr-list', start: 'top 60%', end: 'bottom 60%', scrub: 0.5 } },
      )
      gsap.utils.toArray<HTMLElement>('.jr-step').forEach((el) => {
        gsap.fromTo(
          el.querySelector('.jr-dot'),
          { backgroundColor: '#E3ECEF', color: '#003478', scale: 0.85 },
          {
            backgroundColor: '#003478',
            color: '#ffffff',
            scale: 1,
            duration: 0.4,
            scrollTrigger: { trigger: el, start: 'top 60%', toggleActions: 'play none none reverse' },
          },
        )
        gsap.from(el.querySelector('.jr-body'), { opacity: 0.25, y: 24, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' } })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} id="journey" className="py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading label={t('journey.label')} title={t('journey.title')} />
            <Reveal delay={0.2}>
              <Link to="/book" className="btn-primary mt-10">
                {t('cta.book')} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
              </Link>
            </Reveal>
          </div>
        </div>
        <ol className="jr-list relative lg:col-span-6 lg:col-start-7">
          <span className="absolute start-7 top-2 bottom-2 w-px bg-blue-40" aria-hidden />
          <span className="jr-fill absolute start-7 top-2 bottom-2 w-px origin-top bg-navy" aria-hidden />
          {steps.map(({ k, d, Icon }, i) => (
            <li key={k} className="jr-step relative flex gap-7 pb-16 last:pb-0">
              <span className="jr-dot relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-blue-20 text-navy ring-8 ring-mist">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <div className="jr-body pt-1">
                <p className="label">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-navy">{t(k)}</h3>
                <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink/65">{t(d)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ─────────── The clinic — clip reveal + parallax ─────────── */
export function Clinic() {
  const ref = useRef<HTMLElement>(null)
  const { t } = useI18n()
  const reduced = useReducedMotion()
  const images = [
    { src: '/brand/consultation-room.jpg', k: 'clinic.room' as DictKey, cls: 'lg:col-span-7 aspect-[4/3]' },
    { src: '/brand/waiting-area.jpg', k: 'clinic.waiting' as DictKey, cls: 'lg:col-span-5 aspect-[4/5] lg:mt-24' },
    { src: '/brand/credentials-wall.jpg', k: 'clinic.wall' as DictKey, cls: 'lg:col-span-6 lg:col-start-4 aspect-[4/3]' },
  ]

  useGSAP(
    () => {
      if (reduced) return
      gsap.utils.toArray<HTMLElement>('.cl-frame').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(18% 10% 18% 10% round 32px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: 0.6 } })
        gsap.fromTo(el.querySelector('img'), { yPercent: -8, scale: 1.18 }, { yPercent: 8, scale: 1.05, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-24 sm:py-32">
      <VesselTree className="pointer-events-none absolute -end-24 -top-10 h-[620px] opacity-25" color="#C9DAE0" strokeWidth={14} />
      <div className="container-x relative">
        <SectionHeading label={t('clinic.label')} title={t('clinic.title')} />
        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {images.map((im) => (
            <figure key={im.src} className={clsx('relative', im.cls)}>
              <div className="cl-frame relative h-full w-full overflow-hidden rounded-[28px]">
                <img src={im.src} alt={t(im.k)} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              </div>
              <figcaption className="absolute start-4 bottom-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-navy backdrop-blur">{t(im.k)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── Reviews — twin marquee ─────────── */
export function Reviews() {
  const { t } = useI18n()
  const { reviews } = usePublicData()
  if (!reviews.length) return null
  const half = Math.ceil(reviews.length / 2)
  const rowA = reviews.slice(0, half)
  const rowB = reviews.length > 1 ? reviews.slice(half) : reviews
  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading align="center" label={t('reviews.label')} title={t('reviews.title')} />
      </div>
      <div className="mt-16 space-y-5">
        <Marquee duration={60}>
          {rowA.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </Marquee>
        <Marquee duration={70} reverse>
          {rowB.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}

/* ─────────── Health tips ─────────── */
export function TipsPreview() {
  const { t, tr, lang } = useI18n()
  const { tips } = usePublicData()
  return (
    <section className="pb-24 sm:pb-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading label={t('tips.label')} title={t('tips.title')} />
          <Link to="/guide" className="btn-outline shrink-0">
            {t('cta.allTips')} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
          </Link>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {tips.slice(0, 3).map((tip, i) => (
            <Reveal key={tip.id} delay={i * 0.08}>
              <Link to={`/guide/${tip.slug}`} className="group card flex h-full flex-col p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,52,120,0.35)]">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-blue-20 px-3 py-1.5 font-semibold text-navy">{tr(tip.category)}</span>
                  <span className="text-deep">
                    {tip.readMins} {t('tips.min')}
                  </span>
                </div>
                <h3 className="mt-10 text-2xl leading-tight font-semibold tracking-tight text-navy">{tr(tip.title)}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/65">{tr(tip.excerpt)}</p>
                <div className="mt-auto flex items-center justify-between pt-10">
                  <span className="text-xs text-deep">{formatDate(tip.date, lang)}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-white transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={16} className="rtl:-scale-x-100" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── FAQ ─────────── */
export function FaqSection() {
  const { t, tr } = useI18n()
  const { faqs } = usePublicData()
  return (
    <section className="pb-24 sm:pb-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading label={t('faq.label')} title={t('faq.title')} />
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <Accordion items={faqs.map((f) => ({ id: f.id, q: tr(f.q), a: tr(f.a) }))} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─────────── Closing CTA ─────────── */
export function CtaBand() {
  const { t, lang } = useI18n()
  const { settings } = usePublicData()
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="on-navy relative isolate overflow-hidden rounded-[36px] bg-navy-shadow px-6 py-24 text-center text-white sm:py-32">
        <VesselTree className="absolute -bottom-24 left-1/2 -z-10 h-[560px] -translate-x-1/2 opacity-30" color="#8DAFBC" strokeWidth={8} />
        <PulseLine className="absolute inset-x-0 top-1/2 -z-10 h-28 -translate-y-1/2 opacity-30" strokeWidth={1.4} pulseAt={0.5} />
        <p className="label">{t('hero.eyebrow')}</p>
        <h2 className="mx-auto mt-6 max-w-4xl text-[clamp(2.4rem,6vw,5.4rem)] leading-[1] font-bold tracking-tight">
          <ShinyText key={lang} text={t('hero.title1') + ' ' + t('hero.title2')} color="#ffffff" shineColor="#8DAFBC" speed={4} />
        </h2>
        <FineRule className="mx-auto mt-8 w-48 text-white/70" />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Magnet padding={60} magnetStrength={3}>
            <Link to="/book" className="btn h-14 bg-white px-8 text-base text-navy hover:bg-mist">
              {t('cta.book')} <ArrowUpRight size={18} className="rtl:-scale-x-100" />
            </Link>
          </Magnet>
          <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="btn-ghost-light h-14 px-7 text-base">
            {t('cta.whatsapp')}
          </a>
        </div>
      </div>
    </section>
  )
}
