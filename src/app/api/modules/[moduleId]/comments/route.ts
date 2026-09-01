import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { getModule } from '@/data/index';
import { checkRateLimit } from '@/lib/utils/rateLimit';
import { FieldValue } from 'firebase-admin/firestore';

export const dynamic = 'force-dynamic';

const MAX_COMMENT_LENGTH = 1000;
const PAGE_SIZE = 50;

// Per-module Q&A thread. Reads are public (a thread of real trade
// questions is content, not just app state); writes go through this
// route only — client SDK has no direct write access (see
// firestore.rules: moduleComments write: if isAdmin()).

export async function GET(_req: NextRequest, { params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  if (!getModule(moduleId)) {
    return NextResponse.json({ error: 'Module not found' }, { status: 404 });
  }

  try {
    const snap = await adminDb
      .collection('moduleComments')
      .where('moduleId', '==', moduleId)
      .orderBy('createdAt', 'desc')
      .limit(PAGE_SIZE)
      .get();

    const comments = snap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        text: d.text as string,
        displayName: d.displayName as string,
        uid: d.uid as string,
        createdAt: d.createdAt?.toDate?.()?.toISOString() ?? null,
      };
    }).reverse(); // oldest first for a natural thread read order

    return NextResponse.json({ comments });
  } catch (err) {
    console.error('Module comments query failed:', err);
    return NextResponse.json({ comments: [] }, { status: 200 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  const mod = getModule(moduleId);
  if (!mod) {
    return NextResponse.json({ error: 'Module not found' }, { status: 404 });
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let uid: string;
  let email: string;
  let displayName: string;
  try {
    const decoded = await adminAuth.verifyIdToken(authHeader.split('Bearer ')[1]);
    uid = decoded.uid;
    email = decoded.email ?? '';
    displayName = decoded.name || email.split('@')[0] || 'Student';
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  // Rate limit: 10 comments per hour per user — enough for real
  // participation, not enough to spam a thread.
  const rl = await checkRateLimit(uid, 'moduleComment', 10, 60 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Too many comments posted. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } },
    );
  }

  const body = await req.json().catch(() => ({})) as { text?: string };
  const text = (body.text ?? '').trim();

  if (!text) {
    return NextResponse.json({ error: 'Comment cannot be empty' }, { status: 400 });
  }
  if (text.length > MAX_COMMENT_LENGTH) {
    return NextResponse.json({ error: `Comment must be ${MAX_COMMENT_LENGTH} characters or fewer` }, { status: 400 });
  }

  const docRef = await adminDb.collection('moduleComments').add({
    moduleId,
    uid,
    displayName,
    text,
    createdAt: FieldValue.serverTimestamp(),
  });

  return NextResponse.json({
    comment: { id: docRef.id, text, displayName, uid, createdAt: new Date().toISOString() },
  });
}
