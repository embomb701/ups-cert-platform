import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { checkIsAdmin } from '@/lib/utils/isAdmin';
import { COURSE_SEQUENCES } from '@/data';

export const dynamic = 'force-dynamic';

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
    progressSnap.forEach((doc) => {
      if (doc.data().passed) completedIds.add(doc.id);
    });

    // Enrolled courses with progress
    const enrolledCourseKeys = new Set<string>();
    accessSnap.forEach((doc) => {
      if (doc.data().granted && COURSE_NAMES[doc.id]) enrolledCourseKeys.add(doc.id);
    });

    const enrolledCourses = Array.from(enrolledCourseKeys).map((key) => {
      const modules = COURSE_SEQUENCES[key] ?? [];
      const completedCount = modules.filter((m) => completedIds.has(m.id)).length;
      return {
        key,
        name: COURSE_NAMES[key] ?? key,
        completed: completedCount,
        total: modules.length,
      };
    }).sort((a, b) => b.completed / (b.total || 1) - a.completed / (a.total || 1));

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
    };

    return NextResponse.json({
      isAdmin,
      uid,
      access,
      enrolledCourses,
      certificates,
      attempts,
      jobApplications,
      employerOrders,
      profile,
    });
  } catch (err) {
    console.error('Dashboard API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
