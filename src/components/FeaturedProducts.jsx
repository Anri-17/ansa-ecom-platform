import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import ProductCard from './ProductCard'
import { useLanguage } from '../context/LanguageContext'

export default function FeaturedProducts() {
  const { t } = useLanguage()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('featured', true)
          .limit(4)
        
        if (error) throw error
        setProducts(data || [])
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hero"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">
        {t('featured_products')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
