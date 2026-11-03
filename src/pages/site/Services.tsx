import { PageHero, Reveal, ServiceCard } from '@/components/site/ui'
import { usePublicData } from '@/data/store'
import { useI18n } from '@/lib/i18n'
import { CtaBand, FaqSection } from './home/Sections'
import { Seo } from '@/components/seo/Seo'
import { absUrl } from '@/lib/site'
import { breadcrumbs } from '@/lib/schema'

export function ServicesPage() {
  const { t, tr, lang } = useI18n()
  const { services } = usePublicData()
  return (
    <>
      <Seo
        title={t('seo.services.title')}
        description={t('seo.services.desc')}
        path="/services"
        jsonLd={[
          { '@type': 'CollectionPage', name: t('seo.services.title'), mainEntity: { '@type': 'ItemList', itemListElement: services.map((sv, i) => ({ '@type': 'ListItem', position: i + 1, url: absUrl(`/services/${sv.slug}`, lang), name: tr(sv.title) })) } },
          breadcrumbs([{ name: t('nav.home'), path: '/' }, { name: t('nav.services'), path: '/services' }], lang),
        ]}
      />
      <PageHero label={t('services.label')} title={t('services.title')} sub={t('services.sub')} />
      <section className="pb-24">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.07}>
              <ServiceCard service={s} index={i} className="min-h-[360px]" />
            </Reveal>
          ))}
        </div>
      </section>
      <FaqSection />
      <CtaBand />
    </>
  )
}
