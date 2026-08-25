import sgMail from '@sendgrid/mail';

const FROM = { name: 'Mastering Field Service Training Portal', email: 'careers@aiellorecruiter.com' };
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

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
    `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#1c1917;color:#fafaf9;border-radius:12px;">
      <p style="color:#78716c;font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.08em;">Training Portal</p>
      <h2 style="color:#fafaf9;margin:0 0 8px;font-size:20px;">Module passed ✓</h2>
      <p style="color:#a8a29e;margin:0 0 20px;">Hey ${displayName} — you just passed <strong style="color:#fafaf9;">${moduleTitle}</strong>. Keep going.</p>
      <a href="${courseUrl}" style="display:inline-block;padding:12px 24px;background:#ea580c;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Continue training →</a>
      <p style="margin:32px 0 0;font-size:12px;color:#57534e;">Mastering Field Service · <a href="${SITE_URL}" style="color:#78716c;">${SITE_URL}</a></p>
    </div>`,
  );
}

export async function sendCourseCompleteEmail(
  to: string,
  name: string,
  courseName: string,
  certTitle: string,
  dashboardUrl: string,
  examUrl?: string,
): Promise<void> {
  const displayName = name.split(' ')[0] || 'there';
  const ctaUrl = examUrl ?? dashboardUrl;
  const ctaLabel = examUrl ? 'Start Practice Exam →' : 'Go to dashboard →';
  const secondaryLink = examUrl
    ? `<p style="margin:16px 0 0;font-size:13px;"><a href="${dashboardUrl}" style="color:#78716c;">Go to dashboard →</a></p>`
    : '';
  await send(
    to,
    `Course complete: ${courseName}`,
    `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#1c1917;color:#fafaf9;border-radius:12px;">
      <p style="color:#78716c;font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.08em;">Training Portal</p>
      <h2 style="color:#fafaf9;margin:0 0 8px;font-size:22px;">Course complete 🎓</h2>
      <p style="color:#a8a29e;margin:0 0 8px;">Congratulations, ${displayName}!</p>
      <p style="color:#a8a29e;margin:0 0 20px;">You've finished every module in <strong style="color:#fafaf9;">${courseName}</strong>. Your <strong style="color:#fb923c;">${certTitle}</strong> practice exam is now unlocked.</p>
      <a href="${ctaUrl}" style="display:inline-block;padding:12px 24px;background:#ea580c;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">${ctaLabel}</a>
      ${secondaryLink}
      <p style="margin:32px 0 0;font-size:12px;color:#57534e;">Mastering Field Service · <a href="${SITE_URL}" style="color:#78716c;">${SITE_URL}</a></p>
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
    `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#1c1917;color:#fafaf9;border-radius:12px;">
      <p style="color:#78716c;font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.08em;">Training Reminder</p>
      <h2 style="color:#fafaf9;margin:0 0 8px;font-size:20px;">Hey ${displayName}, it's been ${dayText}</h2>
      <p style="color:#a8a29e;margin:0 0 20px;">You're enrolled in <strong style="color:#fafaf9;">${courseName}</strong> and haven't completed a module recently. Your progress is saved — pick up right where you left off.</p>
      <a href="${courseUrl}" style="display:inline-block;padding:12px 24px;background:#ea580c;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Continue training →</a>
      <p style="margin:24px 0 0;font-size:13px;color:#57534e;">Credentials from this portal are verified by employers — completing your course opens doors.</p>
      <p style="margin:20px 0 0;font-size:12px;color:#44403c;">Mastering Field Service · <a href="${SITE_URL}" style="color:#78716c;">${SITE_URL}</a></p>
      <p style="margin:8px 0 0;font-size:11px;color:#57534e;">You're receiving this because you're enrolled in a course. <a href="${unsubUrl}" style="color:#78716c;">Unsubscribe from reminders →</a></p>
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
    `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#1c1917;color:#fafaf9;border-radius:12px;">
      <p style="color:#78716c;font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.08em;">Order Confirmation</p>
      <h2 style="color:#fafaf9;margin:0 0 8px;font-size:20px;">You're enrolled, ${displayName} ✓</h2>
      <p style="color:#a8a29e;margin:0 0 20px;">Your purchase is confirmed. Here's what you ordered:</p>
      <div style="background:#292524;border:1px solid #44403c;border-radius:8px;padding:16px;margin:0 0 20px;">
        <p style="color:#fafaf9;font-weight:600;margin:0 0 4px;font-size:15px;">${productName}</p>
        <p style="color:#78716c;font-size:13px;margin:0;">${amount} · Access granted immediately</p>
      </div>
      <a href="${dashboardUrl}" style="display:inline-block;padding:12px 24px;background:#ea580c;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Go to your dashboard →</a>
      <p style="margin:24px 0 0;font-size:12px;color:#57534e;">Keep this email as your receipt. Questions? Reply to this email.</p>
      <p style="margin:12px 0 0;font-size:12px;color:#44403c;">Mastering Field Service · <a href="${SITE_URL}" style="color:#78716c;">${SITE_URL}</a></p>
    </div>`,
  );
}

export async function sendTrialDripEmail(
  to: string,
  name: string,
  step: 1 | 2 | 3,
  uid: string,
): Promise<void> {
  const displayName = name.split(' ')[0] || 'there';
  const unsubUrl = `${SITE_URL}/unsubscribe?uid=${encodeURIComponent(uid)}`;
  const upsUrl = `${SITE_URL}/training/ups`;
  const coursesUrl = `${SITE_URL}/courses`;

  const footer = `
    <p style="margin:24px 0 0;font-size:12px;color:#44403c;">Mastering Field Service · <a href="${SITE_URL}" style="color:#78716c;">${SITE_URL}</a></p>
    <p style="margin:6px 0 0;font-size:11px;color:#57534e;">You received this because you created a free account. <a href="${unsubUrl}" style="color:#78716c;">Unsubscribe →</a></p>
  `;

  if (step === 1) {
    await send(
      to,
      'Your 3 free training modules are ready',
      `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#1c1917;color:#fafaf9;border-radius:12px;">
        <p style="color:#78716c;font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.08em;">Mastering Field Service</p>
        <h2 style="color:#fafaf9;margin:0 0 8px;font-size:20px;">Hey ${displayName} — your free preview is waiting</h2>
        <p style="color:#a8a29e;margin:0 0 16px;">You signed up but haven't started yet. The first 3 modules of our UPS Field Service Engineering course are completely free — no credit card required.</p>
        <div style="background:#292524;border:1px solid #44403c;border-radius:8px;padding:16px;margin:0 0 20px;">
          <p style="color:#fb923c;font-size:12px;font-weight:600;margin:0 0 8px;text-transform:uppercase;letter-spacing:.06em;">FREE — No purchase needed</p>
          <p style="color:#fafaf9;margin:0 0 4px;font-size:14px;">✓ Module 1: UPS Fundamentals & System Overview</p>
          <p style="color:#fafaf9;margin:0 0 4px;font-size:14px;">✓ Module 2: Single-Phase UPS Architecture</p>
          <p style="color:#fafaf9;margin:0;font-size:14px;">✓ Module 3: Three-Phase UPS Systems</p>
        </div>
        <a href="${upsUrl}" style="display:inline-block;padding:12px 24px;background:#ea580c;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Start free modules →</a>
        ${footer}
      </div>`,
    );
  } else if (step === 2) {
    await send(
      to,
      'What you unlock when you enroll — 25 more modules',
      `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#1c1917;color:#fafaf9;border-radius:12px;">
        <p style="color:#78716c;font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.08em;">Mastering Field Service</p>
        <h2 style="color:#fafaf9;margin:0 0 8px;font-size:20px;">Here's what full access unlocks</h2>
        <p style="color:#a8a29e;margin:0 0 16px;">The free preview covers the first 3 modules. Full enrollment opens all 28 — and the Jr. UPS FSE certification exam that employers verify.</p>
        <div style="background:#292524;border:1px solid #44403c;border-radius:8px;padding:16px;margin:0 0 20px;">
          <p style="color:#fb923c;font-size:12px;font-weight:600;margin:0 0 10px;text-transform:uppercase;letter-spacing:.06em;">Locked modules include</p>
          <p style="color:#a8a29e;margin:0 0 4px;font-size:13px;">· Battery Systems & State of Charge</p>
          <p style="color:#a8a29e;margin:0 0 4px;font-size:13px;">· Transfer Switch Operation & Bypass Procedures</p>
          <p style="color:#a8a29e;margin:0 0 4px;font-size:13px;">· Commissioning & Site Startup</p>
          <p style="color:#a8a29e;margin:0 0 4px;font-size:13px;">· Troubleshooting Faults & Alarms</p>
          <p style="color:#a8a29e;margin:0 0 4px;font-size:13px;">· Preventive Maintenance Schedules</p>
          <p style="color:#a8a29e;margin:0;font-size:13px;">· …and 20 more modules</p>
        </div>
        <a href="${coursesUrl}" style="display:inline-block;padding:12px 24px;background:#ea580c;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">View all courses & enroll →</a>
        ${footer}
      </div>`,
    );
  } else {
    await send(
      to,
      'Your free preview is as far as it goes — ready to certify?',
      `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#1c1917;color:#fafaf9;border-radius:12px;">
        <p style="color:#78716c;font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.08em;">Mastering Field Service</p>
        <h2 style="color:#fafaf9;margin:0 0 8px;font-size:20px;">The free preview ends at module 3</h2>
        <p style="color:#a8a29e;margin:0 0 16px;">Hey ${displayName} — you created your account a week ago. The free content shows you the style and quality of the material. The other 25 modules — and the Jr. FSE certification exam — are only available with full enrollment.</p>
        <div style="background:#431407;border:1px solid #c2410c;border-radius:8px;padding:16px;margin:0 0 20px;">
          <p style="color:#fdba74;font-weight:600;margin:0 0 4px;font-size:15px;">Jr. UPS Field Service Engineer</p>
          <p style="color:#fb923c;font-size:13px;margin:0 0 8px;">28 modules · Verified certification · Employer-searchable</p>
          <p style="color:#fed7aa;font-size:13px;margin:0;">Employers on the platform search by certification level when posting jobs. This is how candidates get found.</p>
        </div>
        <a href="${coursesUrl}" style="display:inline-block;padding:12px 24px;background:#ea580c;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Enroll now →</a>
        ${footer}
      </div>`,
    );
  }
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
    `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#1c1917;color:#fafaf9;border-radius:12px;">
      <p style="color:#78716c;font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.08em;">Training Portal</p>
      <h2 style="color:#fafaf9;margin:0 0 8px;font-size:22px;">You passed ✓</h2>
      <p style="color:#a8a29e;margin:0 0 8px;">Congratulations, ${displayName}!</p>
      <p style="color:#a8a29e;margin:0 0 4px;">You've earned the <strong style="color:#fafaf9;">${certTitle}</strong>.</p>
      <p style="color:#78716c;font-size:13px;margin:0 0 20px;">Certificate #${certNumber}</p>
      <a href="${verifyUrl}" style="display:inline-block;padding:12px 24px;background:#ea580c;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">View certificate →</a>
      <p style="margin:32px 0 0;font-size:12px;color:#57534e;">Mastering Field Service · <a href="${SITE_URL}" style="color:#78716c;">${SITE_URL}</a></p>
    </div>`,
  );
}

export async function sendWelcomeEmail(to: string, name: string, uid: string): Promise<void> {
  const displayName = name.split(' ')[0] || 'there';
  const unsubUrl = `${SITE_URL}/unsubscribe?uid=${encodeURIComponent(uid)}`;
  await send(
    to,
    'Welcome to Mastering Field Service',
    `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#1c1917;color:#fafaf9;border-radius:12px;">
      <p style="color:#78716c;font-size:12px;margin:0 0 16px;text-transform:uppercase;letter-spacing:.08em;">Training Portal</p>
      <h2 style="color:#fafaf9;margin:0 0 8px;font-size:22px;">Welcome, ${displayName} 👋</h2>
      <p style="color:#a8a29e;margin:0 0 16px;">You're in. Here's how to make the most of your free access:</p>
      <ul style="color:#a8a29e;margin:0 0 20px;padding-left:20px;line-height:1.8;">
        <li><strong style="color:#fafaf9;">Free modules</strong> — Start with the first 3 UPS FSE modules, no purchase required.</li>
        <li><strong style="color:#fafaf9;">29 career tracks</strong> — UPS, HVAC, Kitchen, Data Center, Solar, and more.</li>
        <li><strong style="color:#fafaf9;">Certifications</strong> — Complete a course and unlock your Jr. FSE exam.</li>
      </ul>
      <a href="${SITE_URL}/training" style="display:inline-block;padding:12px 24px;background:#ea580c;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Start training →</a>
      <p style="margin:32px 0 0;font-size:12px;color:#57534e;">Mastering Field Service · <a href="${SITE_URL}" style="color:#78716c;">${SITE_URL}</a></p>
      <p style="margin:8px 0 0;font-size:11px;color:#44403c;">You received this because you created an account. <a href="${unsubUrl}" style="color:#78716c;">Unsubscribe →</a></p>
    </div>`,
  );
}
