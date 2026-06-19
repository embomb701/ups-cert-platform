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
  valid: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/40',
  expired: 'text-amber-300 bg-amber-500/10 border-amber-500/40',
  revoked: 'text-red-400 bg-red-500/10 border-red-500/40',
  under_review: 'text-yellow-300 bg-yellow-500/10 border-yellow-500/40',
};

const STATUS_ICONS: Record<string, JSX.Element> = {
  valid: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
  expired: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l2 2m6-2a8 8 0 11-16 0 8 8 0 0116 0z" />,
  revoked: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
  under_review: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />,
};

export default async function CertificateVerifyPage({ params }: Props) {
  const cert = await getCertificate(params.certificateNumber);

  if (!cert) {
    return (
      <section className="section-pad">
        <div className="container-site max-w-xl mx-auto">
          <div className="panel p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/40 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-3">Certificate Not Found</h1>
            <p className="text-sm text-gray-400 mb-6">
              No certificate with number{' '}
              <code className="font-mono tracking-wider text-gray-300">{params.certificateNumber}</code> was found.
              Check the certificate number and try again.
            </p>
            <Link href="/" className="btn-outline">
              Return to home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const statusStyle = STATUS_STYLES[cert.status] ?? STATUS_STYLES.valid;
  const statusIcon = STATUS_ICONS[cert.status] ?? STATUS_ICONS.valid;
  const issueDate = cert.issuedAt instanceof Date
    ? cert.issuedAt
    : (cert.issuedAt as any)?.toDate?.() ?? new Date();

  return (
    <section className="section-pad">
      <div className="container-site max-w-2xl mx-auto">
        <div className="panel relative overflow-hidden p-10">
          <div className="hazard-stripe absolute inset-x-0 top-0 h-1" />

          {/* Header */}
          <div className="text-center mb-8">
            <p className="kicker mb-3 justify-center">Mastering FSE</p>
            <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-voltage-500/30 bg-voltage-500/10">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-voltage-400" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6l-8-4z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-1">
              Certificate Verification
            </h1>
          </div>

          {/* Status badge */}
          <div className="flex justify-center mb-8">
            <span
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide border ${statusStyle}`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {statusIcon}
              </svg>
              {cert.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          {/* Certificate details */}
          <div className="rule-voltage mb-px" />
          <div className="space-y-px overflow-hidden rounded-xl border border-white/10">
            <div className="flex justify-between bg-carbon-900/40 px-5 py-3.5">
              <span className="text-xs uppercase tracking-wider text-gray-500">Candidate Name</span>
              <span className="text-sm text-white font-medium">{cert.candidateName}</span>
            </div>
            <div className="flex justify-between bg-carbon-900/40 px-5 py-3.5">
              <span className="text-xs uppercase tracking-wider text-gray-500">Certification</span>
              <span className="text-sm text-white font-medium">{cert.certificationTitle}</span>
            </div>
            <div className="flex justify-between bg-carbon-900/40 px-5 py-3.5">
              <span className="text-xs uppercase tracking-wider text-gray-500">Level</span>
              <span className="text-sm text-white">
                {cert.examLevel === 'jr_fse' ? 'Junior FSE' : 'FSE (Proctored)'}
              </span>
            </div>
            <div className="flex justify-between bg-carbon-900/40 px-5 py-3.5">
              <span className="text-xs uppercase tracking-wider text-gray-500">Issue Date</span>
              <span className="text-sm text-white">{formatDate(issueDate)}</span>
            </div>
            <div className="flex justify-between bg-carbon-900/40 px-5 py-3.5">
              <span className="text-xs uppercase tracking-wider text-gray-500">Certificate Number</span>
              <span className="text-sm font-mono tracking-wider text-voltage-300">{cert.certificateNumber}</span>
            </div>
            {cert.publicScoreEnabled && (
              <div className="flex justify-between bg-carbon-900/40 px-5 py-3.5">
                <span className="text-xs uppercase tracking-wider text-gray-500">Score</span>
                <span className="text-sm text-white">{Math.round(cert.score)}%</span>
              </div>
            )}
          </div>

          {cert.status === 'revoked' && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/40 rounded-xl">
              <p className="text-xs text-red-400">
                This certificate has been revoked. It is no longer a valid credential.
              </p>
            </div>
          )}

          {cert.status === 'under_review' && (
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/40 rounded-xl">
              <p className="text-xs text-yellow-300">
                This certificate is currently under review. Its validity is pending resolution.
              </p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-carbon-950/60 border border-white/10 rounded-xl">
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
