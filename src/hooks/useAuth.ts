import { useAuthStore } from '../store/authStore'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

const CONFIG_ERROR = 'Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env.local lalu restart dev server.'

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
  const { user, session, loading } = useAuthStore()
  const navigate = useNavigate()

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) return { error: new Error(CONFIG_ERROR), session: null }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: new Error(friendlyError(error.message)), session: null }
    return { error: null, session: data.session }
  }

  const signUp = async (email: string, password: string) => {
    if (!isSupabaseConfigured) return { error: new Error(CONFIG_ERROR), session: null, needsConfirmation: false }

    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return { error: new Error(friendlyError(error.message)), session: null, needsConfirmation: false }

    // If session exists → email confirmation is OFF → user is already logged in
    // If session is null → email confirmation is ON → user must confirm email
    return {
      error: null,
      session: data.session,
      needsConfirmation: !data.session,
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return { user, session, loading, signIn, signUp, signOut, isConfigured: isSupabaseConfigured }
}
