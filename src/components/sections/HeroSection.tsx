import type { HeroContent, SectionStyles } from '../../types/section'

interface Props {
  content: HeroContent
  styles: SectionStyles
}

export function HeroSection({ content: c, styles: s }: Props) {
  return (
    <section
      style={{
        backgroundColor: s.backgroundColor,
        color: s.textColor,
        padding: `${s.paddingTop}px ${s.paddingRight}px ${s.paddingBottom}px ${s.paddingLeft}px`,
        borderRadius: s.borderRadius,
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        backgroundImage: c.backgroundImage ? `url(${c.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.25rem' }}>
          {c.headline}
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '2.5rem', maxWidth: 600, margin: '0 auto 2.5rem' }}>
          {c.subheadline}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={c.ctaUrl}
            style={{
              background: c.ctaBackgroundColor,
              color: c.ctaTextColor,
              padding: '.85rem 2rem',
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            {c.ctaText}
          </a>
          {c.secondaryCtaText && (
            <a
              href={c.secondaryCtaUrl}
              style={{
                padding: '.85rem 2rem',
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
                border: `2px solid ${s.textColor}`,
                color: s.textColor,
              }}
            >
              {c.secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
