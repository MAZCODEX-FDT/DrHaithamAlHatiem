import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { Plus, RotateCcw, Trash2 } from 'lucide-react'
import { uid, useStore } from '@/data/store'
import type { Hours, Settings, Stat } from '@/data/types'
import { dayNames } from '@/lib/i18n'
import { BilingualField, Field, PageHeader, Panel, Toggle } from './ui'

/**
 * Everything the public site reads from `settings`. Edits are held in a draft
 * and only reach the website on Save, so a half-typed phone number never goes live.
 */
export default function SettingsPage() {
  const { db, updateSettings, reset } = useStore()
  const [draft, setDraft] = useState<Settings>(db.settings)
  const [saved, setSaved] = useState(false)
  const dirty = JSON.stringify(draft) !== JSON.stringify(db.settings)

  // settings changed underneath us (reset, another tab) — follow them unless we have unsaved edits
  const synced = useRef(db.settings)
  useEffect(() => {
    if (JSON.stringify(draft) === JSON.stringify(synced.current)) setDraft(db.settings)
    synced.current = db.settings
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db.settings])

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setDraft((d) => ({ ...d, [k]: v }))
  const setDoctor = (k: keyof Settings['doctor'], v: Settings['doctor'][typeof k]) => setDraft((d) => ({ ...d, doctor: { ...d.doctor, [k]: v } }))
  const setHours = (i: number, h: Partial<Hours>) => set('hours', draft.hours.map((x, j) => (j === i ? { ...x, ...h } : x)))
  const setStat = (i: number, s: Partial<Stat>) => set('stats', draft.stats.map((x, j) => (j === i ? { ...x, ...s } : x)))

  function save() {
    updateSettings(draft)
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <>
      <PageHeader
        title="Settings"
        sub="Clinic details, hours and the content the website shows. Changes go live when you save."
        actions={
          <>
            {dirty && (
              <button className="btn-secondary" onClick={() => setDraft(db.settings)}>
                Discard
              </button>
            )}
            <button className="btn-primary" disabled={!dirty} onClick={save}>
              {saved ? 'Saved ✓' : 'Save changes'}
            </button>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Doctor profile" className="xl:col-span-2">
          <div className="space-y-5">
            <BilingualField label="Name" value={draft.doctor.name} onChange={(v) => setDoctor('name', v)} />
            <BilingualField label="Title" value={draft.doctor.title} onChange={(v) => setDoctor('title', v)} />
            <BilingualField label="Credentials" value={draft.doctor.credentials} onChange={(v) => setDoctor('credentials', v)} />
            <BilingualField label="Biography" value={draft.doctor.bio} onChange={(v) => setDoctor('bio', v)} multiline rows={5} />
          </div>
        </Panel>

        <Panel title="Contact">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone">
              <input className="field" value={draft.phone} onChange={(e) => set('phone', e.target.value)} />
            </Field>
            <Field label="WhatsApp" hint="International format, digits only — e.g. 2010…">
              <input className="field" inputMode="numeric" value={draft.whatsapp} onChange={(e) => set('whatsapp', e.target.value.replace(/\D/g, ''))} />
            </Field>
            <Field label="Email" className="sm:col-span-2">
              <input className="field" type="email" value={draft.email} onChange={(e) => set('email', e.target.value)} />
            </Field>
            <div className="sm:col-span-2">
              <BilingualField label="Address" value={draft.address} onChange={(v) => set('address', v)} />
            </div>
            <Field label="Map search" hint="What Google Maps should search for the embedded map" className="sm:col-span-2">
              <input className="field" value={draft.mapQuery} onChange={(e) => set('mapQuery', e.target.value)} />
            </Field>
          </div>
        </Panel>

        <Panel title="Social links">
          <div className="space-y-4">
            {(['instagram', 'facebook', 'google'] as const).map((k) => (
              <Field key={k} label={k === 'google' ? 'Google Business' : k[0].toUpperCase() + k.slice(1)}>
                <input className="field" type="url" value={draft.social[k]} onChange={(e) => set('social', { ...draft.social, [k]: e.target.value })} />
              </Field>
            ))}
          </div>
        </Panel>

        <Panel title="Clinic hours">
          <ul className="divide-y divide-navy/[0.06]">
            {draft.hours.map((h, i) => (
              <li key={h.day} className="flex flex-wrap items-center gap-3 py-3">
                <span className="w-24 text-sm font-semibold text-navy">{dayNames[h.day].en}</span>
                <Toggle checked={!h.closed} onChange={(v) => setHours(i, { closed: !v })} />
                {h.closed ? (
                  <span className="text-sm text-deep">Closed</span>
                ) : (
                  <>
                    <input type="time" className="field w-auto py-2" value={h.open} onChange={(e) => setHours(i, { open: e.target.value })} aria-label={`${dayNames[h.day].en} opens`} />
                    <span className="text-deep">–</span>
                    <input type="time" className="field w-auto py-2" value={h.close} onChange={(e) => setHours(i, { close: e.target.value })} aria-label={`${dayNames[h.day].en} closes`} />
                    <label className="ml-auto flex items-center gap-2 text-xs text-deep">
                      <input type="checkbox" checked={!!h.byAppointment} onChange={(e) => setHours(i, { byAppointment: e.target.checked })} className="accent-navy" />
                      By appointment
                    </label>
                  </>
                )}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Online booking">
          <div className="space-y-6">
            <Toggle checked={draft.bookingOpen} onChange={(v) => set('bookingOpen', v)} label={draft.bookingOpen ? 'Patients can book on the website' : 'Online booking is paused'} />
            <Field label="Appointment length" hint="Sets the slots offered on the booking page">
              <div className="flex flex-wrap gap-2">
                {[15, 20, 30, 45].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => set('slotMinutes', m)}
                    className={clsx('h-11 rounded-full px-5 text-sm font-semibold transition', draft.slotMinutes === m ? 'bg-navy text-white' : 'bg-blue-20 text-navy hover:bg-blue-40')}
                  >
                    {m} min
                  </button>
                ))}
              </div>
            </Field>
            <div className="border-t border-navy/[0.06] pt-6">
              <Toggle checked={draft.announcementOn} onChange={(v) => set('announcementOn', v)} label="Announcement bar" />
              <div className={clsx('mt-4', !draft.announcementOn && 'opacity-50')}>
                <BilingualField label="Announcement" value={draft.announcement} onChange={(v) => set('announcement', v)} />
              </div>
            </div>
          </div>
        </Panel>

        <Panel
          title="Homepage figures"
          className="xl:col-span-2"
          action={
            draft.stats.length < 6 && (
              <button className="inline-flex h-9 items-center gap-1.5 rounded-full bg-blue-20 px-4 text-xs font-semibold text-navy hover:bg-blue-40" onClick={() => set('stats', [...draft.stats, { id: uid('st'), value: 0, suffix: '', label: { en: '', ar: '' } }])}>
                <Plus size={14} /> Add figure
              </button>
            )
          }
        >
          <p className="-mt-2 mb-5 text-xs text-deep">Only publish figures you can stand behind — they are claims to patients.</p>
          <div className="space-y-5">
            {draft.stats.map((s, i) => (
              <div key={s.id} className="grid items-end gap-3 rounded-2xl bg-mist p-4 md:grid-cols-[110px_110px_1fr_auto]">
                <Field label="Value">
                  <input className="field" type="number" min={0} value={s.value} onChange={(e) => setStat(i, { value: Number(e.target.value) })} />
                </Field>
                <Field label="Suffix">
                  <input className="field" value={s.suffix} placeholder="+, %, min" onChange={(e) => setStat(i, { suffix: e.target.value })} />
                </Field>
                <BilingualField label="Label" value={s.label} onChange={(v) => setStat(i, { label: v })} />
                <button onClick={() => set('stats', draft.stats.filter((_, j) => j !== i))} className="grid h-11 w-11 place-items-center rounded-full text-rose-700 hover:bg-rose-50" aria-label="Remove figure">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Demo data" className="xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-xl text-sm text-deep">Data lives in this browser until the dashboard is connected to a server. Resetting restores the sample services, articles, patients and appointments.</p>
            <button
              className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-rose-700 ring-1 ring-rose-200 hover:bg-rose-50"
              onClick={() => {
                if (confirm('Erase all changes and restore the sample data?')) reset()
              }}
            >
              <RotateCcw size={15} /> Reset demo data
            </button>
          </div>
        </Panel>
      </div>
    </>
  )
}
