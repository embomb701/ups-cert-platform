'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface ProductInfo {
  heading: string;
  detail: string;
  nextStep?: { label: string; href: string };
  callout?: { title: string; body: string; color: 'amber' | 'indigo' | 'green' };
  steps?: { label: string; sub: string }[];
}

const CERT_PATH = [
  { label: 'Complete all modules', sub: 'Work through lessons at your own pace — progress is saved' },
  { label: 'Pass the practice exam', sub: 'Free included — use it to gauge your readiness' },
  { label: 'Earn your certification', sub: 'Pass the exam and get a verified, employer-searchable credential' },
];

const PRODUCT_INFO: Record<string, ProductInfo> = {
  // ── Training courses ───────────────────────────────────────────────────
  training_course:        { heading: 'UPS FSE Training Unlocked', detail: 'Full access to all 28 UPS Field Service Engineering modules is now active.', nextStep: { label: 'Start Training →', href: '/training/ups' }, steps: CERT_PATH },
  training_portal:        { heading: 'UPS FSE Training Unlocked', detail: 'Full access to all 28 UPS Field Service Engineering modules is now active.', nextStep: { label: 'Start Training →', href: '/training/ups' }, steps: CERT_PATH },
  training_kitchen:       { heading: 'Kitchen FSE Training Unlocked', detail: 'Full access to Commercial Kitchen Field Service Engineering is now active.', nextStep: { label: 'Start Training →', href: '/training/kitchen' }, steps: CERT_PATH },
  training_hvac:          { heading: 'HVAC FSE Training Unlocked', detail: 'Full access to HVAC Field Service Engineering is now active.', nextStep: { label: 'Start Training →', href: '/training/hvac' }, steps: CERT_PATH },
  training_generator:     { heading: 'Generator FSE Training Unlocked', detail: 'Full access to Power Generation Field Service Engineering is now active.', nextStep: { label: 'Start Training →', href: '/training/generator' }, steps: CERT_PATH },
  training_datacenter:    { heading: 'Data Center CFT Training Unlocked', detail: 'Full access to Data Center Critical Facilities is now active.', nextStep: { label: 'Start Training →', href: '/training/datacenter' }, steps: CERT_PATH },
  training_solar:         { heading: 'Solar/BESS Training Unlocked', detail: 'Full access to Solar & Battery Energy Storage is now active.', nextStep: { label: 'Start Training →', href: '/training/solar' }, steps: CERT_PATH },
  training_evcharging:    { heading: 'EV Charging Training Unlocked', detail: 'Full access to EV Charging Infrastructure is now active.', nextStep: { label: 'Start Training →', href: '/training/evcharging' }, steps: CERT_PATH },
  training_dcplants:      { heading: 'DC Plants Training Unlocked', detail: 'Full access to Telecom DC Power Plants is now active.', nextStep: { label: 'Start Training →', href: '/training/dcplants' }, steps: CERT_PATH },
  training_battery:       { heading: 'Battery Tech Training Unlocked', detail: 'Full access to Battery Systems Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/battery' }, steps: CERT_PATH },
  training_dcengineer:    { heading: 'DC Engineer Training Unlocked', detail: 'Full access to Data Center Engineer is now active.', nextStep: { label: 'Start Training →', href: '/training/dcengineer' }, steps: CERT_PATH },
  training_marine:        { heading: 'Marine Tech Training Unlocked', detail: 'Full access to Marine Systems Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/marine' }, steps: CERT_PATH },
  training_pool:          { heading: 'Pool Tech Training Unlocked', detail: 'Full access to Pool Equipment Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/pool' }, steps: CERT_PATH },
  training_hvac_tech:     { heading: 'HVAC Tech Training Unlocked', detail: 'Full access to HVAC Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/hvac-tech' }, steps: CERT_PATH },
  training_solar_inst:    { heading: 'Solar Installer Training Unlocked', detail: 'Full access to Solar Installer is now active.', nextStep: { label: 'Start Training →', href: '/training/solar-inst' }, steps: CERT_PATH },
  training_wind_tech:     { heading: 'Wind Tech Training Unlocked', detail: 'Full access to Wind Turbine Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/wind-tech' }, steps: CERT_PATH },
  training_elevator_tech: { heading: 'Elevator Tech Training Unlocked', detail: 'Full access to Elevator Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/elevator-tech' }, steps: CERT_PATH },
  training_fire_alarm_tech: { heading: 'Fire Alarm Tech Training Unlocked', detail: 'Full access to Fire Alarm & Suppression Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/fire-alarm-tech' }, steps: CERT_PATH },
  training_bmet_tech:     { heading: 'BMET Training Unlocked', detail: 'Full access to Biomedical Equipment Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/bmet-tech' }, steps: CERT_PATH },
  training_bas_tech:      { heading: 'BAS Tech Training Unlocked', detail: 'Full access to Building Automation Systems Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/bas-tech' }, steps: CERT_PATH },
  training_ref_tech:      { heading: 'Refrigeration Tech Training Unlocked', detail: 'Full access to Commercial Refrigeration Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/ref-tech' }, steps: CERT_PATH },
  training_plc_tech:      { heading: 'PLC Tech Training Unlocked', detail: 'Full access to Industrial Controls & PLC Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/plc-tech' }, steps: CERT_PATH },
  training_security_tech: { heading: 'Security Tech Training Unlocked', detail: 'Full access to Electronic Security Systems Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/security-tech' }, steps: CERT_PATH },
  training_field_pm:      { heading: 'Field PM Training Unlocked', detail: 'Full access to Field Project Manager is now active.', nextStep: { label: 'Start Training →', href: '/training/field-pm' }, steps: CERT_PATH },
  training_pump_tech:     { heading: 'Pump Tech Training Unlocked', detail: 'Full access to Pump Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/pump-tech' }, steps: CERT_PATH },
  training_industrial_ref: { heading: 'Industrial Ref Training Unlocked', detail: 'Full access to Industrial Refrigeration Operator is now active.', nextStep: { label: 'Start Training →', href: '/training/industrial-ref' }, steps: CERT_PATH },
  training_dc_ops:        { heading: 'DC Ops Training Unlocked', detail: 'Full access to Data Center Operations Manager is now active.', nextStep: { label: 'Start Training →', href: '/training/dc-ops' }, steps: CERT_PATH },
  training_building_cx:   { heading: 'Building Cx Training Unlocked', detail: 'Full access to Building Commissioning Agent is now active.', nextStep: { label: 'Start Training →', href: '/training/building-cx' }, steps: CERT_PATH },
  training_telecom:       { heading: 'Telecom Training Unlocked', detail: 'Full access to Telecom OSP Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/telecom' }, steps: CERT_PATH },
  training_switchgear_tech: { heading: 'Switchgear Tech Training Unlocked', detail: 'Full access to Switchgear & Substation Technician is now active.', nextStep: { label: 'Start Training →', href: '/training/switchgear-tech' }, steps: CERT_PATH },
  training_water_wastewater: { heading: 'Water/Wastewater Training Unlocked', detail: 'Full access to Water & Wastewater Treatment Operator is now active.', nextStep: { label: 'Start Training →', href: '/training/water-wastewater' }, steps: CERT_PATH },

  // ── Test-out exams ────────────────────────────────────────────────────
  jr_fse_test_human:           { heading: 'Jr. FSE Exam Access Unlocked', detail: 'Your Junior UPS Field Service Engineer exam is ready. Review the rules, then start when ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_kitchen_fse_test_human:   { heading: 'Jr. Kitchen FSE Exam Access Unlocked', detail: 'Your Junior Commercial Kitchen FSE exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_hvac_fse_test_human:      { heading: 'Jr. HVAC FSE Exam Access Unlocked', detail: 'Your Junior HVAC FSE exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_gen_fse_test_human:       { heading: 'Jr. Generator FSE Exam Access Unlocked', detail: 'Your Junior Power Generation FSE exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_dc_cft_test_human:        { heading: 'Jr. Data Center CFT Exam Access Unlocked', detail: 'Your Junior Data Center CFT exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_solar_fse_test_human:     { heading: 'Jr. Solar FSE Exam Access Unlocked', detail: 'Your Junior Solar & Storage FSE exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_ev_tech_test_human:       { heading: 'Jr. EV Tech Exam Access Unlocked', detail: 'Your Junior EV Charging Infrastructure exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_dcp_tech_test_human:      { heading: 'Jr. DC Plants Tech Exam Access Unlocked', detail: 'Your Junior Telecom DC Power Plants exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_battery_tech_test_human:  { heading: 'Jr. Battery Tech Exam Access Unlocked', detail: 'Your Junior Battery Systems Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_dc_engineer_test_human:   { heading: 'Jr. DC Engineer Exam Access Unlocked', detail: 'Your Junior Data Center Engineer exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_marine_tech_test_human:   { heading: 'Jr. Marine Tech Exam Access Unlocked', detail: 'Your Junior Marine Systems Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_pool_tech_test_human:     { heading: 'Jr. Pool Tech Exam Access Unlocked', detail: 'Your Junior Pool Equipment Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_hvac_tech_test_human:     { heading: 'Jr. HVAC Tech Exam Access Unlocked', detail: 'Your Junior HVAC Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_solar_inst_test_human:    { heading: 'Jr. Solar Installer Exam Access Unlocked', detail: 'Your Junior Solar Installer exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_wind_tech_test_human:     { heading: 'Jr. Wind Turbine Tech Exam Access Unlocked', detail: 'Your Junior Wind Turbine Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_elevator_tech_test_human: { heading: 'Jr. Elevator Tech Exam Access Unlocked', detail: 'Your Junior Elevator Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_fire_alarm_tech_test_human: { heading: 'Jr. Fire Alarm Tech Exam Access Unlocked', detail: 'Your Junior Fire Alarm Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_bmet_tech_test_human:     { heading: 'Jr. BMET Exam Access Unlocked', detail: 'Your Junior Biomedical Equipment Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_bas_tech_test_human:      { heading: 'Jr. BAS Tech Exam Access Unlocked', detail: 'Your Junior Building Automation Systems Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_ref_tech_test_human:      { heading: 'Jr. Ref Tech Exam Access Unlocked', detail: 'Your Junior Commercial Refrigeration Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_plc_tech_test_human:      { heading: 'Jr. PLC Tech Exam Access Unlocked', detail: 'Your Junior Industrial Controls & PLC Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_security_tech_test_human: { heading: 'Jr. Security Tech Exam Access Unlocked', detail: 'Your Junior Electronic Security Systems Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_field_pm_test_human:      { heading: 'Jr. Field PM Exam Access Unlocked', detail: 'Your Junior Field Project Manager exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_pump_tech_test_human:     { heading: 'Jr. Pump Tech Exam Access Unlocked', detail: 'Your Junior Pump Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_industrial_ref_test_human: { heading: 'Jr. Industrial Ref Exam Access Unlocked', detail: 'Your Junior Industrial Refrigeration Operator exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_dc_ops_test_human:        { heading: 'Jr. DC Ops Exam Access Unlocked', detail: 'Your Junior Data Center Operations Manager exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_building_cx_test_human:   { heading: 'Jr. Building Cx Exam Access Unlocked', detail: 'Your Junior Building Commissioning Agent exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_telecom_tech_test_human:  { heading: 'Jr. Telecom Tech Exam Access Unlocked', detail: 'Your Junior Telecom OSP Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_switchgear_tech_test_human: { heading: 'Jr. Switchgear Tech Exam Access Unlocked', detail: 'Your Junior Switchgear & Substation Technician exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },
  jr_water_wastewater_test_human: { heading: 'Jr. Water/Wastewater Exam Access Unlocked', detail: 'Your Junior Water & Wastewater Treatment Operator exam is ready.', nextStep: { label: 'Go to Dashboard →', href: '/dashboard' } },

  // ── FSE proctored ─────────────────────────────────────────────────────
  fse_proctored_exam: {
    heading: 'FSE Human Proctored Exam Purchased',
    detail: 'Your order is confirmed. Head to your dashboard to submit your contact info — we\'ll reach out to schedule your session.',
    nextStep: { label: 'Go to Dashboard →', href: '/dashboard' },
    callout: { title: 'Next Step: Schedule Your Session', body: 'Submit your phone number on the dashboard and our scheduling team will contact you within one business day to set up your live proctored exam.', color: 'amber' },
  },

  // ── Packages ──────────────────────────────────────────────────────────
  pkg_training_jr_human: {
    heading: 'Training + Jr. FSE Package Activated',
    detail: 'Training portal access and your Junior FSE exam are both unlocked.',
    nextStep: { label: 'Start Training →', href: '/training/ups' },
    steps: CERT_PATH,
  },
  pkg_training_fse: {
    heading: 'Training + FSE Package Activated',
    detail: 'Training portal access is unlocked and your FSE Human Proctored Exam is ordered.',
    nextStep: { label: 'Go to Dashboard →', href: '/dashboard' },
    callout: { title: 'Schedule Your FSE Session', body: 'Submit your phone number on the dashboard to get your proctored exam scheduled.', color: 'amber' },
    steps: CERT_PATH,
  },

  // ── Employer packs ────────────────────────────────────────────────────
  employer_5pack: {
    heading: '5-Seat Team Pack Activated',
    detail: 'Your employer account is ready. Invite up to 5 candidates from your team management page.',
    nextStep: { label: 'Manage Team →', href: '/account/team' },
    callout: { title: 'Invite Your Candidates', body: 'Go to your team page to generate invitation links. Each accepted invite uses one seat and grants that candidate full training access.', color: 'indigo' },
  },
  employer_10pack: {
    heading: '10-Seat Team Pack Activated',
    detail: 'Your employer account is ready. Invite up to 10 candidates from your team management page.',
    nextStep: { label: 'Manage Team →', href: '/account/team' },
    callout: { title: 'Invite Your Candidates', body: 'Go to your team page to generate invitation links. Each accepted invite uses one seat and grants that candidate full training access.', color: 'indigo' },
  },

  // ── Test-out bundles ──────────────────────────────────────────────────
  pkg_training_kitchen_testout:       { heading: 'Kitchen FSE Bundle Activated', detail: 'Training and exam access for Commercial Kitchen FSE are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/kitchen' } },
  pkg_training_hvac_testout:          { heading: 'HVAC FSE Bundle Activated', detail: 'Training and exam access for HVAC FSE are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/hvac' } },
  pkg_training_generator_testout:     { heading: 'Generator FSE Bundle Activated', detail: 'Training and exam access for Power Generation FSE are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/generator' } },
  pkg_training_datacenter_testout:    { heading: 'Data Center CFT Bundle Activated', detail: 'Training and exam access for Data Center CFT are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/datacenter' } },
  pkg_training_solar_testout:         { heading: 'Solar/BESS Bundle Activated', detail: 'Training and exam access for Solar & Battery Energy Storage are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/solar' } },
  pkg_training_evcharging_testout:    { heading: 'EV Charging Bundle Activated', detail: 'Training and exam access for EV Charging Infrastructure are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/evcharging' } },
  pkg_training_dcplants_testout:      { heading: 'DC Plants Bundle Activated', detail: 'Training and exam access for Telecom DC Power Plants are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/dcplants' } },
  pkg_training_battery_testout:       { heading: 'Battery Tech Bundle Activated', detail: 'Training and exam access for Battery Systems Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/battery' } },
  pkg_training_dcengineer_testout:    { heading: 'DC Engineer Bundle Activated', detail: 'Training and exam access for Data Center Engineer are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/dcengineer' } },
  pkg_training_marine_testout:        { heading: 'Marine Tech Bundle Activated', detail: 'Training and exam access for Marine Systems Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/marine' } },
  pkg_training_pool_testout:          { heading: 'Pool Tech Bundle Activated', detail: 'Training and exam access for Pool Equipment Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/pool' } },
  pkg_training_hvac_tech_testout:     { heading: 'HVAC Tech Bundle Activated', detail: 'Training and exam access for HVAC Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/hvac-tech' } },
  pkg_training_solar_inst_testout:    { heading: 'Solar Installer Bundle Activated', detail: 'Training and exam access for Solar Installer are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/solar-inst' } },
  pkg_training_wind_tech_testout:     { heading: 'Wind Tech Bundle Activated', detail: 'Training and exam access for Wind Turbine Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/wind-tech' } },
  pkg_training_elevator_tech_testout: { heading: 'Elevator Tech Bundle Activated', detail: 'Training and exam access for Elevator Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/elevator-tech' } },
  pkg_training_fire_alarm_tech_testout: { heading: 'Fire Alarm Tech Bundle Activated', detail: 'Training and exam access for Fire Alarm Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/fire-alarm-tech' } },
  pkg_training_bmet_tech_testout:     { heading: 'BMET Bundle Activated', detail: 'Training and exam access for Biomedical Equipment Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/bmet-tech' } },
  pkg_training_bas_tech_testout:      { heading: 'BAS Tech Bundle Activated', detail: 'Training and exam access for Building Automation Systems Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/bas-tech' } },
  pkg_training_ref_tech_testout:      { heading: 'Ref Tech Bundle Activated', detail: 'Training and exam access for Commercial Refrigeration Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/ref-tech' } },
  pkg_training_plc_tech_testout:      { heading: 'PLC Tech Bundle Activated', detail: 'Training and exam access for Industrial Controls & PLC Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/plc-tech' } },
  pkg_training_security_tech_testout: { heading: 'Security Tech Bundle Activated', detail: 'Training and exam access for Electronic Security Systems Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/security-tech' } },
  pkg_training_field_pm_testout:      { heading: 'Field PM Bundle Activated', detail: 'Training and exam access for Field Project Manager are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/field-pm' } },
  pkg_training_pump_tech_testout:     { heading: 'Pump Tech Bundle Activated', detail: 'Training and exam access for Pump Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/pump-tech' } },
  pkg_training_industrial_ref_testout: { heading: 'Industrial Ref Bundle Activated', detail: 'Training and exam access for Industrial Refrigeration Operator are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/industrial-ref' } },
  pkg_training_dc_ops_testout:        { heading: 'DC Ops Bundle Activated', detail: 'Training and exam access for Data Center Operations Manager are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/dc-ops' } },
  pkg_training_building_cx_testout:   { heading: 'Building Cx Bundle Activated', detail: 'Training and exam access for Building Commissioning Agent are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/building-cx' } },
  pkg_training_telecom_testout:       { heading: 'Telecom Bundle Activated', detail: 'Training and exam access for Telecom OSP Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/telecom' } },
  pkg_training_switchgear_tech_testout: { heading: 'Switchgear Tech Bundle Activated', detail: 'Training and exam access for Switchgear & Substation Technician are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/switchgear-tech' } },
  pkg_training_water_wastewater_testout: { heading: 'Water/Wastewater Bundle Activated', detail: 'Training and exam access for Water & Wastewater Treatment Operator are both unlocked.', nextStep: { label: 'Start Training →', href: '/training/water-wastewater' } },

  // ── Misc ──────────────────────────────────────────────────────────────
  signed_book: {
    heading: 'Book Order Placed',
    detail: 'Your signed copy of Mastering Uninterruptible Power Supplies, Field Service Engineering is on its way.',
    callout: { title: 'Shipping', body: 'Orders are processed and shipped within 3–5 business days. You\'ll receive tracking info by email once it ships.', color: 'green' },
  },
  practice_test: {
    heading: 'Practice Test Unlocked',
    detail: 'Your practice exam access is active. Head to your dashboard to start.',
    nextStep: { label: 'Go to Dashboard →', href: '/dashboard' },
  },
};

const CALLOUT_STYLES = {
  amber: 'border-amber-800/40 bg-amber-950/30 text-amber-300',
  indigo: 'border-indigo-800/40 bg-indigo-950/30 text-indigo-300',
  green:  'border-green-800/40 bg-green-950/30 text-green-300',
};

const GENERIC: ProductInfo = {
  heading: 'Payment Successful',
  detail: 'Your purchase has been confirmed. Your dashboard will reflect the updated access within a few moments.',
  nextStep: { label: 'Go to Dashboard →', href: '/dashboard' },
};

export function SuccessContent() {
  const searchParams = useSearchParams();
  const product = searchParams.get('product') ?? '';
  const info = PRODUCT_INFO[product] ?? GENERIC;

  return (
    <div className="card-dark p-10 text-left">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-900 border border-green-700 flex items-center justify-center">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-green-500 font-semibold uppercase tracking-wide">Payment confirmed</p>
          <h1 className="text-xl font-bold text-white">{info.heading}</h1>
        </div>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-6">{info.detail}</p>

      {info.steps && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Your path to certification</p>
          <div className="space-y-3">
            {info.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-900/60 border border-indigo-700/60 flex items-center justify-center text-xs font-bold text-indigo-400 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-200">{step.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{step.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {info.callout && (
        <div className={`rounded-xl border p-5 mb-6 ${CALLOUT_STYLES[info.callout.color]}`}>
          <h2 className="text-sm font-semibold mb-1">{info.callout.title}</h2>
          <p className="text-sm text-gray-400 leading-relaxed">{info.callout.body}</p>
        </div>
      )}

      <p className="text-xs text-gray-600 mb-6">
        A confirmation email is on its way. If your access does not appear within a few minutes, contact support — do not re-submit payment.
      </p>

      <div className="flex flex-wrap gap-3">
        {info.nextStep ? (
          <Link
            href={info.nextStep.href}
            className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
          >
            {info.nextStep.label}
          </Link>
        ) : null}
        <Link href="/dashboard" className="px-6 py-2.5 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold text-sm transition-colors">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
