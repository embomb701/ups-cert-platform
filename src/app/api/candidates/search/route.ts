import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
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

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const token = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;
    const email = decoded.email ?? '';

    if (!(await isEmployer(uid, email))) {
      return NextResponse.json({ error: 'Employer access required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const certLevel = searchParams.get('certLevel') ?? '';

    // Query valid certs, optionally filtered by exam level
    let certsQuery = adminDb
      .collection('certificates')
      .where('status', '==', 'valid') as FirebaseFirestore.Query;

    if (certLevel) {
      certsQuery = certsQuery.where('examLevel', '==', certLevel);
    }

    const certsSnap = await certsQuery.orderBy('issuedAt', 'desc').limit(300).get();

    // Group certs by userId
    const certsByUser = new Map<string, { examLevel: string; certificationTitle: string; issuedAt: string | null; certificateNumber: string }[]>();
    certsSnap.forEach((doc) => {
      const d = doc.data();
      const userId = d.userId as string;
      if (!userId) return;
      if (!certsByUser.has(userId)) certsByUser.set(userId, []);
      certsByUser.get(userId)!.push({
        examLevel: d.examLevel as string,
        certificationTitle: d.certificationTitle as string,
        issuedAt: d.issuedAt?.toDate?.()?.toISOString() ?? null,
        certificateNumber: d.certificateNumber as string,
      });
    });

    const userIds = Array.from(certsByUser.keys()).slice(0, 100);
    if (userIds.length === 0) {
      return NextResponse.json({ candidates: [] });
    }

    // Batch fetch user docs (Firestore in-operator limited to 30)
    const chunks: string[][] = [];
    for (let i = 0; i < userIds.length; i += 30) chunks.push(userIds.slice(i, i + 30));

    const userDocs = new Map<string, FirebaseFirestore.DocumentData>();
    await Promise.all(
      chunks.map(async (chunk) => {
        const snap = await adminDb
          .collection('users')
          .where('__name__', 'in', chunk.map((id) => adminDb.collection('users').doc(id)))
          .get();
        snap.forEach((doc) => userDocs.set(doc.id, doc.data()));
      })
    );

    // Filter to open + visible candidates
    const eligibleIds = userIds.filter((id) => {
      const d = userDocs.get(id);
      if (!d) return false;
      return d.openToOpportunities === true && d.profileVisible !== false;
    });

    if (eligibleIds.length === 0) {
      return NextResponse.json({ candidates: [] });
    }

    // Batch fetch Firebase Auth user records for display name + photo
    const authResults = await adminAuth.getUsers(eligibleIds.map((id) => ({ uid: id })));
    const authMap = new Map<string, { displayName: string; photoURL: string | null }>();
    authResults.users.forEach((u) => {
      authMap.set(u.uid, { displayName: u.displayName ?? '', photoURL: u.photoURL ?? null });
    });

    const candidates = eligibleIds
      .map((id) => {
        const userData = userDocs.get(id) ?? {};
        const authData = authMap.get(id) ?? { displayName: '', photoURL: null };
        return {
          uid: id,
          displayName: authData.displayName || (userData.displayName as string) || 'Candidate',
          photoURL: authData.photoURL,
          headline: (userData.headline as string) ?? '',
          location: (userData.location as string) ?? '',
          certificates: certsByUser.get(id) ?? [],
        };
      })
      .filter((c) => c.displayName !== 'Candidate' || (certsByUser.get(c.uid)?.length ?? 0) > 0);

    return NextResponse.json({ candidates });
  } catch (err) {
    console.error('Candidates search error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
