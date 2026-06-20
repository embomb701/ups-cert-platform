import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

function isAdmin(email: string): boolean {
  const admins = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());
  return admins.includes(email.toLowerCase());
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken).catch(() => null);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    if (!decoded.email || !isAdmin(decoded.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const level = req.nextUrl.searchParams.get('level');
    const status = req.nextUrl.searchParams.get('status');

    const baseRef = adminDb.collection('examAttempts');
    const queryRef =
      level && status ? baseRef.where('examLevel', '==', level).where('status', '==', status)
      : level        ? baseRef.where('examLevel', '==', level)
      : status       ? baseRef.where('status', '==', status)
      :                baseRef;

    const snap = await queryRef.get();

    const attempts = snap.docs
      .map((d) => {
        const data = d.data();
        return {
          id: d.id,
          userId: data.userId,
          email: data.email,
          displayName: data.displayName ?? '',
          examLevel: data.examLevel,
          status: data.status,
          score: data.score ?? null,
          passed: data.passed ?? null,
          passingScore: data.passingScore ?? 80,
          flaggedForReview: data.flaggedForReview ?? false,
          suspiciousRiskLevel: data.suspiciousRiskLevel ?? 'low',
          startedAt: data.startedAt?.toDate?.()?.toISOString() ?? null,
          completedAt: data.completedAt?.toDate?.()?.toISOString() ?? null,
          cooldownUntil: data.cooldownUntil?.toDate?.()?.toISOString() ?? null,
          certificateId: data.certificateId ?? null,
        };
      })
      .sort((a, b) => {
        if (!a.startedAt) return 1;
        if (!b.startedAt) return -1;
        return b.startedAt.localeCompare(a.startedAt);
      });

    return NextResponse.json({ attempts });
  } catch (err: any) {
    console.error('Admin attempts error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
