import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { ArrowLeft, CalendarPlus, Phone, Plus, Search, Users } from 'lucide-react'
import { uid, useStore } from '@/data/store'
import { iso } from '@/data/seed'
import type { Condition, Patient } from '@/data/types'
import { formatTime } from '@/lib/i18n'
import { Drawer, Empty, Field, PageHeader, Panel, Segmented, StatusBadge, Tag, Toggle, abiBand, age, fmtDate } from './ui'

export const conditions: Condition[] = [
  'Varicose veins',
  'Peripheral arterial disease',
  'Diabetic foot',
  'Deep vein thrombosis',
  'Aortic aneurysm',
  'Dialysis access',
  'Carotid disease',
  'Venous ulcer',
  'Lymphoedema',
]

const ceapClasses = ['C0', 'C1', 'C2', 'C3', 'C4a', 'C4b', 'C4c', 'C5', 'C6']

export default function Patients() {
  const { db, upsert } = useStore()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [cond, setCond] = useState<Condition | 'all'>('all')
  const [risk, setRisk] = useState<'all' | 'pad' | 'diabetic' | 'followup'>('all')
  const [edit, setEdit] = useState<Patient | null>(null)
  const today = iso(new Date())

  const lastVisit = useMemo(() => {
    const m = new Map<string, string>()
    db.appointments.forEach((a) => {
      if (a.patientId && a.status === 'completed' && (m.get(a.patientId) ?? '') < a.date) m.set(a.patientId, a.date)
    })
    return m
  }, [db.appointments])

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return db.patients
      .filter((p) => !s || p.name.toLowerCase().includes(s) || p.phone.replace(/\s/g, '').includes(s.replace(/\s/g, '')))
      .filter((p) => cond === 'all' || p.conditions.includes(cond))
      .filter((p) =>
        risk === 'all' ? true : risk === 'pad' ? Math.min(p.abiLeft ?? 9, p.abiRight ?? 9) < 0.9 : risk === 'diabetic' ? p.diabetic : !!p.followUp && p.followUp <= iso(new Date(Date.now() + 7 * 864e5)),
      )
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [db.patients, q, cond, risk])

  return (
    <>
      <PageHeader
        title="Patients"
        sub={`${db.patients.length} records · ${db.patients.filter((p) => p.followUp && p.followUp < today).length} follow-ups overdue`}
        actions={
          <button
            onClick={() =>
              setEdit({ id: uid('pt'), name: '', phone: '', gender: 'male', dob: '1970-01-01', conditions: [], diabetic: false, smoker: false, notes: '', createdAt: today })
            }
            className="btn-primary"
          >
            <Plus size={16} /> New patient
          </button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Segmented value={risk} onChange={setRisk} options={[{ value: 'all', label: 'All' }, { value: 'pad', label: 'ABI < 0.9' }, { value: 'diabetic', label: 'Diabetic' }, { value: 'followup', label: 'Follow-up due' }]} />
          <select value={cond} onChange={(e) => setCond(e.target.value as Condition | 'all')} className="h-11 rounded-full bg-white px-4 text-sm text-navy ring-1 ring-navy/[0.06] outline-none">
            <option value="all">All conditions</option>
            {conditions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="relative xl:w-72">
          <Search size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-deep" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or phone" className="h-11 w-full rounded-full bg-white pr-4 pl-10 text-sm ring-1 ring-navy/[0.06] outline-none focus:ring-2 focus:ring-navy/30" />
        </div>
      </div>

      <Panel pad={false}>
        {list.length === 0 ? (
          <Empty title="No patients found" icon={<Users size={22} />} />
        ) : (
          <div className="thin-scroll overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="text-left text-xs tracking-wide text-deep uppercase">
                  {['Patient', 'Condition', 'ABI (L / R)', 'Risk', 'Last visit', 'Follow-up'].map((h) => (
                    <th key={h} className="px-5 pt-5 pb-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/[0.06]">
                {list.map((p) => {
                  const worst = Math.min(p.abiLeft ?? 9, p.abiRight ?? 9)
                  const band = abiBand(worst === 9 ? undefined : worst)
                  return (
                    <tr key={p.id} onClick={() => navigate(`/dashboard/patients/${p.id}`)} className="cursor-pointer hover:bg-mist/70">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-20 text-xs font-bold text-navy">
                            {p.name
                              .split(' ')
                              .map((x) => x[0])
                              .join('')}
                          </span>
                          <div>
                            <p className="font-medium text-ink">{p.name}</p>
                            <p className="text-xs text-deep">
                              {p.gender === 'male' ? 'M' : 'F'} · {age(p.dob)} y · <span className="tabular-nums">{p.phone}</span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {p.conditions.map((c) => (
                            <Tag key={c}>{c}</Tag>
                          ))}
                          {p.ceap && <Tag className="bg-blush/40">{p.ceap}</Tag>}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 tabular-nums">
                        <span className="text-ink">
                          {p.abiLeft?.toFixed(2) ?? '—'} / {p.abiRight?.toFixed(2) ?? '—'}
                        </span>
                        <p className={clsx('text-xs font-semibold', band.cls)}>{band.label}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-1">
                          {p.diabetic && <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[11px] font-semibold text-amber-800">DM</span>}
                          {p.smoker && <span className="rounded-md bg-rose-50 px-1.5 py-0.5 text-[11px] font-semibold text-rose-700">Smoker</span>}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-ink/70">{lastVisit.get(p.id) ? fmtDate(lastVisit.get(p.id)!) : '—'}</td>
                      <td className="px-5 py-3.5">
                        {p.followUp ? <span className={clsx('font-medium', p.followUp < today ? 'text-rose-700' : 'text-navy')}>{fmtDate(p.followUp)}</span> : <span className="text-deep">—</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <PatientDrawer
        value={edit}
        onClose={() => setEdit(null)}
        onSave={(p) => {
          upsert('patients', p)
          setEdit(null)
          navigate(`/dashboard/patients/${p.id}`)
        }}
      />
    </>
  )
}

export function PatientDetail() {
  const { id } = useParams()
  const { db, upsert, patch, remove } = useStore()
  const navigate = useNavigate()
  const [edit, setEdit] = useState<Patient | null>(null)
  const [tab, setTab] = useState<'timeline' | 'notes'>('timeline')
  const p = db.patients.find((x) => x.id === id)
  const visits = useMemo(() => db.appointments.filter((a) => a.patientId === id).sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time)), [db.appointments, id])
  const [note, setNote] = useState('')

  if (!p) return <Empty title="Patient not found" sub="It may have been deleted." />

  const left = abiBand(p.abiLeft)
  const right = abiBand(p.abiRight)

  return (
    <>
      <Link to="/dashboard/patients" className="mb-6 inline-flex items-center gap-2 text-sm text-deep hover:text-navy">
        <ArrowLeft size={16} /> All patients
      </Link>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4">
          <div className="on-navy relative overflow-hidden rounded-[22px] bg-navy p-6 text-white">
            <div className="pattern-tree-navy absolute inset-0 opacity-60" />
            <div className="relative">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-lg font-bold">
                {p.name
                  .split(' ')
                  .map((x) => x[0])
                  .join('')}
              </span>
              <h1 className="mt-5 text-2xl font-bold">{p.name}</h1>
              <p className="mt-1 text-sm text-white/70">
                {p.gender === 'male' ? 'Male' : 'Female'} · {age(p.dob)} years · since {fmtDate(p.createdAt, { month: 'short', year: 'numeric' })}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={`tel:${p.phone.replace(/\s/g, '')}`} className="btn h-10 bg-white px-4 text-navy">
                  <Phone size={15} /> {p.phone}
                </a>
                <button onClick={() => setEdit(p)} className="btn-ghost-light h-10 px-4">
                  Edit
                </button>
              </div>
            </div>
          </div>

          <Panel title="Vascular profile">
            <dl className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-mist p-4">
                <dt className="text-xs font-semibold text-deep uppercase">ABI left</dt>
                <dd className="mt-1 text-2xl font-bold text-navy tabular-nums">{p.abiLeft?.toFixed(2) ?? '—'}</dd>
                <dd className={clsx('text-xs font-semibold', left.cls)}>{left.label}</dd>
              </div>
              <div className="rounded-2xl bg-mist p-4">
                <dt className="text-xs font-semibold text-deep uppercase">ABI right</dt>
                <dd className="mt-1 text-2xl font-bold text-navy tabular-nums">{p.abiRight?.toFixed(2) ?? '—'}</dd>
                <dd className={clsx('text-xs font-semibold', right.cls)}>{right.label}</dd>
              </div>
              <div className="col-span-2 flex flex-wrap gap-1.5">
                {p.conditions.map((c) => (
                  <Tag key={c}>{c}</Tag>
                ))}
                {p.ceap && <Tag className="bg-blush/40">CEAP {p.ceap}</Tag>}
                {p.diabetic && <Tag className="bg-amber-50 text-amber-800">Diabetic</Tag>}
                {p.smoker && <Tag className="bg-rose-50 text-rose-700">Smoker</Tag>}
              </div>
            </dl>
          </Panel>

          <Panel title="Next follow-up">
            <div className="flex items-center gap-3">
              <input type="date" className="field" value={p.followUp ?? ''} onChange={(e) => patch('patients', p.id, { followUp: e.target.value || undefined })} />
              <Link to="/dashboard/appointments" className="btn-primary h-12 shrink-0 px-4" title="Schedule">
                <CalendarPlus size={16} />
              </Link>
            </div>
            <p className="mt-3 text-xs text-deep">Continuity — every patient leaves with a next step.</p>
          </Panel>
        </div>

        <Panel className="xl:col-span-2" title={<Segmented value={tab} onChange={setTab} options={[{ value: 'timeline', label: 'Visits', count: visits.length }, { value: 'notes', label: 'Clinical notes' }]} />}>
          {tab === 'timeline' ? (
            visits.length === 0 ? (
              <Empty title="No visits yet" />
            ) : (
              <ol className="relative space-y-1 before:absolute before:top-3 before:bottom-3 before:left-[19px] before:w-px before:bg-blue-40">
                {visits.map((a) => (
                  <li key={a.id} className="relative flex gap-4 rounded-xl py-3 pr-3">
                    <span className={clsx('relative z-10 mt-1 h-10 w-10 shrink-0 rounded-full ring-4 ring-white', a.status === 'completed' ? 'bg-navy' : a.status === 'confirmed' || a.status === 'pending' ? 'bg-vessel' : 'bg-blue-40')} />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-ink">{db.services.find((s) => s.id === a.serviceId)?.title.en}</p>
                        <StatusBadge status={a.status} />
                      </div>
                      <p className="text-sm text-deep capitalize">
                        {fmtDate(a.date, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })} · {formatTime(a.time, 'en')} · {a.type.replace('-', ' ')}
                      </p>
                      {a.notes && (
                        <p className="mt-1 text-sm text-ink/70" dir="auto">
                          {a.notes}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )
          ) : (
            <div>
              <textarea className="field min-h-28" placeholder="Add a clinical note (findings, plan, Doppler result…)" value={note} onChange={(e) => setNote(e.target.value)} dir="auto" />
              <div className="mt-2 flex justify-end">
                <button
                  disabled={!note.trim()}
                  onClick={() => {
                    const stamp = new Date().toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                    patch('patients', p.id, { notes: `[${stamp}] ${note.trim()}\n\n${p.notes}`.trim() })
                    setNote('')
                  }}
                  className="btn-primary disabled:opacity-40"
                >
                  Add note
                </button>
              </div>
              <div className="mt-6 space-y-3">
                {p.notes ? (
                  p.notes.split('\n\n').map((n, i) => (
                    <p key={i} className="rounded-2xl bg-mist p-4 text-sm leading-relaxed whitespace-pre-wrap text-ink/80" dir="auto">
                      {n}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-deep">No notes yet.</p>
                )}
              </div>
            </div>
          )}
        </Panel>
      </div>

      <PatientDrawer
        value={edit}
        onClose={() => setEdit(null)}
        onSave={(np) => {
          upsert('patients', np)
          setEdit(null)
        }}
        onDelete={(pid) => {
          remove('patients', pid)
          navigate('/dashboard/patients')
        }}
      />
    </>
  )
}

function PatientDrawer({ value, onClose, onSave, onDelete }: { value: Patient | null; onClose: () => void; onSave: (p: Patient) => void; onDelete?: (id: string) => void }) {
  const [d, setD] = useState<Patient | null>(value)
  const [prev, setPrev] = useState(value)
  if (value !== prev) {
    setPrev(value)
    setD(value)
  }
  const set = (c: Partial<Patient>) => setD((x) => (x ? { ...x, ...c } : x))
  const num = (v: string) => (v === '' ? undefined : Number(v))

  return (
    <Drawer
      open={!!value}
      onClose={onClose}
      title={value?.name ? 'Edit patient' : 'New patient'}
      footer={
        d && (
          <>
            {onDelete && (
              <button onClick={() => confirm('Delete this patient record?') && onDelete(d.id)} className="btn mr-auto text-rose-700 hover:bg-rose-50">
                Delete
              </button>
            )}
            <button onClick={onClose} className="btn text-navy hover:bg-blue-20">
              Cancel
            </button>
            <button onClick={() => d.name.trim() && onSave(d)} disabled={!d.name.trim()} className="btn-primary disabled:opacity-40">
              Save
            </button>
          </>
        )
      }
    >
      {d && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" className="sm:col-span-2">
            <input className="field" value={d.name} onChange={(e) => set({ name: e.target.value })} />
          </Field>
          <Field label="Phone">
            <input className="field" value={d.phone} onChange={(e) => set({ phone: e.target.value })} />
          </Field>
          <Field label="Email">
            <input className="field" value={d.email ?? ''} onChange={(e) => set({ email: e.target.value || undefined })} />
          </Field>
          <Field label="Gender">
            <select className="field" value={d.gender} onChange={(e) => set({ gender: e.target.value as Patient['gender'] })}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </Field>
          <Field label="Date of birth">
            <input type="date" className="field" value={d.dob} onChange={(e) => set({ dob: e.target.value })} />
          </Field>
          <Field label="Conditions" className="sm:col-span-2">
            <div className="flex flex-wrap gap-2">
              {conditions.map((c) => {
                const on = d.conditions.includes(c)
                return (
                  <button
                    type="button"
                    key={c}
                    onClick={() => set({ conditions: on ? d.conditions.filter((x) => x !== c) : [...d.conditions, c] })}
                    className={clsx('rounded-full px-3 py-1.5 text-xs font-semibold transition', on ? 'bg-navy text-white' : 'bg-blue-20 text-navy hover:bg-blue-40')}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </Field>
          <Field label="ABI left" hint="Ankle ÷ highest brachial systolic">
            <input type="number" step="0.01" min="0" max="2" className="field" value={d.abiLeft ?? ''} onChange={(e) => set({ abiLeft: num(e.target.value) })} />
          </Field>
          <Field label="ABI right">
            <input type="number" step="0.01" min="0" max="2" className="field" value={d.abiRight ?? ''} onChange={(e) => set({ abiRight: num(e.target.value) })} />
          </Field>
          <Field label="CEAP class (venous)">
            <select className="field" value={d.ceap ?? ''} onChange={(e) => set({ ceap: e.target.value || undefined })}>
              <option value="">—</option>
              {ceapClasses.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Follow-up date">
            <input type="date" className="field" value={d.followUp ?? ''} onChange={(e) => set({ followUp: e.target.value || undefined })} />
          </Field>
          <div className="flex gap-6 sm:col-span-2">
            <Toggle checked={d.diabetic} onChange={(v) => set({ diabetic: v })} label="Diabetic" />
            <Toggle checked={d.smoker} onChange={(v) => set({ smoker: v })} label="Smoker" />
          </div>
        </div>
      )}
    </Drawer>
  )
}
