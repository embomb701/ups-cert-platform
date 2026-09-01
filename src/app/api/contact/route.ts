import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { Resend } from 'resend';
import { createHash } from 'crypto';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const ADMIN_EMAILS = [
  'faiello@gmail.com',
  'careers@aiellorecruiter.com',
  'aiellochori@gmail.com',
];

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json() as { name: string; email: string; message: string };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (name.trim().length > 200) {
      return NextResponse.json({ error: 'Name is too long.' }, { status: 400 });
    }

    if (message.trim().length > 5000) {
      return NextResponse.json({ error: 'Message is too long (max 5000 characters).' }, { status: 400 });
    }

    // Simple IP-based rate limit: 3 submissions per hour per IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const ipKey = createHash('sha256').update(ip + (process.env.IP_HASH_SECRET ?? '')).digest('hex').slice(0, 16);
    const hourBucket = Math.floor(Date.now() / (60 * 60 * 1000));
    const rateLimitRef = adminDb.collection('contactRateLimit').doc(`${ipKey}-${hourBucket}`);
    const rlDoc = await rateLimitRef.get();
    const count = (rlDoc.data()?.count ?? 0) as number;
    if (count >= 3) {
      return NextResponse.json({ error: 'Too many messages. Please wait before sending another.' }, { status: 429 });
    }
    await rateLimitRef.set({ count: count + 1, updatedAt: FieldValue.serverTimestamp() }, { merge: true });

    // Always save to Firestore first
    await adminDb.collection('contactSubmissions').add({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: FieldValue.serverTimestamp(),
    });

    // Email is best-effort — never block success if it fails
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      try {
        const resend = new Resend(apiKey);
        const { error } = await resend.emails.send({
          to: ADMIN_EMAILS,
          from: 'Mastering Field Service Training Portal <notifications@fse-academy.com>',
          subject: `Contact Form — ${name.trim()}`,
          html: `
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">
              <h2 style="color:#1e1b4b;margin-bottom:4px;">New Contact Form Message</h2>
              <table style="width:100%;border-collapse:collapse;margin-top:20px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#374151;font-weight:600;width:80px;">Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#111827;">${escHtml(name.trim())}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#374151;font-weight:600;">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#111827;">
                    <a href="mailto:${escHtml(email.trim())}" style="color:#4f46e5;">${escHtml(email.trim())}</a>
                  </td>
                </tr>
              </table>
              <div style="margin-top:20px;padding:16px;background:#f9fafb;border-radius:8px;">
                <p style="margin:0;color:#111827;white-space:pre-wrap;">${escHtml(message.trim())}</p>
              </div>
              <p style="margin-top:16px;font-size:13px;color:#9ca3af;">
                Reply directly to <a href="mailto:${escHtml(email.trim())}" style="color:#4f46e5;">${escHtml(email.trim())}</a>
              </p>
            </div>
          `,
        });
        if (error) console.error('Contact form email failed (non-fatal):', error);
      } catch (emailErr) {
        console.error('Contact form email failed (non-fatal):', emailErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Contact form error:', err);
    return NextResponse.json({ ok: false, error: err?.message ?? 'Unknown error' }, { status: 500 });
  }
}
