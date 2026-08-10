'use client';

import { useState } from 'react';

export function ShareProfileButton({ profileUrl }: { profileUrl: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = profileUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="text-xs px-3 py-1.5 rounded border border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
      >
        {copied ? 'Copied ✓' : 'Copy link'}
      </button>
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs px-3 py-1.5 rounded border border-blue-800/60 bg-blue-950/30 hover:bg-blue-900/40 text-blue-400 hover:text-blue-300 transition-colors"
      >
        Share on LinkedIn
      </a>
    </div>
  );
}
