import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

export const metadata: Metadata = {
  title: "Ohm's Law Interactive Lesson — Mastering Field Service",
  description: "Interactive Ohm's Law lesson: explore how voltage, current, and resistance relate using a live circuit diagram. Free for aspiring field service technicians.",
  openGraph: {
    title: "Ohm's Law — Interactive Electricity Lesson",
    description: "Learn I = V/R with a live interactive circuit. Free from Mastering Field Service.",
    images: [{ url: `${SITE_URL}/api/og`, width: 1200, height: 630, alt: "Ohm's Law Interactive Lesson" }],
  },
  twitter: { card: 'summary_large_image', images: [`${SITE_URL}/api/og`] },
};

export default function OhmsLawLayout({ children }: { children: React.ReactNode }) {
  return children;
}
