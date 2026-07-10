import { redirect, notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { getModule, getPrevModule } from '@/data/index';
import { hasTrainingAccess } from '@/lib/utils/trainingAccess';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';

interface Props {
  params: Promise<{ moduleId: string }>;
}

export default async function ModulePage({ params }: Props) {
  const { moduleId } = await params;

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

  const mod = getModule(moduleId);
  if (!mod) notFound();

  const hasAccess = isAdmin || (await hasTrainingAccess(uid, mod));

  const isFreeTrialModule = mod.num <= 3;
  if (!hasAccess && !isFreeTrialModule) redirect('/training');

  // Check 3-day rule from previous module — bypassed for admins and free trial
  let locked = false;
  let unlockDate: Date | null = null;
  if (hasAccess && !isAdmin && mod.num > 1) {
    const prevMod = getPrevModule(mod);
    if (prevMod) {
      const prevProgress = await adminDb.collection('users').doc(uid).collection('trainingProgress').doc(prevMod.id).get();
      const prevData = prevProgress.data();
      if (!prevData?.completedAt) {
        locked = true;
      } else {
        const completedAt = prevData.completedAt.toDate ? prevData.completedAt.toDate() : new Date(prevData.completedAt);
        const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
        if (Date.now() - completedAt.getTime() < threeDaysMs) {
          locked = true;
          unlockDate = new Date(completedAt.getTime() + threeDaysMs);
        }
      }
    }
  }

  const progressDoc = await adminDb.collection('users').doc(uid).collection('trainingProgress').doc(moduleId).get();
  const progressData = progressDoc.data() ?? {};
  const completedSlides: number[] = progressData.completedSlides ?? [];
  const moduleComplete = !!progressData.completedAt && progressData.passed;

  const firstIncomplete = mod.slides.findIndex((_, i) => !completedSlides.includes(i));
  const startSlide = firstIncomplete === -1 ? 0 : firstIncomplete;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/training" className="hover:text-gray-300">Training Portal</Link>
          <span>/</span>
          <span className="text-gray-300">Module {mod.num}: {mod.title}</span>
        </nav>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-blue-400 font-mono text-sm">Module {mod.num}</span>
            {moduleComplete && <span className="px-2 py-0.5 bg-green-900/50 border border-green-700 text-green-300 text-xs rounded-full">Complete</span>}
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">{mod.title}</h1>
          <p className="text-gray-400">{mod.desc}</p>
        </div>

        {locked ? (
          <div className="rounded-lg bg-gray-800 border border-gray-700 p-8 text-center space-y-4">
            <div className="text-4xl">🔒</div>
            <p className="text-gray-300 font-semibold text-lg">Module Locked</p>
            {unlockDate ? (
              <p className="text-gray-400">This module unlocks on <span className="text-white">{unlockDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
            ) : (
              <p className="text-gray-400">Complete the previous module first.</p>
            )}
            <Link href="/training" className="inline-block px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              Back to Training Portal
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {!hasAccess && (
              <div className="rounded-lg bg-blue-900/30 border border-blue-700 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <p className="text-white font-semibold text-sm">Free Trial — Lesson 1 only</p>
                  <p className="text-gray-400 text-xs mt-0.5">Enroll to unlock all {mod.slides.length} lessons and the module test.</p>
                </div>
                <PurchaseButton
                  productId="training_course"
                  label="Enroll — $1,499"
                  className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg text-xs transition-colors"
                />
              </div>
            )}
            <h2 className="text-xl font-semibold text-white">Slides</h2>
            {mod.slides.map((slide, i) => {
              const done = completedSlides.includes(i);
              const trialLocked = !hasAccess && i > 0;
              return (
                <div key={i} className={`rounded-lg border p-5 flex items-center justify-between ${done ? 'border-green-800 bg-green-900/20' : trialLocked ? 'border-gray-800 bg-gray-800/40 opacity-50' : 'border-gray-700 bg-gray-800'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${done ? 'bg-green-600 text-white' : trialLocked ? 'bg-gray-700 text-gray-500' : 'bg-gray-700 text-gray-400'}`}>
                      {done ? '✓' : trialLocked ? '🔒' : i + 1}
                    </div>
                    <div>
                      <p className="text-white font-medium">{slide.title}</p>
                      <p className="text-gray-500 text-sm">
                        {trialLocked ? 'Enroll to unlock' : `${slide.quiz.length} questions · 5 min minimum`}
                      </p>
                    </div>
                  </div>
                  {!trialLocked && (isAdmin || done || i <= startSlide) && (
                    <Link href={`/training/${moduleId}/slide/${i}`} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${done ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                      {done ? 'Review' : 'Start'}
                    </Link>
                  )}
                </div>
              );
            })}

            {hasAccess && completedSlides.length === mod.slides.length && (
              <div className={`rounded-lg border p-5 flex items-center justify-between ${moduleComplete ? 'border-green-800 bg-green-900/20' : 'border-yellow-800 bg-yellow-900/20'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${moduleComplete ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'}`}>
                    {moduleComplete ? '✓' : '!'}
                  </div>
                  <div>
                    <p className="text-white font-medium">Module Test</p>
                    <p className="text-gray-500 text-sm">10 questions · 100% required · Once per day</p>
                  </div>
                </div>
                {!moduleComplete && (
                  <Link href={`/training/${moduleId}/test`} className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg text-sm font-medium transition-colors">
                    Take Test
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
