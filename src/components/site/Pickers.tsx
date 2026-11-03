import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import clsx from 'clsx'
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import type { DayKey, Lang } from '@/data/types'
import { iso } from '@/data/seed'
import { dayFromIndex, formatDate, formatTime } from '@/lib/i18n'

/**
 * Form controls styled to match the site, replacing the browser's native select,
 * date and time inputs. Each is a button that opens a small panel; all are
 * keyboard operable (arrows, Home/End, Enter, Esc) and right-to-left aware.
 */

/** Closes a popover on outside click or Escape, and returns focus to its trigger */
function useDismiss(open: boolean, close: () => void, root: React.RefObject<HTMLElement | null>, trigger: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && close()
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopPropagation()
      close()
      trigger.current?.focus()
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey, true)
    }
  }, [open, close, root, trigger])
}

const triggerCls = (open: boolean, invalid?: boolean) =>
  clsx(
    'field flex min-h-12 items-center gap-3 text-start transition-colors',
    open && 'border-navy ring-4 ring-navy/10',
    invalid && 'border-rose-400',
  )
const panelCls = 'absolute inset-x-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-20px_rgba(0,36,90,0.35)] ring-1 ring-navy/10'

/* ───────────────────────── Select ───────────────────────── */

export interface Option {
  value: string
  label: string
  /** a second, quieter line (e.g. a clinic's days) */
  hint?: string
}

export function Select({ value, onChange, options, placeholder, label, icon }: { value: string; onChange: (v: string) => void; options: Option[]; placeholder: string; label: string; icon?: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const id = useId()
  const selected = options.find((o) => o.value === value)
  useDismiss(open, () => setOpen(false), root, button)

  function show() {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)))
    setOpen(true)
  }
  useEffect(() => {
    if (open) list.current?.focus()
  }, [open])
  useEffect(() => {
    if (open) list.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  function pick(i: number) {
    onChange(options[i].value)
    setOpen(false)
    button.current?.focus()
  }

  function onListKey(e: KeyboardEvent) {
    const last = options.length - 1
    const move: Record<string, number> = { ArrowDown: Math.min(last, active + 1), ArrowUp: Math.max(0, active - 1), Home: 0, End: last }
    if (e.key in move) {
      e.preventDefault()
      setActive(move[e.key])
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      pick(active)
    } else if (e.key === 'Tab') setOpen(false)
    else if (e.key.length === 1) {
      // type-ahead: jump to the next option starting with the typed letter
      const k = e.key.toLowerCase()
      const from = options.findIndex((o, i) => i > active && o.label.toLowerCase().startsWith(k))
      const to = from >= 0 ? from : options.findIndex((o) => o.label.toLowerCase().startsWith(k))
      if (to >= 0) setActive(to)
    }
  }

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={selected ? `${label}: ${selected.label}` : label}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault()
            show()
          }
        }}
        className={triggerCls(open)}
      >
        {icon && <span className="shrink-0 text-deep">{icon}</span>}
        <span className="min-w-0 flex-1">
          {selected ? (
            <>
              <span className="block truncate font-medium text-ink">{selected.label}</span>
              {selected.hint && <span className="block truncate text-xs text-deep">{selected.hint}</span>}
            </>
          ) : (
            <span className="text-deep/70">{placeholder}</span>
          )}
        </span>
        <ChevronDown size={18} className={clsx('shrink-0 text-deep transition-transform duration-300', open && 'rotate-180')} />
      </button>
      {open && (
        <ul
          ref={list}
          id={`${id}-list`}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`${id}-o${active}`}
          onKeyDown={onListKey}
          data-lenis-prevent
          className={clsx(panelCls, 'thin-scroll max-h-72 overflow-y-auto p-1.5 outline-none')}
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${id}-o${i}`}
              data-i={i}
              role="option"
              aria-selected={o.value === value}
              onPointerMove={() => setActive(i)}
              onClick={() => pick(i)}
              className={clsx('flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5', i === active && 'bg-blue-20', o.value === value && 'text-navy')}
            >
              <span className="min-w-0 flex-1">
                <span className={clsx('block text-sm', o.value === value ? 'font-semibold' : 'font-medium text-ink')}>{o.label}</span>
                {o.hint && <span className="block text-xs text-deep">{o.hint}</span>}
              </span>
              {o.value === value && <Check size={16} className="shrink-0 text-navy" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* ───────────────────────── Date ───────────────────────── */

const WEEK_START = 6 // Saturday, as the Egyptian week runs

export function DatePicker({
  value,
  onChange,
  lang,
  label,
  placeholder,
  allowedDays,
  invalid,
}: {
  value: string
  onChange: (v: string) => void
  lang: Lang
  label: string
  placeholder: string
  /** when set, only these weekdays can be picked (the chosen clinic's days) */
  allowedDays?: DayKey[]
  invalid?: boolean
}) {
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => (value ? new Date(value + 'T00:00:00') : today))
  const [focus, setFocus] = useState<Date>(today)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  const id = useId()
  useDismiss(open, () => setOpen(false), root, button)
  const rtl = lang === 'ar'
  const loc = lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB'

  const enabled = (d: Date) => d >= today && (!allowedDays?.length || allowedDays.includes(dayFromIndex[d.getDay()]))
  // the first pickable day from a date onwards (looks a year ahead at most)
  const firstEnabled = (from: Date) => {
    const d = new Date(from)
    for (let i = 0; i < 366; i++, d.setDate(d.getDate() + 1)) if (enabled(d)) return new Date(d)
    return from
  }

  function show() {
    const start = value ? new Date(value + 'T00:00:00') : firstEnabled(today)
    setView(new Date(start.getFullYear(), start.getMonth(), 1))
    setFocus(start)
    setOpen(true)
  }
  useEffect(() => {
    if (open) grid.current?.querySelector<HTMLButtonElement>(`[data-day="${iso(focus)}"]`)?.focus()
  }, [open, focus, view])

  const first = new Date(view.getFullYear(), view.getMonth(), 1)
  const lead = (first.getDay() - WEEK_START + 7) % 7
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = [...Array(lead).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1))]
  const weekdays = Array.from({ length: 7 }, (_, i) => new Date(2026, 0, 3 + i).toLocaleDateString(loc, { weekday: 'narrow' })) // 3 Jan 2026 is a Saturday
  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1)

  function moveFocus(days: number) {
    const d = new Date(focus)
    d.setDate(d.getDate() + days)
    if (d < today) return
    setFocus(d)
    if (d.getMonth() !== view.getMonth() || d.getFullYear() !== view.getFullYear()) setView(new Date(d.getFullYear(), d.getMonth(), 1))
  }
  function onGridKey(e: KeyboardEvent) {
    const step: Record<string, number> = { ArrowLeft: rtl ? 1 : -1, ArrowRight: rtl ? -1 : 1, ArrowUp: -7, ArrowDown: 7 }
    if (e.key in step) {
      e.preventDefault()
      moveFocus(step[e.key])
    }
  }
  function pick(d: Date) {
    if (!enabled(d)) return
    onChange(iso(d))
    setOpen(false)
    button.current?.focus()
  }

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={value ? `${label}: ${formatDate(value, lang, { weekday: 'long', day: 'numeric', month: 'long' })}` : label}
        aria-invalid={invalid}
        onClick={() => (open ? setOpen(false) : show())}
        className={triggerCls(open, invalid)}
      >
        <CalendarDays size={18} strokeWidth={1.8} className="shrink-0 text-deep" />
        <span className={clsx('min-w-0 flex-1 truncate', value ? 'font-medium text-ink' : 'text-deep/70')}>
          {value ? formatDate(value, lang, { weekday: 'long', day: 'numeric', month: 'long' }) : placeholder}
        </span>
        <ChevronDown size={18} className={clsx('shrink-0 text-deep transition-transform duration-300', open && 'rotate-180')} />
      </button>
      {open && (
        <div role="dialog" aria-modal="false" aria-label={label} className={clsx(panelCls, 'p-4 sm:end-auto sm:w-[340px]')}>
          <div className="mb-3 flex items-center justify-between">
            <button type="button" disabled={!canPrev} onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} className="grid h-10 w-10 place-items-center rounded-full text-navy hover:bg-blue-20 disabled:opacity-30" aria-label={lang === 'ar' ? 'الشهر السابق' : 'Previous month'}>
              {rtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
            <p className="text-sm font-bold text-navy" aria-live="polite" id={`${id}-month`}>
              {view.toLocaleDateString(loc, { month: 'long', year: 'numeric' })}
            </p>
            <button type="button" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} className="grid h-10 w-10 place-items-center rounded-full text-navy hover:bg-blue-20" aria-label={lang === 'ar' ? 'الشهر التالي' : 'Next month'}>
              {rtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-deep" aria-hidden="true">
            {weekdays.map((w, i) => (
              <span key={i} className="py-1">
                {w}
              </span>
            ))}
          </div>
          <div ref={grid} role="grid" aria-labelledby={`${id}-month`} onKeyDown={onGridKey} className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <span key={i} />
              const k = iso(d)
              const ok = enabled(d)
              const sel = k === value
              return (
                <button
                  key={k}
                  type="button"
                  data-day={k}
                  tabIndex={k === iso(focus) ? 0 : -1}
                  // aria-disabled, not disabled: arrow keys can still move through unavailable days
                  aria-disabled={!ok}
                  aria-pressed={sel}
                  aria-label={d.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' })}
                  onClick={() => pick(d)}
                  className={clsx(
                    'relative grid aspect-square place-items-center rounded-xl text-sm tabular-nums transition-colors outline-none focus-visible:ring-2 focus-visible:ring-navy',
                    sel ? 'bg-navy font-bold text-white' : ok ? 'font-semibold text-navy hover:bg-blue-20' : 'cursor-not-allowed text-ink/25',
                    k === iso(today) && !sel && 'ring-1 ring-navy/30',
                  )}
                >
                  {d.getDate()}
                  {ok && !sel && allowedDays?.length ? <span className="absolute bottom-1 h-1 w-1 rounded-full bg-vessel" aria-hidden="true" /> : null}
                </button>
              )
            })}
          </div>
          {value && (
            <button type="button" onClick={() => (onChange(''), setOpen(false), button.current?.focus())} className="mt-3 w-full rounded-xl py-2 text-xs font-semibold text-deep hover:bg-mist">
              {lang === 'ar' ? 'أي يوم' : 'Any day'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/* ───────────────────────── Time ───────────────────────── */

/** Half-hour preferences from a start time; the clinic confirms the exact slot */
export function timeOptions(from = '09:00', hours = 4) {
  const [h, m] = from.split(':').map(Number)
  const start = h * 60 + m
  return Array.from({ length: hours * 2 }, (_, i) => {
    const t = start + i * 30
    return `${String(Math.floor(t / 60) % 24).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`
  })
}

export function TimePicker({ value, onChange, lang, label, placeholder, options, caption }: { value: string; onChange: (v: string) => void; lang: Lang; label: string; placeholder: string; options: string[]; caption?: string }) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  useDismiss(open, () => setOpen(false), root, button)
  useEffect(() => {
    if (open) (panel.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]') ?? panel.current?.querySelector<HTMLButtonElement>('button'))?.focus()
  }, [open])

  function onKey(e: KeyboardEvent) {
    const btns = [...(panel.current?.querySelectorAll<HTMLButtonElement>('button[data-t]') ?? [])]
    const i = btns.indexOf(document.activeElement as HTMLButtonElement)
    const step: Record<string, number> = { ArrowLeft: lang === 'ar' ? 1 : -1, ArrowRight: lang === 'ar' ? -1 : 1, ArrowUp: -3, ArrowDown: 3 }
    if (e.key in step && i >= 0) {
      e.preventDefault()
      btns[Math.min(btns.length - 1, Math.max(0, i + step[e.key]))]?.focus()
    }
  }

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={value ? `${label}: ${formatTime(value, lang)}` : label}
        onClick={() => setOpen((o) => !o)}
        className={triggerCls(open)}
      >
        <Clock size={18} strokeWidth={1.8} className="shrink-0 text-deep" />
        <span className={clsx('min-w-0 flex-1 truncate', value ? 'font-medium text-ink' : 'text-deep/70')} dir={value ? 'ltr' : undefined}>
          {value ? formatTime(value, lang) : placeholder}
        </span>
        <ChevronDown size={18} className={clsx('shrink-0 text-deep transition-transform duration-300', open && 'rotate-180')} />
      </button>
      {open && (
        <div ref={panel} role="dialog" aria-modal="false" aria-label={label} onKeyDown={onKey} className={clsx(panelCls, 'p-3')}>
          {caption && <p className="mb-2 px-1 text-xs text-deep">{caption}</p>}
          <div className="grid grid-cols-3 gap-1.5">
            {options.map((t) => (
              <button
                key={t}
                type="button"
                data-t={t}
                aria-pressed={t === value}
                onClick={() => {
                  onChange(t)
                  setOpen(false)
                  button.current?.focus()
                }}
                className={clsx('h-11 rounded-xl text-sm font-semibold tabular-nums transition-colors outline-none focus-visible:ring-2 focus-visible:ring-navy', t === value ? 'bg-navy text-white' : 'bg-mist text-navy hover:bg-blue-20')}
                dir="ltr"
              >
                {formatTime(t, lang)}
              </button>
            ))}
          </div>
          {value && (
            <button type="button" onClick={() => (onChange(''), setOpen(false), button.current?.focus())} className="mt-2 w-full rounded-xl py-2 text-xs font-semibold text-deep hover:bg-mist">
              {lang === 'ar' ? 'أي وقت' : 'Any time'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
