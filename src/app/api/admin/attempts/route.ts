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

    let decoded: Awaited<ReturnType<typeof adminAuth.verifyIdToken>>;
    try {
      decoded = await adminAuth.verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!decoded.email || !isAdmin(decoded.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const level = req.nextUrl.searchParams.get('level');
    const status = req.nextUrl.searchParams.get('status');

    let query: FirebaseFirestore.Query = adminDb.collection('examAttempts');
    if (level) query = query.where('examLevel', '==', level);
    if (status) query = query.where('status', '==', status);

    const snap = await query.get();

    const attempts = snap.docs.map((d) => {
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
    }).sort((a, b) => {
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
