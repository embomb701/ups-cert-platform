'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { TrainingCourse } from '@/data/courses';

const TEXT: Record<string, string> = {
  blue: 'text-blue-400', orange: 'text-orange-400', teal: 'text-teal-400',
  amber: 'text-amber-400', violet: 'text-violet-400', yellow: 'text-yellow-400',
  green: 'text-green-400', sky: 'text-sky-400', rose: 'text-rose-400',
  cyan: 'text-cyan-400', emerald: 'text-emerald-400',
};
const BORDER: Record<string, string> = {
  blue: 'border-blue-800/50', orange: 'border-orange-800/50', teal: 'border-teal-800/50',
  amber: 'border-amber-800/50', violet: 'border-violet-800/50', yellow: 'border-yellow-800/50',
  green: 'border-green-800/50', sky: 'border-sky-800/50', rose: 'border-rose-800/50',
  cyan: 'border-cyan-800/50', emerald: 'border-emerald-800/50',
};

const CATEGORIES: { label: string; ids: string[] }[] = [
  {
    label: 'Critical Power & Data Center',
    ids: ['ups', 'datacenter', 'dcengineer', 'dc-ops', 'dcplants', 'battery', 'switchgear-tech'],
  },
  {
    label: 'Generation & Renewables',
    ids: ['generator', 'solar', 'solar-inst', 'evcharging', 'wind-tech'],
  },
  {
    label: 'HVAC & Mechanical',
    ids: ['hvac', 'hvac-tech', 'ref-tech', 'industrial-ref', 'pool', 'pump-tech'],
  },
  {
    label: 'Building & Facilities',
    ids: ['building-cx', 'bas-tech', 'fire-alarm-tech', 'elevator-tech'],
  },
  {
    label: 'Kitchen & Specialty',
    ids: ['kitchen', 'marine'],
  },
  {
    label: 'Controls, IT & Safety',
    ids: ['plc-tech', 'security-tech', 'bmet-tech', 'telecom'],
  },
  {
    label: 'Management',
    ids: ['field-pm'],
  },
  {
    label: 'Free Courses',
    ids: ['critical-environment'],
  },
];

const HUB_ROUTES: Record<string, string> = {
  ups: '/training/ups', kitchen: '/training/kitchen', hvac: '/training/hvac',
  generator: '/training/generator', solar: '/training/solar', battery: '/training/battery',
  datacenter: '/training/datacenter', 'dc-ops': '/training/dc-ops', dcplants: '/training/dcplants',
  evcharging: '/training/evcharging', 'industrial-ref': '/training/industrial-ref',
  'building-cx': '/training/building-cx', telecom: '/training/telecom',
  'critical-environment': '/training/critical-environment',
  dcengineer: '/training/dcengineer', marine: '/training/marine', pool: '/training/pool',
  'hvac-tech': '/training/hvac-tech', 'solar-inst': '/training/solar-inst',
  'wind-tech': '/training/wind-tech', 'elevator-tech': '/training/elevator-tech',
  'fire-alarm-tech': '/training/fire-alarm-tech', 'bmet-tech': '/training/bmet-tech',
  'bas-tech': '/training/bas-tech', 'ref-tech': '/training/ref-tech',
  'plc-tech': '/training/plc-tech', 'security-tech': '/training/security-tech',
  'field-pm': '/training/field-pm', 'pump-tech': '/training/pump-tech',
  'switchgear-tech': '/training/switchgear-tech',
};

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

export function CourseCatalogGrid({ courses }: { courses: TrainingCourse[] }) {
  const [query, setQuery] = useState('');
  const courseMap = useMemo(() => Object.fromEntries(courses.map((c) => [c.id, c])), [courses]);

  const normalizedQuery = query.trim().toLowerCase();
  const matchesQuery = (c: TrainingCourse) =>
    normalizedQuery === '' ||
    c.title.toLowerCase().includes(normalizedQuery) ||
    c.shortTitle.toLowerCase().includes(normalizedQuery) ||
    c.tagline.toLowerCase().includes(normalizedQuery);

  const visibleCategories = CATEGORIES.map(({ label, ids }) => ({
    label,
    courses: ids.map((id) => courseMap[id]).filter((c): c is TrainingCourse => !!c && matchesQuery(c)),
  })).filter((cat) => cat.courses.length > 0);

  const totalVisible = visibleCategories.reduce((sum, cat) => sum + cat.courses.length, 0);

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
          placeholder="Search 29 career tracks…"
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
    </div>
  );
}
