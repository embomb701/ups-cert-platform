import { adminDb } from '@/lib/firebase/admin';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Job Board — Find Technical Field Service Positions',
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
};

const TYPE_COLORS: Record<string, string> = {
  'full-time': 'bg-blue-900/40 text-blue-400 border-blue-700/50',
  'part-time': 'bg-teal-900/40 text-teal-400 border-teal-700/50',
  'contract': 'bg-amber-900/40 text-amber-400 border-amber-700/50',
  'temporary': 'bg-purple-900/40 text-purple-400 border-purple-700/50',
};

interface Listing {
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

export default async function JobsPage() {
  const snap = await adminDb
    .collection('jobListings')
    .where('status', '==', 'active')
    .orderBy('createdAt', 'desc')
    .limit(100)
    .get();

  const listings: Listing[] = snap.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    company: doc.data().company,
    location: doc.data().location,
    type: doc.data().type,
    courseRequirements: doc.data().courseRequirements ?? [],
    applicationCount: doc.data().applicationCount ?? 0,
    createdAt: doc.data().createdAt ?? null,
  }));

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Job Board</h1>
            <p className="text-gray-500 text-sm">
              {listings.length > 0
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

        {listings.length === 0 ? (
          <div className="rounded-xl border border-gray-700 bg-gray-800/30 p-12 text-center">
            <p className="text-gray-500 text-sm">No active job listings yet.</p>
            <p className="text-gray-600 text-xs mt-2">
              Employers with a seat pack can{' '}
              <Link href="/jobs/post" className="text-blue-400 hover:text-blue-300 underline">post positions</Link>{' '}
              here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {listings.map((listing) => {
              const postedDate = listing.createdAt?.toDate?.();
              return (
                <Link
                  key={listing.id}
                  href={`/jobs/${listing.id}`}
                  className="block rounded-xl border border-gray-700 bg-gray-800/40 hover:border-gray-600 hover:bg-gray-800/60 p-5 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="text-white font-semibold text-sm">{listing.title}</h2>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${TYPE_COLORS[listing.type] ?? 'bg-gray-700 text-gray-400 border-gray-600'}`}>
                          {listing.type}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs mb-2">
                        {listing.company} · {listing.location}
                      </p>
                      {listing.courseRequirements.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {listing.courseRequirements.slice(0, 4).map((key) => (
                            <span key={key} className="text-xs px-2 py-0.5 rounded bg-gray-700/60 text-gray-400">
                              {COURSE_LABELS[key] ?? key}
                            </span>
                          ))}
                          {listing.courseRequirements.length > 4 && (
                            <span className="text-xs px-2 py-0.5 rounded bg-gray-700/60 text-gray-500">
                              +{listing.courseRequirements.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-gray-600 text-xs">{postedDate ? timeAgo(postedDate) : ''}</p>
                      {listing.applicationCount > 0 && (
                        <p className="text-gray-600 text-xs mt-1">
                          {listing.applicationCount} applicant{listing.applicationCount !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
