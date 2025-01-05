import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import PaymentOptions from '../components/PaymentOptions'

export default function CheckoutPage() {
  const { t } = useLanguage()
  const { cart, totalPrice } = useCart()
  const [isGuest, setIsGuest] = useState(true)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{t('checkout')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-bold mb-4">{t('shipping_details')}</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsGuest(true)}
                  className={`px-4 py-2 rounded ${
                    isGuest ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {t('guest_checkout')}
                </button>
                <button
                  onClick={() => setIsGuest(false)}
                  className={`px-4 py-2 rounded ${
                    !isGuest ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {t('login_to_checkout')}
                </button>
              </div>
              {/* Shipping form would go here */}
            </div>
          </div>
          
          <PaymentOptions />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">{t('order_summary')}</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>{t('total')}</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
