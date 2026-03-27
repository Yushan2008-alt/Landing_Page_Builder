import type { ContactContent, SectionStyles } from '../../types/section'

interface Props { content: ContactContent; styles: SectionStyles }

export function ContactSection({ content: c, styles: s }: Props) {
  return (
    <section style={{ backgroundColor: s.backgroundColor, color: s.textColor, padding: `${s.paddingTop}px ${s.paddingRight}px ${s.paddingBottom}px ${s.paddingLeft}px`, fontFamily: s.fontFamily }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '.75rem' }}>{c.title}</h2>
          <p style={{ opacity: 0.7 }}>{c.subtitle}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text" placeholder={c.namePlaceholder} readOnly
            style={{ width: '100%', padding: '.75rem 1rem', borderRadius: 8, border: '1px solid rgba(128,128,128,.3)', background: 'transparent', color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit' }}
          />
          <input
            type="email" placeholder={c.emailPlaceholder} readOnly
            style={{ width: '100%', padding: '.75rem 1rem', borderRadius: 8, border: '1px solid rgba(128,128,128,.3)', background: 'transparent', color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit' }}
          />
          <textarea
            rows={5} placeholder={c.messagePlaceholder} readOnly
            style={{ width: '100%', padding: '.75rem 1rem', borderRadius: 8, border: '1px solid rgba(128,128,128,.3)', background: 'transparent', color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit', resize: 'vertical' }}
          />
          <button
            style={{ padding: '.85rem', borderRadius: 8, background: c.ctaBackgroundColor, color: c.ctaTextColor, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
          >
            {c.submitText}
          </button>
        </div>
      </div>
    </section>
  )
}
