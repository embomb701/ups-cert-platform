import { NextResponse } from 'next/server';
import { SITE_URL, BADGE_ISSUER_ID } from '@/lib/utils/badges';

export const dynamic = 'force-static';

// Open Badges 2.0 Issuer / Profile object. Referenced by every
// BadgeClass and Assertion this platform issues.
export async function GET() {
  return NextResponse.json({
    '@context': 'https://w3id.org/openbadges/v2',
    id: BADGE_ISSUER_ID,
    type: 'Issuer',
    name: 'Mastering Field Service Training Portal',
    url: SITE_URL,
    email: 'careers@aiellorecruiter.com',
    description: 'Field service career training and certification across 28+ technical trades.',
  }, {
    headers: { 'Content-Type': 'application/ld+json' },
  });
}
