import { useRef } from 'react'
import clsx from 'clsx'
import { gsap, useReducedMotion } from '@/lib/smooth'
import { useGSAP } from '@gsap/react'
import { withBase } from '@/lib/base'

/**
 * The wordmark is reproduced exactly from the brand master (never re-set in
 * a font): navy on light grounds, white on navy/photo grounds.
 */
export function Wordmark({ tone = 'navy', className }: { tone?: 'navy' | 'white'; className?: string }) {
  return (
    <img
      src={withBase(tone === 'navy' ? '/brand/wordmark-navy.png' : '/brand/wordmark-white.png')}
      alt="Dr. Haitham AlHatiem — Vascular & Endovascular Surgery"
      width={1600}
      height={198}
      className={clsx('h-auto select-none', className)}
      draggable={false}
    />
  )
}

/** Arabic lockup — IBM Plex Sans Arabic, never letter-spaced */
export function ArabicLockup({ tone = 'navy', className }: { tone?: 'navy' | 'white'; className?: string }) {
  const c = tone === 'navy' ? 'text-navy' : 'text-white'
  return (
    <div dir="rtl" className={clsx('flex flex-col items-center', c, className)} style={{ fontFamily: 'var(--font-arabic)' }}>
      <span className="text-[1.6em] leading-none font-bold">د. هيثم الحطيم</span>
      <span className="fine-rule my-[0.35em] w-[70%]" />
      <span className="text-[0.62em] font-medium">استشاري جراحة الأوعية الدموية والقسطرة</span>
    </div>
  )
}

export function FineRule({ className }: { className?: string }) {
  return <span aria-hidden className={clsx('fine-rule block', className)} />
}

/**
 * The pulse line — runs edge to edge, one pulse per layout. Draws itself when
 * scrolled into view (or scrubbed with scroll when `scrub` is set).
 */
export function PulseLine({
  className,
  color = '#8DAFBC',
  strokeWidth = 2,
  scrub = false,
  pulseAt = 0.5,
}: {
  className?: string
  color?: string
  strokeWidth?: number
  scrub?: boolean
  pulseAt?: number
}) {
  const ref = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()
  const x = 1000 * pulseAt
  const d = `M0 60 H${x - 70} C${x - 50} 60 ${x - 45} 18 ${x - 22} 18 S${x + 2} 104 ${x + 26} 104 S${x + 52} 60 ${x + 75} 60 H1000`

  useGSAP(
    () => {
      if (reduced || !ref.current) return
      const path = ref.current.querySelector('path')!
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: scrub ? 'none' : 'power2.inOut',
        duration: scrub ? undefined : 2.2,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          end: scrub ? 'bottom 30%' : undefined,
          scrub: scrub ? 0.6 : false,
        },
      })
    },
    { scope: ref },
  )

  return (
    <svg ref={ref} viewBox="0 0 1000 120" preserveAspectRatio="none" className={clsx('block w-full', className)} aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/** The vessel tree — a large branching form that always bleeds off an edge */
export function VesselTree({ className, color = '#8DAFBC', strokeWidth = 10, animate = true }: { className?: string; color?: string; strokeWidth?: number; animate?: boolean }) {
  const ref = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !animate || !ref.current) return
      const paths = ref.current.querySelectorAll('path')
      paths.forEach((p) => {
        const len = (p as SVGPathElement).getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: 'power3.inOut',
        stagger: { each: 0.18, from: 'end' },
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    },
    { scope: ref },
  )

  return (
    <svg ref={ref} viewBox="0 0 400 520" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" aria-hidden>
      <path d="M200 520V300" />
      <path d="M200 300C200 230 118 210 100 160" />
      <path d="M200 300C200 230 282 210 300 160" />
      <path d="M100 160C86 120 84 60 84 0" />
      <path d="M100 160C118 120 124 60 124 0" />
      <path d="M300 160C282 120 276 60 276 0" />
      <path d="M300 160C314 120 316 60 316 0" />
    </svg>
  )
}
