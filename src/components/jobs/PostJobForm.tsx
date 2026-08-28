'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getIdToken } from '@/lib/firebase/auth';

const COURSE_OPTIONS = [
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
  { key: 'training_switchgear_tech', label: 'Switchgear & Substation Technician' },
  { key: 'training_water_wastewater', label: 'Water & Wastewater Treatment Operator' },
];

const JOB_TYPES = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
];

export function PostJobForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('full-time');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function toggleCourse(key: string) {
    setSelectedCourses((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const token = await getIdToken();
      if (!token) { setErrorMsg('Not signed in'); setStatus('error'); return; }

      const res = await fetch('/api/jobs/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, company, location, type, description, courseRequirements: selectedCourses, contactEmail }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error ?? 'Failed to post job'); setStatus('error'); return; }
      router.push(`/jobs/${data.id}`);
    } catch {
      setErrorMsg('Network error — please try again');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Job title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. UPS Field Service Technician"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Company *</label>
          <input
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Your company name"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Location *</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Austin, TX or Remote"
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Job type *</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gray-400"
          >
            {JOB_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Contact email *</label>
        <input
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="hiring@company.com"
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400"
        />
        <p className="text-xs text-gray-600 mt-1">Shown to applicants — use a monitored inbox.</p>
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Job description *</label>
        <textarea
          required
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the role, responsibilities, requirements, and compensation..."
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 resize-y"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-2">Preferred certifications (optional)</label>
        <p className="text-xs text-gray-600 mb-3">Select courses whose Jr. certificate holders would be a strong fit.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 max-h-52 overflow-y-auto pr-1">
          {COURSE_OPTIONS.map((c) => (
            <label
              key={c.key}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors text-xs ${
                selectedCourses.includes(c.key)
                  ? 'border-blue-600 bg-blue-950/30 text-blue-300'
                  : 'border-gray-700 bg-gray-800/40 text-gray-400 hover:border-gray-600'
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={selectedCourses.includes(c.key)}
                onChange={() => toggleCourse(c.key)}
              />
              <span className={`flex-shrink-0 w-3.5 h-3.5 rounded border flex items-center justify-center ${
                selectedCourses.includes(c.key) ? 'border-blue-500 bg-blue-600' : 'border-gray-500'
              }`}>
                {selectedCourses.includes(c.key) && (
                  <span className="text-white text-[9px] font-bold leading-none">✓</span>
                )}
              </span>
              {c.label}
            </label>
          ))}
        </div>
      </div>

      {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 px-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors text-sm"
      >
        {status === 'loading' ? 'Posting…' : 'Post job listing'}
      </button>
    </form>
  );
}
