'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/components/auth/AuthProvider';
import { getIdToken } from '@/lib/firebase/auth';

const CERT_LEVELS: { value: string; label: string }[] = [
  { value: '', label: 'All certifications' },
  { value: 'jr_fse', label: 'Jr. UPS Field Service Engineer' },
  { value: 'jr_kitchen_fse', label: 'Jr. Commercial Kitchen FSE' },
  { value: 'jr_hvac_fse', label: 'Jr. HVAC Field Service Engineer' },
  { value: 'jr_gen_fse', label: 'Jr. Power Generation FSE' },
  { value: 'jr_dc_cft', label: 'Jr. Data Center Critical Facilities Tech' },
  { value: 'jr_solar_fse', label: 'Jr. Solar & Storage FSE' },
  { value: 'jr_ev_tech', label: 'Jr. EV Charging Infrastructure Tech' },
  { value: 'jr_dcp_tech', label: 'Jr. Telecom DC Power Plants Tech' },
  { value: 'jr_battery_tech', label: 'Jr. Battery Systems Technician' },
  { value: 'jr_dc_engineer', label: 'Jr. Data Center Engineer' },
  { value: 'jr_marine_tech', label: 'Jr. Marine Systems Technician' },
  { value: 'jr_pool_tech', label: 'Jr. Pool Equipment Technician' },
  { value: 'jr_hvac_tech', label: 'Jr. HVAC Technician' },
  { value: 'jr_solar_inst', label: 'Jr. Solar Installer' },
  { value: 'jr_wind_tech', label: 'Jr. Wind Turbine Technician' },
  { value: 'jr_elevator_tech', label: 'Jr. Elevator Technician' },
  { value: 'jr_fire_alarm_tech', label: 'Jr. Fire Alarm Technician' },
  { value: 'jr_bmet_tech', label: 'Jr. Biomedical Equipment Technician' },
  { value: 'jr_bas_tech', label: 'Jr. Building Automation Systems Tech' },
  { value: 'jr_ref_tech', label: 'Jr. Commercial Refrigeration Tech' },
  { value: 'jr_plc_tech', label: 'Jr. Industrial Controls & PLC Tech' },
  { value: 'jr_security_tech', label: 'Jr. Electronic Security Systems Tech' },
  { value: 'jr_field_pm', label: 'Jr. Field Project Manager' },
  { value: 'jr_pump_tech', label: 'Jr. Pump Technician' },
  { value: 'jr_industrial_ref', label: 'Jr. Industrial Refrigeration Operator' },
  { value: 'jr_dc_ops', label: 'Jr. Data Center Operations Manager' },
  { value: 'jr_building_cx', label: 'Jr. Building Commissioning Agent' },
  { value: 'jr_telecom_tech', label: 'Jr. Telecom OSP Technician' },
  { value: 'jr_switchgear_tech', label: 'Jr. Switchgear & Substation Technician' },
  { value: 'jr_water_wastewater', label: 'Jr. Water & Wastewater Treatment Operator' },
  { value: 'fse', label: 'UPS FSE (Human Proctored)' },
];

interface Candidate {
  uid: string;
  displayName: string;
  photoURL: string | null;
  headline: string;
  location: string;
  certificates: { examLevel: string; certificationTitle: string; issuedAt: string | null }[];
}

function Initials({ name }: { name: string }) {
  const chars = name.split(' ').map((w) => w[0] ?? '').join('').toUpperCase().slice(0, 2) || '?';
  return (
    <div className="w-12 h-12 rounded-full bg-indigo-900/60 border border-indigo-700/60 flex items-center justify-center flex-shrink-0">
      <span className="text-indigo-300 font-bold text-sm">{chars}</span>
    </div>
  );
}

export default function CandidatesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [fetching, setFetching] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [certLevel, setCertLevel] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    async function search() {
      setFetching(true);
      try {
        const token = await getIdToken();
        const params = new URLSearchParams();
        if (certLevel) params.set('certLevel', certLevel);
        const res = await fetch(`/api/candidates/search?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 403) {
          if (!cancelled) setForbidden(true);
          return;
        }
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setCandidates(data.candidates ?? []);
        }
      } catch { /* silently fail */ }
      finally { if (!cancelled) setFetching(false); }
    }
    search();
    return () => { cancelled = true; };
  }, [user, certLevel]);

  const filtered = locationFilter.trim()
    ? candidates.filter((c) =>
        c.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    : candidates;

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (forbidden) {
    return (
      <section className="section-pad">
        <div className="container-site max-w-xl mx-auto">
          <div className="card-dark p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-900/40 border border-amber-800 flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-10a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white mb-3">Employer Access Required</h1>
            <p className="text-sm text-gray-400 mb-6">
              Candidate search is available to employers with an active seat pack. Purchase a team pack to access the full candidate directory.
            </p>
            <Link
              href="/employers"
              className="inline-block px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
            >
              View employer plans
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad">
      <div className="container-site max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Candidate Search</h1>
          <p className="text-sm text-gray-400">
            Browse certified candidates who are open to opportunities.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <select
            value={certLevel}
            onChange={(e) => setCertLevel(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
          >
            {CERT_LEVELS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Filter by location…"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Results count */}
        {!fetching && (
          <p className="text-xs text-gray-500 mb-4">
            {filtered.length} candidate{filtered.length !== 1 ? 's' : ''} found
            {locationFilter ? ` in "${locationFilter}"` : ''}
            {certLevel ? ` with ${CERT_LEVELS.find((l) => l.value === certLevel)?.label ?? certLevel}` : ''}
          </p>
        )}

        {/* Grid */}
        {fetching ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-dark p-5 animate-pulse">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 bg-gray-800 rounded w-3/4" />
                    <div className="h-2.5 bg-gray-800 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 bg-gray-800 rounded w-full" />
                  <div className="h-2 bg-gray-800 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-dark p-12 text-center">
            <p className="text-gray-600 text-sm mb-2">No candidates match your filters.</p>
            {(certLevel || locationFilter) && (
              <button
                onClick={() => { setCertLevel(''); setLocationFilter(''); }}
                className="text-xs text-indigo-400 hover:text-indigo-300"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => {
              const initials = c.displayName.split(' ').map((w) => w[0] ?? '').join('').toUpperCase().slice(0, 2) || '?';
              return (
                <div key={c.uid} className="card-dark p-5 flex flex-col gap-4 hover:border-gray-700 transition-colors">

                  {/* Identity */}
                  <div className="flex items-start gap-3">
                    {c.photoURL ? (
                      <Image
                        src={c.photoURL}
                        alt={c.displayName}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-indigo-900/60 border border-indigo-700/60 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-300 font-bold text-sm">{initials}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{c.displayName}</p>
                      {c.headline && (
                        <p className="text-xs text-gray-400 truncate mt-0.5">{c.headline}</p>
                      )}
                      {c.location && (
                        <p className="text-xs text-gray-600 mt-0.5 flex items-center gap-1">
                          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {c.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Cert badges */}
                  {c.certificates.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {c.certificates.slice(0, 3).map((cert, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded-full border border-indigo-800/60 bg-indigo-900/20 text-indigo-400 leading-tight"
                        >
                          {cert.certificationTitle.replace(/^Jr\.\s/i, 'Jr. ').replace(/Junior\s/i, 'Jr. ')}
                        </span>
                      ))}
                      {c.certificates.length > 3 && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full border border-gray-700 bg-gray-800/20 text-gray-500">
                          +{c.certificates.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action */}
                  <div className="mt-auto">
                    <Link
                      href={`/p/${c.uid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-3 py-2 rounded-lg border border-gray-700 text-sm text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
                    >
                      View profile →
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Footer note */}
        <p className="text-xs text-gray-700 mt-8 text-center">
          Only candidates who have opted in to &ldquo;Open to opportunities&rdquo; appear here. Candidates control their own visibility.
        </p>

      </div>
    </section>
  );
}
