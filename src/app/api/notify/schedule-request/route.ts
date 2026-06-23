import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = [
  'faiello@gmail.com',
  'careers@aiellorecruiter.com',
  'aiellochori@gmail.com',
];

function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error('GMAIL_USER or GMAIL_APP_PASSWORD env var is missing');
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;

    const { phone } = await req.json() as { phone: string };
    if (!phone?.trim()) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const name = decoded.name || decoded.email || 'Candidate';
    const email = decoded.email || '';

    // Save phone to their proctored order
    const ordersSnap = await adminDb
      .collection('proctoredExamOrders')
      .where('userId', '==', uid)
      .where('productId', '==', 'fse_proctored_exam')
      .limit(1)
      .get();

    if (!ordersSnap.empty) {
      await ordersSnap.docs[0].ref.update({
        contactPhone: phone.trim(),
        scheduleRequested: true,
        scheduleRequestedAt: FieldValue.serverTimestamp(),
      });
    }

    // Send email via Gmail
    const transporter = getTransport();
    await transporter.sendMail({
      from: `"UPS Cert Platform" <${process.env.GMAIL_USER}>`,
      to: ADMIN_EMAILS.join(', '),
      subject: `FSE Exam Scheduling Request — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1e1b4b; margin-bottom: 4px;">FSE Exam Scheduling Request</h2>
          <p style="color: #6b7280; margin-top: 0;">A candidate has purchased their human-proctored FSE exam and is ready to schedule.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #374151; font-weight: 600; width: 100px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #374151; font-weight: 600;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 16px; font-weight: 700;">${phone.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #374151; font-weight: 600;">Email</td>
              <td style="padding: 10px 0; color: #111827;"><a href="mailto:${email}" style="color: #4f46e5;">${email}</a></td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 13px; color: #9ca3af;">
            View this candidate in the <a href="https://ups-cert-platform.vercel.app/admin/proctored" style="color: #4f46e5;">Admin → Proctored Orders</a> panel.
          </p>
        </div>
      `,
    });

    await adminDb.collection('auditLogs').add({
      userId: uid,
      eventType: 'schedule_request_submitted',
      eventDetails: { name, phone: phone.trim(), email },
      createdAt: FieldValue.serverTimestamp(),
      severity: 'info',
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Schedule request error:', err);
    return NextResponse.json({ error: err.message ?? 'Failed to send request' }, { status: 500 });
  }
}
