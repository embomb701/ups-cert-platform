import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

const SEED_SECRET = process.env.SEED_SECRET ?? '';

const QUESTIONS = [
  {
    "id": "jr_fse_ups_001","examLevel": "jr_fse","category": "UPS Purpose","subcategory": "Critical Load Protection","difficulty": "easy",
    "questionText": "What is the primary purpose of an Uninterruptible Power Supply (UPS) in a critical facility?",
    "choices": [{"id": "A","text": "To reduce electricity costs by storing power during off-peak hours"},{"id": "B","text": "To provide continuous power to critical loads during utility power interruptions"},{"id": "C","text": "To convert DC power from solar panels to AC power for building use"},{"id": "D","text": "To regulate voltage only, without providing backup power"}],
    "correctAnswerId": "B","explanation": "A UPS provides continuous power to critical loads during a utility power interruption.","referenceBookSection": "Chapter 1 — UPS Purpose and Critical Load Protection","safetyCritical": false,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 60,"tags": ["ups-purpose","critical-load","fundamentals"]
  },
  {
    "id": "jr_fse_meter_001","examLevel": "jr_fse","category": "Meter Usage","subcategory": "Voltage Measurement","difficulty": "medium",
    "questionText": "When checking voltage across a closed, properly conducting contact, what reading would you typically expect?",
    "choices": [{"id": "A","text": "Near zero volts"},{"id": "B","text": "Full source voltage"},{"id": "C","text": "Infinite resistance"},{"id": "D","text": "Battery float voltage"}],
    "correctAnswerId": "A","explanation": "A properly closed, conducting contact passes current with very little voltage drop across it.","referenceBookSection": "Meter Usage / Troubleshooting Basics","safetyCritical": true,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 90,"tags": ["meter","voltage","contacts","field-service"]
  },
  {
    "id": "jr_fse_meter_002","examLevel": "jr_fse","category": "Meter Usage","subcategory": "Ohms Measurement","difficulty": "medium",
    "questionText": "A technician wants to check continuity (resistance) on a circuit inside a UPS. Before performing an ohms measurement, what must be confirmed first?",
    "choices": [{"id": "A","text": "The load is energized and drawing current"},{"id": "B","text": "The circuit is de-energized and any stored energy has dissipated"},{"id": "C","text": "The meter is set to AC voltage mode"},{"id": "D","text": "A backup technician is available on the phone"}],
    "correctAnswerId": "B","explanation": "Ohms measurements must be performed on de-energized circuits.","referenceBookSection": "Meter Usage — Safe Measurement Concepts","safetyCritical": true,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 90,"tags": ["meter","ohms","safety","de-energized","LOTO"]
  },
  {
    "id": "jr_fse_battery_001","examLevel": "jr_fse","category": "Battery Systems","subcategory": "Battery String Basics","difficulty": "easy",
    "questionText": "In a typical UPS battery string, individual batteries are connected in series primarily to:",
    "choices": [{"id": "A","text": "Increase total amp-hour capacity"},{"id": "B","text": "Achieve the required DC bus voltage"},{"id": "C","text": "Reduce the charging current required"},{"id": "D","text": "Allow individual battery bypass during discharge"}],
    "correctAnswerId": "B","explanation": "Connecting batteries in series adds their voltages together, allowing the string to reach the DC bus voltage required by the UPS.","referenceBookSection": "Battery Systems — Strings and Configuration","safetyCritical": false,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 75,"tags": ["battery","series","DC-bus","voltage"]
  },
  {
    "id": "jr_fse_battery_002","examLevel": "jr_fse","category": "Battery Systems","subcategory": "Battery Safety","difficulty": "medium",
    "questionText": "Lead-acid batteries used in UPS systems can produce hydrogen gas during charging. What is the primary hazard this creates?",
    "choices": [{"id": "A","text": "Hydrogen gas reduces battery capacity over time"},{"id": "B","text": "Hydrogen gas is flammable and can ignite if ignition sources are present"},{"id": "C","text": "Hydrogen gas corrodes the battery terminals"},{"id": "D","text": "Hydrogen gas causes the electrolyte to overflow"}],
    "correctAnswerId": "B","explanation": "Hydrogen gas produced during charging is flammable and can create an explosion hazard.","referenceBookSection": "Battery Systems — Safety Awareness","safetyCritical": true,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 75,"tags": ["battery","hydrogen","safety","ventilation"]
  },
  {
    "id": "jr_fse_electrical_001","examLevel": "jr_fse","category": "Electrical Fundamentals","subcategory": "Voltage, Current, Resistance","difficulty": "easy",
    "questionText": "According to Ohm's Law, if the voltage across a resistor doubles while the resistance stays the same, what happens to the current?",
    "choices": [{"id": "A","text": "The current stays the same"},{"id": "B","text": "The current doubles"},{"id": "C","text": "The current is reduced by half"},{"id": "D","text": "The current drops to zero"}],
    "correctAnswerId": "B","explanation": "Ohm's Law states I = V / R. If voltage doubles and resistance remains constant, current doubles proportionally.","referenceBookSection": "AC/DC Electrical Fundamentals — Ohm's Law","safetyCritical": false,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 60,"tags": ["ohms-law","voltage","current","resistance","fundamentals"]
  },
  {
    "id": "jr_fse_ac_dc_001","examLevel": "jr_fse","category": "Electrical Fundamentals","subcategory": "AC vs DC","difficulty": "easy",
    "questionText": "Which of the following best describes the difference between AC and DC voltage?",
    "choices": [{"id": "A","text": "AC voltage is always higher than DC voltage"},{"id": "B","text": "DC voltage has a constant polarity, while AC voltage reverses polarity periodically"},{"id": "C","text": "DC voltage is used only in batteries; AC voltage can be used anywhere"},{"id": "D","text": "AC voltage is safer to work with than DC voltage"}],
    "correctAnswerId": "B","explanation": "DC voltage maintains a constant polarity. AC voltage reverses polarity at a regular frequency (60 Hz in North America).","referenceBookSection": "AC/DC Electrical Fundamentals","safetyCritical": false,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 60,"tags": ["AC","DC","fundamentals","polarity"]
  },
  {
    "id": "jr_fse_rectifier_001","examLevel": "jr_fse","category": "UPS Components","subcategory": "Rectifier Basics","difficulty": "medium",
    "questionText": "What is the primary function of the rectifier section in a double-conversion UPS?",
    "choices": [{"id": "A","text": "To convert DC battery power to AC output for the critical load"},{"id": "B","text": "To convert AC utility input to DC for the inverter and battery charging"},{"id": "C","text": "To transfer the critical load to the bypass source during a fault"},{"id": "D","text": "To regulate the output frequency to exactly 60 Hz"}],
    "correctAnswerId": "B","explanation": "In a double-conversion UPS, the rectifier converts AC input power to DC. This DC feeds both the inverter and the battery charger.","referenceBookSection": "Rectifiers — Function and Role in Double-Conversion UPS","safetyCritical": false,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 75,"tags": ["rectifier","double-conversion","UPS","AC-DC"]
  },
  {
    "id": "jr_fse_inverter_001","examLevel": "jr_fse","category": "UPS Components","subcategory": "Inverter Basics","difficulty": "medium",
    "questionText": "In a double-conversion UPS, the inverter is normally:",
    "choices": [{"id": "A","text": "Bypassed by the static switch and only used during battery discharge"},{"id": "B","text": "Continuously producing AC output power from the DC bus"},{"id": "C","text": "Only active when the utility input voltage is out of tolerance"},{"id": "D","text": "A backup device that replaces the rectifier when input power fails"}],
    "correctAnswerId": "B","explanation": "In a double-conversion (online) UPS, the inverter is always active and continuously produces the AC output voltage.","referenceBookSection": "Inverters — Continuous Operation in Double-Conversion UPS","safetyCritical": false,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 75,"tags": ["inverter","double-conversion","UPS","output"]
  },
  {
    "id": "jr_fse_bypass_001","examLevel": "jr_fse","category": "UPS Components","subcategory": "Static Bypass","difficulty": "medium",
    "questionText": "When a UPS transfers the critical load to static bypass, where does the load now receive its power?",
    "choices": [{"id": "A","text": "From the battery string through the inverter"},{"id": "B","text": "Directly from the utility or bypass source, bypassing the inverter"},{"id": "C","text": "From a secondary UPS connected in parallel"},{"id": "D","text": "From the rectifier output only, without inverter conditioning"}],
    "correctAnswerId": "B","explanation": "When the UPS transfers to static bypass, the critical load is connected directly to the bypass input source.","referenceBookSection": "Static Bypass — Transfer and Source Requirements","safetyCritical": true,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 90,"tags": ["bypass","static-bypass","transfer","critical-load"]
  },
  {
    "id": "jr_fse_maint_bypass_001","examLevel": "jr_fse","category": "UPS Components","subcategory": "Maintenance Bypass","difficulty": "medium",
    "questionText": "The maintenance bypass switch allows a technician to:",
    "choices": [{"id": "A","text": "Continue operating the UPS inverter while replacing the battery string"},{"id": "B","text": "Connect the critical load to a raw utility path while the UPS is isolated for service"},{"id": "C","text": "Bypass the battery string and run the UPS without battery backup"},{"id": "D","text": "Transfer the UPS to a parallel redundant unit automatically"}],
    "correctAnswerId": "B","explanation": "The maintenance bypass provides a path to connect the critical load directly to the utility while the entire UPS is isolated from the load.","referenceBookSection": "Maintenance Bypass — Purpose and Transfer Sequence","safetyCritical": true,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 90,"tags": ["maintenance-bypass","isolation","transfer","critical-load"]
  },
  {
    "id": "jr_fse_loto_001","examLevel": "jr_fse","category": "Safety","subcategory": "LOTO Awareness","difficulty": "medium",
    "questionText": "Lockout/Tagout (LOTO) procedures are required when:",
    "choices": [{"id": "A","text": "Replacing a failed external cooling fan only — no electrical energy involved"},{"id": "B","text": "Servicing equipment where unexpected energization or release of stored energy could cause injury"},{"id": "C","text": "Checking external indicator lights on an energized UPS panel"},{"id": "D","text": "Performing visual inspections of battery string labels and rack labeling"}],
    "correctAnswerId": "B","explanation": "LOTO procedures are required when servicing or maintaining equipment where the unexpected energization, startup, or release of stored energy could cause injury.","referenceBookSection": "Safety Concepts — LOTO and Stored Energy","safetyCritical": true,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 90,"tags": ["LOTO","safety","stored-energy","OSHA"]
  },
  {
    "id": "jr_fse_escalation_001","examLevel": "jr_fse","category": "Field Judgment","subcategory": "Escalation","difficulty": "medium",
    "questionText": "A technician encounters a fault condition on a UPS that is outside the scope of their training or authorization. The correct action is to:",
    "choices": [{"id": "A","text": "Attempt to diagnose the fault using trial and error to avoid downtime"},{"id": "B","text": "Escalate to a more qualified technician, supervisor, or the OEM support line"},{"id": "C","text": "Transfer the load to maintenance bypass and leave the system for the next shift"},{"id": "D","text": "Acknowledge the fault on the UPS panel and continue monitoring"}],
    "correctAnswerId": "B","explanation": "When a fault condition is outside a technician's training or authorization, the correct action is to escalate.","referenceBookSection": "Field Judgment — Escalation and Critical Load Protection","safetyCritical": true,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 90,"tags": ["escalation","field-judgment","critical-load","safety"]
  },
  {
    "id": "jr_fse_alarm_001","examLevel": "jr_fse","category": "Alarm Recognition","subcategory": "Basic UPS Alarms","difficulty": "medium",
    "questionText": "A UPS displays a 'Battery Discharged' or 'Low Battery' alarm while utility power is present. This most likely indicates:",
    "choices": [{"id": "A","text": "The bypass source is out of tolerance"},{"id": "B","text": "The battery string is depleted and needs charging or replacement review"},{"id": "C","text": "The inverter has failed and is running from battery"},{"id": "D","text": "The UPS input circuit breaker has tripped"}],
    "correctAnswerId": "B","explanation": "A 'Low Battery' alarm while utility power is present indicates the battery string has reached a low state of charge.","referenceBookSection": "Alarms — Reading and Interpreting UPS Alarms","safetyCritical": true,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 90,"tags": ["alarm","battery","low-battery","UPS"]
  },
  {
    "id": "jr_fse_sts_001","examLevel": "jr_fse","category": "STS Systems","subcategory": "STS Basics","difficulty": "medium",
    "questionText": "A Static Transfer Switch (STS) is primarily used to:",
    "choices": [{"id": "A","text": "Convert AC power to DC power for battery charging"},{"id": "B","text": "Automatically transfer a critical load between two independent power sources with minimal interruption"},{"id": "C","text": "Provide voltage regulation only, without switching capability"},{"id": "D","text": "Replace the UPS inverter when the inverter fails"}],
    "correctAnswerId": "B","explanation": "An STS monitors two independent power sources and can transfer the critical load from a preferred source to an alternate source with minimal interruption.","referenceBookSection": "STS Systems — Purpose and Basic Operation","safetyCritical": false,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 90,"tags": ["STS","static-transfer-switch","redundancy","transfer"]
  },
  {
    "id": "jr_fse_docs_001","examLevel": "jr_fse","category": "Field Documentation","subcategory": "Service Reporting","difficulty": "easy",
    "questionText": "Why is accurate field documentation important after completing UPS service work?",
    "choices": [{"id": "A","text": "It is only required when the customer requests a written report"},{"id": "B","text": "It creates a record of work performed, conditions found, and actions taken — supporting safety, accountability, and future service"},{"id": "C","text": "It is primarily for billing purposes and has no technical value"},{"id": "D","text": "It is only necessary for major repairs, not for routine inspections"}],
    "correctAnswerId": "B","explanation": "Accurate documentation records what was found, what was done, and what remains, supporting future technicians and compliance.","referenceBookSection": "Field Documentation and Service Reporting","safetyCritical": false,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 75,"tags": ["documentation","service-report","field-service"]
  },
  {
    "id": "jr_fse_amp_clamp_001","examLevel": "jr_fse","category": "Meter Usage","subcategory": "Amp Clamp Basics","difficulty": "medium",
    "questionText": "An amp clamp (clamp meter) measures current by:",
    "choices": [{"id": "A","text": "Being connected in series with the circuit, interrupting current flow through the meter"},{"id": "B","text": "Sensing the magnetic field produced by current flow through a conductor without breaking the circuit"},{"id": "C","text": "Measuring voltage drop across a known internal shunt resistor"},{"id": "D","text": "Clamping across both the hot and neutral conductors simultaneously"}],
    "correctAnswerId": "B","explanation": "An amp clamp senses the magnetic field generated by current flowing through a conductor. No circuit interruption is needed.","referenceBookSection": "Meter Usage — Amp Clamp and Current Measurement","safetyCritical": true,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 90,"tags": ["amp-clamp","current","measurement","meter"]
  },
  {
    "id": "jr_fse_pdu_001","examLevel": "jr_fse","category": "Power Distribution","subcategory": "PDU and RPP Basics","difficulty": "easy",
    "questionText": "A Power Distribution Unit (PDU) in a data center primarily serves to:",
    "choices": [{"id": "A","text": "Convert high-voltage utility power to battery DC voltage"},{"id": "B","text": "Distribute power from a UPS or other upstream source to multiple downstream loads"},{"id": "C","text": "Provide battery backup for individual server racks"},{"id": "D","text": "Monitor network traffic and power usage simultaneously"}],
    "correctAnswerId": "B","explanation": "A PDU takes power from an upstream source and distributes it to multiple downstream loads through circuit breakers.","referenceBookSection": "PDU / RPP — Distribution Basics","safetyCritical": false,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 60,"tags": ["PDU","RPP","distribution","data-center"]
  },
  {
    "id": "jr_fse_ppe_001","examLevel": "jr_fse","category": "Safety","subcategory": "PPE Awareness","difficulty": "medium",
    "questionText": "Before performing voltage measurements on an energized UPS panel, a technician must verify that their meter and test leads are:",
    "choices": [{"id": "A","text": "Rated for the voltages and categories present in the circuit being tested"},{"id": "B","text": "The most recently purchased model available"},{"id": "C","text": "Approved by the UPS manufacturer for use with that model"},{"id": "D","text": "Pre-tested by another technician earlier that day"}],
    "correctAnswerId": "A","explanation": "Meters and test leads must be rated for the voltages and installation category (CAT II, CAT III, CAT IV) of the circuit being measured.","referenceBookSection": "Meter Usage — Safe Measurement Concepts","safetyCritical": true,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 90,"tags": ["PPE","meter","CAT-rating","safety"]
  },
  {
    "id": "jr_fse_troubleshoot_001","examLevel": "jr_fse","category": "Troubleshooting","subcategory": "Basic Troubleshooting Sequence","difficulty": "medium",
    "questionText": "A UPS that has recently alarmed and transferred to bypass is still on bypass when you arrive. Before any other action, what is the first priority?",
    "choices": [{"id": "A","text": "Immediately attempt to return the UPS to normal operation to reduce bypass exposure"},{"id": "B","text": "Identify and understand the current system state, the critical load status, and the alarms present before taking any action"},{"id": "C","text": "Call the OEM technical support line and begin a parts order"},{"id": "D","text": "Turn the UPS off and back on to clear the fault"}],
    "correctAnswerId": "B","explanation": "In field service, the first action is always to understand the current state before taking action.","referenceBookSection": "Troubleshooting Logic — Field Reasoning and Safe Sequence","safetyCritical": true,"reviewRequired": false,"active": true,"estimatedTimeSeconds": 90,"tags": ["troubleshooting","field-judgment","critical-load","bypass"]
  }
];

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!SEED_SECRET || secret !== SEED_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const clearUid = req.nextUrl.searchParams.get('clearUid');

  try {
    // Seed questions
    const batch = adminDb.batch();
    for (const q of QUESTIONS) {
      const ref = adminDb.collection('questionBank').doc(q.id);
      batch.set(ref, { ...q, updatedAt: FieldValue.serverTimestamp() });
    }
    await batch.commit();

    // Optionally clear cooldown for a specific user
    let cleared = 0;
    if (clearUid) {
      const attSnap = await adminDb.collection('examAttempts').where('userId', '==', clearUid).get();
      const ipSnap = await adminDb.collection('ipExamLocks').where('userId', '==', clearUid).get();
      const b2 = adminDb.batch();
      attSnap.docs.forEach((d) => b2.delete(d.ref));
      ipSnap.docs.forEach((d) => b2.delete(d.ref));
      await b2.commit();
      cleared = attSnap.size + ipSnap.size;
    }

    return NextResponse.json({ success: true, count: QUESTIONS.length, cleared });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
