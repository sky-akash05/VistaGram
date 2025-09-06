import type { Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1rem', md: '2rem', lg: '2.5rem' },
      screens: { sm: '600px', md: '700px', lg: '800px', xl: '880px' },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'ui-sans-serif', 'sans-serif'],
        display: ['var(--font-playfair)', 'ui-serif', 'serif'],
        serif: ['var(--font-playfair)', 'ui-serif', 'serif'],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          DEFAULT: '#6366f1',
        },
      },
      borderRadius: {
        xl: '0.9rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 1px 3px rgba(16,24,40,.08), 0 1px 2px rgba(16,24,40,.06)',
        elevated: '0 8px 24px rgba(0,0,0,.08)',
        glow: '0 0 0 4px rgba(99,102,241,.15)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to bottom right, #6366f1, #7c3aed)',
      },
      keyframes: {
        shimmer: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
        'fade-in': { '0%': { opacity: '0', transform: 'translateY(6px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        pop: { '0%': { transform: 'scale(.98)' }, '100%': { transform: 'scale(1)' } },
      },
      animation: {
        shimmer: 'shimmer 1.3s infinite',
        in: 'fade-in .3s ease-out',
        float: 'float 6s ease-in-out infinite',
        pop: 'pop .15s ease-out',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
