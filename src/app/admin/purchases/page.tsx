import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { STRIPE_PRODUCTS } from '@/lib/stripe/client';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Admin — Purchases' };
export const dynamic = 'force-dynamic';

const STATUS_BADGE: Record<string, string> = {
  completed: 'bg-emerald-900/40 border-emerald-800/60 text-emerald-400',
  pending:   'bg-yellow-900/40 border-yellow-800/60 text-yellow-400',
  failed:    'bg-red-900/40 border-red-800/60 text-red-400',
};

function formatAmount(cents: number): string {
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatTs(ts: unknown): string {
  if (!ts) return '—';
  try {
    const d = (ts as { toDate: () => Date }).toDate?.() ?? new Date(ts as string);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return '—';
  }
}

export default async function AdminPurchasesPage({
  searchParams,
}: {
  searchParams: { status?: string };
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

  const statusFilter = searchParams.status;
  let query = adminDb.collection('purchases').orderBy('createdAt', 'desc').limit(300) as FirebaseFirestore.Query;
  if (statusFilter && statusFilter !== 'all') {
    query = adminDb.collection('purchases').where('status', '==', statusFilter).orderBy('createdAt', 'desc').limit(300);
  }

  const snap = await query.get();

  const purchases = snap.docs.map((doc) => {
    const d = doc.data();
    const productId = d.productId as string ?? '';
    const productName = (STRIPE_PRODUCTS as Record<string, { shortName: string }>)[productId]?.shortName ?? productId;
    return {
      id: doc.id,
      email: d.email as string ?? '—',
      productId,
      productName,
      amount: typeof d.amount === 'number' ? d.amount : 0,
      status: d.status as string ?? 'pending',
      createdAt: d.createdAt,
      sessionId: d.stripeCheckoutSessionId as string ?? d.id,
    };
  });

  const totalRevenue = purchases
    .filter((p) => p.status === 'completed')
    .reduce((s, p) => s + p.amount, 0);

  const filters = ['all', 'completed', 'pending', 'failed'];

  return (
    <section className="section-pad">
      <div className="container-site max-w-6xl mx-auto space-y-6">
        <div>
          <Link href="/admin" className="text-xs text-gray-500 hover:text-gray-300 mb-4 block">&larr; Admin Dashboard</Link>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-xl font-bold text-white">Purchases</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {purchases.length} shown · {formatAmount(totalRevenue)} completed revenue
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <Link
                  key={f}
                  href={f === 'all' ? '/admin/purchases' : `/admin/purchases?status=${f}`}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors capitalize ${
                    (statusFilter ?? 'all') === f
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {f}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="card-dark overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Date</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Email</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Product</th>
                <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold">Amount</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Status</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Session ID</th>
              </tr>
            </thead>
            <tbody>
              {purchases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-xs text-gray-600">No purchases found</td>
                </tr>
              ) : (
                purchases.map((p) => (
                  <tr key={p.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{formatTs(p.createdAt)}</td>
                    <td className="px-4 py-3 text-gray-300 text-xs">{p.email}</td>
                    <td className="px-4 py-3 text-gray-200 text-xs font-medium">{p.productName}</td>
                    <td className="px-4 py-3 text-right text-xs font-semibold text-white">
                      {p.amount > 0 ? formatAmount(p.amount) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded border ${STATUS_BADGE[p.status] ?? STATUS_BADGE.pending}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600 max-w-[160px] truncate" title={p.sessionId}>
                      {p.sessionId}
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
