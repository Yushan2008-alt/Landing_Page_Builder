import type { CtaContent } from '../../../types/section'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { ColorPickerField } from '../shared/ColorPickerField'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'

interface Props { content: CtaContent; onChange: (patch: Partial<CtaContent>) => void }

export function CtaEditor({ content: c, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Headline</Label>
        <Input value={c.headline} onChange={(e) => onChange({ headline: e.target.value })} className="h-8 text-sm" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Subheadline</Label>
        <Input value={c.subheadline} onChange={(e) => onChange({ subheadline: e.target.value })} className="h-8 text-sm" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Layout</Label>
        <Select value={c.layout} onValueChange={(v) => v && onChange({ layout: v as 'centered' | 'split' })}>
          <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="centered">Centered</SelectItem>
            <SelectItem value="split">Split</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="border-t border-border pt-3 space-y-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Primary CTA</div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Button Text</Label>
          <Input value={c.ctaText} onChange={(e) => onChange({ ctaText: e.target.value })} className="h-8 text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Button URL</Label>
          <Input value={c.ctaUrl} onChange={(e) => onChange({ ctaUrl: e.target.value })} className="h-8 text-sm" />
        </div>
        <ColorPickerField label="Button BG" value={c.ctaBackgroundColor} onChange={(v) => onChange({ ctaBackgroundColor: v })} />
        <ColorPickerField label="Button Text" value={c.ctaTextColor} onChange={(v) => onChange({ ctaTextColor: v })} />
      </div>
      <div className="border-t border-border pt-3 space-y-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Secondary CTA</div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Button Text</Label>
          <Input value={c.secondaryCtaText} onChange={(e) => onChange({ secondaryCtaText: e.target.value })} className="h-8 text-sm" placeholder="Leave empty to hide" />
        </div>
      </div>
      <div className="border-t border-border pt-3 space-y-1.5">
        <Label className="text-xs text-muted-foreground">Background Image URL</Label>
        <Input value={c.backgroundImage} onChange={(e) => onChange({ backgroundImage: e.target.value })} className="h-8 text-sm" placeholder="https://..." />
      </div>
    </div>
  )
}
