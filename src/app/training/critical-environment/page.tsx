import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { CE_MODULES } from '@/data/index';
import Link from 'next/link';
import { ExternalLinkWarning } from '@/components/ExternalLinkWarning';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Critical Environment Fundamentals',
};

export default async function CriticalEnvironmentPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('firebase-token')?.value;
  if (!token) redirect('/login');

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
  } catch {
    redirect('/login');
  }

  const progressSnap = await adminDb
    .collection('users').doc(uid)
    .collection('trainingProgress').get();
  const progress: Record<string, { completedSlides?: number[]; completedAt?: unknown; passed?: boolean }> = {};
  progressSnap.forEach((doc) => { progress[doc.id] = doc.data() as typeof progress[string]; });

  const modules = [...CE_MODULES].sort((a, b) => a.num - b.num);
  const completedCount = modules.filter((m) => {
    const p = progress[m.id] ?? {};
    return !!(p.completedAt && p.passed);
  }).length;
  const allComplete = completedCount === modules.length;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <Link href="/training" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">← Back to Training Portal</Link>
          <div className="flex items-center gap-3 mt-4 mb-2">
            <span className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">CE Fundamentals</span>
            <span className="px-2 py-0.5 bg-emerald-800/50 border border-emerald-600/60 text-emerald-300 text-xs rounded font-semibold">Free</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Critical Environment Fundamentals</h1>
          <p className="text-gray-400">
            Essential knowledge for anyone entering mission-critical facilities. Complete all {modules.length} modules to earn your{' '}
            <span className="text-emerald-400 font-semibold">Critical Environment Fundamentals Certificate</span>.
          </p>
          {completedCount > 0 && (
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

        {/* CPR Safety callout */}
        <div className="rounded-lg bg-red-950/30 border border-red-800/50 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-red-400 font-semibold text-sm mb-1">CPR / First Aid / AED — Required for Electrical Workers</p>
            <p className="text-gray-400 text-xs">
              Anyone working in or around energized equipment must hold a current certification.
              Cardiac arrest from electrical shock can occur in seconds — trained response saves lives.
            </p>
          </div>
          <ExternalLinkWarning
            href="https://www.redcross.org/take-a-class"
            className="flex-shrink-0 inline-block py-2 px-4 bg-red-700 hover:bg-red-600 text-white text-xs font-semibold rounded-lg text-center transition-colors cursor-pointer whitespace-nowrap"
          >
            Get Certified — Red Cross ↗
          </ExternalLinkWarning>
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
            const available = idx === 0 || prevDone || slidesStarted;

            return (
              <div
                key={mod.id}
                className={`rounded-lg border p-4 flex gap-4 items-start ${
                  done
                    ? 'border-emerald-800 bg-emerald-900/20'
                    : available
                    ? 'border-gray-700 bg-gray-800/60'
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
                  {done ? '✓' : mod.num}
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
              </div>
            );
          })}
        </div>

        {/* Certificate section */}
        <div className={`rounded-xl border p-6 text-center ${allComplete ? 'border-emerald-500 bg-emerald-950/30' : 'border-emerald-700/40 bg-emerald-950/20'}`}>
          <p className="text-emerald-400 text-sm font-semibold mb-1">Certificate of Completion</p>
          <p className="text-gray-300 font-bold text-lg mb-2">Critical Environment Fundamentals</p>
          <p className="text-gray-500 text-xs mb-4">
            Awarded upon successful completion of all {modules.length} modules. Demonstrates foundational competency
            for entry into data centers, hospitals, and other mission-critical facilities.
          </p>
          {allComplete ? (
            <Link
              href="/certificate/critical-environment"
              className="inline-block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              View Certificate →
            </Link>
          ) : (
            <p className="text-gray-600 text-xs">
              {completedCount}/{modules.length} modules complete — finish all modules to unlock your certificate.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
