import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb, adminStorage } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';

export const dynamic = 'force-dynamic';

async function isEmployer(uid: string, email: string): Promise<boolean> {
  if (await checkIsAdmin(uid, email)) return true;
  const snap = await adminDb
    .collection('employerOrders')
    .where('userId', '==', uid)
    .limit(1)
    .get();
  return !snap.empty;
}

// Employer-facing resume download — requires paid employer access AND the
// candidate's explicit resumeShareConsent, mirroring the same
// openToOpportunities/profileVisible eligibility used by /api/candidates/search
// so a candidate who withdraws from search also stops exposing their resume.
export async function GET(req: NextRequest, { params }: { params: Promise<{ uid: string }> }) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = await adminAuth.verifyIdToken(authHeader.split('Bearer ')[1]);
    if (!(await isEmployer(decoded.uid, decoded.email ?? ''))) {
      return NextResponse.json({ error: 'Employer access required' }, { status: 403 });
    }

    const { uid: candidateUid } = await params;
    const candidateSnap = await adminDb.collection('users').doc(candidateUid).get();
    const candidateData = candidateSnap.data();

    const eligible =
      !!candidateData &&
      candidateData.resumeShareConsent === true &&
      candidateData.openToOpportunities === true &&
      candidateData.profileVisible !== false &&
      typeof candidateData.resumeFileName === 'string';

    if (!eligible) {
      return NextResponse.json({ error: 'This candidate has not shared a resume' }, { status: 404 });
    }

    const bucket = adminStorage.bucket();
    const storageFile = bucket.file(`resumes/${candidateUid}/resume.pdf`);
    const [exists] = await storageFile.exists();
    if (!exists) return NextResponse.json({ error: 'No resume on file' }, { status: 404 });

    const [buffer] = await storageFile.download();
    const fileName = (candidateData!.resumeFileName as string).replace(/"/g, '');

    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (err) {
    console.error('Candidate resume download error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
