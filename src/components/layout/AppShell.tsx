import { Toolbar } from './Toolbar'
import { LeftPanel } from './LeftPanel'
import { RightPanel } from './RightPanel'
import { CanvasDropZone } from '../canvas/CanvasDropZone'

export function AppShell() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel />
        {/* Canvas */}
        <div className="flex-1 overflow-y-auto bg-muted/20">
          <CanvasDropZone />
        </div>
        <RightPanel />
      </div>
    </div>
  )
}
