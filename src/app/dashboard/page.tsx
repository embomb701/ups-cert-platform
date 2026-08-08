'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { getIdToken } from '@/lib/firebase/auth';

const EXAM_LEVEL_LABELS: Record<string, string> = {
  jr_fse: 'Jr. FSE',
  fse: 'FSE (Proctored)',
  fse_ai: 'FSE AI',
  jr_kitchen_fse: 'Jr. Kitchen FSE',
  jr_hvac_fse: 'Jr. HVAC FSE',
  jr_gen_fse: 'Jr. Generator FSE',
  jr_dc_cft: 'Jr. Data Center CFT',
  jr_solar_fse: 'Jr. Solar FSE',
  jr_ev_tech: 'Jr. EV Tech',
  jr_dcp_tech: 'Jr. DC Plants Tech',
  jr_battery_tech: 'Jr. Battery Tech',
  jr_dc_engineer: 'Jr. DC Engineer',
  jr_marine_tech: 'Jr. Marine Tech',
  jr_pool_tech: 'Jr. Pool Tech',
  jr_hvac_tech: 'Jr. HVAC Tech',
  jr_solar_inst: 'Jr. Solar Installer',
  jr_wind_tech: 'Jr. Wind Turbine Tech',
  jr_elevator_tech: 'Jr. Elevator Tech',
  jr_fire_alarm_tech: 'Jr. Fire Alarm Tech',
  jr_bmet_tech: 'Jr. BMET Tech',
  jr_bas_tech: 'Jr. BAS Tech',
  jr_ref_tech: 'Jr. Ref Tech',
  jr_plc_tech: 'Jr. PLC Tech',
  jr_security_tech: 'Jr. Security Tech',
  jr_field_pm: 'Jr. Field PM',
  jr_pump_tech: 'Jr. Pump Tech',
  jr_industrial_ref: 'Jr. Industrial Ref',
  jr_dc_ops: 'Jr. DC Ops',
  jr_building_cx: 'Jr. Building Cx',
  jr_telecom_tech: 'Jr. Telecom Tech',
};

interface DashData {
  isAdmin: boolean;
  uid: string;
  access: { jr_fse: boolean; fse_ai: boolean; fse_proctored: string | null };
  enrolledCourses: { key: string; name: string; completed: number; total: number }[];
  certificates: { id: string; certificateNumber: string; certificationTitle: string; examLevel: string; issuedAt: string | null; status: string; score: number | null }[];
  attempts: { id: string; examLevel: string; score?: number; passed?: boolean; completedAt: string | null }[];
  jobApplications: { id: string; listingId: string; listingTitle: string; company: string; status: string; createdAt: string | null }[];
  employerOrders: { id: string; seats: number; seatsUsed: number; courseKey: string }[];
  profile: { openToOpportunities: boolean; profileVisible: boolean; headline: string; location: string };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ups-cert-platform.vercel.app';

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 w-9 text-right flex-shrink-0">
        {value}/{max}
      </span>
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<DashData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [toggling, setToggling] = useState(false);

  // FSE scheduling form
  const [schedPhone, setSchedPhone] = useState('');
  const [schedSubmitting, setSchedSubmitting] = useState(false);
  const [schedDone, setSchedDone] = useState(false);
  const [schedError, setSchedError] = useState('');

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      try {
        const token = await getIdToken();
        const res = await fetch('/api/user/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) setData(await res.json());
      } catch {
        // silently fail
      } finally {
        setDataLoading(false);
      }
    }
    load();
  }, [user]);

  async function handleScheduleRequest(e: React.FormEvent) {
    e.preventDefault();
    const digits = schedPhone.replace(/\D/g, '');
    if (digits.length < 10) {
      setSchedError('Please enter a valid phone number with at least 10 digits.');
      return;
    }
    setSchedSubmitting(true);
    setSchedError('');
    try {
      const token = await getIdToken();
      const res = await fetch('/api/notify/schedule-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ phone: schedPhone }),
      });
      if ((await res.json()).ok) setSchedDone(true);
      else setSchedError('Submission failed. Please try again or use the Contact page.');
    } catch {
      setSchedError('Request failed. Please try again.');
    }
    setSchedSubmitting(false);
  }

  async function handleOppToggle() {
    if (!data) return;
    setToggling(true);
    try {
      const token = await getIdToken();
      const newVal = !data.profile.openToOpportunities;
      const res = await fetch('/api/profile/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ openToOpportunities: newVal }),
      });
      if (res.ok) {
        setData((d) => d ? { ...d, profile: { ...d.profile, openToOpportunities: newVal } } : d);
      }
    } catch { /* ignore */ }
    setToggling(false);
  }

  function copyProfileUrl() {
    if (!data) return;
    navigator.clipboard.writeText(`${SITE_URL}/p/${data.uid}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const jrAccess = data?.access.jr_fse ?? false;
  const aiAccess = data?.access.fse_ai ?? false;
  const fseOrderStatus = data?.access.fse_proctored ?? null;
  const isAdmin = data?.isAdmin ?? false;
  const certs = data?.certificates ?? [];
  const validCerts = certs.filter((c) => c.status === 'valid');
  const courses = data?.enrolledCourses ?? [];
  const completedCourses = courses.filter((c) => c.completed === c.total && c.total > 0);
  const attempts = data?.attempts ?? [];
  const jobApps = data?.jobApplications ?? [];
  const orders = data?.employerOrders ?? [];
  const profile = data?.profile;
  const profileUrl = data ? `${SITE_URL}/p/${data.uid}` : '';

  return (
    <section className="section-pad">
      <div className="container-site max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
            <p className="text-sm text-gray-400">
              Signed in as <span className="text-gray-200">{user.email}</span>
            </p>
          </div>
          {isAdmin && (
            <Link href="/admin" className="text-sm text-indigo-400 hover:text-indigo-300">
              Admin Dashboard &rarr;
            </Link>
          )}
        </div>

        {/* Quick stats */}
        {!dataLoading && data && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="card-dark px-4 py-3 text-center">
              <p className="text-2xl font-bold text-indigo-400">{validCerts.length}</p>
              <p className="text-xs text-gray-500 mt-0.5">Certificate{validCerts.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="card-dark px-4 py-3 text-center">
              <p className="text-2xl font-bold text-indigo-400">{completedCourses.length}</p>
              <p className="text-xs text-gray-500 mt-0.5">Course{completedCourses.length !== 1 ? 's' : ''} done</p>
            </div>
            <div className="card-dark px-4 py-3 text-center">
              <p className="text-2xl font-bold text-indigo-400">{courses.length}</p>
              <p className="text-xs text-gray-500 mt-0.5">Enrolled</p>
            </div>
            <div className="card-dark px-4 py-3 text-center">
              <p className="text-2xl font-bold text-indigo-400">{attempts.filter((a) => a.passed).length}</p>
              <p className="text-xs text-gray-500 mt-0.5">Exam{attempts.filter((a) => a.passed).length !== 1 ? 's' : ''} passed</p>
            </div>
          </div>
        )}

        {/* Main grid: certs + training */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Certifications */}
          <div className="card-dark p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">Certifications</h2>
              {validCerts.length > 0 && (
                <Link href="/account/profile" className="text-xs text-gray-500 hover:text-gray-300">
                  Profile settings →
                </Link>
              )}
            </div>
            {dataLoading ? (
              <p className="text-sm text-gray-500">Loading…</p>
            ) : certs.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-sm text-gray-600 mb-3">No certificates yet.</p>
                <Link href="/training" className="text-xs text-indigo-400 hover:text-indigo-300">
                  Start training →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {certs.map((cert) => {
                  const issued = cert.issuedAt ? new Date(cert.issuedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : null;
                  return (
                    <div
                      key={cert.id}
                      className={`rounded-lg border px-3 py-2.5 flex items-center gap-3 ${
                        cert.status === 'valid'
                          ? 'border-gray-700 bg-gray-800/30'
                          : 'border-gray-800 bg-gray-800/10 opacity-60'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                        cert.status === 'valid' ? 'bg-indigo-900/60 border border-indigo-700/60 text-indigo-400' : 'bg-gray-700 text-gray-500'
                      }`}>
                        {cert.status === 'valid' ? '✓' : '✕'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-medium truncate">{cert.certificationTitle}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {issued && <span className="text-xs text-gray-500">{issued}</span>}
                          {cert.score !== null && <span className="text-xs text-gray-600">{Math.round(cert.score)}%</span>}
                          {cert.status === 'revoked' && <span className="text-xs text-red-400">Revoked</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Link
                          href={`/verify/${cert.certificateNumber}`}
                          className="text-xs text-gray-600 hover:text-indigo-400 transition-colors"
                        >
                          Verify
                        </Link>
                        {cert.status === 'valid' && (
                          <a
                            href={`/certificate/${cert.certificateNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-600 hover:text-gray-300 transition-colors"
                          >
                            PDF
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Training Progress */}
          <div className="card-dark p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">Training Progress</h2>
              <Link href="/training" className="text-xs text-gray-500 hover:text-gray-300">
                Go to training →
              </Link>
            </div>
            {dataLoading ? (
              <p className="text-sm text-gray-500">Loading…</p>
            ) : courses.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-sm text-gray-600 mb-3">No courses enrolled yet.</p>
                <Link href="/certifications" className="text-xs text-indigo-400 hover:text-indigo-300">
                  Browse courses →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {courses.map((course) => {
                  const pct = course.total === 0 ? 0 : Math.round((course.completed / course.total) * 100);
                  const done = course.completed === course.total && course.total > 0;
                  return (
                    <div key={course.key}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          {done && (
                            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white">✓</span>
                          )}
                          <p className="text-sm text-gray-300 truncate">{course.name}</p>
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{pct}%</span>
                      </div>
                      <ProgressBar value={course.completed} max={course.total} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Profile + Team + Jobs row */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Public Profile */}
          <div className="card-dark p-6">
            <h2 className="text-base font-semibold text-white mb-4">Your Profile</h2>
            {dataLoading ? (
              <p className="text-sm text-gray-500">Loading…</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1.5">Public link</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-gray-400 bg-gray-900 border border-gray-700 rounded px-2 py-1 flex-1 truncate">
                      /p/{data?.uid?.slice(0, 8)}…
                    </code>
                    <button
                      onClick={copyProfileUrl}
                      className="text-xs px-2 py-1 rounded border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors flex-shrink-0"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  {profileUrl && (
                    <a
                      href={profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-400 hover:text-indigo-300 mt-1 block"
                    >
                      Preview profile →
                    </a>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300">Open to opportunities</p>
                    <p className="text-xs text-gray-600">Visible to employers browsing candidates</p>
                  </div>
                  <button
                    onClick={handleOppToggle}
                    disabled={toggling}
                    className={`relative flex-shrink-0 w-10 h-5 rounded-full transition-colors ${
                      profile?.openToOpportunities ? 'bg-green-600' : 'bg-gray-700'
                    } ${toggling ? 'opacity-50' : ''}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        profile?.openToOpportunities ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <Link
                  href="/account/profile"
                  className="block text-center text-xs px-3 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                >
                  Edit profile settings
                </Link>
              </div>
            )}
          </div>

          {/* Employer Team (if orders exist) */}
          {(dataLoading || orders.length > 0) && (
            <div className="card-dark p-6">
              <h2 className="text-base font-semibold text-white mb-4">Team Access</h2>
              {dataLoading ? (
                <p className="text-sm text-gray-500">Loading…</p>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => {
                    const used = order.seatsUsed ?? 0;
                    const pct = order.seats === 0 ? 0 : Math.round((used / order.seats) * 100);
                    return (
                      <div key={order.id} className="rounded-lg border border-gray-700 bg-gray-800/20 px-3 py-2.5">
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-xs text-gray-400">{order.seats}-seat pack</p>
                          <span className="text-xs text-gray-500">{used}/{order.seats} used</span>
                        </div>
                        <ProgressBar value={used} max={order.seats} />
                      </div>
                    );
                  })}
                  <Link
                    href="/account/team"
                    className="block text-center text-xs px-3 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                  >
                    Manage team →
                  </Link>
                  <Link
                    href="/account/jobs"
                    className="block text-center text-xs px-3 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                  >
                    Job listings →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Job Applications */}
          {(dataLoading || jobApps.length > 0) && (
            <div className="card-dark p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">Applications</h2>
                <Link href="/jobs" className="text-xs text-gray-500 hover:text-gray-300">
                  Browse jobs →
                </Link>
              </div>
              {dataLoading ? (
                <p className="text-sm text-gray-500">Loading…</p>
              ) : jobApps.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-xs text-gray-600">No applications yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {jobApps.map((app) => {
                    const date = app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : null;
                    return (
                      <div key={app.id} className="rounded-lg border border-gray-800 px-3 py-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm text-gray-300 truncate">{app.listingTitle}</p>
                            <p className="text-xs text-gray-600 truncate">{app.company}</p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <span className={`text-xs px-1.5 py-0.5 rounded border ${
                              app.status === 'submitted'
                                ? 'border-blue-800/60 bg-blue-900/20 text-blue-400'
                                : app.status === 'reviewed'
                                ? 'border-amber-800/60 bg-amber-900/20 text-amber-400'
                                : 'border-gray-700 bg-gray-800/20 text-gray-400'
                            }`}>
                              {app.status}
                            </span>
                            {date && <p className="text-xs text-gray-600 mt-0.5">{date}</p>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Exam Access Cards */}
        <div>
          <h2 className="text-base font-semibold text-white mb-4">Exam Access</h2>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Jr FSE */}
            <div className="card-dark p-6">
              <span className="badge-jr text-xs mb-1 block w-fit">Jr. FSE Exam</span>
              <h3 className="text-base font-semibold text-white mb-4">Junior UPS FSE Certification</h3>
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Purchase status</span>
                  <span className={jrAccess ? 'text-green-400' : 'text-gray-300'}>
                    {dataLoading ? '…' : jrAccess ? 'Purchased' : 'Not purchased'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Exam access</span>
                  <span className={jrAccess ? 'text-green-400' : 'text-gray-300'}>
                    {dataLoading ? '…' : jrAccess ? 'Unlocked' : '—'}
                  </span>
                </div>
              </div>
              {jrAccess ? (
                <Link href="/exam/rules/jr_fse" className="block w-full text-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
                  Start Jr. FSE Exam
                </Link>
              ) : (
                <Link href="/certifications/junior" className="block w-full text-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
                  Purchase Jr. FSE Exam — $200
                </Link>
              )}
            </div>

            {/* FSE AI */}
            <div className="card-dark p-6 border-purple-900/50">
              <span className="inline-block text-xs font-semibold text-purple-400 bg-purple-950/50 border border-purple-800/50 px-2 py-0.5 rounded mb-1">FSE AI Exam</span>
              <h3 className="text-base font-semibold text-white mb-4">FSE AI Proctored Certification</h3>
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Purchase status</span>
                  <span className={aiAccess ? 'text-green-400' : 'text-gray-300'}>
                    {dataLoading ? '…' : aiAccess ? 'Purchased' : 'Not purchased'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Exam access</span>
                  <span className={aiAccess ? 'text-green-400' : 'text-gray-300'}>
                    {dataLoading ? '…' : aiAccess ? 'Unlocked' : '—'}
                  </span>
                </div>
              </div>
              {aiAccess ? (
                <Link href="/exam/rules/fse_ai" className="block w-full text-center px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-sm font-medium transition-colors">
                  Start FSE AI Exam
                </Link>
              ) : (
                <Link href="/certifications/ai-proctored" className="block w-full text-center px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 text-white text-sm font-medium transition-colors">
                  Purchase FSE AI Exam — $349
                </Link>
              )}
            </div>

            {/* FSE Human */}
            <div className="card-dark p-6">
              <span className="badge-fse text-xs mb-1 block w-fit">FSE Exam</span>
              <h3 className="text-base font-semibold text-white mb-4">UPS FSE Human Proctored</h3>
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Purchase status</span>
                  <span className={fseOrderStatus ? 'text-green-400' : 'text-gray-300'}>
                    {dataLoading ? '…' : fseOrderStatus ? 'Purchased' : 'Not purchased'}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Scheduling status</span>
                  <span className={
                    fseOrderStatus === 'ready' ? 'text-green-400'
                    : fseOrderStatus ? 'text-amber-400'
                    : 'text-gray-300'
                  }>
                    {dataLoading ? '…'
                      : fseOrderStatus === 'ready' ? 'Ready — proctor confirmed'
                      : fseOrderStatus === 'scheduling_pending' || fseOrderStatus === 'awaiting_contact' ? 'Schedule below'
                      : fseOrderStatus ? fseOrderStatus.replace(/_/g, ' ')
                      : '—'}
                  </span>
                </div>
              </div>
              {fseOrderStatus === 'ready' ? (
                <Link href="/exam/rules/fse" className="block w-full text-center px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-sm font-medium transition-colors">
                  Start FSE Exam
                </Link>
              ) : fseOrderStatus ? (
                schedDone ? (
                  <div className="rounded-lg bg-green-950/40 border border-green-800/40 px-4 py-3 text-sm text-green-400">
                    Submitted! We&apos;ll contact you soon to schedule your session.
                  </div>
                ) : (
                  <form onSubmit={handleScheduleRequest} className="space-y-2">
                    <p className="text-xs text-gray-500 mb-3">Provide your phone number and our team will contact you to schedule.</p>
                    <input
                      type="tel"
                      placeholder="Best phone number"
                      value={schedPhone}
                      onChange={(e) => setSchedPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-amber-600"
                    />
                    {schedError && <p className="text-xs text-red-400">{schedError}</p>}
                    <button
                      type="submit"
                      disabled={schedSubmitting}
                      className="w-full px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 disabled:opacity-50 text-white text-sm font-medium transition-colors"
                    >
                      {schedSubmitting ? 'Sending…' : 'Notify Scheduling Team'}
                    </button>
                  </form>
                )
              ) : (
                <Link href="/certifications/proctored" className="block w-full text-center px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-600 text-white text-sm font-medium transition-colors">
                  Purchase FSE Exam — $500
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Attempt History */}
        <div className="card-dark p-6">
          <h2 className="text-base font-semibold text-white mb-4">Attempt History</h2>
          {dataLoading ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : attempts.length === 0 ? (
            <p className="text-sm text-gray-500">No attempts on record.</p>
          ) : (
            <div className="space-y-2">
              {attempts.map((a) => {
                const date = a.completedAt ? new Date(a.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null;
                return (
                  <div key={a.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-800 last:border-0">
                    <div>
                      <span className="text-gray-400">{EXAM_LEVEL_LABELS[a.examLevel] ?? a.examLevel}</span>
                      {date && <span className="text-gray-600 text-xs ml-2">{date}</span>}
                    </div>
                    <span className={a.passed ? 'text-green-400' : a.passed === false ? 'text-red-400' : 'text-gray-400'}>
                      {a.passed === true ? `Passed (${Math.round(a.score ?? 0)}%)` : a.passed === false ? `Failed (${Math.round(a.score ?? 0)}%)` : 'In progress'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
