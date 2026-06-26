import { redirect, notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { getModule } from '@/data/index';
import SlideWithTimer from '@/components/training/SlideWithTimer';
import Link from 'next/link';

interface Props {
  params: Promise<{ moduleId: string; slideIndex: string }>;
}

export default async function SlidePage({ params }: Props) {
  const { moduleId, slideIndex: slideIndexStr } = await params;
  const slideIndex = parseInt(slideIndexStr, 10);

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

  const accessDoc = await adminDb.collection('users').doc(uid).collection('examAccess').doc('training_portal').get();
  if (!isAdmin && (!accessDoc.exists || !accessDoc.data()?.granted)) redirect('/training');

  const mod = getModule(moduleId);
  if (!mod) notFound();
  if (isNaN(slideIndex) || slideIndex < 0 || slideIndex >= mod.slides.length) notFound();

  const slide = mod.slides[slideIndex];
  const isLast = slideIndex === mod.slides.length - 1;
  const nextUrl = isLast ? `/training/${moduleId}/test` : `/training/${moduleId}/slide/${slideIndex + 1}`;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/training" className="hover:text-gray-300">Training</Link>
          <span>/</span>
          <Link href={`/training/${moduleId}`} className="hover:text-gray-300">Module {mod.num}: {mod.title}</Link>
          <span>/</span>
          <span className="text-gray-300">Slide {slideIndex + 1} of {mod.slides.length}</span>
        </nav>

        <div className="flex gap-2">
          {mod.slides.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < slideIndex ? 'bg-green-500' : i === slideIndex ? 'bg-blue-500' : 'bg-gray-700'}`} />
          ))}
        </div>

        <SlideWithTimer
          moduleId={moduleId}
          slideIndex={slideIndex}
          slide={slide}
          nextUrl={nextUrl}
          skipTimer={isAdmin}
        />
      </div>
    </div>
  );
}
