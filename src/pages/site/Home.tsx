import { Hero } from './home/Hero'
import { AboutIntro, Clinic, ConditionsTicker, CtaBand, FaqSection, Journey, Reviews, ServicesRail, TipsPreview, Values } from './home/Sections'
import { useIntroReady } from './SiteLayout'

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
      <FaqSection />
      <CtaBand />
    </>
  )
}
