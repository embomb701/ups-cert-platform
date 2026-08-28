import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { formatDate } from '@/lib/utils/formatters';
import Link from 'next/link';
import { RevokeCertButton } from './RevokeCertButton';

export const metadata: Metadata = { title: 'Admin — Certificates' };
export const dynamic = 'force-dynamic';

const STATUS_BADGE: Record<string, string> = {
  valid:        'bg-emerald-900/40 border-emerald-800/60 text-emerald-400',
  revoked:      'bg-red-900/40 border-red-800/60 text-red-400',
  under_review: 'bg-yellow-900/40 border-yellow-800/60 text-yellow-400',
  expired:      'bg-gray-800 border-gray-700 text-gray-500',
};

const LEVEL_LABELS: Record<string, string> = {
  jr_fse: 'Jr. FSE', jr_kitchen_fse: 'Jr. Kitchen FSE', jr_hvac_fse: 'Jr. HVAC FSE',
  jr_gen_fse: 'Jr. Generator FSE', jr_dc_cft: 'Jr. DC CFT', jr_solar_fse: 'Jr. Solar FSE',
  jr_ev_tech: 'Jr. EV Tech', jr_dcp_tech: 'Jr. DC Plant', jr_battery_tech: 'Jr. Battery Tech',
  jr_dc_engineer: 'Jr. DC Engineer', jr_marine_tech: 'Jr. Marine Tech', jr_pool_tech: 'Jr. Pool Tech',
  jr_hvac_tech: 'Jr. HVAC Tech', jr_solar_inst: 'Jr. Solar Inst.', jr_wind_tech: 'Jr. Wind Tech',
  jr_elevator_tech: 'Jr. Elevator Tech', jr_fire_alarm_tech: 'Jr. Fire Alarm', jr_bmet_tech: 'Jr. BMET',
  jr_bas_tech: 'Jr. BAS Tech', jr_ref_tech: 'Jr. Ref Tech', jr_plc_tech: 'Jr. PLC Tech',
  jr_security_tech: 'Jr. Security Tech', jr_field_pm: 'Jr. Field PM', jr_pump_tech: 'Jr. Pump Tech',
  jr_industrial_ref: 'Jr. Industrial Ref', jr_dc_ops: 'Jr. DC Ops', jr_building_cx: 'Jr. Bldg Cx',
  jr_telecom_tech: 'Jr. Telecom OSP', jr_switchgear_tech: 'Jr. Switchgear Tech', jr_water_wastewater: 'Jr. Water/Wastewater', fse: 'FSE', fse_ai: 'FSE (AI)',
};

export default async function AdminCertificatesPage({
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
  let query = adminDb.collection('certificates').orderBy('issuedAt', 'desc').limit(250) as FirebaseFirestore.Query;
  if (statusFilter && statusFilter !== 'all') {
    query = adminDb.collection('certificates').where('status', '==', statusFilter).orderBy('issuedAt', 'desc').limit(250);
  }

  const snap = await query.get();

  const certs = snap.docs.map((doc) => {
    const d = doc.data();
    const issuedAt = d.issuedAt?.toDate?.() ?? new Date();
    return {
      id: doc.id,
      certificateNumber: d.certificateNumber as string,
      candidateName: d.candidateName as string ?? '—',
      certificationTitle: d.certificationTitle as string ?? '—',
      examLevel: d.examLevel as string ?? '',
      issuedAt,
      score: typeof d.score === 'number' ? Math.round(d.score) : null,
      status: d.status as string ?? 'valid',
      publicScoreEnabled: d.publicScoreEnabled === true,
    };
  });

  const filters = ['all', 'valid', 'revoked', 'under_review', 'expired'];

  return (
    <section className="section-pad">
      <div className="container-site max-w-6xl mx-auto space-y-6">
        <div>
          <Link href="/admin" className="text-xs text-gray-500 hover:text-gray-300 mb-4 block">&larr; Admin Dashboard</Link>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-xl font-bold text-white">Certificates</h1>
              <p className="text-xs text-gray-500 mt-0.5">{certs.length} shown · newest first</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <Link
                  key={f}
                  href={f === 'all' ? '/admin/certificates' : `/admin/certificates?status=${f}`}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors capitalize ${
                    (statusFilter ?? 'all') === f
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  {f.replace('_', ' ')}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="card-dark overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Cert #</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Candidate</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Level</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Issued</th>
                <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold">Score</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Status</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-xs text-gray-600">No certificates found</td>
                </tr>
              ) : (
                certs.map((cert) => (
                  <tr key={cert.id} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">{cert.certificateNumber}</td>
                    <td className="px-4 py-3 text-gray-200 font-medium">{cert.candidateName}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{LEVEL_LABELS[cert.examLevel] ?? cert.examLevel}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{formatDate(cert.issuedAt)}</td>
                    <td className="px-4 py-3 text-right text-xs text-gray-400">
                      {cert.score !== null ? `${cert.score}%` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded border capitalize ${STATUS_BADGE[cert.status] ?? STATUS_BADGE.valid}`}>
                        {cert.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/verify/${cert.certificateNumber}`}
                          target="_blank"
                          className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          View
                        </Link>
                        {cert.status === 'valid' && (
                          <RevokeCertButton certId={cert.id} certNumber={cert.certificateNumber} />
                        )}
                      </div>
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
