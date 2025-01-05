import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
        
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          navigate('/')
        }
      }
    )

    return () => subscription?.unsubscribe()
  }, [navigate])

  const value = {
    user,
    loading,
    signIn: async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (!error) {
        navigate('/')
      }
      return { user: data?.user, error }
    },
    signOut: async () => {
      await supabase.auth.signOut()
      navigate('/')
    },
    signUp: async (email, password) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      if (!error) {
        navigate('/')
      }
      return { user: data?.user, error }
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
