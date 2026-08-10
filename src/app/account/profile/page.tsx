import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { ProfileSettingsForm } from '@/components/profile/ProfileSettingsForm';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Public Profile Settings — Mastering Field Service',
};

export default async function AccountProfilePage() {
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

  const userSnap = await adminDb.collection('users').doc(uid).get();
  const userData = userSnap.data() ?? {};

  const initial = {
    openToOpportunities: userData.openToOpportunities ?? false,
    profileVisible: userData.profileVisible ?? true,
    headline: userData.headline ?? '',
    location: userData.location ?? '',
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masteringfse.com';
  const profileUrl = `${siteUrl}/p/${uid}`;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Public Profile</h1>
          <p className="text-gray-500 text-sm">
            Your profile shows your earned certificates and completed courses. Share the link with employers or paste it into job applications.
          </p>
        </div>
        <ProfileSettingsForm uid={uid} initial={initial} profileUrl={profileUrl} />
      </div>
    </div>
  );
}
