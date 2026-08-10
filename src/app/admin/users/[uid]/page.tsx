import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Admin — User Detail' };
export const dynamic = 'force-dynamic';

function fmtTs(ts: unknown): string {
  if (!ts) return '—';
  try {
    const d = typeof (ts as { toDate?: () => Date }).toDate === 'function'
      ? (ts as { toDate: () => Date }).toDate()
      : new Date(ts as string);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch { return '—'; }
}

export default async function AdminUserDetailPage({ params }: { params: Promise<{ uid: string }> }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('firebase-token')?.value;
  if (!token) redirect('/login');

  let adminUid: string;
  let adminEmail = '';
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    adminUid = decoded.uid;
    adminEmail = decoded.email?.toLowerCase() ?? '';
  } catch {
    redirect('/login');
  }

  if (!(await checkIsAdmin(adminUid, adminEmail))) redirect('/dashboard');

  const { uid } = await params;

  // Load user record + Firestore user doc + subcollections in parallel
  const [userRecord, userDocSnap, accessSnap, progressSnap, certsSnap, attemptsSnap, purchasesSnap] =
    await Promise.all([
      adminAuth.getUser(uid).catch(() => null),
      adminDb.collection('users').doc(uid).get(),
      adminDb.collection('users').doc(uid).collection('examAccess').get(),
      adminDb.collection('users').doc(uid).collection('trainingProgress').get(),
      adminDb.collection('certificates').where('userId', '==', uid).get(),
      adminDb.collection('examAttempts').where('userId', '==', uid).orderBy('createdAt', 'desc').limit(20).get(),
      adminDb.collection('purchases').where('userId', '==', uid).orderBy('createdAt', 'desc').limit(20).get(),
    ]);

  if (!userRecord) {
    return (
      <section className="section-pad">
        <div className="container-site max-w-4xl mx-auto">
          <Link href="/admin/users" className="text-xs text-gray-500 hover:text-gray-300 mb-4 block">&larr; Users</Link>
          <p className="text-red-400 text-sm">User not found: {uid}</p>
        </div>
      </section>
    );
  }

  const userData = userDocSnap.data() ?? {};
  const completedModules = progressSnap.docs.filter((d) => d.data().passed).length;
  const totalModules = progressSnap.size;

  return (
    <section className="section-pad">
      <div className="container-site max-w-4xl mx-auto space-y-6">
        <div>
          <Link href="/admin/users" className="text-xs text-gray-500 hover:text-gray-300 mb-4 block">&larr; All Users</Link>
          <div className="flex items-start gap-4">
            {userRecord.photoURL && (
              <img src={userRecord.photoURL} alt="" className="w-12 h-12 rounded-full flex-shrink-0" />
            )}
            <div>
              <h1 className="text-xl font-bold text-white">{userRecord.displayName || '(no name)'}</h1>
              <p className="text-gray-400 text-sm">{userRecord.email}</p>
              <p className="text-gray-600 text-xs font-mono mt-0.5">{uid}</p>
            </div>
          </div>
        </div>

        {/* Account flags */}
        <div className="card-dark p-5">
          <h2 className="text-sm font-semibold text-white mb-3">Account</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-gray-500 mb-0.5">Created</p>
              <p className="text-gray-200">{fmtTs(userRecord.metadata.creationTime)}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">Last sign-in</p>
              <p className="text-gray-200">{fmtTs(userRecord.metadata.lastSignInTime)}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">Email verified</p>
              <p className={userRecord.emailVerified ? 'text-emerald-400' : 'text-yellow-400'}>
                {userRecord.emailVerified ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">Trial drip step</p>
              <p className="text-gray-200">{userData.trialDripStep ?? '—'}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">Email reminders</p>
              <p className={userData.emailRemindersEnabled === false ? 'text-red-400' : 'text-emerald-400'}>
                {userData.emailRemindersEnabled === false ? 'Unsubscribed' : 'Enabled'}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-0.5">Module progress</p>
              <p className="text-gray-200">{completedModules} / {totalModules} passed</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/admin/access?uid=${uid}&email=${encodeURIComponent(userRecord.email ?? '')}`}
              className="text-xs px-3 py-1.5 rounded border border-indigo-700/60 bg-indigo-900/30 text-indigo-400 hover:bg-indigo-900/50 transition-colors"
            >
              Grant access →
            </Link>
            <a
              href={`/p/${uid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded border border-gray-700 bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              Public profile ↗
            </a>
          </div>
        </div>

        {/* Access grants */}
        <div className="card-dark overflow-x-auto">
          <div className="p-5 border-b border-gray-800">
            <h2 className="text-sm font-semibold text-white">Access Grants ({accessSnap.size})</h2>
          </div>
          {accessSnap.empty ? (
            <p className="px-5 py-4 text-xs text-gray-600">No access grants</p>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Key</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Granted</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Source</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Granted at</th>
                </tr>
              </thead>
              <tbody>
                {accessSnap.docs.map((doc) => {
                  const d = doc.data();
                  return (
                    <tr key={doc.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                      <td className="px-5 py-2.5 font-mono text-gray-300">{doc.id}</td>
                      <td className="px-5 py-2.5">
                        <span className={d.granted ? 'text-emerald-400' : 'text-gray-500'}>
                          {d.granted ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-5 py-2.5 text-gray-500">
                        {d.grantedByAdmin ? 'Admin' : d.purchaseId ? 'Purchase' : d.free ? 'Free' : '—'}
                      </td>
                      <td className="px-5 py-2.5 text-gray-500">{fmtTs(d.grantedAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Certificates */}
        <div className="card-dark overflow-x-auto">
          <div className="p-5 border-b border-gray-800">
            <h2 className="text-sm font-semibold text-white">Certificates ({certsSnap.size})</h2>
          </div>
          {certsSnap.empty ? (
            <p className="px-5 py-4 text-xs text-gray-600">No certificates</p>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Title</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Status</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Score</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Issued</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Cert #</th>
                </tr>
              </thead>
              <tbody>
                {certsSnap.docs.map((doc) => {
                  const d = doc.data();
                  return (
                    <tr key={doc.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                      <td className="px-5 py-2.5 text-gray-200">{d.certificationTitle as string}</td>
                      <td className="px-5 py-2.5">
                        <span className={d.status === 'valid' ? 'text-emerald-400' : 'text-red-400'}>
                          {d.status as string}
                        </span>
                      </td>
                      <td className="px-5 py-2.5 text-gray-400">{d.score !== undefined ? `${Math.round(d.score as number)}%` : '—'}</td>
                      <td className="px-5 py-2.5 text-gray-500">{fmtTs(d.issuedAt)}</td>
                      <td className="px-5 py-2.5 font-mono text-gray-600">
                        <Link href={`/certificate/${d.certificateNumber}`} target="_blank" className="hover:text-blue-400">
                          {d.certificateNumber as string}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Exam attempts */}
        <div className="card-dark overflow-x-auto">
          <div className="p-5 border-b border-gray-800">
            <h2 className="text-sm font-semibold text-white">Exam Attempts (last 20)</h2>
          </div>
          {attemptsSnap.empty ? (
            <p className="px-5 py-4 text-xs text-gray-600">No exam attempts</p>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Level</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Score</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Passed</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {attemptsSnap.docs.map((doc) => {
                  const d = doc.data();
                  return (
                    <tr key={doc.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                      <td className="px-5 py-2.5 font-mono text-gray-300">{d.examLevel as string}</td>
                      <td className="px-5 py-2.5 text-gray-400">{d.score !== undefined ? `${Math.round(d.score as number)}%` : '—'}</td>
                      <td className="px-5 py-2.5">
                        <span className={d.passed ? 'text-emerald-400' : 'text-red-400'}>
                          {d.passed ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-5 py-2.5 text-gray-500">{fmtTs(d.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Purchases */}
        <div className="card-dark overflow-x-auto">
          <div className="p-5 border-b border-gray-800">
            <h2 className="text-sm font-semibold text-white">Purchases (last 20)</h2>
          </div>
          {purchasesSnap.empty ? (
            <p className="px-5 py-4 text-xs text-gray-600">No purchases</p>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Product</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Amount</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Status</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {purchasesSnap.docs.map((doc) => {
                  const d = doc.data();
                  const amount = typeof d.amount === 'number' ? `$${(d.amount / 100).toFixed(2)}` : '—';
                  const statusColor = d.status === 'complete' ? 'text-emerald-400' :
                    d.status === 'refunded' ? 'text-red-400' :
                    d.status === 'expired' ? 'text-gray-600' : 'text-yellow-400';
                  return (
                    <tr key={doc.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                      <td className="px-5 py-2.5 font-mono text-gray-300">{d.productId as string}</td>
                      <td className="px-5 py-2.5 text-gray-400">{amount}</td>
                      <td className={`px-5 py-2.5 font-semibold ${statusColor}`}>{d.status as string}</td>
                      <td className="px-5 py-2.5 text-gray-500">{fmtTs(d.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </section>
  );
}
