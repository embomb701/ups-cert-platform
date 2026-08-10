'use client';

import { useState } from 'react';

const ACCESS_KEYS = [
  { key: 'training_portal',        label: 'UPS FSE Training' },
  { key: 'training_kitchen',       label: 'Commercial Kitchen FSE Training' },
  { key: 'training_hvac',          label: 'HVAC FSE Training' },
  { key: 'training_generator',     label: 'Power Generation FSE Training' },
  { key: 'training_datacenter',    label: 'Data Center Critical Facilities Training' },
  { key: 'training_solar',         label: 'Solar & Storage FSE Training' },
  { key: 'training_evcharging',    label: 'EV Charging Infrastructure Training' },
  { key: 'training_dcplants',      label: 'Telecom DC Power Plants Training' },
  { key: 'training_battery',       label: 'Battery Systems Technician Training' },
  { key: 'training_dcengineer',    label: 'Data Center Engineer Training' },
  { key: 'training_marine',        label: 'Marine Systems Technician Training' },
  { key: 'training_pool',          label: 'Pool Equipment Technician Training' },
  { key: 'training_hvac_tech',     label: 'HVAC Technician Training' },
  { key: 'training_solar_inst',    label: 'Solar Installer Training' },
  { key: 'training_wind_tech',     label: 'Wind Turbine Technician Training' },
  { key: 'training_elevator_tech', label: 'Elevator Technician Training' },
  { key: 'training_fire_alarm_tech', label: 'Fire Alarm & Suppression Tech Training' },
  { key: 'training_bmet_tech',     label: 'Biomedical Equipment Technician Training' },
  { key: 'training_ref_tech',      label: 'Commercial Refrigeration Tech Training' },
  { key: 'training_plc_tech',      label: 'Industrial Controls & PLC Tech Training' },
  { key: 'training_security_tech', label: 'Electronic Security Systems Tech Training' },
  { key: 'training_bas_tech',      label: 'Building Automation Systems Tech Training' },
  { key: 'training_field_pm',      label: 'Field Project Manager Training' },
  { key: 'training_pump_tech',     label: 'Pump Technician Training' },
  { key: 'training_industrial_ref', label: 'Industrial Refrigeration Operator Training' },
  { key: 'training_dc_ops',        label: 'Data Center Operations Manager Training' },
  { key: 'training_building_cx',   label: 'Building Commissioning Agent Training' },
  { key: 'training_telecom',       label: 'Telecom OSP Technician Training' },
  { key: 'practice_test',          label: 'Practice Test (Jr. FSE)' },
  { key: 'jr_fse',                 label: 'Jr. FSE Exam (direct — rare)' },
];

type State = 'idle' | 'loading' | 'done' | 'error';

export function GrantAccessForm() {
  const [email, setEmail] = useState('');
  const [accessKey, setAccessKey] = useState(ACCESS_KEYS[0].key);
  const [note, setNote] = useState('');
  const [state, setState] = useState<State>('idle');
  const [result, setResult] = useState<{ uid: string; email: string; accessKey: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    setResult(null);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/grant-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), accessKey, note: note.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong');
        setState('error');
        return;
      }
      setResult(data);
      setState('done');
      setNote('');
    } catch {
      setErrorMsg('Network error — please try again');
      setState('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-dark p-6 space-y-5 max-w-lg">
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1.5">User Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-600"
        />
        <p className="text-xs text-gray-600 mt-1">Must match the email on their account.</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1.5">Access to Grant</label>
        <select
          value={accessKey}
          onChange={(e) => setAccessKey(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-600"
        >
          {ACCESS_KEYS.map((a) => (
            <option key={a.key} value={a.key}>{a.label}</option>
          ))}
        </select>
        <p className="text-xs text-gray-600 mt-1 font-mono">{accessKey}</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1.5">Reason / Note <span className="text-gray-600">(optional)</span></label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Comp for failed payment, support case #123"
          className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-600"
        />
      </div>

      {state === 'error' && (
        <div className="text-sm text-red-400 bg-red-950/20 border border-red-900/40 rounded-lg px-4 py-3">
          {errorMsg}
        </div>
      )}

      {state === 'done' && result && (
        <div className="text-sm bg-emerald-950/20 border border-emerald-800/40 rounded-lg px-4 py-3 space-y-1">
          <p className="text-emerald-400 font-semibold">Access granted ✓</p>
          <p className="text-xs text-gray-400">{result.email}</p>
          <p className="text-xs font-mono text-gray-500">{result.uid}</p>
          <p className="text-xs text-gray-500">Key: <span className="font-mono text-gray-400">{result.accessKey}</span></p>
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
      >
        {state === 'loading' ? 'Granting…' : 'Grant Access'}
      </button>

      <p className="text-xs text-gray-600">
        This action is logged to the audit log. Use for comps, refund resolutions, and support cases only.
      </p>
    </form>
  );
}
