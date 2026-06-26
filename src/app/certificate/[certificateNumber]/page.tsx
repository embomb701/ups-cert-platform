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

  const levelLabel =
    cert.examLevel === 'jr_fse' ? 'Junior Field Service Engineer'
    : 'Field Service Engineer';

  return (
    <>
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
        <div className="no-print text-center mb-6">
          <PrintButton />
          <p className="text-xs text-gray-500 mt-2">
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
            Mastering UPS Field Service Engineering
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
            <div>
              <p className="cert-label text-xs text-gray-500 mb-1">Score</p>
              <p className="cert-value text-gray-200">{Math.round(cert.score)}%</p>
            </div>
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
            Verify at: masteringfse.com/verify/{cert.certificateNumber}
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
