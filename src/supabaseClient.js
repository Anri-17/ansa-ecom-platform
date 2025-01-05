import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key in environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    heartbeatIntervalMs: 10000,
    timeoutMs: 60000
  }
})

// Helper functions
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

export const uploadProductImage = async (file) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase
    .storage
    .from('product-images')
    .upload(filePath, file)

  if (error) throw error

  return supabase
    .storage
    .from('product-images')
    .getPublicUrl(data.path)
}

export const getProductImageUrl = (path) => {
  return supabase
    .storage
    .from('product-images')
    .getPublicUrl(path)
}

export { supabase }
