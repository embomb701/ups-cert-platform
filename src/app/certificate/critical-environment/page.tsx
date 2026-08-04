import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { CE_MODULES } from '@/data/index';
import Link from 'next/link';
import { CertificateActions } from '@/components/CertificateActions';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Critical Environment Fundamentals — Certificate',
};

function toDate(v: { toDate?: () => Date } | string | undefined): Date | null {
  if (!v) return null;
  if (typeof v === 'string') return new Date(v);
  return v.toDate?.() ?? null;
}

export default async function CECertificatePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('firebase-token')?.value;
  if (!token) redirect('/login');

  let uid: string;
  let displayName = '';
  let email = '';
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
    displayName = decoded.name ?? '';
    email = decoded.email ?? '';
  } catch {
    redirect('/login');
  }

  // Verify all CE modules completed
  const modules = [...CE_MODULES].sort((a, b) => a.num - b.num);
  const progressDocs = await Promise.all(
    modules.map((m) =>
      adminDb.collection('users').doc(uid).collection('trainingProgress').doc(m.id).get()
    )
  );

  const allPassed = progressDocs.every((doc) => {
    const d = doc.data() ?? {};
    return !!(d.completedAt && d.passed);
  });

  if (!allPassed) redirect('/training/critical-environment');

  // Latest completedAt across all modules = official completion date
  let latestDate: Date | null = null;
  for (const doc of progressDocs) {
    const d = toDate(doc.data()?.completedAt);
    if (d && (!latestDate || d > latestDate)) latestDate = d;
  }
  const completionDate = latestDate ?? new Date();

  const issuedFormatted = completionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Certificate ID: CE- + first 8 chars of uid + last 4 of timestamp
  const certId = `CE-${uid.slice(0, 6).toUpperCase()}-${completionDate.getFullYear()}`;

  const recipientName = displayName || email.split('@')[0] || 'Recipient';

  return (
    <>
      <div className="min-h-screen bg-gray-900 py-10 px-4 print:bg-white print:py-0">

        {/* Screen-only nav */}
        <div className="max-w-3xl mx-auto mb-6 print-hidden">
          <Link href="/training/critical-environment" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            ← Back to Course
          </Link>
        </div>

        {/* Certificate card */}
        <div className="max-w-3xl mx-auto">
          <div className="
            bg-white text-gray-900 rounded-2xl shadow-2xl
            border-8 border-emerald-700
            p-12 text-center space-y-6
            print:rounded-none print:shadow-none print:border-[10px] print:border-emerald-700 print:p-16
          ">

            {/* Header mark */}
            <div className="space-y-1">
              <p className="text-emerald-700 font-mono text-xs font-bold uppercase tracking-[0.25em]">
                Mastering Field Service Training Portal
              </p>
              <p className="text-gray-400 text-xs tracking-wider uppercase">FA Consulting &amp; Recruiting</p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-emerald-200" />
              <div className="w-3 h-3 rounded-full bg-emerald-600" />
              <div className="flex-1 h-px bg-emerald-200" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <p className="text-gray-500 text-sm tracking-widest uppercase">Certificate of Completion</p>
              <p className="text-gray-400 text-xs">This certifies that</p>
            </div>

            {/* Recipient name */}
            <div className="py-2">
              <p className="text-4xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                {recipientName}
              </p>
            </div>

            {/* Body */}
            <div className="space-y-1">
              <p className="text-gray-500 text-sm">has successfully completed all requirements for</p>
              <p className="text-2xl font-bold text-emerald-700 tracking-tight uppercase">
                Critical Environment Fundamentals
              </p>
              <p className="text-gray-400 text-xs max-w-lg mx-auto mt-2">
                An 8-module program covering critical facility awareness, electrical hazard recognition,
                lockout/tagout procedures, environmental controls, access protocols, emergency response,
                CPR &amp; AED awareness, and professional field service standards.
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-emerald-200" />
              <div className="w-3 h-3 rounded-full bg-emerald-600" />
              <div className="flex-1 h-px bg-emerald-200" />
            </div>

            {/* Footer metadata */}
            <div className="flex justify-between items-end pt-4 text-left">
              <div className="space-y-4">
                <div>
                  <div className="h-px w-40 bg-gray-400 mb-1" />
                  <p className="text-sm font-semibold text-gray-700">Francis Aiello</p>
                  <p className="text-xs text-gray-500">Founder, FA Consulting &amp; Recruiting</p>
                  <p className="text-xs text-gray-400">Mastering Field Service</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Date Issued</p>
                <p className="text-sm font-semibold text-gray-700">{issuedFormatted}</p>
                <p className="text-xs text-gray-400 mt-3 uppercase tracking-wider">Certificate No.</p>
                <p className="text-xs font-mono text-gray-600">{certId}</p>
              </div>
            </div>

          </div>
        </div>

        {/* Screen-only actions */}
        <div className="max-w-3xl mx-auto mt-8 print-hidden">
          <CertificateActions
            name={recipientName}
            courseTitle="Critical Environment Fundamentals"
            issuedDate={issuedFormatted}
          />
          <p className="text-center text-gray-600 text-xs mt-4">
            Use &quot;Print / Save as PDF&quot; to download a copy — select &quot;Save as PDF&quot; in the print dialog for a digital version.
          </p>
        </div>

      </div>
    </>
  );
}
