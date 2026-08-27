import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { COURSE_SEQUENCES } from '@/data';
import { COURSES } from '@/data/courses';
import { coursePriceLabel } from '@/lib/stripe/client';

export const dynamic = 'force-dynamic';

// Current day-streak: consecutive UTC calendar days with at least one
// module completion, anchored at today (or yesterday, so the streak
// doesn't drop to 0 the moment the clock rolls over before today's
// first module is done).
function computeStreak(days: Set<string>): number {
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  let cursor = new Date();
  cursor.setUTCHours(0, 0, 0, 0);
  let cursorKey = cursor.toISOString().slice(0, 10);
  if (!days.has(cursorKey)) {
    cursor = new Date(cursor.getTime() - ONE_DAY_MS);
    cursorKey = cursor.toISOString().slice(0, 10);
    if (!days.has(cursorKey)) return 0;
  }
  let streak = 0;
  while (days.has(cursorKey)) {
    streak++;
    cursor = new Date(cursor.getTime() - ONE_DAY_MS);
    cursorKey = cursor.toISOString().slice(0, 10);
  }
  return streak;
}

const COURSE_TO_PRACTICE_EXAM_LEVEL: Record<string, string> = {
  training_kitchen: 'jr_kitchen_fse',
  training_hvac: 'jr_hvac_fse',
  training_generator: 'jr_gen_fse',
  training_datacenter: 'jr_dc_cft',
  training_solar: 'jr_solar_fse',
  training_evcharging: 'jr_ev_tech',
  training_dcplants: 'jr_dcp_tech',
  training_battery: 'jr_battery_tech',
  training_dcengineer: 'jr_dc_engineer',
  training_marine: 'jr_marine_tech',
  training_pool: 'jr_pool_tech',
  training_hvac_tech: 'jr_hvac_tech',
  training_solar_inst: 'jr_solar_inst',
  training_wind_tech: 'jr_wind_tech',
  training_elevator_tech: 'jr_elevator_tech',
  training_fire_alarm_tech: 'jr_fire_alarm_tech',
  training_bmet_tech: 'jr_bmet_tech',
  training_bas_tech: 'jr_bas_tech',
  training_ref_tech: 'jr_ref_tech',
  training_plc_tech: 'jr_plc_tech',
  training_security_tech: 'jr_security_tech',
  training_field_pm: 'jr_field_pm',
  training_pump_tech: 'jr_pump_tech',
  training_industrial_ref: 'jr_industrial_ref',
  training_dc_ops: 'jr_dc_ops',
  training_building_cx: 'jr_building_cx',
  training_telecom: 'jr_telecom_tech',
  training_switchgear_tech: 'jr_switchgear_tech',
};

const COURSE_NAMES: Record<string, string> = {
  training_portal: 'UPS Field Service Engineering',
  training_kitchen: 'Commercial Kitchen FSE',
  training_hvac: 'HVAC Field Service Engineering',
  training_generator: 'Power Generation FSE',
  training_datacenter: 'Data Center Critical Facilities',
  training_solar: 'Solar & Battery Energy Storage',
  training_evcharging: 'EV Charging Infrastructure',
  training_dcplants: 'Telecom DC Power Plants',
  training_battery: 'Battery Systems Technician',
  training_dcengineer: 'Data Center Engineer',
  training_marine: 'Marine Systems Technician',
  training_pool: 'Pool Equipment Technician',
  training_hvac_tech: 'HVAC Technician',
  training_solar_inst: 'Solar Installer',
  training_wind_tech: 'Wind Turbine Technician',
  training_elevator_tech: 'Elevator Technician',
  training_fire_alarm_tech: 'Fire Alarm Technician',
  training_bmet_tech: 'Biomedical Equipment Technician',
  training_bas_tech: 'Building Automation Systems',
  training_ref_tech: 'Commercial Refrigeration Tech',
  training_plc_tech: 'Industrial Controls & PLC',
  training_security_tech: 'Electronic Security Systems',
  training_field_pm: 'Field Project Manager',
  training_pump_tech: 'Pump Technician',
  training_industrial_ref: 'Industrial Refrigeration Operator',
  training_dc_ops: 'Data Center Operations Manager',
  training_building_cx: 'Building Commissioning Agent',
  training_telecom: 'Telecom OSP Technician',
  training_switchgear_tech: 'Switchgear & Substation Technician',
};

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const token = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;
    const email = decoded.email ?? '';

    const [
      jrSnap,
      aiSnap,
      fseOrdersSnap,
      accessSnap,
      progressSnap,
      certsSnap,
      attemptsSnap,
      jobAppsSnap,
      employerOrdersSnap,
      userSnap,
    ] = await Promise.all([
      adminDb.collection('users').doc(uid).collection('examAccess').doc('jr_fse').get(),
      adminDb.collection('users').doc(uid).collection('examAccess').doc('fse_ai').get(),
      adminDb.collection('proctoredExamOrders')
        .where('userId', '==', uid)
        .where('productId', '==', 'fse_proctored_exam')
        .limit(1)
        .get(),
      adminDb.collection('users').doc(uid).collection('examAccess').get(),
      adminDb.collection('users').doc(uid).collection('trainingProgress').get(),
      adminDb.collection('certificates')
        .where('userId', '==', uid)
        .orderBy('issuedAt', 'desc')
        .get(),
      adminDb.collection('examAttempts')
        .where('userId', '==', uid)
        .orderBy('startedAt', 'desc')
        .limit(20)
        .get(),
      adminDb.collection('jobApplications')
        .where('applicantUid', '==', uid)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get(),
      adminDb.collection('employerOrders')
        .where('userId', '==', uid)
        .orderBy('createdAt', 'desc')
        .get(),
      adminDb.collection('users').doc(uid).get(),
    ]);

    const isAdmin = await checkIsAdmin(uid, email);

    // Exam access
    const fseOrder = fseOrdersSnap.empty ? null : fseOrdersSnap.docs[0].data();
    const access = {
      jr_fse: jrSnap.exists && jrSnap.data()?.granted === true,
      fse_ai: aiSnap.exists && aiSnap.data()?.granted === true,
      fse_proctored: fseOrder?.status ?? null,
    };

    // Completed module ids
    const completedIds = new Set<string>();
    const completionDays = new Set<string>(); // 'YYYY-MM-DD' (UTC) for streak calc
    progressSnap.forEach((doc) => {
      const d = doc.data();
      if (d.passed) {
        completedIds.add(doc.id);
        const completedAt = d.completedAt?.toDate?.() as Date | undefined;
        if (completedAt) completionDays.add(completedAt.toISOString().slice(0, 10));
      }
    });
    const streak = computeStreak(completionDays);

    // Enrolled courses with progress
    const enrolledCourseKeys = new Set<string>();
    const grantedPractice = new Set<string>();
    accessSnap.forEach((doc) => {
      if (doc.data().granted && COURSE_NAMES[doc.id]) enrolledCourseKeys.add(doc.id);
      if (doc.id.startsWith('practice_') && doc.data().granted === true) {
        grantedPractice.add(doc.id.slice('practice_'.length));
      }
    });

    // If the user has no enrolled courses but has made progress on trial modules,
    // show the UPS FSE course as a trial entry so they can see their progress
    if (!enrolledCourseKeys.has('training_portal') && !enrolledCourseKeys.has('training_course') && completedIds.size > 0) {
      const upsModules = COURSE_SEQUENCES['training_portal'] ?? [];
      const hasUpsProgress = upsModules.some((m) => completedIds.has(m.id));
      if (hasUpsProgress) enrolledCourseKeys.add('training_portal');
    }

    const enrolledCourses = Array.from(enrolledCourseKeys).map((key) => {
      const modules = COURSE_SEQUENCES[key] ?? [];
      const completedCount = modules.filter((m) => completedIds.has(m.id)).length;
      const examLevel = COURSE_TO_PRACTICE_EXAM_LEVEL[key] ?? null;
      const practiceExamLevel = examLevel && grantedPractice.has(examLevel) ? examLevel : null;
      return {
        key,
        name: COURSE_NAMES[key] ?? key,
        completed: completedCount,
        total: modules.length,
        practiceExamLevel,
      };
    }).sort((a, b) => b.completed / (b.total || 1) - a.completed / (a.total || 1));

    // Cross-sell: courses the user hasn't purchased, ranked by how much of
    // that course's own sequence they've already completed — almost always
    // via the shared 10-module foundation every course starts with. Filters
    // out noise (a couple of stray shared modules) and only surfaces a real
    // head start: the full foundation done (>=10 modules) and at least a
    // quarter of that course's total sequence already behind them.
    const crossSell = COURSES
      .filter((c) => !c.free && c.stripeProductId && !enrolledCourseKeys.has(c.accessKey))
      .map((c) => {
        const modules = COURSE_SEQUENCES[c.accessKey] ?? [];
        const completedCount = modules.filter((m) => completedIds.has(m.id)).length;
        const pct = modules.length > 0 ? completedCount / modules.length : 0;
        return {
          id: c.id,
          title: c.title,
          shortTitle: c.shortTitle,
          stripeProductId: c.stripeProductId!,
          priceLabel: coursePriceLabel(c.stripeProductId) ?? null,
          completedCount,
          total: modules.length,
          pct: Math.round(pct * 100),
        };
      })
      .filter((c) => c.completedCount >= 10 && c.pct >= 25)
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 3);

    // Certificates
    const certificates = certsSnap.docs.map((doc) => {
      const d = doc.data();
      const issuedAt = d.issuedAt?.toDate?.()?.toISOString() ?? null;
      return {
        id: doc.id,
        certificateNumber: d.certificateNumber as string,
        certificationTitle: d.certificationTitle as string,
        examLevel: d.examLevel as string,
        issuedAt,
        status: d.status as string,
        score: d.publicScoreEnabled ? (d.score as number) : null,
      };
    });

    // Exam attempts
    const attempts = attemptsSnap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        examLevel: d.examLevel as string,
        score: d.score as number | undefined,
        passed: d.passed as boolean | undefined,
        completedAt: d.completedAt?.toDate?.()?.toISOString() ?? null,
      };
    });

    // Job applications
    const jobApplications = jobAppsSnap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        listingId: d.listingId as string,
        listingTitle: d.listingTitle as string,
        company: d.company as string,
        status: d.status as string,
        createdAt: d.createdAt?.toDate?.()?.toISOString() ?? null,
      };
    });

    // Employer orders
    const employerOrders = employerOrdersSnap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        seats: d.seats as number,
        seatsUsed: d.seatsUsed as number ?? 0,
        courseKey: d.courseKey as string,
      };
    });

    // Profile
    const userData = userSnap.data() ?? {};
    const profile = {
      openToOpportunities: userData.openToOpportunities ?? false,
      profileVisible: userData.profileVisible ?? true,
      headline: userData.headline ?? '',
      location: userData.location ?? '',
      referralCount: userData.referralCount ?? 0,
    };

    return NextResponse.json({
      isAdmin,
      uid,
      access,
      enrolledCourses,
      crossSell,
      certificates,
      attempts,
      jobApplications,
      employerOrders,
      profile,
      streak,
    });
  } catch (err) {
    console.error('Dashboard API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
