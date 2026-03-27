import { Label } from '../../ui/label'

interface Props {
  label: string
  value: string
  onChange: (v: string) => void
}

export function ColorPickerField({ label, value, onChange }: Props) {
  return (
    <div className="flex items-center justify-between gap-2">
      <Label className="text-xs text-muted-foreground shrink-0">{label}</Label>
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded border border-border"
          style={{ background: value }}
        />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-7 rounded cursor-pointer border border-border bg-transparent p-0.5"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 text-xs bg-muted rounded px-2 py-1 border border-border font-mono"
          spellCheck={false}
        />
      </div>
    </div>
  )
}
