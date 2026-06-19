'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';

/**
 * Gate the entire /admin segment. Previously the admin pages were plain server
 * components that rendered to anyone who navigated to the URL. This guard
 * requires an authenticated admin (role sourced from the user's Firestore
 * profile, which — after the rules hardening — a client can no longer
 * self-assign). Every admin DATA mutation is independently enforced server-side
 * by requireAdmin(); a Firebase session-cookie server guard would be the
 * stronger follow-up to also block the rendered shell at the edge.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace('/login');
    }
  }, [user, isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="card-dark p-8 max-w-sm text-center">
          <p className="text-red-400 font-semibold mb-2">Access Restricted</p>
          <p className="text-sm text-gray-400">
            This area is limited to administrators. Redirecting…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
