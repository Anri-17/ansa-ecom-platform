import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import Product3DView from './Product3DView'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { t } = useLanguage()
  const [showNotification, setShowNotification] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  return (
    <div className="relative">
      <Link to={`/products/${product.id}`}>
        <motion.div
          className="card group"
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="h-64 relative bg-gray-50 overflow-hidden">
            <Product3DView product={product} isHovered={isHovered} />
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {t('out_of_stock')}
                </span>
              </div>
            )}
          </div>
          
          <div className="p-6">
            <h3 className="text-lg font-semibold text-text line-clamp-1">
              {product.name}
            </h3>
            <p className="text-text-light mt-2 line-clamp-2 min-h-[3rem]">
              {product.description}
            </p>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-hero font-bold text-xl">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <button
                onClick={handleAddToCart}
                className="btn-outline-black"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? t('out_of_stock') : t('add_to_cart')}
              </button>
            </div>
            
            {product.stock > 0 && product.stock <= 5 && (
              <div className="mt-3 text-sm text-orange-500">
                {t('only_x_left', { count: product.stock })}
              </div>
            )}
          </div>
        </motion.div>
      </Link>

      {/* Notification */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4 animate-fade-in z-50">
          <span>{t('product_added_to_cart')}</span>
          <Link 
            to="/cart" 
            className="underline hover:text-green-100"
          >
            {t('view_cart')}
          </Link>
        </div>
      )}
    </div>
  )
}
