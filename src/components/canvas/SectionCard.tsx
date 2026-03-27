import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Copy, Trash2 } from 'lucide-react'
import { useBuilderStore } from '../../store/builderStore'
import { SectionPreview } from './SectionPreview'
import type { SectionData } from '../../types/section'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { SECTION_META } from '../../constants/sectionDefaults'

interface Props {
  section: SectionData
  isSelected: boolean
}

export function SectionCard({ section, isSelected }: Props) {
  const { selectSection, removeSection, duplicateSection } = useBuilderStore()
  const {
    attributes, listeners, setNodeRef,
    transform, transition, isDragging,
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group rounded-lg border-2 transition-all overflow-hidden',
        isSelected ? 'border-primary shadow-lg shadow-primary/10' : 'border-transparent hover:border-border',
      )}
      onClick={() => selectSection(section.id)}
    >
      {/* Section Label */}
      <div className={cn(
        'absolute top-2 left-2 z-10 flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium',
        'bg-background/90 backdrop-blur-sm border border-border',
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        'transition-opacity',
      )}>
        <span>{SECTION_META[section.type]?.icon}</span>
        <span>{SECTION_META[section.type]?.label}</span>
      </div>

      {/* Action Buttons */}
      <div className={cn(
        'absolute top-2 right-2 z-10 flex items-center gap-1',
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        'transition-opacity',
      )}>
        {/* Drag Handle */}
        <Button
          variant="secondary"
          size="icon"
          className="h-7 w-7 cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => { e.stopPropagation(); duplicateSection(section.id) }}
          title="Duplicate"
        >
          <Copy className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="h-7 w-7 hover:bg-destructive hover:text-destructive-foreground"
          onClick={(e) => { e.stopPropagation(); removeSection(section.id) }}
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Preview */}
      <div className="pointer-events-none">
        <SectionPreview section={section} />
      </div>
    </div>
  )
}
