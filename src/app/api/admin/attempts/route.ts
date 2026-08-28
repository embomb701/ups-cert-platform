import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken).catch(() => null);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    if (!(await checkIsAdmin(decoded.uid, decoded.email ?? ''))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const level = req.nextUrl.searchParams.get('level');
    const status = req.nextUrl.searchParams.get('status');

    const JR_TRADE_LEVELS = [
      'jr_kitchen_fse', 'jr_hvac_fse', 'jr_gen_fse', 'jr_dc_cft', 'jr_solar_fse',
      'jr_ev_tech', 'jr_dcp_tech', 'jr_battery_tech', 'jr_dc_engineer', 'jr_marine_tech',
      'jr_pool_tech', 'jr_hvac_tech', 'jr_solar_inst', 'jr_wind_tech', 'jr_elevator_tech',
      'jr_fire_alarm_tech', 'jr_bmet_tech', 'jr_bas_tech', 'jr_ref_tech', 'jr_plc_tech',
      'jr_security_tech', 'jr_field_pm', 'jr_pump_tech', 'jr_industrial_ref', 'jr_dc_ops',
      'jr_building_cx', 'jr_telecom_tech', 'jr_switchgear_tech', 'jr_water_wastewater',
    ];

    const baseRef = adminDb.collection('examAttempts');
    const queryRef =
      level === 'jr' && status ? baseRef.where('examLevel', 'in', JR_TRADE_LEVELS).where('status', '==', status)
      : level === 'jr'         ? baseRef.where('examLevel', 'in', JR_TRADE_LEVELS)
      : level && status        ? baseRef.where('examLevel', '==', level).where('status', '==', status)
      : level                  ? baseRef.where('examLevel', '==', level)
      : status                 ? baseRef.where('status', '==', status)
      :                          baseRef;

    const snap = await queryRef.get();

    const attempts = snap.docs
      .map((d) => {
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
      })
      .sort((a, b) => {
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
