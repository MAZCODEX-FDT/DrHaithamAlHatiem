import { useState } from 'react'
import clsx from 'clsx'
import { ArrowDown, ArrowUp, ExternalLink, Plus, Trash2 } from 'lucide-react'
import { ServiceIcon } from '@/components/brand/Icons'
import { uid, useStore } from '@/data/store'
import type { IconKey, L, Service } from '@/data/types'
import { BilingualField, Drawer, Field, PageHeader, Toggle } from './ui'
import { withBase } from '@/lib/base'

const icons: IconKey[] = ['varicose', 'arterial', 'diabetic', 'doppler', 'flow', 'endovascular', 'heart', 'shield', 'dialysis', 'aneurysm', 'dvt', 'spider']
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const emptyL = (): L => ({ en: '', ar: '' })

export default function ServicesCms() {
  const { db, upsert, patch, remove } = useStore()
  const [edit, setEdit] = useState<Service | null>(null)
  const sorted = [...db.services].sort((a, b) => a.order - b.order)

  function move(i: number, dir: -1 | 1) {
    const a = sorted[i]
    const b = sorted[i + dir]
    if (!a || !b) return
    patch('services', a.id, { order: b.order })
    patch('services', b.id, { order: a.order })
  }

  return (
    <>
      <PageHeader
        title="Services"
        sub="What patients see on the website — edits go live immediately."
        actions={
          <button
            className="btn-primary"
            onClick={() =>
              setEdit({
                id: uid('svc'),
                slug: '',
                icon: 'flow',
                title: emptyL(),
                short: emptyL(),
                body: emptyL(),
                symptoms: [emptyL()],
                treatments: [emptyL()],
                duration: emptyL(),
                featured: false,
                active: true,
                order: (sorted.at(-1)?.order ?? 0) + 1,
              })
            }
          >
            <Plus size={16} /> New service
          </button>
        }
      />

      <ul className="space-y-2">
        {sorted.map((s, i) => (
          <li key={s.id} className={clsx('flex flex-wrap items-center gap-4 rounded-[20px] bg-white p-4 ring-1 ring-navy/[0.06]', !s.active && 'opacity-60')}>
            <div className="flex flex-col">
              <button onClick={() => move(i, -1)} disabled={i === 0} className="grid h-6 w-6 place-items-center rounded text-deep hover:bg-blue-20 disabled:opacity-30" aria-label="Move up">
                <ArrowUp size={14} />
              </button>
              <button onClick={() => move(i, 1)} disabled={i === sorted.length - 1} className="grid h-6 w-6 place-items-center rounded text-deep hover:bg-blue-20 disabled:opacity-30" aria-label="Move down">
                <ArrowDown size={14} />
              </button>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-20 text-navy">
              <ServiceIcon name={s.icon} size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-navy">
                {s.title.en} <span className="ml-2 font-normal text-deep" style={{ fontFamily: 'var(--font-arabic)' }}>{s.title.ar}</span>
              </p>
              <p className="truncate text-sm text-deep">{s.short.en}</p>
            </div>
            <Toggle checked={s.active} onChange={(v) => patch('services', s.id, { active: v })} label={s.active ? 'Live' : 'Hidden'} />
            <a href={withBase(`/services/${s.slug}`)} target="_blank" className="grid h-10 w-10 place-items-center rounded-full text-navy hover:bg-blue-20" aria-label="View on site">
              <ExternalLink size={16} />
            </a>
            <button onClick={() => setEdit(s)} className="btn h-10 bg-blue-20 px-4 text-navy hover:bg-blue-40">
              Edit
            </button>
          </li>
        ))}
      </ul>

      <ServiceDrawer
        value={edit}
        onClose={() => setEdit(null)}
        onSave={(s) => {
          upsert('services', { ...s, slug: s.slug || slugify(s.title.en) || s.id })
          setEdit(null)
        }}
        onDelete={(id) => {
          remove('services', id)
          setEdit(null)
        }}
        isNew={!!edit && !db.services.some((s) => s.id === edit.id)}
      />
    </>
  )
}

function ListEditor({ label, items, onChange }: { label: string; items: L[]; onChange: (v: L[]) => void }) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-semibold tracking-wide text-deep uppercase">{label}</span>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2">
            <input className="field" placeholder="English" value={it.en} onChange={(e) => onChange(items.map((x, j) => (j === i ? { ...x, en: e.target.value } : x)))} />
            <input className="field" placeholder="العربية" dir="rtl" style={{ fontFamily: 'var(--font-arabic)' }} value={it.ar} onChange={(e) => onChange(items.map((x, j) => (j === i ? { ...x, ar: e.target.value } : x)))} />
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-rose-700 hover:bg-rose-50" aria-label="Remove">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...items, emptyL()])} className="text-sm font-semibold text-navy hover:underline">
          + Add line
        </button>
      </div>
    </div>
  )
}

function ServiceDrawer({ value, onClose, onSave, onDelete, isNew }: { value: Service | null; onClose: () => void; onSave: (s: Service) => void; onDelete: (id: string) => void; isNew: boolean }) {
  const [d, setD] = useState<Service | null>(value)
  const [prev, setPrev] = useState(value)
  if (value !== prev) {
    setPrev(value)
    setD(value)
  }
  const set = (c: Partial<Service>) => setD((x) => (x ? { ...x, ...c } : x))

  return (
    <Drawer
      wide
      open={!!value}
      onClose={onClose}
      title={isNew ? 'New service' : 'Edit service'}
      footer={
        d && (
          <>
            {!isNew && (
              <button onClick={() => confirm('Delete this service from the website?') && onDelete(d.id)} className="btn mr-auto text-rose-700 hover:bg-rose-50">
                Delete
              </button>
            )}
            <button onClick={onClose} className="btn text-navy hover:bg-blue-20">
              Cancel
            </button>
            <button disabled={!d.title.en.trim()} onClick={() => onSave(d)} className="btn-primary disabled:opacity-40">
              Save & publish
            </button>
          </>
        )
      }
    >
      {d && (
        <div className="space-y-5">
          <Field label="Icon">
            <div className="flex flex-wrap gap-2">
              {icons.map((ic) => (
                <button type="button" key={ic} onClick={() => set({ icon: ic })} className={clsx('grid h-12 w-12 place-items-center rounded-2xl transition', d.icon === ic ? 'bg-navy text-white' : 'bg-blue-20 text-navy hover:bg-blue-40')} aria-label={ic}>
                  <ServiceIcon name={ic} size={22} />
                </button>
              ))}
            </div>
          </Field>
          <BilingualField label="Title" value={d.title} onChange={(v) => set({ title: v })} />
          <Field label="URL slug" hint={`/services/${d.slug || slugify(d.title.en) || '…'}`}>
            <input className="field" value={d.slug} onChange={(e) => set({ slug: slugify(e.target.value) })} placeholder="auto from English title" />
          </Field>
          <BilingualField label="Short description" value={d.short} onChange={(v) => set({ short: v })} multiline rows={2} />
          <BilingualField label="Full description" value={d.body} onChange={(v) => set({ body: v })} multiline rows={6} />
          <BilingualField label="Typical duration" value={d.duration} onChange={(v) => set({ duration: v })} />
          <ListEditor label="Common signs" items={d.symptoms} onChange={(v) => set({ symptoms: v })} />
          <ListEditor label="Treatment options" items={d.treatments} onChange={(v) => set({ treatments: v })} />
          <div className="flex gap-6">
            <Toggle checked={d.active} onChange={(v) => set({ active: v })} label="Visible on website" />
            <Toggle checked={d.featured} onChange={(v) => set({ featured: v })} label="Featured" />
          </div>
        </div>
      )}
    </Drawer>
  )
}
