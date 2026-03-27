import type { SectionData } from './section'

export interface Project {
  id: string
  userId: string
  name: string
  sections: SectionData[]
  createdAt: string
  updatedAt: string
  projectType?: 'builder' | 'html-import'
  importedHtml?: string
}

export interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
  sections: SectionData[]
}
