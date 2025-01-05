import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl mb-8">{t('page_not_found')}</p>
        <Link
          to="/"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          {t('go_home')}
        </Link>
      </div>
    </div>
  )
}
