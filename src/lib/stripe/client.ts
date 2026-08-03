import Stripe from 'stripe';

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY environment variable.');
  return new Stripe(key, { apiVersion: '2024-04-10', typescript: true });
}

export const STRIPE_PRODUCTS = {
  // ─────────────────────────────────────────────────────────────────────────
  // TRAINING PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  // 3-to-6-month program: 28 modules, Jr. FSE exam unlocked after completion
  training_course: {
    name: 'UPS FSE Training Course (3–6 Months) + Jr. FSE Certification Exam',
    shortName: 'Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_COURSE ?? 'price_1TmJLsB8fedYuRufhjtQgnSS',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PRACTICE TEST — not a certification attempt; no cert issued on pass
  // Can be made temporarily free by admin via Firestore settings/practiceTest
  // ─────────────────────────────────────────────────────────────────────────

  practice_test: {
    name: 'Jr. FSE Practice Exam',
    shortName: 'Jr. FSE Practice Test',
    priceInCents: 1499,     // $14.99
    stripePriceId: process.env.STRIPE_PRICE_ID_PRACTICE_TEST ?? 'price_1TmflrB8fedYuRufBJZIH3CC',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // JR. FSE TEST-OUT (skip training — one attempt only, fail = must train)
  // ─────────────────────────────────────────────────────────────────────────

  // Human proctored: live proctor session, more accountability
  jr_fse_test_human: {
    name: 'Jr. FSE Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. FSE Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_FSE_HUMAN ?? 'price_1TmfniB8fedYuRufPOIIsixS',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FSE EXAM (advanced — human proctored only)
  // ─────────────────────────────────────────────────────────────────────────

  fse_proctored_exam: {
    name: 'FSE Certification Exam — Human Proctored',
    shortName: 'FSE Exam (Human Proctored)',
    priceInCents: 64900,    // $649
    stripePriceId: process.env.STRIPE_PRICE_ID_FSE ?? 'price_1TjlZdB8fedYuRuf69YOExVF',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PACKAGES (training + exam bundle — save vs buying separately)
  // ─────────────────────────────────────────────────────────────────────────

  // Training + Jr. FSE Human test-out ($1,499 + $299 = $1,798 → $1,749, save $49)
  pkg_training_jr_human: {
    name: 'Training Course + Jr. FSE Test-Out (Human Proctored)',
    shortName: 'Training + Jr. FSE Human Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_JR_HUMAN ?? 'price_1TmflsB8fedYuRufm9Uqnfti',
  },

  // Training + FSE ($1,499 + $649 = $2,148 → $2,099, save $49)
  pkg_training_fse: {
    name: 'Training Course + FSE Exam (Human Proctored)',
    shortName: 'Training + FSE Package',
    priceInCents: 209900,   // $2,099
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_FSE ?? 'price_1TmflsB8fedYuRufQCtOIJN5',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // COMMERCIAL KITCHEN FSE PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_kitchen: {
    name: 'Commercial Kitchen FSE Training Course + Jr. Kitchen FSE Certification Exam',
    shortName: 'Kitchen Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_KITCHEN ?? '',
  },

  // Human proctored test-out: skip training — one attempt only, fail = must train
  jr_kitchen_fse_test_human: {
    name: 'Jr. Kitchen FSE Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Kitchen FSE Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_KITCHEN_FSE_HUMAN ?? '',
  },

  // Kitchen training + test-out ($1,499 + $299 = $1,798 → $1,749, save $49)
  pkg_training_kitchen_testout: {
    name: 'Kitchen Training Course + Jr. Kitchen FSE Test-Out (Human Proctored)',
    shortName: 'Kitchen Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_KITCHEN_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // HVAC FSE PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_hvac: {
    name: 'HVAC FSE Training Course + Jr. HVAC FSE Certification Exam',
    shortName: 'HVAC Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_HVAC ?? '',
  },

  // Human proctored test-out: skip training — one attempt only, fail = must train
  jr_hvac_fse_test_human: {
    name: 'Jr. HVAC FSE Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. HVAC FSE Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_HVAC_FSE_HUMAN ?? '',
  },

  // HVAC training + test-out ($1,499 + $299 = $1,798 → $1,749, save $49)
  pkg_training_hvac_testout: {
    name: 'HVAC Training Course + Jr. HVAC FSE Test-Out (Human Proctored)',
    shortName: 'HVAC Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_HVAC_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // GENERATOR (POWER GENERATION) FSE PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_generator: {
    name: 'Power Generation FSE Training Course + Jr. Generator FSE Certification Exam',
    shortName: 'Generator Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_GENERATOR ?? '',
  },

  // Human proctored test-out: skip training — one attempt only, fail = must train
  jr_gen_fse_test_human: {
    name: 'Jr. Generator FSE Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Generator FSE Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_GEN_FSE_HUMAN ?? '',
  },

  // Generator training + test-out ($1,499 + $299 = $1,798 → $1,749, save $49)
  pkg_training_generator_testout: {
    name: 'Generator Training Course + Jr. Generator FSE Test-Out (Human Proctored)',
    shortName: 'Generator Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_GENERATOR_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DATA CENTER CRITICAL FACILITIES PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_datacenter: {
    name: 'Data Center Critical Facilities Training Course + Jr. CFT Certification Exam',
    shortName: 'Data Center Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_DATACENTER ?? '',
  },

  // Human proctored test-out: skip training — one attempt only, fail = must train
  jr_dc_cft_test_human: {
    name: 'Jr. Data Center CFT Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Data Center CFT Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_DC_CFT_HUMAN ?? '',
  },

  // Data center training + test-out ($1,499 + $299 = $1,798 → $1,749, save $49)
  pkg_training_datacenter_testout: {
    name: 'Data Center Training Course + Jr. CFT Test-Out (Human Proctored)',
    shortName: 'Data Center Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_DATACENTER_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SOLAR & BATTERY ENERGY STORAGE PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_solar: {
    name: 'Solar & Storage FSE Training Course + Jr. Solar FSE Certification Exam',
    shortName: 'Solar/BESS Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_SOLAR ?? '',
  },

  // Human proctored test-out: skip training — one attempt only, fail = must train
  jr_solar_fse_test_human: {
    name: 'Jr. Solar & Storage FSE Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Solar FSE Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_SOLAR_FSE_HUMAN ?? '',
  },

  // Solar training + test-out ($1,499 + $299 = $1,798 → $1,749, save $49)
  pkg_training_solar_testout: {
    name: 'Solar/BESS Training Course + Jr. Solar FSE Test-Out (Human Proctored)',
    shortName: 'Solar Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_SOLAR_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // EV CHARGING INFRASTRUCTURE PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_evcharging: {
    name: 'EV Charging Infrastructure Training Course + Jr. EV Charging Tech Certification Exam',
    shortName: 'EV Charging Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_EVCHARGING ?? '',
  },

  // Human proctored test-out: skip training — one attempt only, fail = must train
  jr_ev_tech_test_human: {
    name: 'Jr. EV Charging Tech Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. EV Tech Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_EV_TECH_HUMAN ?? '',
  },

  // EV Charging training + test-out ($1,499 + $299 = $1,798 → $1,749, save $49)
  pkg_training_evcharging_testout: {
    name: 'EV Charging Training Course + Jr. EV Tech Test-Out (Human Proctored)',
    shortName: 'EV Charging Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_EVCHARGING_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // TELECOM DC POWER PLANTS PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_dcplants: {
    name: 'Telecom DC Power Plants Training Course + Jr. DC Plants Tech Certification Exam',
    shortName: 'DC Plants Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_DCPLANTS ?? '',
  },

  // Human proctored test-out: skip training — one attempt only, fail = must train
  jr_dcp_tech_test_human: {
    name: 'Jr. DC Plants Tech Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. DC Plants Tech Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_DCP_TECH_HUMAN ?? '',
  },

  // DC Plants training + test-out ($1,499 + $299 = $1,798 → $1,749, save $49)
  pkg_training_dcplants_testout: {
    name: 'DC Plants Training Course + Jr. DC Plants Tech Test-Out (Human Proctored)',
    shortName: 'DC Plants Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_DCPLANTS_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BATTERY SYSTEMS TECHNICIAN PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_battery: {
    name: 'Battery Systems Technician Training Course + Jr. Battery Tech Certification Exam',
    shortName: 'Battery Tech Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_BATTERY ?? '',
  },

  // Human proctored test-out: skip training — one attempt only, fail = must train
  jr_battery_tech_test_human: {
    name: 'Jr. Battery Systems Tech Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Battery Tech Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_BATTERY_TECH_HUMAN ?? '',
  },

  // Battery Tech training + test-out ($1,499 + $299 = $1,798 → $1,749, save $49)
  pkg_training_battery_testout: {
    name: 'Battery Tech Training Course + Jr. Battery Tech Test-Out (Human Proctored)',
    shortName: 'Battery Tech Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_BATTERY_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DATA CENTER ENGINEER PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_dcengineer: {
    name: 'Data Center Engineer Training Course + Jr. DC Engineer Certification Exam',
    shortName: 'DC Engineer Training Course',
    priceInCents: 199900,   // $1,999 (premium: 34 modules)
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_DCENGINEER ?? '',
  },

  // Human proctored test-out: skip training — one attempt only, fail = must train
  jr_dc_engineer_test_human: {
    name: 'Jr. Data Center Engineer Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. DC Engineer Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_DC_ENGINEER_HUMAN ?? '',
  },

  // DC Engineer training + test-out ($1,999 + $299 = $2,298 → $2,199, save $99)
  pkg_training_dcengineer_testout: {
    name: 'DC Engineer Training Course + Jr. DC Engineer Test-Out (Human Proctored)',
    shortName: 'DC Engineer Training + Test-Out Package',
    priceInCents: 219900,   // $2,199
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_DCENGINEER_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MARINE TECHNICIAN PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_marine: {
    name: 'Marine Systems Technician Training Course + Jr. Marine Tech Certification Exam',
    shortName: 'Marine Tech Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_MARINE ?? '',
  },

  jr_marine_tech_test_human: {
    name: 'Jr. Marine Systems Tech Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Marine Tech Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_MARINE_TECH_HUMAN ?? '',
  },

  pkg_training_marine_testout: {
    name: 'Marine Tech Training Course + Jr. Marine Tech Test-Out (Human Proctored)',
    shortName: 'Marine Tech Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_MARINE_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POOL EQUIPMENT TECHNICIAN PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_pool: {
    name: 'Pool Equipment Technician Training Course + Jr. Pool Tech Certification Exam',
    shortName: 'Pool Equipment Tech Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_POOL ?? '',
  },

  jr_pool_tech_test_human: {
    name: 'Jr. Pool Equipment Tech Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Pool Tech Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_POOL_TECH_HUMAN ?? '',
  },

  pkg_training_pool_testout: {
    name: 'Pool Equipment Tech Training Course + Jr. Pool Tech Test-Out (Human Proctored)',
    shortName: 'Pool Equipment Tech Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_POOL_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // HVAC TECHNICIAN PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_hvac_tech: {
    name: 'HVAC Technician Training Course + Jr. HVAC Tech Certification Exam',
    shortName: 'HVAC Tech Training Course',
    priceInCents: 149900,
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_HVAC_TECH ?? '',
  },

  jr_hvac_tech_test_human: {
    name: 'Jr. HVAC Technician Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. HVAC Tech Test-Out (Human Proctored)',
    priceInCents: 29900,
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_HVAC_TECH_HUMAN ?? '',
  },

  pkg_training_hvac_tech_testout: {
    name: 'HVAC Tech Training Course + Jr. HVAC Tech Test-Out (Human Proctored)',
    shortName: 'HVAC Tech Training + Test-Out Package',
    priceInCents: 174900,
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_HVAC_TECH_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SOLAR INSTALLER PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_solar_inst: {
    name: 'Solar Installer Training Course + Jr. Solar Installer Certification Exam',
    shortName: 'Solar Installer Training Course',
    priceInCents: 149900,
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_SOLAR_INST ?? '',
  },

  jr_solar_inst_test_human: {
    name: 'Jr. Solar Installer Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Solar Installer Test-Out (Human Proctored)',
    priceInCents: 29900,
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_SOLAR_INST_HUMAN ?? '',
  },

  pkg_training_solar_inst_testout: {
    name: 'Solar Installer Training Course + Jr. Solar Installer Test-Out (Human Proctored)',
    shortName: 'Solar Installer Training + Test-Out Package',
    priceInCents: 174900,
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_SOLAR_INST_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // WIND TURBINE TECHNICIAN PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_wind_tech: {
    name: 'Wind Turbine Technician Training Course + Jr. Wind Turbine Technician Certification Exam',
    shortName: 'Wind Turbine Technician Training Course',
    priceInCents: 149900,
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_WIND_TECH ?? '',
  },

  jr_wind_tech_test_human: {
    name: 'Jr. Wind Turbine Technician Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Wind Turbine Tech Test-Out (Human Proctored)',
    priceInCents: 29900,
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_WIND_TECH_HUMAN ?? '',
  },

  pkg_training_wind_tech_testout: {
    name: 'Wind Turbine Technician Training Course + Jr. Wind Turbine Tech Test-Out (Human Proctored)',
    shortName: 'Wind Turbine Tech Training + Test-Out Package',
    priceInCents: 174900,
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_WIND_TECH_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ELEVATOR TECHNICIAN PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_elevator_tech: {
    name: 'Elevator Technician Training Course + Jr. Elevator Technician Certification Exam',
    shortName: 'Elevator Technician Training Course',
    priceInCents: 149900,
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_ELEVATOR_TECH ?? '',
  },

  jr_elevator_tech_test_human: {
    name: 'Jr. Elevator Technician Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Elevator Tech Test-Out (Human Proctored)',
    priceInCents: 29900,
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_ELEVATOR_TECH_HUMAN ?? '',
  },

  pkg_training_elevator_tech_testout: {
    name: 'Elevator Technician Training Course + Jr. Elevator Tech Test-Out (Human Proctored)',
    shortName: 'Elevator Tech Training + Test-Out Package',
    priceInCents: 174900,
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_ELEVATOR_TECH_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FIRE ALARM & SUPPRESSION TECHNICIAN PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_fire_alarm_tech: {
    name: 'Fire Alarm & Suppression Technician Training Course + Jr. Fire Alarm Technician Certification Exam',
    shortName: 'Fire Alarm Technician Training Course',
    priceInCents: 149900,
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_FIRE_ALARM_TECH ?? '',
  },

  jr_fire_alarm_tech_test_human: {
    name: 'Jr. Fire Alarm Technician Certification Exam (Human Proctored)',
    shortName: 'Jr. Fire Alarm Tech Test-Out (Human Proctored)',
    priceInCents: 29900,
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_FIRE_ALARM_TECH_HUMAN ?? '',
  },

  pkg_training_fire_alarm_tech_testout: {
    name: 'Fire Alarm Technician Training Course + Jr. Fire Alarm Tech Test-Out (Human Proctored)',
    shortName: 'Fire Alarm Tech Training + Test-Out Package',
    priceInCents: 174900,
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_FIRE_ALARM_TECH_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BIOMEDICAL EQUIPMENT TECHNICIAN (BMET) PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_bmet_tech: {
    name: 'Biomedical Equipment Technician Training Course + Jr. BMET Certification Exam',
    shortName: 'BMET Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_BMET_TECH ?? '',
  },

  jr_bmet_tech_test_human: {
    name: 'Jr. Biomedical Equipment Tech Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. BMET Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_BMET_TECH_HUMAN ?? '',
  },

  pkg_training_bmet_tech_testout: {
    name: 'BMET Training Course + Jr. BMET Test-Out (Human Proctored)',
    shortName: 'BMET Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_BMET_TECH_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BUILDING AUTOMATION SYSTEMS (BAS) TECHNICIAN PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_bas_tech: {
    name: 'Building Automation Systems Technician Training Course + Jr. BAS Tech Certification Exam',
    shortName: 'BAS Tech Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_BAS_TECH ?? '',
  },

  jr_bas_tech_test_human: {
    name: 'Jr. Building Automation Systems Tech Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. BAS Tech Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_BAS_TECH_HUMAN ?? '',
  },

  pkg_training_bas_tech_testout: {
    name: 'BAS Tech Training Course + Jr. BAS Tech Test-Out (Human Proctored)',
    shortName: 'BAS Tech Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_BAS_TECH_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // COMMERCIAL REFRIGERATION TECHNICIAN PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_ref_tech: {
    name: 'Commercial Refrigeration Technician Training Course + Jr. Ref Tech Certification Exam',
    shortName: 'Ref Tech Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_REF_TECH ?? '',
  },

  jr_ref_tech_test_human: {
    name: 'Jr. Commercial Refrigeration Tech Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Ref Tech Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_REF_TECH_HUMAN ?? '',
  },

  pkg_training_ref_tech_testout: {
    name: 'Ref Tech Training Course + Jr. Ref Tech Test-Out (Human Proctored)',
    shortName: 'Ref Tech Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_REF_TECH_TESTOUT ?? '',
  },

  training_plc_tech: {
    name: 'Industrial Controls & PLC Technician Training Course + Jr. PLC Tech Certification Exam',
    shortName: 'PLC Tech Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_PLC_TECH ?? '',
  },

  jr_plc_tech_test_human: {
    name: 'Jr. Industrial Controls & PLC Tech Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. PLC Tech Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_PLC_TECH_HUMAN ?? '',
  },

  pkg_training_plc_tech_testout: {
    name: 'PLC Tech Training Course + Jr. PLC Tech Test-Out (Human Proctored)',
    shortName: 'PLC Tech Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_PLC_TECH_TESTOUT ?? '',
  },

  training_security_tech: {
    name: 'Electronic Security Systems Technician Training Course + Jr. Security Tech Certification Exam',
    shortName: 'Security Tech Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_SECURITY_TECH ?? '',
  },

  jr_security_tech_test_human: {
    name: 'Jr. Electronic Security Systems Tech Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Security Tech Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_SECURITY_TECH_HUMAN ?? '',
  },

  pkg_training_security_tech_testout: {
    name: 'Security Tech Training Course + Jr. Security Tech Test-Out (Human Proctored)',
    shortName: 'Security Tech Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_SECURITY_TECH_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FIELD PROJECT MANAGER PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_field_pm: {
    name: 'Field Project Manager Training Course + Jr. Field Project Manager Certification Exam',
    shortName: 'Field PM Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_FIELD_PM ?? '',
  },

  jr_field_pm_test_human: {
    name: 'Jr. Field Project Manager Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Field PM Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_FIELD_PM_HUMAN ?? '',
  },

  pkg_training_field_pm_testout: {
    name: 'Field PM Training Course + Jr. Field PM Test-Out (Human Proctored)',
    shortName: 'Field PM Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_FIELD_PM_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PUMP TECHNICIAN PROGRAM
  // ─────────────────────────────────────────────────────────────────────────

  training_pump_tech: {
    name: 'Pump Technician Training Course + Jr. Pump Technician Certification Exam',
    shortName: 'Pump Tech Training Course',
    priceInCents: 149900,   // $1,499
    stripePriceId: process.env.STRIPE_PRICE_ID_TRAINING_PUMP_TECH ?? '',
  },

  jr_pump_tech_test_human: {
    name: 'Jr. Pump Technician Certification Exam — Human Proctored Test-Out',
    shortName: 'Jr. Pump Tech Test-Out (Human Proctored)',
    priceInCents: 29900,    // $299
    stripePriceId: process.env.STRIPE_PRICE_ID_JR_PUMP_TECH_HUMAN ?? '',
  },

  pkg_training_pump_tech_testout: {
    name: 'Pump Tech Training Course + Jr. Pump Tech Test-Out (Human Proctored)',
    shortName: 'Pump Tech Training + Test-Out Package',
    priceInCents: 174900,   // $1,749
    stripePriceId: process.env.STRIPE_PRICE_ID_PKG_PUMP_TECH_TESTOUT ?? '',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PHYSICAL PRODUCTS
  // ─────────────────────────────────────────────────────────────────────────

  signed_book: {
    name: 'Mastering Uninterruptible Power Supplies — Signed Copy',
    shortName: 'Signed Book (Ships to You)',
    priceInCents: 6999,     // $69.99
    stripePriceId: process.env.STRIPE_PRICE_ID_SIGNED_BOOK ?? 'price_1TmL58B8fedYuRufJ5zfszYd',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // EMPLOYER PACKS
  // ─────────────────────────────────────────────────────────────────────────

  employer_5pack: {
    name: 'Employer Team Pack — 5 Training Course Seats',
    shortName: '5-Seat Team Pack',
    priceInCents: 699900,   // $6,999
    stripePriceId: process.env.STRIPE_PRICE_ID_EMPLOYER_5PACK ?? 'price_1TmJoaB8fedYuRufbhA6kKkC',
  },

  employer_10pack: {
    name: 'Employer Team Pack — 10 Training Course Seats',
    shortName: '10-Seat Team Pack',
    priceInCents: 1299900,  // $12,999
    stripePriceId: process.env.STRIPE_PRICE_ID_EMPLOYER_10PACK ?? 'price_1TmJq1B8fedYuRuf2wQ2Osrd',
  },
} as const;

export type ProductId = keyof typeof STRIPE_PRODUCTS;
