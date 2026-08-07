'use client';

import { useState } from 'react';
import { getIdToken } from '@/lib/firebase/auth';

const COURSE_OPTIONS: { key: string; label: string }[] = [
  { key: 'training_portal', label: 'UPS Field Service Engineering' },
  { key: 'training_kitchen', label: 'Commercial Kitchen Field Service Engineering' },
  { key: 'training_hvac', label: 'HVAC Field Service Engineering' },
  { key: 'training_generator', label: 'Power Generation Field Service Engineering' },
  { key: 'training_datacenter', label: 'Data Center Critical Facilities' },
  { key: 'training_solar', label: 'Solar & Battery Energy Storage' },
  { key: 'training_evcharging', label: 'EV Charging Infrastructure' },
  { key: 'training_dcplants', label: 'Telecom DC Power Plants' },
  { key: 'training_battery', label: 'Battery Systems Technician' },
  { key: 'training_dcengineer', label: 'Data Center Engineer' },
  { key: 'training_marine', label: 'Marine Systems Technician' },
  { key: 'training_pool', label: 'Pool Equipment Technician' },
  { key: 'training_hvac_tech', label: 'HVAC Technician' },
  { key: 'training_solar_inst', label: 'Solar Installer' },
  { key: 'training_wind_tech', label: 'Wind Turbine Technician' },
  { key: 'training_elevator_tech', label: 'Elevator Technician' },
  { key: 'training_fire_alarm_tech', label: 'Fire Alarm & Suppression Technician' },
  { key: 'training_bmet_tech', label: 'Biomedical Equipment Technician' },
  { key: 'training_bas_tech', label: 'Building Automation Systems Technician' },
  { key: 'training_ref_tech', label: 'Commercial Refrigeration Technician' },
  { key: 'training_plc_tech', label: 'Industrial Controls & PLC Technician' },
  { key: 'training_security_tech', label: 'Electronic Security Systems Technician' },
  { key: 'training_field_pm', label: 'Field Project Manager' },
  { key: 'training_pump_tech', label: 'Pump Technician' },
  { key: 'training_industrial_ref', label: 'Industrial Refrigeration Operator' },
  { key: 'training_dc_ops', label: 'Data Center Operations Manager' },
  { key: 'training_building_cx', label: 'Building Commissioning (Cx) Agent' },
  { key: 'training_telecom', label: 'Telecom OSP Technician' },
];

interface Props {
  orderId: string;
  seatsRemaining: number;
}

export function InviteForm({ orderId, seatsRemaining }: Props) {
  const [email, setEmail] = useState('');
  const [courseKey, setCourseKey] = useState(COURSE_OPTIONS[0].key);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [inviteLink, setInviteLink] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (seatsRemaining <= 0) return;
    setStatus('loading');
    setErrorMsg('');
    setInviteLink('');

    try {
      const token = await getIdToken();
      if (!token) { setErrorMsg('Not signed in'); setStatus('error'); return; }
      const res = await fetch('/api/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: email.trim(), courseKey, orderId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Failed to create invitation');
        setStatus('error');
        return;
      }
      setInviteLink(data.link);
      setEmail('');
      setStatus('success');
    } catch {
      setErrorMsg('Network error — please try again');
      setStatus('error');
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (seatsRemaining <= 0) {
    return (
      <p className="text-sm text-gray-500 italic">No seats remaining for this order.</p>
    );
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Employee email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="employee@company.com"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Course to grant</label>
          <select
            value={courseKey}
            onChange={(e) => setCourseKey(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gray-400"
          >
            {COURSE_OPTIONS.map((c) => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {status === 'loading' ? 'Creating invitation…' : 'Generate invitation link'}
        </button>
      </form>

      {status === 'error' && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}

      {status === 'success' && inviteLink && (
        <div className="rounded-lg border border-green-700/50 bg-green-950/20 p-3 space-y-2">
          <p className="text-xs text-green-400 font-semibold">Invitation link created — share this with the employee:</p>
          <div className="flex gap-2 items-center">
            <input
              readOnly
              value={inviteLink}
              className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1.5 text-xs text-gray-300 font-mono"
            />
            <button
              onClick={copyLink}
              className="flex-shrink-0 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-xs text-white rounded-lg transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-xs text-gray-500">Link expires in 30 days. Employee must have (or create) an account to accept.</p>
        </div>
      )}
    </div>
  );
}
