import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { DayKey, L, Lang } from '@/data/types'

const dict = {
  'nav.about': { en: 'About', ar: 'عن الطبيب' },
  'nav.services': { en: 'Services', ar: 'الخدمات' },
  'nav.journey': { en: 'Your visit', ar: 'زيارتك' },
  'nav.guide': { en: 'Patient guide', ar: 'دليل المريض' },
  'nav.contact': { en: 'Contact', ar: 'تواصل' },
  'nav.book': { en: 'Book', ar: 'احجز' },
  'nav.login': { en: 'Login', ar: 'دخول' },
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'cta.book': { en: 'Book appointment', ar: 'احجز موعداً' },
  'cta.bookConsult': { en: 'Book a consultation', ar: 'احجز استشارة' },
  'cta.call': { en: 'Call the clinic', ar: 'اتصل بالعيادة' },
  'cta.learn': { en: 'Learn more', ar: 'اعرف المزيد' },
  'cta.whatsapp': { en: 'WhatsApp', ar: 'واتساب' },
  'cta.allServices': { en: 'All services', ar: 'كل الخدمات' },
  'cta.allTips': { en: 'All articles', ar: 'كل المقالات' },
  'cta.read': { en: 'Read article', ar: 'اقرأ المقال' },
  'hero.eyebrow': { en: 'Vascular & Endovascular Surgery', ar: 'جراحة الأوعية الدموية والقسطرة' },
  'hero.title1': { en: 'Healthy vessels.', ar: 'أوعية سليمة...' },
  'hero.title2': { en: 'Healthy life.', ar: 'حياة أفضل.' },
  'hero.sub': {
    en: 'Diagnosis and treatment of veins and arteries — explained clearly, done precisely, followed up personally.',
    ar: 'تشخيص وعلاج الأوردة والشرايين — بشرح واضح، وعلاج دقيق، ومتابعة شخصية.',
  },
  'hero.scroll': { en: 'Scroll', ar: 'مرّر' },
  'rot.label': { en: 'Specialist care for', ar: 'رعاية متخصصة لـ' },
  'about.label': { en: 'The doctor', ar: 'الطبيب' },
  'about.statement': {
    en: 'Precise in the operating room, calm in the consultation, and clear when explaining what happens next.',
    ar: 'دقيق في غرفة العمليات، هادئ في الاستشارة، وواضح حين يشرح ما سيحدث بعد ذلك.',
  },
  'values.label': { en: 'How we care', ar: 'كيف نهتم' },
  'values.title': { en: 'Four values, every visit.', ar: 'أربع قيم في كل زيارة.' },
  'values.precision': { en: 'Precision', ar: 'الدقة' },
  'values.precision.d': { en: 'Every decision is measured — from the diagnosis to the follow-up plan.', ar: 'كل قرار مدروس — من التشخيص حتى خطة المتابعة.' },
  'values.reassurance': { en: 'Reassurance', ar: 'الطمأنينة' },
  'values.reassurance.d': { en: 'Calm spaces and plain language lower anxiety before surgery.', ar: 'مساحة هادئة ولغة بسيطة تقلل القلق قبل الجراحة.' },
  'values.evidence': { en: 'Evidence', ar: 'العلم المبني على الدليل' },
  'values.evidence.d': { en: 'Claims are medical facts — never exaggerated promises or fear tactics.', ar: 'معلومات طبية موثقة — بلا وعود مبالغ فيها ولا تخويف.' },
  'values.continuity': { en: 'Continuity', ar: 'المتابعة المستمرة' },
  'values.continuity.d': { en: 'Care continues after the procedure — the pulse line never breaks.', ar: 'الرعاية تستمر بعد الإجراء — خط النبض لا ينقطع.' },
  'services.label': { en: 'Our services', ar: 'خدماتنا' },
  'services.title': { en: 'Every vessel, one specialist.', ar: 'كل الأوعية، طبيب متخصص واحد.' },
  'services.sub': { en: 'From the first scan to the last follow-up — venous, arterial and endovascular care under one roof.', ar: 'من أول فحص حتى آخر متابعة — رعاية الأوردة والشرايين والقسطرة في مكان واحد.' },
  'services.symptoms': { en: 'Common signs', ar: 'علامات شائعة' },
  'services.treatments': { en: 'Treatment options', ar: 'خيارات العلاج' },
  'services.duration': { en: 'Typical duration', ar: 'المدة المعتادة' },
  'services.other': { en: 'Other services', ar: 'خدمات أخرى' },
  'journey.label': { en: 'Your visit', ar: 'زيارتك' },
  'journey.title': { en: 'A clear path, from first visit to full recovery.', ar: 'مسار واضح، من أول زيارة حتى التعافي الكامل.' },
  'journey.1': { en: 'Consultation', ar: 'الاستشارة' },
  'journey.1.d': { en: 'We listen first. Your symptoms, history and goals — in plain words.', ar: 'نستمع أولاً. أعراضك وتاريخك المرضي وأهدافك — بكلمات بسيطة.' },
  'journey.2': { en: 'Doppler scan', ar: 'فحص الدوبلر' },
  'journey.2.d': { en: 'A painless 15-minute scan in the same visit, explained on screen.', ar: 'فحص بلا ألم لمدة ١٥ دقيقة في نفس الزيارة، مع شرح على الشاشة.' },
  'journey.3': { en: 'Precise treatment', ar: 'علاج دقيق' },
  'journey.3.d': { en: 'The least invasive option that works — most procedures through a pinhole.', ar: 'أقل الخيارات تدخلاً وأكثرها فاعلية — معظم الإجراءات عبر ثقب صغير.' },
  'journey.4': { en: 'Personal follow-up', ar: 'متابعة شخصية' },
  'journey.4.d': { en: 'Scheduled check-ups and a direct line to the clinic. Care never stops at discharge.', ar: 'مواعيد متابعة منتظمة وتواصل مباشر مع العيادة. الرعاية لا تتوقف عند الخروج.' },
  'clinic.label': { en: 'The clinic', ar: 'العيادة' },
  'clinic.title': { en: 'Designed to feel calm.', ar: 'مصممة لتمنحك الهدوء.' },
  'clinic.room': { en: 'Consultation room', ar: 'غرفة الاستشارة' },
  'clinic.wall': { en: 'Credentials wall', ar: 'جدار الشهادات' },
  'clinic.waiting': { en: 'Waiting area', ar: 'منطقة الانتظار' },
  'reviews.label': { en: 'Patient stories', ar: 'تجارب المرضى' },
  'reviews.title': { en: 'Trust, earned one patient at a time.', ar: 'ثقة تُبنى مع كل مريض.' },
  'tips.label': { en: 'Patient guide', ar: 'دليل المريض' },
  'tips.title': { en: 'Health tips, written plainly.', ar: 'نصائح صحية بلغة بسيطة.' },
  'tips.min': { en: 'min read', ar: 'دقائق قراءة' },
  'tips.all': { en: 'All topics', ar: 'كل المواضيع' },
  'faq.label': { en: 'Questions', ar: 'أسئلة شائعة' },
  'faq.title': { en: 'Before you visit.', ar: 'قبل زيارتك.' },
  'contact.label': { en: 'Visit the clinic', ar: 'زُر العيادة' },
  'contact.title': { en: 'We are here when you need us.', ar: 'نحن هنا حين تحتاجنا.' },
  'contact.hours': { en: 'Working hours', ar: 'مواعيد العمل' },
  'contact.byAppt': { en: 'By appointment', ar: 'بموعد مسبق' },
  'contact.closed': { en: 'Closed', ar: 'مغلق' },
  'contact.formTitle': { en: 'Send a question', ar: 'أرسل استفساراً' },
  'form.name': { en: 'Full name', ar: 'الاسم بالكامل' },
  'form.phone': { en: 'Phone number', ar: 'رقم الهاتف' },
  'form.email': { en: 'Email (optional)', ar: 'البريد الإلكتروني (اختياري)' },
  'form.message': { en: 'How can we help?', ar: 'كيف يمكننا مساعدتك؟' },
  'form.notes': { en: 'Symptoms or notes (optional)', ar: 'الأعراض أو ملاحظات (اختياري)' },
  'book.title': { en: 'Book your appointment', ar: 'احجز موعدك' },
  'book.sub': { en: 'Fill in your details and press Send. WhatsApp opens with your request written out, ready to send to the clinic.', ar: 'املأ بياناتك واضغط إرسال، فيُفتح واتساب ورسالتك جاهزة للإرسال إلى العيادة.' },
  'req.sub': { en: 'Fill in your details and press Send. WhatsApp opens with your request written out — just press Send there and the clinic will reply to confirm.', ar: 'املأ بياناتك واضغط إرسال، فيُفتح واتساب ورسالتك جاهزة — اضغط إرسال هناك وسترد العيادة لتأكيد الموعد.' },
  'req.subShort': { en: 'Your request opens in WhatsApp, ready to send.', ar: 'يُفتح طلبك في واتساب جاهزاً للإرسال.' },
  'req.branch': { en: 'Branch', ar: 'الفرع' },
  'req.chooseBranch': { en: 'Choose a branch', ar: 'اختر الفرع' },
  'req.date': { en: 'Preferred day (optional)', ar: 'اليوم المفضل (اختياري)' },
  'req.time': { en: 'Preferred time (optional)', ar: 'الوقت المفضل (اختياري)' },
  'req.send': { en: 'Send on WhatsApp', ar: 'إرسال عبر واتساب' },
  'req.another': { en: 'New request', ar: 'طلب جديد' },
  'req.doneTitle': { en: 'WhatsApp is open', ar: 'تم فتح واتساب' },
  'req.doneSub': { en: 'Press Send in WhatsApp to deliver your request. The clinic will reply to confirm your appointment.', ar: 'اضغط إرسال في واتساب لتوصيل طلبك، وسترد العيادة لتأكيد موعدك.' },
  'req.reopen': { en: 'WhatsApp did not open? Tap here', ar: 'لم يُفتح واتساب؟ اضغط هنا' },
  'req.msgTitle': { en: 'Appointment request', ar: 'طلب حجز موعد' },
  'req.msgName': { en: 'Name', ar: 'الاسم' },
  'req.msgPhone': { en: 'Phone', ar: 'الهاتف' },
  'req.msgDate': { en: 'Preferred day', ar: 'اليوم المفضل' },
  'req.msgTime': { en: 'Preferred time', ar: 'الوقت المفضل' },
  'req.msgNotes': { en: 'Notes', ar: 'ملاحظات' },
  'contact.send': { en: 'Send on WhatsApp', ar: 'إرسال عبر واتساب' },
  'contact.sent': { en: 'WhatsApp is open — press Send there to deliver your message.', ar: 'تم فتح واتساب — اضغط إرسال هناك لتوصيل رسالتك.' },
  'contact.msgTitle': { en: 'Message from the website', ar: 'رسالة من الموقع' },
  'contact.map': { en: 'Open in Google Maps', ar: 'افتح في خرائط جوجل' },
  'contact.branches': { en: 'Our branches', ar: 'فروعنا' },
  'req.label': { en: 'Appointment request', ar: 'طلب موعد' },
  'req.title': { en: 'Request an appointment', ar: 'اطلب موعداً' },
  'req.service': { en: 'Service', ar: 'الخدمة' },
  'req.chooseService': { en: 'Choose a service', ar: 'اختر الخدمة' },
  'req.or': { en: 'Prefer to talk to us?', ar: 'تفضل التحدث معنا؟' },
  'req.close': { en: 'Close', ar: 'إغلاق' },
  'req.waHello': { en: 'Hello, I would like to ask about an appointment with Dr. Haitham AlHatiem.', ar: 'مرحباً، أود الاستفسار عن موعد مع د. هيثم الحطيم.' },
  'footer.rights': { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
  'footer.disclaimer': {
    en: 'Information on this website is general and does not replace a medical consultation. Results vary between patients.',
    ar: 'المعلومات في هذا الموقع عامة ولا تغني عن الاستشارة الطبية. تختلف النتائج من مريض لآخر.',
  },
  'footer.dashboard': { en: 'Clinic login', ar: 'دخول العيادة' },
  'misc.back': { en: 'Back', ar: 'رجوع' },
  'misc.notFound': { en: 'This page could not be found.', ar: 'تعذر العثور على هذه الصفحة.' },
  'misc.goHome': { en: 'Back to home', ar: 'العودة للرئيسية' },
} satisfies Record<string, L>

export type DictKey = keyof typeof dict

export const dayNames: Record<DayKey, L> = {
  sat: { en: 'Saturday', ar: 'السبت' },
  sun: { en: 'Sunday', ar: 'الأحد' },
  mon: { en: 'Monday', ar: 'الاثنين' },
  tue: { en: 'Tuesday', ar: 'الثلاثاء' },
  wed: { en: 'Wednesday', ar: 'الأربعاء' },
  thu: { en: 'Thursday', ar: 'الخميس' },
  fri: { en: 'Friday', ar: 'الجمعة' },
}

export const dayIndex: Record<DayKey, number> = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 }
export const dayFromIndex: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

interface I18n {
  lang: Lang
  dir: 'ltr' | 'rtl'
  setLang: (l: Lang) => void
  toggle: () => void
  t: (k: DictKey) => string
  tr: (v: L) => string
}

const Ctx = createContext<I18n | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return (localStorage.getItem('dha:lang') as Lang) || 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try {
      localStorage.setItem('dha:lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])
  const toggle = useCallback(() => setLangState((l) => (l === 'en' ? 'ar' : 'en')), [])
  const t = useCallback((k: DictKey) => dict[k][lang], [lang])
  const tr = useCallback((v: L) => v[lang] || v.en, [lang])

  const value = useMemo(() => ({ lang, dir: (lang === 'ar' ? 'rtl' : 'ltr') as 'ltr' | 'rtl', setLang, toggle, t, tr }), [lang, setLang, toggle, t, tr])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useI18n must be used inside <LangProvider>')
  return c
}

/** 17:00 → 5:00 PM (Western numerals in both languages, per brand rules) */
export function formatTime(hhmm: string, lang: Lang) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? (lang === 'ar' ? 'م' : 'PM') : lang === 'ar' ? 'ص' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`
}

export function formatDate(isoDate: string, lang: Lang, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) {
  return new Date(isoDate + (isoDate.length === 10 ? 'T00:00:00' : '')).toLocaleDateString(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB', opts)
}
