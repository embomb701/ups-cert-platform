'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const TYPE_COLORS: Record<string, string> = {
  'full-time': 'bg-blue-900/40 text-blue-400 border-blue-700/50',
  'part-time': 'bg-teal-900/40 text-teal-400 border-teal-700/50',
  'contract': 'bg-amber-900/40 text-amber-400 border-amber-700/50',
  'temporary': 'bg-purple-900/40 text-purple-400 border-purple-700/50',
};

const TYPES = ['full-time', 'part-time', 'contract', 'temporary'] as const;

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  courseRequirements: string[];
  applicationCount: number;
  postedAgo: string;
}

export function JobBoardList({
  listings,
  courseLabels,
}: {
  listings: JobListing[];
  courseLabels: Record<string, string>;
}) {
  const [query, setQuery] = useState('');
  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set());

  const normalizedQuery = query.trim().toLowerCase();

  function toggleType(type: string) {
    const next = new Set(activeTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    setActiveTypes(next);
  }

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (activeTypes.size > 0 && !activeTypes.has(l.type)) return false;
      if (normalizedQuery === '') return true;
      return (
        l.title.toLowerCase().includes(normalizedQuery) ||
        l.company.toLowerCase().includes(normalizedQuery) ||
        l.location.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [listings, activeTypes, normalizedQuery]);

  const isFiltering = normalizedQuery !== '' || activeTypes.size > 0;

  return (
    <div className="space-y-4">
      {/* Search + type filters */}
      <div className="space-y-3">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, company, or location…"
            className="w-full pl-10 pr-9 py-2.5 rounded-lg bg-gray-800/60 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {TYPES.map((type) => {
            const active = activeTypes.has(type);
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  active
                    ? TYPE_COLORS[type]
                    : 'border-gray-700 text-gray-500 hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                {type}
              </button>
            );
          })}
          {activeTypes.size > 0 && (
            <button
              onClick={() => setActiveTypes(new Set())}
              className="text-xs px-2.5 py-1 text-gray-500 hover:text-white transition-colors"
            >
              Clear types
            </button>
          )}
        </div>
      </div>

      {isFiltering && (
        <p className="text-xs text-gray-500">
          {filtered.length === 0
            ? 'No listings match your filters.'
            : `${filtered.length} listing${filtered.length === 1 ? '' : 's'} match your filters.`}
        </p>
      )}

      {/* Listings */}
      {filtered.length === 0 && listings.length > 0 ? (
        <div className="rounded-xl border border-gray-700 bg-gray-800/30 p-12 text-center">
          <p className="text-gray-500 text-sm">No listings match your search.</p>
          <button
            onClick={() => { setQuery(''); setActiveTypes(new Set()); }}
            className="text-blue-400 hover:text-blue-300 underline text-xs mt-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((listing) => (
            <Link
              key={listing.id}
              href={`/jobs/${listing.id}`}
              className="block rounded-xl border border-gray-700 bg-gray-800/40 hover:border-gray-600 hover:bg-gray-800/60 p-5 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-white font-semibold text-sm">{listing.title}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${TYPE_COLORS[listing.type] ?? 'bg-gray-700 text-gray-400 border-gray-600'}`}>
                      {listing.type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mb-2">
                    {listing.company} · {listing.location}
                  </p>
                  {listing.courseRequirements.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {listing.courseRequirements.slice(0, 4).map((key) => (
                        <span key={key} className="text-xs px-2 py-0.5 rounded bg-gray-700/60 text-gray-400">
                          {courseLabels[key] ?? key}
                        </span>
                      ))}
                      {listing.courseRequirements.length > 4 && (
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-700/60 text-gray-500">
                          +{listing.courseRequirements.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-gray-600 text-xs">{listing.postedAgo}</p>
                  {listing.applicationCount > 0 && (
                    <p className="text-gray-600 text-xs mt-1">
                      {listing.applicationCount} applicant{listing.applicationCount !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
