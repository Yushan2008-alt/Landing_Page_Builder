import { Label } from '../../ui/label'
import { Slider } from '../../ui/slider'

interface Props {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (v: number) => void
}

export function SliderField({ label, value, min, max, step = 1, unit = 'px', onChange }: Props) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="text-xs font-mono text-foreground">{value}{unit}</span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => {
          const val = Array.isArray(v) ? v[0] : v
          if (typeof val === 'number') onChange(val)
        }}
        className="w-full"
      />
    </div>
  )
}
