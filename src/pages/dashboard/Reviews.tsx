import { useState } from 'react'
import { Star, Trash2 } from 'lucide-react'
import { useStore } from '@/data/store'
import type { ReviewStatus } from '@/data/types'
import { Empty, PageHeader, Segmented, StatusBadge, fmtDate } from './ui'

export default function ReviewsPage() {
  const { db, patch, remove } = useStore()
  const [filter, setFilter] = useState<ReviewStatus | 'all'>('all')
  const list = db.reviews.filter((r) => filter === 'all' || r.status === filter).sort((a, b) => b.date.localeCompare(a.date))
  const avg = db.reviews.filter((r) => r.status === 'approved').reduce((s, r, _, a) => s + r.rating / a.length, 0)
  const count = (s: ReviewStatus) => db.reviews.filter((r) => r.status === s).length

  return (
    <>
      <PageHeader title="Reviews" sub={`Average ${avg.toFixed(1)} ★ across ${count('approved')} published reviews. Only approved reviews appear on the website.`} />
      <div className="mb-4">
        <Segmented
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'All', count: db.reviews.length },
            { value: 'pending', label: 'Pending', count: count('pending') },
            { value: 'approved', label: 'Approved', count: count('approved') },
            { value: 'hidden', label: 'Hidden', count: count('hidden') },
          ]}
        />
      </div>
      {list.length === 0 ? (
        <Empty title="Nothing here" icon={<Star size={22} />} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((r) => (
            <article key={r.id} className="flex flex-col rounded-[22px] bg-white p-6 ring-1 ring-navy/[0.06]">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5 text-navy">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className={i < r.rating ? 'fill-navy' : 'opacity-25'} />
                  ))}
                </div>
                <StatusBadge status={r.status} />
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/80" dir={r.lang === 'ar' ? 'rtl' : 'ltr'} style={r.lang === 'ar' ? { fontFamily: 'var(--font-arabic)' } : undefined}>
                “{r.text}”
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                <span className="mr-auto text-sm">
                  <b className="text-navy">{r.name}</b>
                  <span className="text-deep">
                    {' '}
                    · {db.services.find((s) => s.id === r.serviceId)?.title.en ?? 'General'} · {fmtDate(r.date)}
                  </span>
                </span>
                {r.status !== 'approved' && (
                  <button onClick={() => patch('reviews', r.id, { status: 'approved' })} className="h-9 rounded-full bg-navy px-4 text-xs font-semibold text-white hover:bg-navy-shadow">
                    Approve
                  </button>
                )}
                {r.status !== 'hidden' && (
                  <button onClick={() => patch('reviews', r.id, { status: 'hidden' })} className="h-9 rounded-full bg-blue-20 px-4 text-xs font-semibold text-navy hover:bg-blue-40">
                    Hide
                  </button>
                )}
                <button onClick={() => confirm('Delete review permanently?') && remove('reviews', r.id)} className="grid h-9 w-9 place-items-center rounded-full text-rose-700 hover:bg-rose-50" aria-label="Delete">
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      <p className="mt-6 text-xs text-deep">Publish patient reviews only with the patient's consent. Never edit a review's wording.</p>
    </>
  )
}
