import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

/**
 * Returns the (sanitized) result of a completed exam attempt for its owner.
 * Never exposes correct answers — only the score, pass/fail, certificate
 * reference and category breakdown that were computed server-side at submit.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { attemptId: string } }
) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    let uid: string;
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      uid = decoded.uid;
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const attemptId = params.attemptId;
    if (typeof attemptId !== 'string' || attemptId.length === 0 || attemptId.includes('/')) {
      return NextResponse.json({ error: 'Invalid attemptId' }, { status: 400 });
    }

    const snap = await adminDb.collection('examAttempts').doc(attemptId).get();
    if (!snap.exists) {
      return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    }

    const attempt = snap.data()!;
    if (attempt.userId !== uid) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    if (attempt.status !== 'completed') {
      return NextResponse.json({ error: 'Attempt not yet completed' }, { status: 409 });
    }

    return NextResponse.json({
      score: attempt.score ?? 0,
      passed: attempt.passed ?? false,
      passingScore: attempt.passingScore ?? 80,
      examLevel: attempt.examLevel,
      certificateId: attempt.certificateId,
      certificateNumber: attempt.certificateNumber,
      categoryBreakdown: attempt.categoryBreakdown ?? {},
      flaggedForReview: attempt.flaggedForReview ?? false,
    });
  } catch (err) {
    console.error('Exam result fetch error:', err);
    return NextResponse.json({ error: 'Failed to load result' }, { status: 500 });
  }
}
