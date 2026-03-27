import { useState, useEffect, useCallback } from 'react'
import { nanoid } from 'nanoid'
import type { Project } from '../types/project'
import { useAuthStore } from '../store/authStore'

function storageKey(userId: string) {
  return `lp_projects_${userId}`
}

function loadProjects(userId: string): Project[] {
  try {
    const raw = localStorage.getItem(storageKey(userId))
    return raw ? (JSON.parse(raw) as Project[]) : []
  } catch {
    return []
  }
}

function saveProjects(userId: string, projects: Project[]) {
  localStorage.setItem(storageKey(userId), JSON.stringify(projects))
}

export function useProjects() {
  const { user } = useAuthStore()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setProjects([]); setLoading(false); return }
    setProjects(loadProjects(user.id))
    setLoading(false)
  }, [user])

  const createProject = useCallback((name: string): Project => {
    if (!user) throw new Error('Not authenticated')
    const project: Project = {
      id: nanoid(),
      userId: user.id,
      name,
      sections: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      projectType: 'builder',
    }
    const updated = [project, ...projects]
    setProjects(updated)
    saveProjects(user.id, updated)
    return project
  }, [user, projects])

  const createHtmlProject = useCallback((name: string, html: string): Project => {
    if (!user) throw new Error('Not authenticated')
    const project: Project = {
      id: nanoid(),
      userId: user.id,
      name,
      sections: [],
      importedHtml: html,
      projectType: 'html-import',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updated = [project, ...projects]
    setProjects(updated)
    saveProjects(user.id, updated)
    return project
  }, [user, projects])

  const updateProject = useCallback((id: string, patch: Partial<Pick<Project, 'name' | 'sections'>>) => {
    if (!user) return
    const updated = projects.map((p) =>
      p.id === id ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p
    )
    setProjects(updated)
    saveProjects(user.id, updated)
  }, [user, projects])

  const deleteProject = useCallback((id: string) => {
    if (!user) return
    const updated = projects.filter((p) => p.id !== id)
    setProjects(updated)
    saveProjects(user.id, updated)
  }, [user, projects])

  const getProject = useCallback((id: string): Project | undefined => {
    if (!user) return undefined
    return loadProjects(user.id).find((p) => p.id === id)
  }, [user])

  return { projects, loading, createProject, createHtmlProject, updateProject, deleteProject, getProject }
}
