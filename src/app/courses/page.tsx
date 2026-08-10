import type { Metadata } from 'next';
import Link from 'next/link';
import { COURSES } from '@/data/courses';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ups-cert-platform.vercel.app';

export const metadata: Metadata = {
  title: 'All 28 Career Tracks — Mastering Field Service Training Portal',
  description:
    'Browse all 28 field service career tracks — UPS, HVAC, Solar, Data Center, Elevator, Marine, BAS, PLC, Biomedical, and more. No college required. Start free.',
  openGraph: {
    title: 'All 28 Career Tracks — Mastering Field Service Training Portal',
    description: 'Browse all 28 field service career tracks. No college required. Start free.',
    images: [{ url: `${SITE_URL}/api/og`, width: 1200, height: 630, alt: 'Mastering Field Service — 28 Career Tracks' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All 28 Career Tracks — Mastering Field Service Training Portal',
    description: 'Browse all 28 field service career tracks. No college required. Start free.',
    images: [`${SITE_URL}/api/og`],
  },
};

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
    ids: ['ups', 'datacenter', 'dcengineer', 'dc-ops', 'dcplants', 'battery'],
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
};

export default function CourseCatalogPage() {
  const courseMap = Object.fromEntries(COURSES.map((c) => [c.id, c]));

  return (
    <div className="bg-gray-900 min-h-screen text-white">

      {/* Header */}
      <section className="border-b border-gray-800 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            28 career tracks
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
        </div>
      </section>

      {/* Categories */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {CATEGORIES.map(({ label, ids }) => {
          const courses = ids.map((id) => courseMap[id]).filter(Boolean);
          if (courses.length === 0) return null;
          return (
            <div key={label}>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                {label}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => {
                  const text = TEXT[course.color] ?? 'text-gray-400';
                  const border = BORDER[course.color] ?? 'border-gray-800';
                  const href = HUB_ROUTES[course.id] ?? '/training';
                  return (
                    <div
                      key={course.id}
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
                        <Link
                          href={href}
                          className="text-xs text-gray-400 hover:text-white transition-colors"
                        >
                          Preview →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <section className="border-t border-gray-800 py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-3">Ready to start?</h2>
          <p className="text-gray-400 text-sm mb-6">
            Create a free account and access the first module of every course at no cost.
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
