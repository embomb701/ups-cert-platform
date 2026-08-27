import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { rankWorstQuestions, type QuestionStatRow } from '@/lib/exam/questionStats';

export const dynamic = 'force-dynamic';

// GET /api/admin/question-stats?examLevel=jr_bmet_tech&minSample=10
// Returns that course's questions ranked worst-wrong-rate-first. Requires
// examLevel so a single request stays bounded to one course's bank
// (at most ~1,000 docs) rather than scanning every question site-wide.
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    if (!(await checkIsAdmin(decoded.uid, decoded.email ?? ''))) {
      return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 });
    }

    const examLevel = req.nextUrl.searchParams.get('examLevel');
    if (!examLevel) {
      return NextResponse.json({ error: 'examLevel query param is required' }, { status: 400 });
    }
    const minSample = Number(req.nextUrl.searchParams.get('minSample') ?? '10');

    const snap = await adminDb.collection('questionStats').where('examLevel', '==', examLevel).get();

    const rows: QuestionStatRow[] = snap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        examLevel: d.examLevel,
        category: d.category,
        questionText: d.questionText,
        safetyCritical: !!d.safetyCritical,
        timesAsked: d.timesAsked ?? 0,
        timesCorrect: d.timesCorrect ?? 0,
        timesWrong: d.timesWrong ?? 0,
      };
    });

    const ranked = rankWorstQuestions(rows, Number.isFinite(minSample) ? minSample : 10);

    return NextResponse.json({
      examLevel,
      totalTracked: rows.length,
      totalAboveMinSample: ranked.length,
      questions: ranked.slice(0, 50),
    });
  } catch (err) {
    console.error('Question stats fetch error:', err);
    return NextResponse.json({ error: 'Failed to load question stats' }, { status: 500 });
  }
}
