import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { useStore } from '@/data/store'
import { PageHeader, Panel, Field, abiBand } from './ui'

/**
 * Bedside calculators for the vascular clinic. They support — never replace —
 * clinical judgement, and say so on screen.
 */
export default function Tools() {
  return (
    <>
      <PageHeader title="Vascular tools" sub="Quick calculators for the consultation room. Results support clinical judgement; they don't replace it." />
      <div className="grid gap-6 xl:grid-cols-2">
        <AbiCalculator />
        <WellsScore />
        <CeapReference />
      </div>
    </>
  )
}

/* ───────────── Ankle–brachial index ───────────── */

function AbiCalculator() {
  const { db, patch } = useStore()
  const [p, setP] = useState({ armL: '', armR: '', ankL: '', ankR: '' })
  const [patientId, setPatientId] = useState('')
  const [saved, setSaved] = useState(false)

  const n = (s: string) => (s.trim() === '' ? NaN : Number(s))
  // ABI uses the higher of the two brachial pressures as the denominator
  const brachial = Math.max(n(p.armL) || 0, n(p.armR) || 0)
  const abi = (ankle: number) => (brachial > 0 && ankle > 0 ? Math.round((ankle / brachial) * 100) / 100 : undefined)
  const left = abi(n(p.ankL))
  const right = abi(n(p.ankR))

  const input = (k: keyof typeof p, label: string) => (
    <Field label={label}>
      <div className="relative">
        <input className="field pe-14 tabular-nums" inputMode="numeric" value={p[k]} onChange={(e) => setP({ ...p, [k]: e.target.value.replace(/[^\d]/g, '') })} placeholder="—" />
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs text-deep">mmHg</span>
      </div>
    </Field>
  )

  return (
    <Panel title="Ankle–brachial index (ABI)">
      <p className="-mt-2 mb-5 text-xs text-deep">Systolic pressures. Use the higher ankle pressure (DP or PT) per leg; the higher arm pressure is used for both legs.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {input('armR', 'Right arm')}
        {input('armL', 'Left arm')}
        {input('ankR', 'Right ankle')}
        {input('ankL', 'Left ankle')}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          { side: 'Right leg', v: right },
          { side: 'Left leg', v: left },
        ].map(({ side, v }) => {
          const band = abiBand(v)
          return (
            <div key={side} className="rounded-2xl bg-mist p-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-deep uppercase">{side}</p>
              <p className="mt-2 text-4xl font-bold tracking-tight text-navy tabular-nums">{v?.toFixed(2) ?? '—'}</p>
              <p className={clsx('mt-1 text-sm font-semibold', band.cls)}>{band.label}</p>
            </div>
          )
        })}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-deep">&gt;1.40 non-compressible (consider TBI) · 1.00–1.40 normal · 0.91–0.99 borderline · 0.70–0.90 mild · 0.40–0.69 moderate · &lt;0.40 severe</p>

      <div className="mt-6 flex flex-wrap items-end gap-3 border-t border-navy/[0.06] pt-6">
        <Field label="Save to patient" className="min-w-0 flex-1">
          <select className="field" value={patientId} onChange={(e) => setPatientId(e.target.value)}>
            <option value="">Choose a patient…</option>
            {[...db.patients]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((pt) => (
                <option key={pt.id} value={pt.id}>
                  {pt.name}
                </option>
              ))}
          </select>
        </Field>
        <button
          className="btn-primary"
          disabled={!patientId || (left === undefined && right === undefined)}
          onClick={() => {
            patch('patients', patientId, { ...(left !== undefined && { abiLeft: left }), ...(right !== undefined && { abiRight: right }) })
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
          }}
        >
          {saved ? 'Saved ✓' : 'Save ABI'}
        </button>
      </div>
    </Panel>
  )
}

/* ───────────── Wells score for DVT ───────────── */

const wellsCriteria = [
  { id: 'cancer', label: 'Active cancer (treatment within 6 months or palliative)', pts: 1 },
  { id: 'paralysis', label: 'Paralysis, paresis or recent plaster cast of the leg', pts: 1 },
  { id: 'bed', label: 'Bedridden > 3 days, or major surgery within 12 weeks', pts: 1 },
  { id: 'tender', label: 'Localised tenderness along the deep venous system', pts: 1 },
  { id: 'swollen', label: 'Entire leg swollen', pts: 1 },
  { id: 'calf', label: 'Calf swelling > 3 cm compared with the other leg', pts: 1 },
  { id: 'pitting', label: 'Pitting oedema confined to the symptomatic leg', pts: 1 },
  { id: 'collateral', label: 'Collateral superficial veins (non-varicose)', pts: 1 },
  { id: 'previous', label: 'Previously documented DVT', pts: 1 },
  { id: 'alt', label: 'Alternative diagnosis at least as likely as DVT', pts: -2 },
]

function WellsScore() {
  const [on, setOn] = useState<Set<string>>(new Set())
  const score = useMemo(() => wellsCriteria.reduce((s, c) => s + (on.has(c.id) ? c.pts : 0), 0), [on])
  const likely = score >= 2
  const toggle = (id: string) =>
    setOn((s) => {
      const n = new Set(s)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  return (
    <Panel title="Wells score — DVT" action={on.size > 0 && <button onClick={() => setOn(new Set())} className="text-xs font-semibold text-deep hover:text-navy">Clear</button>}>
      <ul className="-mt-1 space-y-1">
        {wellsCriteria.map((c) => (
          <li key={c.id}>
            <label className={clsx('flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition', on.has(c.id) ? 'bg-blue-20' : 'hover:bg-mist')}>
              <input type="checkbox" checked={on.has(c.id)} onChange={() => toggle(c.id)} className="h-4 w-4 shrink-0 accent-navy" />
              <span className="flex-1 text-sm text-ink">{c.label}</span>
              <span className={clsx('text-xs font-bold tabular-nums', c.pts < 0 ? 'text-rose-700' : 'text-navy')}>{c.pts > 0 ? `+${c.pts}` : c.pts}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className={clsx('mt-5 flex items-center gap-5 rounded-2xl p-5', likely ? 'bg-navy text-white' : 'bg-mist')}>
        <p className={clsx('text-5xl font-bold tabular-nums', likely ? 'text-white' : 'text-navy')}>{score}</p>
        <div>
          <p className="font-semibold">{likely ? 'DVT likely' : 'DVT unlikely'}</p>
          <p className={clsx('text-sm', likely ? 'text-white/70' : 'text-deep')}>{likely ? 'Proximal leg vein duplex ultrasound.' : 'D-dimer; scan if positive.'}</p>
        </div>
      </div>
    </Panel>
  )
}

/* ───────────── CEAP clinical class ───────────── */

const ceap = [
  { c: 'C0', label: 'No visible or palpable signs of venous disease' },
  { c: 'C1', label: 'Telangiectasias or reticular veins' },
  { c: 'C2', label: 'Varicose veins (≥ 3 mm diameter)' },
  { c: 'C3', label: 'Oedema' },
  { c: 'C4a', label: 'Pigmentation or eczema' },
  { c: 'C4b', label: 'Lipodermatosclerosis or atrophie blanche' },
  { c: 'C4c', label: 'Corona phlebectatica' },
  { c: 'C5', label: 'Healed venous ulcer' },
  { c: 'C6', label: 'Active venous ulcer' },
]

function CeapReference() {
  const { db } = useStore()
  const counts = useMemo(() => {
    const m: Record<string, number> = {}
    db.patients.forEach((p) => p.ceap && (m[p.ceap] = (m[p.ceap] ?? 0) + 1))
    return m
  }, [db.patients])
  const max = Math.max(1, ...Object.values(counts))

  return (
    <Panel title="CEAP clinical classification" className="xl:col-span-2">
      <p className="-mt-2 mb-5 text-xs text-deep">2020 revision. Bars show how many of your patients are recorded in each class.</p>
      <ul className="grid gap-x-8 gap-y-1 md:grid-cols-2">
        {ceap.map(({ c, label }) => {
          const n = counts[c] ?? 0
          return (
            <li key={c} className="flex items-center gap-4 border-b border-navy/[0.06] py-3">
              <span className="w-12 shrink-0 rounded-lg bg-navy py-1 text-center text-xs font-bold text-white">{c}</span>
              <span className="flex-1 text-sm text-ink">{label}</span>
              <span className="flex w-24 shrink-0 items-center gap-2">
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-blue-20">
                  <span className="block h-full rounded-full bg-navy" style={{ width: `${(n / max) * 100}%` }} />
                </span>
                <span className="w-5 text-right text-xs text-deep tabular-nums">{n}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}
