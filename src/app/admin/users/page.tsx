import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Admin — Users' };

export default function AdminUsersPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-5xl mx-auto">
        <Link href="/admin" className="text-xs text-gray-500 hover:text-gray-300 mb-4 block">&larr; Admin Dashboard</Link>
        <h1 className="text-xl font-bold text-white mb-2">Users</h1>
        <p className="text-sm text-gray-500">User management coming soon.</p>
      </div>
    </section>
  );
}
