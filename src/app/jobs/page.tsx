import { adminDb } from '@/lib/firebase/admin';
import Link from 'next/link';
import { JobBoardList, type JobListing } from '@/components/jobs/JobBoardList';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

export const metadata = {
  title: 'Job Board — Find Technical Field Service Positions',
  description:
    'Browse open field service positions posted by employers across UPS, HVAC, data center, kitchen, and power generation sectors. Certify first — get hired faster.',
  openGraph: {
    title: 'Field Service Job Board — Mastering Field Service',
    description:
      'Employers post open field service roles here. Get certified on Mastering Field Service and apply directly.',
    images: [{ url: `${SITE_URL}/api/og`, width: 1200, height: 630, alt: 'Field Service Job Board' }],
  },
  twitter: { card: 'summary_large_image', images: [`${SITE_URL}/api/og`] },
};

const COURSE_LABELS: Record<string, string> = {
  training_portal: 'UPS FSE',
  training_kitchen: 'Kitchen FSE',
  training_hvac: 'HVAC FSE',
  training_generator: 'Generator FSE',
  training_datacenter: 'Data Center CFT',
  training_solar: 'Solar/BESS',
  training_evcharging: 'EV Charging',
  training_dcplants: 'DC Plant Tech',
  training_battery: 'Battery Tech',
  training_dcengineer: 'DC Engineer',
  training_marine: 'Marine Tech',
  training_pool: 'Pool Equipment',
  training_hvac_tech: 'HVAC Tech',
  training_solar_inst: 'Solar Installer',
  training_wind_tech: 'Wind Turbine',
  training_elevator_tech: 'Elevator Tech',
  training_fire_alarm_tech: 'Fire Alarm',
  training_bmet_tech: 'BMET',
  training_bas_tech: 'BAS Tech',
  training_ref_tech: 'Ref Tech',
  training_plc_tech: 'PLC Tech',
  training_security_tech: 'Security Tech',
  training_field_pm: 'Field PM',
  training_pump_tech: 'Pump Tech',
  training_industrial_ref: 'Industrial Ref',
  training_dc_ops: 'DC Ops Manager',
  training_building_cx: 'Building Cx',
  training_telecom: 'Telecom OSP',
  training_switchgear_tech: 'Switchgear Tech',
};

interface FirestoreListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  courseRequirements: string[];
  applicationCount: number;
  createdAt: { toDate?: () => Date } | null;
}

function timeAgo(date: Date): string {
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

interface JobsPageProps {
  searchParams: Promise<{ course?: string }>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const { course: courseFilter } = await searchParams;
  const filterLabel = courseFilter ? COURSE_LABELS[courseFilter] : undefined;

  const snap = await adminDb
    .collection('jobListings')
    .where('status', '==', 'active')
    .orderBy('createdAt', 'desc')
    .limit(100)
    .get();

  const allListings: FirestoreListing[] = snap.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    company: doc.data().company,
    location: doc.data().location,
    type: doc.data().type,
    courseRequirements: doc.data().courseRequirements ?? [],
    applicationCount: doc.data().applicationCount ?? 0,
    createdAt: doc.data().createdAt ?? null,
  }));

  // Only actually filter when the param matches a real certification — an
  // unrecognized value falls back to showing everything rather than an
  // empty, confusing page.
  const courseFiltered = filterLabel
    ? allListings.filter((l) => l.courseRequirements.includes(courseFilter!))
    : allListings;

  const listings: JobListing[] = courseFiltered.map((l) => ({
    id: l.id,
    title: l.title,
    company: l.company,
    location: l.location,
    type: l.type,
    courseRequirements: l.courseRequirements,
    applicationCount: l.applicationCount,
    postedAgo: l.createdAt?.toDate ? timeAgo(l.createdAt.toDate()) : '',
  }));

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Job Board</h1>
            <p className="text-gray-500 text-sm">
              {filterLabel
                ? `${listings.length} listing${listings.length !== 1 ? 's' : ''} matching your ${filterLabel} certification`
                : listings.length > 0
                ? `${listings.length} active listing${listings.length !== 1 ? 's' : ''} from verified employers`
                : 'No active listings yet — check back soon.'}
            </p>
          </div>
          <Link
            href="/jobs/post"
            className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Post a job
          </Link>
        </div>

        {filterLabel && (
          <div className="rounded-lg border border-orange-800/50 bg-orange-950/10 px-4 py-2.5 flex items-center justify-between gap-3">
            <p className="text-xs text-orange-300">
              Filtered to jobs preferring <strong>{filterLabel}</strong> certification.
            </p>
            <Link href="/jobs" className="text-xs text-gray-400 hover:text-white flex-shrink-0">
              Show all jobs →
            </Link>
          </div>
        )}

        {listings.length === 0 ? (
          <div className="rounded-xl border border-gray-700 bg-gray-800/30 p-12 text-center">
            <p className="text-gray-500 text-sm">
              {filterLabel ? `No open listings currently prefer ${filterLabel} specifically.` : 'No active job listings yet.'}
            </p>
            {filterLabel ? (
              <p className="text-gray-600 text-xs mt-2">
                <Link href="/jobs" className="text-blue-400 hover:text-blue-300 underline">Browse all open listings</Link>{' '}
                instead — many employers hire across multiple certifications.
              </p>
            ) : (
              <p className="text-gray-600 text-xs mt-2">
                Employers with a seat pack can{' '}
                <Link href="/jobs/post" className="text-blue-400 hover:text-blue-300 underline">post positions</Link>{' '}
                here.
              </p>
            )}
          </div>
        ) : (
          <JobBoardList listings={listings} courseLabels={COURSE_LABELS} />
        )}

      </div>
    </div>
  );
}
