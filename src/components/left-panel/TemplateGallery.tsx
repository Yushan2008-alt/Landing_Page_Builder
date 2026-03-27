import { TEMPLATES } from '../../constants/templates'
import { useBuilderStore } from '../../store/builderStore'
import { Button } from '../ui/button'
import { Layout } from 'lucide-react'

export function TemplateGallery() {
  const { loadTemplate, sections } = useBuilderStore()

  const handleLoad = (templateSections: typeof TEMPLATES[number]['sections']) => {
    if (sections.length > 0) {
      if (!confirm('This will replace your current canvas. Continue?')) return
    }
    loadTemplate(templateSections)
  }

  return (
    <div className="flex flex-col gap-3 p-3">
      <p className="text-xs text-muted-foreground px-1">Pick a template to start with</p>
      {TEMPLATES.map((tmpl) => (
        <div key={tmpl.id} className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
          {/* Thumbnail placeholder */}
          <div className="h-28 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <Layout className="w-8 h-8 text-primary/40" />
          </div>
          <div className="p-3">
            <div className="font-medium text-sm text-foreground mb-0.5">{tmpl.name}</div>
            <div className="text-xs text-muted-foreground mb-3">{tmpl.description}</div>
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => handleLoad(tmpl.sections)}
            >
              Use Template
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
