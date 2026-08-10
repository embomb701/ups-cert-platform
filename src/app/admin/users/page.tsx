import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Admin — Users' };
export const dynamic = 'force-dynamic';

function formatTs(ts: string | undefined): string {
  if (!ts) return '—';
  try {
    return new Date(ts).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '—';
  }
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
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

  const adminEmails = new Set(
    (process.env.ADMIN_EMAILS ?? '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
  );

  // Fetch Firebase Auth users (up to 1000) and Firestore admin flags in parallel
  const [listResult, firestoreAdminSnap] = await Promise.all([
    adminAuth.listUsers(1000),
    adminDb.collection('users').where('isAdmin', '==', true).get(),
  ]);

  const firestoreAdminUids = new Set(firestoreAdminSnap.docs.map((d) => d.id));

  const search = (searchParams.q ?? '').toLowerCase().trim();

  let users = listResult.users
    .map((u) => ({
      uid: u.uid,
      email: u.email ?? '',
      displayName: u.displayName ?? '',
      photoURL: u.photoURL ?? '',
      createdAt: u.metadata.creationTime,
      lastSignIn: u.metadata.lastSignInTime,
      emailVerified: u.emailVerified,
      disabled: u.disabled,
      isAdmin: adminEmails.has((u.email ?? '').toLowerCase()) || firestoreAdminUids.has(u.uid),
    }))
    .sort((a, b) => {
      if (!a.createdAt) return 1;
      if (!b.createdAt) return -1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  if (search) {
    users = users.filter(
      (u) =>
        u.email.toLowerCase().includes(search) ||
        u.displayName.toLowerCase().includes(search) ||
        u.uid.toLowerCase().includes(search),
    );
  }

  return (
    <section className="section-pad">
      <div className="container-site max-w-6xl mx-auto space-y-6">
        <div>
          <Link href="/admin" className="text-xs text-gray-500 hover:text-gray-300 mb-4 block">&larr; Admin Dashboard</Link>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-xl font-bold text-white">Users</h1>
              <p className="text-xs text-gray-500 mt-0.5">{users.length} shown</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <form method="GET" className="flex gap-2">
          <input
            name="q"
            defaultValue={search}
            placeholder="Search by email, name, or UID…"
            className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-600"
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
          >
            Search
          </button>
          {search && (
            <Link href="/admin/users" className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors">
              Clear
            </Link>
          )}
        </form>

        <div className="card-dark overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Email</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Name</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Created</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Last Sign-in</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Flags</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">UID</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-xs text-gray-600">No users found</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.uid} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="px-4 py-3">
                      <span className={`text-sm ${u.emailVerified ? 'text-gray-200' : 'text-gray-500'}`}>
                        {u.email || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">{u.displayName || '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{formatTs(u.createdAt)}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{formatTs(u.lastSignIn)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {u.isAdmin && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-900/40 border border-indigo-700/60 text-indigo-400">Admin</span>
                        )}
                        {u.disabled && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-red-900/30 border border-red-800/60 text-red-400">Disabled</span>
                        )}
                        {!u.emailVerified && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-gray-800 border border-gray-700 text-gray-500">Unverified</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600 max-w-[140px] truncate" title={u.uid}>
                      {u.uid}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/users/${u.uid}`}
                        className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors whitespace-nowrap"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
