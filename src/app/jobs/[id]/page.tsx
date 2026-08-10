import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { ApplyButton } from '@/components/jobs/ApplyButton';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masteringfse.com';

export const dynamic = 'force-dynamic';

const COURSE_LABELS: Record<string, string> = {
  training_portal: 'UPS Field Service Engineering',
  training_kitchen: 'Commercial Kitchen Field Service Engineering',
  training_hvac: 'HVAC Field Service Engineering',
  training_generator: 'Power Generation Field Service Engineering',
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
  training_fire_alarm_tech: 'Fire Alarm & Suppression Technician',
  training_bmet_tech: 'Biomedical Equipment Technician',
  training_bas_tech: 'Building Automation Systems Technician',
  training_ref_tech: 'Commercial Refrigeration Technician',
  training_plc_tech: 'Industrial Controls & PLC Technician',
  training_security_tech: 'Electronic Security Systems Technician',
  training_field_pm: 'Field Project Manager',
  training_pump_tech: 'Pump Technician',
  training_industrial_ref: 'Industrial Refrigeration Operator',
  training_dc_ops: 'Data Center Operations Manager',
  training_building_cx: 'Building Commissioning (Cx) Agent',
  training_telecom: 'Telecom OSP Technician',
};

const TYPE_COLORS: Record<string, string> = {
  'full-time': 'bg-blue-900/40 text-blue-400 border-blue-700/50',
  'part-time': 'bg-teal-900/40 text-teal-400 border-teal-700/50',
  'contract': 'bg-amber-900/40 text-amber-400 border-amber-700/50',
  'temporary': 'bg-purple-900/40 text-purple-400 border-purple-700/50',
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const snap = await adminDb.collection('jobListings').doc(id).get();
  if (!snap.exists) return { title: 'Job Not Found' };
  const d = snap.data()!;
  return {
    title: `${d.title} at ${d.company} — Mastering Field Service Jobs`,
    description: `${d.type} position in ${d.location}. ${(d.description as string)?.slice(0, 150)}...`,
    openGraph: {
      title: `${d.title} — ${d.company}`,
      description: `${d.type} · ${d.location}`,
      images: [{ url: `${SITE_URL}/api/og`, width: 1200, height: 630, alt: d.title }],
    },
    twitter: { card: 'summary_large_image', images: [`${SITE_URL}/api/og`] },
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { id } = await params;

  const snap = await adminDb.collection('jobListings').doc(id).get();
  if (!snap.exists) notFound();

  const listing = snap.data()!;

  // Check login state
  const cookieStore = await cookies();
  const token = cookieStore.get('firebase-token')?.value;
  let isLoggedIn = false;
  let isOwner = false;
  let alreadyApplied = false;

  if (token) {
    try {
      const decoded = await adminAuth.verifyIdToken(token);
      isLoggedIn = true;
      isOwner = decoded.uid === listing.postedByUid;

      if (!isOwner) {
        const dupSnap = await adminDb
          .collection('jobApplications')
          .where('listingId', '==', id)
          .where('applicantUid', '==', decoded.uid)
          .limit(1)
          .get();
        alreadyApplied = !dupSnap.empty;
      }
    } catch {
      // treat as logged out
    }
  }

  const postedDate: Date | null = listing.createdAt?.toDate?.() ?? null;

  const jobPosting = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: listing.title,
    description: listing.description ?? '',
    hiringOrganization: { '@type': 'Organization', name: listing.company },
    jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: listing.location } },
    employmentType: (listing.type as string)?.toUpperCase().replace('-', '_') ?? 'FULL_TIME',
    datePosted: postedDate ? postedDate.toISOString().slice(0, 10) : undefined,
    url: `${SITE_URL}/jobs/${id}`,
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting) }} />
      <div className="max-w-2xl mx-auto space-y-6">

        <Link href="/jobs" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          ← Back to Job Board
        </Link>

        {listing.status === 'closed' && (
          <div className="rounded-lg border border-gray-700 bg-gray-800/40 px-4 py-3 text-xs text-gray-500">
            This listing is closed and no longer accepting applications.
          </div>
        )}

        {/* Header */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded-full border ${TYPE_COLORS[listing.type] ?? 'bg-gray-700 text-gray-400 border-gray-600'}`}>
              {listing.type}
            </span>
            {postedDate && (
              <span className="text-xs text-gray-600">
                Posted {postedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{listing.title}</h1>
          <p className="text-gray-400 text-sm">{listing.company} · {listing.location}</p>
        </div>

        {/* Preferred certifications */}
        {listing.courseRequirements?.length > 0 && (
          <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Preferred certifications</p>
            <div className="flex flex-wrap gap-1.5">
              {(listing.courseRequirements as string[]).map((key) => (
                <span key={key} className="text-xs px-2.5 py-1 rounded-lg bg-gray-700/60 border border-gray-600/50 text-gray-300">
                  {COURSE_LABELS[key] ?? key}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Job Description</p>
          <div className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{listing.description}</div>
        </div>

        {/* Apply / owner view */}
        {!isOwner && listing.status === 'active' && (
          <div className="rounded-xl border border-gray-700 bg-gray-800/30 p-5 space-y-3">
            <div>
              <p className="text-white font-semibold text-sm mb-0.5">Apply for this position</p>
              <p className="text-gray-500 text-xs">
                Contact: <a href={`mailto:${listing.contactEmail}`} className="text-blue-400 hover:underline">{listing.contactEmail}</a>
              </p>
            </div>
            {alreadyApplied ? (
              <div className="rounded-lg border border-green-700/50 bg-green-950/20 p-3 text-center">
                <p className="text-green-400 text-sm font-semibold">Application submitted</p>
                <p className="text-gray-500 text-xs mt-0.5">The employer has your contact info and will reach out directly.</p>
              </div>
            ) : (
              <ApplyButton listingId={id} isLoggedIn={isLoggedIn} />
            )}
          </div>
        )}

        {isOwner && (
          <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-4 space-y-2">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Your listing</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                {listing.applicationCount ?? 0} applicant{(listing.applicationCount ?? 0) !== 1 ? 's' : ''}
              </p>
              <div className="flex gap-2">
                <Link
                  href="/account/jobs"
                  className="text-xs px-3 py-1.5 rounded-lg border border-gray-600 text-gray-400 hover:border-gray-500 transition-colors"
                >
                  Manage listings
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
