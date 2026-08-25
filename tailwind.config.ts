import type { Config } from 'tailwindcss';

// ── Palette philosophy ──────────────────────────────────────────────────────
// This site trains people for electrical and industrial trades — UPS systems,
// generators, switchgear, data centers. The stock Tailwind indigo/blue "SaaS
// gradient" look reads as generic startup, not as a serious technical trade
// credential. Instead of inventing brand-new color names nobody would
// reference (the previous `brand`/`power` palettes here were unused dead
// config — zero usages in the codebase), we override the *built-in* Tailwind
// families that are already used in 600+ places across the app
// (bg-blue-600, text-indigo-400, bg-gray-950, etc.). Every existing class
// picks up the new palette automatically — no per-component edits needed.
//
//   blue    -> warm safety-orange/copper (was Tailwind's default `orange`
//              scale). Primary accent: buttons, links, the hero gradient.
//              Orange is literally the color of electrical hazard signage
//              and utility equipment — on-brand, not decorative.
//   indigo  -> clean steel blue (was Tailwind's default `blue` scale).
//              Secondary accent: Jr.-tier badges, secondary UI states.
//   cyan    -> left as Tailwind's stock cyan. Already reads as "live
//              current" against a dark background; pairs cleanly as the
//              cool complement to the new warm primary.
//   gray    -> warm near-black neutral (was Tailwind's default `stone`
//              scale) instead of cold blue-gray, so backgrounds read as a
//              deliberate "control room" neutral rather than default dark
//              mode. Lightness steps match stone's own tested contrast
//              ladder — no reduced accessibility.
//   amber   -> left as Tailwind's stock amber. Already used specifically
//              for FSE-tier badges; distinct enough from the new orange
//              primary (more gold, less red) to keep that signal legible.

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        indigo: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        gray: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
