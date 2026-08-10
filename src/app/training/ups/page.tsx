import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { ALL_MODULES } from '@/data/index';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';
import { generateCourseMetadata } from '@/lib/utils/courseMetadata';

export const dynamic = 'force-dynamic';

export const metadata = generateCourseMetadata('ups');

export default async function UpsPortalPage() {
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

  const accessDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('training_portal').get();
  const hasAccess = isAdmin || (accessDoc.exists && accessDoc.data()?.granted === true);

  // Fetch all progress
  const progressSnap = await adminDb.collection('users').doc(uid).collection('trainingProgress').get();
  const progress: Record<string, {
    completedSlides?: number[];
    completedAt?: { toDate?: () => Date } | string;
    passed?: boolean;
  }> = {};
  progressSnap.forEach((doc) => { progress[doc.id] = doc.data() as typeof progress[string]; });

  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;

  function getUnlockDate(prevCompletedAt: { toDate?: () => Date } | string): Date {
    if (typeof prevCompletedAt === 'string') return new Date(new Date(prevCompletedAt).getTime() + threeDaysMs);
    return new Date(((prevCompletedAt as { toDate: () => Date }).toDate()).getTime() + threeDaysMs);
  }

  // Build module display states
  const moduleStates = ALL_MODULES.map((mod, idx) => {
    const p = progress[mod.id] ?? {};
    const completed = !!(p.completedAt && p.passed);

    let locked = false;
    let unlockDate: Date | null = null;

    if (!isAdmin && hasAccess && idx > 0) {
      const prevMod = ALL_MODULES[idx - 1];
      const prevP = progress[prevMod.id] ?? {};
      if (!prevP.completedAt || !prevP.passed) {
        locked = true;
      } else {
        const unlock = getUnlockDate(prevP.completedAt as { toDate?: () => Date } | string);
        if (Date.now() < unlock.getTime()) {
          locked = true;
          unlockDate = unlock;
        }
      }
    }

    const isFreeTrialSlide = mod.num <= 3;
    const trialOnly = !hasAccess && isFreeTrialSlide;
    const trialLocked = !hasAccess && !isFreeTrialSlide;

    const completedSlides = p.completedSlides ?? [];
    const slideProgress = mod.slides.length > 0 ? (completedSlides.length / mod.slides.length) : 0;

    return { mod, completed, locked, unlockDate, trialOnly, trialLocked, slideProgress, completedSlides };
  });

  const completedCount = moduleStates.filter((s) => s.completed).length;
  const totalModules = ALL_MODULES.length;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ups-cert-platform.vercel.app';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'UPS Field Service Engineering',
    description: '28-module professional training program covering UPS systems fundamentals, installation, maintenance, and troubleshooting. Prepares candidates for the Jr. UPS Field Service Engineer certification.',
    url: `${siteUrl}/training/ups`,
    provider: { '@type': 'Organization', name: 'Mastering Field Service', url: siteUrl },
    educationalCredentialAwarded: 'Jr. UPS Field Service Engineer',
    numberOfCredits: 28,
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/training" className="hover:text-gray-300 transition-colors">Training</Link>
          <span>/</span>
          <span className="text-blue-400">UPS FSE</span>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">UPS Field Service Engineering</h1>
          <p className="text-gray-400 mt-1 text-sm">
            28 modules · 3–6 months · Jr. UPS FSE certification included
          </p>
        </div>

        {/* Purchase CTA — shown when no access */}
        {!hasAccess && (
          <div className="rounded-xl border-2 border-blue-700 bg-blue-950/20 p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="text-white font-semibold mb-1">Free trial active — Modules 1–3, Lesson 1</p>
                <p className="text-gray-400 text-sm">
                  Enroll to unlock all 28 modules, section quizzes, module tests, and the Jr. FSE certification exam.
                </p>
              </div>
              <div className="flex-shrink-0">
                <PurchaseButton
                  productId="training_course"
                  label="Enroll — $1,499"
                  className="block w-full py-2.5 px-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg text-sm text-center transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* Progress bar — paying users only */}
        {hasAccess && (
          <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium text-sm">{completedCount} of {totalModules} modules complete</span>
              <span className="text-gray-400 text-sm">{Math.round((completedCount / totalModules) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${(completedCount / totalModules) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Module list */}
        <div className="space-y-2">
          {moduleStates.map(({ mod, completed, locked, unlockDate, trialOnly, trialLocked, slideProgress, completedSlides }, idx) => {
            const isAccessible = hasAccess ? !locked : trialOnly;
            const showUpgradeNudge = !hasAccess && trialLocked && idx === 3;

            return (
              <>
                {showUpgradeNudge && (
                  <div key="nudge" className="rounded-lg border border-blue-800/50 bg-blue-950/20 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-blue-300">25 modules locked</p>
                      <p className="text-xs text-gray-400 mt-0.5">Enroll to unlock all 25 remaining modules, section quizzes, and the Jr. FSE certification exam.</p>
                    </div>
                    <PurchaseButton
                      productId="training_course"
                      label="Enroll — $1,499"
                      className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg text-sm text-center transition-colors"
                    />
                  </div>
                )}
                <div
                  key={mod.id}
                  className={`rounded-lg border p-4 transition-colors ${
                    completed
                      ? 'border-green-800/60 bg-green-950/10'
                      : trialLocked
                      ? 'border-gray-800/60 bg-gray-900/30'
                      : locked
                      ? 'border-gray-700 bg-gray-800/30'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                <div className="flex items-center gap-4">
                  {/* Status icon */}
                  <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                    completed ? 'bg-green-700 text-white' :
                    trialLocked ? 'bg-gray-800 border border-gray-700 text-gray-600' :
                    locked ? 'bg-gray-700 text-gray-500' :
                    'bg-blue-900/60 border border-blue-700/60 text-blue-300'
                  }`}>
                    {completed ? '✓' : trialLocked ? (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    ) : locked ? '⏳' : mod.num}
                  </div>

                  {/* Module info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-medium text-sm ${trialLocked ? 'text-gray-400' : 'text-white'}`}>{mod.title}</span>
                      {trialOnly && (
                        <span className="px-1.5 py-0.5 bg-blue-700/30 border border-blue-600/50 text-blue-300 text-xs rounded">FREE TRIAL</span>
                      )}
                    </div>

                    {/* Slide progress mini bar — only if in progress */}
                    {hasAccess && !completed && slideProgress > 0 && (
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500/60 rounded-full" style={{ width: `${slideProgress * 100}%` }} />
                        </div>
                        <span className="text-gray-500 text-xs flex-shrink-0">{completedSlides.length}/{mod.slides.length} slides</span>
                      </div>
                    )}

                    {locked && unlockDate && (
                      <p className="text-xs text-yellow-600 mt-1">
                        Unlocks {unlockDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — 3-day wait after previous module
                      </p>
                    )}
                    {locked && !unlockDate && (
                      <p className="text-xs text-gray-500 mt-1">Complete the previous module first</p>
                    )}
                  </div>

                  {/* Action */}
                  <div className="flex-shrink-0">
                    {isAccessible ? (
                      <Link
                        href={`/training/${mod.id}`}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded transition-colors"
                      >
                        {completed ? 'Review' : slideProgress > 0 ? 'Continue' : 'Start'}
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
              </>
            );
          })}
        </div>

        {/* Practice exam note */}
        {hasAccess && (
          <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-4 text-center">
            <p className="text-gray-400 text-sm">
              {completedCount === totalModules
                ? 'All modules complete — '
                : `Complete all ${totalModules} modules to unlock the `}
              <Link href="/exam/rules/practice_jr_fse" className="text-blue-400 hover:text-blue-300 underline">
                practice exam
              </Link>
              {completedCount < totalModules && ' (free)'}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
