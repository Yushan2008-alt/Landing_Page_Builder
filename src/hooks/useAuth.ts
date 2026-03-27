import { useAuthStore } from '../store/authStore'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { localSignUp, localSignIn, localSignOut } from '../lib/localAuth'
import { useNavigate } from 'react-router-dom'

function friendlyError(message: string): string {
  if (message.includes('Failed to fetch') || message.includes('NetworkError') || message.includes('fetch'))
    return 'Tidak dapat terhubung ke server. Periksa koneksi internet dan konfigurasi Supabase.'
  if (message.includes('Invalid login credentials'))
    return 'Email atau password salah.'
  if (message.includes('Email not confirmed'))
    return 'Email belum dikonfirmasi. Cek inbox Anda dan klik link konfirmasi.'
  if (message.includes('User already registered'))
    return 'Email sudah terdaftar. Silakan login.'
  if (message.includes('Password should be at least'))
    return 'Password minimal 6 karakter.'
  if (message.includes('Unable to validate email address'))
    return 'Format email tidak valid.'
  return message
}

export function useAuth() {
  const { user, loading, setUser, setLoading } = useAuthStore()
  const navigate = useNavigate()

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      const { error, user: localUser } = await localSignIn(email, password)
      if (error) return { error }
      setUser(localUser)
      return { error: null }
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: new Error(friendlyError(error.message)) }
    setUser(data.user ? { id: data.user.id, email: data.user.email } : null)
    return { error: null }
  }

  const signUp = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      const { error, user: localUser } = await localSignUp(email, password)
      if (error) return { error, session: null, needsConfirmation: false }
      setUser(localUser)
      return { error: null, session: { local: true }, needsConfirmation: false }
    }

    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return { error: new Error(friendlyError(error.message)), session: null, needsConfirmation: false }

    if (data.session) {
      setUser({ id: data.session.user.id, email: data.session.user.email })
    }
    return {
      error: null,
      session: data.session,
      needsConfirmation: !data.session,
    }
  }

  const signOut = async () => {
    if (!isSupabaseConfigured) {
      localSignOut()
      setUser(null)
      navigate('/')
      return
    }
    await supabase.auth.signOut()
    setUser(null)
    setLoading(false)
    navigate('/')
  }

  return { user, loading, signIn, signUp, signOut, isConfigured: isSupabaseConfigured }
}
