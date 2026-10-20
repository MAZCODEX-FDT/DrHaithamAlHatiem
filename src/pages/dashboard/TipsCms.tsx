import { useState } from 'react'
import clsx from 'clsx'
import { ExternalLink, FileText, Plus } from 'lucide-react'
import { uid, useStore } from '@/data/store'
import { iso } from '@/data/seed'
import type { L, Tip } from '@/data/types'
import { BilingualField, Drawer, Empty, Field, PageHeader, Toggle, fmtDate } from './ui'
import { withBase } from '@/lib/base'

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const emptyL = (): L => ({ en: '', ar: '' })

export default function TipsCms() {
  const { db, upsert, patch, remove } = useStore()
  const [edit, setEdit] = useState<Tip | null>(null)
  const list = [...db.tips].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <PageHeader
        title="Health tips"
        sub="Patient-guide articles in English and Arabic. Clear, calm, evidence-based."
        actions={
          <button
            className="btn-primary"
            onClick={() => setEdit({ id: uid('tip'), slug: '', category: emptyL(), title: emptyL(), excerpt: emptyL(), body: emptyL(), readMins: 3, published: false, date: iso(new Date()) })}
          >
            <Plus size={16} /> New article
          </button>
        }
      />
      {list.length === 0 ? (
        <Empty title="No articles yet" icon={<FileText size={22} />} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((t) => (
            <article key={t.id} className={clsx('flex flex-col rounded-[22px] bg-white p-6 ring-1 ring-navy/[0.06]', !t.published && 'opacity-70')}>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-blue-20 px-3 py-1 text-xs font-semibold text-navy">{t.category.en || 'Uncategorised'}</span>
                <span className={clsx('text-xs font-semibold', t.published ? 'text-emerald-700' : 'text-amber-700')}>{t.published ? '● Published' : '○ Draft'}</span>
              </div>
              <h3 className="mt-5 text-lg leading-snug font-semibold text-navy">{t.title.en || 'Untitled'}</h3>
              <p className="mt-1 text-sm text-deep" dir="rtl" style={{ fontFamily: 'var(--font-arabic)' }}>
                {t.title.ar}
              </p>
              <p className="mt-3 line-clamp-2 text-sm text-ink/65">{t.excerpt.en}</p>
              <div className="mt-auto flex items-center gap-2 pt-6">
                <span className="mr-auto text-xs text-deep">
                  {fmtDate(t.date)} · {t.readMins} min
                </span>
                <Toggle checked={t.published} onChange={(v) => patch('tips', t.id, { published: v })} />
                {t.published && (
                  <a href={withBase(`/guide/${t.slug}`)} target="_blank" className="grid h-9 w-9 place-items-center rounded-full text-navy hover:bg-blue-20" aria-label="View">
                    <ExternalLink size={15} />
                  </a>
                )}
                <button onClick={() => setEdit(t)} className="h-9 rounded-full bg-blue-20 px-4 text-xs font-semibold text-navy hover:bg-blue-40">
                  Edit
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <TipDrawer
        value={edit}
        isNew={!!edit && !db.tips.some((t) => t.id === edit.id)}
        onClose={() => setEdit(null)}
        onSave={(t) => {
          upsert('tips', { ...t, slug: t.slug || slugify(t.title.en) || t.id })
          setEdit(null)
        }}
        onDelete={(id) => {
          remove('tips', id)
          setEdit(null)
        }}
      />
    </>
  )
}

function TipDrawer({ value, isNew, onClose, onSave, onDelete }: { value: Tip | null; isNew: boolean; onClose: () => void; onSave: (t: Tip) => void; onDelete: (id: string) => void }) {
  const [d, setD] = useState<Tip | null>(value)
  const [prev, setPrev] = useState(value)
  if (value !== prev) {
    setPrev(value)
    setD(value)
  }
  const set = (c: Partial<Tip>) => setD((x) => (x ? { ...x, ...c } : x))
  return (
    <Drawer
      wide
      open={!!value}
      onClose={onClose}
      title={isNew ? 'New article' : 'Edit article'}
      footer={
        d && (
          <>
            {!isNew && (
              <button onClick={() => confirm('Delete this article?') && onDelete(d.id)} className="btn mr-auto text-rose-700 hover:bg-rose-50">
                Delete
              </button>
            )}
            <button onClick={onClose} className="btn text-navy hover:bg-blue-20">
              Cancel
            </button>
            <button disabled={!d.title.en.trim()} onClick={() => onSave(d)} className="btn-primary disabled:opacity-40">
              Save
            </button>
          </>
        )
      }
    >
      {d && (
        <div className="space-y-5">
          <BilingualField label="Title" value={d.title} onChange={(v) => set({ title: v })} />
          <BilingualField label="Category" value={d.category} onChange={(v) => set({ category: v })} />
          <BilingualField label="Excerpt" value={d.excerpt} onChange={(v) => set({ excerpt: v })} multiline rows={2} />
          <BilingualField label="Body (blank line between paragraphs)" value={d.body} onChange={(v) => set({ body: v })} multiline rows={10} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Slug">
              <input className="field" value={d.slug} onChange={(e) => set({ slug: slugify(e.target.value) })} placeholder="auto" />
            </Field>
            <Field label="Date">
              <input type="date" className="field" value={d.date} onChange={(e) => set({ date: e.target.value })} />
            </Field>
            <Field label="Read time (min)">
              <input type="number" min={1} className="field" value={d.readMins} onChange={(e) => set({ readMins: Number(e.target.value) || 1 })} />
            </Field>
          </div>
          <Toggle checked={d.published} onChange={(v) => set({ published: v })} label="Published" />
          <p className="rounded-2xl bg-blue-20 p-4 text-xs leading-relaxed text-navy">
            Tone of voice: clear, calm, expert. Plain words first, medical terms explained. No guaranteed outcomes, no fear tactics — medical advertising rules apply.
          </p>
        </div>
      )}
    </Drawer>
  )
}
