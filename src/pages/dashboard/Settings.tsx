import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { Plus, RotateCcw, Trash2 } from 'lucide-react'
import { uid, useStore } from '@/data/store'
import type { Branch, Settings, Stat } from '@/data/types'
import { dayNames } from '@/lib/i18n'
import { WEEK } from '@/lib/contact'
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
  const setStat = (i: number, s: Partial<Stat>) => set('stats', draft.stats.map((x, j) => (j === i ? { ...x, ...s } : x)))
  const setBranch = (i: number, b: Partial<Branch>) => set('branches', draft.branches.map((x, j) => (j === i ? { ...x, ...b } : x)))

  function save() {
    updateSettings(draft)
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <>
      <PageHeader
        title="Settings"
        sub="Clinic details, clinics and their days, and the content the website shows. Changes go live when you save."
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

        <Panel title="Phone, WhatsApp & email">
          <div className="space-y-4">
            <PhoneList label="Clinic phone numbers" hint="Shown in the header, footer, Contact page and the floating Call button" phones={draft.phones} onChange={(v) => set('phones', v)} />
            <Field label="Clinic WhatsApp" hint="Every booking and message from the website is sent here. International format, digits only, e.g. 2010…">
              <input className="field" inputMode="numeric" value={draft.whatsapp} onChange={(e) => set('whatsapp', e.target.value.replace(/\D/g, ''))} />
            </Field>
            <Field label="Email">
              <input className="field" type="email" value={draft.email} onChange={(e) => set('email', e.target.value)} />
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

        <Panel title="Announcement bar">
          <div className="space-y-4">
            <Toggle checked={draft.announcementOn} onChange={(v) => set('announcementOn', v)} label={draft.announcementOn ? 'Shown on the website' : 'Hidden'} />
            <div className={clsx(!draft.announcementOn && 'opacity-50')}>
              <BilingualField label="Announcement" value={draft.announcement} onChange={(v) => set('announcement', v)} />
            </div>
          </div>
        </Panel>

        <Panel
          title="Clinics"
          className="xl:col-span-2"
          action={
            <button className="inline-flex h-9 items-center gap-1.5 rounded-full bg-blue-20 px-4 text-xs font-semibold text-navy hover:bg-blue-40" onClick={() => set('branches', [...draft.branches, { id: uid('br'), name: { en: '', ar: '' }, address: { en: '', ar: '' }, days: [], from: '16:00', phones: [], mapUrl: '' }])}>
              <Plus size={14} /> Add clinic
            </button>
          }
        >
          <p className="-mt-2 mb-5 text-xs text-deep">Each clinic appears on the Contact page with its days, in the footer and in the booking form. Patients choose the clinic when they book.</p>
          <div className="space-y-5">
            {draft.branches.map((b, i) => (
              <div key={b.id} className="space-y-4 rounded-2xl bg-mist p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-navy">Clinic {i + 1}</p>
                  {draft.branches.length > 1 && (
                    <button onClick={() => confirm('Remove this clinic?') && set('branches', draft.branches.filter((_, j) => j !== i))} className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-rose-700 hover:bg-rose-50">
                      <Trash2 size={14} /> Remove
                    </button>
                  )}
                </div>
                <BilingualField label="Clinic name" value={b.name} onChange={(v) => setBranch(i, { name: v })} />
                <BilingualField label="Address" value={b.address} onChange={(v) => setBranch(i, { address: v })} />
                <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                  <div>
                    <span className="mb-1.5 block text-xs font-semibold tracking-wide text-deep uppercase">Clinic days</span>
                    <div className="flex flex-wrap gap-2">
                      {WEEK.map((d) => {
                        const on = b.days.includes(d)
                        return (
                          <button
                            key={d}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setBranch(i, { days: on ? b.days.filter((x) => x !== d) : [...b.days, d] })}
                            className={clsx('h-10 rounded-full px-4 text-sm font-semibold transition-colors', on ? 'bg-navy text-white' : 'bg-white text-navy ring-1 ring-navy/10 hover:bg-blue-20')}
                          >
                            {dayNames[d].en}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <Field label="Starts at">
                    <input type="time" className="field w-auto" value={b.from} onChange={(e) => setBranch(i, { from: e.target.value })} />
                  </Field>
                </div>
                <Field label="Google Maps link" hint="In Google Maps: Share → Copy link, then paste it here">
                  <input className="field" type="url" dir="ltr" placeholder="https://maps.app.goo.gl/…" value={b.mapUrl} onChange={(e) => setBranch(i, { mapUrl: e.target.value })} />
                </Field>
                <PhoneList label="This clinic's own numbers (optional)" hint="Only if this location has a number of its own; otherwise patients see the clinic phone numbers" phones={b.phones} onChange={(v) => setBranch(i, { phones: v })} optional />
              </div>
            ))}
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
            <p className="max-w-xl text-sm text-deep">Data lives in this browser until the dashboard is connected to a server. Resetting restores the sample services, articles, reviews and settings.</p>
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

/** Editable list of phone numbers; optional lists may be empty */
function PhoneList({ label, hint, phones, onChange, optional }: { label: string; hint?: string; phones: string[]; onChange: (v: string[]) => void; optional?: boolean }) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-deep uppercase">{label}</span>
      <div className="space-y-2">
        {phones.map((ph, k) => (
          <div key={k} className="flex gap-2">
            <input className="field" dir="ltr" inputMode="tel" placeholder="010 0000 0000" value={ph} aria-label={`${label} ${k + 1}`} onChange={(e) => onChange(phones.map((x, m) => (m === k ? e.target.value : x)))} />
            {(optional || phones.length > 1) && (
              <button onClick={() => onChange(phones.filter((_, m) => m !== k))} className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-rose-700 hover:bg-rose-50" aria-label="Remove number">
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => onChange([...phones, ''])} className="mt-2 inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-navy hover:bg-blue-20">
        <Plus size={14} /> Add number
      </button>
      {hint && <span className="mt-1 block text-xs text-deep/80">{hint}</span>}
    </div>
  )
}
