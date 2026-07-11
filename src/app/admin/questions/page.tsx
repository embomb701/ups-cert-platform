'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { getIdToken } from '@/lib/firebase/auth';

interface BankStats { total: number; active: number; }
interface ImportResult { ok: boolean; created: number; updated: number; skipped: number; errors: number; error?: string; }
interface ServerImportResult { ok: boolean; filesProcessed: string[]; filesNotFound: string[]; totalCreated: number; totalUpdated: number; error?: string; }

const SERVER_FILES = [
  'jr-fsc-sample.json',
  'jr-fse-all-questions.json',
  'book-jr-fse-questions.json',
  'fsc-sample.json',
  'book-fse-questions.json',
  'kitchen-jr-fse-fresh.json',
  'kitchen-jr-fse-derived',
];

export default function AdminQuestionsPage() {
  const [stats, setStats] = useState<{ jr_fse: BankStats; fse: BankStats; jr_kitchen_fse?: BankStats } | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [serverImporting, setServerImporting] = useState(false);
  const [serverProgress, setServerProgress] = useState('');
  const [serverResult, setServerResult] = useState<ServerImportResult | null>(null);
  const [overwrite, setOverwrite] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [progress, setProgress] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleServerImport() {
    setServerImporting(true);
    setServerResult(null);
    let totalCreated = 0, totalUpdated = 0;
    const filesProcessed: string[] = [];
    const filesNotFound: string[] = [];

    try {
      const token = await getIdToken();
      for (const file of SERVER_FILES) {
        setServerProgress(`Importing ${file}…`);
        const res = await fetch('/api/admin/import-from-server', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ file }),
        });
        const data: ServerImportResult = await res.json();
        if (data.error) { filesNotFound.push(file); continue; }
        totalCreated += data.totalCreated;
        totalUpdated += data.totalUpdated;
        filesProcessed.push(...data.filesProcessed);
        filesNotFound.push(...data.filesNotFound);
      }
      setServerResult({ ok: true, filesProcessed, filesNotFound, totalCreated, totalUpdated });
      setServerProgress('');
      await loadStats();
    } catch (e: any) {
      setServerResult({ ok: false, filesProcessed: [], filesNotFound: [], totalCreated: 0, totalUpdated: 0, error: e.message });
      setServerProgress('');
    }
    setServerImporting(false);
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

  useEffect(() => { loadStats(); }, []);

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
        <div className="grid md:grid-cols-3 gap-4 mb-8">
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
        </div>

        {/* One-click server import */}
        <div className="card-dark p-6 mb-6 border-indigo-900/50">
          <h2 className="text-sm font-semibold text-white mb-1">Import All Questions from Server</h2>
          <p className="text-xs text-gray-500 mb-4">
            Imports all question bank files directly from the server — no upload needed.
            Adds ~595 Jr. FSE, ~435 FSE, and ~500 Jr. Kitchen FSE questions (derived from
            course content plus fresh scenario questions). Safe to run multiple times (skips existing).
          </p>
          <button
            onClick={handleServerImport}
            disabled={serverImporting}
            className="px-5 py-2 rounded-lg bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
          >
            {serverImporting ? 'Importing…' : 'Import All Questions Now'}
          </button>
          {serverProgress && <p className="text-xs text-indigo-400 mt-2">{serverProgress}</p>}
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
