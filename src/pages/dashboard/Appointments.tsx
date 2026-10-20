import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { CalendarDays, ChevronLeft, ChevronRight, Download, List, Plus, Search } from 'lucide-react'
import { uid, useStore } from '@/data/store'
import { iso } from '@/data/seed'
import type { Appointment, AppointmentSource, AppointmentStatus, AppointmentType } from '@/data/types'
import { formatTime } from '@/lib/i18n'
import { slotsFor } from '@/lib/slots'
import { Drawer, Empty, Field, PageHeader, Panel, Segmented, StatusBadge, fmtDate } from './ui'

type Scope = 'upcoming' | 'today' | 'past' | 'all'
const statuses: AppointmentStatus[] = ['pending', 'confirmed', 'completed', 'cancelled', 'no-show']
const types: AppointmentType[] = ['consultation', 'follow-up', 'doppler', 'procedure']
const sources: AppointmentSource[] = ['website', 'phone', 'whatsapp', 'walk-in']

export default function Appointments() {
  const { db, upsert, patch, remove } = useStore()
  const [view, setView] = useState<'list' | 'week'>('list')
  const [scope, setScope] = useState<Scope>('upcoming')
  const [status, setStatus] = useState<AppointmentStatus | 'all'>('all')
  const [q, setQ] = useState('')
  const [edit, setEdit] = useState<Appointment | null>(null)
  const [limit, setLimit] = useState(40)
  const today = iso(new Date())

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    return db.appointments
      .filter((a) => (scope === 'all' ? true : scope === 'today' ? a.date === today : scope === 'upcoming' ? a.date >= today : a.date < today))
      .filter((a) => status === 'all' || a.status === status)
      .filter((a) => !s || a.name.toLowerCase().includes(s) || a.phone.replace(/\s/g, '').includes(s.replace(/\s/g, '')))
      .sort((a, b) => (scope === 'past' ? -1 : 1) * (a.date.localeCompare(b.date) || a.time.localeCompare(b.time)))
  }, [db.appointments, scope, status, q, today])

  const countBy = (st: AppointmentStatus) => db.appointments.filter((a) => a.status === st && (scope === 'all' || (scope === 'today' ? a.date === today : scope === 'upcoming' ? a.date >= today : a.date < today))).length

  function exportCsv() {
    const rows = [['Date', 'Time', 'Patient', 'Phone', 'Service', 'Type', 'Status', 'Source', 'Notes']]
    filtered.forEach((a) => rows.push([a.date, a.time, a.name, a.phone, db.services.find((s) => s.id === a.serviceId)?.title.en ?? '', a.type, a.status, a.source, a.notes ?? '']))
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob(['' + csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `appointments-${today}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const blank = (): Appointment => ({
    id: uid('ap'),
    name: '',
    phone: '',
    serviceId: db.services[0]?.id ?? '',
    type: 'consultation',
    date: today,
    time: '17:00',
    status: 'confirmed',
    source: 'phone',
    createdAt: new Date().toISOString(),
  })

  return (
    <>
      <PageHeader
        title="Appointments"
        sub={`${db.appointments.filter((a) => a.date >= today && a.status !== 'cancelled').length} upcoming · ${db.appointments.filter((a) => a.status === 'pending').length} awaiting confirmation`}
        actions={
          <>
            <div className="inline-flex rounded-full bg-white p-1 ring-1 ring-navy/[0.06]">
              {(
                [
                  ['list', List],
                  ['week', CalendarDays],
                ] as const
              ).map(([v, Icon]) => (
                <button key={v} onClick={() => setView(v)} className={clsx('grid h-9 w-10 place-items-center rounded-full', view === v ? 'bg-navy text-white' : 'text-navy')} aria-label={`${v} view`}>
                  <Icon size={16} />
                </button>
              ))}
            </div>
            <button onClick={exportCsv} className="btn border border-navy/15 bg-white text-navy hover:bg-blue-20">
              <Download size={16} /> Export
            </button>
            <button onClick={() => setEdit(blank())} className="btn-primary">
              <Plus size={16} /> New appointment
            </button>
          </>
        }
      />

      {view === 'week' ? (
        <WeekView onOpen={setEdit} />
      ) : (
        <>
          <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-2">
              <Segmented value={scope} onChange={setScope} options={[{ value: 'upcoming', label: 'Upcoming' }, { value: 'today', label: 'Today' }, { value: 'past', label: 'Past' }, { value: 'all', label: 'All' }]} />
              <Segmented value={status} onChange={setStatus} options={[{ value: 'all', label: 'Any status' }, ...statuses.map((s) => ({ value: s, label: s.replace('-', ' '), count: countBy(s) }))]} />
            </div>
            <div className="relative xl:w-72">
              <Search size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-deep" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or phone" className="h-11 w-full rounded-full bg-white pr-4 pl-10 text-sm ring-1 ring-navy/[0.06] outline-none focus:ring-2 focus:ring-navy/30" />
            </div>
          </div>

          <Panel pad={false}>
            {filtered.length === 0 ? (
              <Empty title="No appointments match" sub="Try another filter." icon={<CalendarDays size={22} />} />
            ) : (
              <div className="thin-scroll overflow-x-auto">
                <table className="w-full min-w-[860px] text-sm">
                  <thead>
                    <tr className="text-left text-xs tracking-wide text-deep uppercase">
                      {['Date & time', 'Patient', 'Service', 'Type', 'Source', 'Status', ''].map((h) => (
                        <th key={h} className="px-5 pt-5 pb-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/[0.06]">
                    {filtered.slice(0, limit).map((a) => (
                      <tr key={a.id} className="group hover:bg-mist/70">
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <p className="font-semibold text-navy">{a.date === today ? 'Today' : fmtDate(a.date, { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                          <p className="text-xs text-deep tabular-nums">{formatTime(a.time, 'en')}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          {a.patientId ? (
                            <Link to={`/dashboard/patients/${a.patientId}`} className="font-medium text-ink hover:text-navy hover:underline">
                              {a.name}
                            </Link>
                          ) : (
                            <span className="font-medium text-ink">
                              {a.name} <span className="ml-1 rounded bg-blush/40 px-1.5 py-0.5 text-[10px] font-bold text-navy uppercase">New</span>
                            </span>
                          )}
                          <p className="text-xs text-deep tabular-nums">{a.phone}</p>
                        </td>
                        <td className="px-5 py-3.5 text-ink/80">{db.services.find((s) => s.id === a.serviceId)?.title.en}</td>
                        <td className="px-5 py-3.5 text-ink/80 capitalize">{a.type.replace('-', ' ')}</td>
                        <td className="px-5 py-3.5 text-ink/60 capitalize">{a.source}</td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={a.status} />
                        </td>
                        <td className="px-5 py-3.5 text-right whitespace-nowrap">
                          {a.status === 'pending' && (
                            <button onClick={() => patch('appointments', a.id, { status: 'confirmed' })} className="mr-1 h-8 rounded-full bg-navy px-3 text-xs font-semibold text-white hover:bg-navy-shadow">
                              Confirm
                            </button>
                          )}
                          <button onClick={() => setEdit(a)} className="h-8 rounded-full px-3 text-xs font-semibold text-navy hover:bg-blue-20">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length > limit && (
                  <div className="p-4 text-center">
                    <button onClick={() => setLimit((l) => l + 40)} className="btn text-navy hover:bg-blue-20">
                      Show more ({filtered.length - limit} remaining)
                    </button>
                  </div>
                )}
              </div>
            )}
          </Panel>
        </>
      )}

      <AppointmentDrawer
        value={edit}
        onClose={() => setEdit(null)}
        onSave={(a) => {
          upsert('appointments', a)
          setEdit(null)
        }}
        onDelete={(id) => {
          remove('appointments', id)
          setEdit(null)
        }}
      />
    </>
  )
}

function WeekView({ onOpen }: { onOpen: (a: Appointment) => void }) {
  const { db } = useStore()
  const [offset, setOffset] = useState(0)
  const start = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() - ((d.getDay() + 1) % 7) + offset * 7) // week starts Saturday
    return d
  }, [offset])
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
  const today = iso(new Date())

  return (
    <Panel
      title={`${fmtDate(iso(days[0]), { day: 'numeric', month: 'short' })} – ${fmtDate(iso(days[6]), { day: 'numeric', month: 'short', year: 'numeric' })}`}
      action={
        <div className="flex items-center gap-1">
          <button onClick={() => setOffset((o) => o - 1)} className="grid h-9 w-9 place-items-center rounded-full text-navy hover:bg-blue-20" aria-label="Previous week">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => setOffset(0)} className="h-9 rounded-full px-3 text-xs font-semibold text-navy hover:bg-blue-20">
            This week
          </button>
          <button onClick={() => setOffset((o) => o + 1)} className="grid h-9 w-9 place-items-center rounded-full text-navy hover:bg-blue-20" aria-label="Next week">
            <ChevronRight size={18} />
          </button>
        </div>
      }
    >
      <div className="thin-scroll overflow-x-auto">
        <div className="grid min-w-[980px] grid-cols-7 gap-2">
          {days.map((d) => {
            const key = iso(d)
            const list = db.appointments.filter((a) => a.date === key && a.status !== 'cancelled').sort((a, b) => a.time.localeCompare(b.time))
            const closed = slotsFor(d, db.settings).length === 0
            return (
              <div key={key} className={clsx('min-h-[420px] rounded-2xl p-2', key === today ? 'bg-blue-20' : closed ? 'bg-mist/60' : 'bg-mist')}>
                <div className="flex items-baseline justify-between px-2 pt-1 pb-3">
                  <span className="text-xs font-semibold text-deep uppercase">{d.toLocaleDateString('en-GB', { weekday: 'short' })}</span>
                  <span className={clsx('text-lg font-bold', key === today ? 'text-navy' : 'text-ink/70')}>{d.getDate()}</span>
                </div>
                {closed && list.length === 0 && <p className="px-2 text-xs text-deep/70">Closed</p>}
                <ul className="space-y-1.5">
                  {list.map((a) => (
                    <li key={a.id}>
                      <button
                        onClick={() => onOpen(a)}
                        className={clsx(
                          'w-full rounded-xl border-l-[3px] bg-white px-2.5 py-2 text-left shadow-sm transition hover:shadow-md',
                          a.status === 'pending' ? 'border-amber-400' : a.status === 'completed' ? 'border-emerald-500' : a.status === 'no-show' ? 'border-rose-400' : 'border-navy',
                        )}
                      >
                        <p className="text-[11px] font-semibold text-deep tabular-nums">{formatTime(a.time, 'en')}</p>
                        <p className="truncate text-xs font-semibold text-ink">{a.name}</p>
                        <p className="truncate text-[11px] text-deep">{db.services.find((s) => s.id === a.serviceId)?.title.en}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </Panel>
  )
}

function AppointmentDrawer({ value, onClose, onSave, onDelete }: { value: Appointment | null; onClose: () => void; onSave: (a: Appointment) => void; onDelete: (id: string) => void }) {
  const { db } = useStore()
  const [draft, setDraft] = useState<Appointment | null>(value)
  const [prev, setPrev] = useState(value)
  if (value !== prev) {
    setPrev(value)
    setDraft(value)
  }
  const exists = !!value && db.appointments.some((a) => a.id === value.id)
  const a = draft
  const set = (c: Partial<Appointment>) => setDraft((d) => (d ? { ...d, ...c } : d))
  const slots = a ? slotsFor(new Date(a.date + 'T00:00:00'), db.settings) : []

  return (
    <Drawer
      open={!!value}
      onClose={onClose}
      title={exists ? 'Edit appointment' : 'New appointment'}
      footer={
        a && (
          <>
            {exists && (
              <button onClick={() => confirm('Delete this appointment?') && onDelete(a.id)} className="btn mr-auto text-rose-700 hover:bg-rose-50">
                Delete
              </button>
            )}
            <button onClick={onClose} className="btn text-navy hover:bg-blue-20">
              Cancel
            </button>
            <button onClick={() => a.name.trim() && onSave(a)} className="btn-primary" disabled={!a.name.trim()}>
              Save
            </button>
          </>
        )
      }
    >
      {a && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Existing patient" className="sm:col-span-2">
            <select
              className="field"
              value={a.patientId ?? ''}
              onChange={(e) => {
                const p = db.patients.find((x) => x.id === e.target.value)
                set(p ? { patientId: p.id, name: p.name, phone: p.phone, email: p.email } : { patientId: undefined })
              }}
            >
              <option value="">— New / walk-in —</option>
              {[...db.patients].sort((x, y) => x.name.localeCompare(y.name)).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} · {p.phone}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Name">
            <input className="field" value={a.name} onChange={(e) => set({ name: e.target.value })} />
          </Field>
          <Field label="Phone">
            <input className="field" value={a.phone} onChange={(e) => set({ phone: e.target.value })} />
          </Field>
          <Field label="Service">
            <select className="field" value={a.serviceId} onChange={(e) => set({ serviceId: e.target.value })}>
              {db.services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title.en}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Visit type">
            <select className="field capitalize" value={a.type} onChange={(e) => set({ type: e.target.value as AppointmentType })}>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Date">
            <input type="date" className="field" value={a.date} onChange={(e) => set({ date: e.target.value })} />
          </Field>
          <Field label="Time" hint={slots.length ? undefined : 'Clinic is closed on this day'}>
            <input type="time" className="field" value={a.time} step={300} onChange={(e) => set({ time: e.target.value })} />
          </Field>
          <Field label="Status">
            <select className="field capitalize" value={a.status} onChange={(e) => set({ status: e.target.value as AppointmentStatus })}>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Source">
            <select className="field capitalize" value={a.source} onChange={(e) => set({ source: e.target.value as AppointmentSource })}>
              {sources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Notes" className="sm:col-span-2">
            <textarea className="field min-h-28" value={a.notes ?? ''} onChange={(e) => set({ notes: e.target.value })} dir="auto" />
          </Field>
        </div>
      )}
    </Drawer>
  )
}
