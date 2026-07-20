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

    const [jrSnap, jrActiveSnap, fseSnap, fseActiveSnap, kitchenSnap, kitchenActiveSnap, hvacSnap, hvacActiveSnap, genSnap, genActiveSnap, dcSnap, dcActiveSnap, solarSnap, solarActiveSnap, evSnap, evActiveSnap, dcpSnap, dcpActiveSnap, batSnap, batActiveSnap, dceSnap, dceActiveSnap] = await Promise.all([
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
      collection.where('examLevel', '==', 'jr_dc_cft').count().get(),
      collection.where('examLevel', '==', 'jr_dc_cft').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_solar_fse').count().get(),
      collection.where('examLevel', '==', 'jr_solar_fse').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_ev_tech').count().get(),
      collection.where('examLevel', '==', 'jr_ev_tech').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_dcp_tech').count().get(),
      collection.where('examLevel', '==', 'jr_dcp_tech').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_battery_tech').count().get(),
      collection.where('examLevel', '==', 'jr_battery_tech').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_dc_engineer').count().get(),
      collection.where('examLevel', '==', 'jr_dc_engineer').where('active', '==', true).count().get(),
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
      jr_dc_cft: {
        total: dcSnap.data().count,
        active: dcActiveSnap.data().count,
      },
      jr_solar_fse: {
        total: solarSnap.data().count,
        active: solarActiveSnap.data().count,
      },
      jr_ev_tech: {
        total: evSnap.data().count,
        active: evActiveSnap.data().count,
      },
      jr_dcp_tech: {
        total: dcpSnap.data().count,
        active: dcpActiveSnap.data().count,
      },
      jr_battery_tech: {
        total: batSnap.data().count,
        active: batActiveSnap.data().count,
      },
      jr_dc_engineer: {
        total: dceSnap.data().count,
        active: dceActiveSnap.data().count,
      },
    });
  } catch (err: any) {
    console.error('Question count error:', err);
    return NextResponse.json({ error: err.message ?? 'Failed' }, { status: 500 });
  }
}
