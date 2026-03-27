import type { AboutContent } from '../../../types/section'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea'
import { ColorPickerField } from '../shared/ColorPickerField'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'

interface Props { content: AboutContent; onChange: (patch: Partial<AboutContent>) => void }

export function AboutEditor({ content: c, onChange }: Props) {
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
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Body Text</Label>
        <Textarea value={c.body} onChange={(e) => onChange({ body: e.target.value })} className="text-sm min-h-[80px]" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Image URL</Label>
        <Input value={c.imageUrl} onChange={(e) => onChange({ imageUrl: e.target.value })} className="h-8 text-sm" placeholder="https://..." />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Image Position</Label>
        <Select value={c.imagePosition} onValueChange={(v) => v && onChange({ imagePosition: v as 'left' | 'right' })}>
          <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="right">Image Right</SelectItem>
            <SelectItem value="left">Image Left</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">CTA Text</Label>
        <Input value={c.ctaText} onChange={(e) => onChange({ ctaText: e.target.value })} className="h-8 text-sm" placeholder="Leave empty to hide" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">CTA URL</Label>
        <Input value={c.ctaUrl} onChange={(e) => onChange({ ctaUrl: e.target.value })} className="h-8 text-sm" />
      </div>
      <ColorPickerField label="Accent Color" value={c.accentColor} onChange={(v) => onChange({ accentColor: v })} />
    </div>
  )
}
