import { Hero } from './home/Hero'
import { AboutIntro, Clinic, ConditionsTicker, CtaBand, FaqSection, Journey, Reviews, ServicesRail, TipsPreview, Values } from './home/Sections'
import { useIntroReady } from './SiteLayout'
import { BookingSection } from '@/components/site/BookingRequest'

export default function Home() {
  const ready = useIntroReady()
  return (
    <>
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
