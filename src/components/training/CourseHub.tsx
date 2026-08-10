import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { COURSE_SEQUENCES } from '@/data/index';
import { COURSES } from '@/data/courses';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';
import type { ProductId } from '@/types';

type Color = 'blue' | 'orange' | 'teal' | 'amber' | 'violet' | 'yellow' | 'green' | 'sky' | 'rose' | 'cyan' | 'emerald';

const COLOR: Record<Color, {
  crumb: string; accent: string; bar: string; badge: string;
  border: string; ring: string; btn: string;
}> = {
  blue:    { crumb: 'text-blue-400',    accent: 'text-blue-400',    bar: 'bg-blue-500',    badge: 'bg-blue-900/30 border-blue-700/60 text-blue-300',    border: 'border-blue-800/40',    ring: 'ring-blue-700/40',    btn: 'bg-blue-600 hover:bg-blue-500' },
  orange:  { crumb: 'text-orange-400',  accent: 'text-orange-400',  bar: 'bg-orange-500',  badge: 'bg-orange-900/30 border-orange-700/60 text-orange-300',  border: 'border-orange-800/40',  ring: 'ring-orange-700/40',  btn: 'bg-orange-600 hover:bg-orange-500' },
  teal:    { crumb: 'text-teal-400',    accent: 'text-teal-400',    bar: 'bg-teal-500',    badge: 'bg-teal-900/30 border-teal-700/60 text-teal-300',    border: 'border-teal-800/40',    ring: 'ring-teal-700/40',    btn: 'bg-teal-600 hover:bg-teal-500' },
  amber:   { crumb: 'text-amber-400',   accent: 'text-amber-400',   bar: 'bg-amber-500',   badge: 'bg-amber-900/30 border-amber-700/60 text-amber-300',   border: 'border-amber-800/40',   ring: 'ring-amber-700/40',   btn: 'bg-amber-600 hover:bg-amber-500' },
  violet:  { crumb: 'text-violet-400',  accent: 'text-violet-400',  bar: 'bg-violet-500',  badge: 'bg-violet-900/30 border-violet-700/60 text-violet-300',  border: 'border-violet-800/40',  ring: 'ring-violet-700/40',  btn: 'bg-violet-600 hover:bg-violet-500' },
  yellow:  { crumb: 'text-yellow-400',  accent: 'text-yellow-400',  bar: 'bg-yellow-500',  badge: 'bg-yellow-900/30 border-yellow-700/60 text-yellow-300',  border: 'border-yellow-800/40',  ring: 'ring-yellow-700/40',  btn: 'bg-yellow-600 hover:bg-yellow-500' },
  green:   { crumb: 'text-green-400',   accent: 'text-green-400',   bar: 'bg-green-500',   badge: 'bg-green-900/30 border-green-700/60 text-green-300',   border: 'border-green-800/40',   ring: 'ring-green-700/40',   btn: 'bg-green-600 hover:bg-green-500' },
  sky:     { crumb: 'text-sky-400',     accent: 'text-sky-400',     bar: 'bg-sky-500',     badge: 'bg-sky-900/30 border-sky-700/60 text-sky-300',     border: 'border-sky-800/40',     ring: 'ring-sky-700/40',     btn: 'bg-sky-600 hover:bg-sky-500' },
  rose:    { crumb: 'text-rose-400',    accent: 'text-rose-400',    bar: 'bg-rose-500',    badge: 'bg-rose-900/30 border-rose-700/60 text-rose-300',    border: 'border-rose-800/40',    ring: 'ring-rose-700/40',    btn: 'bg-rose-600 hover:bg-rose-500' },
  cyan:    { crumb: 'text-cyan-400',    accent: 'text-cyan-400',    bar: 'bg-cyan-500',    badge: 'bg-cyan-900/30 border-cyan-700/60 text-cyan-300',    border: 'border-cyan-800/40',    ring: 'ring-cyan-700/40',    btn: 'bg-cyan-600 hover:bg-cyan-500' },
  emerald: { crumb: 'text-emerald-400', accent: 'text-emerald-400', bar: 'bg-emerald-500', badge: 'bg-emerald-900/30 border-emerald-700/60 text-emerald-300', border: 'border-emerald-800/40', ring: 'ring-emerald-700/40', btn: 'bg-emerald-600 hover:bg-emerald-500' },
};

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export async function CourseHub({ courseId }: { courseId: string }) {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) redirect('/training');

  const seq = COURSE_SEQUENCES[course.accessKey];
  if (!seq || seq.length === 0) redirect('/training');

  const c = COLOR[course.color as Color] ?? COLOR.blue;

  const cookieStore = await cookies();
  const token = cookieStore.get('firebase-token')?.value;
  if (!token) redirect('/login');

  let uid: string;
  let userEmail = '';
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
    userEmail = decoded.email?.toLowerCase() ?? '';
  } catch {
    redirect('/login');
  }

  const isAdmin = await checkIsAdmin(uid, userEmail);

  const [accessDoc, progressSnap] = await Promise.all([
    adminDb.collection('users').doc(uid).collection('examAccess').doc(course.accessKey).get(),
    adminDb.collection('users').doc(uid).collection('trainingProgress').get(),
  ]);

  const hasAccess = isAdmin || (accessDoc.exists && accessDoc.data()?.granted === true);

  const progress: Record<string, { completedSlides?: number[]; completedAt?: unknown; passed?: boolean }> = {};
  progressSnap.forEach((doc) => { progress[doc.id] = doc.data() as typeof progress[string]; });

  function getUnlockDate(completedAt: unknown): Date {
    const c = completedAt as { toDate?: () => Date } | string;
    const base = typeof c === 'string' ? new Date(c) : (c as { toDate: () => Date }).toDate();
    return new Date(base.getTime() + THREE_DAYS_MS);
  }

  const moduleStates = seq.map((mod, idx) => {
    const p = progress[mod.id] ?? {};
    const completed = !!(p.completedAt && p.passed);
    const slideProgress = mod.slides.length > 0 ? ((p.completedSlides?.length ?? 0) / mod.slides.length) : 0;

    let locked = false;
    let unlockDate: Date | null = null;

    if (!isAdmin && hasAccess && idx > 0) {
      const prev = seq[idx - 1];
      const prevP = progress[prev.id] ?? {};
      if (!prevP.completedAt || !prevP.passed) {
        locked = true;
      } else {
        const unlock = getUnlockDate(prevP.completedAt);
        if (Date.now() < unlock.getTime()) {
          locked = true;
          unlockDate = unlock;
        }
      }
    }

    const FREE_TRIAL_LIMIT = 1;
    const trialLocked = !hasAccess && idx >= FREE_TRIAL_LIMIT;

    return { mod, completed, locked, unlockDate, trialLocked, slideProgress };
  });

  const completedCount = moduleStates.filter((s) => s.completed).length;
  const totalCount = seq.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const firstIncomplete = moduleStates.find((s) => !s.completed && !s.locked && !s.trialLocked);
  const continueHref = firstIncomplete ? `/training/${firstIncomplete.mod.id}` : `/training/${seq[0].id}`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ups-cert-platform.vercel.app';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.tagline,
    url: `${siteUrl}/training/${course.id}`,
    provider: { '@type': 'Organization', name: 'Mastering Field Service', url: siteUrl },
    educationalCredentialAwarded: course.certTitle,
    numberOfCredits: course.totalModules,
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/training" className="hover:text-gray-300 transition-colors">Training</Link>
          <span>/</span>
          <span className={c.crumb}>{course.shortTitle}</span>
        </div>

        {/* Header */}
        <div>
          <p className={`text-xs font-bold uppercase tracking-widest font-mono mb-1 ${c.accent}`}>{course.shortTitle}</p>
          <h1 className="text-2xl font-bold text-white">{course.title}</h1>
          <p className="text-gray-400 mt-1 text-sm leading-relaxed max-w-xl">{course.tagline}</p>
        </div>

        {/* Progress bar */}
        {hasAccess && (
          <div className="rounded-xl border border-gray-800 bg-gray-800/30 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium text-sm">{completedCount} / {totalCount} modules complete</span>
              <span className="text-gray-400 text-sm font-semibold">{pct}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${c.bar}`} style={{ width: `${pct}%` }} />
            </div>
            {completedCount < totalCount && (
              <div className="mt-4">
                <Link
                  href={continueHref}
                  className={`inline-block px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-colors ${c.btn}`}
                >
                  {completedCount === 0 ? 'Start Course →' : 'Continue →'}
                </Link>
              </div>
            )}
            {completedCount === totalCount && (
              <p className="text-emerald-400 font-semibold text-sm mt-3">Course complete — check your Dashboard for your certificate.</p>
            )}
          </div>
        )}

        {/* Purchase CTA */}
        {!hasAccess && !course.free && course.stripeProductId && (
          <div className={`rounded-xl border p-5 ${c.border} bg-gray-800/20`}>
            <p className="text-white font-semibold mb-1">Unlock Full Access</p>
            <p className="text-gray-400 text-sm mb-4">
              The first module is free. Purchase to unlock all {totalCount} modules and earn your {course.certTitle}.
            </p>
            <PurchaseButton
              productId={course.stripeProductId as ProductId}
              label={`Enroll in ${course.shortTitle}`}
              className={`px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-colors ${c.btn}`}
            />
          </div>
        )}

        {/* Module list */}
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Course Modules — {totalCount} total
          </h2>
          <div className="space-y-2">
            {moduleStates.map(({ mod, completed, locked, unlockDate, trialLocked, slideProgress }, idx) => {
              const href = `/training/${mod.id}`;
              const isAccessible = !locked && !trialLocked;

              return (
                <div
                  key={mod.id}
                  className={`rounded-xl border bg-gray-900/30 p-4 flex items-center gap-4 ${
                    completed
                      ? 'border-emerald-800/40 bg-emerald-950/10'
                      : locked || trialLocked
                      ? 'border-gray-800/50 opacity-60'
                      : `border-gray-800 hover:bg-gray-800/30 transition-colors`
                  }`}
                >
                  {/* Module number / status */}
                  <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                    completed
                      ? 'bg-emerald-900/50 text-emerald-400'
                      : locked || trialLocked
                      ? 'bg-gray-800 text-gray-600'
                      : `bg-gray-800 ${c.accent}`
                  }`}>
                    {completed ? '✓' : idx + 1}
                  </div>

                  {/* Module info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-medium ${completed ? 'text-gray-400' : trialLocked || locked ? 'text-gray-600' : 'text-gray-200'}`}>
                        {mod.title}
                      </span>
                      {completed && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-900/40 border border-emerald-800/60 text-emerald-400">Done</span>
                      )}
                      {!completed && slideProgress > 0 && !locked && !trialLocked && (
                        <span className={`text-xs px-1.5 py-0.5 rounded border ${c.badge}`}>In Progress</span>
                      )}
                      {trialLocked && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-gray-800 border border-gray-700 text-gray-500">Purchase to unlock</span>
                      )}
                      {locked && unlockDate && (
                        <span className="text-xs text-gray-600">
                          Unlocks {unlockDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                      {locked && !unlockDate && (
                        <span className="text-xs text-gray-600">Complete previous module first</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{mod.desc}</p>
                    {/* Slide progress bar */}
                    {!completed && slideProgress > 0 && !locked && !trialLocked && mod.slides.length > 0 && (
                      <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden w-32">
                        <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${slideProgress * 100}%` }} />
                      </div>
                    )}
                  </div>

                  {/* Action */}
                  {isAccessible && (
                    <Link
                      href={href}
                      className={`flex-shrink-0 text-xs font-semibold transition-colors ${
                        completed ? 'text-gray-500 hover:text-gray-300' : `${c.crumb} hover:text-white`
                      }`}
                    >
                      {completed ? 'Review' : slideProgress > 0 ? 'Continue' : 'Start'} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center pt-2">
          <Link href="/training" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">← Back to Training Hub</Link>
        </div>

      </div>
    </div>
  );
}
