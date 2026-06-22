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

    const [jrSnap, aiSnap, fseOrdersSnap] = await Promise.all([
      adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_fse').get(),
      adminDb.collection('users').doc(uid).collection('examAccess').doc('fse_ai').get(),
      adminDb
        .collection('proctoredExamOrders')
        .where('userId', '==', uid)
        .where('productId', '==', 'fse_proctored_exam')
        .limit(1)
        .get(),
    ]);

    const fseOrder = fseOrdersSnap.empty ? null : fseOrdersSnap.docs[0].data();

    return NextResponse.json({
      jr_fse: jrSnap.exists ? (jrSnap.data()?.granted === true) : false,
      fse_ai: aiSnap.exists ? (aiSnap.data()?.granted === true) : false,
      fse_proctored: fseOrder?.status ?? null,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
