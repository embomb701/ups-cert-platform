import sgMail from '@sendgrid/mail';

const FROM = { name: 'Mastering Field Service Training Portal', email: 'careers@aiellorecruiter.com' };
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ups-cert-platform.vercel.app';

async function send(to: string, subject: string, html: string): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey || !to) return;
  sgMail.setApiKey(apiKey);
  await sgMail.send({ to, from: FROM, subject, html });
}

export async function sendModuleCompleteEmail(
  to: string,
  name: string,
  moduleTitle: string,
  courseUrl: string,
): Promise<void> {
  const displayName = name.split(' ')[0] || 'there';
  await send(
    to,
    `Module complete: ${moduleTitle}`,
    `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#111827;color:#f9fafb;border-radius:12px;">
      <p style="color:#6b7280;font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.08em;">Training Portal</p>
      <h2 style="color:#f9fafb;margin:0 0 8px;font-size:20px;">Module passed ✓</h2>
      <p style="color:#9ca3af;margin:0 0 20px;">Hey ${displayName} — you just passed <strong style="color:#f9fafb;">${moduleTitle}</strong>. Keep going.</p>
      <a href="${courseUrl}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Continue training →</a>
      <p style="margin:32px 0 0;font-size:12px;color:#4b5563;">Mastering Field Service · <a href="${SITE_URL}" style="color:#6b7280;">${SITE_URL}</a></p>
    </div>`,
  );
}

export async function sendCourseCompleteEmail(
  to: string,
  name: string,
  courseName: string,
  certTitle: string,
  dashboardUrl: string,
): Promise<void> {
  const displayName = name.split(' ')[0] || 'there';
  await send(
    to,
    `Course complete: ${courseName}`,
    `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#111827;color:#f9fafb;border-radius:12px;">
      <p style="color:#6b7280;font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.08em;">Training Portal</p>
      <h2 style="color:#f9fafb;margin:0 0 8px;font-size:22px;">Course complete 🎓</h2>
      <p style="color:#9ca3af;margin:0 0 8px;">Congratulations, ${displayName}!</p>
      <p style="color:#9ca3af;margin:0 0 20px;">You've finished every module in <strong style="color:#f9fafb;">${courseName}</strong>. Your <strong style="color:#60a5fa;">${certTitle}</strong> practice exam is now unlocked.</p>
      <a href="${dashboardUrl}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Go to dashboard →</a>
      <p style="margin:32px 0 0;font-size:12px;color:#4b5563;">Mastering Field Service · <a href="${SITE_URL}" style="color:#6b7280;">${SITE_URL}</a></p>
    </div>`,
  );
}

export async function sendProgressReminderEmail(
  to: string,
  name: string,
  courseName: string,
  courseUrl: string,
  daysInactive: number,
  uid: string,
): Promise<void> {
  const displayName = name.split(' ')[0] || 'there';
  const dayText = daysInactive === 1 ? '1 day' : `${daysInactive} days`;
  const unsubUrl = `${SITE_URL}/unsubscribe?uid=${encodeURIComponent(uid)}`;
  await send(
    to,
    `Pick up where you left off — ${courseName}`,
    `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#111827;color:#f9fafb;border-radius:12px;">
      <p style="color:#6b7280;font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.08em;">Training Reminder</p>
      <h2 style="color:#f9fafb;margin:0 0 8px;font-size:20px;">Hey ${displayName}, it's been ${dayText}</h2>
      <p style="color:#9ca3af;margin:0 0 20px;">You're enrolled in <strong style="color:#f9fafb;">${courseName}</strong> and haven't completed a module recently. Your progress is saved — pick up right where you left off.</p>
      <a href="${courseUrl}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Continue training →</a>
      <p style="margin:24px 0 0;font-size:13px;color:#4b5563;">Credentials from this portal are verified by employers — completing your course opens doors.</p>
      <p style="margin:20px 0 0;font-size:12px;color:#374151;">Mastering Field Service · <a href="${SITE_URL}" style="color:#6b7280;">${SITE_URL}</a></p>
      <p style="margin:8px 0 0;font-size:11px;color:#4b5563;">You're receiving this because you're enrolled in a course. <a href="${unsubUrl}" style="color:#6b7280;">Unsubscribe from reminders →</a></p>
    </div>`,
  );
}

export async function sendOrderConfirmationEmail(
  to: string,
  name: string,
  productName: string,
  amountCents: number,
  dashboardUrl: string,
): Promise<void> {
  const displayName = name.split(' ')[0] || 'there';
  const amount = `$${(amountCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  await send(
    to,
    `Order confirmed — ${productName}`,
    `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#111827;color:#f9fafb;border-radius:12px;">
      <p style="color:#6b7280;font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.08em;">Order Confirmation</p>
      <h2 style="color:#f9fafb;margin:0 0 8px;font-size:20px;">You're enrolled, ${displayName} ✓</h2>
      <p style="color:#9ca3af;margin:0 0 20px;">Your purchase is confirmed. Here's what you ordered:</p>
      <div style="background:#1f2937;border:1px solid #374151;border-radius:8px;padding:16px;margin:0 0 20px;">
        <p style="color:#f9fafb;font-weight:600;margin:0 0 4px;font-size:15px;">${productName}</p>
        <p style="color:#6b7280;font-size:13px;margin:0;">${amount} · Access granted immediately</p>
      </div>
      <a href="${dashboardUrl}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Go to your dashboard →</a>
      <p style="margin:24px 0 0;font-size:12px;color:#4b5563;">Keep this email as your receipt. Questions? Reply to this email.</p>
      <p style="margin:12px 0 0;font-size:12px;color:#374151;">Mastering Field Service · <a href="${SITE_URL}" style="color:#6b7280;">${SITE_URL}</a></p>
    </div>`,
  );
}

export async function sendCertEarnedEmail(
  to: string,
  name: string,
  certTitle: string,
  certNumber: string,
  verifyUrl: string,
): Promise<void> {
  const displayName = name.split(' ')[0] || 'there';
  await send(
    to,
    `Certificate earned: ${certTitle}`,
    `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#111827;color:#f9fafb;border-radius:12px;">
      <p style="color:#6b7280;font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.08em;">Training Portal</p>
      <h2 style="color:#f9fafb;margin:0 0 8px;font-size:22px;">You passed ✓</h2>
      <p style="color:#9ca3af;margin:0 0 8px;">Congratulations, ${displayName}!</p>
      <p style="color:#9ca3af;margin:0 0 4px;">You've earned the <strong style="color:#f9fafb;">${certTitle}</strong>.</p>
      <p style="color:#6b7280;font-size:13px;margin:0 0 20px;">Certificate #${certNumber}</p>
      <a href="${verifyUrl}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">View certificate →</a>
      <p style="margin:32px 0 0;font-size:12px;color:#4b5563;">Mastering Field Service · <a href="${SITE_URL}" style="color:#6b7280;">${SITE_URL}</a></p>
    </div>`,
  );
}
