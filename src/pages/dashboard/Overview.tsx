import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowUpRight, CalendarCheck, CalendarClock, Check, Globe, UserPlus, Users } from 'lucide-react'
import { ServiceIcon } from '@/components/brand/Icons'
import { useStore } from '@/data/store'
import { iso } from '@/data/seed'
import type { AppointmentStatus } from '@/data/types'
import { formatTime } from '@/lib/i18n'
import { Kpi, PageHeader, Panel, Segmented, StatusBadge, fmtDate, relTime } from './ui'

const day = (offset: number) => {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return iso(d)
}

export default function Overview() {
  const { db, patch } = useStore()
  const [range, setRange] = useState<'30' | '60' | '90'>('30')
  const today = iso(new Date())

  const m = useMemo(() => {
    const a = db.appointments
    const inRange = (from: number, to: number) => a.filter((x) => x.date >= day(from) && x.date <= day(to))
    const cur = inRange(-29, 0)
    const prev = inRange(-59, -30)
    const done = (l: typeof a) => l.filter((x) => x.status === 'completed').length
    const noShow = (l: typeof a) => l.filter((x) => x.status === 'no-show').length
    const newPts = db.patients.filter((p) => p.createdAt >= day(-29)).length
    const newPtsPrev = db.patients.filter((p) => p.createdAt >= day(-59) && p.createdAt < day(-29)).length
    const web = cur.filter((x) => x.source === 'website').length
    const pct = (x: number, y: number) => (y ? ((x - y) / y) * 100 : 0)
    return {
      todayList: a.filter((x) => x.date === today && x.status !== 'cancelled').sort((x, y) => x.time.localeCompare(y.time)),
      upcoming7: inRange(1, 7).filter((x) => x.status !== 'cancelled').length,
      seen30: done(cur),
      seenDelta: pct(done(cur), done(prev)),
      newPts,
      newPtsDelta: pct(newPts, newPtsPrev),
      noShowRate: cur.length ? (noShow(cur) / Math.max(1, cur.filter((x) => x.date < today).length)) * 100 : 0,
      webShare: cur.length ? (web / cur.length) * 100 : 0,
      pending: a.filter((x) => x.status === 'pending').sort((x, y) => x.date.localeCompare(y.date) || x.time.localeCompare(y.time)),
      followUps: db.patients.filter((p) => p.followUp && p.followUp >= today && p.followUp <= day(7)).sort((x, y) => x.followUp!.localeCompare(y.followUp!)),
      overdue: db.patients.filter((p) => p.followUp && p.followUp < today && p.followUp >= day(-21)).length,
    }
  }, [db, today])

  const series = useMemo(() => {
    const n = Number(range)
    const out: { date: string; label: string; visits: number }[] = []
    for (let i = n - 1; i >= 0; i--) {
      const d = day(-i)
      out.push({
        date: d,
        label: fmtDate(d, { day: 'numeric', month: 'short' }),
        visits: db.appointments.filter((x) => x.date === d && (x.status === 'completed' || (d >= today && x.status === 'confirmed'))).length,
      })
    }
    return out
  }, [db.appointments, range, today])

  const mix = useMemo(() => {
    const cur = db.appointments.filter((x) => x.date >= day(-89) && x.date <= today && x.status !== 'cancelled')
    return db.services
      .map((s) => ({ s, n: cur.filter((x) => x.serviceId === s.id).length }))
      .sort((a, b) => b.n - a.n)
  }, [db, today])
  const mixMax = Math.max(1, ...mix.map((x) => x.n))

  const setStatus = (id: string, status: AppointmentStatus) => patch('appointments', id, { status })
  const hour = new Date().getHours()

  return (
    <>
      <PageHeader
        title={`Good ${hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'}, Dr. Haitham`}
        sub={new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        actions={
          <Link to="/dashboard/appointments" className="btn-primary">
            <CalendarClock size={16} /> Open schedule
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi tone="navy" label="Today" value={m.todayList.length} hint={`${m.upcoming7} booked next 7 days`} icon={<CalendarCheck size={18} strokeWidth={1.8} />} />
        <Kpi label="Seen · 30 days" value={m.seen30} delta={m.seenDelta} hint="vs previous 30" icon={<Users size={18} strokeWidth={1.8} />} />
        <Kpi label="New patients" value={m.newPts} delta={m.newPtsDelta} hint="last 30 days" icon={<UserPlus size={18} strokeWidth={1.8} />} />
        <Kpi label="Booked online" value={`${m.webShare.toFixed(0)}%`} hint={`no-show rate ${m.noShowRate.toFixed(1)}%`} icon={<Globe size={18} strokeWidth={1.8} />} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Patient visits"
          action={<Segmented value={range} onChange={setRange} options={[{ value: '30', label: '30d' }, { value: '60', label: '60d' }, { value: '90', label: '90d' }]} />}
        >
          <div className="h-72" role="img" aria-label={`Patient visits per day over the last ${range} days`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#003478" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#003478" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#E3ECEF" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#4A6D7C', fontSize: 11 }} interval="preserveStartEnd" minTickGap={28} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: '#4A6D7C', fontSize: 11 }} width={40} />
                <Tooltip
                  cursor={{ stroke: '#8DAFBC', strokeWidth: 1 }}
                  contentStyle={{ borderRadius: 14, border: 'none', boxShadow: '0 12px 30px -12px rgba(0,36,90,.35)', fontSize: 12 }}
                  labelStyle={{ color: '#0B1F3A', fontWeight: 600 }}
                  formatter={(v) => [`${v} visits`, '']}
                  separator=""
                />
                <Area type="monotone" dataKey="visits" stroke="#003478" strokeWidth={2} fill="url(#visitsFill)" activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2, fill: '#003478' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Case mix · 90 days">
          <ul className="space-y-3.5">
            {mix.map(({ s, n }) => (
              <li key={s.id} className="group" title={`${s.title.en}: ${n} visits`}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-ink">
                    <ServiceIcon name={s.icon} size={16} className="text-navy" />
                    {s.title.en}
                  </span>
                  <span className="font-semibold text-navy tabular-nums">{n}</span>
                </div>
                <div className="h-2 rounded-full bg-blue-20">
                  <div className="h-2 rounded-full bg-navy transition-all duration-700 group-hover:bg-navy-shadow" style={{ width: `${(n / mixMax) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <Panel className="xl:col-span-2" title={`Today's schedule · ${m.todayList.length}`} action={<Link to="/dashboard/appointments" className="text-sm font-semibold text-navy hover:underline">All appointments</Link>} pad={false}>
          {m.todayList.length === 0 ? (
            <p className="p-6 text-sm text-deep">No appointments today.</p>
          ) : (
            <ul className="divide-y divide-navy/[0.06] p-2">
              {m.todayList.map((a) => {
                const svc = db.services.find((s) => s.id === a.serviceId)
                return (
                  <li key={a.id} className="flex flex-wrap items-center gap-4 rounded-xl px-4 py-3 hover:bg-mist">
                    <span className="w-16 text-sm font-semibold text-navy tabular-nums">{formatTime(a.time, 'en')}</span>
                    <div className="min-w-0 flex-1">
                      {a.patientId ? (
                        <Link to={`/dashboard/patients/${a.patientId}`} className="font-medium text-ink hover:text-navy hover:underline">
                          {a.name}
                        </Link>
                      ) : (
                        <span className="font-medium text-ink">{a.name}</span>
                      )}
                      <p className="text-xs text-deep capitalize">
                        {svc?.title.en} · {a.type.replace('-', ' ')}
                      </p>
                    </div>
                    <StatusBadge status={a.status} />
                    {a.status !== 'completed' && (
                      <button onClick={() => setStatus(a.id, 'completed')} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-navy px-3 text-xs font-semibold text-white hover:bg-navy-shadow">
                        <Check size={14} /> Seen
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </Panel>

        <div className="space-y-4">
          <Panel title={`Requests to confirm · ${m.pending.length}`} pad={false}>
            <ul className="p-2">
              {m.pending.slice(0, 4).map((a) => (
                <li key={a.id} className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-mist">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{a.name}</p>
                    <p className="text-xs text-deep">
                      {fmtDate(a.date, { weekday: 'short', day: 'numeric', month: 'short' })} · {formatTime(a.time, 'en')}
                    </p>
                  </div>
                  <button onClick={() => setStatus(a.id, 'confirmed')} className="h-9 rounded-full bg-blue-20 px-3 text-xs font-semibold text-navy hover:bg-navy hover:text-white">
                    Confirm
                  </button>
                </li>
              ))}
              {m.pending.length === 0 && <p className="p-4 text-sm text-deep">All caught up.</p>}
            </ul>
          </Panel>

          <Panel title="Follow-ups this week" action={m.overdue > 0 ? <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">{m.overdue} overdue</span> : undefined} pad={false}>
            <ul className="p-2">
              {m.followUps.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <Link to={`/dashboard/patients/${p.id}`} className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-mist">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-20 text-xs font-bold text-navy">{p.name.split(' ').map((x) => x[0]).join('')}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{p.name}</p>
                      <p className="truncate text-xs text-deep">{p.conditions[0]}</p>
                    </div>
                    <span className="text-xs font-semibold text-navy">{fmtDate(p.followUp!, { weekday: 'short', day: 'numeric' })}</span>
                  </Link>
                </li>
              ))}
              {m.followUps.length === 0 && <p className="p-4 text-sm text-deep">No follow-ups due.</p>}
            </ul>
          </Panel>

          <Panel title="Latest inquiry" action={<Link to="/dashboard/inquiries" className="text-navy"><ArrowUpRight size={18} /></Link>}>
            {db.inquiries[0] ? (
              <>
                <p className="text-sm leading-relaxed text-ink/80" dir="auto">
                  “{db.inquiries[0].message}”
                </p>
                <p className="mt-3 text-xs text-deep">
                  {db.inquiries[0].name} · {relTime(db.inquiries[0].createdAt)}
                </p>
              </>
            ) : (
              <p className="text-sm text-deep">No inquiries yet.</p>
            )}
          </Panel>
        </div>
      </div>
    </>
  )
}
