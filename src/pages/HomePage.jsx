import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import HeroSection from '../components/HeroSection'
import FeaturedProducts from '../components/FeaturedProducts'
import ReviewSection from '../components/ReviewSection'
import Footer from '../components/Footer'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <div className="flex-1">
        <FeaturedProducts />
        <ReviewSection />
      </div>
      <Footer />
    </div>
  )
}
