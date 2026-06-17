import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Admin Dashboard' };

const adminSections = [
  { label: 'Users', href: '/admin/users', desc: 'View accounts, roles, blocks' },
  { label: 'Purchases', href: '/admin/purchases', desc: 'View all Stripe purchases' },
  { label: 'Jr. FSC Attempts', href: '/admin/attempts?level=jr_fsc', desc: 'Review attempts, flags, cooldowns' },
  { label: 'FSC Attempts', href: '/admin/attempts?level=fsc', desc: 'Proctored attempt records' },
  { label: 'Proctored Orders', href: '/admin/proctored', desc: 'Manage FSC scheduling and proctor unlock' },
  { label: 'Certificates', href: '/admin/certificates', desc: 'View, revoke, manage certificates' },
  { label: 'Question Bank', href: '/admin/questions', desc: 'Import, review, activate/deactivate questions' },
  { label: 'Audit Logs', href: '/admin/audit', desc: 'Suspicious events, admin actions' },
  { label: 'IP Locks', href: '/admin/ip-locks', desc: 'Review and clear network cooldown locks' },
];

export default function AdminPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Access restricted to admin email addresses defined in ADMIN_EMAILS env variable.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminSections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="card-dark p-5 hover:border-indigo-700 transition-colors block"
            >
              <p className="text-base font-semibold text-white mb-1">{s.label}</p>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 card-dark p-5 bg-amber-950/20 border-amber-900/40">
          <p className="text-xs text-amber-300 font-semibold mb-1">Admin Notes</p>
          <ul className="space-y-1 text-xs text-gray-400">
            <li>&#x2022; Never approve a flagged certificate without reviewing the attempt.</li>
            <li>&#x2022; FSC exam sessions must be explicitly unlocked before the candidate can start.</li>
            <li>&#x2022; IP lock clearing should be documented in admin notes.</li>
            <li>&#x2022; Proctor identity should be recorded on all FSC attempt records.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
