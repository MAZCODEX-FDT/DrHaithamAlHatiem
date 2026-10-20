import clsx from 'clsx'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, Phone } from 'lucide-react'
import BlurText from '@/components/reactbits/BlurText'
import RotatingText from '@/components/reactbits/RotatingText'
import Magnet from '@/components/reactbits/Magnet'
import { FineRule } from '@/components/brand/Brand'
import { usePublicData } from '@/data/store'
import { dayFromIndex, useI18n } from '@/lib/i18n'
import { gsap, useReducedMotion } from '@/lib/smooth'
import { withBase } from '@/lib/base'

// WebGL — the flowing threads read as blood moving through vessels
const Threads = lazy(() => import('@/components/reactbits/Threads'))

function useIsDesktop() {
  const [d, setD] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches)
  useEffect(() => {
    const m = window.matchMedia('(min-width: 768px)')
    const on = () => setD(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return d
}

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { t, tr, lang } = useI18n()
  const heroLeading = lang === 'ar' ? 'leading-[1.2]!' : 'leading-[0.95]!'
  const { services, settings } = usePublicData()
  const reduced = useReducedMotion()
  const desktop = useIsDesktop()

  const today = settings.hours.find((h) => h.day === dayFromIndex[new Date().getDay()])
  const openToday = today && !today.closed

  useGSAP(
    () => {
      if (reduced) return
      // entrance (after preloader)
      if (ready) {
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from('.hero-portrait', { clipPath: 'inset(100% 0 0 0 round 32px)', duration: 1.6 })
          .from('.hero-portrait img', { scale: 1.25, duration: 2 }, '<')
          .from('.hero-fade', { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, '-=1.5')
          .from('.hero-chip', { y: 20, opacity: 0, scale: 0.9, duration: 0.9, stagger: 0.12 }, '-=0.8')
      }
      // scroll: portrait drifts and the content lifts away
      gsap.to('.hero-portrait-inner', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-content', {
        yPercent: -18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: ref, dependencies: [ready] },
  )

  return (
    <section ref={ref} className="on-navy relative isolate min-h-[100svh] overflow-hidden bg-navy text-white">
      {/* background: threads on desktop, static wave pattern on mobile / reduced motion */}
      <div className="absolute inset-0 -z-10">
        {desktop && !reduced ? (
          <Suspense fallback={null}>
            <Threads color="#8DAFBC" accentColor="#C9B3AC" amplitude={1.1} lineCount={36} thickness={0.5} speed={0.35} opacity={0.55} enableMouseInteraction />
          </Suspense>
        ) : (
          <div className="pattern-wave-navy absolute inset-0" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,rgba(0,36,90,0.55)_65%)]" />
      </div>

      <div className="container-x grid min-h-[100svh] items-center gap-10 pt-32 pb-24 lg:grid-cols-12 lg:gap-6 lg:pt-28">
        <div className="hero-content relative z-10 lg:col-span-7">
          <p className="hero-fade label flex items-center gap-3">
            <span className="h-px w-8 bg-vessel" />
            {t('hero.eyebrow')}
          </p>

          <h1 className="sr-only">
            {t('hero.title1')} {t('hero.title2')}
          </h1>
          {/* Arabic glyphs run wider and taller than Latin: a smaller size keeps each line on one row.
              Leading goes on the BlurText <p>s themselves, since the Arabic body-text rule sets p line-height. */}
          <div aria-hidden className={clsx('mt-7 font-bold', lang === 'ar' ? 'text-[clamp(2.4rem,5.4vw,5rem)]' : 'text-[clamp(3rem,8.4vw,7.6rem)] tracking-[-0.035em]')}>
            {ready && (
              <>
                <BlurText key={lang + '1'} text={t('hero.title1')} animateBy="words" delay={120} stepDuration={0.45} trigger="load" className={heroLeading} />
                <BlurText key={lang + '2'} text={t('hero.title2')} animateBy="words" delay={120} stepDuration={0.45} trigger="load" className={clsx(heroLeading, 'text-vessel')} />
              </>
            )}
          </div>

          <FineRule className="hero-fade mt-9 w-56 text-white/80" />

          <p className="hero-fade mt-8 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">{t('hero.sub')}</p>

          <div className="hero-fade mt-10 flex flex-wrap items-center gap-3">
            <Magnet padding={60} magnetStrength={3}>
              <Link to="/book" className="btn h-14 bg-white px-8 text-base text-navy hover:bg-mist">
                {t('cta.bookConsult')}
                <ArrowUpRight size={18} className="rtl:-scale-x-100" />
              </Link>
            </Magnet>
            <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="btn-ghost-light h-14 px-7 text-base">
              <Phone size={17} strokeWidth={1.8} />
              <span dir="ltr">{settings.phone}</span>
            </a>
          </div>

          <div className="hero-fade mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-white/70">
            <span className="text-sm">{t('rot.label')}</span>
            <RotatingText
              key={lang}
              texts={services.slice(0, 6).map((s) => tr(s.title))}
              splitBy="words"
              effect="blur"
              rotationInterval={2600}
              mainClassName="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur"
            />
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div className="hero-portrait relative mx-auto aspect-[880/1100] w-full max-w-[460px] overflow-hidden rounded-[32px] bg-mist">
            <div className="hero-portrait-inner absolute inset-0 -top-[8%]">
              <img src={withBase('/brand/portrait-full.jpg')} alt={tr(settings.doctor.name)} className="h-full w-full object-cover object-top" fetchPriority="high" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/50 to-transparent" />
          </div>

          {/* floating credential chips */}
          <div className="hero-chip absolute -start-2 top-[14%] rounded-2xl bg-white/90 px-4 py-3 text-navy shadow-2xl backdrop-blur-xl sm:-start-8">
            <p className="label !text-deep">FRCS</p>
            <p className="text-sm font-semibold">{lang === 'ar' ? 'الكلية الملكية · بريطانيا' : 'Royal College · UK'}</p>
          </div>
          <div className="hero-chip absolute -end-1 bottom-[16%] flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 text-navy shadow-2xl backdrop-blur-xl sm:-end-6">
            <span className={`relative h-2.5 w-2.5 rounded-full ${openToday ? 'animate-pulse-dot bg-emerald-500' : 'bg-blush'}`} />
            <div>
              <p className="text-sm font-semibold">{openToday ? t('hero.open') : t('hero.closed')}</p>
              {openToday && today && (
                <p className="text-xs text-deep" dir="ltr">
                  {today.byAppointment ? t('contact.byAppt') : `${today.open} – ${today.close}`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-fade pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/50 md:flex">
        <span className="label !text-white/50">{t('hero.scroll')}</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-white" />
        </span>
      </div>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  )
}
