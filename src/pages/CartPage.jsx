import React from 'react'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const { t } = useLanguage()
  const {
    cart,
    totalItems,
    totalPrice,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">{t('cart')}</h1>

      {totalItems === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t('empty_cart')}</p>
          <Link
            to="/products"
            className="btn-outline-black"
          >
            {t('continue_shopping')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center border-b py-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg mr-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    min="1"
                    className="w-16 px-2 py-1 border rounded"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    {t('remove')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">{t('order_summary')}</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>{t('subtotal')}</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('shipping')}</span>
                <span>{t('free')}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>{t('total')}</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <Link
                to="/checkout"
                className="btn-outline-black w-full text-center"
              >
                {t('proceed_to_checkout')}
              </Link>
              <button
                onClick={clearCart}
                className="w-full text-gray-600 hover:text-gray-800 underline"
              >
                {t('clear_cart')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
