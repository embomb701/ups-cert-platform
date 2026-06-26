import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Check for authenticated user
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];

    let hasAccess = false;
    let freeViaTraining = false;

    if (idToken) {
      try {
        const decoded = await adminAuth.verifyIdToken(idToken);
        const uid = decoded.uid;

        // Already has practice test access?
        const ptSnap = await adminDb
          .collection('users').doc(uid)
          .collection('examAccess').doc('practice_test')
          .get();
        if (ptSnap.exists && ptSnap.data()?.granted) {
          hasAccess = true;
        }

        // Has training access? → gets practice test free
        if (!hasAccess) {
          const trainingSnap = await adminDb
            .collection('users').doc(uid)
            .collection('examAccess').doc('training_portal')
            .get();
          if (trainingSnap.exists && trainingSnap.data()?.granted) {
            freeViaTraining = true;
          }
        }
      } catch {
        // Invalid token — treat as unauthenticated
      }
    }

    const settingsSnap = await adminDb.collection('settings').doc('practiceTest').get();
    const globalFree = settingsSnap.exists ? settingsSnap.data()?.free === true : false;
    const freeNote = settingsSnap.data()?.freeNote ?? null;

    return NextResponse.json({
      free: globalFree || freeViaTraining,
      freeViaTraining,
      freeNote: freeViaTraining ? 'Included free with your training course' : freeNote,
      price: 1499,
      hasAccess,
    });
  } catch {
    return NextResponse.json({ free: false, price: 1499, hasAccess: false });
  }
}
