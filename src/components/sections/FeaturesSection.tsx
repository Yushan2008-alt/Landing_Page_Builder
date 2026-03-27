import type { FeaturesContent, SectionStyles } from '../../types/section'

interface Props { content: FeaturesContent; styles: SectionStyles }

export function FeaturesSection({ content: c, styles: s }: Props) {
  return (
    <section style={{ backgroundColor: s.backgroundColor, color: s.textColor, padding: `${s.paddingTop}px ${s.paddingRight}px ${s.paddingBottom}px ${s.paddingLeft}px`, fontFamily: s.fontFamily }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '.75rem' }}>{c.title}</h2>
          <p style={{ opacity: 0.7, maxWidth: 560, margin: '0 auto' }}>{c.subtitle}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${c.columns}, 1fr)`, gap: '1.5rem' }}>
          {c.items.map((item, i) => (
            <div key={i} style={{ padding: '1.5rem', borderRadius: 12, border: '1px solid rgba(128,128,128,.2)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ fontWeight: 600, marginBottom: '.5rem' }}>{item.title}</h3>
              <p style={{ opacity: 0.7, fontSize: '.9rem', lineHeight: 1.6, margin: 0 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
