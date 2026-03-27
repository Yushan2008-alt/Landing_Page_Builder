import type { LogoStripContent, LogoItem } from '../../../types/section'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Switch } from '../../ui/switch'
import { PresetSelector } from '../shared/PresetSelector'
import { Plus, Trash2 } from 'lucide-react'

interface Props { content: LogoStripContent; onChange: (patch: Partial<LogoStripContent>) => void }

export function LogoStripEditor({ content: c, onChange }: Props) {
  const updateLogo = (i: number, patch: Partial<LogoItem>) => {
    onChange({ logos: c.logos.map((logo, idx) => idx === i ? { ...logo, ...patch } : logo) })
  }
  const addLogo = () => onChange({ logos: [...c.logos, { name: 'Company', imageUrl: '', url: '#' }] })
  const removeLogo = (i: number) => onChange({ logos: c.logos.filter((_, idx) => idx !== i) })

  return (
    <div className="flex flex-col gap-3 pb-4">
      <PresetSelector type="logo-strip" onSelect={(preset) => onChange(preset)} />
      <div className="flex flex-col gap-3 px-4">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Title Text</Label>
        <Input value={c.title} onChange={(e) => onChange({ title: e.target.value })} className="h-8 text-sm" placeholder="Trusted by..." />
      </div>
      <div className="flex items-center gap-2">
        <Switch checked={c.grayscale} onCheckedChange={(v) => onChange({ grayscale: v })} />
        <Label className="text-xs text-muted-foreground">Grayscale logos</Label>
      </div>

      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Logos</div>
          <Button size="sm" variant="outline" className="h-6 text-xs gap-1" onClick={addLogo}><Plus className="w-3 h-3" /> Add</Button>
        </div>
        <div className="flex flex-col gap-2">
          {c.logos.map((logo, i) => (
            <div key={i} className="border border-border rounded-lg p-2.5 space-y-1.5">
              <div className="flex items-center gap-2">
                <Input value={logo.name} onChange={(e) => updateLogo(i, { name: e.target.value })} className="h-7 flex-1 text-sm" placeholder="Company name" />
                <Button size="icon" variant="ghost" className="h-7 w-7 hover:text-destructive shrink-0" onClick={() => removeLogo(i)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <Input value={logo.imageUrl} onChange={(e) => updateLogo(i, { imageUrl: e.target.value })} className="h-7 text-xs" placeholder="Logo image URL (optional)" />
              <Input value={logo.url} onChange={(e) => updateLogo(i, { url: e.target.value })} className="h-7 text-xs" placeholder="Link URL" />
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
