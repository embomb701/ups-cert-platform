import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { ALL_MODULES, COURSE_SEQUENCES } from '@/data/index';
import { HVAC_MODULE_PLACEHOLDERS } from '@/data/courses';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function HvacPortalPage() {
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

  const accessDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('training_hvac').get();
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

  // States for built HVAC-course modules beyond the foundation (positions 11+
  // in the HVAC sequence: shared refrigeration core + built hvac-* modules).
  const hvacSeq = COURSE_SEQUENCES['training_hvac'];
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
  const isComplete = (id: string) => {
    const p = progress[id] ?? {};
    return !!(p.completedAt && p.passed);
  };
  const getUnlock = (id: string): Date | null => {
    const p = progress[id] ?? {};
    if (!p.completedAt || !p.passed) return null;
    const c = p.completedAt as { toDate?: () => Date } | string;
    const completedAt = typeof c === 'string' ? new Date(c) : (c as { toDate: () => Date }).toDate();
    return new Date(completedAt.getTime() + threeDaysMs);
  };

  const hvacStates = new Map(
    hvacSeq.filter((m) => m.num > 10 || m.id.startsWith('kitchen-') || m.id.startsWith('hvac-')).flatMap((mod) => {
      const idx = hvacSeq.findIndex((m) => m.id === mod.id);
      if (idx < 10) return []; // foundation handled separately
      const completed = isComplete(mod.id);
      let locked = false;
      let unlockDate: Date | null = null;
      if (!isAdmin && hasAccess) {
        const prev = hvacSeq[idx - 1];
        if (!prev || !isComplete(prev.id)) {
          locked = true;
        } else {
          const unlock = getUnlock(prev.id);
          if (unlock && Date.now() < unlock.getTime()) {
            locked = true;
            unlockDate = unlock;
          }
        }
      }
      const completedSlides = (progress[mod.id]?.completedSlides ?? []) as number[];
      const slideProgress = mod.slides.length > 0 ? completedSlides.length / mod.slides.length : 0;
      return [[mod.id, { mod, position: idx + 1, completed, locked, unlockDate, slideProgress, completedSlides }] as const];
    })
  );
  const hvacBuiltCount = hvacStates.size; // built modules beyond foundation (of 15)

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/training" className="hover:text-gray-300 transition-colors">Training</Link>
          <span>/</span>
          <span className="text-teal-400">HVAC FSE</span>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">HVAC Field Service Engineering</h1>
          <p className="text-gray-400 mt-1 text-sm">
            25 modules · 10 shared foundation + 2 shared refrigeration + 13 HVAC-specific · Jr. HVAC FSE certification
          </p>
        </div>

        {/* Coming soon banner */}
        <div className="rounded-xl border border-teal-800/60 bg-teal-950/10 p-5">
          <p className="text-teal-300 font-semibold mb-1">Coming Soon — Curriculum in Development</p>
          <p className="text-gray-400 text-sm">
            The foundation modules (1–10) plus {hvacBuiltCount} of the 15 HVAC-track modules are built;
            the rest are outlined below and in development.
            <Link href="/training" className="ml-2 text-teal-400 hover:text-teal-300 underline">← Back to Training Hub</Link>
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
                className="h-full bg-teal-500 rounded-full transition-all"
                style={{ width: `${(sharedComplete / 10) * 100}%` }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-2">
              Foundation progress carries over from the UPS and Kitchen programs — complete it once, it counts everywhere.
            </p>
          </div>
        )}

        {/* Foundation summary */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Foundation — Modules 1–10</h2>
            <span className="text-xs text-gray-500">(Shared with UPS and Kitchen programs)</span>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/30 p-4">
            <p className="text-gray-400 text-sm leading-relaxed">
              Electrical theory, circuits, components, AC/DC systems, Ohm&apos;s law, electrical drawings,
              NFPA-70E, LOTO, and meter skills — the same 10 modules that open every program.
              {' '}<Link href="/training" className="text-teal-400 hover:text-teal-300 underline">Start them from the Training Hub.</Link>
            </p>
          </div>
        </div>

        {/* HVAC curriculum outline, grouped by track */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">HVAC Curriculum — Modules 11–25</h2>
            <span className="px-2 py-0.5 bg-yellow-900/40 border border-yellow-700/60 text-yellow-400 text-xs rounded">Outline</span>
          </div>
          <div className="space-y-6">
            {(['Refrigeration Core', 'Air & Comfort', 'Heating & Cooling Equipment', 'Controls & Building Systems', 'Professional Service'] as const).map((track) => (
              <div key={track}>
                <h3 className="text-xs font-semibold text-teal-400/90 uppercase tracking-widest mb-2">{track}</h3>
                <div className="space-y-2">
                  {HVAC_MODULE_PLACEHOLDERS.map((placeholder, idx) => {
                    if (placeholder.track !== track) return null;

                    // Built module → interactive card with lock states
                    const state = hvacStates.get(placeholder.id);
                    if (state) {
                      const { mod, position, completed, locked, unlockDate, slideProgress, completedSlides } = state;
                      const accessible = hasAccess && !locked;
                      return (
                        <div
                          key={placeholder.id}
                          className={`rounded-lg border p-4 transition-colors ${
                            completed
                              ? 'border-green-800/60 bg-green-950/10'
                              : !hasAccess
                              ? 'border-gray-800 bg-gray-900/50 opacity-60'
                              : locked
                              ? 'border-gray-700 bg-gray-800/30'
                              : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                              completed ? 'bg-green-700 text-white' :
                              !hasAccess || locked ? 'bg-gray-700 text-gray-500' :
                              'bg-teal-900/60 border border-teal-700/60 text-teal-300'
                            }`}>
                              {completed ? '✓' : !hasAccess ? '🔒' : locked ? '⏳' : position}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-white font-medium text-sm">{mod.title}</span>
                                {placeholder.sharedFrom && (
                                  <span className="px-1.5 py-0.5 bg-green-900/40 border border-green-800/60 text-green-400 text-xs rounded">Shared with Kitchen FSE</span>
                                )}
                              </div>
                              <p className="text-gray-500 text-xs mt-0.5">{mod.desc}</p>
                              {hasAccess && !completed && slideProgress > 0 && (
                                <div className="mt-1.5 flex items-center gap-2">
                                  <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-teal-500/60 rounded-full" style={{ width: `${slideProgress * 100}%` }} />
                                  </div>
                                  <span className="text-gray-500 text-xs flex-shrink-0">{completedSlides.length}/{mod.slides.length} slides</span>
                                </div>
                              )}
                              {hasAccess && locked && unlockDate && (
                                <p className="text-xs text-yellow-600 mt-1">
                                  Unlocks {unlockDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — 3-day wait
                                </p>
                              )}
                              {hasAccess && locked && !unlockDate && (
                                <p className="text-xs text-gray-500 mt-1">Complete the previous module first</p>
                              )}
                              {!hasAccess && (
                                <p className="text-xs text-gray-600 mt-1">Enrollment opens soon</p>
                              )}
                            </div>
                            <div className="flex-shrink-0">
                              {accessible && (
                                <Link
                                  href={`/training/${mod.id}`}
                                  className="px-3 py-1.5 bg-teal-700 hover:bg-teal-600 text-white text-xs font-semibold rounded transition-colors"
                                >
                                  {completed ? 'Review' : slideProgress > 0 ? 'Continue' : 'Start'}
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Not yet built → outline card
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
                                <span className="px-1.5 py-0.5 bg-green-900/40 border border-green-800/60 text-green-400 text-xs rounded">Content Ready — Shared with Kitchen FSE</span>
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
                                <span className="text-teal-500/60 flex-shrink-0">{ci + 1}.</span>{ch}
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
