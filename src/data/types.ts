export type Lang = 'en' | 'ar'
export type L = { en: string; ar: string }

export type IconKey =
  | 'varicose'
  | 'arterial'
  | 'diabetic'
  | 'doppler'
  | 'flow'
  | 'endovascular'
  | 'heart'
  | 'shield'
  | 'dialysis'
  | 'aneurysm'
  | 'dvt'
  | 'spider'

export interface Service {
  id: string
  slug: string
  icon: IconKey
  title: L
  short: L
  body: L
  symptoms: L[]
  treatments: L[]
  duration: L
  featured: boolean
  active: boolean
  order: number
}

export interface Tip {
  id: string
  slug: string
  category: L
  title: L
  excerpt: L
  body: L
  readMins: number
  published: boolean
  date: string
}

export type ReviewStatus = 'pending' | 'approved' | 'hidden'
export interface Review {
  id: string
  name: string
  rating: number
  text: string
  lang: 'en' | 'ar'
  serviceId?: string
  date: string
  status: ReviewStatus
}

export interface Faq {
  id: string
  q: L
  a: L
}

export type DayKey = 'sat' | 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri'
export interface Hours {
  day: DayKey
  open: string
  close: string
  closed: boolean
  byAppointment?: boolean
}

export interface Stat {
  id: string
  value: number
  suffix: string
  label: L
}

/** One clinic location: its own address, phone numbers and map link */
export interface Branch {
  id: string
  name: L
  address: L
  phones: string[]
  /** Google Maps link for the location (a share link or any maps URL) */
  mapUrl: string
}

export interface Settings {
  doctor: { name: L; title: L; credentials: L; bio: L }
  /** Clinic WhatsApp, international format, digits only: receives every booking and message from the site */
  whatsapp: string
  email: string
  branches: Branch[]
  hours: Hours[]
  stats: Stat[]
  social: { instagram: string; facebook: string; google: string }
  announcement: L
  announcementOn: boolean
}

export interface DB {
  services: Service[]
  tips: Tip[]
  reviews: Review[]
  faqs: Faq[]
  settings: Settings
}

export type CollectionKey = Exclude<keyof DB, 'settings'>
