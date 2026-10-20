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

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
export type AppointmentType = 'consultation' | 'follow-up' | 'doppler' | 'procedure'
export type AppointmentSource = 'website' | 'phone' | 'walk-in' | 'whatsapp'

export interface Appointment {
  id: string
  patientId?: string
  name: string
  phone: string
  email?: string
  serviceId: string
  type: AppointmentType
  date: string // YYYY-MM-DD
  time: string // HH:mm
  status: AppointmentStatus
  source: AppointmentSource
  notes?: string
  createdAt: string
}

export type Condition =
  | 'Varicose veins'
  | 'Peripheral arterial disease'
  | 'Diabetic foot'
  | 'Deep vein thrombosis'
  | 'Aortic aneurysm'
  | 'Dialysis access'
  | 'Carotid disease'
  | 'Venous ulcer'
  | 'Lymphoedema'

export interface Patient {
  id: string
  name: string
  phone: string
  email?: string
  gender: 'male' | 'female'
  dob: string
  conditions: Condition[]
  /** Ankle–brachial index per leg — the core arterial screening number */
  abiLeft?: number
  abiRight?: number
  /** CEAP clinical class for chronic venous disease (C0–C6) */
  ceap?: string
  diabetic: boolean
  smoker: boolean
  notes: string
  followUp?: string
  createdAt: string
}

export interface Inquiry {
  id: string
  name: string
  phone: string
  email?: string
  message: string
  createdAt: string
  read: boolean
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

export interface Settings {
  doctor: { name: L; title: L; credentials: L; bio: L }
  phone: string
  whatsapp: string
  email: string
  address: L
  mapQuery: string
  hours: Hours[]
  slotMinutes: number
  stats: Stat[]
  social: { instagram: string; facebook: string; google: string }
  announcement: L
  announcementOn: boolean
  bookingOpen: boolean
}

export interface DB {
  services: Service[]
  tips: Tip[]
  reviews: Review[]
  appointments: Appointment[]
  patients: Patient[]
  inquiries: Inquiry[]
  faqs: Faq[]
  settings: Settings
}

export type CollectionKey = Exclude<keyof DB, 'settings'>
