import type { FaqContent, FaqItem } from '../../../types/section'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Textarea } from '../../ui/textarea'
import { ColorPickerField } from '../shared/ColorPickerField'
import { PresetSelector } from '../shared/PresetSelector'
import { Plus, Trash2 } from 'lucide-react'

interface Props { content: FaqContent; onChange: (patch: Partial<FaqContent>) => void }

export function FaqEditor({ content: c, onChange }: Props) {
  const updateItem = (i: number, patch: Partial<FaqItem>) => {
    onChange({ items: c.items.map((item, idx) => idx === i ? { ...item, ...patch } : item) })
  }
  const addItem = () => onChange({ items: [...c.items, { question: 'New question?', answer: 'Answer here.' }] })
  const removeItem = (i: number) => onChange({ items: c.items.filter((_, idx) => idx !== i) })

  return (
    <div className="flex flex-col gap-3 pb-4">
      <PresetSelector type="faq" onSelect={(preset) => onChange(preset)} />
      <div className="flex flex-col gap-3 px-4">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Title</Label>
        <Input value={c.title} onChange={(e) => onChange({ title: e.target.value })} className="h-8 text-sm" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Subtitle</Label>
        <Input value={c.subtitle} onChange={(e) => onChange({ subtitle: e.target.value })} className="h-8 text-sm" />
      </div>
      <ColorPickerField label="Accent Color" value={c.accentColor} onChange={(v) => onChange({ accentColor: v })} />

      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Questions</div>
          <Button size="sm" variant="outline" className="h-6 text-xs gap-1" onClick={addItem}><Plus className="w-3 h-3" /> Add</Button>
        </div>
        <div className="flex flex-col gap-3">
          {c.items.map((item, i) => (
            <div key={i} className="border border-border rounded-lg p-3 space-y-2">
              <div className="flex items-start gap-2">
                <Input value={item.question} onChange={(e) => updateItem(i, { question: e.target.value })} className="h-7 flex-1 text-sm" placeholder="Question" />
                <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0 hover:text-destructive" onClick={() => removeItem(i)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <Textarea value={item.answer} onChange={(e) => updateItem(i, { answer: e.target.value })} className="text-xs min-h-[60px] resize-none" placeholder="Answer" />
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
