import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { COURSES } from '@/data/courses';
import { COURSE_SEQUENCES } from '@/data';
import { getCourseStats } from '@/lib/utils/courseStats';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';
import { ExternalLinkWarning } from '@/components/ExternalLinkWarning';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

export const metadata: Metadata = {
  title: 'Training Hub — 28 Career Tracks in Field Service',
  description: 'Browse all 28 field service training tracks. Start with UPS, HVAC, solar, data center, elevators, and more. Enroll and begin at your own pace.',
  openGraph: {
    title: 'Training Hub — 28 Field Service Career Tracks',
    description: 'Access your enrolled training courses across 28 field service career paths.',
    images: [{ url: `${SITE_URL}/api/og`, width: 1200, height: 630, alt: 'Training Hub' }],
  },
  twitter: { card: 'summary_large_image', images: [`${SITE_URL}/api/og`] },
};

const ENROLL_PRICE_LABELS: Record<string, string> = {
  training_building_cx: 'Enroll — $1,299',
  training_telecom: 'Enroll — $1,299',
  training_dcengineer: 'Enroll — $1,999',
};

// Courses that have a dedicated hub page at /training/[slug]
const HUB_ROUTES = new Set([
  'ups', 'kitchen', 'hvac', 'generator', 'solar', 'battery',
  'datacenter', 'dc-ops', 'dcplants', 'evcharging', 'industrial-ref',
  'building-cx', 'telecom', 'critical-environment',
  'dcengineer', 'marine', 'pool', 'hvac-tech', 'solar-inst',
  'wind-tech', 'elevator-tech', 'fire-alarm-tech', 'bmet-tech',
  'bas-tech', 'ref-tech', 'plc-tech', 'security-tech', 'field-pm', 'pump-tech',
]);

function courseHref(courseId: string, accessKey: string, hasAccess: boolean): string {
  if (HUB_ROUTES.has(courseId)) return `/training/${courseId}`;
  // Fall back to first module in the sequence
  const firstModule = COURSE_SEQUENCES[accessKey]?.[0];
  return firstModule ? `/training/${firstModule.id}` : '/training';
}

// Static border accent classes per color (must be complete strings for Tailwind JIT)
const BORDER_CLASSES: Record<string, string> = {
  blue: 'border-blue-700/70',
  orange: 'border-orange-700/70',
  teal: 'border-teal-700/70',
  amber: 'border-amber-700/70',
  violet: 'border-violet-700/70',
  yellow: 'border-yellow-700/70',
  green: 'border-green-700/70',
  sky: 'border-sky-700/70',
  rose: 'border-rose-700/70',
  cyan: 'border-cyan-700/70',
  emerald: 'border-emerald-700/70',
};

const TEXT_CLASSES: Record<string, string> = {
  blue: 'text-blue-400',
  orange: 'text-orange-400',
  teal: 'text-teal-400',
  amber: 'text-amber-400',
  violet: 'text-violet-400',
  yellow: 'text-yellow-400',
  green: 'text-green-400',
  sky: 'text-sky-400',
  rose: 'text-rose-400',
  cyan: 'text-cyan-400',
  emerald: 'text-emerald-400',
};

const BAR_CLASSES: Record<string, string> = {
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  teal: 'bg-teal-500',
  amber: 'bg-amber-500',
  violet: 'bg-violet-500',
  yellow: 'bg-yellow-500',
  green: 'bg-green-500',
  sky: 'bg-sky-500',
  rose: 'bg-rose-500',
  cyan: 'bg-cyan-500',
  emerald: 'bg-emerald-500',
};

export default async function TrainingPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('firebase-token')?.value;

  let uid: string | null = null;
  let userEmail = '';
  let isAdmin = false;
  if (token) {
    try {
      const decoded = await adminAuth.verifyIdToken(token);
      uid = decoded.uid;
      userEmail = decoded.email?.toLowerCase() ?? '';
      isAdmin = await checkIsAdmin(uid, userEmail);
    } catch {
      // invalid token — treat as guest
    }
  }
  const isGuest = !uid;

  // Fetch access for all courses in one batch (skip for guests)
  const courseAccess: Record<string, boolean> = {};
  if (uid) {
    const accessDocs = await Promise.all(
      COURSES.map((course) =>
        adminDb.collection('users').doc(uid!).collection('examAccess').doc(course.accessKey).get()
      )
    );
    COURSES.forEach((course, i) => {
      courseAccess[course.id] = isAdmin || !!course.free || (accessDocs[i].exists && accessDocs[i].data()?.granted === true);
    });
  } else {
    COURSES.forEach((course) => { courseAccess[course.id] = !!course.free; });
  }

  // Fetch all module progress (skip for guests)
  const completedIds = new Set<string>();
  if (uid) {
    const progressSnap = await adminDb
      .collection('users').doc(uid)
      .collection('trainingProgress').get();
    progressSnap.forEach((doc) => {
      if (doc.data().passed) completedIds.add(doc.id);
    });
  }

  // Compute per-course progress
  const courseProgress = Object.fromEntries(
    COURSES.map((course) => {
      const modules = COURSE_SEQUENCES[course.accessKey] ?? [];
      const done = modules.filter((m) => completedIds.has(m.id)).length;
      return [course.id, { done, total: modules.length }];
    })
  );

  const enrolledCourses = COURSES.filter((c) => !c.free && courseAccess[c.id]);
  const availableCourses = COURSES.filter((c) => !c.free && !courseAccess[c.id]);
  const freeCourses = COURSES.filter((c) => c.free);

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-10">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Mastering Field Service <span className="text-gradient">Training Portal</span>
          </h1>
          <p className="text-gray-400 mt-1">
            {isGuest
              ? '28 career tracks — enroll to start'
              : enrolledCourses.length > 0
              ? `${enrolledCourses.length} course${enrolledCourses.length !== 1 ? 's' : ''} enrolled`
              : 'Choose your training program'}
          </p>
        </div>

        {isGuest && (
          <div className="rounded-xl border border-indigo-700/50 bg-indigo-950/20 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Sign in to access your training</p>
              <p className="text-gray-400 text-xs mt-0.5">Create a free account to save progress and earn certificates. Browse all 28 tracks below.</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link href="/login?signup=1" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors">Create account →</Link>
              <Link href="/login" className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-semibold transition-colors">Sign in</Link>
            </div>
          </div>
        )}

        {/* Enrolled courses */}
        {enrolledCourses.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">My Courses</h2>
            <div className="space-y-3">
              {enrolledCourses.map((course) => {
                const { done, total } = courseProgress[course.id];
                const pct = total === 0 ? 0 : Math.round((done / total) * 100);
                const href = courseHref(course.id, course.accessKey, true);
                const border = BORDER_CLASSES[course.color] ?? 'border-gray-700';
                const text = TEXT_CLASSES[course.color] ?? 'text-gray-400';
                const bar = BAR_CLASSES[course.color] ?? 'bg-indigo-500';
                const stats = getCourseStats(course.accessKey);
                return (
                  <div
                    key={course.id}
                    className={`rounded-xl border-2 p-5 bg-gray-800/30 ${border} flex flex-col sm:flex-row sm:items-center gap-4`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-xs font-bold uppercase tracking-widest font-mono ${text}`}>
                          {course.shortTitle}
                        </span>
                        {done === total && total > 0 && (
                          <span className="text-xs px-1.5 py-0.5 rounded border border-green-700/60 bg-green-900/20 text-green-400">
                            Complete
                          </span>
                        )}
                        {stats.estimatedHours > 0 && (
                          <span className="text-xs text-gray-500">~{stats.estimatedHours} hrs</span>
                        )}
                      </div>
                      <p className="text-white font-semibold text-sm mb-2">{course.title}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${bar}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0">{done}/{total} modules</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Link
                        href={href}
                        className="block px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium transition-colors text-center min-w-[130px]"
                      >
                        {done > 0 ? 'Continue →' : 'Start →'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Free courses */}
        {freeCourses.map((course) => {
          const { done, total } = courseProgress[course.id];
          const href = courseHref(course.id, course.accessKey, true);
          const stats = getCourseStats(course.accessKey);
          return (
            <div key={course.id} className="rounded-xl border-2 border-emerald-700/60 bg-emerald-950/20 p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold uppercase tracking-widest font-mono text-emerald-400">
                      {course.shortTitle}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded border border-emerald-700/60 bg-emerald-900/30 text-emerald-300 font-semibold">
                      Free
                    </span>
                    {stats.estimatedHours > 0 && (
                      <span className="text-xs text-emerald-500/80">~{stats.estimatedHours} hrs · {stats.totalModules} modules</span>
                    )}
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{course.title}</p>
                  <p className="text-gray-400 text-xs">{course.tagline}</p>
                  {done > 0 && (
                    <p className="text-xs text-emerald-400 mt-1">{done}/{total} modules complete</p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href={href}
                    className="block px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-medium transition-colors text-center min-w-[130px]"
                  >
                    {done > 0 ? 'Continue →' : 'Start Free →'}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Available courses to purchase */}
        {availableCourses.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                {enrolledCourses.length > 0 ? 'More Courses' : 'Available Courses'}
              </h2>
              <span className="text-xs text-gray-600">{availableCourses.length} programs</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableCourses.map((course) => {
                const text = TEXT_CLASSES[course.color] ?? 'text-gray-400';
                const border = BORDER_CLASSES[course.color] ?? 'border-gray-700/40';
                const previewHref = courseHref(course.id, course.accessKey, false);
                const stats = getCourseStats(course.accessKey);
                return (
                  <div
                    key={course.id}
                    className={`rounded-xl border p-4 bg-gray-800/20 flex flex-col gap-3 ${border}`}
                  >
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-widest font-mono ${text} block mb-1`}>
                        {course.shortTitle}
                      </span>
                      <p className="text-white text-sm font-semibold leading-snug">{course.title}</p>
                      <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">{course.tagline}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span>{stats.totalModules} modules</span>
                      {stats.estimatedHours > 0 && <span>~{stats.estimatedHours} hrs</span>}
                      {course.examLevel && <span>Certificate exam</span>}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 mt-auto">
                      <span>{course.price ?? '$1,499'}</span>
                      <Link href={previewHref} className="text-gray-500 hover:text-gray-300 transition-colors">
                        Preview →
                      </Link>
                    </div>
                    {course.stripeProductId && (
                      <PurchaseButton
                        productId={course.stripeProductId as any}
                        label={ENROLL_PRICE_LABELS[course.stripeProductId] ?? 'Enroll — $1,499'}
                        className="block w-full py-2 px-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white text-xs font-medium rounded-lg text-center transition-colors"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CPR / First Aid callout */}
        <div className="rounded-xl border-2 border-red-800/60 bg-red-950/20 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold uppercase tracking-widest font-mono text-red-400">
                  Safety Requirement
                </span>
              </div>
              <p className="text-white font-semibold text-sm mb-1">CPR / First Aid / AED Certification</p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Anyone working in or around electrical equipment is required to hold a current CPR, First Aid, and AED certification.
                The American Red Cross offers in-person and blended courses accepted by most employers.
              </p>
            </div>
            <div className="flex-shrink-0">
              <ExternalLinkWarning
                href="https://www.redcross.org/take-a-class"
                className="block px-5 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-white text-sm font-medium transition-colors text-center cursor-pointer"
              >
                Get Certified ↗
              </ExternalLinkWarning>
            </div>
          </div>
        </div>

        {/* Shared foundation note */}
        <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-5">
          <p className="text-gray-300 font-medium text-sm mb-1">10 shared foundation modules</p>
          <p className="text-gray-500 text-sm leading-relaxed">
            Modules 1–10 — electrical theory, safety (NFPA 70E + LOTO), and test equipment — are identical across all programs.
            Complete them once and they count toward every certification. Programs also share specialty cores where the
            trades overlap: refrigeration, batteries, and data center systems are assembled from overlapping module sets.
          </p>
        </div>

      </div>
    </div>
  );
}
