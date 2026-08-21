import { describe, it, expect } from 'vitest';
import { STRIPE_PRODUCTS } from './client';

// This pricing table has 30+ near-identical "training + test-out = package"
// entries, hand-maintained with a comment like "save $49" next to each one.
// These tests exist to catch the specific mistake that shape of table
// invites: a copy-pasted priceInCents that doesn't match its own comment,
// or a package priced at or above the sum of its parts (which would make
// the "bundle and save" pitch a lie, or actively rip off/overcharge a
// candidate who bundles instead of buying separately).

const entries = Object.entries(STRIPE_PRODUCTS);

describe('STRIPE_PRODUCTS — basic data integrity', () => {
  it('every price is a positive integer number of cents', () => {
    for (const [id, product] of entries) {
      expect(Number.isInteger(product.priceInCents), `${id}.priceInCents should be an integer`).toBe(true);
      expect(product.priceInCents, `${id}.priceInCents should be positive`).toBeGreaterThan(0);
    }
  });

  it('every product has a non-empty name and shortName', () => {
    for (const [id, product] of entries) {
      expect(product.name.length, `${id}.name should not be empty`).toBeGreaterThan(0);
      expect(product.shortName.length, `${id}.shortName should not be empty`).toBeGreaterThan(0);
    }
  });
});

describe('STRIPE_PRODUCTS — package bundles never cost more than buying separately', () => {
  // Matches e.g. "pkg_training_kitchen_testout" -> training key
  // "training_kitchen" and test-out key "jr_kitchen_fse_test_human".
  // The naming isn't perfectly regular, so this maps each known package
  // explicitly to its two component product ids rather than guessing.
  const packages: Record<string, [training: keyof typeof STRIPE_PRODUCTS, testOut: keyof typeof STRIPE_PRODUCTS]> = {
    pkg_training_jr_human: ['training_course', 'jr_fse_test_human'],
    pkg_training_fse: ['training_course', 'fse_proctored_exam'],
    pkg_training_kitchen_testout: ['training_kitchen', 'jr_kitchen_fse_test_human'],
    pkg_training_hvac_testout: ['training_hvac', 'jr_hvac_fse_test_human'],
    pkg_training_generator_testout: ['training_generator', 'jr_gen_fse_test_human'],
    pkg_training_datacenter_testout: ['training_datacenter', 'jr_dc_cft_test_human'],
    pkg_training_solar_testout: ['training_solar', 'jr_solar_fse_test_human'],
    pkg_training_evcharging_testout: ['training_evcharging', 'jr_ev_tech_test_human'],
    pkg_training_dcplants_testout: ['training_dcplants', 'jr_dcp_tech_test_human'],
    pkg_training_battery_testout: ['training_battery', 'jr_battery_tech_test_human'],
    pkg_training_dcengineer_testout: ['training_dcengineer', 'jr_dc_engineer_test_human'],
    pkg_training_marine_testout: ['training_marine', 'jr_marine_tech_test_human'],
    pkg_training_pool_testout: ['training_pool', 'jr_pool_tech_test_human'],
    pkg_training_hvac_tech_testout: ['training_hvac_tech', 'jr_hvac_tech_test_human'],
    pkg_training_solar_inst_testout: ['training_solar_inst', 'jr_solar_inst_test_human'],
    pkg_training_wind_tech_testout: ['training_wind_tech', 'jr_wind_tech_test_human'],
    pkg_training_elevator_tech_testout: ['training_elevator_tech', 'jr_elevator_tech_test_human'],
    pkg_training_fire_alarm_tech_testout: ['training_fire_alarm_tech', 'jr_fire_alarm_tech_test_human'],
    pkg_training_bmet_tech_testout: ['training_bmet_tech', 'jr_bmet_tech_test_human'],
    pkg_training_bas_tech_testout: ['training_bas_tech', 'jr_bas_tech_test_human'],
    pkg_training_ref_tech_testout: ['training_ref_tech', 'jr_ref_tech_test_human'],
    pkg_training_plc_tech_testout: ['training_plc_tech', 'jr_plc_tech_test_human'],
    pkg_training_security_tech_testout: ['training_security_tech', 'jr_security_tech_test_human'],
    pkg_training_field_pm_testout: ['training_field_pm', 'jr_field_pm_test_human'],
    pkg_training_pump_tech_testout: ['training_pump_tech', 'jr_pump_tech_test_human'],
    pkg_training_telecom_testout: ['training_telecom', 'jr_telecom_tech_test_human'],
    pkg_training_industrial_ref_testout: ['training_industrial_ref', 'jr_industrial_ref_test_human'],
    pkg_training_dc_ops_testout: ['training_dc_ops', 'jr_dc_ops_test_human'],
    pkg_training_building_cx_testout: ['training_building_cx', 'jr_building_cx_test_human'],
  };

  it.each(Object.entries(packages))('%s costs less than its training + test-out parts combined', (pkgId, [trainingId, testOutId]) => {
    const pkg = STRIPE_PRODUCTS[pkgId as keyof typeof STRIPE_PRODUCTS];
    const training = STRIPE_PRODUCTS[trainingId];
    const testOut = STRIPE_PRODUCTS[testOutId];
    const sum = training.priceInCents + testOut.priceInCents;

    expect(pkg.priceInCents, `${pkgId} ($${pkg.priceInCents / 100}) should be cheaper than ${trainingId} + ${testOutId} ($${sum / 100})`).toBeLessThan(sum);
  });

  it('every pkg_* product in the catalog is covered by the mapping above', () => {
    const pkgIds = entries.map(([id]) => id).filter((id) => id.startsWith('pkg_'));
    for (const id of pkgIds) {
      expect(Object.keys(packages), `${id} is a package but has no training+test-out mapping in this test — add one`).toContain(id);
    }
  });
});
