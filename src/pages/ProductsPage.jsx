import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import ProductCard from '../components/ProductCard'
import { useLanguage } from '../context/LanguageContext'

export default function ProductsPage() {
  const { t } = useLanguage()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories] = useState([
    { id: 'all', name: t('all') },
    { id: 'jersey', name: t('jerseys') },
    { id: 'cleats', name: t('cleats') },
    { id: 'accessories', name: t('accessories') }
  ])
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        let query = supabase.from('products').select('*')
        
        if (selectedCategory !== 'all') {
          query = query.eq('category', selectedCategory)
        }

        const { data, error } = await query
        
        if (error) throw error
        setProducts(data || [])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory, t])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-black">{t('products')}</h1>
      
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full border-2 ${
              selectedCategory === category.id
                ? 'border-black bg-black text-white'
                : 'border-black text-black hover:bg-black hover:text-white'
            } transition-colors duration-200`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hero"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p>{t('no_products_found')}</p>
        </div>
      )}
    </div>
  )
}
