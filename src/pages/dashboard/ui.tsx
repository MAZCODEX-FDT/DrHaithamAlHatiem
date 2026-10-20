import { useEffect, type ReactNode } from 'react'
import clsx from 'clsx'
import { X } from 'lucide-react'
import type { L, ReviewStatus } from '@/data/types'

export function PageHeader({ title, sub, actions }: { title: string; sub?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-navy">{title}</h1>
        {sub && <p className="mt-1.5 text-sm text-deep">{sub}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function Panel({ title, action, children, className, pad = true }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string; pad?: boolean }) {
  return (
    <section className={clsx('rounded-[22px] bg-white ring-1 ring-navy/[0.06]', className)}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-4 px-6 pt-5">
          {title && <h2 className="text-[15px] font-semibold text-navy">{title}</h2>}
          {action}
        </header>
      )}
      <div className={clsx(pad && 'p-6')}>{children}</div>
    </section>
  )
}

export function Kpi({ label, value, delta, hint, icon, tone = 'light' }: { label: string; value: ReactNode; delta?: number; hint?: string; icon?: ReactNode; tone?: 'light' | 'navy' }) {
  const navy = tone === 'navy'
  return (
    <div className={clsx('flex flex-col justify-between rounded-[22px] p-5 ring-1', navy ? 'bg-navy text-white ring-navy' : 'bg-white ring-navy/[0.06]')}>
      <div className="flex items-center justify-between">
        <span className={clsx('text-xs font-semibold tracking-[0.14em] uppercase', navy ? 'text-vessel' : 'text-deep')}>{label}</span>
        {icon && <span className={clsx('grid h-9 w-9 place-items-center rounded-xl', navy ? 'bg-white/10' : 'bg-blue-20 text-navy')}>{icon}</span>}
      </div>
      <p className={clsx('mt-5 text-4xl font-bold tracking-tight tabular-nums', navy ? 'text-white' : 'text-navy')}>{value}</p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {delta !== undefined && Number.isFinite(delta) && (
          <span className={clsx('rounded-full px-2 py-0.5 font-semibold', delta >= 0 ? (navy ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-700') : navy ? 'bg-white/15 text-white' : 'bg-rose-50 text-rose-700')}>
            {delta >= 0 ? '▲' : '▼'} {Math.abs(delta).toFixed(0)}%
          </span>
        )}
        {hint && <span className={navy ? 'text-white/60' : 'text-deep'}>{hint}</span>}
      </div>
    </div>
  )
}

const statusStyle: Record<ReviewStatus, string> = {
  pending: 'bg-amber-50 text-amber-800 ring-amber-200',
  approved: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  hidden: 'bg-slate-100 text-slate-600 ring-slate-200',
}

export function StatusBadge({ status }: { status: ReviewStatus }) {
  return (
    <span className={clsx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset', statusStyle[status])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  )
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={clsx('inline-flex items-center rounded-full bg-blue-20 px-2.5 py-1 text-xs font-medium text-navy', className)}>{children}</span>
}

export function Drawer({ open, onClose, title, children, footer, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode; wide?: boolean }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div className={clsx('fixed inset-0 z-50 transition', open ? 'visible' : 'invisible')} aria-hidden={!open}>
      <div className={clsx('absolute inset-0 bg-ink/30 backdrop-blur-sm transition-opacity duration-300', open ? 'opacity-100' : 'opacity-0')} onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={clsx(
          'absolute inset-y-2 right-2 flex w-[calc(100%-1rem)] flex-col rounded-[24px] bg-white shadow-2xl transition-transform duration-500 ease-[var(--ease-out-expo)]',
          wide ? 'max-w-3xl' : 'max-w-xl',
          open ? 'translate-x-0' : 'translate-x-[110%]',
        )}
      >
        <header className="flex items-center justify-between border-b border-navy/[0.06] px-6 py-4">
          <h2 className="text-lg font-semibold text-navy">{title}</h2>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full hover:bg-blue-20" aria-label="Close">
            <X size={18} />
          </button>
        </header>
        <div className="thin-scroll flex-1 overflow-y-auto p-6" data-lenis-prevent>
          {children}
        </div>
        {footer && <footer className="flex items-center justify-end gap-2 border-t border-navy/[0.06] px-6 py-4">{footer}</footer>}
      </aside>
    </div>
  )
}

export function Field({ label, children, hint, className }: { label: string; children: ReactNode; hint?: string; className?: string }) {
  return (
    <label className={clsx('block', className)}>
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-deep uppercase">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-deep/80">{hint}</span>}
    </label>
  )
}

/** One field, both languages — the Arabic side is RTL and set in Plex Arabic */
export function BilingualField({ label, value, onChange, multiline, rows = 3 }: { label: string; value: L; onChange: (v: L) => void; multiline?: boolean; rows?: number }) {
  const Comp = multiline ? 'textarea' : 'input'
  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-deep uppercase">{label}</span>
      <div className="grid gap-2 md:grid-cols-2">
        <div className="relative">
          <span className="absolute top-2.5 left-3 text-[10px] font-bold text-deep/60">EN</span>
          <Comp className="field pl-10" rows={rows} value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} />
        </div>
        <div className="relative">
          <span className="absolute top-2.5 right-3 text-[10px] font-bold text-deep/60">AR</span>
          <Comp className="field pr-10" dir="rtl" style={{ fontFamily: 'var(--font-arabic)' }} rows={rows} value={value.ar} onChange={(e) => onChange({ ...value, ar: e.target.value })} />
        </div>
      </div>
    </div>
  )
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className="inline-flex items-center gap-3">
      <span className={clsx('relative h-6 w-11 rounded-full transition-colors', checked ? 'bg-navy' : 'bg-blue-40')}>
        <span className={clsx('absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all', checked ? 'left-[22px]' : 'left-0.5')} />
      </span>
      {label && <span className="text-sm font-medium text-ink">{label}</span>}
    </button>
  )
}

export function Empty({ title, sub, icon }: { title: string; sub?: string; icon?: ReactNode }) {
  return (
    <div className="grid place-items-center py-16 text-center">
      {icon && <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-20 text-navy">{icon}</span>}
      <p className="mt-4 font-semibold text-navy">{title}</p>
      {sub && <p className="mt-1 text-sm text-deep">{sub}</p>}
    </div>
  )
}

export function Segmented<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string; count?: number }[] }) {
  return (
    <div className="no-scrollbar inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-white p-1 ring-1 ring-navy/[0.06]">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={clsx('flex h-9 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium whitespace-nowrap transition', value === o.value ? 'bg-navy text-white' : 'text-ink/70 hover:text-navy')}
        >
          {o.label}
          {o.count !== undefined && <span className={clsx('rounded-full px-1.5 text-[11px] tabular-nums', value === o.value ? 'bg-white/20' : 'bg-blue-20 text-navy')}>{o.count}</span>}
        </button>
      ))}
    </div>
  )
}

export function fmtDate(isoDate: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) {
  return new Date(isoDate.length === 10 ? isoDate + 'T00:00:00' : isoDate).toLocaleDateString('en-GB', opts)
}
