import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { SectionLibrary } from '../left-panel/SectionLibrary'
import { TemplateGallery } from '../left-panel/TemplateGallery'

export function LeftPanel() {
  return (
    <div className="w-[270px] shrink-0 border-r border-border bg-card flex flex-col overflow-hidden">
      <Tabs defaultValue="sections" className="flex flex-col flex-1 overflow-hidden">
        <TabsList className="mx-3 mt-3 mb-0 shrink-0">
          <TabsTrigger value="sections" className="flex-1 text-xs">Sections</TabsTrigger>
          <TabsTrigger value="templates" className="flex-1 text-xs">Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="sections" className="flex-1 overflow-y-auto mt-1">
          <SectionLibrary />
        </TabsContent>
        <TabsContent value="templates" className="flex-1 overflow-y-auto mt-1">
          <TemplateGallery />
        </TabsContent>
      </Tabs>
    </div>
  )
}
