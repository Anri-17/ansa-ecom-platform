import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <div className="relative h-[600px] bg-hero">
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            {t('welcome_to_ansa')}
          </h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-100">
            {t('hero_description')}
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/products"
              className="btn-outline-white"
            >
              {t('shop_now')}
            </a>
            <a
              href="/about"
              className="btn-outline-white"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
