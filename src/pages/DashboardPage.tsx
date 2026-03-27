import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '../components/ui/dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { Layers, Plus, MoreVertical, Trash2, ExternalLink, LogOut, Sparkles, Wand2, FileCode2 } from 'lucide-react'

export function DashboardPage() {
  const navigate = useNavigate()
  const { projects, loading, createProject, deleteProject } = useProjects()
  const { user, signOut } = useAuth()
  const [newName, setNewName] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleCreate = () => {
    if (!newName.trim()) return
    const project = createProject(newName.trim())
    setNewName('')
    setShowCreate(false)
    navigate(`/builder/${project.id}`)
  }

  const handleDelete = () => {
    if (deleteId) {
      deleteProject(deleteId)
      setDeleteId(null)
    }
  }

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  }

  const userInitial = user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <div className="min-h-screen bg-background bg-grid text-foreground">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed top-[-200px] right-[-100px] w-[500px] h-[500px] opacity-10 blur-3xl rounded-full"
        style={{ background: 'radial-gradient(ellipse, oklch(0.62 0.27 285) 0%, transparent 70%)' }}
        aria-hidden
      />

      {/* Navbar */}
      <nav className="border-b border-border/50 glass-light sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, oklch(0.62 0.27 285), oklch(0.52 0.22 310))' }}
            >
              <Layers className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight">LP Builder</span>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm hover:bg-muted/50 transition-colors outline-none">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, oklch(0.62 0.27 285), oklch(0.52 0.22 310))' }}
                >
                  {userInitial}
                </div>
                <span className="text-sm text-muted-foreground hidden sm:block max-w-[160px] truncate">
                  {user?.email}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={signOut} className="text-destructive gap-2">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* AI Generator Banner */}
        <div
          className="rounded-2xl p-4 sm:p-5 mb-6 flex items-center gap-3 sm:gap-4 cursor-pointer group transition-all hover:scale-[1.005]"
          style={{
            background: 'linear-gradient(135deg, oklch(0.14 0.04 285) 0%, oklch(0.11 0.03 310) 100%)',
            border: '1px solid oklch(0.62 0.27 285 / 0.25)',
            boxShadow: '0 0 40px oklch(0.62 0.27 285 / 0.08)',
          }}
          onClick={() => navigate('/ai-generator')}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, oklch(0.62 0.27 285), oklch(0.52 0.22 310))' }}
          >
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
              AI Landing Page Generator ✨
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Isi formulir → generate prompt AI → buka di Blackbox AI → dapatkan kode landing page siap pakai
            </p>
          </div>
          <Button size="sm" className="shrink-0 gap-1.5 hidden sm:flex">
            Coba Sekarang
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">My Projects</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {projects.length} project{projects.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button onClick={() => setShowCreate(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div
              className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: 'oklch(0.62 0.27 285 / 0.3)', borderTopColor: 'oklch(0.62 0.27 285)' }}
            />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{
                background: 'linear-gradient(135deg, oklch(0.62 0.27 285 / 0.15), oklch(0.62 0.27 285 / 0.05))',
                border: '1px solid oklch(0.62 0.27 285 / 0.2)',
              }}
            >
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Belum ada project</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Buat landing page pertamamu dan mulai mengkonversi pengunjung jadi pelanggan.
            </p>
            <Button onClick={() => setShowCreate(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Buat Project Pertama
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => {
              const isHtmlImport = project.projectType === 'html-import'
              const destination = isHtmlImport ? `/html-preview/${project.id}` : `/builder/${project.id}`
              return (
              <div
                key={project.id}
                className="group glass rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-glow"
                onClick={() => navigate(destination)}
              >
                {/* Thumbnail */}
                <div
                  className="h-36 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: isHtmlImport
                      ? 'linear-gradient(135deg, oklch(0.12 0.04 200) 0%, oklch(0.10 0.025 240) 100%)'
                      : 'linear-gradient(135deg, oklch(0.14 0.04 285) 0%, oklch(0.10 0.025 310) 100%)',
                    borderBottom: '1px solid oklch(0.62 0.27 285 / 0.15)',
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{ background: 'radial-gradient(ellipse at center, oklch(0.62 0.27 285 / 0.3), transparent 70%)' }}
                  />
                  {isHtmlImport
                    ? <FileCode2 className="w-10 h-10 text-primary/50 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    : <Layers className="w-10 h-10 text-primary/50 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  }
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-xs font-medium"
                    style={{ background: 'oklch(0.62 0.27 285 / 0.15)', color: 'oklch(0.80 0.18 285)', border: '1px solid oklch(0.62 0.27 285 / 0.2)' }}>
                    {isHtmlImport ? 'AI Generated' : `${project.sections.length} sections`}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{project.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Updated {formatDate(project.updatedAt)}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 opacity-0 group-hover:opacity-100 h-7 w-7 flex items-center justify-center rounded-lg hover:bg-muted/60 transition-all outline-none"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenuItem onClick={() => navigate(destination)} className="gap-2">
                        <ExternalLink className="w-4 h-4" />
                        {isHtmlImport ? 'Open Preview' : 'Open Builder'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDeleteId(project.id)} className="text-destructive gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Create Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <Input
              placeholder="Nama project..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={!newName.trim()}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Project</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground py-2">
            Tindakan ini tidak dapat dibatalkan. Project dan semua section-nya akan dihapus permanen.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
