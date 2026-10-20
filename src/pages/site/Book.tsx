import { useSearchParams } from 'react-router-dom'
import { BookingSection } from '@/components/site/BookingRequest'

/** Booking is a WhatsApp request: the same form as everywhere else, as a page */
export default function Book() {
  // service pages link here as /book?service=<id>
  const [params] = useSearchParams()
  return <BookingSection page serviceId={params.get('service') ?? undefined} className="pt-36! sm:pt-44!" />
}
