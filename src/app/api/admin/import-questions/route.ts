import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

function isAdmin(email: string): boolean {
  const admins = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim().toLowerCase());
  return admins.includes(email.toLowerCase());
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    if (!decoded.email || !isAdmin(decoded.email)) {
      return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 });
    }

    const body = await req.json();
    const { questions, overwrite = false } = body as { questions: Record<string, unknown>[]; overwrite?: boolean };

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: 'questions must be a non-empty array' }, { status: 400 });
    }

    const BATCH_SIZE = 400;
    const collection = adminDb.collection('questionBank');
    let created = 0;
    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (let i = 0; i < questions.length; i += BATCH_SIZE) {
      const chunk = questions.slice(i, i + BATCH_SIZE);
      const batch = adminDb.batch();

      for (const q of chunk) {
        const id = q.id as string;
        if (!id) { errors++; continue; }

        try {
          const docRef = collection.doc(id);
          const snap = await docRef.get();

          if (snap.exists && !overwrite) {
            skipped++;
            continue;
          }

          batch.set(
            docRef,
            {
              ...q,
              createdAt: snap.exists ? snap.data()?.createdAt : FieldValue.serverTimestamp(),
              updatedAt: FieldValue.serverTimestamp(),
            },
            { merge: overwrite }
          );

          if (snap.exists) updated++;
          else created++;
        } catch {
          errors++;
        }
      }

      await batch.commit();
    }

    await adminDb.collection('auditLogs').add({
      userId: decoded.uid,
      eventType: 'questions_imported',
      eventDetails: { count: questions.length, created, updated, skipped, errors },
      createdAt: FieldValue.serverTimestamp(),
      severity: 'info',
    });

    return NextResponse.json({ ok: true, created, updated, skipped, errors });
  } catch (err: any) {
    console.error('Import questions error:', err);
    return NextResponse.json({ error: err.message ?? 'Import failed' }, { status: 500 });
  }
}
