import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { AcceptInviteButton } from '@/components/team/AcceptInviteButton';

export const dynamic = 'force-dynamic';

function courseLabel(key: string): string {
  const map: Record<string, string> = {
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
  return map[key] ?? key;
}

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function InvitePage({ params }: PageProps) {
  const { token } = await params;

  // Load invitation
  const inviteSnap = await adminDb.collection('teamInvitations').doc(token).get();

  if (!inviteSnap.exists) {
    return <InviteError message="This invitation link is invalid or has been removed." />;
  }

  const invite = inviteSnap.data()!;

  if (invite.status === 'revoked') {
    return <InviteError message="This invitation has been revoked by the sender." />;
  }

  if (invite.status === 'accepted') {
    return <InviteError message="This invitation has already been accepted." />;
  }

  const expiresAt: Date = invite.expiresAt?.toDate
    ? invite.expiresAt.toDate()
    : invite.expiresAt instanceof Date
    ? invite.expiresAt
    : new Date(0);

  if (new Date() > expiresAt) {
    return <InviteError message="This invitation link has expired. Please contact the sender for a new one." />;
  }

  // Check if user is logged in
  const cookieStore = await cookies();
  const firebaseToken = cookieStore.get('firebase-token')?.value;

  let isLoggedIn = false;
  let alreadyHasAccess = false;

  if (firebaseToken) {
    try {
      const decoded = await adminAuth.verifyIdToken(firebaseToken);
      isLoggedIn = true;
      const accessDoc = await adminDb
        .collection('users').doc(decoded.uid)
        .collection('examAccess').doc(invite.courseKey).get();
      alreadyHasAccess = accessDoc.exists && accessDoc.data()?.granted === true;
    } catch {
      // token invalid, treat as logged out
    }
  }

  const courseName = courseLabel(invite.courseKey);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-10 px-4">
      <div className="max-w-md w-full space-y-6">

        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Team invitation</p>
          <h1 className="text-2xl font-bold text-white mb-2">You&apos;ve been invited</h1>
          <p className="text-gray-400 text-sm">
            <span className="text-white font-medium">{invite.inviterEmail}</span> has granted you access to:
          </p>
        </div>

        <div className="rounded-xl border border-blue-700/50 bg-blue-950/20 p-5 text-center">
          <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">Course</p>
          <p className="text-white font-bold text-lg">{courseName}</p>
          <p className="text-gray-500 text-xs mt-2">
            Invitation expires {expiresAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {alreadyHasAccess ? (
          <div className="rounded-xl border border-green-700/50 bg-green-950/20 p-5 text-center space-y-3">
            <p className="text-green-400 font-semibold text-sm">You already have access to this course.</p>
            <a
              href="/training"
              className="block py-2.5 px-5 bg-green-700 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition-colors text-center"
            >
              Go to Training Portal →
            </a>
          </div>
        ) : isLoggedIn ? (
          <div className="space-y-3">
            <AcceptInviteButton token={token} courseName={courseName} />
          </div>
        ) : (
          <div className="rounded-xl border border-gray-700 bg-gray-800/40 p-5 space-y-4 text-center">
            <p className="text-gray-300 text-sm">
              Sign in or create a free account to accept this invitation.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`/login?redirect=/invite/${token}`}
                className="block py-2.5 px-5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors text-center"
              >
                Sign in to accept
              </a>
              <a
                href={`/signup?redirect=/invite/${token}`}
                className="block py-2.5 px-5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-colors text-center"
              >
                Create a free account
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function InviteError({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-10 px-4">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-xl font-bold text-white">Invitation unavailable</h1>
        <p className="text-gray-400 text-sm">{message}</p>
        <a href="/training" className="inline-block text-blue-400 hover:text-blue-300 text-sm underline">
          Browse the Training Portal
        </a>
      </div>
    </div>
  );
}
