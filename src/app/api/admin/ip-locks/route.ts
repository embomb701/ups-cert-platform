import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken).catch(() => null);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    if (!(await checkIsAdmin(decoded.uid, decoded.email ?? ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const snap = await adminDb
      .collection('ipExamLocks')
      .orderBy('createdAt', 'desc')
      .limit(200)
      .get();

    const locks = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        email: data.email ?? '',
        examLevel: data.examLevel ?? '',
        userId: data.userId ?? '',
        ipHash: data.ipHash ?? '',
        attemptId: data.attemptId ?? '',
        createdAt: data.createdAt?.toDate?.()?.toISOString() ?? null,
        cooldownUntil: data.cooldownUntil?.toDate?.()?.toISOString() ?? null,
        clearedByAdmin: data.clearedByAdmin ?? false,
        adminNotes: data.adminNotes ?? '',
        clearedAt: data.clearedAt?.toDate?.()?.toISOString() ?? null,
      };
    });

    return NextResponse.json({ locks });
  } catch (err: any) {
    console.error('Admin ip-locks error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
