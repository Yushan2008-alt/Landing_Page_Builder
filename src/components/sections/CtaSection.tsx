import type { CtaContent, SectionStyles } from '../../types/section'

interface Props { content: CtaContent; styles: SectionStyles }

export function CtaSection({ content: c, styles: s }: Props) {
  const isSplit = c.layout === 'split'
  return (
    <section style={{
      backgroundColor: s.backgroundColor, color: s.textColor,
      padding: `${s.paddingTop}px ${s.paddingRight}px ${s.paddingBottom}px ${s.paddingLeft}px`,
      fontFamily: s.fontFamily,
      backgroundImage: c.backgroundImage ? `url(${c.backgroundImage})` : undefined,
      backgroundSize: 'cover', backgroundPosition: 'center',
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto', ...(isSplit ? { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' as const } : { textAlign: 'center' as const }) }}>
        <div style={isSplit ? { flex: 1 } : {}}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '.75rem' }}>{c.headline}</h2>
          <p style={{ opacity: 0.85, marginBottom: isSplit ? '1.5rem' : '2rem', maxWidth: isSplit ? undefined : 540, margin: isSplit ? '0 0 1.5rem' : '0 auto 2rem' }}>{c.subheadline}</p>
          {!isSplit && <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={c.ctaUrl} style={{ background: c.ctaBackgroundColor, color: c.ctaTextColor, padding: '.85rem 2rem', borderRadius: 8, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>{c.ctaText}</a>
            {c.secondaryCtaText && <a href={c.secondaryCtaUrl} style={{ padding: '.85rem 2rem', borderRadius: 8, fontWeight: 600, textDecoration: 'none', display: 'inline-block', border: `2px solid currentColor` }}>{c.secondaryCtaText}</a>}
          </div>}
          {isSplit && <div>
            <a href={c.ctaUrl} style={{ background: c.ctaBackgroundColor, color: c.ctaTextColor, padding: '.85rem 2rem', borderRadius: 8, fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginRight: '.75rem' }}>{c.ctaText}</a>
            {c.secondaryCtaText && <a href={c.secondaryCtaUrl} style={{ padding: '.85rem 2rem', borderRadius: 8, fontWeight: 600, textDecoration: 'none', display: 'inline-block', border: `2px solid currentColor` }}>{c.secondaryCtaText}</a>}
          </div>}
        </div>
      </div>
    </section>
  )
}
