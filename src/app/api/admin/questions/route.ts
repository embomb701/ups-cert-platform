import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

function isAdmin(email: string): boolean {
  const admins = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());
  return admins.includes(email.toLowerCase());
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    if (!decoded.email || !isAdmin(decoded.email)) {
      return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 });
    }

    const collection = adminDb.collection('questionBank');

    const [jrSnap, jrActiveSnap, fseSnap, fseActiveSnap] = await Promise.all([
      collection.where('examLevel', '==', 'jr_fse').count().get(),
      collection.where('examLevel', '==', 'jr_fse').where('active', '==', true).count().get(),
      collection.where('examLevel', 'in', ['fse', 'fse_ai']).count().get(),
      collection.where('examLevel', 'in', ['fse', 'fse_ai']).where('active', '==', true).count().get(),
    ]);

    return NextResponse.json({
      jr_fse: {
        total: jrSnap.data().count,
        active: jrActiveSnap.data().count,
      },
      fse: {
        total: fseSnap.data().count,
        active: fseActiveSnap.data().count,
      },
    });
  } catch (err: any) {
    console.error('Question count error:', err);
    return NextResponse.json({ error: err.message ?? 'Failed' }, { status: 500 });
  }
}
