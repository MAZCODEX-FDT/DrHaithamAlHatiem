import { Link } from 'react-router-dom'
import { ArrowUpRight, Award, GraduationCap, Languages, Stethoscope } from 'lucide-react'
import { ArabicLockup, FineRule, PulseLine } from '@/components/brand/Brand'
import { MaskHeading, Reveal } from '@/components/site/ui'
import { usePublicData } from '@/data/store'
import { useI18n } from '@/lib/i18n'
import { Clinic, CtaBand, Journey, Values } from './home/Sections'

export default function About() {
  const { t, tr, lang } = useI18n()
  const { settings } = usePublicData()
  const facts = [
    { Icon: Award, title: lang === 'ar' ? 'زمالة كلية الجراحين الملكية' : 'FRCS — Royal College of Surgeons', sub: lang === 'ar' ? 'المملكة المتحدة' : 'United Kingdom' },
    { Icon: Stethoscope, title: lang === 'ar' ? 'استشاري جراحة الأوعية الدموية' : 'Consultant vascular surgeon', sub: lang === 'ar' ? 'الأوردة · الشرايين · القسطرة' : 'Venous · Arterial · Endovascular' },
    { Icon: GraduationCap, title: lang === 'ar' ? 'ممارسة مبنية على الدليل' : 'Evidence-based practice', sub: lang === 'ar' ? 'إرشادات علاجية دولية' : 'International clinical guidelines' },
    { Icon: Languages, title: lang === 'ar' ? 'العربية والإنجليزية' : 'Arabic & English', sub: lang === 'ar' ? 'لغة الاستشارة' : 'Consultation languages' },
  ]
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
        <div className="container-x grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal distance={16}>
              <p className="label flex items-center gap-3">
                <span className="h-px w-8 bg-deep/50" />
                {t('about.label')}
              </p>
            </Reveal>
            <MaskHeading as="h1" lines={[tr(settings.doctor.name)]} className="display mt-6 text-[clamp(3rem,8vw,7rem)]" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-xl font-medium text-deep">{tr(settings.doctor.title)}</p>
              <FineRule className="mt-8 w-56 text-navy" />
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/75">{tr(settings.doctor.bio)}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/book" className="btn-primary">
                  {t('cta.book')} <ArrowUpRight size={16} className="rtl:-scale-x-100" />
                </Link>
                <Link to="/services" className="btn-outline">
                  {t('cta.allServices')}
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <div className="relative overflow-hidden rounded-[32px] bg-mist">
              <img src="/brand/portrait-full.jpg" alt={tr(settings.doctor.name)} className="aspect-[880/1100] w-full object-cover object-top" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(({ Icon, title, sub }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="card h-full p-7">
                  <Icon size={24} strokeWidth={1.8} className="text-navy" />
                  <p className="mt-8 text-lg font-semibold text-navy">{title}</p>
                  <p className="mt-1 text-sm text-deep">{sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-4 flex flex-col items-center justify-between gap-8 rounded-[28px] bg-white p-10 md:flex-row">
              <p className="max-w-lg text-2xl font-semibold tracking-tight text-navy">{t('about.statement')}</p>
              <ArabicLockup className="shrink-0 text-xl" />
            </div>
          </Reveal>
        </div>
      </section>

      <PulseLine className="h-24" color="#8DAFBC" scrub pulseAt={0.62} />
      <Values />
      <Journey />
      <Clinic />
      <CtaBand />
    </>
  )
}
