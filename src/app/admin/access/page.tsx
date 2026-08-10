import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import Link from 'next/link';
import { GrantAccessForm } from './GrantAccessForm';

export const metadata: Metadata = { title: 'Admin — Grant Access' };
export const dynamic = 'force-dynamic';

export default async function AdminGrantAccessPage() {
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

  if (!(await checkIsAdmin(uid, userEmail))) redirect('/dashboard');

  return (
    <section className="section-pad">
      <div className="container-site max-w-3xl mx-auto space-y-6">
        <div>
          <Link href="/admin" className="text-xs text-gray-500 hover:text-gray-300 mb-4 block">&larr; Admin Dashboard</Link>
          <h1 className="text-xl font-bold text-white">Grant Access</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manually grant a user access to a training course or exam. Use for support cases, refund resolutions, and comps.
          </p>
        </div>

        <div className="card-dark p-4 bg-amber-950/10 border-amber-900/30">
          <p className="text-xs text-amber-400 font-semibold">All grants are logged</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Every access grant records your email, the target UID, the access key, and a timestamp in the audit log.
          </p>
        </div>

        <GrantAccessForm />
      </div>
    </section>
  );
}
