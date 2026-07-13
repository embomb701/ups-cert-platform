import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { ALL_MODULES, getModule } from '@/data/index';
import { COURSES, COURSE_OUTLINES } from '@/data/courses';
import Link from 'next/link';

// Literal class maps (Tailwind cannot see dynamically built class names)
const COLOR: Record<string, {
  crumb: string; bannerBox: string; bannerTitle: string; link: string;
  bar: string; track: string; chapterNum: string; sharedBadge: string;
}> = {
  violet: { crumb: 'text-violet-400', bannerBox: 'border-violet-800/60 bg-violet-950/10', bannerTitle: 'text-violet-300', link: 'text-violet-400 hover:text-violet-300', bar: 'bg-violet-500', track: 'text-violet-400/90', chapterNum: 'text-violet-500/60', sharedBadge: 'bg-green-900/40 border-green-800/60 text-green-400' },
  yellow: { crumb: 'text-yellow-400', bannerBox: 'border-yellow-800/60 bg-yellow-950/10', bannerTitle: 'text-yellow-300', link: 'text-yellow-400 hover:text-yellow-300', bar: 'bg-yellow-500', track: 'text-yellow-400/90', chapterNum: 'text-yellow-500/60', sharedBadge: 'bg-green-900/40 border-green-800/60 text-green-400' },
  green: { crumb: 'text-green-400', bannerBox: 'border-green-800/60 bg-green-950/10', bannerTitle: 'text-green-300', link: 'text-green-400 hover:text-green-300', bar: 'bg-green-500', track: 'text-green-400/90', chapterNum: 'text-green-500/60', sharedBadge: 'bg-green-900/40 border-green-800/60 text-green-400' },
  sky: { crumb: 'text-sky-400', bannerBox: 'border-sky-800/60 bg-sky-950/10', bannerTitle: 'text-sky-300', link: 'text-sky-400 hover:text-sky-300', bar: 'bg-sky-500', track: 'text-sky-400/90', chapterNum: 'text-sky-500/60', sharedBadge: 'bg-green-900/40 border-green-800/60 text-green-400' },
  rose: { crumb: 'text-rose-400', bannerBox: 'border-rose-800/60 bg-rose-950/10', bannerTitle: 'text-rose-300', link: 'text-rose-400 hover:text-rose-300', bar: 'bg-rose-500', track: 'text-rose-400/90', chapterNum: 'text-rose-500/60', sharedBadge: 'bg-green-900/40 border-green-800/60 text-green-400' },
};

export async function OutlinePortal({ courseId }: { courseId: string }) {
  const course = COURSES.find((c) => c.id === courseId);
  const outline = COURSE_OUTLINES[courseId];
  if (!course || !outline) redirect('/training');

  const c = COLOR[course.color] ?? COLOR.violet;

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
  await checkIsAdmin(uid, userEmail); // auth check parity with other portals

  // Foundation progress carries over from every program
  const progressSnap = await adminDb.collection('users').doc(uid).collection('trainingProgress').get();
  const done = new Set<string>();
  progressSnap.forEach((doc) => {
    const d = doc.data();
    if (d.passed && d.completedAt) done.add(doc.id);
  });
  const sharedComplete = ALL_MODULES.filter((m) => m.num <= 10 && done.has(m.id)).length;
  const sharedReady = outline.modules.filter((m) => m.sharedFrom || getModule(m.id)).length;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/training" className="hover:text-gray-300 transition-colors">Training</Link>
          <span>/</span>
          <span className={c.crumb}>{course.shortTitle}</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">{course.title}</h1>
          <p className="text-gray-400 mt-1 text-sm">
            {course.totalModules} modules · 10 shared foundation{sharedReady > 0 ? ` + ${sharedReady} shared from other programs` : ''} · {course.certTitle} certification
          </p>
        </div>

        <div className={`rounded-xl border p-5 ${c.bannerBox}`}>
          <p className={`font-semibold mb-1 ${c.bannerTitle}`}>Coming Soon — Curriculum in Development</p>
          <p className="text-gray-400 text-sm">
            The foundation modules (1–10){sharedReady > 0 ? ` and ${sharedReady} modules shared from other programs` : ''} are already built.
            The remaining modules are outlined below and in development.
            <Link href="/training" className={`ml-2 underline ${c.link}`}>← Back to Training Hub</Link>
          </p>
        </div>

        {sharedComplete > 0 && (
          <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium text-sm">Foundation modules: {sharedComplete}/10 complete</span>
              <span className="text-gray-400 text-sm">{Math.round((sharedComplete / 10) * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${c.bar}`} style={{ width: `${(sharedComplete / 10) * 100}%` }} />
            </div>
            <p className="text-gray-500 text-xs mt-2">
              Foundation and shared-module progress carries over from every program — complete a module once, it counts everywhere.
            </p>
          </div>
        )}

        <div>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">Curriculum — Modules 11–{course.totalModules}</h2>
            <span className="px-2 py-0.5 bg-yellow-900/40 border border-yellow-700/60 text-yellow-400 text-xs rounded">Outline</span>
          </div>
          <div className="space-y-6">
            {outline.tracks.map((track) => (
              <div key={track}>
                <h3 className={`text-xs font-semibold uppercase tracking-widest mb-2 ${c.track}`}>{track}</h3>
                <div className="space-y-2">
                  {outline.modules.map((placeholder, idx) => {
                    if (placeholder.track !== track) return null;
                    return (
                      <details key={placeholder.id} className="rounded-lg border border-gray-800 bg-gray-900/30 group">
                        <summary className="flex items-center gap-4 p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                          <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold bg-gray-800 text-gray-500">
                            {idx + 11}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-gray-400 font-medium text-sm">{placeholder.title}</span>
                              {placeholder.sharedFrom ? (
                                <span className={`px-1.5 py-0.5 border text-xs rounded ${c.sharedBadge}`}>Content Ready — Shared</span>
                              ) : getModule(placeholder.id) ? (
                                <span className={`px-1.5 py-0.5 border text-xs rounded ${c.sharedBadge}`}>Content Ready</span>
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
                                <span className={`flex-shrink-0 ${c.chapterNum}`}>{ci + 1}.</span>{ch}
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
