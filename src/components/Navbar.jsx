import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage()
  const { totalItems } = useCart()
  const { user, role } = useAuth() || {}
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    setShowLanguageDropdown(false)
  }

  const getCurrentFlag = () => {
    return language === 'en' ? '🇬🇧' : '🇬🇪'
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-black">
          ANSA
        </Link>

        <div className="flex items-center space-x-6">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link to="/" className="text-black hover:text-hero">
                {t('home')}
              </Link>
              <Link to="/products" className="text-black hover:text-hero">
                {t('products')}
              </Link>
              <Link to="/contact" className="text-black hover:text-hero">
                {t('contact')}
              </Link>
              {role === 'admin' && (
                <Link to="/admin" className="text-black hover:text-hero">
                  {t('admin_panel')}
                </Link>
              )}
            </div>

            {/* Cart and Account Icons */}
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative text-black hover:text-hero">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-hero text-white text-xs rounded-full px-2 py-1">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link to="/account" className="text-black hover:text-hero">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center focus:outline-none"
            >
              <span className="text-2xl">{getCurrentFlag()}</span>
            </button>
            
            {showLanguageDropdown && (
              <div className="absolute right-0 mt-2 w-16 bg-white rounded-lg shadow-lg">
                <button
                  onClick={() => handleLanguageChange('ka')}
                  className={`w-full p-2 flex justify-center hover:bg-gray-100 rounded-t-lg ${
                    language === 'ka' ? 'bg-gray-100' : ''
                  }`}
                >
                  <span className="text-2xl">🇬🇪</span>
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`w-full p-2 flex justify-center hover:bg-gray-100 rounded-b-lg ${
                    language === 'en' ? 'bg-gray-100' : ''
                  }`}
                >
                  <span className="text-2xl">🇬🇧</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 focus:outline-none"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-enter md:hidden fixed inset-0 bg-white z-50 p-4">
            <div className="flex justify-end">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 focus:outline-none"
              >
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-4 mt-4">
              <Link to="/" className="text-black hover:text-hero" onClick={() => setMobileMenuOpen(false)}>
                {t('home')}
              </Link>
              <Link to="/products" className="text-black hover:text-hero" onClick={() => setMobileMenuOpen(false)}>
                {t('products')}
              </Link>
              <Link to="/contact" className="text-black hover:text-hero" onClick={() => setMobileMenuOpen(false)}>
                {t('contact')}
              </Link>
              {role === 'admin' && (
                <Link to="/admin" className="text-black hover:text-hero" onClick={() => setMobileMenuOpen(false)}>
                  {t('admin_panel')}
                </Link>
              )}
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="relative text-black hover:text-hero" onClick={() => setMobileMenuOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-hero text-white text-xs rounded-full px-2 py-1">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <Link to="/account" className="text-black hover:text-hero" onClick={() => setMobileMenuOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
