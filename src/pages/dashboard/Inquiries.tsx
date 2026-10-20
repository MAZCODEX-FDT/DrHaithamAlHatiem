import { useState } from 'react'
import clsx from 'clsx'
import { Inbox, Mail, MessageCircle, Phone, Trash2 } from 'lucide-react'
import { useStore } from '@/data/store'
import { Empty, PageHeader, Segmented, fmtDate, relTime } from './ui'

type Filter = 'all' | 'unread' | 'read'

/** Messages sent through the website's contact form */
export default function Inquiries() {
  const { db, patch, remove } = useStore()
  const [filter, setFilter] = useState<Filter>('unread')
  const unread = db.inquiries.filter((i) => !i.read).length
  const list = db.inquiries
    .filter((i) => filter === 'all' || (filter === 'unread' ? !i.read : i.read))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  // Egyptian local numbers (010…) become 2010… for wa.me
  const wa = (phone: string) => {
    const d = phone.replace(/\D/g, '')
    return `https://wa.me/${d.startsWith('0') ? '2' + d : d}`
  }

  return (
    <>
      <PageHeader
        title="Inquiries"
        sub="Messages from the website contact form. Reply by WhatsApp, phone or email, then mark as read."
        actions={
          unread > 0 && (
            <button className="btn-secondary" onClick={() => db.inquiries.forEach((i) => !i.read && patch('inquiries', i.id, { read: true }))}>
              Mark all read
            </button>
          )
        }
      />
      <div className="mb-4">
        <Segmented
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'unread', label: 'Unread', count: unread },
            { value: 'read', label: 'Read', count: db.inquiries.length - unread },
            { value: 'all', label: 'All', count: db.inquiries.length },
          ]}
        />
      </div>
      {list.length === 0 ? (
        <Empty title={filter === 'unread' ? 'Inbox zero' : 'No messages'} sub={filter === 'unread' ? 'Every message has been handled.' : undefined} icon={<Inbox size={22} />} />
      ) : (
        <div className="space-y-3">
          {list.map((m) => {
            const ar = /[؀-ۿ]/.test(m.message)
            return (
              <article key={m.id} className={clsx('rounded-[22px] bg-white p-6 ring-1 transition', m.read ? 'ring-navy/[0.06]' : 'ring-navy/25 shadow-lg shadow-navy/[0.04]')}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {!m.read && <span className="h-2 w-2 rounded-full bg-navy" aria-label="Unread" />}
                  <h2 className="font-semibold text-navy">{m.name}</h2>
                  <span className="text-sm text-deep tabular-nums">{m.phone}</span>
                  {m.email && <span className="text-sm text-deep">· {m.email}</span>}
                  <span className="ml-auto text-xs text-deep" title={fmtDate(m.createdAt)}>
                    {relTime(m.createdAt)}
                  </span>
                </div>
                <p className="mt-3 max-w-3xl text-[15px] leading-relaxed whitespace-pre-line text-ink/80" dir={ar ? 'rtl' : 'ltr'} style={ar ? { fontFamily: 'var(--font-arabic)' } : undefined}>
                  {m.message}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <a href={wa(m.phone)} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-full bg-navy px-4 text-xs font-semibold text-white hover:bg-navy-shadow">
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                  <a href={`tel:${m.phone.replace(/\s/g, '')}`} className="inline-flex h-9 items-center gap-2 rounded-full bg-blue-20 px-4 text-xs font-semibold text-navy hover:bg-blue-40">
                    <Phone size={14} /> Call
                  </a>
                  {m.email && (
                    <a href={`mailto:${m.email}`} className="inline-flex h-9 items-center gap-2 rounded-full bg-blue-20 px-4 text-xs font-semibold text-navy hover:bg-blue-40">
                      <Mail size={14} /> Email
                    </a>
                  )}
                  <button onClick={() => patch('inquiries', m.id, { read: !m.read })} className="ml-auto h-9 rounded-full px-4 text-xs font-semibold text-navy hover:bg-blue-20">
                    Mark {m.read ? 'unread' : 'read'}
                  </button>
                  <button onClick={() => confirm('Delete this message?') && remove('inquiries', m.id)} className="grid h-9 w-9 place-items-center rounded-full text-rose-700 hover:bg-rose-50" aria-label="Delete">
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </>
  )
}
