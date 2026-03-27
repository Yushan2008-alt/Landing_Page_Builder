import { useDraggable } from '@dnd-kit/core'
import type { SectionType } from '../../types/section'
import { SECTION_META } from '../../constants/sectionDefaults'
import { useBuilderStore } from '../../store/builderStore'
import { cn } from '../../lib/utils'
import { Plus } from 'lucide-react'

interface Props { type: SectionType }

export function SectionTile({ type }: Props) {
  const meta = SECTION_META[type]
  const { addSection } = useBuilderStore()
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `tile-${type}`,
    data: { source: 'library', sectionType: type },
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        'group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border',
        'cursor-grab active:cursor-grabbing select-none',
        'hover:border-primary/50 hover:bg-muted/50 transition-all',
        isDragging && 'opacity-40',
      )}
    >
      <span className="text-lg w-7 text-center">{meta.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground">{meta.label}</div>
        <div className="text-xs text-muted-foreground truncate">{meta.description}</div>
      </div>
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => { e.stopPropagation(); addSection(type) }}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-primary/10 text-primary"
        title="Add section"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
