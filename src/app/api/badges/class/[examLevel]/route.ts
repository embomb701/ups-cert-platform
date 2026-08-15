import { NextRequest, NextResponse } from 'next/server';
import { SITE_URL, BADGE_ISSUER_ID, badgeTitleForExamLevel } from '@/lib/utils/badges';

export const dynamic = 'force-dynamic';

// Open Badges 2.0 BadgeClass — one per certification level. Referenced
// by every Assertion issued at that level.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ examLevel: string }> }) {
  const { examLevel } = await params;
  const title = badgeTitleForExamLevel(examLevel);

  if (title === examLevel) {
    // No known course or standalone title maps to this level
    return NextResponse.json({ error: 'Unknown badge class' }, { status: 404 });
  }

  return NextResponse.json({
    '@context': 'https://w3id.org/openbadges/v2',
    id: `${SITE_URL}/api/badges/class/${examLevel}`,
    type: 'BadgeClass',
    name: title,
    description: `Awarded for passing the ${title} certification exam through Mastering Field Service Training Portal — a proctored, criterion-referenced assessment of field-ready technical knowledge.`,
    image: `${SITE_URL}/api/badges/image/${examLevel}`,
    criteria: { narrative: `Recipients demonstrated competency by passing the ${title} certification exam with the required passing score, after completing the associated training curriculum or an approved test-out assessment.` },
    issuer: BADGE_ISSUER_ID,
    tags: ['field-service', 'skilled-trades', 'technical-certification'],
  }, {
    headers: { 'Content-Type': 'application/ld+json' },
  });
}
