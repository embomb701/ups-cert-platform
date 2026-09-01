import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { CloseListingButton } from '@/components/jobs/CloseListingButton';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'My Job Listings — Mastering Field Service',
};

interface Listing {
  id: string;
  title: string;
  location: string;
  type: string;
  status: 'active' | 'closed';
  applicationCount: number;
  createdAt: { toDate?: () => Date } | null;
}

interface Application {
  id: string;
  listingId: string;
  listingTitle: string;
  applicantEmail: string;
  applicantName: string;
  message: string;
  status: string;
  createdAt: { toDate?: () => Date } | null;
}

export default async function AccountJobsPage() {
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

  // Never hard-crash this page for an employer just because a Firestore query
  // fails (e.g. a missing composite index) — degrade to an empty list instead.
  let listings: Listing[] = [];
  const allApplications: Application[] = [];
  try {
    const listingsSnap = await adminDb
      .collection('jobListings')
      .where('postedByUid', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();

    listings = listingsSnap.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      location: doc.data().location,
      type: doc.data().type,
      status: doc.data().status,
      applicationCount: doc.data().applicationCount ?? 0,
      createdAt: doc.data().createdAt ?? null,
    }));

    // Load applications for all listings
    for (const listing of listings) {
      const appSnap = await adminDb
        .collection('jobApplications')
        .where('listingId', '==', listing.id)
        .orderBy('createdAt', 'desc')
        .get();
      appSnap.docs.forEach((doc) => {
        allApplications.push({ id: doc.id, ...doc.data() } as Application);
      });
    }
  } catch (err) {
    console.error('Account jobs query failed:', err);
  }

  const appsByListing: Record<string, Application[]> = {};
  allApplications.forEach((app) => {
    if (!appsByListing[app.listingId]) appsByListing[app.listingId] = [];
    appsByListing[app.listingId].push(app);
  });

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">My Job Listings</h1>
            <p className="text-gray-500 text-sm">{listings.length} listing{listings.length !== 1 ? 's' : ''}</p>
          </div>
          <Link
            href="/jobs/post"
            className="flex-shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Post new job
          </Link>
        </div>

        {listings.length === 0 && (
          <div className="rounded-xl border border-gray-700 bg-gray-800/30 p-10 text-center space-y-3">
            <p className="text-gray-400 text-sm">You haven&apos;t posted any jobs yet.</p>
            <Link
              href="/jobs/post"
              className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Post your first listing
            </Link>
          </div>
        )}

        {listings.map((listing) => {
          const apps = appsByListing[listing.id] ?? [];
          const postedDate = listing.createdAt?.toDate?.();

          return (
            <div key={listing.id} className="rounded-xl border border-gray-700 bg-gray-800/30 overflow-hidden">
              {/* Listing header */}
              <div className="px-5 py-4 border-b border-gray-700 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Link href={`/jobs/${listing.id}`} className="text-white font-semibold text-sm hover:text-blue-300 transition-colors">
                      {listing.title}
                    </Link>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      listing.status === 'active'
                        ? 'border-green-700/50 bg-green-900/30 text-green-400'
                        : 'border-gray-600/50 bg-gray-700/30 text-gray-500'
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs">
                    {listing.location} · {listing.type}
                    {postedDate && ` · Posted ${postedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                  </p>
                </div>
                <CloseListingButton listingId={listing.id} currentStatus={listing.status} />
              </div>

              {/* Applicants */}
              <div className="px-5 py-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  {apps.length} applicant{apps.length !== 1 ? 's' : ''}
                </p>
                {apps.length === 0 ? (
                  <p className="text-gray-600 text-xs italic">No applications yet.</p>
                ) : (
                  <div className="space-y-3">
                    {apps.map((app) => {
                      const appDate = app.createdAt?.toDate?.();
                      return (
                        <div key={app.id} className="rounded-lg border border-gray-700/60 bg-gray-800/60 p-3.5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">
                                {app.applicantName || app.applicantEmail}
                              </p>
                              <a href={`mailto:${app.applicantEmail}`} className="text-blue-400 text-xs hover:underline">
                                {app.applicantEmail}
                              </a>
                              {app.message && (
                                <p className="text-gray-400 text-xs mt-2 leading-relaxed">{app.message}</p>
                              )}
                            </div>
                            <p className="flex-shrink-0 text-gray-600 text-xs">
                              {appDate ? appDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
