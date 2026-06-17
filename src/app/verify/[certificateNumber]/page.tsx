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

  return (
    <section className="section-pad">
      <div className="container-site max-w-2xl mx-auto">
        <div className="card-dark p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Mastering FSE</p>
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
                {cert.examLevel === 'jr_fse' ? 'Junior FSE' : 'FSE (Proctored)'}
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

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-gray-900/80 rounded-lg">
            <p className="text-xs text-gray-500 leading-relaxed">
              This certificate demonstrates knowledge of UPS field service concepts at the stated
              certification level. It does not authorize unsupervised electrical work, energized work,
              OEM service work, or work beyond the candidate&apos;s employer-approved scope. Employers
              should still provide onboarding, safety training, site-specific procedures, OEM training,
              and supervised field experience.
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
