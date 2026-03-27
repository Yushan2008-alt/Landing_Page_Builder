import type { SectionData, SectionStyles } from '../types/section'
import { FONT_OPTIONS } from '../constants/fonts'

function styleFromSection(id: string, styles: SectionStyles): string {
  return `
#section-${id} {
  background-color: ${styles.backgroundColor};
  color: ${styles.textColor};
  padding: ${styles.paddingTop}px ${styles.paddingRight}px ${styles.paddingBottom}px ${styles.paddingLeft}px;
  border-radius: ${styles.borderRadius}px;
  font-family: ${styles.fontFamily};
  font-size: ${styles.fontSize}px;
  ${styles.customCss}
}`.trim()
}

function starRating(rating: number): string {
  return '★'.repeat(Math.min(5, rating)) + '☆'.repeat(Math.max(0, 5 - rating))
}

function renderSection(section: SectionData): string {
  const { id, type, styles } = section
  const contentBg = (section.content as unknown as Record<string, unknown>)['backgroundImage'] as string | undefined
  const bg = contentBg ? `background-image:url('${contentBg}');background-size:cover;background-position:center;` : ''

  switch (type) {
    case 'hero': {
      const c = section.content
      return `
<section id="section-${id}" style="${bg}">
  <div style="max-width:960px;margin:0 auto;text-align:center;">
    <h1 style="font-size:3rem;font-weight:700;line-height:1.1;margin-bottom:1.25rem;">${c.headline}</h1>
    <p style="font-size:1.2rem;opacity:.8;margin-bottom:2.5rem;max-width:600px;margin-left:auto;margin-right:auto;">${c.subheadline}</p>
    <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
      <a href="${c.ctaUrl}" style="background:${c.ctaBackgroundColor};color:${c.ctaTextColor};padding:.85rem 2rem;border-radius:8px;font-weight:600;text-decoration:none;display:inline-block;">${c.ctaText}</a>
      ${c.secondaryCtaText ? `<a href="${c.secondaryCtaUrl}" style="padding:.85rem 2rem;border-radius:8px;font-weight:600;text-decoration:none;display:inline-block;border:2px solid currentColor;color:${styles.textColor};">${c.secondaryCtaText}</a>` : ''}
    </div>
  </div>
</section>`
    }

    case 'features': {
      const c = section.content
      const cols = c.columns
      return `
<section id="section-${id}">
  <div style="max-width:960px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:3rem;">
      <h2 style="font-size:2rem;font-weight:700;margin-bottom:.75rem;">${c.title}</h2>
      <p style="opacity:.7;max-width:560px;margin:0 auto;">${c.subtitle}</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:1.5rem;">
      ${c.items.map((item) => `
      <div style="padding:1.5rem;border-radius:12px;border:1px solid rgba(128,128,128,.2);">
        <div style="font-size:2rem;margin-bottom:1rem;">${item.icon}</div>
        <h3 style="font-weight:600;margin-bottom:.5rem;">${item.title}</h3>
        <p style="opacity:.7;font-size:.9rem;line-height:1.6;">${item.description}</p>
      </div>`).join('')}
    </div>
  </div>
</section>`
    }

    case 'pricing': {
      const c = section.content
      return `
<section id="section-${id}">
  <div style="max-width:960px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:3rem;">
      <h2 style="font-size:2rem;font-weight:700;margin-bottom:.75rem;">${c.title}</h2>
      <p style="opacity:.7;">${c.subtitle}</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(${c.plans.length},1fr);gap:1.5rem;align-items:start;">
      ${c.plans.map((plan) => `
      <div style="padding:2rem;border-radius:12px;border:${plan.highlighted ? `2px solid ${c.accentColor}` : '1px solid rgba(128,128,128,.2)'};${plan.highlighted ? `background:${c.accentColor}1a;` : ''}">
        <div style="font-weight:700;margin-bottom:.5rem;">${plan.name}</div>
        <div style="font-size:2.5rem;font-weight:700;margin-bottom:.25rem;">${plan.price}<span style="font-size:1rem;font-weight:400;opacity:.7;">${plan.period}</span></div>
        <p style="opacity:.7;font-size:.9rem;margin-bottom:1.5rem;">${plan.description}</p>
        <ul style="list-style:none;padding:0;margin-bottom:1.5rem;">
          ${plan.features.map((f) => `<li style="padding:.4rem 0;font-size:.9rem;">✓ ${f}</li>`).join('')}
        </ul>
        <a href="${plan.ctaUrl}" style="display:block;text-align:center;padding:.75rem;border-radius:8px;background:${plan.highlighted ? c.accentColor : 'transparent'};color:${plan.highlighted ? '#fff' : 'inherit'};border:${plan.highlighted ? 'none' : `1px solid rgba(128,128,128,.4)`};font-weight:600;text-decoration:none;">${plan.ctaText}</a>
      </div>`).join('')}
    </div>
  </div>
</section>`
    }

    case 'faq': {
      const c = section.content
      return `
<section id="section-${id}">
  <div style="max-width:720px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:3rem;">
      <h2 style="font-size:2rem;font-weight:700;margin-bottom:.75rem;">${c.title}</h2>
      <p style="opacity:.7;">${c.subtitle}</p>
    </div>
    ${c.items.map((item) => `
    <details style="margin-bottom:1rem;border:1px solid rgba(128,128,128,.2);border-radius:10px;overflow:hidden;">
      <summary style="padding:1.25rem;font-weight:600;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;">
        ${item.question}
        <span style="font-size:1.25rem;line-height:1;">+</span>
      </summary>
      <p style="padding:0 1.25rem 1.25rem;opacity:.8;line-height:1.7;margin:0;">${item.answer}</p>
    </details>`).join('')}
  </div>
</section>`
    }

    case 'cta': {
      const c = section.content
      const isSplit = c.layout === 'split'
      return `
<section id="section-${id}" style="${bg}">
  <div style="max-width:960px;margin:0 auto;${isSplit ? 'display:flex;justify-content:space-between;align-items:center;gap:2rem;flex-wrap:wrap;' : 'text-align:center;'}">
    <div${isSplit ? ' style="flex:1;"' : ''}>
      <h2 style="font-size:2rem;font-weight:700;margin-bottom:.75rem;">${c.headline}</h2>
      <p style="opacity:.85;${!isSplit ? 'max-width:540px;margin:0 auto 2rem;' : 'margin-bottom:1.5rem;'}">${c.subheadline}</p>
      ${!isSplit ? `<div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">` : ''}
      <a href="${c.ctaUrl}" style="background:${c.ctaBackgroundColor};color:${c.ctaTextColor};padding:.85rem 2rem;border-radius:8px;font-weight:600;text-decoration:none;display:inline-block;margin-right:.75rem;">${c.ctaText}</a>
      ${c.secondaryCtaText ? `<a href="${c.secondaryCtaUrl}" style="padding:.85rem 2rem;border-radius:8px;font-weight:600;text-decoration:none;display:inline-block;border:2px solid currentColor;">${c.secondaryCtaText}</a>` : ''}
      ${!isSplit ? `</div>` : ''}
    </div>
  </div>
</section>`
    }

    case 'about': {
      const c = section.content
      const isRight = c.imagePosition === 'right'
      return `
<section id="section-${id}">
  <div style="max-width:960px;margin:0 auto;display:flex;gap:3rem;align-items:center;flex-wrap:wrap;${isRight ? '' : 'flex-direction:row-reverse;'}">
    <div style="flex:1;min-width:280px;">
      <h2 style="font-size:2rem;font-weight:700;margin-bottom:.75rem;">${c.title}</h2>
      <p style="opacity:.8;margin-bottom:1rem;font-style:italic;">${c.subtitle}</p>
      <p style="opacity:.75;line-height:1.8;margin-bottom:1.5rem;">${c.body}</p>
      ${c.ctaText ? `<a href="${c.ctaUrl}" style="color:${c.accentColor};font-weight:600;text-decoration:none;">${c.ctaText} →</a>` : ''}
    </div>
    ${c.imageUrl ? `<div style="flex:1;min-width:280px;"><img src="${c.imageUrl}" alt="About" style="width:100%;border-radius:12px;object-fit:cover;aspect-ratio:4/3;" /></div>` : ''}
  </div>
</section>`
    }

    case 'contact': {
      const c = section.content
      return `
<section id="section-${id}">
  <div style="max-width:600px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:2.5rem;">
      <h2 style="font-size:2rem;font-weight:700;margin-bottom:.75rem;">${c.title}</h2>
      <p style="opacity:.7;">${c.subtitle}</p>
    </div>
    <form style="display:flex;flex-direction:column;gap:1rem;">
      <input type="text" placeholder="${c.namePlaceholder}" style="width:100%;padding:.75rem 1rem;border-radius:8px;border:1px solid rgba(128,128,128,.3);background:transparent;color:inherit;font-family:inherit;" />
      <input type="email" placeholder="${c.emailPlaceholder}" style="width:100%;padding:.75rem 1rem;border-radius:8px;border:1px solid rgba(128,128,128,.3);background:transparent;color:inherit;font-family:inherit;" />
      <textarea rows="5" placeholder="${c.messagePlaceholder}" style="width:100%;padding:.75rem 1rem;border-radius:8px;border:1px solid rgba(128,128,128,.3);background:transparent;color:inherit;font-family:inherit;resize:vertical;"></textarea>
      <button type="submit" style="padding:.85rem;border-radius:8px;background:${c.ctaBackgroundColor};color:${c.ctaTextColor};font-weight:600;border:none;cursor:pointer;font-family:inherit;font-size:1rem;">${c.submitText}</button>
    </form>
  </div>
</section>`
    }

    case 'testimonials': {
      const c = section.content
      return `
<section id="section-${id}">
  <div style="max-width:960px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:3rem;">
      <h2 style="font-size:2rem;font-weight:700;margin-bottom:.75rem;">${c.title}</h2>
      <p style="opacity:.7;">${c.subtitle}</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(${c.columns},1fr);gap:1.5rem;">
      ${c.items.map((item) => `
      <div style="padding:1.75rem;border-radius:12px;border:1px solid rgba(128,128,128,.2);display:flex;flex-direction:column;gap:.75rem;">
        <div style="color:${c.accentColor};font-size:1.1rem;">${starRating(item.rating)}</div>
        <p style="font-size:.95rem;line-height:1.7;opacity:.85;">&ldquo;${item.quote}&rdquo;</p>
        <div style="display:flex;align-items:center;gap:.75rem;margin-top:auto;">
          ${item.avatarUrl
            ? `<img src="${item.avatarUrl}" alt="${item.name}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;" />`
            : `<div style="width:40px;height:40px;border-radius:50%;background:${c.accentColor}22;display:flex;align-items:center;justify-content:center;font-weight:700;color:${c.accentColor};">${item.name[0]}</div>`}
          <div>
            <div style="font-weight:600;font-size:.9rem;">${item.name}</div>
            <div style="font-size:.8rem;opacity:.6;">${item.role}${item.company ? `, ${item.company}` : ''}</div>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`
    }

    case 'logo-strip': {
      const c = section.content
      return `
<section id="section-${id}">
  <div style="max-width:960px;margin:0 auto;text-align:center;">
    ${c.title ? `<p style="font-size:.85rem;text-transform:uppercase;letter-spacing:.1em;opacity:.5;margin-bottom:2rem;">${c.title}</p>` : ''}
    <div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:2.5rem;">
      ${c.logos.map((logo) => logo.imageUrl
        ? `<a href="${logo.url}"><img src="${logo.imageUrl}" alt="${logo.name}" style="height:36px;object-fit:contain;${c.grayscale ? 'filter:grayscale(1);opacity:.6;' : ''}" /></a>`
        : `<span style="font-weight:700;font-size:1.1rem;opacity:.35;letter-spacing:.05em;">${logo.name}</span>`
      ).join('')}
    </div>
  </div>
</section>`
    }
  }
}

export function generateFullHtml(sections: SectionData[]): string {
  // Collect unique fonts
  const fontFamilies = [...new Set(sections.map((s) => s.styles.fontFamily))]
  const googleFontsLinks: string[] = []
  for (const ff of fontFamilies) {
    const found = FONT_OPTIONS.find((f) => f.value === ff)
    if (found) {
      googleFontsLinks.push(
        `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${found.googleFamily}&display=swap" />`
      )
    }
  }

  const css = sections.map((s) => styleFromSection(s.id, s.styles)).join('\n\n')
  const html = sections.map(renderSection).join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Landing Page</title>
  ${googleFontsLinks.join('\n  ')}
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; padding: 0; }
    img { max-width: 100%; height: auto; }
    a { text-decoration: none; }
    @media (max-width: 768px) {
      [style*="grid-template-columns:repeat(3"] { grid-template-columns: 1fr !important; }
      [style*="grid-template-columns:repeat(2"] { grid-template-columns: 1fr !important; }
      [style*="font-size:3rem"] { font-size: 2rem !important; }
      [style*="display:flex"] { flex-direction: column !important; }
    }

    ${css}
  </style>
</head>
<body>
${html}
</body>
</html>`
}
