import type { ContactContent } from '../../../types/section'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { ColorPickerField } from '../shared/ColorPickerField'

interface Props { content: ContactContent; onChange: (patch: Partial<ContactContent>) => void }

export function ContactEditor({ content: c, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Title</Label>
        <Input value={c.title} onChange={(e) => onChange({ title: e.target.value })} className="h-8 text-sm" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Subtitle</Label>
        <Input value={c.subtitle} onChange={(e) => onChange({ subtitle: e.target.value })} className="h-8 text-sm" />
      </div>
      <div className="border-t border-border pt-3 space-y-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Field Placeholders</div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Name Field</Label>
          <Input value={c.namePlaceholder} onChange={(e) => onChange({ namePlaceholder: e.target.value })} className="h-8 text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Email Field</Label>
          <Input value={c.emailPlaceholder} onChange={(e) => onChange({ emailPlaceholder: e.target.value })} className="h-8 text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Message Field</Label>
          <Input value={c.messagePlaceholder} onChange={(e) => onChange({ messagePlaceholder: e.target.value })} className="h-8 text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Submit Button Text</Label>
          <Input value={c.submitText} onChange={(e) => onChange({ submitText: e.target.value })} className="h-8 text-sm" />
        </div>
        <ColorPickerField label="Button BG" value={c.ctaBackgroundColor} onChange={(v) => onChange({ ctaBackgroundColor: v })} />
        <ColorPickerField label="Button Text" value={c.ctaTextColor} onChange={(v) => onChange({ ctaTextColor: v })} />
      </div>
      <ColorPickerField label="Accent Color" value={c.accentColor} onChange={(v) => onChange({ accentColor: v })} />
    </div>
  )
}
