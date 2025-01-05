import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ANSA</h3>
            <p className="text-gray-300">
              {t('footer_description')}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('quick_links')}</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-hero">{t('home')}</a></li>
              <li><a href="/products" className="hover:text-hero">{t('products')}</a></li>
              <li><a href="/contact" className="hover:text-hero">{t('contact')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact_info')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li>123 Football Street</li>
              <li>Tbilisi, Georgia</li>
              <li>Phone: +995 555 123 456</li>
              <li>Email: info@ansa.ge</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('newsletter')}</h4>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder={t('enter_email')}
                className="input-field"
              />
              <button
                type="submit"
                className="btn-outline-white"
              >
                {t('subscribe')}
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} ANSA. {t('all_rights_reserved')}
          </p>
        </div>
      </div>
    </footer>
  )
}
