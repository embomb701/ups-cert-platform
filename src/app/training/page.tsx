import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { ALL_MODULES } from '@/data/index';
import Link from 'next/link';
import { TrainingPurchaseOptions } from '@/components/training/TrainingPurchaseOptions';

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

  if (!hasAccess) {
    return <TrainingPurchaseOptions />;
  }

  const progressSnap = await adminDb
    .collection('users').doc(uid)
    .collection('trainingProgress').get();
  const progress: Record<string, { completedSlides?: number[]; completedAt?: unknown; passed?: boolean }> = {};
  progressSnap.forEach((doc) => { progress[doc.id] = doc.data() as typeof progress[string]; });

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
        const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - completedAt.getTime() < oneWeekMs) {
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
                      ? 'Locked — complete previous module + wait 1 week'
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
