import { SECTION_META } from '../../constants/sectionDefaults'
import type { SectionType } from '../../types/section'
import { SectionTile } from './SectionTile'

const SECTION_TYPES = Object.keys(SECTION_META) as SectionType[]

export function SectionLibrary() {
  return (
    <div className="flex flex-col gap-1 p-3">
      <p className="text-xs text-muted-foreground px-1 mb-1">Drag to canvas or click + to add</p>
      {SECTION_TYPES.map((type) => (
        <SectionTile key={type} type={type} />
      ))}
    </div>
  )
}
