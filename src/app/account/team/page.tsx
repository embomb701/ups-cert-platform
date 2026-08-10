import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { InviteForm } from '@/components/team/InviteForm';
import { RevokeButton } from '@/components/team/RevokeButton';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Team Management — Mastering Field Service',
};

interface EmployerOrder {
  id: string;
  seats: number;
  productId: string;
  createdAt: { toDate?: () => Date } | null;
}

interface Invitation {
  token: string;
  orderId: string;
  inviteeEmail: string;
  courseKey: string;
  status: 'pending' | 'accepted' | 'revoked';
  createdAt: { toDate?: () => Date } | null;
  expiresAt: { toDate?: () => Date } | Date | null;
  acceptedByUid?: string;
}

function courseLabel(key: string): string {
  const map: Record<string, string> = {
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

function statusBadge(status: string) {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-900/40 text-yellow-400 border-yellow-700/50',
    accepted: 'bg-green-900/40 text-green-400 border-green-700/50',
    revoked: 'bg-gray-700/40 text-gray-500 border-gray-600/50',
  };
  return colors[status] ?? 'bg-gray-700 text-gray-400 border-gray-600';
}

export default async function TeamPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('firebase-token')?.value;
  if (!token) redirect('/login');

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
  } catch {
    redirect('/login');
  }

  // Load employer orders for this user
  const ordersSnap = await adminDb
    .collection('employerOrders')
    .where('userId', '==', uid)
    .where('status', '==', 'active')
    .orderBy('createdAt', 'desc')
    .get();

  const orders: EmployerOrder[] = ordersSnap.docs.map((doc) => ({
    id: doc.id,
    seats: doc.data().seats ?? 0,
    productId: doc.data().productId ?? '',
    createdAt: doc.data().createdAt ?? null,
  }));

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 py-10 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-white">Team Management</h1>
          <div className="rounded-xl border border-gray-700 bg-gray-800/40 p-8 text-center">
            <p className="text-gray-400 mb-4">
              You don&apos;t have any active employer seat packs.
            </p>
            <p className="text-gray-500 text-sm">
              Purchase a 5-seat or 10-seat employer pack from the{' '}
              <a href="/training" className="text-blue-400 underline hover:text-blue-300">Training Portal</a>{' '}
              to manage team access.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Load all invitations for these orders
  const orderIds = orders.map((o) => o.id);
  const allInvites: Invitation[] = [];
  for (const oid of orderIds) {
    const snap = await adminDb
      .collection('teamInvitations')
      .where('orderId', '==', oid)
      .orderBy('createdAt', 'desc')
      .get();
    snap.docs.forEach((doc) => {
      allInvites.push({ token: doc.id, ...doc.data() } as Invitation);
    });
  }

  // Map orderId → invitation list
  const invitesByOrder: Record<string, Invitation[]> = {};
  allInvites.forEach((inv) => {
    if (!invitesByOrder[inv.orderId]) invitesByOrder[inv.orderId] = [];
    invitesByOrder[inv.orderId].push(inv);
  });

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-10">

        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Team Management</h1>
          <p className="text-gray-500 text-sm">
            Invite team members to courses using your employer seat packs. Each invitation link expires in 30 days.
          </p>
        </div>

        {orders.map((order) => {
          const invites = invitesByOrder[order.id] ?? [];
          const activeCount = invites.filter((i) => i.status !== 'revoked').length;
          const seatsRemaining = order.seats - activeCount;
          const packLabel = order.productId === 'employer_10pack' ? '10-seat Pack' : '5-seat Pack';

          return (
            <div key={order.id} className="rounded-xl border border-gray-700 bg-gray-800/30 overflow-hidden">
              {/* Order header */}
              <div className="px-5 py-4 border-b border-gray-700 flex items-center justify-between gap-4">
                <div>
                  <p className="text-white font-semibold text-sm">{packLabel}</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {activeCount} of {order.seats} seats used · {seatsRemaining} remaining
                  </p>
                </div>
                <div className="flex gap-1.5">
                  {Array.from({ length: order.seats }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-sm ${i < activeCount ? 'bg-blue-600' : 'bg-gray-700'}`}
                      title={i < activeCount ? 'Seat used' : 'Available'}
                    />
                  ))}
                </div>
              </div>

              {/* Invite form */}
              <div className="px-5 py-5 border-b border-gray-700">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Send invitation</p>
                <InviteForm orderId={order.id} seatsRemaining={seatsRemaining} />
              </div>

              {/* Member list */}
              {invites.length > 0 && (
                <div className="px-5 py-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Members</p>
                  <div className="space-y-2">
                    {invites.map((inv) => (
                      <div
                        key={inv.token}
                        className="flex items-center gap-3 py-2.5 px-3 rounded-lg bg-gray-800/60 border border-gray-700/60"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{inv.inviteeEmail}</p>
                          <p className="text-xs text-gray-500 truncate">{courseLabel(inv.courseKey)}</p>
                        </div>
                        <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border ${statusBadge(inv.status)}`}>
                          {inv.status}
                        </span>
                        {inv.status !== 'revoked' && (
                          <RevokeButton token={inv.token} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
