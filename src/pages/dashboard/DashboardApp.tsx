import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { Bell, ExternalLink, FileText, LayoutDashboard, LogOut, Menu, Settings as SettingsIcon, Star, Stethoscope, X } from 'lucide-react'
import { PulseLine, Wordmark } from '@/components/brand/Brand'
import { useStore } from '@/data/store'
import { gsap } from '@/lib/smooth'
import Overview from './Overview'
import ServicesCms from './ServicesCms'
import TipsCms from './TipsCms'
import ReviewsPage from './Reviews'
import SettingsPage from './Settings'
import { withBase } from '@/lib/base'

/**
 * Front-end demo gate. A production deployment must put the dashboard behind
 * real server-side auth — see README.
 */
const AUTH_KEY = 'dha:auth'
const DEMO = { email: 'doctor@drhaithamalhatiem.com', password: 'vascular2026' }

export default function DashboardApp() {
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === '1'
    } catch {
      return false
    }
  })

  // dashboard is always English / LTR regardless of the site language
  useEffect(() => {
    const html = document.documentElement
    const prev = { lang: html.lang, dir: html.dir }
    html.lang = 'en'
    html.dir = 'ltr'
    return () => {
      html.lang = prev.lang
      html.dir = prev.dir
    }
  }, [])

  if (!authed)
    return (
      <Login
        onLogin={() => {
          try {
            sessionStorage.setItem(AUTH_KEY, '1')
          } catch {
            /* ignore */
          }
          setAuthed(true)
        }}
      />
    )

  return (
    <Shell
      onLogout={() => {
        try {
          sessionStorage.removeItem(AUTH_KEY)
        } catch {
          /* ignore */
        }
        setAuthed(false)
      }}
    />
  )
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState(DEMO.email)
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.lg-in', { y: 24, opacity: 0, filter: 'blur(8px)', duration: 1, stagger: 0.07, ease: 'expo.out' })
    },
    { scope: ref },
  )

  function submit(e: FormEvent) {
    e.preventDefault()
    if (email.trim().toLowerCase() === DEMO.email && password === DEMO.password) onLogin()
    else setErr('Incorrect email or password.')
  }

  return (
    <div ref={ref} className="grid min-h-screen bg-mist lg:grid-cols-2" dir="ltr">
      <div className="on-navy pattern-wave-navy relative hidden flex-col justify-between overflow-hidden bg-navy p-12 text-white lg:flex">
        <Wordmark tone="white" className="lg-in w-[300px]" />
        <div>
          <p className="lg-in label">Clinic dashboard</p>
          <p className="lg-in mt-5 max-w-md text-5xl leading-[1.05] font-bold tracking-tight">Every patient. Every vessel. One view.</p>
        </div>
        <PulseLine className="lg-in -mx-12 h-24 opacity-60" strokeWidth={1.4} pulseAt={0.7} />
      </div>
      <div className="grid place-items-center p-6">
        <form onSubmit={submit} className="w-full max-w-sm">
          <Wordmark className="lg-in mb-12 w-[240px] lg:hidden" />
          <h1 className="lg-in text-3xl font-bold tracking-tight text-navy">Sign in</h1>
          <p className="lg-in mt-2 text-sm text-deep">Clinic team access only.</p>
          <div className="mt-8 space-y-4">
            {/* .field and .btn carry CSS transitions that freeze a GSAP fade part-way, so the fade runs on wrappers */}
            <div className="lg-in">
              <input className="field" type="email" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
            </div>
            <div className="lg-in">
              <input className="field" type="password" placeholder="Password" aria-label="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </div>
            {err && <p className="text-sm text-rose-700">{err}</p>}
            <div className="lg-in">
              <button className="btn-primary w-full">Sign in</button>
            </div>
          </div>
          <p className="lg-in mt-6 rounded-2xl bg-blue-20 p-4 text-xs leading-relaxed text-navy">
            Demo access — password <b className="font-mono">{DEMO.password}</b>
          </p>
          <Link to="/" className="lg-in mt-8 inline-block text-sm text-deep hover:text-navy">
            ← Back to website
          </Link>
        </form>
      </div>
    </div>
  )
}

// The dashboard manages website content only: bookings and messages go straight to the clinic's WhatsApp
const nav = [
  { group: 'Website', items: [
    { to: '', label: 'Overview', Icon: LayoutDashboard },
    { to: 'services', label: 'Services', Icon: Stethoscope },
    { to: 'tips', label: 'Health tips', Icon: FileText },
    { to: 'reviews', label: 'Reviews', Icon: Star, badge: 'reviews' as const },
    { to: 'settings', label: 'Settings', Icon: SettingsIcon },
  ] },
]

function Shell({ onLogout }: { onLogout: () => void }) {
  const { db } = useStore()
  const [mobile, setMobile] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setMobile(false), [pathname])

  const counts = useMemo(() => ({ reviews: db.reviews.filter((r) => r.status === 'pending').length }), [db])

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link to="/dashboard" className="px-3 pt-2 pb-8">
        <Wordmark tone="white" className="w-[190px]" />
      </Link>
      <nav className="flex-1 space-y-7">
        {nav.map((g) => (
          <div key={g.group}>
            <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.24em] text-vessel/80 uppercase">{g.group}</p>
            <ul className="space-y-0.5">
              {g.items.map(({ to, label, Icon, ...rest }) => {
                const badge = 'badge' in rest && rest.badge ? counts[rest.badge] : 0
                return (
                  <li key={to}>
                    <NavLink
                      end={to === ''}
                      to={to === '' ? '/dashboard' : `/dashboard/${to}`}
                      className={({ isActive }) =>
                        clsx('group flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition', isActive ? 'bg-white text-navy shadow-lg shadow-black/10' : 'text-white/70 hover:bg-white/[0.07] hover:text-white')
                      }
                    >
                      <Icon size={18} strokeWidth={1.8} />
                      <span className="flex-1">{label}</span>
                      {badge > 0 && <span className="min-w-6 rounded-full bg-blush px-1.5 py-0.5 text-center text-[11px] font-bold text-navy tabular-nums">{badge}</span>}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mt-6 space-y-1 border-t border-white/10 pt-4">
        <a href={withBase('/')} target="_blank" className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm text-white/70 hover:bg-white/[0.07] hover:text-white">
          <ExternalLink size={18} strokeWidth={1.8} /> View website
        </a>
        <button onClick={onLogout} className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm text-white/70 hover:bg-white/[0.07] hover:text-white">
          <LogOut size={18} strokeWidth={1.8} /> Sign out
        </button>
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3">
          <img src={withBase('/brand/portrait-crop.jpg')} alt="" className="h-10 w-10 rounded-full object-cover object-top" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Dr. Haitham AlHatiem</p>
            <p className="truncate text-xs text-white/50">Consultant · Admin</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-mist" dir="ltr">
      <aside className="on-navy pattern-tree-navy fixed inset-y-0 left-0 z-30 hidden w-[264px] bg-navy p-4 lg:block">{sidebar}</aside>

      {/* mobile sidebar */}
      <div className={clsx('fixed inset-0 z-50 lg:hidden', mobile ? 'visible' : 'invisible')}>
        <div className={clsx('absolute inset-0 bg-ink/40 transition-opacity', mobile ? 'opacity-100' : 'opacity-0')} onClick={() => setMobile(false)} />
        <aside className={clsx('on-navy absolute inset-y-0 left-0 w-[280px] bg-navy p-4 transition-transform duration-500', mobile ? 'translate-x-0' : '-translate-x-full')}>
          <button onClick={() => setMobile(false)} className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10" aria-label="Close menu">
            <X size={18} />
          </button>
          {sidebar}
        </aside>
      </div>

      <div className="lg:pl-[264px]">
        <Topbar onMenu={() => setMobile(true)} counts={counts} />
        <main className="mx-auto max-w-[1400px] px-4 pt-6 pb-16 sm:px-8">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="services" element={<ServicesCms />} />
            <Route path="tips" element={<TipsCms />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function Topbar({ onMenu, counts }: { onMenu: () => void; counts: { reviews: number } }) {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-20 border-b border-navy/[0.06] bg-mist/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center gap-3 px-4 sm:px-8">
        <button onClick={onMenu} className="grid h-11 w-11 place-items-center rounded-full text-navy hover:bg-white lg:hidden" aria-label="Open menu">
          <Menu size={20} />
        </button>
        <a href={withBase('/')} target="_blank" className="ml-auto inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-navy ring-1 ring-navy/[0.06] hover:bg-blue-20">
          <ExternalLink size={16} strokeWidth={1.8} /> View website
        </a>
        <button
          onClick={() => navigate('/dashboard/reviews')}
          className="relative grid h-11 w-11 place-items-center rounded-full bg-white text-navy ring-1 ring-navy/[0.06]"
          aria-label={`${counts.reviews} reviews awaiting approval`}
          title="Reviews awaiting approval"
        >
          <Bell size={18} strokeWidth={1.8} />
          {counts.reviews > 0 && <span className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-navy px-1 text-[10px] font-bold text-white">{counts.reviews}</span>}
        </button>
      </div>
    </header>
  )
}
