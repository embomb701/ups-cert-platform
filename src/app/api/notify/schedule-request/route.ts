import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const ADMIN_EMAIL = 'faiello@gmail.com';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  return new Resend(key);
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const idToken = authHeader?.split('Bearer ')[1];
    if (!idToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;

    const { name, phone, email } = await req.json() as {
      name: string;
      phone: string;
      email: string;
    };

    if (!phone?.trim()) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Find the candidate's proctored order and update it with contact info
    const ordersSnap = await adminDb
      .collection('proctoredExamOrders')
      .where('userId', '==', uid)
      .where('productId', '==', 'fse_proctored_exam')
      .limit(1)
      .get();

    if (!ordersSnap.empty) {
      await ordersSnap.docs[0].ref.update({
        contactName: name?.trim() || null,
        contactPhone: phone.trim(),
        contactEmail: email?.trim() || decoded.email || null,
        scheduleRequested: true,
        scheduleRequestedAt: FieldValue.serverTimestamp(),
      });
    }

    // Send email to admin
    const resend = getResend();
    await resend.emails.send({
      from: 'UPS Cert Platform <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `FSE Exam Scheduling Request — ${name || email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1e1b4b; margin-bottom: 4px;">New FSE Exam Scheduling Request</h2>
          <p style="color: #6b7280; margin-top: 0;">A candidate is ready to schedule their human-proctored FSE exam.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #374151; font-weight: 600; width: 120px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${name || '(not provided)'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #374151; font-weight: 600;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #374151; font-weight: 600;">Email</td>
              <td style="padding: 10px 0; color: #111827;"><a href="mailto:${email}" style="color: #4f46e5;">${email}</a></td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 13px; color: #9ca3af;">
            Manage this candidate at <a href="https://ups-cert-platform.vercel.app/admin/proctored" style="color: #4f46e5;">Admin → Proctored Orders</a>
          </p>
        </div>
      `,
    });

    await adminDb.collection('auditLogs').add({
      userId: uid,
      eventType: 'schedule_request_submitted',
      eventDetails: { name, phone, email },
      createdAt: FieldValue.serverTimestamp(),
      severity: 'info',
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Schedule request error:', err);
    return NextResponse.json({ error: err.message ?? 'Failed to send request' }, { status: 500 });
  }
}
