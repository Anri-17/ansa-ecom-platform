import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App
