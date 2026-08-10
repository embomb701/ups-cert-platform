import type { Metadata } from 'next';
import { COURSES } from '@/data/courses';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masteringfse.com';

export function generateCourseMetadata(courseId: string): Metadata {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return {};

  const ogImageUrl = `${SITE_URL}/api/og?course=${courseId}`;

  const fullTitle = `${course.title} — Mastering Field Service`;

  return {
    title: fullTitle,
    description: course.tagline,
    openGraph: {
      title: fullTitle,
      description: course.tagline,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: course.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: course.tagline,
      images: [ogImageUrl],
    },
  };
}
