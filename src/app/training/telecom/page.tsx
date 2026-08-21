import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { TELECOM_MODULES } from '@/data/index';
import { COURSES } from '@/data/courses';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';
import { generateCourseMetadata } from '@/lib/utils/courseMetadata';
import { coursePriceLabel } from '@/lib/stripe/client';

export const dynamic = 'force-dynamic';

export const metadata = generateCourseMetadata('telecom');

export default async function TelecomOverviewPage() {
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

  const progress: Record<string, { completedSlides?: number[]; completedAt?: unknown; passed?: boolean }> = {};
  let hasAccess = isAdmin;

  if (uid) {
    const [accessDoc, progressSnap] = await Promise.all([
      adminDb.collection('users').doc(uid).collection('examAccess').doc('training_telecom').get(),
      adminDb.collection('users').doc(uid).collection('trainingProgress').get(),
    ]);
    if (!isAdmin) hasAccess = accessDoc.exists && accessDoc.data()?.granted === true;
    progressSnap.forEach((doc) => { progress[doc.id] = doc.data() as typeof progress[string]; });
  }

  const course = COURSES.find((c) => c.id === 'telecom');
  const modules = [...TELECOM_MODULES].sort((a, b) => a.num - b.num);
  const completedCount = modules.filter((m) => {
    const p = progress[m.id] ?? {};
    return !!(p.completedAt && p.passed);
  }).length;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Breadcrumb */}
        <Link href="/training" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          ← Back to Training Portal
        </Link>

        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-violet-400 font-mono text-xs font-bold uppercase tracking-widest">Telecom OSP</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Telecom OSP Technician</h1>
          <p className="text-gray-400 text-sm">
            {modules.length} modules · Fiber splicing, OTDR testing, copper plant, DMARC extensions, cell site power, and structured cabling certification.
            Complete all modules to earn the <span className="text-violet-400 font-semibold">Jr. Telecom OSP Technician certificate</span>.
          </p>
          {hasAccess && completedCount > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{completedCount}/{modules.length} modules complete</span>
                <span>{Math.round((completedCount / modules.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full"
                  style={{ width: `${(completedCount / modules.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Purchase CTA */}
        {!hasAccess && (
          <div className="rounded-xl border-2 border-violet-700 bg-violet-950/20 p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="text-white font-semibold mb-1">Enroll to start this course</p>
                <p className="text-gray-400 text-sm">
                  Unlock all {modules.length} modules, section quizzes, module tests, and the Jr. Telecom OSP Technician certificate.
                </p>
              </div>
              <div className="flex-shrink-0">
                <PurchaseButton
                  productId="training_telecom"
                  label={`Enroll — ${coursePriceLabel('training_telecom') ?? '$1,299'}`}
                  className="block w-full py-2.5 px-5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold rounded-lg text-sm text-center transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* What you will learn */}
        <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-5 space-y-3">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">What You Will Learn</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><span className="text-violet-400 flex-shrink-0">→</span> The telecom industry structure, OSP vs ISP, major employers, and career entry points</li>
            <li className="flex gap-2"><span className="text-violet-400 flex-shrink-0">→</span> Fiber optic physics — single-mode vs multi-mode, wavelengths, loss budgets</li>
            <li className="flex gap-2"><span className="text-violet-400 flex-shrink-0">→</span> Fusion splicing: end prep, cleaving, arc cycles, OTDR trace verification</li>
            <li className="flex gap-2"><span className="text-violet-400 flex-shrink-0">→</span> Copper plant: twisted pair, 66/110 blocks, TDR fault location, DMARC extensions</li>
            <li className="flex gap-2"><span className="text-violet-400 flex-shrink-0">→</span> Cell site power: −48V DC plants, battery float, LVD, generator integration, RF safety</li>
            <li className="flex gap-2"><span className="text-violet-400 flex-shrink-0">→</span> Certification testing, fiber inspection, OLTS pass/fail, and closeout documentation</li>
          </ul>
        </div>

        {/* Career context */}
        <div className="rounded-lg border border-violet-800/40 bg-violet-950/10 p-4">
          <p className="text-violet-300 text-xs font-semibold uppercase tracking-wide mb-2">Career Outlook</p>
          <p className="text-gray-400 text-sm">
            OSP technicians are in high demand through the mid-2030s — BEAD and RDOF federal programs are funding
            hundreds of billions in rural fiber expansion. Entry-level pay starts at <span className="text-white font-medium">$45,000–$55,000</span>.
            Experienced techs with fusion splicing and OTDR skills earn <span className="text-white font-medium">$65,000–$85,000+</span>.
            Major employers include AT&amp;T, Verizon, Crown Castle, Lumen, and OSP contractors like MasTec and Dycom.
          </p>
        </div>

        {/* Module list */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Course Modules</h2>
          {modules.map((mod, idx) => {
            const p = progress[mod.id] ?? {};
            const done = !!(p.completedAt && p.passed);
            const slidesStarted = (p.completedSlides ?? []).length > 0;
            const prevDone = idx === 0 || (() => {
              const prevP = progress[modules[idx - 1].id] ?? {};
              return !!(prevP.completedAt && prevP.passed);
            })();
            const available = hasAccess && (idx === 0 || prevDone || slidesStarted);

            return (
              <div
                key={mod.id}
                className={`rounded-lg border p-4 flex gap-4 items-start transition-colors ${
                  done
                    ? 'border-violet-800 bg-violet-900/20'
                    : available
                    ? 'border-gray-700 bg-gray-800/60 hover:border-gray-600'
                    : 'border-gray-800 bg-gray-800/30 opacity-60'
                }`}
              >
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  done
                    ? 'bg-violet-600 text-white'
                    : available
                    ? 'bg-violet-900/60 border border-violet-700/60 text-violet-400'
                    : 'bg-gray-700 text-gray-500'
                }`}>
                  {done ? '✓' : !hasAccess ? '🔒' : mod.num}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm mb-0.5">{mod.title}</p>
                  <p className="text-gray-500 text-xs">{mod.desc}</p>
                  <p className="text-gray-600 text-xs mt-1">{mod.slides.length} slides · {mod.test.length} question test</p>
                </div>
                {available && (
                  <Link
                    href={`/training/${mod.id}`}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      done
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : slidesStarted
                        ? 'bg-violet-700 hover:bg-violet-600 text-white'
                        : 'bg-violet-600 hover:bg-violet-500 text-white'
                    }`}
                  >
                    {done ? 'Review' : slidesStarted ? 'Continue →' : 'Start →'}
                  </Link>
                )}
                {!hasAccess && (
                  <span className="flex-shrink-0 text-xs text-gray-600">Enroll to unlock</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Certificate section */}
        <div className={`rounded-xl border p-6 text-center ${completedCount === modules.length && hasAccess ? 'border-violet-500 bg-violet-950/30' : 'border-violet-700/40 bg-violet-950/10'}`}>
          <p className="text-violet-400 text-sm font-semibold mb-1">Certificate of Completion</p>
          <p className="text-gray-300 font-bold text-lg mb-2">Jr. Telecom OSP Technician</p>
          <p className="text-gray-500 text-xs mb-4">
            Awarded upon successful completion of all {modules.length} modules. Demonstrates foundational competency
            in outside plant fiber, copper, DMARC, and cell site power work.
          </p>
          {hasAccess ? (
            completedCount === modules.length ? (
              course?.examLevel ? (
                <div className="flex flex-wrap justify-center gap-3">
                  <p className="text-violet-400 font-semibold text-sm w-full">All modules complete!</p>
                  <Link href={`/exam/rules/practice_${course.examLevel}`} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-violet-700/60 text-violet-400 hover:text-white transition-colors">Practice Exam →</Link>
                  <Link href="/dashboard" className="text-xs text-gray-400 hover:text-gray-200 transition-colors">Dashboard →</Link>
                </div>
              ) : (
                <p className="text-violet-400 font-semibold text-sm">
                  All modules complete — exam coming soon.
                </p>
              )
            ) : (
              <p className="text-gray-600 text-xs">
                {completedCount}/{modules.length} modules complete — finish all modules to unlock your certificate.
              </p>
            )
          ) : (
            <p className="text-gray-600 text-xs">Enroll to begin working toward your certificate.</p>
          )}
        </div>

      </div>
    </div>
  );
}
