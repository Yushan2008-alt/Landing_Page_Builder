import type { TestimonialsContent, TestimonialItem } from '../../../types/section'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Textarea } from '../../ui/textarea'
import { ColorPickerField } from '../shared/ColorPickerField'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface Props { content: TestimonialsContent; onChange: (patch: Partial<TestimonialsContent>) => void }

export function TestimonialsEditor({ content: c, onChange }: Props) {
  const [expanded, setExpanded] = useState<number | null>(0)

  const updateItem = (i: number, patch: Partial<TestimonialItem>) => {
    onChange({ items: c.items.map((item, idx) => idx === i ? { ...item, ...patch } : item) })
  }
  const addItem = () => onChange({ items: [...c.items, { quote: 'Great product!', name: 'New Customer', role: 'Verified Buyer', company: '', avatarUrl: '', rating: 5 }] })
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
        <Select value={String(c.columns)} onValueChange={(v) => v && onChange({ columns: Number(v) as 2|3 })}>
          <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2 columns</SelectItem>
            <SelectItem value="3">3 columns</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ColorPickerField label="Accent Color" value={c.accentColor} onChange={(v) => onChange({ accentColor: v })} />

      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Testimonials</div>
          <Button size="sm" variant="outline" className="h-6 text-xs gap-1" onClick={addItem}><Plus className="w-3 h-3" /> Add</Button>
        </div>
        {c.items.map((item, i) => (
          <div key={i} className="border border-border rounded-lg mb-2 overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted/50" onClick={() => setExpanded(expanded === i ? null : i)}>
              {expanded === i ? <ChevronDown className="w-3.5 h-3.5 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
              <span className="text-sm flex-1 truncate">{item.name || `Item ${i + 1}`}</span>
              <Button size="icon" variant="ghost" className="h-6 w-6 hover:text-destructive" onClick={(e) => { e.stopPropagation(); removeItem(i) }}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            {expanded === i && (
              <div className="px-3 pb-3 space-y-2 border-t border-border pt-2">
                <Textarea value={item.quote} onChange={(e) => updateItem(i, { quote: e.target.value })} className="text-xs min-h-[60px] resize-none" placeholder="Quote" />
                <Input value={item.name} onChange={(e) => updateItem(i, { name: e.target.value })} className="h-7 text-sm" placeholder="Name" />
                <Input value={item.role} onChange={(e) => updateItem(i, { role: e.target.value })} className="h-7 text-sm" placeholder="Role" />
                <Input value={item.company} onChange={(e) => updateItem(i, { company: e.target.value })} className="h-7 text-sm" placeholder="Company (optional)" />
                <Input value={item.avatarUrl} onChange={(e) => updateItem(i, { avatarUrl: e.target.value })} className="h-7 text-sm" placeholder="Avatar URL (optional)" />
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Rating</Label>
                  <Select value={String(item.rating)} onValueChange={(v) => v && updateItem(i, { rating: Number(v) })}>
                    <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[5,4,3,2,1].map((r) => <SelectItem key={r} value={String(r)}>{`${'★'.repeat(r)}${'☆'.repeat(5-r)}`}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
