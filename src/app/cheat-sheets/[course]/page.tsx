import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { COURSES } from '@/data/courses';
import { COURSE_SEQUENCES } from '@/data';
import Link from 'next/link';
import { CheatSheetActions } from '@/components/CheatSheetActions';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }) {
  const { course: courseId } = await params;
  const course = COURSES.find((c) => c.id === courseId);
  return { title: course ? `${course.shortTitle} — Field Cheat Sheet` : 'Field Cheat Sheet' };
}

export default async function CheatSheetPage({ params }: { params: Promise<{ course: string }> }) {
  const { course: courseId } = await params;
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) redirect('/training');

  const seq = COURSE_SEQUENCES[course.accessKey] ?? [];
  if (seq.length === 0) redirect('/training');

  const cookieStore = await cookies();
  const token = cookieStore.get('firebase-token')?.value;
  if (!token) redirect(`/training/${course.id}`);

  let uid: string;
  let userEmail = '';
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
    userEmail = decoded.email?.toLowerCase() ?? '';
  } catch {
    redirect(`/training/${course.id}`);
  }

  const isAdmin = await checkIsAdmin(uid, userEmail);
  let hasAccess = isAdmin || !!course.free;
  if (!hasAccess) {
    const accessDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc(course.accessKey).get();
    hasAccess = accessDoc.exists && accessDoc.data()?.granted === true;
  }
  if (!hasAccess) redirect(`/training/${course.id}`);

  const modules = [...seq].sort((a, b) => a.num - b.num);
  const generatedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 print:bg-white print:py-0">

      {/* Screen-only nav */}
      <div className="max-w-3xl mx-auto mb-6 print-hidden">
        <Link href={`/training/${course.id}`} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          ← Back to {course.shortTitle}
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-200 p-8 sm:p-10 print:rounded-none print:shadow-none print:border-0 print:p-0">

          {/* Header */}
          <div className="border-b-2 border-gray-800 pb-4 mb-6">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">
              Mastering Field Service Training Portal
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">{course.title} — Field Cheat Sheet</h1>
            <p className="text-xs text-gray-500 mt-1">
              {modules.length} modules · Generated {generatedDate} · For personal reference — not a substitute for full training
            </p>
          </div>

          {/* Module sections */}
          <div className="space-y-6">
            {modules.map((mod, idx) => {
              const points = mod.slides.flatMap((s) => s.keyPoints ?? []).filter(Boolean);
              if (points.length === 0) return null;
              return (
                <div key={mod.id} className="break-inside-avoid-page">
                  <h2 className="text-sm font-bold text-gray-900 flex items-baseline gap-2">
                    <span className="text-gray-400 font-mono text-xs">{String(idx + 1).padStart(2, '0')}</span>
                    {mod.title}
                  </h2>
                  <ul className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1">
                    {points.map((p, i) => (
                      <li key={i} className="text-xs text-gray-700 leading-relaxed flex gap-1.5">
                        <span className="text-gray-400 flex-shrink-0">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-200 mt-8 pt-4">
            <p className="text-xs text-gray-400">
              © Mastering Field Service Training Portal · fse-academy.com · This summary does not replace full course training or the certification exam.
            </p>
          </div>

        </div>
      </div>

      {/* Screen-only actions */}
      <div className="max-w-3xl mx-auto mt-8 print-hidden">
        <CheatSheetActions />
        <p className="text-center text-gray-600 text-xs mt-4">
          Use &quot;Print / Save as PDF&quot; to download a copy — select &quot;Save as PDF&quot; in the print dialog for a digital version.
        </p>
      </div>

    </div>
  );
}
