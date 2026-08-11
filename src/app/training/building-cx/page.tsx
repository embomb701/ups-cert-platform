import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { BUILDING_CX_MODULES } from '@/data/index';
import { COURSES } from '@/data/courses';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';
import { generateCourseMetadata } from '@/lib/utils/courseMetadata';

export const dynamic = 'force-dynamic';

export const metadata = generateCourseMetadata('building-cx');

export default async function BuildingCxOverviewPage() {
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
      adminDb.collection('users').doc(uid).collection('examAccess').doc('training_building_cx').get(),
      adminDb.collection('users').doc(uid).collection('trainingProgress').get(),
    ]);
    if (!isAdmin) hasAccess = accessDoc.exists && accessDoc.data()?.granted === true;
    progressSnap.forEach((doc) => { progress[doc.id] = doc.data() as typeof progress[string]; });
  }

  const course = COURSES.find((c) => c.id === 'building-cx');
  const modules = [...BUILDING_CX_MODULES].sort((a, b) => a.num - b.num);
  const completedCount = modules.filter((m) => {
    const p = progress[m.id] ?? {};
    return !!(p.completedAt && p.passed);
  }).length;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <Link href="/training" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          ← Back to Training Portal
        </Link>

        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">Building Commissioning</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Building Commissioning (Cx) Agent</h1>
          <p className="text-gray-400 text-sm">
            {modules.length} modules · ASHRAE Guideline 0 process, HVAC functional testing, BAS sequence verification,
            enclosure commissioning, and LEED EA credits.
            Complete all modules to earn the <span className="text-emerald-400 font-semibold">Jr. Building Commissioning Agent certificate</span>.
          </p>
          {hasAccess && completedCount > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{completedCount}/{modules.length} modules complete</span>
                <span>{Math.round((completedCount / modules.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${(completedCount / modules.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Purchase CTA */}
        {!hasAccess && (
          <div className="rounded-xl border-2 border-emerald-700 bg-emerald-950/20 p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="text-white font-semibold mb-1">Enroll to start this course</p>
                <p className="text-gray-400 text-sm">
                  Unlock all {modules.length} modules, section quizzes, module tests, and the Jr. Building Commissioning Agent certificate.
                </p>
              </div>
              <div className="flex-shrink-0">
                <PurchaseButton
                  productId="training_building_cx"
                  label="Enroll — $1,299"
                  className="block w-full py-2.5 px-5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-lg text-sm text-center transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* What you will learn */}
        <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-5 space-y-3">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">What You Will Learn</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">→</span> The commissioning industry, types of Cx (new construction, retro-Cx, MBCx), ASHRAE Guideline 0, and the CxA role — plus BCxP/CBCP certification paths</li>
            <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">→</span> The four-phase Cx process: OPR, BOD, commissioning plan, prefunctional checklists, functional performance tests, and the issues log</li>
            <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">→</span> HVAC functional testing: AHU verification, VAV commissioning, economizer testing, chilled water plant, and ventilation/DCV verification</li>
            <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">→</span> BAS commissioning: points verification, sensor calibration, sequence of operation review, trend log analysis, PID tuning, and FDD software</li>
            <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">→</span> LEED EA prerequisites and Enhanced Commissioning credits, enclosure commissioning, blower door testing, and infrared thermography</li>
          </ul>
        </div>

        {/* Career context */}
        <div className="rounded-lg border border-emerald-800/40 bg-emerald-950/10 p-4">
          <p className="text-emerald-300 text-xs font-semibold uppercase tracking-wide mb-2">Career Outlook</p>
          <p className="text-gray-400 text-sm">
            Demand for commissioning professionals is growing 8–12% annually — LEED requirements, tightening energy codes,
            and owner demand for verified building performance are all driving growth.
            Field commissioning technicians earn{' '}
            <span className="text-white font-medium">$55,000–$70,000</span>; CxA project managers earn{' '}
            <span className="text-white font-medium">$75,000–$110,000</span>; senior CxAs and principals earn{' '}
            <span className="text-white font-medium">$100,000–$140,000+</span>.
            Employers include independent Cx firms, MEP engineering firms, and in-house programs at healthcare systems, universities, and data center operators.
          </p>
        </div>

        {/* LEED callout */}
        <div className="rounded-lg bg-emerald-950/30 border border-emerald-800/50 p-4">
          <p className="text-emerald-400 font-semibold text-sm mb-1">LEED Requires Commissioning — Every Project</p>
          <p className="text-gray-400 text-xs">
            LEED v4/v4.1 requires commissioning as an Energy and Atmosphere prerequisite on every certified project.
            Enhanced Commissioning adds up to 6 additional points — making CxA expertise directly tied to LEED
            certification outcomes. The BCxP credential (AABC Commissioning Group) is the industry benchmark for
            qualified commissioning authorities.
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
                    ? 'border-emerald-800 bg-emerald-900/20'
                    : available
                    ? 'border-gray-700 bg-gray-800/60 hover:border-gray-600'
                    : 'border-gray-800 bg-gray-800/30 opacity-60'
                }`}
              >
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  done
                    ? 'bg-emerald-600 text-white'
                    : available
                    ? 'bg-emerald-900/60 border border-emerald-700/60 text-emerald-400'
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
                        ? 'bg-emerald-700 hover:bg-emerald-600 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
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

        {/* Certificate */}
        <div className={`rounded-xl border p-6 text-center ${completedCount === modules.length && hasAccess ? 'border-emerald-500 bg-emerald-950/30' : 'border-emerald-700/40 bg-emerald-950/10'}`}>
          <p className="text-emerald-400 text-sm font-semibold mb-1">Certificate of Completion</p>
          <p className="text-gray-300 font-bold text-lg mb-2">Jr. Building Commissioning Agent</p>
          <p className="text-gray-500 text-xs mb-4">
            Awarded upon successful completion of all {modules.length} modules. Demonstrates foundational knowledge
            of the ASHRAE Guideline 0 commissioning process, HVAC functional testing, BAS verification, and LEED
            commissioning credit requirements.
          </p>
          {hasAccess ? (
            completedCount === modules.length ? (
              course?.examLevel ? (
                <div className="flex flex-wrap justify-center gap-3">
                  <p className="text-emerald-400 font-semibold text-sm w-full">All modules complete!</p>
                  <Link href={`/exam/rules/practice_${course.examLevel}`} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-700/60 text-emerald-400 hover:text-white transition-colors">Practice Exam →</Link>
                  <Link href="/dashboard" className="text-xs text-gray-400 hover:text-gray-200 transition-colors">Dashboard →</Link>
                </div>
              ) : (
                <p className="text-emerald-400 font-semibold text-sm">
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
