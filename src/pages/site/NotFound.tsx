import { Link } from 'react-router-dom'
import { PulseLine } from '@/components/brand/Brand'
import { useI18n } from '@/lib/i18n'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <section className="grid min-h-[80vh] place-items-center pt-28 text-center">
      <div className="container-x">
        <p className="display text-[clamp(5rem,16vw,12rem)]">404</p>
        <PulseLine className="mx-auto h-16 max-w-xl" />
        <p className="mt-6 text-lg text-ink/70">{t('misc.notFound')}</p>
        <Link to="/" className="btn-primary mt-8">
          {t('misc.goHome')}
        </Link>
      </div>
    </section>
  )
}
