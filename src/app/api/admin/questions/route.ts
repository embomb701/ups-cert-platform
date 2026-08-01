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

    const [jrSnap, jrActiveSnap, fseSnap, fseActiveSnap, kitchenSnap, kitchenActiveSnap, hvacSnap, hvacActiveSnap, genSnap, genActiveSnap, dcSnap, dcActiveSnap, solarSnap, solarActiveSnap, evSnap, evActiveSnap, dcpSnap, dcpActiveSnap, batSnap, batActiveSnap, dceSnap, dceActiveSnap, marineSnap, marineActiveSnap, poolSnap, poolActiveSnap, hvacTechSnap, hvacTechActiveSnap, solarInstSnap, solarInstActiveSnap, windTechSnap, windTechActiveSnap, elevatorTechSnap, elevatorTechActiveSnap, fireAlarmTechSnap, fireAlarmTechActiveSnap, bmetTechSnap, bmetTechActiveSnap, basTechSnap, basTechActiveSnap, refTechSnap, refTechActiveSnap, plcTechSnap, plcTechActiveSnap] = await Promise.all([
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
      collection.where('examLevel', '==', 'jr_marine_tech').count().get(),
      collection.where('examLevel', '==', 'jr_marine_tech').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_pool_tech').count().get(),
      collection.where('examLevel', '==', 'jr_pool_tech').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_hvac_tech').count().get(),
      collection.where('examLevel', '==', 'jr_hvac_tech').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_solar_inst').count().get(),
      collection.where('examLevel', '==', 'jr_solar_inst').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_wind_tech').count().get(),
      collection.where('examLevel', '==', 'jr_wind_tech').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_elevator_tech').count().get(),
      collection.where('examLevel', '==', 'jr_elevator_tech').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_fire_alarm_tech').count().get(),
      collection.where('examLevel', '==', 'jr_fire_alarm_tech').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_bmet_tech').count().get(),
      collection.where('examLevel', '==', 'jr_bmet_tech').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_bas_tech').count().get(),
      collection.where('examLevel', '==', 'jr_bas_tech').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_ref_tech').count().get(),
      collection.where('examLevel', '==', 'jr_ref_tech').where('active', '==', true).count().get(),
      collection.where('examLevel', '==', 'jr_plc_tech').count().get(),
      collection.where('examLevel', '==', 'jr_plc_tech').where('active', '==', true).count().get(),
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
      jr_marine_tech: {
        total: marineSnap.data().count,
        active: marineActiveSnap.data().count,
      },
      jr_pool_tech: {
        total: poolSnap.data().count,
        active: poolActiveSnap.data().count,
      },
      jr_hvac_tech: {
        total: hvacTechSnap.data().count,
        active: hvacTechActiveSnap.data().count,
      },
      jr_solar_inst: {
        total: solarInstSnap.data().count,
        active: solarInstActiveSnap.data().count,
      },
      jr_wind_tech: {
        total: windTechSnap.data().count,
        active: windTechActiveSnap.data().count,
      },
      jr_elevator_tech: {
        total: elevatorTechSnap.data().count,
        active: elevatorTechActiveSnap.data().count,
      },
      jr_fire_alarm_tech: {
        total: fireAlarmTechSnap.data().count,
        active: fireAlarmTechActiveSnap.data().count,
      },
      jr_bmet_tech: {
        total: bmetTechSnap.data().count,
        active: bmetTechActiveSnap.data().count,
      },
      jr_bas_tech: {
        total: basTechSnap.data().count,
        active: basTechActiveSnap.data().count,
      },
      jr_ref_tech: {
        total: refTechSnap.data().count,
        active: refTechActiveSnap.data().count,
      },
      jr_plc_tech: {
        total: plcTechSnap.data().count,
        active: plcTechActiveSnap.data().count,
      },
    });
  } catch (err: any) {
    console.error('Question count error:', err);
    return NextResponse.json({ error: err.message ?? 'Failed' }, { status: 500 });
  }
}
