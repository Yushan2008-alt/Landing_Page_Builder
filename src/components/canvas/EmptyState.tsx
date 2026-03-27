import { MousePointer } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-24 text-center select-none">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <MousePointer className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="text-base font-medium text-foreground mb-2">Canvas is empty</h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Drag sections from the left panel, or pick a template to get started quickly.
      </p>
    </div>
  )
}
