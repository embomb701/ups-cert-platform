import type { Metadata } from 'next';
import { COURSES } from '@/data/courses';
import { CourseFinderQuiz } from '@/components/courses/CourseFinderQuiz';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

export const metadata: Metadata = {
  title: 'Course Finder — Which Field Service Track Fits You?',
  description:
    'A 5-question quiz that narrows all 30 field service career tracks down to the ones worth a closer look, based on your interests, environment, and travel appetite.',
  openGraph: {
    title: 'Course Finder — Which Field Service Track Fits You?',
    description: 'A 5-question quiz that points you toward the right field service career track.',
    images: [{ url: `${SITE_URL}/api/og`, width: 1200, height: 630, alt: 'Course Finder' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${SITE_URL}/api/og`],
  },
};

export default function CourseFinderPage() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <section className="border-b border-gray-800 py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            Course Finder
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Which track fits you?
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Five quick questions about how you like to work — not a certified aptitude test,
            just a fast way to cut 30 career tracks down to a few worth a closer look.
          </p>
        </div>
      </section>

      <CourseFinderQuiz courses={COURSES} />
    </div>
  );
}
