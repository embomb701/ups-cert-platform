import { redirect, notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { getModule } from '@/data/index';
import { hasTrainingAccess } from '@/lib/utils/trainingAccess';
import SlideWithTimer from '@/components/training/SlideWithTimer';
import Link from 'next/link';

interface Props {
  params: Promise<{ moduleId: string; slideIndex: string }>;
}

export default async function SlidePage({ params }: Props) {
  const { moduleId, slideIndex: slideIndexStr } = await params;
  const slideIndex = parseInt(slideIndexStr, 10);

  const mod = getModule(moduleId);
  if (!mod) notFound();
  if (isNaN(slideIndex) || slideIndex < 0 || slideIndex >= mod.slides.length) notFound();

  const isFreeTrialSlide = mod.num <= 3 && slideIndex === 0;

  const cookieStore = await cookies();
  const token = cookieStore.get('firebase-token')?.value;

  // Unauthenticated: allow free trial slide 0 only
  if (!token && !isFreeTrialSlide) redirect('/login');

  let uid = '';
  let userEmail = '';
  let isAuthenticated = false;

  if (token) {
    try {
      const decoded = await adminAuth.verifyIdToken(token);
      uid = decoded.uid;
      userEmail = decoded.email?.toLowerCase() ?? '';
      isAuthenticated = true;
    } catch {
      if (!isFreeTrialSlide) redirect('/login');
    }
  }

  const isGuest = !isAuthenticated;
  const isAdmin = isAuthenticated ? await checkIsAdmin(uid, userEmail) : false;
  const hasAccess = !isGuest && (isAdmin || (await hasTrainingAccess(uid, mod)));

  if (!isGuest && !hasAccess && !isFreeTrialSlide) redirect('/training');

  const slide = mod.slides[slideIndex];
  const isLast = slideIndex === mod.slides.length - 1;
  // After the free slide, return to module overview (which shows the upgrade CTA)
  const nextUrl = (isLast || (!hasAccess && isFreeTrialSlide))
    ? `/training/${moduleId}`
    : `/training/${moduleId}/slide/${slideIndex + 1}`;

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

        {isGuest && (
          <div className="rounded-lg bg-indigo-900/20 border border-indigo-800/60 px-4 py-3 flex items-center justify-between gap-4">
            <p className="text-xs text-gray-400">
              <span className="text-indigo-400 font-semibold">Free preview</span> · Create a free account to track progress and unlock all lessons
            </p>
            <Link href="/login?signup=1" className="flex-shrink-0 text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors">
              Sign up free
            </Link>
          </div>
        )}

        <SlideWithTimer
          moduleId={moduleId}
          slideIndex={slideIndex}
          slide={slide}
          nextUrl={nextUrl}
          skipTimer={isAdmin}
          isGuest={isGuest}
        />
      </div>
    </div>
  );
}
