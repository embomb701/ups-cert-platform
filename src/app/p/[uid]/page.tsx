import { notFound } from 'next/navigation';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const COURSE_NAMES: Record<string, string> = {
  training_portal: 'UPS Field Service Engineering',
  training_kitchen: 'Commercial Kitchen Field Service Engineering',
  training_hvac: 'HVAC Field Service Engineering',
  training_generator: 'Power Generation Field Service Engineering',
  training_datacenter: 'Data Center Critical Facilities',
  training_solar: 'Solar & Battery Energy Storage',
  training_evcharging: 'EV Charging Infrastructure',
  training_dcplants: 'Telecom DC Power Plants',
  training_battery: 'Battery Systems Technician',
  training_dcengineer: 'Data Center Engineer',
  training_marine: 'Marine Systems Technician',
  training_pool: 'Pool Equipment Technician',
  training_hvac_tech: 'HVAC Technician',
  training_solar_inst: 'Solar Installer',
  training_wind_tech: 'Wind Turbine Technician',
  training_elevator_tech: 'Elevator Technician',
  training_fire_alarm_tech: 'Fire Alarm & Suppression Technician',
  training_bmet_tech: 'Biomedical Equipment Technician',
  training_bas_tech: 'Building Automation Systems Technician',
  training_ref_tech: 'Commercial Refrigeration Technician',
  training_plc_tech: 'Industrial Controls & PLC Technician',
  training_security_tech: 'Electronic Security Systems Technician',
  training_field_pm: 'Field Project Manager',
  training_pump_tech: 'Pump Technician',
  training_industrial_ref: 'Industrial Refrigeration Operator',
  training_dc_ops: 'Data Center Operations Manager',
  training_building_cx: 'Building Commissioning (Cx) Agent',
  training_telecom: 'Telecom OSP Technician',
};

const CERT_LEVEL_LABELS: Record<string, string> = {
  jr_fse: 'Jr. UPS Field Service Engineer',
  jr_kitchen_fse: 'Jr. Commercial Kitchen Field Service Engineer',
  jr_hvac_fse: 'Jr. HVAC Field Service Engineer',
  jr_gen_fse: 'Jr. Power Generation Field Service Engineer',
  jr_dc_cft: 'Jr. Data Center Critical Facilities Technician',
  jr_solar_fse: 'Jr. Solar & Storage Field Service Engineer',
  jr_ev_tech: 'Jr. EV Charging Infrastructure Technician',
  jr_dcp_tech: 'Jr. Telecom Power Technician',
  jr_battery_tech: 'Jr. Battery Systems Technician',
  jr_dc_engineer: 'Jr. Data Center Engineer',
  jr_marine_tech: 'Jr. Marine Systems Technician',
  jr_pool_tech: 'Jr. Pool Equipment Technician',
  jr_hvac_tech: 'Jr. HVAC Technician',
  jr_solar_inst: 'Jr. Solar Installer',
  jr_wind_tech: 'Jr. Wind Turbine Technician',
  jr_elevator_tech: 'Jr. Elevator Technician',
  jr_fire_alarm_tech: 'Jr. Fire Alarm Technician',
  jr_bmet_tech: 'Jr. Biomedical Equipment Technician',
  jr_bas_tech: 'Jr. Building Automation Systems Technician',
  jr_ref_tech: 'Jr. Commercial Refrigeration Technician',
  jr_plc_tech: 'Jr. Industrial Controls & PLC Technician',
  jr_security_tech: 'Jr. Electronic Security Systems Technician',
  jr_field_pm: 'Jr. Field Project Manager',
  jr_pump_tech: 'Jr. Pump Technician',
  jr_industrial_ref: 'Jr. Industrial Refrigeration Operator',
  jr_dc_ops: 'Jr. Data Center Operations Manager',
  jr_building_cx: 'Jr. Building Commissioning Agent',
  jr_telecom_tech: 'Jr. Telecom OSP Technician',
  fse: 'UPS Field Service Engineer (Human Proctored)',
};

interface PageProps {
  params: Promise<{ uid: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { uid } = await params;
  try {
    const userRecord = await adminAuth.getUser(uid);
    const name = userRecord.displayName || 'Candidate';
    return {
      title: `${name} — Mastering Field Service Profile`,
      description: `View ${name}'s earned certifications and completed training courses.`,
    };
  } catch {
    return { title: 'Candidate Profile — Mastering Field Service' };
  }
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { uid } = await params;

  // Load user record from Firebase Auth
  let displayName = '';
  let photoURL: string | null = null;
  try {
    const userRecord = await adminAuth.getUser(uid);
    displayName = userRecord.displayName || '';
    photoURL = userRecord.photoURL ?? null;
  } catch {
    notFound();
  }

  // Load Firestore profile data
  const userSnap = await adminDb.collection('users').doc(uid).get();
  const userData = userSnap.data() ?? {};

  const profileVisible = userData.profileVisible ?? true;
  if (!profileVisible) notFound();

  const openToOpportunities: boolean = userData.openToOpportunities ?? false;
  const headline: string = userData.headline ?? '';
  const location: string = userData.location ?? '';

  // Load certificates (valid + revoked shown, revoked marked)
  const certsSnap = await adminDb
    .collection('certificates')
    .where('userId', '==', uid)
    .orderBy('issuedAt', 'desc')
    .get();

  const certificates = certsSnap.docs.map((doc) => {
    const d = doc.data();
    return {
      id: doc.id,
      certificationTitle: d.certificationTitle as string,
      examLevel: d.examLevel as string,
      certificateNumber: d.certificateNumber as string,
      issuedAt: d.issuedAt?.toDate?.() as Date | undefined,
      status: d.status as string,
      score: d.publicScoreEnabled ? (d.score as number) : null,
    };
  });

  // Load completed courses from trainingProgress
  const progressSnap = await adminDb
    .collection('users').doc(uid)
    .collection('trainingProgress')
    .get();

  const completedModuleIds = new Set<string>();
  const moduleCompletedAt: Record<string, Date> = {};
  progressSnap.forEach((doc) => {
    const d = doc.data();
    if (d.passed && d.completedAt) {
      completedModuleIds.add(doc.id);
      moduleCompletedAt[doc.id] = d.completedAt?.toDate?.() ?? new Date();
    }
  });

  // Load examAccess to know which courses are enrolled/complete
  const accessSnap = await adminDb
    .collection('users').doc(uid)
    .collection('examAccess')
    .get();

  const enrolledCourses = new Set<string>();
  accessSnap.forEach((doc) => {
    const d = doc.data();
    if (d.granted && COURSE_NAMES[doc.id]) enrolledCourses.add(doc.id);
  });

  // Build completed course list from COURSE_SEQUENCES (approximate — check if all modules in course are done)
  // We detect completed courses based on whether the user has a certificate for that course
  // or has passed all modules. For simplicity, derive from certs and module progress.
  const completedCourseKeys = new Set<string>(
    certificates
      .filter((c) => c.status === 'valid')
      .map((c) => {
        // Map exam level back to course key
        const map: Record<string, string> = {
          jr_fse: 'training_portal',
          jr_kitchen_fse: 'training_kitchen',
          jr_hvac_fse: 'training_hvac',
          jr_gen_fse: 'training_generator',
          jr_dc_cft: 'training_datacenter',
          jr_solar_fse: 'training_solar',
          jr_ev_tech: 'training_evcharging',
          jr_dcp_tech: 'training_dcplants',
          jr_battery_tech: 'training_battery',
          jr_dc_engineer: 'training_dcengineer',
          jr_marine_tech: 'training_marine',
          jr_pool_tech: 'training_pool',
          jr_hvac_tech: 'training_hvac_tech',
          jr_solar_inst: 'training_solar_inst',
          jr_wind_tech: 'training_wind_tech',
          jr_elevator_tech: 'training_elevator_tech',
          jr_fire_alarm_tech: 'training_fire_alarm_tech',
          jr_bmet_tech: 'training_bmet_tech',
          jr_bas_tech: 'training_bas_tech',
          jr_ref_tech: 'training_ref_tech',
          jr_plc_tech: 'training_plc_tech',
          jr_security_tech: 'training_security_tech',
          jr_field_pm: 'training_field_pm',
          jr_pump_tech: 'training_pump_tech',
          jr_industrial_ref: 'training_industrial_ref',
          jr_dc_ops: 'training_dc_ops',
          jr_building_cx: 'training_building_cx',
          jr_telecom_tech: 'training_telecom',
        };
        return map[c.examLevel] ?? '';
      })
      .filter(Boolean)
  );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ups-cert-platform.vercel.app';

  const initials = displayName
    ? displayName.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-start gap-5">
          {photoURL ? (
            <img src={photoURL} alt={displayName} className="w-16 h-16 rounded-full flex-shrink-0 object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-900 border border-blue-700 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-300 font-bold text-xl">{initials}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-white">{displayName || 'Candidate'}</h1>
              {openToOpportunities && (
                <span className="text-xs px-2 py-0.5 rounded-full border border-green-700/60 bg-green-900/30 text-green-400 font-medium">
                  Open to opportunities
                </span>
              )}
            </div>
            {headline && <p className="text-gray-400 text-sm">{headline}</p>}
            {location && <p className="text-gray-500 text-xs mt-0.5">{location}</p>}
          </div>
        </div>

        {/* Certificates */}
        {certificates.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Certifications ({certificates.filter((c) => c.status === 'valid').length})
            </h2>
            <div className="space-y-2">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className={`rounded-xl border p-4 flex items-start gap-4 ${
                    cert.status === 'valid'
                      ? 'border-gray-700 bg-gray-800/40'
                      : 'border-gray-800 bg-gray-800/20 opacity-60'
                  }`}
                >
                  <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm ${
                    cert.status === 'valid' ? 'bg-blue-900/60 border border-blue-700/60 text-blue-400' : 'bg-gray-700 text-gray-500'
                  }`}>
                    {cert.status === 'valid' ? '✓' : '✕'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">
                      {CERT_LEVEL_LABELS[cert.examLevel] ?? cert.certificationTitle}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-0.5">
                      {cert.issuedAt && (
                        <p className="text-gray-500 text-xs">
                          Issued {cert.issuedAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                      )}
                      {cert.score !== null && (
                        <p className="text-gray-500 text-xs">Score: {Math.round(cert.score)}%</p>
                      )}
                      {cert.status === 'revoked' && (
                        <span className="text-xs text-red-400">Revoked</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex flex-col gap-1 items-end">
                    <Link
                      href={`/verify/${cert.certificateNumber}`}
                      className="text-xs text-gray-500 hover:text-blue-400 transition-colors px-2 py-1 rounded"
                    >
                      Verify →
                    </Link>
                    {cert.status === 'valid' && (
                      <a
                        href={`/certificate/${cert.certificateNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-600 hover:text-gray-400 transition-colors px-2 py-1 rounded"
                      >
                        PDF ↓
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Training courses */}
        {enrolledCourses.size > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Training ({completedCourseKeys.size} course{completedCourseKeys.size !== 1 ? 's' : ''} completed)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Array.from(enrolledCourses).map((key) => {
                const done = completedCourseKeys.has(key);
                return (
                  <div
                    key={key}
                    className={`rounded-lg border px-3 py-2.5 flex items-center gap-2.5 text-xs ${
                      done
                        ? 'border-gray-700 bg-gray-800/40 text-gray-300'
                        : 'border-gray-800 bg-gray-800/20 text-gray-500'
                    }`}
                  >
                    <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      done ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-500'
                    }`}>
                      {done ? '✓' : '…'}
                    </span>
                    {COURSE_NAMES[key] ?? key}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {certificates.length === 0 && enrolledCourses.size === 0 && (
          <div className="rounded-xl border border-gray-800 bg-gray-800/20 p-10 text-center">
            <p className="text-gray-600 text-sm">No certifications or courses to display yet.</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-600">
            Verified by{' '}
            <a href={siteUrl} className="text-gray-500 hover:text-gray-400 transition-colors">
              Mastering Field Service
            </a>
          </p>
          <a
            href={`${siteUrl}/verify`}
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            Verify a certificate →
          </a>
        </div>

      </div>
    </div>
  );
}
