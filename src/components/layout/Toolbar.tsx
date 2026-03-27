import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBuilderStore } from '../../store/builderStore'
import { useThemeStore } from '../../store/themeStore'
import { useClipboard } from '../../hooks/useClipboard'
import { generateFullHtml } from '../../lib/htmlGenerator'
import { Button } from '../ui/button'
import { PreviewModal } from '../preview/PreviewModal'
import {
  ArrowLeft, Undo2, Redo2, Eye, Code2, Moon, Sun,
  Check, Loader2,
} from 'lucide-react'

export function Toolbar() {
  const {
    projectName, sections, isDirty, isSaving,
    undo, redo, past, future, setProjectName,
  } = useBuilderStore()
  const { theme, toggleTheme } = useThemeStore()
  const { copy, copied } = useClipboard()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [nameVal, setNameVal] = useState(projectName)

  const handleCopyHtml = () => {
    const html = generateFullHtml(sections)
    copy(html)
  }

  const handleNameBlur = () => {
    setEditingName(false)
    if (nameVal.trim()) setProjectName(nameVal.trim())
    else setNameVal(projectName)
  }

  const previewHtml = generateFullHtml(sections)

  return (
    <>
      <div className="h-12 bg-card border-b border-border flex items-center px-3 gap-2 shrink-0">
        {/* Left */}
        <Link to="/dashboard">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Back to Dashboard">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>

        <div className="w-px h-5 bg-border mx-1" />

        {/* Project Name */}
        {editingName ? (
          <input
            value={nameVal}
            onChange={(e) => setNameVal(e.target.value)}
            onBlur={handleNameBlur}
            onKeyDown={(e) => { if (e.key === 'Enter') handleNameBlur(); if (e.key === 'Escape') { setEditingName(false); setNameVal(projectName) } }}
            className="text-sm font-medium bg-muted border border-border rounded px-2 h-7 w-48 outline-none focus:border-primary"
            autoFocus
          />
        ) : (
          <button
            onClick={() => { setEditingName(true); setNameVal(projectName) }}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors max-w-[180px] truncate"
            title="Click to rename"
          >
            {projectName}
          </button>
        )}

        {/* Save Status */}
        <div className="ml-1">
          {isSaving ? (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin" /> Saving…
            </span>
          ) : isDirty ? (
            <span className="text-xs text-muted-foreground">Unsaved</span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Check className="w-3 h-3 text-green-500" /> Saved
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right actions */}
        <Button
          variant="ghost" size="icon" className="h-8 w-8"
          onClick={undo} disabled={past.length === 0}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost" size="icon" className="h-8 w-8"
          onClick={redo} disabled={future.length === 0}
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="w-4 h-4" />
        </Button>

        <div className="w-px h-5 bg-border mx-1" />

        <Button
          variant="ghost" size="sm" className="h-8 gap-1.5 text-xs"
          onClick={() => setPreviewOpen(true)}
        >
          <Eye className="w-3.5 h-3.5" />
          Preview
        </Button>

        <Button
          variant={copied ? 'default' : 'outline'}
          size="sm"
          className="h-8 gap-1.5 text-xs"
          onClick={handleCopyHtml}
          disabled={sections.length === 0}
          title="Copy standalone HTML to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy HTML'}
        </Button>

        <div className="w-px h-5 bg-border mx-1" />

        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>

      <PreviewModal html={previewHtml} open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </>
  )
}
