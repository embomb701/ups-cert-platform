'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { TrainingCourse } from '@/data/courses';
import type { UpcomingCourse } from '@/data/upcomingCourses';
import {
  COURSE_TEXT_COLOR as TEXT,
  COURSE_BORDER_COLOR as BORDER,
  COURSE_CATEGORIES as CATEGORIES,
  COURSE_HUB_ROUTES as HUB_ROUTES,
} from '@/data/courseDisplay';

function CourseCard({ course }: { course: TrainingCourse }) {
  const text = TEXT[course.color] ?? 'text-gray-400';
  const border = BORDER[course.color] ?? 'border-gray-800';
  const href = HUB_ROUTES[course.id] ?? '/training';
  return (
    <div
      className={`rounded-xl border bg-gray-800/20 p-5 flex flex-col gap-3 hover:bg-gray-800/40 transition-colors ${border}`}
    >
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className={`text-xs font-bold uppercase tracking-widest font-mono ${text}`}>
            {course.shortTitle}
          </span>
          {course.free && (
            <span className="text-xs px-1.5 py-0.5 rounded border border-emerald-700/60 bg-emerald-900/20 text-emerald-400">
              Free
            </span>
          )}
        </div>
        <p className="text-white font-semibold text-sm leading-snug">{course.title}</p>
        <p className="text-gray-500 text-xs mt-1.5 leading-relaxed line-clamp-3">
          {course.tagline}
        </p>
      </div>
      <div className="flex items-center justify-between mt-auto pt-1 border-t border-gray-800">
        <span className="text-xs text-gray-600">{course.totalModules} modules</span>
        <Link href={href} className="text-xs text-gray-400 hover:text-white transition-colors">
          Preview →
        </Link>
      </div>
    </div>
  );
}

function UpcomingCourseCard({ course }: { course: UpcomingCourse }) {
  const text = TEXT[course.color] ?? 'text-gray-400';
  return (
    <div className="rounded-xl border border-dashed border-gray-700 bg-gray-800/10 p-5 flex flex-col gap-3">
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className={`text-xs font-bold uppercase tracking-widest font-mono ${text}`}>
            Coming Soon
          </span>
        </div>
        <p className="text-gray-300 font-semibold text-sm leading-snug">{course.title}</p>
        <p className="text-gray-600 text-xs mt-1.5 leading-relaxed line-clamp-3">
          {course.tagline}
        </p>
      </div>
      <div className="flex items-center justify-between mt-auto pt-1 border-t border-gray-800">
        <span className="text-xs text-gray-600">In development</span>
      </div>
    </div>
  );
}

export function CourseCatalogGrid({
  courses,
  upcoming = [],
}: {
  courses: TrainingCourse[];
  upcoming?: UpcomingCourse[];
}) {
  const [query, setQuery] = useState('');
  const courseMap = useMemo(() => Object.fromEntries(courses.map((c) => [c.id, c])), [courses]);

  const normalizedQuery = query.trim().toLowerCase();
  const matchesQuery = (c: { title: string; tagline: string; shortTitle?: string }) =>
    normalizedQuery === '' ||
    c.title.toLowerCase().includes(normalizedQuery) ||
    c.shortTitle?.toLowerCase().includes(normalizedQuery) ||
    c.tagline.toLowerCase().includes(normalizedQuery);

  const visibleCategories = CATEGORIES.map(({ label, ids }) => ({
    label,
    courses: ids.map((id) => courseMap[id]).filter((c): c is TrainingCourse => !!c && matchesQuery(c)),
  })).filter((cat) => cat.courses.length > 0);

  const visibleUpcoming = upcoming.filter(matchesQuery);

  const totalVisible = visibleCategories.reduce((sum, cat) => sum + cat.courses.length, 0) + visibleUpcoming.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      {/* Search */}
      <div className="relative max-w-sm">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 30 career tracks…"
          className="w-full pl-10 pr-9 py-2.5 rounded-lg bg-gray-800/60 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {query && (
        <p className="text-xs text-gray-500 -mt-8">
          {totalVisible === 0
            ? `No tracks match "${query}".`
            : `${totalVisible} track${totalVisible === 1 ? '' : 's'} match "${query}".`}
        </p>
      )}

      {/* Categories */}
      {visibleCategories.map(({ label, courses: catCourses }) => (
        <div key={label}>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
            {label}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {catCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      ))}

      {/* Upcoming tracks */}
      {visibleUpcoming.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
            Coming Soon
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleUpcoming.map((course) => (
              <UpcomingCourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
