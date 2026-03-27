import { useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { PreviewFrame } from './PreviewFrame'
import { Monitor, Smartphone, X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface Props {
  html: string
  open: boolean
  onClose: () => void
}

export function PreviewModal({ html, open, onClose }: Props) {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop')

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[92vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border shrink-0 bg-card">
          <span className="text-sm font-medium text-foreground">Preview</span>
          <div className="flex items-center gap-1">
            <Button
              variant={viewport === 'desktop' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={() => setViewport('desktop')}
            >
              <Monitor className="w-3.5 h-3.5" />
              Desktop
            </Button>
            <Button
              variant={viewport === 'mobile' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={() => setViewport('mobile')}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Mobile
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Frame */}
        <div className={cn(
          'flex-1 overflow-hidden flex items-stretch justify-center bg-muted/30',
          viewport === 'mobile' && 'py-4',
        )}>
          <div
            style={{
              width: viewport === 'mobile' ? 390 : '100%',
              height: '100%',
              background: '#fff',
              overflow: 'auto',
              boxShadow: viewport === 'mobile' ? '0 0 0 1px rgba(0,0,0,.1), 0 4px 32px rgba(0,0,0,.15)' : 'none',
              borderRadius: viewport === 'mobile' ? 16 : 0,
            }}
          >
            <PreviewFrame html={html} width="100%" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
