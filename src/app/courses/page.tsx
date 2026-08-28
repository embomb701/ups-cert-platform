import type { Metadata } from 'next';
import Link from 'next/link';
import { COURSES } from '@/data/courses';
import { UPCOMING_COURSES } from '@/data/upcomingCourses';
import { CourseCatalogGrid } from '@/components/courses/CourseCatalogGrid';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

export const metadata: Metadata = {
  title: 'All 30 Career Tracks — Mastering Field Service Training Portal',
  description:
    'Browse all 30 field service career tracks — UPS, HVAC, Solar, Data Center, Elevator, Marine, BAS, PLC, Biomedical, and more. No college required. Start free.',
  openGraph: {
    title: 'All 30 Career Tracks — Mastering Field Service Training Portal',
    description: 'Browse all 30 field service career tracks. No college required. Start free.',
    images: [{ url: `${SITE_URL}/api/og`, width: 1200, height: 630, alt: 'Mastering Field Service — 30 Career Tracks' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All 30 Career Tracks — Mastering Field Service Training Portal',
    description: 'Browse all 30 field service career tracks. No college required. Start free.',
    images: [`${SITE_URL}/api/og`],
  },
};

export default function CourseCatalogPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mastering Field Service — 30 Career Tracks',
    description: 'Professional field service training courses across 30 career tracks',
    numberOfItems: COURSES.length,
    itemListElement: COURSES.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: c.title,
        description: c.tagline,
        url: `${SITE_URL}/training/${c.id}`,
        provider: { '@type': 'Organization', name: 'Mastering Field Service', url: SITE_URL },
      },
    })),
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <section className="border-b border-gray-800 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            30 career tracks
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            One portal. Every field service trade.
          </h1>
          <p className="text-gray-400 text-base max-w-2xl leading-relaxed mb-6">
            Each track shares the same 10-module electrical and safety foundation, then branches into
            the trade-specific curriculum. Complete modules once and they count toward every certificate
            that requires them.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
            >
              Start Free →
            </Link>
            <Link
              href="/employers"
              className="px-5 py-2.5 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold text-sm transition-colors"
            >
              Employer plans
            </Link>
          </div>
          <Link
            href="/course-finder"
            className="inline-flex items-center gap-2 mt-6 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            Not sure which track fits? Take the 5-question course finder →
          </Link>
        </div>
      </section>

      {/* Categories (client-side search/filter) */}
      <CourseCatalogGrid courses={COURSES} upcoming={UPCOMING_COURSES} />

      {/* CTA */}
      <section className="border-t border-gray-800 py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-3">Ready to start?</h2>
          <p className="text-gray-400 text-sm mb-6">
            Create a free account and access the first 3 modules of every course at no cost.
            Purchase when you&apos;re ready to unlock the full program and earn your credential.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
          >
            Create Free Account →
          </Link>
        </div>
      </section>
    </div>
  );
}
