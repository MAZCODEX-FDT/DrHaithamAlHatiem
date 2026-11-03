import { useI18n } from '@/lib/i18n'
import { usePublicData } from '@/data/store'
import { absUrl, SITE_URL } from '@/lib/site'

type JsonLd = Record<string, unknown>

/**
 * A page's head: title, description, canonical and hreflang alternates, Open Graph,
 * and its structured data. React 19 hoists the title/meta/link tags into <head>;
 * the pre-render step snapshots them into each page's static HTML for crawlers.
 */
export function Seo({ title, description, path, image, type = 'website', jsonLd, noindex }: { title: string; description: string; path: string; image?: string; type?: 'website' | 'article'; jsonLd?: JsonLd | JsonLd[]; noindex?: boolean }) {
  const { lang, tr } = useI18n()
  const { settings } = usePublicData()
  const full = `${title} | ${tr(settings.doctor.name)}`
  const url = absUrl(path, lang)
  const img = image ?? `${SITE_URL}/brand/portrait-full.jpg`
  const graph = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
  return (
    <>
      <title data-seo="">{full}</title>
      <meta data-seo="" name="description" content={description} />
      {noindex ? (
        <meta data-seo="" name="robots" content="noindex, nofollow" />
      ) : (
        <>
          <meta data-seo="" name="robots" content="index, follow, max-image-preview:large" />
          <link data-seo="" rel="canonical" href={url} />
          <link data-seo="" rel="alternate" hrefLang="en" href={absUrl(path, 'en')} />
          <link data-seo="" rel="alternate" hrefLang="ar" href={absUrl(path, 'ar')} />
          <link data-seo="" rel="alternate" hrefLang="x-default" href={absUrl(path, 'en')} />
        </>
      )}
      <meta data-seo="" property="og:type" content={type} />
      <meta data-seo="" property="og:site_name" content={tr(settings.doctor.name)} />
      <meta data-seo="" property="og:title" content={full} />
      <meta data-seo="" property="og:description" content={description} />
      <meta data-seo="" property="og:url" content={url} />
      <meta data-seo="" property="og:image" content={img} />
      <meta data-seo="" property="og:locale" content={lang === 'ar' ? 'ar_EG' : 'en_GB'} />
      <meta data-seo="" property="og:locale:alternate" content={lang === 'ar' ? 'en_GB' : 'ar_EG'} />
      <meta data-seo="" name="twitter:card" content="summary_large_image" />
      {graph.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c') }} />
      )}
    </>
  )
}
