export type SectionType =
  | 'hero'
  | 'features'
  | 'pricing'
  | 'faq'
  | 'cta'
  | 'about'
  | 'contact'
  | 'testimonials'
  | 'logo-strip'

export interface SectionStyles {
  backgroundColor: string
  textColor: string
  paddingTop: number
  paddingBottom: number
  paddingLeft: number
  paddingRight: number
  borderRadius: number
  fontFamily: string
  fontSize: number
  customCss: string
}

// --- Hero ---
export interface HeroContent {
  headline: string
  subheadline: string
  ctaText: string
  ctaUrl: string
  secondaryCtaText: string
  secondaryCtaUrl: string
  backgroundImage: string
  ctaBackgroundColor: string
  ctaTextColor: string
}

// --- Features ---
export interface FeatureItem {
  icon: string
  title: string
  description: string
}
export interface FeaturesContent {
  title: string
  subtitle: string
  columns: 2 | 3 | 4
  items: FeatureItem[]
  accentColor: string
}

// --- Pricing ---
export interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  ctaText: string
  ctaUrl: string
  highlighted: boolean
}
export interface PricingContent {
  title: string
  subtitle: string
  plans: PricingPlan[]
  accentColor: string
}

// --- FAQ ---
export interface FaqItem {
  question: string
  answer: string
}
export interface FaqContent {
  title: string
  subtitle: string
  items: FaqItem[]
  accentColor: string
}

// --- CTA ---
export interface CtaContent {
  headline: string
  subheadline: string
  ctaText: string
  ctaUrl: string
  secondaryCtaText: string
  secondaryCtaUrl: string
  backgroundImage: string
  ctaBackgroundColor: string
  ctaTextColor: string
  layout: 'centered' | 'split'
}

// --- About ---
export interface AboutContent {
  title: string
  subtitle: string
  body: string
  imageUrl: string
  imagePosition: 'left' | 'right'
  ctaText: string
  ctaUrl: string
  accentColor: string
}

// --- Contact ---
export interface ContactContent {
  title: string
  subtitle: string
  namePlaceholder: string
  emailPlaceholder: string
  messagePlaceholder: string
  submitText: string
  accentColor: string
  ctaBackgroundColor: string
  ctaTextColor: string
}

// --- Testimonials ---
export interface TestimonialItem {
  quote: string
  name: string
  role: string
  company: string
  avatarUrl: string
  rating: number
}
export interface TestimonialsContent {
  title: string
  subtitle: string
  items: TestimonialItem[]
  columns: 2 | 3
  accentColor: string
}

// --- Logo Strip ---
export interface LogoItem {
  name: string
  imageUrl: string
  url: string
}
export interface LogoStripContent {
  title: string
  logos: LogoItem[]
  grayscale: boolean
  accentColor: string
}

// --- Discriminated Union ---
export type SectionData =
  | { id: string; type: 'hero'; content: HeroContent; styles: SectionStyles }
  | { id: string; type: 'features'; content: FeaturesContent; styles: SectionStyles }
  | { id: string; type: 'pricing'; content: PricingContent; styles: SectionStyles }
  | { id: string; type: 'faq'; content: FaqContent; styles: SectionStyles }
  | { id: string; type: 'cta'; content: CtaContent; styles: SectionStyles }
  | { id: string; type: 'about'; content: AboutContent; styles: SectionStyles }
  | { id: string; type: 'contact'; content: ContactContent; styles: SectionStyles }
  | { id: string; type: 'testimonials'; content: TestimonialsContent; styles: SectionStyles }
  | { id: string; type: 'logo-strip'; content: LogoStripContent; styles: SectionStyles }
