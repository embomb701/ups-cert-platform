import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { SITE_URL } from '@/lib/utils/badges';

export const dynamic = 'force-dynamic';

// Open Badges 2.0 Assertion for one issued certificate — "hosted"
// verification per spec: the assertion being reachable at this
// stable, issuer-controlled URL is itself the verification, no
// baking or cryptographic signature required. Public by design, same
// exposure level as the existing /verify/[certificateNumber] page.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ certificateNumber: string }> }) {
  const { certificateNumber } = await params;

  const snap = await adminDb
    .collection('certificates')
    .where('certificateNumber', '==', certificateNumber)
    .limit(1)
    .get();

  if (snap.empty) {
    return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
  }

  const cert = snap.docs[0].data();
  const issuedAt = cert.issuedAt?.toDate?.() as Date | undefined;

  return NextResponse.json({
    '@context': 'https://w3id.org/openbadges/v2',
    id: `${SITE_URL}/api/badges/assertion/${certificateNumber}`,
    type: 'Assertion',
    recipient: {
      type: 'email',
      hashed: false,
      identity: cert.candidateName as string, // name-based; no PII email exposed publicly
    },
    badge: `${SITE_URL}/api/badges/class/${cert.examLevel}`,
    verification: { type: 'hosted' },
    issuedOn: issuedAt ? issuedAt.toISOString() : undefined,
    evidence: `${SITE_URL}/verify/${certificateNumber}`,
    revoked: cert.status === 'revoked' || undefined,
    revocationReason: cert.status === 'revoked' ? 'Certificate revoked by issuer' : undefined,
  }, {
    headers: { 'Content-Type': 'application/ld+json' },
  });
}
