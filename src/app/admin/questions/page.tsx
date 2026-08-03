'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { getIdToken } from '@/lib/firebase/auth';

interface BankStats { total: number; active: number; }
interface ImportResult { ok: boolean; created: number; updated: number; skipped: number; errors: number; error?: string; }
interface ServerImportResult { ok: boolean; filesProcessed: string[]; filesNotFound: string[]; totalCreated: number; totalUpdated: number; error?: string; }

const SERVER_FILES = [
  // Q1
  'jr-fsc-sample.json',
  'jr-fse-all-questions.json',
  'book-jr-fse-questions.json',
  'fsc-sample.json',
  'book-fse-questions.json',
  'kitchen-jr-fse-fresh.json',
  'kitchen-jr-fse-derived',
  'hvac-jr-fse-fresh.json',
  'hvac-jr-fse-derived',
  'generator-jr-fse-fresh.json',
  'generator-jr-fse-derived',
  'datacenter-jr-fresh.json',
  'datacenter-jr-derived',
  // Q2
  'solar-jr-fresh.json',
  'solar-jr-derived',
  'ev-jr-fresh.json',
  'ev-jr-derived',
  'dcp-jr-fresh.json',
  'dcp-jr-derived',
  'battery-jr-fresh.json',
  'battery-jr-derived',
  'dc-engineer-jr-fresh.json',
  'dc-engineer-jr-derived',
  'marine-jr-fresh.json',
  'marine-jr-derived',
  'pool-jr-fresh.json',
  'pool-jr-derived',
  // Q3
  'hvac-tech-jr-fresh.json',
  'hvac-tech-jr-derived',
  'solar-installer-jr-fresh.json',
  'solar-installer-jr-derived',
  'wind-turbine-jr-fresh.json',
  'wind-turbine-jr-derived',
  'elevator-tech-jr-fresh.json',
  'elevator-tech-jr-derived',
  'fire-alarm-tech-jr-fresh.json',
  'fire-alarm-tech-jr-derived',
  'bmet-tech-jr-fresh.json',
  'bmet-tech-jr-derived',
  // Q4
  'bas-tech-jr-fresh.json',
  'bas-tech-jr-derived',
  'ref-tech-jr-fresh.json',
  'ref-tech-jr-derived',
  'plc-tech-jr-fresh.json',
  'plc-tech-jr-derived',
  'security-tech-jr-fresh.json',
  'security-tech-jr-derived',
  'field-pm-jr-fresh.json',
  'field-pm-jr-derived',
  'pump-tech-jr-fresh.json',
  'pump-tech-jr-derived',
];

const QUARTERS: string[][] = [
  SERVER_FILES.slice(0, 13),   // Q1: base FSE + Kitchen + HVAC + Generator + DataCenter
  SERVER_FILES.slice(13, 27),  // Q2: Solar → Pool
  SERVER_FILES.slice(27, 39),  // Q3: HVAC Tech → BMET (ends at bmet-tech-jr-derived)
  // Q4: fresh JSON files FIRST so field-pm and pump-tech import immediately,
  // then derived banks (slow kitchenBank load) come after.
  [
    'bas-tech-jr-fresh.json',
    'ref-tech-jr-fresh.json',
    'plc-tech-jr-fresh.json',
    'security-tech-jr-fresh.json',
    'field-pm-jr-fresh.json',
    'pump-tech-jr-fresh.json',
    'bas-tech-jr-derived',
    'ref-tech-jr-derived',
    'plc-tech-jr-derived',
    'security-tech-jr-derived',
    'field-pm-jr-derived',
    'pump-tech-jr-derived',
  ],
];

export default function AdminQuestionsPage() {
  const [stats, setStats] = useState<{ jr_fse: BankStats; fse: BankStats; jr_kitchen_fse?: BankStats; jr_hvac_fse?: BankStats; jr_gen_fse?: BankStats; jr_dc_cft?: BankStats; jr_solar_fse?: BankStats; jr_ev_tech?: BankStats; jr_dcp_tech?: BankStats; jr_battery_tech?: BankStats; jr_dc_engineer?: BankStats; jr_marine_tech?: BankStats; jr_pool_tech?: BankStats; jr_hvac_tech?: BankStats; jr_solar_inst?: BankStats; jr_wind_tech?: BankStats; jr_elevator_tech?: BankStats; jr_fire_alarm_tech?: BankStats; jr_bmet_tech?: BankStats; jr_bas_tech?: BankStats; jr_ref_tech?: BankStats; jr_plc_tech?: BankStats; jr_security_tech?: BankStats } | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [serverImporting, setServerImporting] = useState(false);
  const [activeQuarter, setActiveQuarter] = useState<number | null>(null);
  const [serverProgress, setServerProgress] = useState('');
  const [serverElapsed, setServerElapsed] = useState(0);
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [serverResult, setServerResult] = useState<ServerImportResult | null>(null);
  const [overwrite, setOverwrite] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [progress, setProgress] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleServerImport(files: string[], quarterIdx: number) {
    setServerImporting(true);
    setActiveQuarter(quarterIdx);
    setServerResult(null);
    let totalCreated = 0, totalUpdated = 0;
    const filesProcessed: string[] = [];
    const filesNotFound: string[] = [];

    try {
      let token = await getIdToken();
      let tokenFetchedAt = Date.now();

      for (let idx = 0; idx < files.length; idx++) {
        const file = files[idx];
        setServerProgress(`[${idx + 1}/${files.length}] ${file}…`);

        // Refresh token if it is approaching 55 minutes old
        if (Date.now() - tokenFetchedAt > 55 * 60 * 1000) {
          token = await getIdToken();
          tokenFetchedAt = Date.now();
        }

        // 90-second hard timeout per file so a hanging request never blocks the loop
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 90_000);

        // live elapsed-second counter so the UI shows activity during long requests
        setServerElapsed(0);
        const startTs = Date.now();
        elapsedRef.current = setInterval(() => {
          setServerElapsed(Math.floor((Date.now() - startTs) / 1000));
        }, 1000);

        try {
          const res = await fetch('/api/admin/import-from-server', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ file }),
            signal: controller.signal,
          });
          clearTimeout(timer);
          if (elapsedRef.current) { clearInterval(elapsedRef.current); elapsedRef.current = null; }

          let data: ServerImportResult;
          try {
            data = await res.json();
          } catch {
            filesNotFound.push(`${file} (bad response)`);
            continue;
          }
          if (data.error) { filesNotFound.push(`${file} (${data.error})`); continue; }
          totalCreated += data.totalCreated;
          totalUpdated += data.totalUpdated;
          filesProcessed.push(...data.filesProcessed);
          filesNotFound.push(...data.filesNotFound);
        } catch (fetchErr: any) {
          clearTimeout(timer);
          if (elapsedRef.current) { clearInterval(elapsedRef.current); elapsedRef.current = null; }
          if (fetchErr.name === 'AbortError') {
            filesNotFound.push(`${file} (timed out)`);
          } else {
            filesNotFound.push(`${file} (${fetchErr.message})`);
          }
        }
      }
      setServerResult({ ok: true, filesProcessed, filesNotFound, totalCreated, totalUpdated });
      setServerProgress('');
      await loadStats();
    } catch (e: any) {
      setServerResult({ ok: false, filesProcessed: [], filesNotFound: [], totalCreated: 0, totalUpdated: 0, error: e.message });
      setServerProgress('');
    }
    setServerImporting(false);
    setActiveQuarter(null);
  }

  async function loadStats() {
    setStatsLoading(true);
    try {
      const token = await getIdToken();
      const res = await fetch('/api/admin/questions', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setStats(await res.json());
    } catch {}
    setStatsLoading(false);
  }

  useEffect(() => {
    loadStats();
    // Retry once after 2 s — on hard reload Firebase auth may not have restored
    // the session by the time the first fetch fires, causing a silent failure.
    const retry = setTimeout(() => { if (!stats) loadStats(); }, 2000);
    return () => clearTimeout(retry);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleImport() {
    const file = fileRef.current?.files?.[0];
    if (!file) { alert('Select a JSON file first'); return; }

    setImporting(true);
    setResult(null);
    setProgress('Reading file…');

    try {
      const text = await file.text();
      const questions: Record<string, unknown>[] = JSON.parse(text);
      if (!Array.isArray(questions)) throw new Error('File must be a JSON array');

      setProgress(`Importing ${questions.length} questions…`);
      const token = await getIdToken();

      // Send in chunks of 200 to avoid request size limits
      const CHUNK = 200;
      let totalCreated = 0, totalUpdated = 0, totalSkipped = 0, totalErrors = 0;

      for (let i = 0; i < questions.length; i += CHUNK) {
        const chunk = questions.slice(i, i + CHUNK);
        setProgress(`Importing questions ${i + 1}–${Math.min(i + CHUNK, questions.length)} of ${questions.length}…`);

        const res = await fetch('/api/admin/import-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ questions: chunk, overwrite }),
        });

        const data: ImportResult = await res.json();
        if (!res.ok || data.error) throw new Error(data.error ?? 'Import failed');
        totalCreated += data.created;
        totalUpdated += data.updated;
        totalSkipped += data.skipped;
        totalErrors += data.errors;
      }

      setResult({ ok: true, created: totalCreated, updated: totalUpdated, skipped: totalSkipped, errors: totalErrors });
      setProgress('');
      await loadStats();
    } catch (err: any) {
      setResult({ ok: false, created: 0, updated: 0, skipped: 0, errors: 0, error: err.message });
      setProgress('');
    }

    setImporting(false);
    if (fileRef.current) fileRef.current.value = '';
  }

  return (
    <section className="section-pad">
      <div className="container-site max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-white">&larr; Admin</Link>
          <h1 className="text-xl font-bold text-white">Question Bank</h1>
        </div>

        {/* Bank stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. FSE Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats ? (
              <>
                <p className="text-2xl font-bold text-indigo-400">{stats.jr_fse.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_fse.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_fse.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">FSE Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats ? (
              <>
                <p className="text-2xl font-bold text-amber-400">{stats.fse.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.fse.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-amber-600 rounded-full" style={{ width: `${Math.min(100, (stats.fse.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. Kitchen FSE Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_kitchen_fse ? (
              <>
                <p className="text-2xl font-bold text-orange-400">{stats.jr_kitchen_fse.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_kitchen_fse.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-orange-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_kitchen_fse.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. HVAC FSE Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_hvac_fse ? (
              <>
                <p className="text-2xl font-bold text-teal-400">{stats.jr_hvac_fse.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_hvac_fse.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_hvac_fse.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. Generator FSE Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_gen_fse ? (
              <>
                <p className="text-2xl font-bold text-amber-400">{stats.jr_gen_fse.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_gen_fse.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-amber-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_gen_fse.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. Data Center CFT Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_dc_cft ? (
              <>
                <p className="text-2xl font-bold text-violet-400">{stats.jr_dc_cft.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_dc_cft.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-violet-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_dc_cft.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. Solar/BESS Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_solar_fse ? (
              <>
                <p className="text-2xl font-bold text-yellow-400">{stats.jr_solar_fse.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_solar_fse.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-yellow-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_solar_fse.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. EV Charging Tech Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_ev_tech ? (
              <>
                <p className="text-2xl font-bold text-green-400">{stats.jr_ev_tech.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_ev_tech.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-green-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_ev_tech.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. DC Plants Tech Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_dcp_tech ? (
              <>
                <p className="text-2xl font-bold text-cyan-400">{stats.jr_dcp_tech.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_dcp_tech.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_dcp_tech.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. Battery Tech Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_battery_tech ? (
              <>
                <p className="text-2xl font-bold text-lime-400">{stats.jr_battery_tech.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_battery_tech.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-lime-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_battery_tech.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. DC Engineer Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_dc_engineer ? (
              <>
                <p className="text-2xl font-bold text-cyan-400">{stats.jr_dc_engineer.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_dc_engineer.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_dc_engineer.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. Marine Tech Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_marine_tech ? (
              <>
                <p className="text-2xl font-bold text-blue-400">{stats.jr_marine_tech.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_marine_tech.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_marine_tech.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. Pool Tech Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_pool_tech ? (
              <>
                <p className="text-2xl font-bold text-sky-400">{stats.jr_pool_tech.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_pool_tech.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-sky-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_pool_tech.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>

          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. HVAC Tech Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_hvac_tech ? (
              <>
                <p className="text-2xl font-bold text-emerald-400">{stats.jr_hvac_tech.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_hvac_tech.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_hvac_tech.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>

          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. Solar Installer Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_solar_inst ? (
              <>
                <p className="text-2xl font-bold text-amber-400">{stats.jr_solar_inst.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_solar_inst.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-amber-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_solar_inst.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>

          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. Wind Turbine Tech Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_wind_tech ? (
              <>
                <p className="text-2xl font-bold text-sky-400">{stats.jr_wind_tech.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_wind_tech.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-sky-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_wind_tech.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>

          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. Elevator Tech Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_elevator_tech ? (
              <>
                <p className="text-2xl font-bold text-teal-400">{stats.jr_elevator_tech.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_elevator_tech.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_elevator_tech.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>

          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. Fire Alarm Tech Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_fire_alarm_tech ? (
              <>
                <p className="text-2xl font-bold text-rose-400">{stats.jr_fire_alarm_tech.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_fire_alarm_tech.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-rose-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_fire_alarm_tech.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>

          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. BMET Tech Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_bmet_tech ? (
              <>
                <p className="text-2xl font-bold text-blue-400">{stats.jr_bmet_tech.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_bmet_tech.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_bmet_tech.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>

          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. BAS Tech Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_bas_tech ? (
              <>
                <p className="text-2xl font-bold text-emerald-400">{stats.jr_bas_tech.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_bas_tech.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_bas_tech.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-4 border-cyan-900/50">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. Ref Tech Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_ref_tech ? (
              <>
                <p className="text-2xl font-bold text-cyan-400">{stats.jr_ref_tech.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_ref_tech.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_ref_tech.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-4 border-orange-900/50">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. PLC Tech Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_plc_tech ? (
              <>
                <p className="text-2xl font-bold text-orange-400">{stats.jr_plc_tech.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_plc_tech.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-orange-600 rounded-full" style={{ width: `${Math.min(100, (stats.jr_plc_tech.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
          <div className="card-dark p-4 border-slate-700/50">
            <h3 className="text-sm font-semibold text-white mb-2">Jr. Security Tech Bank</h3>
            {statsLoading ? (
              <p className="text-xs text-gray-500">Loading…</p>
            ) : stats?.jr_security_tech ? (
              <>
                <p className="text-2xl font-bold text-slate-300">{stats.jr_security_tech.active.toLocaleString()}</p>
                <p className="text-xs text-gray-500">active of {stats.jr_security_tech.total.toLocaleString()} total · target 1,000</p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full">
                  <div className="h-full bg-slate-500 rounded-full" style={{ width: `${Math.min(100, (stats.jr_security_tech.active / 1000) * 100)}%` }} />
                </div>
              </>
            ) : <p className="text-xs text-red-400">Failed to load</p>}
          </div>
        </div>

        {/* One-click server import */}
        <div className="card-dark p-6 mb-6 border-indigo-900/50">
          <h2 className="text-sm font-semibold text-white mb-1">Import All Questions from Server</h2>
          <p className="text-xs text-gray-500 mb-3">
            Import in quarters (~13 files each). Run them in order. Safe to re-run — all writes are merge/upsert.
            Timed-out files appear in the result so you can retry that quarter.
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {QUARTERS.map((quarter, i) => {
              const labels = ['Q1 — Base FSE + Kitchen + HVAC + Gen + DC', 'Q2 — Solar → Pool', 'Q3 — HVAC Tech → BMET', 'Q4 — BAS → Pump Tech'];
              const colors = ['bg-indigo-700 hover:bg-indigo-600', 'bg-teal-700 hover:bg-teal-600', 'bg-amber-700 hover:bg-amber-600', 'bg-rose-700 hover:bg-rose-600'];
              const isActive = serverImporting && activeQuarter === i;
              return (
                <button
                  key={i}
                  onClick={() => handleServerImport(quarter, i)}
                  disabled={serverImporting}
                  className={`px-4 py-2 rounded-lg ${colors[i]} disabled:opacity-50 text-white text-xs font-semibold transition-colors`}
                >
                  {isActive ? `Importing Q${i + 1}…` : `${labels[i]} (${quarter.length} files)`}
                </button>
              );
            })}
          </div>
          {serverProgress && (
            <p className="text-xs text-indigo-400 mt-1 font-mono">
              {serverProgress} <span className="text-gray-500">{serverElapsed}s</span>
            </p>
          )}
          {serverResult && (
            <div className={`rounded-lg p-3 mt-3 text-xs ${serverResult.ok ? 'bg-green-950/40 border border-green-800/40' : 'bg-red-950/40 border border-red-800/40'}`}>
              {serverResult.error ? (
                <p className="text-red-400">Error: {serverResult.error}</p>
              ) : (
                <>
                  <p className="text-green-400 font-semibold mb-1">Import complete — Created: {serverResult.totalCreated} · Updated: {serverResult.totalUpdated}</p>
                  {serverResult.filesProcessed.length > 0 && <p className="text-gray-400">Processed: {serverResult.filesProcessed.join(', ')}</p>}
                  {serverResult.filesNotFound.length > 0 && <p className="text-amber-400">Not found: {serverResult.filesNotFound.join(', ')}</p>}
                </>
              )}
            </div>
          )}
        </div>

        {/* Manual file upload */}
        <div className="card-dark p-6 mb-6">
          <h2 className="text-sm font-semibold text-white mb-1">Import Questions from File Upload</h2>
          <p className="text-xs text-gray-500 mb-4">
            Upload a JSON file containing an array of question objects. All questions must have the correct schema.
            Use the batch files in <code className="font-mono">data/questions/</code>.
          </p>

          <div className="space-y-4">
            <input
              ref={fileRef}
              type="file"
              accept=".json"
              className="block w-full text-sm text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-indigo-900 file:text-indigo-200 hover:file:bg-indigo-800 cursor-pointer"
            />

            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={overwrite}
                onChange={(e) => setOverwrite(e.target.checked)}
                className="accent-indigo-600"
              />
              Overwrite existing questions (update by ID)
            </label>

            <button
              onClick={handleImport}
              disabled={importing}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium transition-colors"
            >
              {importing ? 'Importing…' : 'Import'}
            </button>

            {progress && (
              <p className="text-xs text-indigo-400">{progress}</p>
            )}

            {result && (
              <div className={`rounded-lg p-3 text-xs ${result.ok ? 'bg-green-950/40 border border-green-800/40' : 'bg-red-950/40 border border-red-800/40'}`}>
                {result.error ? (
                  <p className="text-red-400">Error: {result.error}</p>
                ) : (
                  <p className="text-green-400">
                    Done — Created: {result.created} · Updated: {result.updated} · Skipped: {result.skipped} · Errors: {result.errors}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Files available to import */}
        <div className="card-dark p-6 mb-6">
          <h2 className="text-sm font-semibold text-white mb-3">Question Files (import in this order)</h2>
          <ol className="space-y-1.5 text-xs font-mono text-gray-400">
            <li>1. <span className="text-indigo-300">data/questions/jr-fsc-sample.json</span> — 20 Jr. FSE questions <span className="text-gray-600">[overwrite if already imported]</span></li>
            <li>2. <span className="text-indigo-300">data/questions/jr-fse-all-questions.json</span> — 155 Jr. FSE questions</li>
            <li>3. <span className="text-indigo-300">data/questions/book-jr-fse-questions.json</span> — 420 Jr. FSE questions (new book-based)</li>
            <li>4. <span className="text-indigo-300">data/questions/fsc-sample.json</span> — 15 FSE questions <span className="text-gray-600">[overwrite if already imported]</span></li>
            <li>5. <span className="text-indigo-300">data/questions/book-fse-questions.json</span> — 420 FSE questions (new book-based)</li>
          </ol>
          <p className="text-xs text-gray-600 mt-3">Total after all imports: ~595 Jr. FSE · ~435 FSE</p>
        </div>

        <div className="card-dark p-6">
          <h2 className="text-sm font-semibold text-white mb-3">Notes</h2>
          <ul className="space-y-1.5 text-xs text-gray-400">
            <li>&#x2022; <code className="font-mono">active: false</code> removes a question from exam selection without deleting it.</li>
            <li>&#x2022; <code className="font-mono">reviewRequired: true</code> flags a question for admin review before activation.</li>
            <li>&#x2022; Jr. FSE and FSE banks are completely separate — FSE AI exam uses the FSE bank.</li>
            <li>&#x2022; Maintain at least 50 active questions per bank. Target 1,000.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
