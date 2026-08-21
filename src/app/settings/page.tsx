'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { getIdToken } from '@/lib/firebase/auth';

interface Profile {
  displayName: string;
  email: string;
  headline: string;
  location: string;
  profileVisible: boolean;
  openToOpportunities: boolean;
  emailRemindersEnabled: boolean;
  referralCount: number;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [fetching, setFetching] = useState(true);

  const [displayName, setDisplayName] = useState('');
  const [headline, setHeadline] = useState('');
  const [location, setLocation] = useState('');
  const [profileVisible, setProfileVisible] = useState(true);
  const [openToOpportunities, setOpenToOpportunities] = useState(false);
  const [emailRemindersEnabled, setEmailRemindersEnabled] = useState(true);
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const [profileSave, setProfileSave] = useState<SaveState>('idle');
  const [prefsSave, setPrefsSave] = useState<SaveState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const token = await getIdToken();
        const res = await fetch('/api/user/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        const p: Profile = {
          displayName: user.displayName ?? '',
          email: user.email ?? '',
          headline: data.profile?.headline ?? '',
          location: data.profile?.location ?? '',
          profileVisible: data.profile?.profileVisible !== false,
          openToOpportunities: !!data.profile?.openToOpportunities,
          emailRemindersEnabled: data.profile?.emailRemindersEnabled !== false,
          referralCount: data.profile?.referralCount ?? 0,
        };
        setProfile(p);
        setDisplayName(p.displayName);
        setHeadline(p.headline);
        setLocation(p.location);
        setProfileVisible(p.profileVisible);
        setOpenToOpportunities(p.openToOpportunities);
        setEmailRemindersEnabled(p.emailRemindersEnabled);
        setReferralCount(p.referralCount);
      } catch {
        setErrorMsg('Could not load profile. Please refresh.');
      } finally {
        setFetching(false);
      }
    })();
  }, [user]);

  async function patch(payload: Record<string, unknown>) {
    const token = await getIdToken();
    const res = await fetch('/api/user/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      throw new Error(d.error ?? 'Save failed');
    }
  }

  async function saveProfile() {
    setProfileSave('saving');
    setErrorMsg('');
    try {
      await patch({ displayName: displayName.trim(), headline: headline.trim(), location: location.trim() });
      setProfileSave('saved');
      setTimeout(() => setProfileSave('idle'), 2500);
    } catch (e) {
      setErrorMsg((e as Error).message);
      setProfileSave('error');
    }
  }

  async function copyReferralLink() {
    if (!user) return;
    try {
      await navigator.clipboard.writeText(`${SITE_URL}?ref=${user.uid}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — user can still select the text manually
    }
  }

  async function savePrefs() {
    setPrefsSave('saving');
    setErrorMsg('');
    try {
      await patch({ profileVisible, openToOpportunities, emailRemindersEnabled });
      setPrefsSave('saved');
      setTimeout(() => setPrefsSave('idle'), 2500);
    } catch (e) {
      setErrorMsg((e as Error).message);
      setPrefsSave('error');
    }
  }

  if (loading || fetching) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <section className="section-pad">
      <div className="container-site max-w-2xl mx-auto space-y-8">
        <div>
          <Link href="/dashboard" className="text-xs text-gray-500 hover:text-gray-300 mb-4 block">&larr; Dashboard</Link>
          <h1 className="text-xl font-bold text-white">Account Settings</h1>
          <p className="text-sm text-gray-500 mt-1">{profile?.email}</p>
        </div>

        {errorMsg && (
          <div className="text-sm text-red-400 bg-red-950/20 border border-red-900/40 rounded-lg px-4 py-3">
            {errorMsg}
          </div>
        )}

        {/* Profile */}
        <div className="card-dark p-6 space-y-5">
          <h2 className="text-base font-semibold text-white">Profile</h2>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={80}
              placeholder="Your full name"
              className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Headline <span className="text-gray-600 font-normal">(shown on public profile)</span></label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              maxLength={120}
              placeholder="e.g. Field Service Engineer · UPS Specialist"
              className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Location <span className="text-gray-600 font-normal">(city, state)</span></label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              maxLength={80}
              placeholder="e.g. Austin, TX"
              className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-600"
            />
          </div>

          <button
            onClick={saveProfile}
            disabled={profileSave === 'saving'}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              profileSave === 'saved'
                ? 'bg-emerald-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white'
            }`}
          >
            {profileSave === 'saving' ? 'Saving…' : profileSave === 'saved' ? 'Saved ✓' : 'Save Profile'}
          </button>
        </div>

        {/* Preferences */}
        <div className="card-dark p-6 space-y-5">
          <h2 className="text-base font-semibold text-white">Preferences</h2>

          <Toggle
            label="Public profile"
            description="Allow your profile and certificates to be viewed at your public profile link."
            checked={profileVisible}
            onChange={setProfileVisible}
          />

          <Toggle
            label="Open to opportunities"
            description="Show a badge on your profile indicating you're open to job opportunities."
            checked={openToOpportunities}
            onChange={setOpenToOpportunities}
          />

          <Toggle
            label="Training reminder emails"
            description="Receive a weekly email when you haven't completed a module recently. At most once per week."
            checked={emailRemindersEnabled}
            onChange={setEmailRemindersEnabled}
          />

          <button
            onClick={savePrefs}
            disabled={prefsSave === 'saving'}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              prefsSave === 'saved'
                ? 'bg-emerald-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white'
            }`}
          >
            {prefsSave === 'saving' ? 'Saving…' : prefsSave === 'saved' ? 'Saved ✓' : 'Save Preferences'}
          </button>
        </div>

        {/* Referrals */}
        <div className="card-dark p-6 space-y-4">
          <div>
            <h2 className="text-base font-semibold text-white">Refer a Friend</h2>
            <p className="text-xs text-gray-500 mt-1">
              Share your link. When someone signs up through it, it&apos;s credited to you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              readOnly
              value={user ? `${SITE_URL}?ref=${user.uid}` : ''}
              onFocus={(e) => e.currentTarget.select()}
              className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-indigo-600"
            />
            <button
              onClick={copyReferralLink}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                copied
                  ? 'bg-emerald-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {copied ? 'Copied ✓' : 'Copy Link'}
            </button>
          </div>

          <p className="text-xs text-gray-500">
            {referralCount === 0
              ? 'No referrals yet.'
              : `${referralCount} ${referralCount === 1 ? 'person has' : 'people have'} signed up through your link.`}
          </p>
        </div>

        {/* Danger zone */}
        <div className="card-dark p-6 space-y-3 border-red-900/30">
          <h2 className="text-base font-semibold text-white">Account</h2>
          <p className="text-xs text-gray-500">
            To change your email address or delete your account, contact support.
          </p>
          <a
            href="mailto:careers@aiellorecruiter.com?subject=Account%20request"
            className="inline-block text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            Contact support →
          </a>
        </div>
      </div>
    </section>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative flex-shrink-0 mt-0.5 w-10 h-5 rounded-full transition-colors ${checked ? 'bg-indigo-600' : 'bg-gray-700'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
}
