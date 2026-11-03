import { useSearchParams } from 'react-router-dom'
import { BookingSection } from '@/components/site/BookingRequest'
import { Seo } from '@/components/seo/Seo'
import { useI18n } from '@/lib/i18n'
import { breadcrumbs } from '@/lib/schema'

/** Booking is a WhatsApp request: the same form as everywhere else, as a page */
export default function Book() {
  // service pages link here as /book?service=<id>
  const [params] = useSearchParams()
  const { t, lang } = useI18n()
  return (
    <>
      <Seo title={t('seo.book.title')} description={t('seo.book.desc')} path="/book" jsonLd={breadcrumbs([{ name: t('nav.home'), path: '/' }, { name: t('nav.book'), path: '/book' }], lang)} />
      <BookingSection page serviceId={params.get('service') ?? undefined} className="pt-36! sm:pt-44!" />
    </>
  )
}
