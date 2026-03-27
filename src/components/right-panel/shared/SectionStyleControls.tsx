import type { SectionStyles } from '../../../types/section'
import { ColorPickerField } from './ColorPickerField'
import { SliderField } from './SliderField'
import { FontSelector } from './FontSelector'
import { Label } from '../../ui/label'
import { Textarea } from '../../ui/textarea'

interface Props {
  styles: SectionStyles
  onChange: (patch: Partial<SectionStyles>) => void
}

export function SectionStyleControls({ styles, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Colors</div>
        <ColorPickerField label="Background" value={styles.backgroundColor} onChange={(v) => onChange({ backgroundColor: v })} />
        <ColorPickerField label="Text" value={styles.textColor} onChange={(v) => onChange({ textColor: v })} />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Spacing</div>
        <SliderField label="Padding Top" value={styles.paddingTop} min={0} max={200} onChange={(v) => onChange({ paddingTop: v })} />
        <SliderField label="Padding Bottom" value={styles.paddingBottom} min={0} max={200} onChange={(v) => onChange({ paddingBottom: v })} />
        <SliderField label="Padding Left" value={styles.paddingLeft} min={0} max={120} onChange={(v) => onChange({ paddingLeft: v })} />
        <SliderField label="Padding Right" value={styles.paddingRight} min={0} max={120} onChange={(v) => onChange({ paddingRight: v })} />
        <SliderField label="Border Radius" value={styles.borderRadius} min={0} max={48} onChange={(v) => onChange({ borderRadius: v })} />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Typography</div>
        <FontSelector value={styles.fontFamily} onChange={(v) => onChange({ fontFamily: v })} />
        <SliderField label="Base Font Size" value={styles.fontSize} min={12} max={24} onChange={(v) => onChange({ fontSize: v })} />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Custom CSS</Label>
        <Textarea
          value={styles.customCss}
          onChange={(e) => onChange({ customCss: e.target.value })}
          placeholder="/* additional CSS rules */"
          className="font-mono text-xs min-h-[80px] resize-y"
        />
      </div>
    </div>
  )
}
