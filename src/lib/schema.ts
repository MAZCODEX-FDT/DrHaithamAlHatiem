import type { Branch, Faq, L, Lang, Service, Settings, Tip } from '@/data/types'
import { absUrl, SITE_URL } from './site'
import { WEEK } from './contact'

/**
 * schema.org structured data, so search and AI answer engines can state facts
 * about the doctor, his clinics and the conditions he treats with confidence.
 * Every value comes from the site's own data; nothing here is invented.
 */

type Node = Record<string, unknown>
const pick = (v: L, lang: Lang) => v[lang] || v.en
const dayUrl: Record<string, string> = { sat: 'Saturday', sun: 'Sunday', mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday' }

export const DOCTOR_ID = `${SITE_URL}/#doctor`
export const PRACTICE_ID = `${SITE_URL}/#practice`
export const clinicId = (b: Branch) => `${SITE_URL}/#${b.id}`

export function doctorPerson(s: Settings, lang: Lang): Node {
  return {
    '@type': 'Person',
    '@id': DOCTOR_ID,
    name: pick(s.doctor.name, lang),
    alternateName: pick(s.doctor.name, lang === 'en' ? 'ar' : 'en'),
    honorificPrefix: lang === 'ar' ? 'د.' : 'Dr.',
    jobTitle: pick(s.doctor.title, lang),
    description: pick(s.doctor.bio, lang),
    image: `${SITE_URL}/brand/portrait-full.jpg`,
    url: absUrl('/about', lang),
    knowsAbout: ['Vascular surgery', 'Endovascular surgery', 'Varicose veins', 'Peripheral arterial disease', 'Diabetic foot', 'Deep vein thrombosis', 'Aortic aneurysm', 'Dialysis access', 'Duplex Doppler ultrasound'],
    hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Fellowship', name: pick(s.doctor.credentials, lang), recognizedBy: { '@type': 'Organization', name: 'Royal College of Surgeons' } },
    worksFor: { '@id': PRACTICE_ID },
    sameAs: Object.values(s.social).filter((u) => u && !/^https?:\/\/(www\.)?(instagram|facebook)\.com\/?$|g\.page\/?$/.test(u)),
  }
}

export function clinic(b: Branch, s: Settings, lang: Lang): Node {
  return {
    '@type': 'MedicalClinic',
    '@id': clinicId(b),
    name: `${pick(s.doctor.name, lang)} — ${pick(b.name, lang)}`,
    address: { '@type': 'PostalAddress', streetAddress: pick(b.address, lang), addressCountry: 'EG' },
    hasMap: b.mapUrl || undefined,
    telephone: [...b.phones, ...s.phones].filter(Boolean)[0],
    openingHoursSpecification: WEEK.filter((d) => b.days.includes(d)).map((d) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${dayUrl[d]}`, opens: b.from })),
    medicalSpecialty: ['https://schema.org/Surgical', 'https://schema.org/Cardiovascular'],
    parentOrganization: { '@id': PRACTICE_ID },
  }
}

/** The practice: the doctor's surgery as a whole, with each clinic as a location */
export function practice(s: Settings, services: Service[], lang: Lang): Node {
  return {
    '@type': 'Physician',
    '@id': PRACTICE_ID,
    name: pick(s.doctor.name, lang),
    description: `${pick(s.doctor.title, lang)} — ${pick(s.doctor.credentials, lang)}`,
    url: absUrl('/', lang),
    image: `${SITE_URL}/brand/portrait-full.jpg`,
    logo: `${SITE_URL}/brand/wordmark-navy.png`,
    telephone: s.phones[0],
    email: s.email,
    medicalSpecialty: ['https://schema.org/Surgical', 'https://schema.org/Cardiovascular'],
    availableService: services.map((sv) => ({ '@type': 'MedicalProcedure', name: pick(sv.title, lang), url: absUrl(`/services/${sv.slug}`, lang) })),
    location: s.branches.map((b) => clinic(b, s, lang)),
    founder: { '@id': DOCTOR_ID },
    areaServed: { '@type': 'Country', name: lang === 'ar' ? 'مصر' : 'Egypt' },
    knowsLanguage: ['ar', 'en'],
  }
}

export function website(s: Settings, lang: Lang): Node {
  return { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: absUrl('/', lang), name: pick(s.doctor.name, lang), inLanguage: lang, publisher: { '@id': PRACTICE_ID } }
}

export function breadcrumbs(items: { name: string; path: string }[], lang: Lang): Node {
  return { '@type': 'BreadcrumbList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absUrl(it.path, lang) })) }
}

export function faqPage(faqs: { q: L; a: L }[] | Faq[], lang: Lang): Node {
  return { '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: pick(f.q, lang), acceptedAnswer: { '@type': 'Answer', text: pick(f.a, lang) } })) }
}

/** A service page: the page, reviewed by the doctor, about a condition and its treatments */
export function servicePage(sv: Service, lang: Lang, description: string): Node {
  const isTest = sv.icon === 'doppler'
  const about = isTest
    ? { '@type': 'MedicalTest', name: pick(sv.title, lang), usedToDiagnose: ['Varicose veins', 'Peripheral arterial disease', 'Deep vein thrombosis'] }
    : {
        '@type': 'MedicalCondition',
        name: pick(sv.title, lang),
        alternateName: pick(sv.title, lang === 'en' ? 'ar' : 'en'),
        signOrSymptom: sv.symptoms.map((x) => ({ '@type': 'MedicalSignOrSymptom', name: pick(x, lang) })),
        possibleTreatment: sv.treatments.map((x) => ({ '@type': 'MedicalTherapy', name: pick(x, lang) })),
      }
  return {
    '@type': 'MedicalWebPage',
    '@id': `${absUrl(`/services/${sv.slug}`, lang)}#page`,
    url: absUrl(`/services/${sv.slug}`, lang),
    name: pick(sv.title, lang),
    description,
    inLanguage: lang,
    about,
    audience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
    reviewedBy: { '@id': DOCTOR_ID },
    lastReviewed: REVIEWED,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    provider: { '@id': PRACTICE_ID },
  }
}

export function articlePage(tip: Tip, lang: Lang): Node {
  return {
    '@type': ['MedicalWebPage', 'Article'],
    headline: pick(tip.title, lang),
    description: pick(tip.excerpt, lang),
    url: absUrl(`/guide/${tip.slug}`, lang),
    inLanguage: lang,
    datePublished: tip.date,
    dateModified: tip.date,
    author: { '@id': DOCTOR_ID },
    reviewedBy: { '@id': DOCTOR_ID },
    lastReviewed: tip.date,
    publisher: { '@id': PRACTICE_ID },
    image: `${SITE_URL}/brand/portrait-full.jpg`,
    audience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
  }
}

/** Date the service content was last reviewed (update when it changes) */
export const REVIEWED = '2026-11-03'
