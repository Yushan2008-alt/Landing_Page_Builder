import type { SectionData } from '../../types/section'
import { HeroSection } from '../sections/HeroSection'
import { FeaturesSection } from '../sections/FeaturesSection'
import { PricingSection } from '../sections/PricingSection'
import { FaqSection } from '../sections/FaqSection'
import { CtaSection } from '../sections/CtaSection'
import { AboutSection } from '../sections/AboutSection'
import { ContactSection } from '../sections/ContactSection'
import { TestimonialsSection } from '../sections/TestimonialsSection'
import { LogoStripSection } from '../sections/LogoStripSection'

interface Props { section: SectionData }

export function SectionPreview({ section }: Props) {
  switch (section.type) {
    case 'hero':        return <HeroSection content={section.content} styles={section.styles} />
    case 'features':    return <FeaturesSection content={section.content} styles={section.styles} />
    case 'pricing':     return <PricingSection content={section.content} styles={section.styles} />
    case 'faq':         return <FaqSection content={section.content} styles={section.styles} />
    case 'cta':         return <CtaSection content={section.content} styles={section.styles} />
    case 'about':       return <AboutSection content={section.content} styles={section.styles} />
    case 'contact':     return <ContactSection content={section.content} styles={section.styles} />
    case 'testimonials':return <TestimonialsSection content={section.content} styles={section.styles} />
    case 'logo-strip':  return <LogoStripSection content={section.content} styles={section.styles} />
  }
}
