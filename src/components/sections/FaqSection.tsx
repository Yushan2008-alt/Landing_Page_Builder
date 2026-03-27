import { useState } from 'react'
import type { FaqContent, SectionStyles } from '../../types/section'
import { ChevronDown } from 'lucide-react'

interface Props { content: FaqContent; styles: SectionStyles }

export function FaqSection({ content: c, styles: s }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ backgroundColor: s.backgroundColor, color: s.textColor, padding: `${s.paddingTop}px ${s.paddingRight}px ${s.paddingBottom}px ${s.paddingLeft}px`, fontFamily: s.fontFamily }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '.75rem' }}>{c.title}</h2>
          <p style={{ opacity: 0.7 }}>{c.subtitle}</p>
        </div>
        {c.items.map((item, i) => (
          <div
            key={i}
            style={{
              marginBottom: '1rem',
              border: `1px solid rgba(128,128,128,.2)`,
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%', padding: '1.25rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontWeight: 600, cursor: 'pointer',
                background: 'transparent', border: 'none', color: 'inherit',
                fontFamily: 'inherit', fontSize: 'inherit', textAlign: 'left',
              }}
            >
              {item.question}
              <ChevronDown
                style={{
                  width: 18, height: 18, flexShrink: 0, marginLeft: 12,
                  transition: 'transform 200ms',
                  transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>
            {open === i && (
              <p style={{ padding: '0 1.25rem 1.25rem', opacity: 0.8, lineHeight: 1.7, margin: 0 }}>
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
