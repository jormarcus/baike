/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        backgroundBase: 'hsl(var(--background-base))',
        backgroundHighlight: 'hsl(var(--background-highlight))',
        backgroundPress: 'hsl(var(--background-press))',
        backgroundElevatedBase: 'hsl(var(--background-elevated-base))',
        backgroundElevatedHighlight:
          'hsl(var(--background-elevated-highlight))',
        backgroundElevatedPress: 'hsl(var(--background-elevated-press))',
        backgroundTintedBase: 'hsl(var(--background-tinted-base))',
        backgroundTintedHighlight: 'hsl(var(--background-tinted-highlight))',
        backgroundTintedPress: 'hsl(var(--background-tinted-press))',
        textBase: 'hsl(var(--text-base))',
        textSubdued: 'hsl(var(--text-subdued))',
        textBrightAccent: 'hsl(var(--text-bright-accent))',
        textNegative: 'hsl(var(--text-negative))',
        textWarning: 'hsl(var(--text-warning))',
        textPositive: 'hsl(var(--text-positive))',
        textAnnouncement: 'hsl(var(--text-announcement))',
        essentialBase: 'hsl(var(--essential-base))',
        essentialSubdued: 'hsl(var(--essential-subdued))',
        essentialBrightAccent: 'hsl(var(--essential-bright-accent))',
        essentialNegative: 'hsl(var(--essential-negative))',
        essentialWarning: 'hsl(var(--essential-warning))',
        essentialPositive: 'hsl(var(--essential-positive))',
        essentialAnnouncement: 'hsl(var(--essential-announcement))',
        decorativeBase: 'hsl(var(--decorative-base))',
        decorativeSubdued: 'hsl(var(--decorative-subdued))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
