import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Layers, Zap, Code, MousePointer, Layout, Palette, ChevronRight } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
              <Layers className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm">LP Builder</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <Badge variant="secondary" className="mb-6">
          No coding required
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
          Build Landing Pages<br />
          <span className="text-primary">That Actually Convert</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Drag, drop, customize. Export clean standalone HTML. No monthly fees, no vendor lock-in.
          Your pages, your code.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/register">
            <Button size="lg" className="gap-2 px-8">
              Start Building Free
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="px-8">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground mb-3">Everything you need</h2>
          <p className="text-muted-foreground">Build fast, ship faster.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
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
          ].map((f) => (
            <div
              key={f.title}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiator Banner */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            No lock-in. Ever.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Every page you build exports as a clean, standalone HTML file.
            Take it anywhere — no subscriptions, no platform dependency.
          </p>
          <Link to="/register">
            <Button size="lg" className="gap-2">
              Build Your First Page
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Layers className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">LP Builder</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LP Builder. Build without limits.
          </p>
        </div>
      </footer>
    </div>
  )
}
