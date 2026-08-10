import { redirect, notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { getModule } from '@/data/index';
import { getGrantedCourseKeys, moduleUnlockState } from '@/lib/utils/trainingAccess';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ moduleId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleId } = await params;
  const mod = getModule(moduleId);
  if (!mod) return { title: 'Training Module — Mastering Field Service' };
  return {
    title: `${mod.title} — Mastering Field Service`,
    robots: { index: false },
  };
}

export default async function ModulePage({ params }: Props) {
  const { moduleId } = await params;

  const mod = getModule(moduleId);
  if (!mod) notFound();

  const isCEModule = mod.id.startsWith('ce-');
  const isFreeTrialModule = mod.num <= 3;

  const cookieStore = await cookies();
  const token = cookieStore.get('firebase-token')?.value;

  // Unauthenticated: allow free trial modules and CE; redirect everything else
  if (!token && !isFreeTrialModule && !isCEModule) redirect('/login');

  let uid = '';
  let userEmail = '';
  let isAuthenticated = false;

  if (token) {
    try {
      const decoded = await adminAuth.verifyIdToken(token);
      uid = decoded.uid;
      userEmail = decoded.email?.toLowerCase() ?? '';
      isAuthenticated = true;
    } catch {
      if (!isFreeTrialModule && !isCEModule) redirect('/login');
    }
  }

  const isAdmin = isAuthenticated ? await checkIsAdmin(uid, userEmail) : false;
  const grantedKeys = (isAuthenticated && !isAdmin) ? await getGrantedCourseKeys(uid, mod) : [];
  const hasAccess = isAdmin || grantedKeys.length > 0;

  if (isAuthenticated && !hasAccess && !isFreeTrialModule && !isCEModule) redirect('/training');

  // Check 3-day rule (only for authenticated enrolled users)
  let locked = false;
  let unlockDate: Date | null = null;
  if (isAuthenticated && hasAccess && !isAdmin && !isCEModule && mod.num > 1) {
    const state = await moduleUnlockState(uid, mod, grantedKeys);
    locked = state.locked;
    unlockDate = state.unlockDate;
  }

  // Fetch progress only for authenticated users
  let completedSlides: number[] = [];
  let moduleComplete = false;
  let startSlide = 0;
  if (isAuthenticated && uid) {
    const progressDoc = await adminDb.collection('users').doc(uid).collection('trainingProgress').doc(moduleId).get();
    const progressData = progressDoc.data() ?? {};
    completedSlides = progressData.completedSlides ?? [];
    moduleComplete = !!progressData.completedAt && progressData.passed;
    const firstIncomplete = mod.slides.findIndex((_, i) => !completedSlides.includes(i));
    startSlide = firstIncomplete === -1 ? 0 : firstIncomplete;
  }

  const isGuest = !isAuthenticated;

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
            {/* Guest preview banner */}
            {isGuest && !isCEModule && (
              <div className="rounded-lg bg-indigo-900/30 border border-indigo-700 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <p className="text-white font-semibold text-sm">Free Preview — Lesson 1</p>
                  <p className="text-gray-400 text-xs mt-0.5">Create a free account to save your progress and unlock all {mod.slides.length} lessons.</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link href="/login?signup=1" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors">
                    Create account
                  </Link>
                  <Link href="/login" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-semibold rounded-lg transition-colors">
                    Sign in
                  </Link>
                </div>
              </div>
            )}

            {/* Logged-in non-enrolled banner */}
            {!isGuest && !hasAccess && !isCEModule && (
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
              const trialLocked = !hasAccess && !isCEModule && i > 0;
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
                  {!trialLocked && (isAdmin || done || i <= startSlide || isGuest) && i === 0 && (
                    <Link href={`/training/${moduleId}/slide/${i}`} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${done ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                      {done ? 'Review' : 'Start'}
                    </Link>
                  )}
                  {!trialLocked && !isGuest && (isAdmin || done || i <= startSlide) && i > 0 && (
                    <Link href={`/training/${moduleId}/slide/${i}`} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${done ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                      {done ? 'Review' : 'Start'}
                    </Link>
                  )}
                </div>
              );
            })}

            {(hasAccess || isCEModule) && completedSlides.length === mod.slides.length && (
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
