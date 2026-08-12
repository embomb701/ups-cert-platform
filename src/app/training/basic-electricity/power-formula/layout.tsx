import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

export const metadata: Metadata = {
  title: 'Power Formula Interactive Lesson — Mastering Field Service',
  description: 'Interactive P = V × I lesson: see how electrical power is calculated and why it matters in UPS and field service systems. Free for aspiring technicians.',
  openGraph: {
    title: 'Power Formula — Interactive Electricity Lesson',
    description: 'Learn P = V × I with a live interactive simulator. Free from Mastering Field Service.',
    images: [{ url: `${SITE_URL}/api/og`, width: 1200, height: 630, alt: 'Power Formula Interactive Lesson' }],
  },
  twitter: { card: 'summary_large_image', images: [`${SITE_URL}/api/og`] },
};

export default function PowerFormulaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
