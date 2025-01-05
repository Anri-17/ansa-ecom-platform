import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProductsPage from '../pages/ProductsPage'
import ContactPage from '../pages/ContactPage'
import CartPage from '../pages/CartPage'
import AccountPage from '../pages/AccountPage'
import NotFoundPage from '../pages/NotFoundPage'
import { useAuth } from '../context/AuthContext'

function AppRoutes() {
  const { user } = useAuth()
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/account" element={<AccountPage />} />
      {user && (
        <Route path="/admin" element={<NotFoundPage />} />
      )}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
