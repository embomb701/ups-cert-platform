import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { ALL_MODULES } from '@/data/index';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';

export const dynamic = 'force-dynamic';

export default async function TrainingPage() {
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

  const accessDoc = await adminDb
    .collection('users').doc(uid)
    .collection('examAccess').doc('training_portal').get();
  const hasAccess = isAdmin || (accessDoc.exists && accessDoc.data()?.granted);

  const progressSnap = await adminDb
    .collection('users').doc(uid)
    .collection('trainingProgress').get();
  const progress: Record<string, { completedSlides?: number[]; completedAt?: unknown; passed?: boolean }> = {};
  progressSnap.forEach((doc) => { progress[doc.id] = doc.data() as typeof progress[string]; });

  // ── FREE TRIAL VIEW ─────────────────────────────────────────────────────────
  if (!hasAccess) {
    const freeModules = ALL_MODULES.filter((m) => m.num <= 3);
    const lockedModules = ALL_MODULES.filter((m) => m.num > 3);

    return (
      <div className="min-h-screen bg-gray-900 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Training Portal</h1>
            <p className="text-gray-400 mt-1">Free Trial — UPS Field Service Engineering</p>
          </div>

          <div className="rounded-lg bg-blue-900/30 border border-blue-700 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold">You&apos;re on the free trial</p>
              <p className="text-gray-400 text-sm mt-1">
                Lesson 1 of Modules 1, 2 &amp; 3 is unlocked. Enroll to access all 28 modules.
              </p>
            </div>
            <PurchaseButton
              productId="training_course"
              label="Enroll — $1,499"
              className="flex-shrink-0 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg text-sm transition-colors"
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Free Trial Lessons</h2>
            {freeModules.map((mod) => {
              const p = progress[mod.id] ?? {};
              const trialDone = (p.completedSlides ?? []).includes(0);
              return (
                <div
                  key={mod.id}
                  className={`rounded-lg border p-5 flex items-center justify-between gap-4 ${
                    trialDone ? 'border-green-800 bg-green-900/10' : 'border-blue-800/60 bg-blue-900/10'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${trialDone ? 'bg-green-600 text-white' : 'bg-blue-700 text-white'}`}>
                      {trialDone ? '✓' : mod.num}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-white font-medium truncate">{mod.title}</p>
                        <span className="px-1.5 py-0.5 bg-blue-600/30 border border-blue-600/60 text-blue-300 text-xs rounded flex-shrink-0">
                          FREE TRIAL
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm">
                        {trialDone ? 'Lesson 1 complete' : `Lesson 1 of ${mod.slides.length} available free`}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/training/${mod.id}`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
                      trialDone ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    {trialDone ? 'Review' : 'Start'}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">
              Full Course{' '}
              <span className="text-gray-500 font-normal text-sm">— {lockedModules.length} more modules locked</span>
            </h2>
            <div className="rounded-lg border border-gray-700 bg-gray-800/40 divide-y divide-gray-700/50">
              {lockedModules.map((mod) => (
                <div key={mod.id} className="flex items-center gap-3 px-5 py-3 opacity-50">
                  <span className="text-gray-600 text-sm">🔒</span>
                  <span className="text-gray-400 text-sm">{mod.num}. {mod.title}</span>
                </div>
              ))}
            </div>
            <div className="text-center py-4">
              <PurchaseButton
                productId="training_course"
                label="Unlock All 28 Modules — $1,499"
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
              />
              <p className="text-gray-600 text-xs mt-3">Jr. FSE Certification Exam + NFPA 70E &amp; LOTO certificates included</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── FULL PORTAL VIEW ─────────────────────────────────────────────────────────
  const moduleStatuses = ALL_MODULES.map((mod, idx) => {
    const p = progress[mod.id] ?? {};
    const completedSlides = p.completedSlides ?? [];
    const moduleComplete = !!(p.completedAt && p.passed);
    const started = completedSlides.length > 0;
    const slidesDone = completedSlides.length;

    let locked = false;
    if (!isAdmin && idx > 0) {
      const prevMod = ALL_MODULES[idx - 1];
      const prevP = progress[prevMod.id] ?? {};
      if (!prevP.completedAt || !prevP.passed) {
        locked = true;
      } else {
        const completedAt =
          (prevP.completedAt as { toDate?: () => Date } | undefined)?.toDate?.() ??
          new Date(prevP.completedAt as string);
        const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
        if (Date.now() - completedAt.getTime() < threeDaysMs) {
          locked = true;
        }
      }
    }

    return { mod, locked, moduleComplete, started, slidesDone };
  });

  const totalComplete = moduleStatuses.filter((s) => s.moduleComplete).length;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Training Portal</h1>
          <p className="text-gray-400 mt-1">UPS Field Service Engineering — 28 Module Program</p>
        </div>

        <div className="rounded-lg bg-gray-800 border border-gray-700 p-6 grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-white">{totalComplete}</p>
            <p className="text-gray-400 text-sm">Modules Complete</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{ALL_MODULES.length}</p>
            <p className="text-gray-400 text-sm">Total Modules</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-400">
              {Math.round((totalComplete / ALL_MODULES.length) * 100)}%
            </p>
            <p className="text-gray-400 text-sm">Progress</p>
          </div>
        </div>

        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{ width: `${(totalComplete / ALL_MODULES.length) * 100}%` }}
          />
        </div>

        <div className="space-y-3">
          {moduleStatuses.map(({ mod, locked, moduleComplete, started, slidesDone }) => (
            <div
              key={mod.id}
              className={`rounded-lg border p-5 flex items-center justify-between gap-4 ${
                moduleComplete
                  ? 'border-green-800 bg-green-900/10'
                  : locked
                  ? 'border-gray-800 bg-gray-800/50 opacity-60'
                  : 'border-gray-700 bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    moduleComplete
                      ? 'bg-green-600 text-white'
                      : locked
                      ? 'bg-gray-700 text-gray-500'
                      : started
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {moduleComplete ? '✓' : locked ? '🔒' : mod.num}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-medium truncate">{mod.title}</p>
                  <p className="text-gray-500 text-sm">
                    {moduleComplete
                      ? 'Complete'
                      : locked
                      ? 'Locked — complete previous module + wait 3 days'
                      : started
                      ? `${slidesDone}/${mod.slides.length} slides done`
                      : `${mod.slides.length} slides · ${mod.test.length} test questions`}
                  </p>
                </div>
              </div>
              {!locked && (
                <Link
                  href={`/training/${mod.id}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
                    moduleComplete
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {moduleComplete ? 'Review' : started ? 'Continue' : 'Start'}
                </Link>
              )}
            </div>
          ))}
        </div>

        {totalComplete === ALL_MODULES.length && (
          <div className="rounded-lg bg-green-900/30 border border-green-700 p-8 text-center space-y-4">
            <p className="text-green-300 text-2xl font-bold">Training Complete!</p>
            <p className="text-gray-300">
              You have completed all 28 modules. Your Jr. FSE Certification Exam has been unlocked.
            </p>
            <Link
              href="/exam/rules/jr_fse"
              className="inline-block px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors"
            >
              Take the Jr. FSE Exam →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
