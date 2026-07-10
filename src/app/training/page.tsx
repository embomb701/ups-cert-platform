import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { ALL_MODULES } from '@/data/index';
import { COURSES } from '@/data/courses';
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

  // Fetch all course access in parallel
  const accessDocs = await Promise.all(
    COURSES.map((course) =>
      adminDb.collection('users').doc(uid).collection('examAccess').doc(course.accessKey).get()
    )
  );
  const courseAccess = Object.fromEntries(
    COURSES.map((course, i) => [
      course.id,
      isAdmin || (accessDocs[i].exists && accessDocs[i].data()?.granted === true),
    ])
  );

  const hasAnyAccess = Object.values(courseAccess).some(Boolean);

  // Fetch progress for all modules
  const progressSnap = await adminDb
    .collection('users').doc(uid)
    .collection('trainingProgress').get();
  const progress: Record<string, { completedSlides?: number[]; completedAt?: unknown; passed?: boolean }> = {};
  progressSnap.forEach((doc) => { progress[doc.id] = doc.data() as typeof progress[string]; });

  // Compute per-course progress for display
  const upsModules = ALL_MODULES;
  const upsDone = upsModules.filter((m) => {
    const p = progress[m.id] ?? {};
    return !!(p.completedAt && p.passed);
  }).length;

  const sharedModules = ALL_MODULES.filter((m) => m.num <= 10);
  const kitchenSharedDone = sharedModules.filter((m) => {
    const p = progress[m.id] ?? {};
    return !!(p.completedAt && p.passed);
  }).length;

  const freeTrialModules = ALL_MODULES.filter((m) => m.num <= 3);

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-10">

        <div>
          <h1 className="text-3xl font-bold text-white">Mastering Field Service <span className="text-gradient">Training Portal</span></h1>
          <p className="text-gray-400 mt-1">Choose your training program</p>
        </div>

        {/* Free trial banner — shown when user has no paid access */}
        {!hasAnyAccess && (
          <div className="rounded-lg bg-blue-900/20 border border-blue-800 p-5">
            <p className="text-white font-semibold mb-1">Free Trial Active</p>
            <p className="text-gray-400 text-sm mb-3">
              Lesson 1 of Modules 1, 2 &amp; 3 is unlocked across both programs — same foundational content, no purchase required.
            </p>
            <div className="flex gap-3 flex-wrap">
              {freeTrialModules.map((mod) => {
                const done = (progress[mod.id]?.completedSlides ?? []).includes(0);
                return (
                  <Link
                    key={mod.id}
                    href={`/training/${mod.id}`}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      done
                        ? 'bg-green-900/50 border border-green-700 text-green-300'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    {done ? '✓ ' : ''}Module {mod.num}: {mod.title}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Course cards */}
        <div className="space-y-6">
          {/* ── UPS Course ─────────────────────────────────────────────── */}
          <div className={`rounded-xl border-2 p-6 ${courseAccess.ups ? 'border-blue-700 bg-blue-950/20' : 'border-gray-700 bg-gray-800/50'}`}>
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-400 font-mono text-xs font-bold uppercase tracking-widest">UPS FSE</span>
                  {courseAccess.ups && (
                    <span className="px-2 py-0.5 bg-blue-600/30 border border-blue-600/60 text-blue-300 text-xs rounded">Enrolled</span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white mb-1">UPS Field Service Engineering</h2>
                <p className="text-gray-400 text-sm mb-3">
                  Service uninterruptible power supplies in data centers, hospitals, and critical infrastructure.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <span>28 modules</span>
                  <span>·</span>
                  <span>3–6 months</span>
                  <span>·</span>
                  <span>Jr. UPS FSE certification included</span>
                </div>
                {courseAccess.ups && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{upsDone}/{upsModules.length} modules complete</span>
                      <span>{Math.round((upsDone / upsModules.length) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(upsDone / upsModules.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 flex flex-col gap-2 min-w-[160px]">
                {courseAccess.ups ? (
                  <Link
                    href="/training/ups"
                    className="block w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-sm text-center transition-colors"
                  >
                    {upsDone > 0 ? 'Continue Training →' : 'Start Training →'}
                  </Link>
                ) : (
                  <>
                    <PurchaseButton
                      productId="training_course"
                      label="Enroll — $1,499"
                      className="block w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg text-sm text-center transition-colors"
                    />
                    <Link
                      href="/training/ups"
                      className="block w-full py-2 px-4 border border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white rounded-lg text-xs text-center transition-colors"
                    >
                      Preview course →
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── Kitchen Course ─────────────────────────────────────────── */}
          <div className={`rounded-xl border-2 p-6 ${courseAccess.kitchen ? 'border-orange-700 bg-orange-950/20' : 'border-gray-700 bg-gray-800/50'}`}>
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-orange-400 font-mono text-xs font-bold uppercase tracking-widest">Kitchen FSE</span>
                  {courseAccess.kitchen && (
                    <span className="px-2 py-0.5 bg-orange-600/30 border border-orange-600/60 text-orange-300 text-xs rounded">Enrolled</span>
                  )}
                  <span className="px-2 py-0.5 bg-yellow-900/40 border border-yellow-700/60 text-yellow-300 text-xs rounded">Coming Soon</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-1">Commercial Kitchen Field Service Engineering</h2>
                <p className="text-gray-400 text-sm mb-3">
                  Service commercial kitchen equipment — refrigeration systems, cooking equipment, warewashing, ice machines, and more.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <span>27 modules</span>
                  <span>·</span>
                  <span>10 shared with UPS program</span>
                  <span>·</span>
                  <span>Jr. Kitchen FSE certification</span>
                </div>
                {courseAccess.kitchen && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{kitchenSharedDone}/10 foundation modules complete</span>
                      <span>{Math.round((kitchenSharedDone / 10) * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${(kitchenSharedDone / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 flex flex-col gap-2 min-w-[160px]">
                {courseAccess.kitchen ? (
                  <Link
                    href="/training/kitchen"
                    className="block w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg text-sm text-center transition-colors"
                  >
                    {kitchenSharedDone > 0 ? 'Continue Training →' : 'Start Training →'}
                  </Link>
                ) : (
                  <div className="text-center py-2 px-4 border border-gray-700 rounded-lg">
                    <p className="text-gray-500 text-xs">Enrollment opens soon</p>
                  </div>
                )}
                <Link
                  href="/training/kitchen"
                  className="block w-full py-2 px-4 border border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white rounded-lg text-xs text-center transition-colors"
                >
                  Preview outline →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Shared foundation note */}
        <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-5">
          <p className="text-gray-300 font-medium text-sm mb-1">10 shared foundation modules</p>
          <p className="text-gray-500 text-sm">
            Modules 1–10 — electrical theory, safety (NFPA 70E + LOTO), and test equipment — are identical across both programs.
            Complete them once and they count toward either certification.
          </p>
        </div>

      </div>
    </div>
  );
}
