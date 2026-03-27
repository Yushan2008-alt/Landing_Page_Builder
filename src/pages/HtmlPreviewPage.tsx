import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'
import { useThemeStore } from '../store/themeStore'
import { Button } from '../components/ui/button'
import {
  ArrowLeft, Monitor, Smartphone, Download, Layers, Moon, Sun, Code2,
} from 'lucide-react'

export function HtmlPreviewPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const { getProject } = useProjects()
  const { theme, toggleTheme } = useThemeStore()

  const [project, setProject] = useState<ReturnType<typeof getProject>>()
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop')
  const [showCode, setShowCode] = useState(false)

  useEffect(() => {
    if (!projectId) return
    const p = getProject(projectId)
    setProject(p)
  }, [projectId, getProject])

  const handleDownload = () => {
    if (!project?.importedHtml) return
    const blob = new Blob([project.importedHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Project tidak ditemukan.</p>
          <Button onClick={() => navigate('/dashboard')} variant="outline">Kembali ke Dashboard</Button>
        </div>
      </div>
    )
  }

  if (project.projectType !== 'html-import' || !project.importedHtml) {
    navigate(`/builder/${project.id}`)
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" style={{ height: '100vh' }}>
      {/* Navbar */}
      <nav className="border-b border-border/50 glass-light z-40 shrink-0">
        <div className="max-w-full px-4 h-14 flex items-center gap-3 justify-between">
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </button>
            <span className="text-border/60 shrink-0">|</span>
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="w-5 h-5 rounded flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, oklch(0.62 0.27 285), oklch(0.52 0.22 310))' }}
              >
                <Layers className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold truncate max-w-[200px]">{project.name}</span>
              <span
                className="text-xs px-1.5 py-0.5 rounded shrink-0"
                style={{
                  background: 'oklch(0.62 0.27 285 / 0.15)',
                  color: 'oklch(0.80 0.18 285)',
                  border: '1px solid oklch(0.62 0.27 285 / 0.2)',
                }}
              >
                AI Generated
              </span>
            </div>
          </div>

          {/* Center: viewport toggle */}
          <div
            className="flex items-center gap-1 rounded-lg p-1 shrink-0"
            style={{ background: 'oklch(0.10 0.018 285)', border: '1px solid oklch(0.20 0.03 285)' }}
          >
            <button
              onClick={() => setViewport('desktop')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
              style={{
                background: viewport === 'desktop' ? 'oklch(0.62 0.27 285 / 0.2)' : 'transparent',
                color: viewport === 'desktop' ? 'oklch(0.82 0.18 285)' : 'oklch(0.55 0.04 285)',
                border: viewport === 'desktop' ? '1px solid oklch(0.62 0.27 285 / 0.3)' : '1px solid transparent',
              }}
            >
              <Monitor className="w-3.5 h-3.5" />
              Desktop
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
              style={{
                background: viewport === 'mobile' ? 'oklch(0.62 0.27 285 / 0.2)' : 'transparent',
                color: viewport === 'mobile' ? 'oklch(0.82 0.18 285)' : 'oklch(0.55 0.04 285)',
                border: viewport === 'mobile' ? '1px solid oklch(0.62 0.27 285 / 0.3)' : '1px solid transparent',
              }}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Mobile
            </button>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs border-border/50 bg-transparent hidden sm:flex"
              onClick={() => setShowCode(v => !v)}
            >
              <Code2 className="w-3.5 h-3.5" />
              {showCode ? 'Preview' : 'Lihat Kode'}
            </Button>
            <Button
              size="sm"
              className="gap-1.5 text-xs"
              onClick={handleDownload}
              style={{ boxShadow: '0 0 16px oklch(0.62 0.27 285 / 0.25)' }}
            >
              <Download className="w-3.5 h-3.5" />
              Download HTML
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Preview area */}
      <div className="flex-1 overflow-hidden flex flex-col" style={{ background: 'oklch(0.07 0.012 285)' }}>
        {showCode ? (
          /* Code View */
          <div className="flex-1 overflow-auto p-6">
            <pre
              className="text-xs font-mono leading-relaxed rounded-xl p-5 overflow-auto h-full"
              style={{
                background: 'oklch(0.09 0.015 285)',
                border: '1px solid oklch(0.20 0.03 285)',
                color: 'oklch(0.72 0.03 285)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              {project.importedHtml}
            </pre>
          </div>
        ) : (
          /* Iframe Preview */
          <div className="flex-1 flex items-start justify-center py-6 px-4 overflow-auto">
            <div
              className="transition-all duration-300 overflow-hidden rounded-xl shadow-2xl"
              style={{
                width: viewport === 'mobile' ? '390px' : '100%',
                maxWidth: viewport === 'desktop' ? 'calc(100vw - 48px)' : '390px',
                minHeight: '600px',
                border: '1px solid oklch(0.20 0.03 285)',
                boxShadow: '0 0 60px oklch(0.62 0.27 285 / 0.08)',
              }}
            >
              <iframe
                srcDoc={project.importedHtml}
                title="Landing Page Preview"
                className="w-full"
                style={{
                  height: 'calc(100vh - 120px)',
                  minHeight: '600px',
                  border: 'none',
                  display: 'block',
                }}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
