import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Layers, AlertTriangle } from 'lucide-react'

export function RegisterPage() {
  const { signUp, user, isConfigured } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)

  // Jika sudah login, redirect ke dashboard
  useEffect(() => {
    if (user) navigate('/dashboard')
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Password tidak cocok.')
      return
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter.')
      return
    }

    setLoading(true)
    const { error, session, needsConfirmation } = await signUp(email, password)
    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    if (session) {
      // Email confirmation dimatikan di Supabase → langsung masuk
      navigate('/dashboard')
    } else if (needsConfirmation) {
      // Email confirmation aktif → minta user cek inbox
      setNeedsConfirmation(true)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-foreground">LP Builder</span>
        </Link>

        {/* Supabase not configured warning */}
        {!isConfigured && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2.5 text-xs text-yellow-600 dark:text-yellow-400">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              Supabase belum dikonfigurasi. Isi <code className="font-mono">.env.local</code> dengan URL dan Anon Key dari dashboard Supabase Anda.
            </span>
          </div>
        )}

        <div className="bg-card border border-border rounded-xl p-8">
          {needsConfirmation ? (
            <div className="text-center">
              <div className="text-3xl mb-3">✅</div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Cek email Anda</h2>
              <p className="text-sm text-muted-foreground mb-1">
                Link konfirmasi dikirim ke:
              </p>
              <p className="text-sm font-medium text-foreground mb-4">{email}</p>
              <p className="text-xs text-muted-foreground mb-5">
                Klik link di email tersebut untuk mengaktifkan akun, lalu login di sini.
              </p>
              <Link to="/login">
                <Button variant="outline" className="w-full">Ke Halaman Login</Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-foreground mb-1">Buat akun</h1>
              <p className="text-sm text-muted-foreground mb-6">Mulai membangun landing page secara gratis</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="kamu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Min. 6 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm">Konfirmasi Password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    placeholder="Ulangi password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={loading || !isConfigured}>
                  {loading ? 'Membuat akun…' : 'Buat Akun'}
                </Button>
              </form>
            </>
          )}
        </div>

        {!needsConfirmation && (
          <p className="text-sm text-muted-foreground text-center mt-4">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-primary hover:underline">Login</Link>
          </p>
        )}
      </div>
    </div>
  )
}
