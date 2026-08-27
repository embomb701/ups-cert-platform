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
//              mode.
//   amber   -> left as Tailwind's stock amber except one shade (600, see
//              below); already used specifically for FSE-tier badges,
//              distinct enough from the new orange primary (more gold,
//              less red) to keep that signal legible.
//
// A follow-up WCAG contrast pass (computed against the actual bg-gray-950/
// -900 this site renders on, not assumed) found real failures both in
// stock Tailwind's own defaults and introduced by the palette swap above —
// see the inline comments on blue.500/600, gray.500/600, and amber.600
// below for the specific ratios and what changed. Everything else in this
// file passed comfortably (AAA in most cases) and was left alone.

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
          // 500/600 are darkened from stock Tailwind orange — this codebase
          // uses both as solid button fills with white text (bg-blue-600 is
          // the primary CTA color site-wide, hover:bg-blue-500 the hover
          // state), and stock orange-500/600 fail WCAG AA white-text
          // contrast (2.80:1 / 3.56:1). These pass at 4.61:1 / 4.90:1. 400
          // stays untouched as the bright text/link/gradient tier — it's
          // used as text 80+ times and only 2 as a fill, so it kept its
          // original brightness rather than being darkened for a use case
          // it barely has.
          500: '#ce480c',
          600: '#c8440c',
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
          // 500/600 are lightened from stock `stone` — text-gray-500/600 is
          // the most common "muted caption" text color combo site-wide
          // (500 alone: 551 real text usages) and stock stone-500/600 fail
          // WCAG AA against the near-black page background (4.12:1 /
          // 2.59:1 — this predates the palette work, stock Tailwind
          // gray-500/600 had the same problem, 4.16:1 / 2.66:1). These
          // pass at 5.71:1 / 5.35:1 on bg-gray-950.
          500: '#8f8983',
          600: '#8a847e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        // Only 600 is overridden — the one shade this codebase uses as a
        // solid button fill with white text (bg-amber-700 hover:bg-amber-600
        // is the standard secondary-button pattern). Stock amber-600 fails
        // at 3.19:1; this passes at 4.68:1 while staying visibly lighter
        // than the unchanged amber-700 so the hover state still reads as a
        // real state change. 50-500/700-950 are untouched stock amber.
        amber: {
          600: '#ba5806',
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
