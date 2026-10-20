import { Link } from 'react-router-dom'
import { ArrowUpRight, FileText, MapPin, MessageCircle, Phone, Star, Stethoscope } from 'lucide-react'
import { useStore } from '@/data/store'
import { Kpi, PageHeader, Panel } from './ui'

/** Summary of the website's content, and where bookings go */
export default function Overview() {
  const { db } = useStore()
  const { settings } = db
  const approved = db.reviews.filter((r) => r.status === 'approved')
  const avg = approved.length ? approved.reduce((s, r) => s + r.rating, 0) / approved.length : 0
  const pending = db.reviews.filter((r) => r.status === 'pending').length
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <>
      <PageHeader title={`${greeting}, Dr. Haitham`} sub="Manage what patients see on the website." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi tone="navy" label="Services" value={db.services.filter((s) => s.active).length} hint={`of ${db.services.length} shown`} icon={<Stethoscope size={18} />} />
        <Kpi label="Articles" value={db.tips.filter((t) => t.published).length} hint={`of ${db.tips.length} published`} icon={<FileText size={18} />} />
        <Kpi label="Rating" value={avg ? avg.toFixed(1) : '—'} hint={`${approved.length} published reviews`} icon={<Star size={18} />} />
        <Kpi label="Reviews to approve" value={pending} hint={pending ? 'awaiting your decision' : 'all handled'} icon={<Star size={18} />} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-5">
        <Panel title="How bookings reach you" className="xl:col-span-2">
          <div className="flex gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#25D366] text-white">
              <MessageCircle size={22} />
            </span>
            <div>
              <p className="text-sm leading-relaxed text-ink/80">
                Every booking and message from the website opens WhatsApp on the patient's phone with their details already written, addressed to the clinic number:
              </p>
              <p className="mt-2 text-lg font-bold text-navy" dir="ltr">
                +{settings.whatsapp}
              </p>
              <p className="mt-2 text-xs text-deep">Nothing is stored on the website. Change the number in Settings.</p>
            </div>
          </div>
        </Panel>

        <Panel
          title={`Branches · ${settings.branches.length}`}
          className="xl:col-span-3"
          action={
            <Link to="/dashboard/settings" className="inline-flex items-center gap-1 text-xs font-semibold text-navy hover:underline">
              Edit <ArrowUpRight size={14} />
            </Link>
          }
        >
          <ul className="divide-y divide-navy/[0.06]">
            {settings.branches.map((b) => (
              <li key={b.id} className="flex flex-wrap items-start gap-x-6 gap-y-2 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-navy">{b.name.en || 'Unnamed branch'}</p>
                  <p className="mt-1 flex items-start gap-1.5 text-sm text-deep">
                    <MapPin size={14} className="mt-0.5 shrink-0" /> {b.address.en || '—'}
                  </p>
                </div>
                <div className="space-y-1 text-sm">
                  {b.phones.filter(Boolean).map((ph) => (
                    <p key={ph} className="flex items-center gap-1.5 text-ink/80" dir="ltr">
                      <Phone size={13} /> {ph}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  )
}
