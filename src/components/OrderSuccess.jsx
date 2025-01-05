import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function OrderSuccess() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">
          {t('order_success')}
        </h2>
        <p className="text-gray-600">
          {t('order_success_message')}
        </p>
      </div>
    </div>
  )
}
