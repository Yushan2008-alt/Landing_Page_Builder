export interface FontOption {
  label: string
  value: string
  googleFamily: string
}

export const FONT_OPTIONS: FontOption[] = [
  { label: 'Inter', value: 'Inter, sans-serif', googleFamily: 'Inter:wght@400;500;600;700' },
  { label: 'Roboto', value: 'Roboto, sans-serif', googleFamily: 'Roboto:wght@400;500;700' },
  { label: 'Open Sans', value: "'Open Sans', sans-serif", googleFamily: 'Open+Sans:wght@400;600;700' },
  { label: 'Poppins', value: 'Poppins, sans-serif', googleFamily: 'Poppins:wght@400;500;600;700' },
  { label: 'Montserrat', value: 'Montserrat, sans-serif', googleFamily: 'Montserrat:wght@400;500;600;700' },
  { label: 'Lato', value: 'Lato, sans-serif', googleFamily: 'Lato:wght@400;700' },
  { label: 'Nunito', value: 'Nunito, sans-serif', googleFamily: 'Nunito:wght@400;500;600;700' },
  { label: 'Raleway', value: 'Raleway, sans-serif', googleFamily: 'Raleway:wght@400;500;600;700' },
  { label: 'Playfair Display', value: "'Playfair Display', serif", googleFamily: 'Playfair+Display:wght@400;500;700' },
  { label: 'Merriweather', value: 'Merriweather, serif', googleFamily: 'Merriweather:wght@400;700' },
  { label: 'Space Grotesk', value: "'Space Grotesk', sans-serif", googleFamily: 'Space+Grotesk:wght@400;500;600;700' },
  { label: 'DM Sans', value: "'DM Sans', sans-serif", googleFamily: 'DM+Sans:wght@400;500;700' },
]
