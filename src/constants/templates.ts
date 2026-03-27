import type { SectionData } from '../types/section'

interface Template {
  id: string
  name: string
  description: string
  sections: SectionData[]
}

const SAAS_SECTIONS: SectionData[] = [
  {
    id: 'tpl-s1', type: 'logo-strip',
    styles: { backgroundColor: '#ffffff', textColor: '#111111', paddingTop: 40, paddingBottom: 40, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Inter, sans-serif', fontSize: 16, customCss: '' },
    content: { title: 'Trusted by 5,000+ companies', grayscale: true, accentColor: '#888', logos: [{ name: 'Acme Corp', imageUrl: '', url: '#' }, { name: 'GlobalTech', imageUrl: '', url: '#' }, { name: 'Innovate', imageUrl: '', url: '#' }, { name: 'FutureCo', imageUrl: '', url: '#' }] },
  },
  {
    id: 'tpl-s2', type: 'hero',
    styles: { backgroundColor: '#0f172a', textColor: '#f8fafc', paddingTop: 100, paddingBottom: 100, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Inter, sans-serif', fontSize: 16, customCss: '' },
    content: { headline: 'Ship Faster. Scale Smarter.', subheadline: 'The all-in-one SaaS platform that helps your team build, ship, and grow.', ctaText: 'Start Free Trial', ctaUrl: '#', secondaryCtaText: 'Watch Demo', secondaryCtaUrl: '#', backgroundImage: '', ctaBackgroundColor: '#6366f1', ctaTextColor: '#ffffff' },
  },
  {
    id: 'tpl-s3', type: 'features',
    styles: { backgroundColor: '#ffffff', textColor: '#111111', paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Inter, sans-serif', fontSize: 16, customCss: '' },
    content: { title: 'Built for Modern Teams', subtitle: 'Everything your team needs to move fast and stay aligned.', columns: 3, accentColor: '#6366f1', items: [{ icon: '⚡', title: 'Real-time Sync', description: 'Changes sync instantly across your team.' }, { icon: '🔒', title: 'Enterprise Security', description: 'SOC 2 compliant with end-to-end encryption.' }, { icon: '📊', title: 'Advanced Analytics', description: 'Deep insights into how your product is used.' }, { icon: '🔗', title: '100+ Integrations', description: 'Connects with tools you already use.' }, { icon: '🌍', title: 'Global CDN', description: 'Fast everywhere with 200+ edge locations.' }, { icon: '🛠', title: 'Developer API', description: 'Build anything with our powerful REST API.' }] },
  },
  {
    id: 'tpl-s4', type: 'testimonials',
    styles: { backgroundColor: '#f8fafc', textColor: '#111111', paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Inter, sans-serif', fontSize: 16, customCss: '' },
    content: { title: 'Loved by 50,000+ Users', subtitle: 'See why teams choose us over the competition.', columns: 3, accentColor: '#6366f1', items: [{ quote: 'Reduced our deployment time by 80%. Absolutely incredible product.', name: 'Alex Kim', role: 'CTO', company: 'DevForge', avatarUrl: '', rating: 5 }, { quote: 'The integrations are seamless. It just works with everything we use.', name: 'Maria Santos', role: 'VP Engineering', company: 'CloudBase', avatarUrl: '', rating: 5 }, { quote: 'Best investment we made this year. ROI was immediate.', name: 'James Park', role: 'CEO', company: 'LaunchPad', avatarUrl: '', rating: 5 }] },
  },
  {
    id: 'tpl-s5', type: 'pricing',
    styles: { backgroundColor: '#ffffff', textColor: '#111111', paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Inter, sans-serif', fontSize: 16, customCss: '' },
    content: { title: 'Simple Pricing', subtitle: 'No hidden fees. Cancel anytime.', accentColor: '#6366f1', plans: [{ name: 'Starter', price: '$0', period: '/mo', description: 'For small teams getting started.', features: ['Up to 5 users', '10 projects', 'Basic analytics', 'Email support'], ctaText: 'Get Started', ctaUrl: '#', highlighted: false }, { name: 'Pro', price: '$49', period: '/mo', description: 'For growing teams.', features: ['Unlimited users', 'Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom integrations'], ctaText: 'Start Trial', ctaUrl: '#', highlighted: true }, { name: 'Enterprise', price: 'Custom', period: '', description: 'For large organizations.', features: ['Everything in Pro', 'SLA guarantee', 'Dedicated support', 'Custom contracts', 'On-premise option'], ctaText: 'Contact Us', ctaUrl: '#', highlighted: false }] },
  },
  {
    id: 'tpl-s6', type: 'faq',
    styles: { backgroundColor: '#f8fafc', textColor: '#111111', paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Inter, sans-serif', fontSize: 16, customCss: '' },
    content: { title: 'Common Questions', subtitle: 'Everything you need to know before getting started.', accentColor: '#6366f1', items: [{ question: 'Can I try it for free?', answer: 'Yes! Our Starter plan is completely free. No credit card required.' }, { question: 'How does billing work?', answer: 'You are billed monthly or annually. Annual billing saves you 20%.' }, { question: 'Can I cancel anytime?', answer: 'Absolutely. There are no long-term contracts or cancellation fees.' }] },
  },
  {
    id: 'tpl-s7', type: 'cta',
    styles: { backgroundColor: '#6366f1', textColor: '#ffffff', paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Inter, sans-serif', fontSize: 16, customCss: '' },
    content: { headline: 'Ready to Get Started?', subheadline: 'Join 50,000+ teams already using our platform.', ctaText: 'Start Free Trial', ctaUrl: '#', secondaryCtaText: 'Talk to Sales', secondaryCtaUrl: '#', backgroundImage: '', ctaBackgroundColor: '#ffffff', ctaTextColor: '#6366f1', layout: 'centered' },
  },
]

const ECOMMERCE_SECTIONS: SectionData[] = [
  {
    id: 'tpl-e1', type: 'hero',
    styles: { backgroundColor: '#1a1a2e', textColor: '#ffffff', paddingTop: 100, paddingBottom: 100, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Poppins, sans-serif', fontSize: 16, customCss: '' },
    content: { headline: 'Summer Collection 2025', subheadline: 'Discover our handpicked selection of premium products. Free shipping on orders over $50.', ctaText: 'Shop Now', ctaUrl: '#', secondaryCtaText: 'View Lookbook', secondaryCtaUrl: '#', backgroundImage: '', ctaBackgroundColor: '#f59e0b', ctaTextColor: '#000000' },
  },
  {
    id: 'tpl-e2', type: 'logo-strip',
    styles: { backgroundColor: '#f8fafc', textColor: '#111111', paddingTop: 40, paddingBottom: 40, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Poppins, sans-serif', fontSize: 16, customCss: '' },
    content: { title: 'As seen in', grayscale: true, accentColor: '#888', logos: [{ name: 'Forbes', imageUrl: '', url: '#' }, { name: 'TechCrunch', imageUrl: '', url: '#' }, { name: 'Vogue', imageUrl: '', url: '#' }, { name: 'Wired', imageUrl: '', url: '#' }] },
  },
  {
    id: 'tpl-e3', type: 'features',
    styles: { backgroundColor: '#ffffff', textColor: '#111111', paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Poppins, sans-serif', fontSize: 16, customCss: '' },
    content: { title: 'Why Shop With Us', subtitle: 'We make online shopping simple, safe, and enjoyable.', columns: 3, accentColor: '#f59e0b', items: [{ icon: '🚚', title: 'Free Shipping', description: 'Free delivery on all orders above $50.' }, { icon: '↩️', title: '30-Day Returns', description: 'Not happy? Return it within 30 days, no questions asked.' }, { icon: '🔒', title: 'Secure Checkout', description: '256-bit SSL encryption for all transactions.' }, { icon: '⭐', title: 'Quality Guarantee', description: 'Every product is inspected for premium quality.' }, { icon: '💬', title: '24/7 Support', description: 'Our team is always here to help you.' }, { icon: '🎁', title: 'Gift Wrapping', description: 'Add a personal touch with our gift wrap service.' }] },
  },
  {
    id: 'tpl-e4', type: 'testimonials',
    styles: { backgroundColor: '#f8fafc', textColor: '#111111', paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Poppins, sans-serif', fontSize: 16, customCss: '' },
    content: { title: 'Happy Customers', subtitle: 'Join thousands of satisfied shoppers.', columns: 3, accentColor: '#f59e0b', items: [{ quote: 'The quality is amazing and it arrived faster than expected. Will definitely shop again!', name: 'Lisa Wong', role: 'Verified Buyer', company: '', avatarUrl: '', rating: 5 }, { quote: 'Beautiful products and excellent packaging. Makes a perfect gift.', name: 'Tom Harris', role: 'Verified Buyer', company: '', avatarUrl: '', rating: 5 }, { quote: 'Customer service was outstanding when I had an issue. 10/10 experience.', name: 'Nina Patel', role: 'Verified Buyer', company: '', avatarUrl: '', rating: 5 }] },
  },
  {
    id: 'tpl-e5', type: 'cta',
    styles: { backgroundColor: '#f59e0b', textColor: '#000000', paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Poppins, sans-serif', fontSize: 16, customCss: '' },
    content: { headline: 'Get 20% Off Your First Order', subheadline: 'Sign up for our newsletter and receive an exclusive discount code in your inbox.', ctaText: 'Claim My Discount', ctaUrl: '#', secondaryCtaText: '', secondaryCtaUrl: '', backgroundImage: '', ctaBackgroundColor: '#000000', ctaTextColor: '#ffffff', layout: 'centered' },
  },
]

const AGENCY_SECTIONS: SectionData[] = [
  {
    id: 'tpl-a1', type: 'hero',
    styles: { backgroundColor: '#0a0a0a', textColor: '#f5f5f5', paddingTop: 120, paddingBottom: 120, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Montserrat, sans-serif', fontSize: 16, customCss: '' },
    content: { headline: 'We Build Brands That Matter', subheadline: 'Strategy, design, and development studio for ambitious companies ready to make their mark.', ctaText: 'Start a Project', ctaUrl: '#', secondaryCtaText: 'View Our Work', secondaryCtaUrl: '#', backgroundImage: '', ctaBackgroundColor: '#8b5cf6', ctaTextColor: '#ffffff' },
  },
  {
    id: 'tpl-a2', type: 'logo-strip',
    styles: { backgroundColor: '#111111', textColor: '#f5f5f5', paddingTop: 40, paddingBottom: 40, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Montserrat, sans-serif', fontSize: 16, customCss: '' },
    content: { title: 'Clients we have worked with', grayscale: false, accentColor: '#8b5cf6', logos: [{ name: 'Stripe', imageUrl: '', url: '#' }, { name: 'Notion', imageUrl: '', url: '#' }, { name: 'Linear', imageUrl: '', url: '#' }, { name: 'Vercel', imageUrl: '', url: '#' }, { name: 'Figma', imageUrl: '', url: '#' }] },
  },
  {
    id: 'tpl-a3', type: 'features',
    styles: { backgroundColor: '#0a0a0a', textColor: '#f5f5f5', paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Montserrat, sans-serif', fontSize: 16, customCss: '' },
    content: { title: 'Our Services', subtitle: 'End-to-end solutions for digital growth.', columns: 3, accentColor: '#8b5cf6', items: [{ icon: '🎨', title: 'Brand Identity', description: 'Logo, visual system, and brand guidelines that stand out.' }, { icon: '💻', title: 'Web Development', description: 'Fast, beautiful websites and web apps built to convert.' }, { icon: '📱', title: 'Mobile Apps', description: 'Native and cross-platform apps for iOS and Android.' }, { icon: '📈', title: 'Growth Marketing', description: 'Data-driven campaigns that drive real results.' }, { icon: '🔍', title: 'SEO & Content', description: 'Rank higher and attract the right audience.' }, { icon: '⚡', title: 'Performance Audit', description: 'Identify and fix what is slowing your site down.' }] },
  },
  {
    id: 'tpl-a4', type: 'about',
    styles: { backgroundColor: '#111111', textColor: '#f5f5f5', paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Montserrat, sans-serif', fontSize: 16, customCss: '' },
    content: { title: 'Who We Are', subtitle: 'A tight-knit team of designers, engineers, and strategists.', body: 'Founded in 2018, we have helped 200+ companies across the globe launch and grow their digital presence. We believe great work comes from deep collaboration, relentless iteration, and a genuine passion for craft.', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', imagePosition: 'right', ctaText: 'Meet the Team', ctaUrl: '#', accentColor: '#8b5cf6' },
  },
  {
    id: 'tpl-a5', type: 'testimonials',
    styles: { backgroundColor: '#0a0a0a', textColor: '#f5f5f5', paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Montserrat, sans-serif', fontSize: 16, customCss: '' },
    content: { title: 'Client Stories', subtitle: 'Results that speak for themselves.', columns: 3, accentColor: '#8b5cf6', items: [{ quote: 'They completely transformed our brand. Revenue increased 3x within 6 months of the rebrand.', name: 'David Chen', role: 'CEO', company: 'Horizon Labs', avatarUrl: '', rating: 5 }, { quote: 'The website they built is the best marketing asset we have. Conversion rate doubled.', name: 'Sarah Mills', role: 'CMO', company: 'Nexus Health', avatarUrl: '', rating: 5 }, { quote: 'Exceptional quality and communication throughout. Delivered ahead of schedule.', name: 'Mark Rivera', role: 'Founder', company: 'Spark Studio', avatarUrl: '', rating: 5 }] },
  },
  {
    id: 'tpl-a6', type: 'cta',
    styles: { backgroundColor: '#8b5cf6', textColor: '#ffffff', paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, borderRadius: 0, fontFamily: 'Montserrat, sans-serif', fontSize: 16, customCss: '' },
    content: { headline: "Let's Build Something Great", subheadline: 'Tell us about your project and we will get back to you within 24 hours.', ctaText: 'Start a Project', ctaUrl: '#', secondaryCtaText: 'Schedule a Call', secondaryCtaUrl: '#', backgroundImage: '', ctaBackgroundColor: '#ffffff', ctaTextColor: '#8b5cf6', layout: 'centered' },
  },
]

export const TEMPLATES: Template[] = [
  {
    id: 'saas',
    name: 'SaaS Product',
    description: '7 sections: Hero, Features, Testimonials, Pricing, FAQ, CTA',
    sections: SAAS_SECTIONS,
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description: '5 sections: Hero, Logo Strip, Features, Testimonials, CTA',
    sections: ECOMMERCE_SECTIONS,
  },
  {
    id: 'agency',
    name: 'Agency',
    description: '6 sections: Hero, Clients, Services, About, Testimonials, CTA',
    sections: AGENCY_SECTIONS,
  },
]
