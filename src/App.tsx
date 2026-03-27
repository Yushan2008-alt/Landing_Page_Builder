import { useEffect } from 'react'
import { AppRouter } from './router'
import { useAuthStore } from './store/authStore'
import { supabase, isSupabaseConfigured } from './lib/supabase'
import { getLocalUser } from './lib/localAuth'

export default function App() {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Use localStorage auth
      const localUser = getLocalUser()
      setUser(localUser)
      setLoading(false)
      return
    }

    // Use Supabase auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email } : null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email } : null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [setUser, setLoading])

  return <AppRouter />
}
