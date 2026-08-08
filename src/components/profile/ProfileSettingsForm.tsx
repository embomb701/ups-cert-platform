'use client';

import { useState } from 'react';
import { getIdToken } from '@/lib/firebase/auth';

interface Props {
  uid: string;
  initial: {
    openToOpportunities: boolean;
    profileVisible: boolean;
    headline: string;
    location: string;
  };
  profileUrl: string;
}

export function ProfileSettingsForm({ uid, initial, profileUrl }: Props) {
  const [openToOpportunities, setOpenToOpportunities] = useState(initial.openToOpportunities);
  const [profileVisible, setProfileVisible] = useState(initial.profileVisible);
  const [headline, setHeadline] = useState(initial.headline);
  const [location, setLocation] = useState(initial.location);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Suppress unused uid warning — kept for future per-user API calls
  void uid;

  async function save() {
    setSaving(true);
    setSaved(false);
    try {
      const token = await getIdToken();
      if (!token) return;
      await fetch('/api/profile/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ openToOpportunities, profileVisible, headline, location }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Share link */}
      <div className="rounded-lg border border-gray-700 bg-gray-800/40 p-4 space-y-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your public profile link</p>
        <div className="flex gap-2 items-center">
          <input
            readOnly
            value={profileUrl}
            className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-1.5 text-xs text-gray-300 font-mono"
          />
          <button
            onClick={copyLink}
            className="flex-shrink-0 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-xs text-white rounded-lg transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-xs text-white rounded-lg transition-colors"
          >
            View →
          </a>
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-lg border border-gray-700 bg-gray-800/30 p-5 space-y-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Profile settings</p>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Headline <span className="text-gray-600">(optional)</span></label>
          <input
            type="text"
            maxLength={120}
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g. UPS Field Service Tech · 5 years experience"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Location <span className="text-gray-600">(optional)</span></label>
          <input
            type="text"
            maxLength={80}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Austin, TX"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
          />
        </div>

        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <div>
            <p className="text-sm text-white font-medium">Open to opportunities</p>
            <p className="text-xs text-gray-500 mt-0.5">Shows a badge on your profile — visible to employers browsing applicants</p>
          </div>
          <button
            role="switch"
            aria-checked={openToOpportunities}
            onClick={() => setOpenToOpportunities((v) => !v)}
            className={`flex-shrink-0 relative w-10 h-6 rounded-full transition-colors ${openToOpportunities ? 'bg-blue-600' : 'bg-gray-600'}`}
          >
            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${openToOpportunities ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </label>

        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <div>
            <p className="text-sm text-white font-medium">Profile visible</p>
            <p className="text-xs text-gray-500 mt-0.5">When off, your profile link shows nothing to visitors</p>
          </div>
          <button
            role="switch"
            aria-checked={profileVisible}
            onClick={() => setProfileVisible((v) => !v)}
            className={`flex-shrink-0 relative w-10 h-6 rounded-full transition-colors ${profileVisible ? 'bg-blue-600' : 'bg-gray-600'}`}
          >
            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${profileVisible ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </label>

        <button
          onClick={save}
          disabled={saving}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save settings'}
        </button>
      </div>
    </div>
  );
}
