/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        border: 'var(--color-border)', /* Golden sun highlight */
        input: 'var(--color-input)', /* Subtle elevation */
        ring: 'var(--color-ring)', /* Golden sun highlight */
        background: 'var(--color-background)', /* Infinite steppe night */
        foreground: 'var(--color-foreground)', /* Clear communication */
        primary: {
          DEFAULT: 'var(--color-primary)', /* Deep earth foundation */
          foreground: 'var(--color-primary-foreground)', /* Clear communication */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* Rich leather warmth */
          foreground: 'var(--color-secondary-foreground)', /* Clear communication */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* Golden sun highlight */
          foreground: 'var(--color-accent-foreground)', /* Deep earth foundation */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* Sienna concern */
          foreground: 'var(--color-destructive-foreground)', /* Clear communication */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* Rich leather warmth */
          foreground: 'var(--color-muted-foreground)', /* Hierarchy support */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* Subtle elevation */
          foreground: 'var(--color-card-foreground)', /* Clear communication */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* Subtle elevation */
          foreground: 'var(--color-popover-foreground)', /* Clear communication */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* Harvest gold */
          foreground: 'var(--color-success-foreground)', /* Clear communication */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* Amber caution */
          foreground: 'var(--color-warning-foreground)', /* Deep earth foundation */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* Sienna concern */
          foreground: 'var(--color-error-foreground)', /* Clear communication */
        },
        brand: {
          brown: 'var(--color-brand-brown)', /* Saddle Brown */
          gold: 'var(--color-brand-gold)', /* Peru Gold */
          goldenrod: 'var(--color-brand-goldenrod)', /* Goldenrod */
          slate: 'var(--color-brand-slate)', /* Dark Slate Gray */
          beige: 'var(--color-brand-beige)', /* Beige */
          tan: 'var(--color-brand-tan)', /* Tan */
          orange: 'var(--color-brand-orange)', /* Dark Orange */
        },
      },
      fontFamily: {
        headline: ['Crimson Text', 'serif'],
        body: ['Source Sans 3', 'sans-serif'],
        cta: ['Oswald', 'sans-serif'],
        accent: ['Cormorant Garamond', 'serif'],
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-5px)', opacity: '0.7' },
          '50%': { transform: 'translateY(5px)', opacity: '1' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      },
      transitionTimingFunction: {
        organic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
};