import {
  DndContext, DragEndEvent, DragOverEvent, PointerSensor, useSensor, useSensors,
  DragOverlay, DragStartEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { useBuilderStore } from '../../store/builderStore'
import { SectionCard } from './SectionCard'
import { EmptyState } from './EmptyState'
import type { SectionType } from '../../types/section'

export function CanvasDropZone() {
  const { sections, selectedSectionId, addSection, reorderSections } = useBuilderStore()
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(String(e.active.id))
  }

  const handleDragOver = (_e: DragOverEvent) => {
    // handled in dragEnd
  }

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = e
    if (!over) return

    const activeData = active.data.current as { source?: string; sectionType?: SectionType } | undefined

    // Library → Canvas drop
    if (activeData?.source === 'library' && activeData.sectionType) {
      // Find drop position
      const overIndex = sections.findIndex((s) => s.id === String(over.id))
      addSection(activeData.sectionType, overIndex >= 0 ? overIndex + 1 : undefined)
      return
    }

    // Canvas reorder
    if (active.id !== over.id) {
      reorderSections(String(active.id), String(over.id))
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2 p-4 min-h-full">
          {sections.length === 0 ? (
            <EmptyState />
          ) : (
            sections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                isSelected={selectedSectionId === section.id}
              />
            ))
          )}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId && (
          <div className="opacity-80 rounded-lg border-2 border-primary shadow-xl">
            <div className="px-4 py-2 text-sm text-muted-foreground text-center">Moving section…</div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
