import { redirect, notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { getModule } from '@/data/index';
import ModuleTestClient from '@/components/training/ModuleTestClient';
import Link from 'next/link';

interface Props {
  params: Promise<{ moduleId: string }>;
}

export default async function ModuleTestPage({ params }: Props) {
  const { moduleId } = await params;

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

  const accessDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('training_portal').get();
  if (!accessDoc.exists || !accessDoc.data()?.granted) redirect('/training');

  const mod = getModule(moduleId);
  if (!mod) notFound();

  // Check if all slides completed
  const progressDoc = await adminDb.collection('users').doc(uid).collection('trainingProgress').doc(moduleId).get();
  const data = progressDoc.data() ?? {};
  const completedSlides: number[] = data.completedSlides ?? [];
  const allSlidesComplete = mod.slides.every((_, i) => completedSlides.includes(i));

  if (!allSlidesComplete) {
    const nextSlide = mod.slides.findIndex((_, i) => !completedSlides.includes(i));
    redirect(`/training/${moduleId}/slide/${nextSlide}`);
  }

  // Check once-per-day
  const lastTestAt = data.lastTestAt;
  let cooldownMessage = '';
  if (lastTestAt) {
    const lastDate = lastTestAt.toDate ? lastTestAt.toDate() : new Date(lastTestAt);
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    if (lastDate >= midnight) {
      const tomorrow = new Date(midnight.getTime() + 24 * 60 * 60 * 1000);
      cooldownMessage = `You already took this test today. You may retake it after ${tomorrow.toLocaleDateString()} at midnight.`;
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/training" className="hover:text-gray-300">Training</Link>
          <span>/</span>
          <Link href={`/training/${moduleId}`} className="hover:text-gray-300">Module {mod.num}: {mod.title}</Link>
          <span>/</span>
          <span className="text-gray-300">Module Test</span>
        </nav>

        {cooldownMessage ? (
          <div className="rounded-lg bg-yellow-900/30 border border-yellow-700 p-8 text-center space-y-4">
            <p className="text-yellow-300 font-semibold text-lg">{cooldownMessage}</p>
            <Link href="/training" className="inline-block px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              Back to Training Portal
            </Link>
          </div>
        ) : (
          <ModuleTestClient
            moduleId={moduleId}
            moduleTitle={`Module ${mod.num}: ${mod.title}`}
            questions={mod.test}
          />
        )}
      </div>
    </div>
  );
}
