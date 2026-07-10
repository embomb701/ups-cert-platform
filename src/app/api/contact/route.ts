import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import sgMail from '@sendgrid/mail';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const ADMIN_EMAILS = [
  'faiello@gmail.com',
  'careers@aiellorecruiter.com',
  'aiellochori@gmail.com',
];

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json() as { name: string; email: string; message: string };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Always save to Firestore first
    await adminDb.collection('contactSubmissions').add({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: FieldValue.serverTimestamp(),
    });

    // Email is best-effort — never block success if it fails
    const apiKey = process.env.SENDGRID_API_KEY;
    if (apiKey) {
      try {
        sgMail.setApiKey(apiKey);
        await sgMail.sendMultiple({
          to: ADMIN_EMAILS,
          from: { name: 'Mastering Field Service Training Portal', email: 'careers@aiellorecruiter.com' },
          subject: `Contact Form — ${name.trim()}`,
          html: `
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">
              <h2 style="color:#1e1b4b;margin-bottom:4px;">New Contact Form Message</h2>
              <table style="width:100%;border-collapse:collapse;margin-top:20px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#374151;font-weight:600;width:80px;">Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#111827;">${name.trim()}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#374151;font-weight:600;">Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#111827;">
                    <a href="mailto:${email.trim()}" style="color:#4f46e5;">${email.trim()}</a>
                  </td>
                </tr>
              </table>
              <div style="margin-top:20px;padding:16px;background:#f9fafb;border-radius:8px;">
                <p style="margin:0;color:#111827;white-space:pre-wrap;">${message.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>
              <p style="margin-top:16px;font-size:13px;color:#9ca3af;">
                Reply directly to <a href="mailto:${email.trim()}" style="color:#4f46e5;">${email.trim()}</a>
              </p>
            </div>
          `,
        });
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
