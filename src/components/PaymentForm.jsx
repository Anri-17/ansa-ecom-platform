import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'

const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY)

export default function PaymentForm() {
  const { cart, totalPrice, clearCart } = useCart()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const stripe = await stripePromise
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: cart,
          orderDetails,
          total: totalPrice
        })
      })

      const session = await response.json()
      await stripe.redirectToCheckout({
        sessionId: session.id
      })

      clearCart()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={orderDetails.name}
        onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
        placeholder={t('full_name')}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        value={orderDetails.address}
        onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
        placeholder={t('address')}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        value={orderDetails.city}
        onChange={(e) => setOrderDetails({ ...orderDetails, city: e.target.value })}
        placeholder={t('city')}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        value={orderDetails.zip}
        onChange={(e) => setOrderDetails({ ...orderDetails, zip: e.target.value })}
        placeholder={t('zip_code')}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="tel"
        value={orderDetails.phone}
        onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
        placeholder={t('phone')}
        className="w-full p-2 border rounded"
        required
      />
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? t('processing') : t('pay_now')}
      </button>
    </form>
  )
}
