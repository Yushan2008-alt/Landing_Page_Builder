import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!supabaseUrl || supabaseUrl === 'https://your-project.supabase.co') {
  console.warn(
    '[LP Builder] Supabase URL not configured. Set VITE_SUPABASE_URL in .env.local'
  )
}

export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder'
)

export const isSupabaseConfigured =
  !!supabaseUrl &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !!supabaseAnonKey &&
  supabaseAnonKey !== 'your-anon-key'
