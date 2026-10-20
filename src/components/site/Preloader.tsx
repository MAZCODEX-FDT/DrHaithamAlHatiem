import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useLenis } from 'lenis/react'
import { gsap, useReducedMotion } from '@/lib/smooth'

/**
 * First-visit intro: the pulse line draws across the screen, the wordmark
 * resolves from blur, then the navy curtain lifts into the hero.
 * Shown once per browser session.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const lenis = useLenis()
  const [seen] = useState(() => {
    try {
      return sessionStorage.getItem('dha:intro') === '1'
    } catch {
      return false
    }
  })
  const [gone, setGone] = useState(seen || reduced)

  useGSAP(
    () => {
      if (gone) {
        onDone()
        return
      }
      lenis?.stop()
      const path = ref.current!.querySelector<SVGPathElement>('.pl-path')!
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      gsap
        .timeline({
          onComplete: () => {
            try {
              sessionStorage.setItem('dha:intro', '1')
            } catch {
              /* ignore */
            }
            lenis?.start()
            setGone(true)
          },
        })
        .to(path, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' })
        .fromTo('.pl-mark', { opacity: 0, filter: 'blur(14px)', y: 14 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, ease: 'expo.out' }, '-=0.6')
        .fromTo('.pl-count', { opacity: 0 }, { opacity: 1, duration: 0.3 }, '<')
        .to('.pl-mark, .pl-svg, .pl-count', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in', delay: 0.35 })
        .add(() => onDone(), '-=0.1')
        .to(ref.current, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '-=0.1')
    },
    { scope: ref, dependencies: [lenis] },
  )

  if (gone) return null

  return (
    <div ref={ref} className="pattern-wave-navy fixed inset-0 z-[100] grid place-items-center bg-navy" style={{ clipPath: 'inset(0 0 0% 0)' }} aria-hidden>
      <svg className="pl-svg absolute inset-x-0 top-1/2 h-32 w-full -translate-y-1/2" viewBox="0 0 1000 120" preserveAspectRatio="none">
        <path
          className="pl-path"
          d="M0 60 H430 C450 60 455 18 478 18 S502 104 526 104 S552 60 575 60 H1000"
          fill="none"
          stroke="#8DAFBC"
          strokeWidth={1.6}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.6}
        />
      </svg>
      <img src="/brand/wordmark-white.png" alt="" className="pl-mark relative w-[min(78vw,620px)] opacity-0" />
      <p className="pl-count label absolute bottom-10 text-white/60 opacity-0">Healthy vessels · Healthy life</p>
    </div>
  )
}
