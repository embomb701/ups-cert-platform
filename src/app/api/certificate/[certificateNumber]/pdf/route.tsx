import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { renderToBuffer, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { formatDate } from '@/lib/utils/formatters';
import type { Certificate } from '@/types';

export const dynamic = 'force-dynamic';
// @react-pdf/renderer does real work at render time (layout, font metrics) —
// needs the Node.js runtime, not edge.
export const runtime = 'nodejs';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

// Same examLevel -> display label mapping as the HTML certificate page
// (src/app/certificate/[certificateNumber]/page.tsx) — kept in sync
// manually since neither file can cleanly import from the other (one is a
// server component, this is a Node PDF renderer with different output).
const LEVEL_LABELS: Record<string, string> = {
  jr_fse: 'Junior Field Service Engineer',
  jr_kitchen_fse: 'Junior Commercial Kitchen Field Service Engineer',
  jr_hvac_fse: 'Junior HVAC Field Service Engineer',
  jr_gen_fse: 'Junior Power Generation Field Service Engineer',
  jr_dc_cft: 'Junior Data Center Critical Facilities Technician',
  jr_solar_fse: 'Junior Solar & Storage Field Service Engineer',
  jr_ev_tech: 'Junior EV Charging Infrastructure Technician',
  jr_dcp_tech: 'Junior Telecom DC Power Plants Technician',
  jr_battery_tech: 'Junior Battery Systems Technician',
  jr_dc_engineer: 'Junior Data Center Engineer',
  jr_marine_tech: 'Junior Marine Systems Technician',
  jr_pool_tech: 'Junior Pool Equipment Technician',
  jr_hvac_tech: 'Junior HVAC Technician',
  jr_solar_inst: 'Junior Solar Installer',
  jr_wind_tech: 'Junior Wind Turbine Technician',
  jr_elevator_tech: 'Junior Elevator Technician',
  jr_fire_alarm_tech: 'Junior Fire Alarm Technician',
  jr_bmet_tech: 'Junior Biomedical Equipment Technician',
  jr_bas_tech: 'Junior Building Automation Systems Technician',
  jr_ref_tech: 'Junior Commercial Refrigeration Technician',
  jr_plc_tech: 'Junior Industrial Controls & PLC Technician',
  jr_security_tech: 'Junior Electronic Security Systems Technician',
  jr_field_pm: 'Junior Field Project Manager',
  jr_pump_tech: 'Junior Pump Technician',
  jr_industrial_ref: 'Junior Industrial Refrigeration Operator',
  jr_dc_ops: 'Junior Data Center Operations Manager',
  jr_building_cx: 'Junior Building Commissioning Agent',
  jr_telecom_tech: 'Junior Telecom OSP Technician',
  jr_switchgear_tech: 'Junior Switchgear & Substation Technician',
};

// Helvetica is one of the 14 standard PDF fonts @react-pdf/renderer ships
// built in — no Font.register() call or network font fetch needed at
// render time, which matters inside a serverless function's cold-start
// budget.
const styles = StyleSheet.create({
  page: {
    padding: 48,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  card: {
    // @react-pdf/renderer only supports solid/dashed/dotted border styles
    // (no "double" as the HTML certificate page uses) — a thicker solid
    // border is the closest clean equivalent.
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: '#1e3a5f',
    padding: 48,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  issuer: {
    fontSize: 10,
    letterSpacing: 3,
    color: '#666666',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a5f',
    marginBottom: 4,
  },
  subLabel: {
    fontSize: 11,
    color: '#555555',
    marginBottom: 28,
  },
  name: {
    fontSize: 30,
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
    marginBottom: 8,
  },
  divider: {
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 24,
  },
  achievementLabel: {
    fontSize: 11,
    color: '#555555',
    marginBottom: 4,
  },
  certTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
    marginBottom: 4,
    textAlign: 'center',
  },
  levelLabel: {
    fontSize: 11,
    color: '#555555',
    marginBottom: 28,
  },
  seal: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#1e3a5f',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  sealText: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a5f',
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginBottom: 24,
  },
  metaLabel: {
    fontSize: 8,
    color: '#888888',
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  metaValue: {
    fontSize: 10,
    color: '#222222',
  },
  footer: {
    fontSize: 8,
    color: '#999999',
    marginTop: 8,
  },
});

async function getCertificate(certNumber: string): Promise<Certificate | null> {
  const snap = await adminDb
    .collection('certificates')
    .where('certificateNumber', '==', certNumber)
    .limit(1)
    .get();
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as Certificate;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ certificateNumber: string }> }) {
  const { certificateNumber } = await params;
  const cert = await getCertificate(certificateNumber);

  if (!cert || cert.status === 'revoked') {
    return NextResponse.json({ error: cert ? 'Certificate has been revoked' : 'Certificate not found' }, { status: 404 });
  }

  const issueDate =
    cert.issuedAt instanceof Date
      ? cert.issuedAt
      : ((cert.issuedAt as unknown as { toDate?: () => Date })?.toDate?.() ?? new Date());

  const levelLabel = LEVEL_LABELS[cert.examLevel] ?? 'Field Service Engineer';

  const doc = (
    <Document title={`${cert.certificationTitle} — ${cert.candidateName}`}>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.card}>
          <Text style={styles.issuer}>Mastering Field Service Training Portal</Text>
          <Text style={styles.title}>Certificate of Achievement</Text>
          <Text style={styles.subLabel}>This is to certify that</Text>

          <Text style={styles.name}>{cert.candidateName || 'Candidate'}</Text>
          <View style={styles.divider} />

          <Text style={styles.achievementLabel}>has successfully demonstrated knowledge in</Text>
          <Text style={styles.certTitle}>{cert.certificationTitle}</Text>
          <Text style={styles.levelLabel}>{levelLabel}</Text>

          <View style={styles.seal}>
            <Text style={styles.sealText}>CERTIFIED{'\n'}{issueDate.getFullYear()}</Text>
          </View>

          <View style={styles.metaRow}>
            <View>
              <Text style={styles.metaLabel}>Date Issued</Text>
              <Text style={styles.metaValue}>{formatDate(issueDate)}</Text>
            </View>
            {cert.publicScoreEnabled && (
              <View>
                <Text style={styles.metaLabel}>Score</Text>
                <Text style={styles.metaValue}>{Math.round(cert.score)}%</Text>
              </View>
            )}
            <View>
              <Text style={styles.metaLabel}>Certificate No.</Text>
              <Text style={styles.metaValue}>{cert.certificateNumber}</Text>
            </View>
          </View>

          <Text style={styles.footer}>
            Verify at: {SITE_URL.replace(/^https?:\/\//, '')}/verify/{cert.certificateNumber}
          </Text>
        </View>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);

  return new NextResponse(buffer as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="certificate-${cert.certificateNumber}.pdf"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
