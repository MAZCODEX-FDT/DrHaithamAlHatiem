import { Hero } from './home/Hero'
import { AboutIntro, Clinic, ConditionsTicker, CtaBand, FaqSection, Journey, Reviews, ServicesRail, TipsPreview, Values } from './home/Sections'
import { useIntroReady } from './SiteLayout'
import { BookingSection } from '@/components/site/BookingRequest'
import { Seo } from '@/components/seo/Seo'
import { usePublicData } from '@/data/store'
import { useI18n } from '@/lib/i18n'
import { doctorPerson, faqPage, practice, website } from '@/lib/schema'

export default function Home() {
  const ready = useIntroReady()
  const { t, lang } = useI18n()
  const { settings, services, faqs } = usePublicData()
  return (
    <>
      <Seo title={t('seo.home.title')} description={t('seo.home.desc')} path="/" jsonLd={[website(settings, lang), practice(settings, services, lang), doctorPerson(settings, lang), faqPage(faqs, lang)]} />
      <Hero ready={ready} />
      <ConditionsTicker />
      <AboutIntro />
      <Values />
      <ServicesRail />
      <Journey />
      <Clinic />
      <Reviews />
      <TipsPreview />
      <BookingSection />
      <FaqSection />
      <CtaBand />
    </>
  )
}
