import { useEffect, useRef } from 'react'
import { useBuilderStore } from '../store/builderStore'
import { useAuthStore } from '../store/authStore'
import type { Project } from '../types/project'

function storageKey(userId: string) {
  return `lp_projects_${userId}`
}

function patchProject(userId: string, projectId: string, sections: Project['sections'], name: string) {
  try {
    const raw = localStorage.getItem(storageKey(userId))
    const projects: Project[] = raw ? JSON.parse(raw) : []
    const updated = projects.map((p) =>
      p.id === projectId
        ? { ...p, name, sections, updatedAt: new Date().toISOString() }
        : p
    )
    localStorage.setItem(storageKey(userId), JSON.stringify(updated))
  } catch {
    // silent
  }
}

export function useAutoSave() {
  const { projectId, projectName, sections, isDirty, setIsSaving } = useBuilderStore()
  const { user } = useAuthStore()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!isDirty || !projectId || !user) return

    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      setIsSaving(true)
      patchProject(user.id, projectId, sections, projectName)
      setTimeout(() => setIsSaving(false), 500)
    }, 1000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [sections, projectName, isDirty, projectId, user, setIsSaving])
}
