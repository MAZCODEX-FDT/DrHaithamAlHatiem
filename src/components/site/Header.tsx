import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { ArrowUpRight, LogIn, Menu, Phone, X } from 'lucide-react'
import { Wordmark } from '@/components/brand/Brand'
import Magnet from '@/components/reactbits/Magnet'
import { useI18n, type DictKey } from '@/lib/i18n'
import { usePublicData } from '@/data/store'
import { primaryPhone, telHref } from '@/lib/contact'
import { gsap } from '@/lib/smooth'

const links: { to: string; key: DictKey }[] = [
  { to: '/about', key: 'nav.about' },
  { to: '/services', key: 'nav.services' },
  { to: '/guide', key: 'nav.guide' },
  { to: '/contact', key: 'nav.contact' },
]

export function Header() {
  const { t, lang, toggle } = useI18n()
  const { settings } = usePublicData()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const lenis = useLenis(({ scroll, direction }) => {
    setScrolled(scroll > 40)
    setHidden(direction === 1 && scroll > 420 && !open)
  })

  // On the home page the hero is navy → the header starts reversed (white)
  const overDark = pathname === '/' && !scrolled

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open, lenis])

  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out-expo)]',
          hidden && '-translate-y-[120%]',
        )}
      >
        <div className="container-x pt-3 sm:pt-4">
          <nav
            className={clsx(
              'flex h-16 items-center justify-between gap-4 rounded-full ps-5 pe-2 transition-all duration-500 sm:ps-7',
              scrolled || open
                ? 'bg-white/80 shadow-[0_12px_40px_-18px_rgba(0,36,90,0.35)] ring-1 ring-navy/5 backdrop-blur-xl'
                : 'bg-transparent',
            )}
            aria-label="Main"
          >
            <Link to="/" aria-label={t('nav.home')} className="shrink-0">
              <Wordmark tone={overDark && !open ? 'white' : 'navy'} className="w-[168px] sm:w-[210px]" />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      clsx(
                        'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                        overDark ? 'text-white/80 hover:text-white' : 'text-ink/70 hover:text-navy',
                        isActive && (overDark ? 'text-white' : 'text-navy'),
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {t(l.key)}
                        <span
                          className={clsx(
                            'absolute inset-x-4 -bottom-0.5 h-px origin-center scale-x-0 bg-current transition-transform duration-500',
                            isActive && 'scale-x-100',
                          )}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggle}
                className={clsx(
                  'h-11 rounded-full px-4 text-sm font-semibold transition-colors',
                  overDark && !open ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-blue-20',
                )}
                style={{ fontFamily: lang === 'en' ? 'var(--font-arabic)' : 'var(--font-sans)' }}
                aria-label="Switch language"
              >
                {lang === 'en' ? 'العربية' : 'English'}
              </button>
              <a
                href={telHref(primaryPhone(settings))}
                className={clsx(
                  'hidden h-11 w-11 items-center justify-center rounded-full transition-colors md:inline-flex',
                  overDark ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-blue-20',
                )}
                aria-label={t('cta.call')}
              >
                <Phone size={18} strokeWidth={1.8} />
              </a>
              <Link
                to="/dashboard"
                className={clsx(
                  'hidden h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors sm:inline-flex sm:w-11 lg:w-auto lg:px-4',
                  overDark && !open ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-blue-20',
                )}
                aria-label={t('footer.dashboard')}
              >
                <LogIn size={18} strokeWidth={1.8} className="rtl:-scale-x-100" />
                <span className="hidden lg:inline">{t('nav.login')}</span>
              </Link>
              {/* Magnet sets an inline display, so the breakpoint lives on this wrapper */}
              <div className="hidden sm:block">
                <Magnet padding={40} magnetStrength={4}>
                  <Link to="/book" className={clsx(overDark ? 'btn bg-white text-navy hover:bg-mist' : 'btn-primary', 'h-12')}>
                    {t('nav.book')}
                    <ArrowUpRight size={16} className="rtl:-scale-x-100" />
                  </Link>
                </Magnet>
              </div>
              <button
                onClick={() => setOpen((o) => !o)}
                className={clsx(
                  'inline-flex h-12 w-12 items-center justify-center rounded-full lg:hidden',
                  overDark && !open ? 'text-white' : 'text-navy',
                )}
                aria-expanded={open}
                aria-label="Menu"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </div>
      </header>
      <MobileMenu open={open} />
    </>
  )
}

function MobileMenu({ open }: { open: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const { t } = useI18n()
  const { settings } = usePublicData()

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(ref.current, { display: 'block' })
        .fromTo(ref.current, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'expo.inOut' })
        .from('.mm-item', { yPercent: 110, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'expo.out' }, '-=0.25')
    },
    { scope: ref },
  )

  useEffect(() => {
    if (open) tl.current?.play()
    else tl.current?.reverse()
  }, [open])

  return (
    <div ref={ref} className="on-navy pattern-wave-navy fixed inset-0 z-40 hidden bg-navy pt-28 lg:hidden" style={{ clipPath: 'inset(0 0 100% 0)' }}>
      <div className="container-x flex h-full flex-col pb-10">
        <ul className="space-y-1">
          {[{ to: '/', key: 'nav.home' as DictKey }, ...links, { to: '/book', key: 'nav.book' as DictKey }].map((l) => (
            <li key={l.to} className="overflow-hidden">
              <Link to={l.to} className="mm-item block py-2 text-4xl font-semibold tracking-tight text-white">
                {t(l.key)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto overflow-hidden">
          <div className="mm-item space-y-1 text-white/70">
            <p className="label">{t('nav.contact')}</p>
            <a href={telHref(primaryPhone(settings))} className="block text-2xl font-semibold text-white" dir="ltr">
              {primaryPhone(settings)}
            </a>
            <Link to="/dashboard" className="mt-5 inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white ring-1 ring-white/25">
              <LogIn size={16} strokeWidth={1.8} className="rtl:-scale-x-100" />
              {t('footer.dashboard')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
