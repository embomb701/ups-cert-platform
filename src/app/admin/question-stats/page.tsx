'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getIdToken } from '@/lib/firebase/auth';

const LEVEL_LABELS: Record<string, string> = {
  jr_fse: 'UPS FSE',
  jr_kitchen_fse: 'Kitchen FSE',
  jr_hvac_fse: 'HVAC FSE',
  jr_gen_fse: 'Generator FSE',
  jr_dc_cft: 'Data Center CFT',
  jr_solar_fse: 'Solar/BESS FSE',
  jr_ev_tech: 'EV Charging Tech',
  jr_dcp_tech: 'DC Plant Tech',
  jr_battery_tech: 'Battery Tech',
  jr_dc_engineer: 'DC Engineer',
  jr_marine_tech: 'Marine Tech',
  jr_pool_tech: 'Pool Equipment Tech',
  jr_hvac_tech: 'HVAC Tech',
  jr_solar_inst: 'Solar Installer',
  jr_wind_tech: 'Wind Turbine Tech',
  jr_elevator_tech: 'Elevator Tech',
  jr_fire_alarm_tech: 'Fire Alarm Tech',
  jr_bmet_tech: 'BMET',
  jr_bas_tech: 'BAS Tech',
  jr_ref_tech: 'Ref Tech',
  jr_plc_tech: 'PLC Tech',
  jr_security_tech: 'Security Tech',
  jr_field_pm: 'Field PM',
  jr_pump_tech: 'Pump Tech',
  jr_industrial_ref: 'Industrial Ref',
  jr_dc_ops: 'DC Ops Manager',
  jr_building_cx: 'Building Cx',
  jr_telecom_tech: 'Telecom OSP',
  jr_switchgear_tech: 'Switchgear Tech',
  fse: 'UPS FSE (Proctored)',
};

interface QuestionRow {
  id: string;
  category: string;
  questionText: string;
  safetyCritical: boolean;
  timesAsked: number;
  timesCorrect: number;
  timesWrong: number;
  wrongRate: number;
}

interface StatsResponse {
  examLevel: string;
  totalTracked: number;
  totalAboveMinSample: number;
  questions: QuestionRow[];
  error?: string;
}

export default function QuestionStatsPage() {
  const [examLevel, setExamLevel] = useState('jr_fse');
  const [minSample, setMinSample] = useState(10);
  const [data, setData] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/admin/question-stats?examLevel=${examLevel}&minSample=${minSample}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json: StatsResponse = await res.json();
      if (json.error) {
        setError(json.error);
        setData(null);
      } else {
        setData(json);
      }
    } catch {
      setError('Failed to load question stats.');
    } finally {
      setLoading(false);
    }
  }, [examLevel, minSample]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section className="section-pad">
      <div className="container-site max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-white">Question Stats</h1>
          <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-300">← Admin</Link>
        </div>
        <p className="text-sm text-gray-500 mb-8">
          Highest wrong-rate questions per course, ranked worst-first. A question with an anomalously high
          wrong-rate relative to its peers is worth a manual review — it&apos;s either a genuinely hard question
          (fine) or has a wrong answer key, an ambiguous option, or a stale standard cited (not fine — this is
          exactly how the BMET NFPA 99 threshold error was found).
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <select
            value={examLevel}
            onChange={(e) => setExamLevel(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-indigo-500"
          >
            {Object.entries(LEVEL_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-gray-400">
            Min. sample size
            <input
              type="number"
              min={1}
              value={minSample}
              onChange={(e) => setMinSample(Math.max(1, Number(e.target.value) || 1))}
              className="w-20 px-2 py-1.5 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </label>
          {data && (
            <span className="text-xs text-gray-600">
              {data.totalTracked.toLocaleString()} questions tracked · {data.totalAboveMinSample.toLocaleString()} above min. sample
            </span>
          )}
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : !data || data.questions.length === 0 ? (
          <div className="card-dark p-8 text-center">
            <p className="text-sm text-gray-500">
              No questions have reached the minimum sample size yet for this course — check back once more
              attempts have been scored, or lower the minimum sample size above.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.questions.map((q) => (
              <div key={q.id} className="card-dark p-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-400">{q.category}</span>
                    {q.safetyCritical && (
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-950/50 border border-amber-900/50 text-amber-400">
                        Safety-Related
                      </span>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-lg font-bold ${q.wrongRate >= 50 ? 'text-red-400' : q.wrongRate >= 30 ? 'text-amber-400' : 'text-gray-300'}`}>
                      {q.wrongRate}% wrong
                    </p>
                    <p className="text-xs text-gray-600">{q.timesWrong} / {q.timesAsked} attempts</p>
                  </div>
                </div>
                <p className="text-sm text-gray-200">{q.questionText}</p>
                <p className="text-xs text-gray-600 font-mono mt-2">{q.id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
