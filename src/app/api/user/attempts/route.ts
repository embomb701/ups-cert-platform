import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const token = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const snap = await adminDb
      .collection('examAttempts')
      .where('userId', '==', uid)
      .get();

    const attempts = snap.docs
      .map((d) => {
        const data = d.data();
        return {
          id: d.id,
          examLevel: data.examLevel,
          status: data.status,
          score: data.score ?? null,
          passed: data.passed ?? null,
          completedAt: data.completedAt?.toDate?.()?.toISOString() ?? null,
          startedAt: data.startedAt?.toDate?.()?.toISOString() ?? null,
          certificateId: data.certificateId ?? null,
        };
      })
      .sort((a, b) => {
        if (!a.startedAt) return 1;
        if (!b.startedAt) return -1;
        return b.startedAt.localeCompare(a.startedAt);
      })
      .slice(0, 20);

    return NextResponse.json({ attempts });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
