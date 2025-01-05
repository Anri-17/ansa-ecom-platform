import { useState } from 'react'
import { processPayment } from '../api/paymentHandlers'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'

export default function PaymentOptions() {
  const { t } = useLanguage()
  const { totalPrice } = useCart()
  const [selectedMethod, setSelectedMethod] = useState('bog')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePayment = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const paymentData = {
        amount: totalPrice,
        currency: 'GEL',
        order_id: Date.now().toString()
      }

      const result = await processPayment(paymentData, selectedMethod)
      
      if (result.status === 'error') {
        throw new Error(result.error)
      }

      // Handle successful payment
      window.location.href = '/order-success'
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">{t('payment_method')}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setSelectedMethod('bog')}
          className={`p-4 border rounded-lg ${
            selectedMethod === 'bog' ? 'border-primary' : 'border-gray-300'
          }`}
        >
          <img src="/bog-logo.png" alt="Bank of Georgia" className="h-10 mx-auto" />
        </button>
        
        <button
          onClick={() => setSelectedMethod('tbc')}
          className={`p-4 border rounded-lg ${
            selectedMethod === 'tbc' ? 'border-primary' : 'border-gray-300'
          }`}
        >
          <img src="/tbc-logo.png" alt="TBC Bank" className="h-10 mx-auto" />
        </button>
        
        <button
          onClick={() => setSelectedMethod('apple')}
          className={`p-4 border rounded-lg ${
            selectedMethod === 'apple' ? 'border-primary' : 'border-gray-300'
          }`}
        >
          <img src="/apple-pay-logo.png" alt="Apple Pay" className="h-10 mx-auto" />
        </button>
        
        <button
          onClick={() => setSelectedMethod('google')}
          className={`p-4 border rounded-lg ${
            selectedMethod === 'google' ? 'border-primary' : 'border-gray-300'
          }`}
        >
          <img src="/google-pay-logo.png" alt="Google Pay" className="h-10 mx-auto" />
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? t('processing') : t('pay_now')}
      </button>
    </div>
  )
}
