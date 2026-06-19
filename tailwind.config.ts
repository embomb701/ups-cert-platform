import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep blue-black "carbon" backgrounds — the inside of a switchgear.
        carbon: {
          950: '#05070b',
          900: '#0a0e16',
          850: '#0f1420',
          800: '#151c2b',
          700: '#1f2940',
          600: '#2c3a57',
        },
        // High-voltage gold — primary energy / call-to-action.
        voltage: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Warm copper — the craft of the trade (wiring, busbar).
        copper: {
          300: '#e8b48c',
          400: '#d9925f',
          500: '#c2703d',
          600: '#a3572c',
          700: '#7e4423',
        },
        // Electric arc cyan — technology, AI proctoring, "live" status.
        arc: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        // Keep an indigo "brand" alias so legacy classes don't break.
        brand: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        voltage: '0 0 0 1px rgba(245,158,11,0.25), 0 12px 40px -12px rgba(245,158,11,0.35)',
        arc: '0 0 0 1px rgba(56,189,248,0.25), 0 12px 40px -12px rgba(56,189,248,0.30)',
        panel: '0 24px 60px -24px rgba(0,0,0,0.8)',
      },
      backgroundImage: {
        'grid-blueprint':
          'linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)',
        'voltage-gradient': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 55%, #d97706 100%)',
        'carbon-radial':
          'radial-gradient(1200px 600px at 50% -10%, rgba(245,158,11,0.10), transparent 60%)',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 100%': { opacity: '1' },
          '20%, 22%': { opacity: '0.4' },
        },
      },
      animation: {
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        flicker: 'flicker 4s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
