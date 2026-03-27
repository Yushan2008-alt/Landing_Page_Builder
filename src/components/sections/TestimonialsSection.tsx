import type { TestimonialsContent, SectionStyles } from '../../types/section'

interface Props { content: TestimonialsContent; styles: SectionStyles }

function StarRating({ rating, color }: { rating: number; color: string }) {
  return (
    <div style={{ color, fontSize: '1rem' }}>
      {'★'.repeat(Math.min(5, rating))}{'☆'.repeat(Math.max(0, 5 - rating))}
    </div>
  )
}

export function TestimonialsSection({ content: c, styles: s }: Props) {
  return (
    <section style={{ backgroundColor: s.backgroundColor, color: s.textColor, padding: `${s.paddingTop}px ${s.paddingRight}px ${s.paddingBottom}px ${s.paddingLeft}px`, fontFamily: s.fontFamily }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '.75rem' }}>{c.title}</h2>
          <p style={{ opacity: 0.7 }}>{c.subtitle}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${c.columns}, 1fr)`, gap: '1.5rem' }}>
          {c.items.map((item, i) => (
            <div key={i} style={{ padding: '1.75rem', borderRadius: 12, border: '1px solid rgba(128,128,128,.2)', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
              <StarRating rating={item.rating} color={c.accentColor} />
              <p style={{ fontSize: '.95rem', lineHeight: 1.7, opacity: 0.85, margin: 0 }}>
                &ldquo;{item.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginTop: 'auto' }}>
                {item.avatarUrl
                  ? <img src={item.avatarUrl} alt={item.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                  : (
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${c.accentColor}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: c.accentColor, fontSize: '1rem', flexShrink: 0 }}>
                      {item.name[0]}
                    </div>
                  )
                }
                <div>
                  <div style={{ fontWeight: 600, fontSize: '.9rem' }}>{item.name}</div>
                  <div style={{ fontSize: '.8rem', opacity: 0.6 }}>{item.role}{item.company ? `, ${item.company}` : ''}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
