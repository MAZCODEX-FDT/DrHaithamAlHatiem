import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ReactLenis, type LenisRef } from 'lenis/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Lenis smooth scroll, ticked by GSAP so ScrollTrigger and Lenis share one
 * frame loop (no double rAF, no jitter).
 */
export function SmoothScroll() {
  const lenisRef = useRef<LenisRef>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const update = (t: number) => lenisRef.current?.lenis?.raf(t * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    const lenis = lenisRef.current?.lenis
    lenis?.on('scroll', ScrollTrigger.update)
    return () => {
      gsap.ticker.remove(update)
      lenis?.off('scroll', ScrollTrigger.update)
    }
  }, [])

  // route change → jump to top and re-measure triggers
  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true, force: true })
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.09,
        anchors: { offset: -90 },
        allowNestedScroll: true,
        autoToggle: true,
        stopInertiaOnNavigate: true,
      }}
    />
  )
}

export function useReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export { gsap, ScrollTrigger }
