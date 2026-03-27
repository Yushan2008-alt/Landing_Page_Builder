import type { PricingContent, SectionStyles } from '../../types/section'

interface Props { content: PricingContent; styles: SectionStyles }

export function PricingSection({ content: c, styles: s }: Props) {
  return (
    <section style={{ backgroundColor: s.backgroundColor, color: s.textColor, padding: `${s.paddingTop}px ${s.paddingRight}px ${s.paddingBottom}px ${s.paddingLeft}px`, fontFamily: s.fontFamily }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '.75rem' }}>{c.title}</h2>
          <p style={{ opacity: 0.7 }}>{c.subtitle}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${c.plans.length}, 1fr)`, gap: '1.5rem', alignItems: 'start' }}>
          {c.plans.map((plan, i) => (
            <div
              key={i}
              style={{
                padding: '2rem',
                borderRadius: 12,
                border: plan.highlighted ? `2px solid ${c.accentColor}` : '1px solid rgba(128,128,128,.2)',
                background: plan.highlighted ? `${c.accentColor}1a` : 'transparent',
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: '.5rem' }}>{plan.name}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '.25rem' }}>
                {plan.price}<span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.7 }}>{plan.period}</span>
              </div>
              <p style={{ opacity: 0.7, fontSize: '.9rem', marginBottom: '1.5rem' }}>{plan.description}</p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ padding: '.4rem 0', fontSize: '.9rem' }}>✓ {f}</li>
                ))}
              </ul>
              <a
                href={plan.ctaUrl}
                style={{
                  display: 'block', textAlign: 'center', padding: '.75rem',
                  borderRadius: 8,
                  background: plan.highlighted ? c.accentColor : 'transparent',
                  color: plan.highlighted ? '#fff' : 'inherit',
                  border: plan.highlighted ? 'none' : '1px solid rgba(128,128,128,.4)',
                  fontWeight: 600, textDecoration: 'none',
                }}
              >
                {plan.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
