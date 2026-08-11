import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { DC_OPS_MODULES } from '@/data/index';
import { COURSES } from '@/data/courses';
import Link from 'next/link';
import { PurchaseButton } from '@/components/exam/PurchaseButton';
import { generateCourseMetadata } from '@/lib/utils/courseMetadata';

export const dynamic = 'force-dynamic';

export const metadata = generateCourseMetadata('dc-ops');

export default async function DcOpsOverviewPage() {
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
      adminDb.collection('users').doc(uid).collection('examAccess').doc('training_dc_ops').get(),
      adminDb.collection('users').doc(uid).collection('trainingProgress').get(),
    ]);
    if (!isAdmin) hasAccess = accessDoc.exists && accessDoc.data()?.granted === true;
    progressSnap.forEach((doc) => { progress[doc.id] = doc.data() as typeof progress[string]; });
  }

  const course = COURSES.find((c) => c.id === 'dc-ops');
  const modules = [...DC_OPS_MODULES].sort((a, b) => a.num - b.num);
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
            <span className="text-blue-400 font-mono text-xs font-bold uppercase tracking-widest">Data Center Operations</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Data Center Operations Manager</h1>
          <p className="text-gray-400 text-sm">
            {modules.length} modules · Uptime Institute Tiers, power chain management, PUE/WUE efficiency,
            DCIM platforms, change management, compliance, and financial management.
            Complete all modules to earn the <span className="text-blue-400 font-semibold">Jr. Data Center Operations Manager certificate</span>.
          </p>
          {hasAccess && completedCount > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{completedCount}/{modules.length} modules complete</span>
                <span>{Math.round((completedCount / modules.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${(completedCount / modules.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Purchase CTA */}
        {!hasAccess && (
          <div className="rounded-xl border-2 border-blue-700 bg-blue-950/20 p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="text-white font-semibold mb-1">Enroll to start this course</p>
                <p className="text-gray-400 text-sm">
                  Unlock all {modules.length} modules, section quizzes, module tests, and the Jr. Data Center Operations Manager certificate.
                </p>
              </div>
              <div className="flex-shrink-0">
                <PurchaseButton
                  productId="training_dc_ops"
                  label="Enroll — $1,499"
                  className="block w-full py-2.5 px-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg text-sm text-center transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* What you will learn */}
        <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-5 space-y-3">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">What You Will Learn</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex gap-2"><span className="text-blue-400 flex-shrink-0">→</span> Data center types, Uptime Institute Tier I–IV classification, TCCF certification, uptime math (nines), NOC operations, and escalation matrix design</li>
            <li className="flex gap-2"><span className="text-blue-400 flex-shrink-0">→</span> Power chain from utility to rack, UPS topologies, N/N+1/2N/2(N+1) redundancy, PUE metric management, and the stranded capacity trap</li>
            <li className="flex gap-2"><span className="text-blue-400 flex-shrink-0">→</span> CRAC/CRAH systems, hot aisle/cold aisle containment, economization, WUE, ASHRAE A-class envelopes, environmental monitoring, and Legionella management</li>
            <li className="flex gap-2"><span className="text-blue-400 flex-shrink-0">→</span> Change management process, CMDB, DCIM platforms, SLA measurement, root cause analysis, vendor contracts, and KPI reporting</li>
            <li className="flex gap-2"><span className="text-blue-400 flex-shrink-0">→</span> Electrical safety (arc flash, NFPA 70E), fire suppression (NFPA 75/76), NFPA 110 generator compliance, EPA generator emissions, and CapEx/OpEx financial management</li>
          </ul>
        </div>

        {/* Career context */}
        <div className="rounded-lg border border-blue-800/40 bg-blue-950/10 p-4">
          <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-2">Career Outlook</p>
          <p className="text-gray-400 text-sm">
            Data center operations is one of the fastest-growing management disciplines in infrastructure — driven by cloud migration,
            AI workload expansion, and the 10–15% annual growth of the data center market.
            Critical facilities technicians earn{' '}
            <span className="text-white font-medium">$55,000–$75,000</span>; operations managers earn{' '}
            <span className="text-white font-medium">$100,000–$140,000</span>; directors and VPs of Data Center Operations earn{' '}
            <span className="text-white font-medium">$130,000–$250,000+</span>.
            Employers include colocation operators (Equinix, Digital Realty, CyrusOne), hyperscale operators (AWS, Microsoft, Google), and enterprise IT facilities teams.
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
                    ? 'border-blue-800 bg-blue-900/20'
                    : available
                    ? 'border-gray-700 bg-gray-800/60 hover:border-gray-600'
                    : 'border-gray-800 bg-gray-800/30 opacity-60'
                }`}
              >
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  done
                    ? 'bg-blue-600 text-white'
                    : available
                    ? 'bg-blue-900/60 border border-blue-700/60 text-blue-400'
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
                        ? 'bg-blue-700 hover:bg-blue-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
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
        <div className={`rounded-xl border p-6 text-center ${completedCount === modules.length && hasAccess ? 'border-blue-500 bg-blue-950/30' : 'border-blue-700/40 bg-blue-950/10'}`}>
          <p className="text-blue-400 text-sm font-semibold mb-1">Certificate of Completion</p>
          <p className="text-gray-300 font-bold text-lg mb-2">Jr. Data Center Operations Manager</p>
          <p className="text-gray-500 text-xs mb-4">
            Awarded upon successful completion of all {modules.length} modules. Demonstrates foundational knowledge
            of data center Tier standards, critical infrastructure management, efficiency metrics, change management,
            compliance requirements, and financial management for data center operations.
          </p>
          {hasAccess ? (
            completedCount === modules.length ? (
              course?.examLevel ? (
                <div className="flex flex-wrap justify-center gap-3">
                  <p className="text-blue-400 font-semibold text-sm w-full">All modules complete!</p>
                  <Link href={`/exam/rules/practice_${course.examLevel}`} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-700/60 text-blue-400 hover:text-white transition-colors">Practice Exam →</Link>
                  <Link href="/dashboard" className="text-xs text-gray-400 hover:text-gray-200 transition-colors">Dashboard →</Link>
                </div>
              ) : (
                <p className="text-blue-400 font-semibold text-sm">
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
