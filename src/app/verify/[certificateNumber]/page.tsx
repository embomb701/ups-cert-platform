import type { Metadata } from 'next';
import { adminDb } from '@/lib/firebase/admin';
import { formatDate } from '@/lib/utils/formatters';
import type { Certificate } from '@/types';
import Link from 'next/link';

interface Props {
  params: { certificateNumber: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Certificate Verification — ${params.certificateNumber}`,
    robots: { index: false },
  };
}

async function getCertificate(certNumber: string): Promise<Certificate | null> {
  const snap = await adminDb
    .collection('certificates')
    .where('certificateNumber', '==', certNumber)
    .limit(1)
    .get();

  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as Certificate;
}

const STATUS_STYLES: Record<string, string> = {
  valid: 'text-green-400 bg-green-950/50 border-green-800',
  expired: 'text-amber-400 bg-amber-950/50 border-amber-800',
  revoked: 'text-red-400 bg-red-950/50 border-red-800',
  under_review: 'text-yellow-400 bg-yellow-950/50 border-yellow-800',
};

export default async function CertificateVerifyPage({ params }: Props) {
  const cert = await getCertificate(params.certificateNumber);

  if (!cert) {
    return (
      <section className="section-pad">
        <div className="container-site max-w-xl mx-auto">
          <div className="card-dark p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-red-900 border border-red-800 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white mb-3">Certificate Not Found</h1>
            <p className="text-sm text-gray-400 mb-6">
              No certificate with number <code className="font-mono text-gray-300">{params.certificateNumber}</code> was found.
              Check the certificate number and try again.
            </p>
            <Link href="/" className="text-sm text-indigo-400 hover:text-indigo-300">
              Return to home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const statusStyle = STATUS_STYLES[cert.status] ?? STATUS_STYLES.valid;
  const issueDate = cert.issuedAt instanceof Date
    ? cert.issuedAt
    : (cert.issuedAt as any)?.toDate?.() ?? new Date();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';
  const verifyUrl = `${siteUrl}/verify/${cert.certificateNumber}`;
  const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(cert.certificationTitle)}&issueYear=${issueDate.getFullYear()}&issueMonth=${issueDate.getMonth() + 1}&certUrl=${encodeURIComponent(verifyUrl)}&certId=${encodeURIComponent(cert.certificateNumber)}`;
  const assertionUrl = `${siteUrl}/api/badges/assertion/${cert.certificateNumber}`;
  const badgeImageUrl = `${siteUrl}/api/badges/image/${cert.examLevel}`;
  const badgeCheckUrl = `https://badgecheck.io/?url=${encodeURIComponent(assertionUrl)}`;

  return (
    <section className="section-pad">
      <div className="container-site max-w-2xl mx-auto">
        <div className="card-dark p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Mastering Field Service Training Portal</p>
            <h1 className="text-2xl font-bold text-white mb-1">Certificate Verification</h1>
          </div>

          {/* Status badge */}
          <div className="flex justify-center mb-8">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${statusStyle}`}
            >
              {cert.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          {/* Certificate details */}
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-sm text-gray-500">Candidate Name</span>
              <span className="text-sm text-white font-medium">{cert.candidateName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-sm text-gray-500">Certification</span>
              <span className="text-sm text-white font-medium">{cert.certificationTitle}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-sm text-gray-500">Level</span>
              <span className="text-sm text-white">
                {({
                  jr_fse: 'Junior UPS Field Service Engineer',
                  jr_kitchen_fse: 'Junior Commercial Kitchen FSE',
                  jr_hvac_fse: 'Junior HVAC Field Service Engineer',
                  jr_gen_fse: 'Junior Power Generation FSE',
                  jr_dc_cft: 'Junior Data Center Critical Facilities Technician',
                  jr_solar_fse: 'Junior Solar & Storage FSE',
                  jr_ev_tech: 'Junior EV Charging Infrastructure Technician',
                  jr_dcp_tech: 'Junior Telecom Power Technician',
                  jr_battery_tech: 'Junior Battery Systems Technician',
                  jr_dc_engineer: 'Junior Data Center Engineer',
                  jr_marine_tech: 'Junior Marine Systems Technician',
                  jr_pool_tech: 'Junior Pool Equipment Technician',
                  jr_hvac_tech: 'Junior HVAC Technician',
                  jr_solar_inst: 'Junior Solar Installer',
                  jr_wind_tech: 'Junior Wind Turbine Technician',
                  jr_elevator_tech: 'Junior Elevator Technician',
                  jr_fire_alarm_tech: 'Junior Fire Alarm Technician',
                  jr_bmet_tech: 'Junior Biomedical Equipment Technician',
                  jr_bas_tech: 'Junior Building Automation Systems Technician',
                  jr_ref_tech: 'Junior Commercial Refrigeration Technician',
                  jr_plc_tech: 'Junior Industrial Controls & PLC Technician',
                  jr_security_tech: 'Junior Electronic Security Systems Technician',
                  jr_field_pm: 'Junior Field Project Manager',
                  jr_pump_tech: 'Junior Pump Technician',
                  jr_industrial_ref: 'Junior Industrial Refrigeration Operator',
                  jr_dc_ops: 'Junior Data Center Operations Manager',
                  jr_building_cx: 'Junior Building Commissioning Agent',
                  jr_telecom_tech: 'Junior Telecom OSP Technician',
                  jr_switchgear_tech: 'Junior Switchgear & Substation Technician',
                  jr_water_wastewater: 'Junior Water & Wastewater Treatment Operator',
                  fse: 'UPS Field Service Engineer (Human Proctored)',
                } as Record<string, string>)[cert.examLevel] ?? cert.examLevel}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-sm text-gray-500">Issue Date</span>
              <span className="text-sm text-white">{formatDate(issueDate)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-3">
              <span className="text-sm text-gray-500">Certificate Number</span>
              <span className="text-sm font-mono text-gray-300">{cert.certificateNumber}</span>
            </div>
            {cert.publicScoreEnabled && (
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-sm text-gray-500">Score</span>
                <span className="text-sm text-white">{Math.round(cert.score)}%</span>
              </div>
            )}
          </div>

          {cert.status === 'revoked' && (
            <div className="mt-6 p-4 bg-red-950/30 border border-red-800 rounded-lg">
              <p className="text-xs text-red-400">
                This certificate has been revoked. It is no longer a valid credential.
              </p>
            </div>
          )}

          {cert.status === 'under_review' && (
            <div className="mt-6 p-4 bg-yellow-950/30 border border-yellow-800 rounded-lg">
              <p className="text-xs text-yellow-400">
                This certificate is currently under review. Its validity is pending resolution.
              </p>
            </div>
          )}

          {/* Actions */}
          {cert.status === 'valid' && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`/certificate/${cert.certificateNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </a>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white font-medium text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Add to LinkedIn
              </a>
            </div>
          )}

          {/* Verifiable digital badge */}
          {cert.status === 'valid' && (
            <div className="mt-8 rounded-lg border border-gray-800 bg-gray-900/50 p-5 flex flex-col sm:flex-row items-center gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={badgeImageUrl} alt={`${cert.certificationTitle} digital badge`} className="w-20 h-20 rounded-full flex-shrink-0" />
              <div className="text-center sm:text-left">
                <p className="text-sm font-semibold text-white">Verifiable digital badge</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Open Badges 2.0-compliant credential. Independently verifiable — no account or trust in this
                  site required, the badge data is fetched directly from its hosted assertion URL.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
                  <a href={badgeCheckUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                    Verify independently →
                  </a>
                  <a href={assertionUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-300 font-mono">
                    View assertion (JSON)
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-gray-900/80 rounded-lg">
            <p className="text-xs text-gray-500 leading-relaxed">
              This certificate demonstrates knowledge of the stated technical discipline at the
              certification level shown. It does not authorize unsupervised electrical work, energized
              work, OEM service work, or work beyond the candidate&apos;s employer-approved scope.
              Employers should still provide onboarding, safety training, site-specific procedures,
              OEM training, and supervised field experience before independent work.
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600">
              This is an independent educational platform and is not affiliated with any employer,
              manufacturer, or service company unless explicitly stated.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
