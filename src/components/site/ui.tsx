import { useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { ArrowUpRight, Plus, Star } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import { ServiceIcon } from '@/components/brand/Icons'
import { FineRule } from '@/components/brand/Brand'
import { gsap, useReducedMotion } from '@/lib/smooth'
import { useI18n } from '@/lib/i18n'
import type { Review, Service } from '@/data/types'

/** Scroll reveal wrapper (React Bits AnimatedContent) with brand defaults */
export function Reveal({ children, className, delay = 0, distance = 40, blur = 8 }: { children: ReactNode; className?: string; delay?: number; distance?: number; blur?: number }) {
  return (
    <AnimatedContent className={className} distance={distance} duration={1.1} ease="expo.out" blur={blur} delay={delay} threshold={0.15}>
      {children}
    </AnimatedContent>
  )
}

/**
 * Headline that rises line-by-line from a mask. Works for Arabic too since it
 * animates whole lines (never splits letters — that breaks Arabic joining).
 */
export function MaskHeading({ lines, className, as: Tag = 'h2' }: { lines: string[]; className?: string; as?: 'h1' | 'h2' | 'h3' }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()
  useGSAP(
    () => {
      if (reduced) return
      gsap.from('.mh-line', {
        yPercent: 105,
        rotate: 2,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.09,
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    },
    { scope: ref, dependencies: [lines.join('|')], revertOnUpdate: true },
  )
  return (
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <span className="mh-line block origin-bottom-left">{l}</span>
        </span>
      ))}
    </Tag>
  )
}

export function SectionHeading({ label, title, sub, align = 'start', tone = 'light', className }: { label: string; title: string; sub?: string; align?: 'start' | 'center'; tone?: 'light' | 'dark'; className?: string }) {
  const lines = title.split('\n')
  return (
    <div className={clsx(align === 'center' && 'mx-auto text-center', 'max-w-3xl', className)}>
      <Reveal distance={16} blur={4}>
        <p className={clsx('label flex items-center gap-3', align === 'center' && 'justify-center')}>
          <span className={clsx('h-px w-8', tone === 'dark' ? 'bg-vessel' : 'bg-deep/50')} />
          {label}
        </p>
      </Reveal>
      <MaskHeading lines={lines} className={clsx('display mt-5 text-[clamp(2.2rem,5vw,4.2rem)]', tone === 'dark' && 'text-white')} />
      {sub && (
        <Reveal delay={0.15} distance={20}>
          <p className={clsx('mt-6 max-w-xl text-base leading-relaxed sm:text-lg', align === 'center' && 'mx-auto', tone === 'dark' ? 'text-white/70' : 'text-ink/70')}>{sub}</p>
        </Reveal>
      )}
    </div>
  )
}

/** Infinite marquee (21st.dev-style), pauses on hover, direction aware */
export function Marquee({ children, reverse = false, duration = 40, className, gap = '1.5rem' }: { children: ReactNode; reverse?: boolean; duration?: number; className?: string; gap?: string }) {
  return (
    <div className={clsx('group mask-fade-x flex overflow-hidden', className)} style={{ ['--marquee-duration' as string]: `${duration}s`, ['--marquee-gap' as string]: gap }} dir="ltr">
      <div className={clsx('flex w-max shrink-0 animate-marquee group-hover:[animation-play-state:paused]', reverse && '[animation-direction:reverse]')} style={{ gap }}>
        {children}
        <div aria-hidden className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export function Accordion({ items }: { items: { id: string; q: string; a: string }[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null)
  return (
    <ul className="divide-y divide-navy/10 border-y border-navy/10">
      {items.map((it) => {
        const isOpen = open === it.id
        return (
          <li key={it.id}>
            <button className="flex w-full items-center justify-between gap-6 py-6 text-start" onClick={() => setOpen(isOpen ? null : it.id)} aria-expanded={isOpen}>
              <span className="text-lg font-semibold text-navy sm:text-xl">{it.q}</span>
              <span className={clsx('grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500', isOpen ? 'rotate-45 bg-navy text-white' : 'bg-blue-20 text-navy')}>
                <Plus size={18} />
              </span>
            </button>
            <div className={clsx('grid transition-all duration-500 ease-[var(--ease-out-expo)]', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-7 leading-relaxed text-ink/70">{it.a}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function ServiceCard({ service, index, className, tone = 'light' }: { service: Service; index: number; className?: string; tone?: 'light' | 'dark' }) {
  const { tr, t } = useI18n()
  const dark = tone === 'dark'
  return (
    <Link
      to={`/services/${service.slug}`}
      className={clsx(
        'group relative flex h-full flex-col overflow-hidden rounded-[28px] p-7 transition-all duration-500 sm:p-8',
        dark ? 'bg-white/[0.06] text-white ring-1 ring-white/10 hover:bg-white/[0.1]' : 'bg-white text-ink hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,52,120,0.35)]',
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className={clsx('grid h-14 w-14 place-items-center rounded-2xl transition-colors duration-500', dark ? 'bg-white/10 text-white' : 'bg-blue-20 text-navy group-hover:bg-navy group-hover:text-white')}>
          <ServiceIcon name={service.icon} size={26} />
        </span>
        <span className={clsx('text-4xl font-bold tabular-nums', dark ? 'text-white/15' : 'text-vessel/70')}>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className={clsx('mt-10 text-2xl font-semibold tracking-tight', dark ? 'text-white' : 'text-navy')}>{tr(service.title)}</h3>
      <p className={clsx('mt-3 text-[15px] leading-relaxed', dark ? 'text-white/65' : 'text-ink/65')}>{tr(service.short)}</p>
      <div className="mt-auto flex items-center justify-between pt-8">
        <span className={clsx('text-xs font-medium', dark ? 'text-vessel' : 'text-deep')}>{tr(service.duration)}</span>
        <span className={clsx('inline-flex items-center gap-1.5 text-sm font-semibold', dark ? 'text-white' : 'text-navy')}>
          {t('cta.learn')}
          <span className={clsx('grid h-9 w-9 place-items-center rounded-full transition-all duration-500 group-hover:rotate-45', dark ? 'bg-white text-navy' : 'bg-navy text-white')}>
            <ArrowUpRight size={16} className="rtl:-scale-x-100" />
          </span>
        </span>
      </div>
    </Link>
  )
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col rounded-[24px] bg-white p-7 ring-1 ring-navy/5 sm:w-[400px]" dir={review.lang === 'ar' ? 'rtl' : 'ltr'} style={review.lang === 'ar' ? { fontFamily: 'var(--font-arabic)' } : undefined}>
      <div className="flex gap-0.5 text-navy" aria-label={`${review.rating} / 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} strokeWidth={1.8} className={i < review.rating ? 'fill-navy' : 'opacity-25'} />
        ))}
      </div>
      <blockquote className="mt-5 text-[15px] leading-relaxed text-ink/80">“{review.text}”</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-20 text-sm font-bold text-navy">{review.name.charAt(0)}</span>
        <span className="text-sm font-semibold text-navy">{review.name}</span>
      </figcaption>
    </figure>
  )
}

export function PageHero({ label, title, sub, children }: { label: string; title: string; sub?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="pattern-wave-light pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-x relative">
        <SectionHeading label={label} title={title} sub={sub} />
        <FineRule className="mt-10 w-48 text-navy" />
        {children}
      </div>
    </section>
  )
}
