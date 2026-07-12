import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    if (!(await checkIsAdmin(decoded.uid, decoded.email ?? ''))) {
      return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 });
    }

    const collection = adminDb.collection('questionBank');

    const [jrSnap, jrActiveSnap, fseSnap, fseActiveSnap, kitchenSnap, kitchenActiveSnap, hvacSnap, hvacActiveSnap, genSnap, genActiveSnap] = await Promise.all([
      collection.where('examLevel', '==', 'jr_fse').count().get(),
      collection.where('examLevel', '==', 'jr_fse').where('active', '==', true).count().get(),
      collection.where('examLevel', 'in', ['fse', 'fse_ai']).count().get(),
      collection.where('examLevel', 'in', ['fse', 'fse_ai']).where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_kitchen_fse').count().get(),
      collection.where('examLevel', '==', 'jr_kitchen_fse').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_hvac_fse').count().get(),
      collection.where('examLevel', '==', 'jr_hvac_fse').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_gen_fse').count().get(),
      collection.where('examLevel', '==', 'jr_gen_fse').where('active', '==', true).count().get(),
    ]);

    return NextResponse.json({
      jr_fse: {
        total: jrSnap.data().count,
        active: jrActiveSnap.data().count,
      },
      fse: {
        total: fseSnap.data().count,
        active: fseActiveSnap.data().count,
      },
      jr_kitchen_fse: {
        total: kitchenSnap.data().count,
        active: kitchenActiveSnap.data().count,
      },
      jr_hvac_fse: {
        total: hvacSnap.data().count,
        active: hvacActiveSnap.data().count,
      },
      jr_gen_fse: {
        total: genSnap.data().count,
        active: genActiveSnap.data().count,
      },
    });
  } catch (err: any) {
    console.error('Question count error:', err);
    return NextResponse.json({ error: err.message ?? 'Failed' }, { status: 500 });
  }
}
