import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { ALL_MODULES } from '@/data/index';
import { GENERATOR_MODULE_PLACEHOLDERS } from '@/data/courses';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function GeneratorPortalPage() {
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

  const accessDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('training_generator').get();
  const hasAccess = isAdmin || (accessDoc.exists && accessDoc.data()?.granted === true);

  // Progress on the shared foundation modules
  const progressSnap = await adminDb.collection('users').doc(uid).collection('trainingProgress').get();
  const progress: Record<string, { completedSlides?: number[]; completedAt?: unknown; passed?: boolean }> = {};
  progressSnap.forEach((doc) => { progress[doc.id] = doc.data() as typeof progress[string]; });

  const sharedModules = ALL_MODULES.filter((m) => m.num <= 10);
  const sharedComplete = sharedModules.filter((m) => {
    const p = progress[m.id] ?? {};
    return !!(p.completedAt && p.passed);
  }).length;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/training" className="hover:text-gray-300 transition-colors">Training</Link>
          <span>/</span>
          <span className="text-amber-400">Generator FSE</span>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Power Generation Field Service Engineering</h1>
          <p className="text-gray-400 mt-1 text-sm">
            25 modules · 10 shared foundation + 2 shared battery + 13 generator-specific · Jr. Power Generation FSE certification
          </p>
        </div>

        {/* Coming soon banner */}
        <div className="rounded-xl border border-amber-800/60 bg-amber-950/10 p-5">
          <p className="text-amber-300 font-semibold mb-1">Coming Soon — Curriculum in Development</p>
          <p className="text-gray-400 text-sm">
            The foundation modules (1–10) and the two battery modules are already built and shared with the
            UPS program. Generator-specific modules (13–25) are outlined below.
            <Link href="/training" className="ml-2 text-amber-400 hover:text-amber-300 underline">← Back to Training Hub</Link>
          </p>
        </div>

        {/* Foundation progress — anyone who has done shared modules sees credit */}
        {(hasAccess || sharedComplete > 0) && (
          <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium text-sm">Foundation modules: {sharedComplete}/10 complete</span>
              <span className="text-gray-400 text-sm">{Math.round((sharedComplete / 10) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${(sharedComplete / 10) * 100}%` }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-2">
              Foundation and battery-module progress carries over from the other programs — complete a module once, it counts everywhere.
            </p>
          </div>
        )}

        {/* Foundation summary */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Foundation — Modules 1–10</h2>
            <span className="text-xs text-gray-500">(Shared with all programs)</span>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-4">
            <p className="text-gray-400 text-sm leading-relaxed">
              Electrical theory, circuits, components, AC/DC systems, Ohm&apos;s law, electrical drawings,
              NFPA-70E, LOTO, and meter skills — the same 10 modules that open every program.
              {' '}<Link href="/training" className="text-amber-400 hover:text-amber-300 underline">Start them from the Training Hub.</Link>
            </p>
          </div>
        </div>

        {/* Generator curriculum outline, grouped by track */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Generator Curriculum — Modules 11–25</h2>
            <span className="px-2 py-0.5 bg-yellow-900/40 border border-yellow-700/60 text-yellow-400 text-xs rounded">Outline</span>
          </div>
          <div className="space-y-6">
            {(['Batteries & Starting', 'Engines & Fuel', 'Generation & Controls', 'Transfer & Integration', 'Compliance & Professional Service'] as const).map((track) => (
              <div key={track}>
                <h3 className="text-xs font-semibold text-amber-400/90 uppercase tracking-widest mb-2">{track}</h3>
                <div className="space-y-2">
                  {GENERATOR_MODULE_PLACEHOLDERS.map((placeholder, idx) => {
                    if (placeholder.track !== track) return null;
                    return (
                      <details
                        key={placeholder.id}
                        className="rounded-lg border border-gray-800 bg-gray-900/30 group"
                      >
                        <summary className="flex items-center gap-4 p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                          <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold bg-gray-800 text-gray-500">
                            {idx + 11}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-gray-400 font-medium text-sm">{placeholder.title}</span>
                              {placeholder.sharedFrom ? (
                                <span className="px-1.5 py-0.5 bg-green-900/40 border border-green-800/60 text-green-400 text-xs rounded">Content Ready — Shared with UPS FSE</span>
                              ) : (
                                <span className="px-1.5 py-0.5 bg-gray-800 text-gray-600 text-xs rounded">Coming Soon</span>
                              )}
                            </div>
                            <p className="text-gray-600 text-xs mt-0.5">{placeholder.desc}</p>
                          </div>
                          <span className="flex-shrink-0 text-gray-600 text-xs group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="px-4 pb-4 pl-[68px]">
                          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Lesson outline</p>
                          <ul className="space-y-1">
                            {placeholder.chapters.map((ch, ci) => (
                              <li key={ci} className="flex gap-2 text-xs text-gray-500">
                                <span className="text-amber-500/60 flex-shrink-0">{ci + 1}.</span>{ch}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/training" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">← Back to Training Hub</Link>
        </div>

      </div>
    </div>
  );
}
