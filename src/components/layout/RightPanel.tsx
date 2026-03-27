import { PropertiesPanel } from '../right-panel/PropertiesPanel'

export function RightPanel() {
  return (
    <div className="w-[300px] shrink-0 border-l border-border bg-card flex flex-col overflow-hidden">
      <PropertiesPanel />
    </div>
  )
}
