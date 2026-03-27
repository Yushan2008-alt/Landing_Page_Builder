import { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../ui/select'
import { Wand2 } from 'lucide-react'
import { SECTION_PRESETS } from '../../../constants/sectionPresets'
import type { SectionType } from '../../../types/section'

interface Props {
  type: SectionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: (content: Partial<any>) => void
}

export function PresetSelector({ type, onSelect }: Props) {
  const [value, setValue] = useState<string>('')
  const presets = SECTION_PRESETS[type] ?? []

  // Group presets by category
  const grouped = presets.reduce<Record<string, typeof presets>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = []
    acc[p.category].push(p)
    return acc
  }, {})

  const categories = Object.keys(grouped)

  const handleChange = (val: string | null) => {
    if (!val) return
    setValue(val)
    const preset = presets.find((_, i) => String(i) === val)
    if (preset) onSelect(preset.content)
  }

  if (presets.length === 0) return null

  return (
    <div
      className="mx-4 mt-4 mb-1 rounded-xl p-3"
      style={{
        background: 'linear-gradient(135deg, oklch(0.14 0.04 285 / 0.6), oklch(0.10 0.02 285 / 0.4))',
        border: '1px solid oklch(0.62 0.27 285 / 0.20)',
      }}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <Wand2 className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Pilih Template</span>
      </div>
      <p className="text-xs text-muted-foreground mb-2.5">
        Isi otomatis dengan konten siap pakai, lalu sesuaikan.
      </p>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="w-full h-8 text-xs bg-background/50">
          <SelectValue placeholder="— Pilih template —" />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {categories.map((cat) => (
            <SelectGroup key={cat}>
              <SelectLabel
                className="text-xs font-semibold uppercase tracking-wider px-2 py-1"
                style={{ color: 'oklch(0.72 0.18 285)' }}
              >
                {cat}
              </SelectLabel>
              {grouped[cat].map((preset, idx) => {
                const globalIdx = presets.findIndex((p) => p === preset)
                return (
                  <SelectItem key={idx} value={String(globalIdx)} className="text-xs pl-3">
                    {preset.label}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
