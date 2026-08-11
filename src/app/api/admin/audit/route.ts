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
      .collection('auditLogs')
      .orderBy('createdAt', 'desc')
      .limit(200)
      .get();

    const logs = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        userId: data.userId ?? null,
        eventType: data.eventType ?? 'unknown',
        eventDetails: data.eventDetails ?? {},
        severity: data.severity ?? 'info',
        createdAt: data.createdAt?.toDate?.()?.toISOString() ?? null,
        attemptId: data.attemptId ?? null,
      };
    });

    return NextResponse.json({ logs });
  } catch (err: any) {
    console.error('Admin audit error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
