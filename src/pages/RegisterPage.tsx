import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Layers, AlertTriangle, Eye, EyeOff, Info } from 'lucide-react'

export function RegisterPage() {
  const { signUp, user, isConfigured } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [needsConfirmation, setNeedsConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) navigate('/ai-generator')
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
      navigate('/ai-generator')
    } else if (needsConfirmation) {
      setNeedsConfirmation(true)
    }
  }

  return (
    <div className="min-h-screen bg-background bg-grid flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] opacity-25 blur-3xl rounded-full"
        style={{ background: 'radial-gradient(ellipse, oklch(0.62 0.27 285) 0%, transparent 70%)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-[-100px] left-[-100px] w-[350px] h-[350px] opacity-10 blur-3xl rounded-full"
        style={{ background: 'radial-gradient(ellipse, oklch(0.75 0.18 210) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 justify-center mb-8 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105"
            style={{ background: 'linear-gradient(135deg, oklch(0.62 0.27 285), oklch(0.52 0.22 310))' }}
          >
            <Layers className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-semibold text-foreground tracking-tight">LP Builder</span>
        </Link>

        {/* Local storage mode notice */}
        {!isConfigured && (
          <div className="mb-4 flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/8 px-3.5 py-2.5 text-xs text-primary/90">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              Mode lokal aktif — data disimpan di browser Anda. Untuk cloud sync, isi{' '}
              <code className="font-mono opacity-80">.env.local</code> dengan kredensial Supabase.
            </span>
          </div>
        )}

        {/* Card */}
        <div className="glass rounded-2xl p-8">
          {needsConfirmation ? (
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, oklch(0.62 0.27 285 / 0.2), oklch(0.62 0.27 285 / 0.08))' }}>
                <span className="text-2xl">✉️</span>
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Cek email Anda</h2>
              <p className="text-sm text-muted-foreground mb-1">Link konfirmasi dikirim ke:</p>
              <p className="text-sm font-medium text-primary mb-4">{email}</p>
              <p className="text-xs text-muted-foreground mb-6">
                Klik link di email tersebut untuk mengaktifkan akun, lalu login di sini.
              </p>
              <Link to="/login">
                <Button variant="outline" className="w-full border-border/50 hover:border-primary/40 bg-transparent">
                  Ke Halaman Login
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-semibold text-foreground mb-1">Buat akun</h1>
              <p className="text-sm text-muted-foreground mb-7">
                Mulai membangun landing page secara gratis
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="kamu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                    className="bg-white/5 border-white/10 focus:border-primary/60 h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPass ? 'text' : 'password'}
                      placeholder="Min. 6 karakter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/5 border-white/10 focus:border-primary/60 h-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirm" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Konfirmasi Password
                  </Label>
                  <Input
                    id="confirm"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Ulangi password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 focus:border-primary/60 h-10"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-xs text-destructive">
                    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-10 mt-2"
                  style={{ boxShadow: loading ? 'none' : '0 0 20px oklch(0.62 0.27 285 / 0.30)' }}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Membuat akun…
                    </span>
                  ) : 'Buat Akun'}
                </Button>
              </form>
            </>
          )}
        </div>

        {!needsConfirmation && (
          <p className="text-sm text-muted-foreground text-center mt-5">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
