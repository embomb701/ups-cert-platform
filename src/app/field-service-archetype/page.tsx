import type { Metadata } from 'next';
import { ArchetypeQuiz } from '@/components/archetype/ArchetypeQuiz';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

export const metadata: Metadata = {
  title: 'Field Service Archetype Quiz — Mastering Field Service',
  description:
    'A fun, 10-question personality quiz that matches your work style to a mythological archetype — Zeus, Odin, Athena, Loki, and more.',
  openGraph: {
    title: 'Field Service Archetype Quiz',
    description: 'Which god matches your work style? A 10-question personality quiz for field service techs.',
    images: [{ url: `${SITE_URL}/api/og`, width: 1200, height: 630, alt: 'Field Service Archetype Quiz' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${SITE_URL}/api/og`],
  },
};

export default function FieldServiceArchetypePage() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <section className="border-b border-gray-800 py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">
            For Fun
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            What&apos;s your field service archetype?
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Ten quick questions about how you work, not a certified personality test — just a fun way
            to see which legend your instincts match. Zeus, Odin, Athena, Loki, and eight more are on
            the table.
          </p>
        </div>
      </section>

      <ArchetypeQuiz />
    </div>
  );
}
