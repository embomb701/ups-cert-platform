import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const snap = await adminDb.collection('settings').doc('practiceTest').get();
    if (!snap.exists) {
      return NextResponse.json({ free: false, price: 1499 });
    }
    const data = snap.data()!;
    return NextResponse.json({
      free: data.free === true,
      freeNote: data.freeNote ?? null,
      price: 1499,
    });
  } catch {
    return NextResponse.json({ free: false, price: 1499 });
  }
}
