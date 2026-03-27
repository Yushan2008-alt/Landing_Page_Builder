import type { SectionData, SectionStyles, SectionType } from '../types/section'
import { nanoid } from 'nanoid'

export const DEFAULT_STYLES: SectionStyles = {
  backgroundColor: '#ffffff',
  textColor: '#111111',
  paddingTop: 80,
  paddingBottom: 80,
  paddingLeft: 24,
  paddingRight: 24,
  borderRadius: 0,
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  customCss: '',
}

export const DARK_STYLES: SectionStyles = {
  ...DEFAULT_STYLES,
  backgroundColor: '#0f0f0f',
  textColor: '#f5f5f5',
}

export function createSection(type: SectionType): SectionData {
  const id = nanoid()
  switch (type) {
    case 'hero':
      return {
        id, type,
        styles: { ...DEFAULT_STYLES, backgroundColor: '#0f172a', textColor: '#f8fafc' },
        content: {
          headline: 'Build Landing Pages That Convert',
          subheadline: 'Create stunning, high-converting landing pages in minutes. No coding required.',
          ctaText: 'Get Started Free',
          ctaUrl: '#',
          secondaryCtaText: 'See Demo',
          secondaryCtaUrl: '#',
          backgroundImage: '',
          ctaBackgroundColor: '#6366f1',
          ctaTextColor: '#ffffff',
        },
      }
    case 'features':
      return {
        id, type,
        styles: { ...DEFAULT_STYLES, backgroundColor: '#ffffff', textColor: '#111111' },
        content: {
          title: 'Everything You Need',
          subtitle: 'Powerful features designed to help you build and launch faster.',
          columns: 3,
          accentColor: '#6366f1',
          items: [
            { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for speed and performance right out of the box.' },
            { icon: '🎨', title: 'Beautiful Design', description: 'Professionally crafted components that look great everywhere.' },
            { icon: '📱', title: 'Fully Responsive', description: 'Looks perfect on desktop, tablet, and mobile devices.' },
            { icon: '🔒', title: 'Secure by Default', description: 'Built with security best practices from the ground up.' },
            { icon: '🚀', title: 'Easy to Deploy', description: 'Export clean HTML and deploy anywhere in seconds.' },
            { icon: '✏️', title: 'Easy to Customize', description: 'Adjust every element to match your brand perfectly.' },
          ],
        },
      }
    case 'pricing':
      return {
        id, type,
        styles: { ...DEFAULT_STYLES, backgroundColor: '#f8fafc', textColor: '#111111' },
        content: {
          title: 'Simple, Transparent Pricing',
          subtitle: 'Choose the plan that works best for you.',
          accentColor: '#6366f1',
          plans: [
            {
              name: 'Starter',
              price: '$0',
              period: '/month',
              description: 'Perfect for individuals and small projects.',
              features: ['5 landing pages', 'Basic analytics', 'Email support', 'Export HTML'],
              ctaText: 'Get Started',
              ctaUrl: '#',
              highlighted: false,
            },
            {
              name: 'Pro',
              price: '$29',
              period: '/month',
              description: 'For growing teams and businesses.',
              features: ['Unlimited pages', 'Advanced analytics', 'Priority support', 'Custom domain', 'A/B testing'],
              ctaText: 'Start Free Trial',
              ctaUrl: '#',
              highlighted: true,
            },
            {
              name: 'Agency',
              price: '$99',
              period: '/month',
              description: 'For agencies managing multiple clients.',
              features: ['Everything in Pro', 'Client management', 'White-label', 'API access', 'Dedicated support'],
              ctaText: 'Contact Sales',
              ctaUrl: '#',
              highlighted: false,
            },
          ],
        },
      }
    case 'faq':
      return {
        id, type,
        styles: { ...DEFAULT_STYLES, backgroundColor: '#ffffff', textColor: '#111111' },
        content: {
          title: 'Frequently Asked Questions',
          subtitle: 'Everything you need to know about our product.',
          accentColor: '#6366f1',
          items: [
            { question: 'How does it work?', answer: 'Simply drag and drop sections onto your canvas, customize the content, and export your landing page as clean HTML.' },
            { question: 'Do I need to know how to code?', answer: 'Not at all! Our visual builder lets you create professional landing pages without writing a single line of code.' },
            { question: 'Can I use my own domain?', answer: 'Yes! Export the HTML and host it anywhere you like — your own server, GitHub Pages, Netlify, or any hosting provider.' },
            { question: 'Is there a free plan?', answer: 'Yes, we offer a generous free plan that lets you create and export unlimited landing pages.' },
          ],
        },
      }
    case 'cta':
      return {
        id, type,
        styles: { ...DEFAULT_STYLES, backgroundColor: '#6366f1', textColor: '#ffffff' },
        content: {
          headline: 'Ready to Get Started?',
          subheadline: 'Join thousands of businesses already using our platform to grow their revenue.',
          ctaText: 'Start Building for Free',
          ctaUrl: '#',
          secondaryCtaText: 'Talk to Sales',
          secondaryCtaUrl: '#',
          backgroundImage: '',
          ctaBackgroundColor: '#ffffff',
          ctaTextColor: '#6366f1',
          layout: 'centered',
        },
      }
    case 'about':
      return {
        id, type,
        styles: { ...DEFAULT_STYLES, backgroundColor: '#ffffff', textColor: '#111111' },
        content: {
          title: 'Our Story',
          subtitle: 'We started with a simple mission: make beautiful landing pages accessible to everyone.',
          body: 'Founded in 2024, we have been helping businesses of all sizes create stunning landing pages that convert visitors into customers. Our team is passionate about great design and ease of use.',
          imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
          imagePosition: 'right',
          ctaText: 'Learn More',
          ctaUrl: '#',
          accentColor: '#6366f1',
        },
      }
    case 'contact':
      return {
        id, type,
        styles: { ...DEFAULT_STYLES, backgroundColor: '#f8fafc', textColor: '#111111' },
        content: {
          title: 'Get in Touch',
          subtitle: 'Have a question? We would love to hear from you.',
          namePlaceholder: 'Your Name',
          emailPlaceholder: 'your@email.com',
          messagePlaceholder: 'Tell us how we can help...',
          submitText: 'Send Message',
          accentColor: '#6366f1',
          ctaBackgroundColor: '#6366f1',
          ctaTextColor: '#ffffff',
        },
      }
    case 'testimonials':
      return {
        id, type,
        styles: { ...DEFAULT_STYLES, backgroundColor: '#f8fafc', textColor: '#111111' },
        content: {
          title: 'What Our Customers Say',
          subtitle: 'Trusted by thousands of businesses worldwide.',
          columns: 3,
          accentColor: '#6366f1',
          items: [
            {
              quote: 'This tool completely transformed how we build landing pages. We went from spending weeks to launching in hours.',
              name: 'Sarah Johnson',
              role: 'Marketing Director',
              company: 'TechCorp',
              avatarUrl: '',
              rating: 5,
            },
            {
              quote: 'The drag and drop interface is incredibly intuitive. Our whole team was up and running without any training.',
              name: 'Michael Chen',
              role: 'Founder',
              company: 'StartupXYZ',
              avatarUrl: '',
              rating: 5,
            },
            {
              quote: 'The HTML export feature is a game changer. We can host our pages anywhere without being locked into a platform.',
              name: 'Emma Williams',
              role: 'Lead Developer',
              company: 'Agency Pro',
              avatarUrl: '',
              rating: 5,
            },
          ],
        },
      }
    case 'logo-strip':
      return {
        id, type,
        styles: { ...DEFAULT_STYLES, backgroundColor: '#ffffff', paddingTop: 48, paddingBottom: 48 },
        content: {
          title: 'Trusted by leading companies',
          grayscale: true,
          accentColor: '#888888',
          logos: [
            { name: 'Acme Corp', imageUrl: '', url: '#' },
            { name: 'GlobalTech', imageUrl: '', url: '#' },
            { name: 'Innovate Inc', imageUrl: '', url: '#' },
            { name: 'FutureCo', imageUrl: '', url: '#' },
            { name: 'NextGen', imageUrl: '', url: '#' },
          ],
        },
      }
  }
}

export const SECTION_META: Record<SectionType, { label: string; icon: string; description: string }> = {
  hero: { label: 'Hero', icon: '🏠', description: 'Main headline + CTA' },
  features: { label: 'Features', icon: '⚡', description: 'Feature grid / benefits' },
  pricing: { label: 'Pricing', icon: '💰', description: 'Pricing plans table' },
  faq: { label: 'FAQ', icon: '❓', description: 'Frequently asked questions' },
  cta: { label: 'CTA', icon: '🎯', description: 'Call to action banner' },
  about: { label: 'About', icon: '📖', description: 'About / our story' },
  contact: { label: 'Contact', icon: '✉️', description: 'Contact form' },
  testimonials: { label: 'Testimonials', icon: '💬', description: 'Customer reviews' },
  'logo-strip': { label: 'Logo Strip', icon: '🏢', description: 'Trusted by logos' },
}
