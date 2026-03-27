import type { LogoStripContent, SectionStyles } from '../../types/section'

interface Props { content: LogoStripContent; styles: SectionStyles }

export function LogoStripSection({ content: c, styles: s }: Props) {
  return (
    <section style={{ backgroundColor: s.backgroundColor, color: s.textColor, padding: `${s.paddingTop}px ${s.paddingRight}px ${s.paddingBottom}px ${s.paddingLeft}px`, fontFamily: s.fontFamily }}>
      <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
        {c.title && (
          <p style={{ fontSize: '.85rem', textTransform: 'uppercase', letterSpacing: '.1em', opacity: 0.5, marginBottom: '2rem' }}>
            {c.title}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '2.5rem' }}>
          {c.logos.map((logo, i) =>
            logo.imageUrl
              ? (
                <a key={i} href={logo.url}>
                  <img
                    src={logo.imageUrl} alt={logo.name}
                    style={{ height: 36, objectFit: 'contain', filter: c.grayscale ? 'grayscale(1)' : 'none', opacity: c.grayscale ? 0.6 : 1 }}
                  />
                </a>
              )
              : (
                <span key={i} style={{ fontWeight: 700, fontSize: '1.1rem', opacity: 0.35, letterSpacing: '.05em' }}>
                  {logo.name}
                </span>
              )
          )}
        </div>
      </div>
    </section>
  )
}
