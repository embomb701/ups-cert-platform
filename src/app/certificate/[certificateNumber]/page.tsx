import { adminDb } from '@/lib/firebase/admin';
import { formatDate } from '@/lib/utils/formatters';
import type { Certificate } from '@/types';
import PrintButton from './PrintButton';

interface Props {
  params: { certificateNumber: string };
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

export const dynamic = 'force-dynamic';

export default async function CertificatePrintPage({ params }: Props) {
  const cert = await getCertificate(params.certificateNumber);

  if (!cert || cert.status === 'revoked') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-sm">
          {cert?.status === 'revoked' ? 'This certificate has been revoked.' : 'Certificate not found.'}
        </p>
      </div>
    );
  }

  const issueDate = cert.issuedAt instanceof Date
    ? cert.issuedAt
    : (cert.issuedAt as any)?.toDate?.() ?? new Date();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';
  const verifyUrl = `${siteUrl}/verify/${cert.certificateNumber}`;
  const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(cert.certificationTitle)}&issueYear=${issueDate.getFullYear()}&issueMonth=${issueDate.getMonth() + 1}&certUrl=${encodeURIComponent(verifyUrl)}&certId=${encodeURIComponent(cert.certificateNumber)}`;

  const levelLabel =
    cert.examLevel === 'jr_fse' ? 'Junior Field Service Engineer'
    : cert.examLevel === 'jr_kitchen_fse' ? 'Junior Commercial Kitchen Field Service Engineer'
    : cert.examLevel === 'jr_hvac_fse' ? 'Junior HVAC Field Service Engineer'
    : cert.examLevel === 'jr_gen_fse' ? 'Junior Power Generation Field Service Engineer'
    : cert.examLevel === 'jr_dc_cft' ? 'Junior Data Center Critical Facilities Technician'
    : cert.examLevel === 'jr_solar_fse' ? 'Junior Solar & Storage Field Service Engineer'
    : cert.examLevel === 'jr_ev_tech' ? 'Junior EV Charging Infrastructure Technician'
    : cert.examLevel === 'jr_dcp_tech' ? 'Junior Telecom DC Power Plants Technician'
    : cert.examLevel === 'jr_battery_tech' ? 'Junior Battery Systems Technician'
    : cert.examLevel === 'jr_dc_engineer' ? 'Junior Data Center Engineer'
    : cert.examLevel === 'jr_marine_tech' ? 'Junior Marine Systems Technician'
    : cert.examLevel === 'jr_pool_tech' ? 'Junior Pool Equipment Technician'
    : cert.examLevel === 'jr_hvac_tech' ? 'Junior HVAC Technician'
    : cert.examLevel === 'jr_solar_inst' ? 'Junior Solar Installer'
    : cert.examLevel === 'jr_wind_tech' ? 'Junior Wind Turbine Technician'
    : cert.examLevel === 'jr_elevator_tech' ? 'Junior Elevator Technician'
    : cert.examLevel === 'jr_fire_alarm_tech' ? 'Junior Fire Alarm Technician'
    : cert.examLevel === 'jr_bmet_tech' ? 'Junior Biomedical Equipment Technician'
    : cert.examLevel === 'jr_bas_tech' ? 'Junior Building Automation Systems Technician'
    : cert.examLevel === 'jr_ref_tech' ? 'Junior Commercial Refrigeration Technician'
    : cert.examLevel === 'jr_plc_tech' ? 'Junior Industrial Controls & PLC Technician'
    : cert.examLevel === 'jr_security_tech' ? 'Junior Electronic Security Systems Technician'
    : cert.examLevel === 'jr_field_pm' ? 'Junior Field Project Manager'
    : cert.examLevel === 'jr_pump_tech' ? 'Junior Pump Technician'
    : cert.examLevel === 'jr_industrial_ref' ? 'Junior Industrial Refrigeration Operator'
    : cert.examLevel === 'jr_dc_ops' ? 'Junior Data Center Operations Manager'
    : cert.examLevel === 'jr_building_cx' ? 'Junior Building Commissioning Agent'
    : cert.examLevel === 'jr_telecom_tech' ? 'Junior Telecom OSP Technician'
    : cert.examLevel === 'jr_switchgear_tech' ? 'Junior Switchgear & Substation Technician'
    : 'Field Service Engineer';

  const certJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    name: cert.certificationTitle,
    credentialCategory: 'Certificate',
    recognizedBy: { '@type': 'Organization', name: 'Mastering Field Service', url: siteUrl },
    holder: { '@type': 'Person', name: cert.candidateName || 'Candidate' },
    dateCreated: issueDate instanceof Date ? issueDate.toISOString() : new Date(issueDate as string).toISOString(),
    identifier: cert.certificateNumber,
    url: verifyUrl,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(certJsonLd) }} />
      {/* Print CSS — hides site chrome, forces white background */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          header, footer, nav, .no-print { display: none !important; }
          body { background: white !important; margin: 0; }
          .cert-page { padding: 0 !important; }
          .cert-card {
            border: 3px double #1e3a5f !important;
            box-shadow: none !important;
            background: white !important;
            color: #111 !important;
            max-width: 100% !important;
            margin: 0 !important;
            page-break-inside: avoid;
          }
          .cert-title { color: #1e3a5f !important; }
          .cert-name { color: #1e3a5f !important; }
          .cert-label { color: #555 !important; }
          .cert-value { color: #111 !important; }
          .cert-seal { border-color: #1e3a5f !important; color: #1e3a5f !important; }
          .cert-disclaimer { color: #666 !important; }
          .cert-divider { border-color: #ccc !important; }
        }
      `}} />

      <div className="cert-page section-pad">
        <div className="no-print text-center mb-6 space-y-3">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <PrintButton />
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white font-semibold text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Add to LinkedIn
            </a>
          </div>
          <p className="text-xs text-gray-500">
            In the print dialog, select <strong className="text-gray-300">Save as PDF</strong> to download.
          </p>
        </div>

        {/* Certificate card */}
        <div className="cert-card card-dark max-w-2xl mx-auto p-12 text-center relative">
          {/* Top decorative border */}
          <div className="cert-divider absolute top-6 left-6 right-6 h-px bg-gray-700" />
          <div className="cert-divider absolute top-8 left-6 right-6 h-px bg-gray-700" />

          {/* Issuer */}
          <p className="cert-label text-xs uppercase tracking-[0.25em] text-gray-400 mb-2 mt-4">
            Mastering Field Service Training Portal
          </p>

          {/* Title */}
          <h1 className="cert-title text-3xl font-bold text-indigo-300 mb-1 mt-6">
            Certificate of Achievement
          </h1>
          <p className="cert-label text-sm text-gray-500 mb-10">
            This is to certify that
          </p>

          {/* Candidate name */}
          <p className="cert-name text-4xl font-bold text-white mb-2 tracking-wide">
            {cert.candidateName || 'Candidate'}
          </p>
          <div className="cert-divider w-48 border-b border-gray-700 mx-auto mb-8" />

          {/* Achievement text */}
          <p className="cert-label text-sm text-gray-400 mb-2">
            has successfully demonstrated knowledge in
          </p>
          <p className="cert-value text-xl font-semibold text-white mb-1">
            {cert.certificationTitle}
          </p>
          <p className="cert-label text-sm text-gray-500 mb-10">
            {levelLabel}
          </p>

          {/* Seal */}
          <div className="cert-seal w-20 h-20 rounded-full border-2 border-indigo-600 flex items-center justify-center mx-auto mb-10">
            <div className="text-center">
              <p className="text-indigo-400 text-xs font-bold leading-tight">CERTIFIED</p>
              <p className="text-indigo-500 text-xs leading-tight">{new Date(issueDate).getFullYear()}</p>
            </div>
          </div>

          {/* Meta details */}
          <div className="grid grid-cols-3 gap-4 text-sm mb-10">
            <div>
              <p className="cert-label text-xs text-gray-500 mb-1">Date Issued</p>
              <p className="cert-value text-gray-200">{formatDate(issueDate)}</p>
            </div>
            {cert.publicScoreEnabled && (
            <div>
              <p className="cert-label text-xs text-gray-500 mb-1">Score</p>
              <p className="cert-value text-gray-200">{Math.round(cert.score)}%</p>
            </div>
            )}
            <div>
              <p className="cert-label text-xs text-gray-500 mb-1">Certificate No.</p>
              <p className="cert-value text-gray-300 font-mono text-xs">{cert.certificateNumber}</p>
            </div>
          </div>

          {/* Bottom decorative border */}
          <div className="cert-divider absolute bottom-8 left-6 right-6 h-px bg-gray-700" />
          <div className="cert-divider absolute bottom-6 left-6 right-6 h-px bg-gray-700" />

          {/* Verification footer */}
          <p className="cert-disclaimer text-xs text-gray-600 mt-4">
            Verify at: fse-academy.com/verify/{cert.certificateNumber}
          </p>
        </div>

        {/* Disclaimer below card — hidden in print */}
        <div className="no-print max-w-2xl mx-auto mt-6 p-4 card-dark bg-amber-950/20 border-amber-900/40">
          <p className="text-xs text-gray-500 leading-relaxed">
            This certification is an educational knowledge credential. It does not authorize
            energized electrical work or replace employer training, OEM qualification, electrical
            licensing, NFPA 70E, OSHA requirements, or site-specific procedures.
          </p>
        </div>
      </div>
    </>
  );
}
