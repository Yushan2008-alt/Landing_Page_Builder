import type { FeaturesContent, FeatureItem } from '../../../types/section'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { ColorPickerField } from '../shared/ColorPickerField'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Plus, Trash2 } from 'lucide-react'

interface Props { content: FeaturesContent; onChange: (patch: Partial<FeaturesContent>) => void }

export function FeaturesEditor({ content: c, onChange }: Props) {
  const updateItem = (i: number, patch: Partial<FeatureItem>) => {
    const items = c.items.map((item, idx) => idx === i ? { ...item, ...patch } : item)
    onChange({ items })
  }
  const addItem = () => onChange({ items: [...c.items, { icon: '✨', title: 'New Feature', description: 'Description here.' }] })
  const removeItem = (i: number) => onChange({ items: c.items.filter((_, idx) => idx !== i) })

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
        <Label className="text-xs text-muted-foreground">Columns</Label>
        <Select value={String(c.columns)} onValueChange={(v) => v && onChange({ columns: Number(v) as 2|3|4 })}>
          <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2 columns</SelectItem>
            <SelectItem value="3">3 columns</SelectItem>
            <SelectItem value="4">4 columns</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ColorPickerField label="Accent Color" value={c.accentColor} onChange={(v) => onChange({ accentColor: v })} />

      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Items</div>
          <Button size="sm" variant="outline" className="h-6 text-xs gap-1" onClick={addItem}>
            <Plus className="w-3 h-3" /> Add
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          {c.items.map((item, i) => (
            <div key={i} className="border border-border rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Input value={item.icon} onChange={(e) => updateItem(i, { icon: e.target.value })} className="h-7 w-12 text-center text-sm" placeholder="🎯" />
                <Input value={item.title} onChange={(e) => updateItem(i, { title: e.target.value })} className="h-7 flex-1 text-sm" placeholder="Title" />
                <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0 hover:text-destructive" onClick={() => removeItem(i)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <Input value={item.description} onChange={(e) => updateItem(i, { description: e.target.value })} className="h-7 text-sm" placeholder="Description" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
