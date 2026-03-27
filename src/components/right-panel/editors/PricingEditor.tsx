import type { PricingContent, PricingPlan } from '../../../types/section'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Switch } from '../../ui/switch'
import { ColorPickerField } from '../shared/ColorPickerField'
import { PresetSelector } from '../shared/PresetSelector'
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface Props { content: PricingContent; onChange: (patch: Partial<PricingContent>) => void }

export function PricingEditor({ content: c, onChange }: Props) {
  const [expandedPlan, setExpandedPlan] = useState<number | null>(0)

  const updatePlan = (i: number, patch: Partial<PricingPlan>) => {
    onChange({ plans: c.plans.map((p, idx) => idx === i ? { ...p, ...patch } : p) })
  }
  const updateFeature = (planIdx: number, featIdx: number, val: string) => {
    const features = c.plans[planIdx].features.map((f, i) => i === featIdx ? val : f)
    updatePlan(planIdx, { features })
  }
  const addPlan = () => onChange({ plans: [...c.plans, { name: 'New Plan', price: '$0', period: '/mo', description: '', features: ['Feature 1'], ctaText: 'Get Started', ctaUrl: '#', highlighted: false }] })
  const removePlan = (i: number) => onChange({ plans: c.plans.filter((_, idx) => idx !== i) })

  return (
    <div className="flex flex-col gap-3 pb-4">
      <PresetSelector type="pricing" onSelect={(preset) => onChange(preset)} />
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
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Plans</div>
          <Button size="sm" variant="outline" className="h-6 text-xs gap-1" onClick={addPlan}><Plus className="w-3 h-3" /> Add</Button>
        </div>
        {c.plans.map((plan, i) => (
          <div key={i} className="border border-border rounded-lg mb-2 overflow-hidden">
            <div
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted/50"
              onClick={() => setExpandedPlan(expandedPlan === i ? null : i)}
            >
              {expandedPlan === i ? <ChevronDown className="w-3.5 h-3.5 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
              <span className="text-sm font-medium flex-1">{plan.name || `Plan ${i + 1}`}</span>
              {plan.highlighted && <span className="text-xs text-primary">Featured</span>}
              <Button size="icon" variant="ghost" className="h-6 w-6 hover:text-destructive" onClick={(e) => { e.stopPropagation(); removePlan(i) }}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            {expandedPlan === i && (
              <div className="px-3 pb-3 space-y-2 border-t border-border pt-2">
                <Input value={plan.name} onChange={(e) => updatePlan(i, { name: e.target.value })} className="h-7 text-sm" placeholder="Plan name" />
                <div className="flex gap-2">
                  <Input value={plan.price} onChange={(e) => updatePlan(i, { price: e.target.value })} className="h-7 text-sm w-20" placeholder="$29" />
                  <Input value={plan.period} onChange={(e) => updatePlan(i, { period: e.target.value })} className="h-7 text-sm flex-1" placeholder="/mo" />
                </div>
                <Input value={plan.description} onChange={(e) => updatePlan(i, { description: e.target.value })} className="h-7 text-sm" placeholder="Description" />
                <Input value={plan.ctaText} onChange={(e) => updatePlan(i, { ctaText: e.target.value })} className="h-7 text-sm" placeholder="CTA Text" />
                <div className="flex items-center gap-2">
                  <Switch checked={plan.highlighted} onCheckedChange={(v) => updatePlan(i, { highlighted: v })} />
                  <Label className="text-xs text-muted-foreground">Featured plan</Label>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Features</Label>
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex gap-1">
                      <Input value={f} onChange={(e) => updateFeature(i, j, e.target.value)} className="h-7 text-xs flex-1" />
                      <Button size="icon" variant="ghost" className="h-7 w-7 hover:text-destructive" onClick={() => updatePlan(i, { features: plan.features.filter((_, k) => k !== j) })}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  <Button size="sm" variant="outline" className="w-full h-6 text-xs" onClick={() => updatePlan(i, { features: [...plan.features, 'New feature'] })}>
                    <Plus className="w-3 h-3 mr-1" /> Add feature
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}
