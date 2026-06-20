import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const idToken = authHeader?.split('Bearer ')[1];
  if (!idToken) return NextResponse.json({ isAdmin: false });

  try {
    const decoded = await adminAuth.verifyIdToken(idToken).catch(() => null);
    if (!decoded?.email) return NextResponse.json({ isAdmin: false });

    const admins = (process.env.ADMIN_EMAILS ?? '')
      .split(',')
      .map((e) => e.trim().toLowerCase());

    return NextResponse.json({ isAdmin: admins.includes(decoded.email.toLowerCase()) });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
