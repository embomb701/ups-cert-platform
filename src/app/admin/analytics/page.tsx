import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { COURSES } from '@/data/courses';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Admin — Analytics' };
export const dynamic = 'force-dynamic';

const ACCESS_KEY_TO_COURSE = Object.fromEntries(COURSES.map((c) => [c.accessKey, c]));

const LEVEL_TO_COURSE: Record<string, string> = {
  jr_fse: 'UPS FSE',
  jr_kitchen_fse: 'Kitchen FSE',
  jr_hvac_fse: 'HVAC FSE',
  jr_gen_fse: 'Generator FSE',
  jr_dc_cft: 'Data Center CFT',
  jr_solar_fse: 'Solar/BESS FSE',
  jr_ev_tech: 'EV Charging Tech',
  jr_dcp_tech: 'DC Plant Tech',
  jr_battery_tech: 'Battery Tech',
  jr_dc_engineer: 'DC Engineer',
  jr_marine_tech: 'Marine Tech',
  jr_pool_tech: 'Pool Equipment Tech',
  jr_hvac_tech: 'HVAC Tech',
  jr_solar_inst: 'Solar Installer',
  jr_wind_tech: 'Wind Turbine Tech',
  jr_elevator_tech: 'Elevator Tech',
  jr_fire_alarm_tech: 'Fire Alarm Tech',
  jr_bmet_tech: 'BMET',
  jr_bas_tech: 'BAS Tech',
  jr_ref_tech: 'Ref Tech',
  jr_plc_tech: 'PLC Tech',
  jr_security_tech: 'Security Tech',
  jr_field_pm: 'Field PM',
  jr_pump_tech: 'Pump Tech',
  jr_industrial_ref: 'Industrial Ref',
  jr_dc_ops: 'DC Ops Manager',
  jr_building_cx: 'Building Cx',
  jr_telecom_tech: 'Telecom OSP',
  fse: 'UPS FSE (Proctored)',
  fse_ai: 'UPS FSE (AI Proctored)',
};

function pct(num: number, den: number): string {
  if (den === 0) return '—';
  return `${Math.round((num / den) * 100)}%`;
}

export default async function AdminAnalyticsPage() {
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
  if (!isAdmin) redirect('/dashboard');

  // Parallel data fetches
  const [certsSnap, attemptsSnap, enrollSnap, employerOrdersSnap] = await Promise.all([
    adminDb.collection('certificates').get(),
    adminDb.collection('examAttempts').get(),
    adminDb.collectionGroup('examAccess').where('granted', '==', true).get(),
    adminDb.collection('employerOrders').get(),
  ]);

  // ── Certificates ────────────────────────────────────────────────
  const certsByLevel: Record<string, { valid: number; revoked: number; review: number }> = {};
  certsSnap.forEach((doc) => {
    const d = doc.data();
    const key = d.examLevel as string ?? 'unknown';
    if (!certsByLevel[key]) certsByLevel[key] = { valid: 0, revoked: 0, review: 0 };
    if (d.status === 'valid') certsByLevel[key].valid++;
    else if (d.status === 'revoked') certsByLevel[key].revoked++;
    else certsByLevel[key].review++;
  });
  const totalCerts = certsSnap.size;
  const validCerts = certsSnap.docs.filter((d) => d.data().status === 'valid').length;

  // ── Exam attempts ───────────────────────────────────────────────
  const attemptsByLevel: Record<string, { total: number; passed: number; completed: number }> = {};
  attemptsSnap.forEach((doc) => {
    const d = doc.data();
    const key = d.examLevel as string ?? 'unknown';
    if (!attemptsByLevel[key]) attemptsByLevel[key] = { total: 0, passed: 0, completed: 0 };
    attemptsByLevel[key].total++;
    if (d.passed === true) attemptsByLevel[key].passed++;
    if (d.status === 'completed') attemptsByLevel[key].completed++;
  });
  const totalAttempts = attemptsSnap.size;

  // ── Enrollments ─────────────────────────────────────────────────
  const enrollByKey: Record<string, number> = {};
  enrollSnap.forEach((doc) => {
    const key = doc.id;
    enrollByKey[key] = (enrollByKey[key] ?? 0) + 1;
  });
  const totalEnrollments = enrollSnap.size;

  // ── Employer orders ─────────────────────────────────────────────
  const productRevenue: Record<string, { count: number; revenue: number }> = {};
  employerOrdersSnap.forEach((doc) => {
    const d = doc.data();
    const product = d.product as string ?? 'unknown';
    const amount = typeof d.amount === 'number' ? d.amount : 0;
    if (!productRevenue[product]) productRevenue[product] = { count: 0, revenue: 0 };
    productRevenue[product].count++;
    productRevenue[product].revenue += amount;
  });
  const totalRevenue = Object.values(productRevenue).reduce((s, v) => s + v.revenue, 0);

  // ── Build combined course rows ──────────────────────────────────
  const allLevels = new Set([
    ...Object.keys(certsByLevel),
    ...Object.keys(attemptsByLevel),
  ]);
  const rows = [...allLevels]
    .map((level) => ({
      level,
      label: LEVEL_TO_COURSE[level] ?? level,
      certs: certsByLevel[level]?.valid ?? 0,
      revoked: certsByLevel[level]?.revoked ?? 0,
      attempts: attemptsByLevel[level]?.total ?? 0,
      completed: attemptsByLevel[level]?.completed ?? 0,
      passed: attemptsByLevel[level]?.passed ?? 0,
    }))
    .sort((a, b) => b.certs - a.certs || b.attempts - a.attempts);

  const enrollRows = Object.entries(enrollByKey)
    .map(([key, count]) => ({
      key,
      label: ACCESS_KEY_TO_COURSE[key]?.shortTitle ?? key,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <section className="section-pad">
      <div className="container-site max-w-6xl mx-auto space-y-8">
        <div>
          <Link href="/admin" className="text-xs text-gray-500 hover:text-gray-300 mb-4 block">&larr; Admin Dashboard</Link>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Enrollment, pass rates, and revenue — live from Firestore.</p>
        </div>

        {/* Summary stat row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Valid Certificates', value: validCerts.toLocaleString(), sub: `${totalCerts} total` },
            { label: 'Exam Attempts', value: totalAttempts.toLocaleString(), sub: '' },
            { label: 'Enrolled Seats', value: totalEnrollments.toLocaleString(), sub: 'granted access docs' },
            { label: 'Employer Revenue', value: totalRevenue > 0 ? `$${(totalRevenue / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })}` : `${employerOrdersSnap.size} orders`, sub: '' },
          ].map((s) => (
            <div key={s.label} className="card-dark p-5 text-center">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              {s.sub && <p className="text-xs text-gray-600 mt-0.5">{s.sub}</p>}
            </div>
          ))}
        </div>

        {/* Certificates & Pass Rates table */}
        <div className="card-dark overflow-x-auto">
          <div className="p-5 border-b border-gray-800">
            <h2 className="text-sm font-semibold text-white">Certificates &amp; Pass Rates by Course</h2>
            <p className="text-xs text-gray-500 mt-0.5">Grouped by exam level. Pass rate = passed attempts / completed attempts.</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold">Course</th>
                <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold">Certs</th>
                <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold">Revoked</th>
                <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold">Attempts</th>
                <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold">Passed</th>
                <th className="text-right px-5 py-3 text-xs text-gray-500 font-semibold">Pass Rate</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-xs text-gray-600">No data yet</td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.level} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="px-5 py-3 text-gray-200 font-medium">{row.label}</td>
                    <td className="px-4 py-3 text-right text-emerald-400 font-semibold">{row.certs}</td>
                    <td className="px-4 py-3 text-right text-red-400">{row.revoked || '—'}</td>
                    <td className="px-4 py-3 text-right text-gray-400">{row.attempts}</td>
                    <td className="px-4 py-3 text-right text-gray-400">{row.passed}</td>
                    <td className="px-5 py-3 text-right font-semibold text-white">{pct(row.passed, row.completed)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Enrollment table */}
        {enrollRows.length > 0 && (
          <div className="card-dark overflow-x-auto">
            <div className="p-5 border-b border-gray-800">
              <h2 className="text-sm font-semibold text-white">Enrollment by Course</h2>
              <p className="text-xs text-gray-500 mt-0.5">Count of users with granted access per course (examAccess collection).</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold">Course</th>
                  <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold">Access Key</th>
                  <th className="text-right px-5 py-3 text-xs text-gray-500 font-semibold">Enrolled</th>
                </tr>
              </thead>
              <tbody>
                {enrollRows.map((row) => (
                  <tr key={row.key} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="px-5 py-3 text-gray-200 font-medium">{row.label}</td>
                    <td className="px-5 py-3 font-mono text-xs text-gray-500">{row.key}</td>
                    <td className="px-5 py-3 text-right text-blue-400 font-semibold">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Employer orders */}
        {Object.keys(productRevenue).length > 0 && (
          <div className="card-dark overflow-x-auto">
            <div className="p-5 border-b border-gray-800">
              <h2 className="text-sm font-semibold text-white">Employer Orders by Product</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold">Product</th>
                  <th className="text-right px-5 py-3 text-xs text-gray-500 font-semibold">Orders</th>
                  <th className="text-right px-5 py-3 text-xs text-gray-500 font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(productRevenue)
                  .sort((a, b) => b[1].revenue - a[1].revenue)
                  .map(([product, stats]) => (
                    <tr key={product} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                      <td className="px-5 py-3 font-mono text-xs text-gray-300">{product}</td>
                      <td className="px-5 py-3 text-right text-gray-400">{stats.count}</td>
                      <td className="px-5 py-3 text-right text-emerald-400 font-semibold">
                        {stats.revenue > 0 ? `$${(stats.revenue / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '—'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-xs text-gray-600 text-right">Data refreshes on every page load.</p>
      </div>
    </section>
  );
}
