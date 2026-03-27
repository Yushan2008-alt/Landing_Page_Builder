import { useBuilderStore } from '../../store/builderStore'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { SectionStyleControls } from './shared/SectionStyleControls'
import { HeroEditor } from './editors/HeroEditor'
import { FeaturesEditor } from './editors/FeaturesEditor'
import { PricingEditor } from './editors/PricingEditor'
import { FaqEditor } from './editors/FaqEditor'
import { CtaEditor } from './editors/CtaEditor'
import { AboutEditor } from './editors/AboutEditor'
import { ContactEditor } from './editors/ContactEditor'
import { TestimonialsEditor } from './editors/TestimonialsEditor'
import { LogoStripEditor } from './editors/LogoStripEditor'
import { SECTION_META } from '../../constants/sectionDefaults'
import type { SectionData } from '../../types/section'
import { Settings2 } from 'lucide-react'

function ContentEditor({ section }: { section: SectionData }) {
  const { updateSectionContent } = useBuilderStore()
  const onChange = (patch: Record<string, unknown>) => updateSectionContent(section.id, patch)

  switch (section.type) {
    case 'hero':         return <HeroEditor content={section.content} onChange={onChange} />
    case 'features':     return <FeaturesEditor content={section.content} onChange={onChange} />
    case 'pricing':      return <PricingEditor content={section.content} onChange={onChange} />
    case 'faq':          return <FaqEditor content={section.content} onChange={onChange} />
    case 'cta':          return <CtaEditor content={section.content} onChange={onChange} />
    case 'about':        return <AboutEditor content={section.content} onChange={onChange} />
    case 'contact':      return <ContactEditor content={section.content} onChange={onChange} />
    case 'testimonials': return <TestimonialsEditor content={section.content} onChange={onChange} />
    case 'logo-strip':   return <LogoStripEditor content={section.content} onChange={onChange} />
  }
}

export function PropertiesPanel() {
  const { sections, selectedSectionId, updateSectionStyles } = useBuilderStore()
  const selected = sections.find((s) => s.id === selectedSectionId)

  if (!selected) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 px-4 text-center">
        <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center mb-3">
          <Settings2 className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">
          Click a section to edit its content and styles
        </p>
      </div>
    )
  }

  const meta = SECTION_META[selected.type]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-2 shrink-0">
        <span className="text-base">{meta.icon}</span>
        <span className="text-sm font-medium text-foreground">{meta.label}</span>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="content" className="flex flex-col flex-1 overflow-hidden">
        <TabsList className="mx-4 mt-2 mb-0 shrink-0">
          <TabsTrigger value="content" className="flex-1 text-xs">Content</TabsTrigger>
          <TabsTrigger value="style" className="flex-1 text-xs">Style</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="flex-1 overflow-y-auto mt-0 pb-4">
          <ContentEditor section={selected} />
        </TabsContent>
        <TabsContent value="style" className="flex-1 overflow-y-auto mt-0 pb-4">
          <SectionStyleControls
            styles={selected.styles}
            onChange={(patch) => updateSectionStyles(selected.id, patch)}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
