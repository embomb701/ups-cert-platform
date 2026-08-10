import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { PostJobForm } from '@/components/jobs/PostJobForm';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Post a Job — Mastering Field Service',
  robots: { index: false },
};

export default async function PostJobPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('firebase-token')?.value;
  if (!token) redirect('/login?redirect=/jobs/post');

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
  } catch {
    redirect('/login?redirect=/jobs/post');
  }

  const orderSnap = await adminDb
    .collection('employerOrders')
    .where('userId', '==', uid)
    .where('status', '==', 'active')
    .limit(1)
    .get();

  const hasEmployerPack = !orderSnap.empty;

  if (!hasEmployerPack) {
    return (
      <div className="min-h-screen bg-gray-900 py-10 px-4">
        <div className="max-w-xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-white">Post a Job</h1>
          <div className="rounded-xl border border-gray-700 bg-gray-800/40 p-8 text-center space-y-4">
            <p className="text-gray-400 text-sm">
              Job posting is available to employers with an active seat pack.
            </p>
            <p className="text-gray-500 text-xs">
              Purchase a 5-seat or 10-seat employer pack from the{' '}
              <a href="/training" className="text-blue-400 underline hover:text-blue-300">Training Portal</a>{' '}
              to access job posting and team management features.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">

        <div>
          <a href="/jobs" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            ← Back to Job Board
          </a>
          <h1 className="text-2xl font-bold text-white mt-3 mb-1">Post a Job</h1>
          <p className="text-gray-500 text-sm">
            Your listing will be visible to all platform users. Applicants submit their contact info and an optional note — you reach out directly.
          </p>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-800/30 p-6">
          <PostJobForm />
        </div>

      </div>
    </div>
  );
}
