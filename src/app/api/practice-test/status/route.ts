import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { ALL_MODULES } from '@/data/index';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];

    let hasAccess = false;
    let allModulesComplete = false;

    if (idToken) {
      try {
        const decoded = await adminAuth.verifyIdToken(idToken);
        const uid = decoded.uid;

        // Already has practice test access (granted directly)?
        const ptSnap = await adminDb
          .collection('users').doc(uid)
          .collection('examAccess').doc('practice_test')
          .get();
        if (ptSnap.exists && ptSnap.data()?.granted) {
          hasAccess = true;
        }

        // Check if all 28 training modules are complete → unlocks practice test free
        if (!hasAccess) {
          const progressSnap = await adminDb
            .collection('users').doc(uid)
            .collection('trainingProgress').get();
          const progressMap: Record<string, { completedAt?: unknown; passed?: boolean }> = {};
          progressSnap.forEach((doc) => { progressMap[doc.id] = doc.data() as typeof progressMap[string]; });
          allModulesComplete = ALL_MODULES.every((mod) => {
            const p = progressMap[mod.id] ?? {};
            return !!(p.completedAt && p.passed);
          });
        }
      } catch {
        // Invalid token — treat as unauthenticated
      }
    }

    const settingsSnap = await adminDb.collection('settings').doc('practiceTest').get();
    const globalFree = settingsSnap.exists ? settingsSnap.data()?.free === true : false;
    const freeNote = settingsSnap.data()?.freeNote ?? null;

    return NextResponse.json({
      free: globalFree || allModulesComplete,
      freeViaTraining: allModulesComplete,
      freeNote: allModulesComplete
        ? 'Unlocked — you completed all 28 training modules'
        : freeNote,
      price: 0,
      hasAccess,
    });
  } catch {
    return NextResponse.json({ free: false, price: 0, hasAccess: false });
  }
}
