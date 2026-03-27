import { create } from 'zustand'
import { arrayMove } from '@dnd-kit/sortable'
import { nanoid } from 'nanoid'
import type { SectionData, SectionStyles, SectionType } from '../types/section'
import type { Project } from '../types/project'
import { createSection } from '../constants/sectionDefaults'

const MAX_HISTORY = 50

interface BuilderState {
  projectId: string | null
  projectName: string
  sections: SectionData[]
  selectedSectionId: string | null
  past: SectionData[][]
  future: SectionData[][]
  isDirty: boolean
  isSaving: boolean

  loadProject: (project: Project) => void
  addSection: (type: SectionType, atIndex?: number) => void
  removeSection: (id: string) => void
  reorderSections: (activeId: string, overId: string) => void
  duplicateSection: (id: string) => void
  updateSectionContent: (id: string, patch: Record<string, unknown>) => void
  updateSectionStyles: (id: string, patch: Partial<SectionStyles>) => void
  selectSection: (id: string | null) => void
  loadTemplate: (sections: SectionData[]) => void
  clearCanvas: () => void
  undo: () => void
  redo: () => void
  setIsSaving: (v: boolean) => void
  setProjectName: (name: string) => void
}

function pushHistory(past: SectionData[][], current: SectionData[]): SectionData[][] {
  const next = [...past, current]
  return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next
}

export const useBuilderStore = create<BuilderState>()((set, get) => ({
  projectId: null,
  projectName: 'Untitled Project',
  sections: [],
  selectedSectionId: null,
  past: [],
  future: [],
  isDirty: false,
  isSaving: false,

  loadProject: (project) => set({
    projectId: project.id,
    projectName: project.name,
    sections: project.sections,
    selectedSectionId: null,
    past: [],
    future: [],
    isDirty: false,
  }),

  addSection: (type, atIndex) => {
    const { sections, past } = get()
    const newSection = createSection(type)
    let next: SectionData[]
    if (atIndex !== undefined) {
      next = [...sections.slice(0, atIndex), newSection, ...sections.slice(atIndex)]
    } else {
      next = [...sections, newSection]
    }
    set({
      sections: next,
      selectedSectionId: newSection.id,
      past: pushHistory(past, sections),
      future: [],
      isDirty: true,
    })
  },

  removeSection: (id) => {
    const { sections, past, selectedSectionId } = get()
    set({
      sections: sections.filter((s) => s.id !== id),
      selectedSectionId: selectedSectionId === id ? null : selectedSectionId,
      past: pushHistory(past, sections),
      future: [],
      isDirty: true,
    })
  },

  reorderSections: (activeId, overId) => {
    const { sections, past } = get()
    const oldIndex = sections.findIndex((s) => s.id === activeId)
    const newIndex = sections.findIndex((s) => s.id === overId)
    if (oldIndex === -1 || newIndex === -1) return
    set({
      sections: arrayMove(sections, oldIndex, newIndex),
      past: pushHistory(past, sections),
      future: [],
      isDirty: true,
    })
  },

  duplicateSection: (id) => {
    const { sections, past } = get()
    const idx = sections.findIndex((s) => s.id === id)
    if (idx === -1) return
    const original = sections[idx]
    const duplicate: SectionData = { ...original, id: nanoid() } as SectionData
    const next = [...sections.slice(0, idx + 1), duplicate, ...sections.slice(idx + 1)]
    set({
      sections: next,
      selectedSectionId: duplicate.id,
      past: pushHistory(past, sections),
      future: [],
      isDirty: true,
    })
  },

  updateSectionContent: (id, patch) => {
    const { sections, past } = get()
    set({
      sections: sections.map((s) =>
        s.id === id ? { ...s, content: { ...s.content, ...patch } } as SectionData : s
      ),
      past: pushHistory(past, sections),
      future: [],
      isDirty: true,
    })
  },

  updateSectionStyles: (id, patch) => {
    const { sections, past } = get()
    set({
      sections: sections.map((s) =>
        s.id === id ? { ...s, styles: { ...s.styles, ...patch } } : s
      ),
      past: pushHistory(past, sections),
      future: [],
      isDirty: true,
    })
  },

  selectSection: (id) => set({ selectedSectionId: id }),

  loadTemplate: (sections) => {
    const { past, sections: current } = get()
    set({
      sections: sections.map((s) => ({ ...s, id: nanoid() })) as SectionData[],
      selectedSectionId: null,
      past: pushHistory(past, current),
      future: [],
      isDirty: true,
    })
  },

  clearCanvas: () => {
    const { sections, past } = get()
    set({
      sections: [],
      selectedSectionId: null,
      past: pushHistory(past, sections),
      future: [],
      isDirty: true,
    })
  },

  undo: () => {
    const { past, sections, future } = get()
    if (past.length === 0) return
    const previous = past[past.length - 1]
    set({
      sections: previous,
      past: past.slice(0, -1),
      future: [sections, ...future],
      isDirty: true,
    })
  },

  redo: () => {
    const { past, sections, future } = get()
    if (future.length === 0) return
    const next = future[0]
    set({
      sections: next,
      past: pushHistory(past, sections),
      future: future.slice(1),
      isDirty: true,
    })
  },

  setIsSaving: (v) => set({ isSaving: v }),
  setProjectName: (name) => set({ projectName: name, isDirty: true }),
}))
