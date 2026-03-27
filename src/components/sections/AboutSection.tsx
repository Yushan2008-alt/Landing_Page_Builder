import type { AboutContent, SectionStyles } from '../../types/section'

interface Props { content: AboutContent; styles: SectionStyles }

export function AboutSection({ content: c, styles: s }: Props) {
  const isRight = c.imagePosition === 'right'
  return (
    <section style={{ backgroundColor: s.backgroundColor, color: s.textColor, padding: `${s.paddingTop}px ${s.paddingRight}px ${s.paddingBottom}px ${s.paddingLeft}px`, fontFamily: s.fontFamily }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' as const, flexDirection: isRight ? 'row' : 'row-reverse' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '.75rem' }}>{c.title}</h2>
          <p style={{ opacity: 0.8, marginBottom: '1rem', fontStyle: 'italic' }}>{c.subtitle}</p>
          <p style={{ opacity: 0.75, lineHeight: 1.8, marginBottom: '1.5rem' }}>{c.body}</p>
          {c.ctaText && (
            <a href={c.ctaUrl} style={{ color: c.accentColor, fontWeight: 600, textDecoration: 'none' }}>
              {c.ctaText} →
            </a>
          )}
        </div>
        {c.imageUrl && (
          <div style={{ flex: 1, minWidth: 280 }}>
            <img src={c.imageUrl} alt="About" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', aspectRatio: '4/3' }} />
          </div>
        )}
      </div>
    </section>
  )
}
