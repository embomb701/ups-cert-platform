import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { ALL_MODULES, KITCHEN_MODULES } from '@/data/index';
import { KITCHEN_MODULE_PLACEHOLDERS } from '@/data/courses';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function KitchenPortalPage() {
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

  const accessDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('training_kitchen').get();
  const hasAccess = isAdmin || (accessDoc.exists && accessDoc.data()?.granted === true);

  // Fetch progress for shared modules
  const progressSnap = await adminDb.collection('users').doc(uid).collection('trainingProgress').get();
  const progress: Record<string, {
    completedSlides?: number[];
    completedAt?: { toDate?: () => Date } | string;
    passed?: boolean;
  }> = {};
  progressSnap.forEach((doc) => { progress[doc.id] = doc.data() as typeof progress[string]; });

  const sharedModules = ALL_MODULES.filter((m) => m.num <= 10);
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;

  function getUnlockDate(prevCompletedAt: { toDate?: () => Date } | string): Date {
    if (typeof prevCompletedAt === 'string') return new Date(new Date(prevCompletedAt).getTime() + threeDaysMs);
    return new Date(((prevCompletedAt as { toDate: () => Date }).toDate()).getTime() + threeDaysMs);
  }

  const sharedStates = sharedModules.map((mod, idx) => {
    const p = progress[mod.id] ?? {};
    const completed = !!(p.completedAt && p.passed);

    let locked = false;
    let unlockDate: Date | null = null;

    if (!isAdmin && hasAccess && idx > 0) {
      const prevMod = sharedModules[idx - 1];
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

  const sharedComplete = sharedStates.filter((s) => s.completed).length;

  // States for built kitchen-specific modules (nums 11+). Module 11 unlocks
  // after shared module 10; later kitchen modules follow the kitchen sequence.
  const kitchenSorted = [...KITCHEN_MODULES].sort((a, b) => a.num - b.num);
  const kitchenStates = new Map(kitchenSorted.map((mod) => {
    const p = progress[mod.id] ?? {};
    const completed = !!(p.completedAt && p.passed);

    let locked = false;
    let unlockDate: Date | null = null;

    if (!isAdmin && hasAccess) {
      const prevMod = mod.num === 11
        ? sharedModules.find((m) => m.num === 10)
        : kitchenSorted.find((m) => m.num === mod.num - 1);
      const prevP = prevMod ? (progress[prevMod.id] ?? {}) : {};
      if (!prevMod || !prevP.completedAt || !prevP.passed) {
        locked = true;
      } else {
        const unlock = getUnlockDate(prevP.completedAt as { toDate?: () => Date } | string);
        if (Date.now() < unlock.getTime()) {
          locked = true;
          unlockDate = unlock;
        }
      }
    }

    const completedSlides = p.completedSlides ?? [];
    const slideProgress = mod.slides.length > 0 ? (completedSlides.length / mod.slides.length) : 0;
    return [mod.id, { mod, completed, locked, unlockDate, slideProgress, completedSlides }] as const;
  }));

  const kitchenBuiltCount = KITCHEN_MODULES.length;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/training" className="hover:text-gray-300 transition-colors">Training</Link>
          <span>/</span>
          <span className="text-orange-400">Kitchen FSE</span>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Commercial Kitchen Field Service Engineering</h1>
          <p className="text-gray-400 mt-1 text-sm">
            27 modules · 10 shared foundation + 17 kitchen-specific · Jr. Kitchen FSE certification
          </p>
        </div>

        {/* Coming soon banner for unenrolled */}
        {!hasAccess && (
          <div className="rounded-xl border border-orange-800/60 bg-orange-950/10 p-5">
            <p className="text-orange-300 font-semibold mb-1">Coming Soon — Enrollment Opening Soon</p>
            <p className="text-gray-400 text-sm">
              Modules 1–3 Lesson 1 are free to preview. {kitchenBuiltCount} of 17 kitchen-specific modules are ready; the rest are in development.
              <Link href="/training" className="ml-2 text-orange-400 hover:text-orange-300 underline">← Back to Training Hub</Link>
            </p>
          </div>
        )}

        {/* Progress bar — enrolled users */}
        {hasAccess && (() => {
          const kitchenComplete = [...kitchenStates.values()].filter((s) => s.completed).length;
          const totalCourse = 10 + kitchenBuiltCount;
          const totalDone = sharedComplete + kitchenComplete;
          const courseComplete = kitchenBuiltCount === 17 && totalDone === totalCourse;
          return (
            <>
              <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium text-sm">Course progress: {totalDone}/{totalCourse} modules complete</span>
                  <span className="text-gray-400 text-sm">{Math.round((totalDone / totalCourse) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all"
                    style={{ width: `${(totalDone / totalCourse) * 100}%` }}
                  />
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  {courseComplete
                    ? 'All modules complete — your Jr. Kitchen FSE certification exam is unlocked.'
                    : `Complete all ${totalCourse} modules to unlock the Jr. Kitchen FSE certification exam.`}
                </p>
              </div>
              {courseComplete && (
                <div className="rounded-xl border-2 border-green-700 bg-green-950/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-white font-semibold">🎓 Jr. Kitchen FSE Certification Exam</p>
                    <p className="text-gray-400 text-sm mt-0.5">Training complete — you earned this attempt. AI proctored, once every 90 days.</p>
                  </div>
                  <Link
                    href="/exam/rules/jr_kitchen_fse"
                    className="flex-shrink-0 px-5 py-2.5 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-lg text-sm text-center transition-colors"
                  >
                    Start Exam →
                  </Link>
                </div>
              )}
            </>
          );
        })()}

        {/* Section A: Shared foundation modules */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Foundation — Modules 1–10</h2>
            <span className="text-xs text-gray-500">(Shared with UPS program)</span>
          </div>
          <div className="space-y-2">
            {sharedStates.map(({ mod, completed, locked, unlockDate, trialOnly, trialLocked, slideProgress, completedSlides }) => {
              const isAccessible = hasAccess ? !locked : trialOnly;

              return (
                <div
                  key={mod.id}
                  className={`rounded-lg border p-4 transition-colors ${
                    completed
                      ? 'border-green-800/60 bg-green-950/10'
                      : trialLocked
                      ? 'border-gray-800 bg-gray-900/50 opacity-60'
                      : locked
                      ? 'border-gray-700 bg-gray-800/30'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                      completed ? 'bg-green-700 text-white' :
                      locked || trialLocked ? 'bg-gray-700 text-gray-500' :
                      'bg-orange-900/60 border border-orange-700/60 text-orange-300'
                    }`}>
                      {completed ? '✓' : trialLocked ? '🔒' : locked ? '⏳' : mod.num}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-medium text-sm">{mod.title}</span>
                        {trialOnly && (
                          <span className="px-1.5 py-0.5 bg-orange-700/30 border border-orange-600/50 text-orange-300 text-xs rounded">FREE TRIAL</span>
                        )}
                      </div>

                      {hasAccess && !completed && slideProgress > 0 && (
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500/60 rounded-full" style={{ width: `${slideProgress * 100}%` }} />
                          </div>
                          <span className="text-gray-500 text-xs flex-shrink-0">{completedSlides.length}/{mod.slides.length} slides</span>
                        </div>
                      )}

                      {locked && unlockDate && (
                        <p className="text-xs text-yellow-600 mt-1">
                          Unlocks {unlockDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — 3-day wait
                        </p>
                      )}
                      {locked && !unlockDate && (
                        <p className="text-xs text-gray-500 mt-1">Complete the previous module first</p>
                      )}
                      {trialLocked && (
                        <p className="text-xs text-gray-600 mt-1">Enroll to unlock</p>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      {isAccessible ? (
                        <Link
                          href={`/training/${mod.id}`}
                          className="px-3 py-1.5 bg-orange-700 hover:bg-orange-600 text-white text-xs font-semibold rounded transition-colors"
                        >
                          {completed ? 'Review' : slideProgress > 0 ? 'Continue' : 'Start'}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section B: Kitchen-specific modules (coming soon), grouped by track */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Kitchen Equipment — Modules 11–27</h2>
            <span className="px-2 py-0.5 bg-yellow-900/40 border border-yellow-700/60 text-yellow-400 text-xs rounded">{kitchenBuiltCount} of 17 Ready</span>
          </div>
          <div className="space-y-6">
            {(['Electrical Systems', 'Refrigeration', 'Fire, Gas & Ventilation', 'Warewashing & Beverage', 'Controls & Professional Service'] as const).map((track) => (
              <div key={track}>
                <h3 className="text-xs font-semibold text-orange-400/90 uppercase tracking-widest mb-2">{track}</h3>
                <div className="space-y-2">
                  {KITCHEN_MODULE_PLACEHOLDERS.map((placeholder, idx) => {
                    if (placeholder.track !== track) return null;

                    // Built module → interactive card with lock states
                    const state = kitchenStates.get(placeholder.id);
                    if (state) {
                      const { mod, completed, locked, unlockDate, slideProgress, completedSlides } = state;
                      const accessible = hasAccess && !locked;
                      return (
                        <div
                          key={placeholder.id}
                          className={`rounded-lg border p-4 transition-colors ${
                            completed
                              ? 'border-green-800/60 bg-green-950/10'
                              : !hasAccess
                              ? 'border-gray-800 bg-gray-900/50 opacity-60'
                              : locked
                              ? 'border-gray-700 bg-gray-800/30'
                              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                              completed ? 'bg-green-700 text-white' :
                              !hasAccess ? 'bg-gray-700 text-gray-500' :
                              locked ? 'bg-gray-700 text-gray-500' :
                              'bg-orange-900/60 border border-orange-700/60 text-orange-300'
                            }`}>
                              {completed ? '✓' : !hasAccess ? '🔒' : locked ? '⏳' : mod.num}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-white font-medium text-sm">{mod.title}</span>
                              <p className="text-gray-500 text-xs mt-0.5">{mod.desc}</p>
                              {hasAccess && !completed && slideProgress > 0 && (
                                <div className="mt-1.5 flex items-center gap-2">
                                  <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500/60 rounded-full" style={{ width: `${slideProgress * 100}%` }} />
                                  </div>
                                  <span className="text-gray-500 text-xs flex-shrink-0">{completedSlides.length}/{mod.slides.length} slides</span>
                                </div>
                              )}
                              {hasAccess && locked && unlockDate && (
                                <p className="text-xs text-yellow-600 mt-1">
                                  Unlocks {unlockDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — 3-day wait
                                </p>
                              )}
                              {hasAccess && locked && !unlockDate && (
                                <p className="text-xs text-gray-500 mt-1">Complete the previous module first</p>
                              )}
                              {!hasAccess && (
                                <p className="text-xs text-gray-600 mt-1">Enroll to unlock</p>
                              )}
                            </div>
                            <div className="flex-shrink-0">
                              {accessible && (
                                <Link
                                  href={`/training/${mod.id}`}
                                  className="px-3 py-1.5 bg-orange-700 hover:bg-orange-600 text-white text-xs font-semibold rounded transition-colors"
                                >
                                  {completed ? 'Review' : slideProgress > 0 ? 'Continue' : 'Start'}
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Not yet built → outline card
                    return (
                      <details
                        key={placeholder.id}
                        className="rounded-lg border border-gray-800 bg-gray-900/30 group"
                      >
                        <summary className="flex items-center gap-4 p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                          <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold bg-gray-800 text-gray-500">
                            {idx + 11}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-gray-400 font-medium text-sm">{placeholder.title}</span>
                              <span className="px-1.5 py-0.5 bg-gray-800 text-gray-600 text-xs rounded">Coming Soon</span>
                            </div>
                            <p className="text-gray-600 text-xs mt-0.5">{placeholder.desc}</p>
                          </div>
                          <span className="flex-shrink-0 text-gray-600 text-xs group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="px-4 pb-4 pl-[68px]">
                          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Lesson outline</p>
                          <ul className="space-y-1">
                            {placeholder.chapters.map((ch, ci) => (
                              <li key={ci} className="flex gap-2 text-xs text-gray-500">
                                <span className="text-orange-500/60 flex-shrink-0">{ci + 1}.</span>{ch}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/training" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">← Back to Training Hub</Link>
        </div>

      </div>
    </div>
  );
}
