import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Layers, Zap, Code, MousePointer, Layout, Palette, ChevronRight, Sparkles } from 'lucide-react'

const features = [
  {
    icon: <MousePointer className="w-5 h-5" />,
    title: 'Drag & Drop Builder',
    desc: 'Visually arrange 9 section types with an intuitive drag-and-drop interface.',
  },
  {
    icon: <Code className="w-5 h-5" />,
    title: 'Export Clean HTML',
    desc: 'Get a standalone HTML file with zero dependencies. Host it anywhere.',
  },
  {
    icon: <Layout className="w-5 h-5" />,
    title: '9 Section Types',
    desc: 'Hero, Features, Pricing, FAQ, CTA, Testimonials, Logo Strip, and more.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Instant Preview',
    desc: 'See your changes in real time. Toggle between desktop and mobile views.',
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: 'Full Customization',
    desc: 'Colors, fonts, spacing, borders — customize every detail to match your brand.',
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: 'Multiple Projects',
    desc: 'Manage all your landing page projects from one clean dashboard.',
  },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground bg-grid overflow-hidden">

      {/* Navbar */}
      <nav className="border-b border-border/50 glass-light sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, oklch(0.62 0.27 285), oklch(0.55 0.22 310))' }}>
              <Layers className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight">LP Builder</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-20 blur-3xl rounded-full"
        style={{ background: 'radial-gradient(ellipse, oklch(0.62 0.27 285) 0%, transparent 70%)' }}
        aria-hidden
      />

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-28 pb-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-8 glass-light border border-primary/20 text-primary">
          <Sparkles className="w-3 h-3" />
          No coding required · Export standalone HTML
        </div>

        <h1 className="text-5xl md:text-[64px] font-bold tracking-tight leading-[1.08] mb-6">
          Build Landing Pages<br />
          <span className="gradient-text">That Actually Convert</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Drag, drop, customize. Export clean standalone HTML.
          No monthly fees, no vendor lock-in. Your pages, your code.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/register">
            <Button size="lg" className="gap-2 px-8 glow-primary-sm">
              Start Building Free
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="px-8 border-border/60 hover:border-primary/40 bg-transparent">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Decorative dots */}
        <div className="absolute top-12 left-8 w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
        <div className="absolute top-32 right-12 w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-16 left-20 w-1 h-1 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: '2s' }} />
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">
            Everything you need,{' '}
            <span className="gradient-text">nothing you don't</span>
          </h2>
          <p className="text-muted-foreground">Build fast. Ship faster.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group glass rounded-xl p-6 transition-all duration-300 hover:border-glow hover:scale-[1.02]"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, oklch(0.62 0.27 285 / 0.25), oklch(0.62 0.27 285 / 0.08))' }}
              >
                <span className="text-primary">{f.icon}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div
          className="relative rounded-2xl p-10 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, oklch(0.14 0.04 285) 0%, oklch(0.12 0.03 310) 100%)',
            border: '1px solid oklch(0.62 0.27 285 / 0.25)',
            boxShadow: '0 0 60px oklch(0.62 0.27 285 / 0.12)',
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center top, oklch(0.62 0.27 285 / 0.3), transparent 60%)' }}
          />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-3">
              No lock-in.{' '}
              <span className="gradient-text">Ever.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-7">
              Every page you build exports as a clean, standalone HTML file.
              Take it anywhere — no subscriptions, no platform dependency.
            </p>
            <Link to="/register">
              <Button size="lg" className="gap-2 glow-primary-sm">
                Build Your First Page
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, oklch(0.62 0.27 285), oklch(0.55 0.22 310))' }}
            >
              <Layers className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium">LP Builder</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LP Builder. Build without limits.
          </p>
        </div>
      </footer>
    </div>
  )
}
