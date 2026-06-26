import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';

export const dynamic = 'force-dynamic';

const EVENT_WEIGHTS: Record<string, number> = {
  tab_switch: 3,
  blur: 1,
  visibility_change: 2,
  fullscreen_exit: 2,
  copy_attempt: 4,
  paste_attempt: 4,
  cut_attempt: 4,
  right_click: 2,
  text_selection: 1,
  devtools_detected: 10,
  ai_looking_away: 5,
  ai_no_face: 8,
  ai_multiple_faces: 10,
};

const EVENT_LABELS: Record<string, string> = {
  tab_switch: 'Tab / window switch',
  blur: 'Window lost focus',
  visibility_change: 'Page hidden',
  fullscreen_exit: 'Exited fullscreen',
  copy_attempt: 'Copy attempt',
  paste_attempt: 'Paste attempt',
  cut_attempt: 'Cut attempt',
  right_click: 'Right-click',
  text_selection: 'Text selection (Ctrl+A)',
  devtools_detected: 'DevTools opened',
  ai_looking_away: 'Camera: looking away',
  ai_no_face: 'Camera: face not visible',
  ai_multiple_faces: 'Camera: multiple faces',
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken).catch(() => null);
    if (!decoded || !(await checkIsAdmin(decoded.uid, decoded.email ?? ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const attemptId = params.id;

    const snap = await adminDb
      .collection('auditLogs')
      .where('attemptId', '==', attemptId)
      .where('eventType', '==', 'suspicious_event')
      .get();

    // Aggregate by event type
    const totals: Record<string, number> = {};
    for (const doc of snap.docs) {
      const evt = doc.data().eventDetails as { type: string; count: number };
      if (!evt?.type) continue;
      totals[evt.type] = (totals[evt.type] ?? 0) + (evt.count ?? 1);
    }

    let totalScore = 0;
    const events = Object.entries(totals)
      .map(([type, count]) => {
        const weight = EVENT_WEIGHTS[type] ?? 1;
        const pts = Math.min(count * weight, weight * 5);
        totalScore += pts;
        return {
          type,
          label: EVENT_LABELS[type] ?? type,
          count,
          weight,
          pts,
        };
      })
      .sort((a, b) => b.pts - a.pts);

    return NextResponse.json({ events, totalScore });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
