import { useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBuilderStore } from '../store/builderStore'
import { useProjects } from '../hooks/useProjects'
import { useAutoSave } from '../hooks/useAutoSave'
import { AppShell } from '../components/layout/AppShell'
import { Layers } from 'lucide-react'

export function BuilderPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const { loadProject } = useBuilderStore()
  const { getProject } = useProjects()

  useAutoSave()

  const load = useCallback(() => {
    if (!projectId) return
    const project = getProject(projectId)
    if (!project) {
      navigate('/dashboard')
      return
    }
    loadProject(project)
  }, [projectId, getProject, loadProject, navigate])

  useEffect(() => {
    load()
  }, [load])

  // Keyboard shortcuts
  useEffect(() => {
    const { undo, redo } = useBuilderStore.getState()
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') { e.preventDefault(); undo() }
      if ((e.ctrlKey || e.metaKey) && (e.shiftKey && e.key === 'z' || e.key === 'y')) { e.preventDefault(); redo() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (!projectId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        <Layers className="w-6 h-6 mr-2" /> Project not found
      </div>
    )
  }

  return <AppShell />
}
