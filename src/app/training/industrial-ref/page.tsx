import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { INDUSTRIAL_REF_MODULES } from '@/data/index';
import { COURSES } from '@/data/courses';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';
import { generateCourseMetadata } from '@/lib/utils/courseMetadata';

export const dynamic = 'force-dynamic';

export const metadata = generateCourseMetadata('industrial-ref');

export default async function IndustrialRefOverviewPage() {
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
      adminDb.collection('users').doc(uid).collection('examAccess').doc('training_industrial_ref').get(),
      adminDb.collection('users').doc(uid).collection('trainingProgress').get(),
    ]);
    if (!isAdmin) hasAccess = accessDoc.exists && accessDoc.data()?.granted === true;
    progressSnap.forEach((doc) => { progress[doc.id] = doc.data() as typeof progress[string]; });
  }

  const course = COURSES.find((c) => c.id === 'industrial-ref');
  const modules = [...INDUSTRIAL_REF_MODULES].sort((a, b) => a.num - b.num);
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
            <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">Industrial Refrigeration</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Industrial Refrigeration Operator</h1>
          <p className="text-gray-400 text-sm">
            {modules.length} modules · Ammonia systems, two-stage compression, PSM compliance, and RETA certification prep
            for food processing, cold storage, and brewery careers.
            Complete all modules to earn the <span className="text-cyan-400 font-semibold">Jr. Industrial Refrigeration Operator certificate</span>.
          </p>
          {hasAccess && completedCount > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{completedCount}/{modules.length} modules complete</span>
                <span>{Math.round((completedCount / modules.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full"
                  style={{ width: `${(completedCount / modules.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Purchase CTA */}
        {!hasAccess && (
          <div className="rounded-xl border-2 border-cyan-700 bg-cyan-950/20 p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="text-white font-semibold mb-1">Enroll to start this course</p>
                <p className="text-gray-400 text-sm">
                  Unlock all {modules.length} modules, section quizzes, module tests, and the Jr. Industrial Refrigeration Operator certificate.
                </p>
              </div>
              <div className="flex-shrink-0">
                <PurchaseButton
                  productId="training_industrial_ref"
                  label="Enroll — $1,499"
                  className="block w-full py-2.5 px-5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold rounded-lg text-sm text-center transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* What you will learn */}
        <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-5 space-y-3">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">What You Will Learn</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">→</span> The industrial refrigeration industry, RETA certifications, employer types, and the career ladder from operator-in-training to chief engineer</li>
            <li className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">→</span> Vapor compression cycle at industrial scale, P-h diagrams, ammonia properties, two-stage compression, and CO2 cascade systems</li>
            <li className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">→</span> Ammonia safety: exposure limits, PPE selection and SCBA donning, emergency response, and OSHA PSM requirements</li>
            <li className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">→</span> Industrial compressors: reciprocating and screw, capacity control, oil systems, vibration monitoring, and startup procedures</li>
            <li className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">→</span> Evaporative condensers, flooded evaporators, liquid recirculation, hot gas defrost, and floating setpoint energy management</li>
            <li className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">→</span> Systematic fault diagnosis for high head pressure, high suction, liquid slugging, and energy efficiency trending</li>
          </ul>
        </div>

        {/* Career context */}
        <div className="rounded-lg border border-cyan-800/40 bg-cyan-950/10 p-4">
          <p className="text-cyan-300 text-xs font-semibold uppercase tracking-wide mb-2">Career Outlook</p>
          <p className="text-gray-400 text-sm">
            Industrial refrigeration operators are in short supply — the workforce is aging and demand is growing
            with food processing expansion and cold chain investment. Entry operators earn{' '}
            <span className="text-white font-medium">$45,000–$58,000</span>; licensed operators with RETA CIRO earn{' '}
            <span className="text-white font-medium">$60,000–$75,000</span>; chief engineers and senior techs earn{' '}
            <span className="text-white font-medium">$80,000–$100,000+</span>.
            Major employers include Tyson Foods, Smithfield, Lineage Logistics, Americold, and industrial refrigeration contractors.
          </p>
        </div>

        {/* Safety callout */}
        <div className="rounded-lg bg-yellow-950/30 border border-yellow-800/50 p-4">
          <p className="text-yellow-400 font-semibold text-sm mb-1">Ammonia Safety — Know Before You Go</p>
          <p className="text-gray-400 text-xs">
            Ammonia (R-717) is toxic above 25 ppm OSHA PEL-TWA. Facilities with 10,000+ lbs are subject to OSHA PSM
            and EPA RMP. This course covers the safety knowledge required to work in these environments — real-world
            facilities require site-specific training and PPE fit-testing before hands-on work.
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
                    ? 'border-cyan-800 bg-cyan-900/20'
                    : available
                    ? 'border-gray-700 bg-gray-800/60 hover:border-gray-600'
                    : 'border-gray-800 bg-gray-800/30 opacity-60'
                }`}
              >
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  done
                    ? 'bg-cyan-600 text-white'
                    : available
                    ? 'bg-cyan-900/60 border border-cyan-700/60 text-cyan-400'
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
                        ? 'bg-cyan-700 hover:bg-cyan-600 text-white'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white'
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
        <div className={`rounded-xl border p-6 text-center ${completedCount === modules.length && hasAccess ? 'border-cyan-500 bg-cyan-950/30' : 'border-cyan-700/40 bg-cyan-950/10'}`}>
          <p className="text-cyan-400 text-sm font-semibold mb-1">Certificate of Completion</p>
          <p className="text-gray-300 font-bold text-lg mb-2">Jr. Industrial Refrigeration Operator</p>
          <p className="text-gray-500 text-xs mb-4">
            Awarded upon successful completion of all {modules.length} modules. Demonstrates foundational knowledge
            of ammonia refrigeration systems, PSM compliance, and operational readiness for food processing and cold storage environments.
          </p>
          {hasAccess ? (
            completedCount === modules.length ? (
              course?.examLevel ? (
                <div className="flex flex-wrap justify-center gap-3">
                  <p className="text-cyan-400 font-semibold text-sm w-full">All modules complete!</p>
                  <Link href={`/exam/rules/practice_${course.examLevel}`} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-cyan-700/60 text-cyan-400 hover:text-white transition-colors">Practice Exam →</Link>
                  <Link href="/dashboard" className="text-xs text-gray-400 hover:text-gray-200 transition-colors">Dashboard →</Link>
                </div>
              ) : (
                <p className="text-cyan-400 font-semibold text-sm">
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
