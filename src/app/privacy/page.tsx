import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-xs mb-8">Last updated: [DATE]</p>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-white mb-2">1. Information We Collect</h2>
            <p>We collect the following information when you use this platform:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Account information via Google Sign-In (name, email, Google account ID)</li>
              <li>Purchase records via Stripe (amount, product, timestamp — we do not store raw card data)</li>
              <li>Exam attempt records including start/completion time, answers, and score</li>
              <li>Certificate records if you earn a certification</li>
              <li>Hashed IP address data for exam integrity and retake cooldown enforcement</li>
              <li>Suspicious activity events logged during exam sessions (tab switching, copy/paste attempts, etc.)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">2. How We Use Your Information</h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>To authenticate your account and verify purchases</li>
              <li>To deliver exam sessions and track attempts</li>
              <li>To enforce 90-day retake cooldowns for the Jr. FSC Exam</li>
              <li>To generate and maintain certificates</li>
              <li>To maintain public certificate verification records</li>
              <li>To review flagged exam attempts for potential integrity violations</li>
              <li>To prevent fraudulent or duplicate exam attempts</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">3. IP Address and Network Data</h2>
            <p>
              For the Junior FSC Exam, we store a hashed (one-way encrypted) version of your IP address
              at account creation, purchase, and exam attempt. This hash is used only for cooldown
              enforcement and duplicate detection. Raw IP addresses are not stored in our primary database.
            </p>
            <p className="mt-2">
              Shared networks (workplaces, schools, VPNs, shared households) may trigger a false cooldown
              flag. Contact support for admin review if this occurs.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">4. Exam Behavior Logging</h2>
            <p>
              During exam sessions, the platform logs tab switches, browser blur events, fullscreen exits,
              copy/paste/cut attempts, right-click attempts, and unusual answer timing. These are used to
              calculate a risk score. High-risk attempts may be reviewed by an administrator.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">5. Public Certificate Verification</h2>
            <p>
              Public verification pages at /verify/[certificateNumber] display the candidate name,
              certification title, exam level, issue date, and certificate status. Score display is
              optional. Email addresses and user IDs are never shown on public pages.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">6. Third-Party Services</h2>
            <ul className="space-y-1 list-disc list-inside">
              <li><strong className="text-gray-300">Google Firebase / Firestore</strong> — authentication, database, storage.</li>
              <li><strong className="text-gray-300">Stripe</strong> — payment processing. We do not store raw card data.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">7. Contact</h2>
            <p>For privacy questions or data requests, contact us at [SUPPORT EMAIL PLACEHOLDER].</p>
          </div>
        </div>
      </div>
    </section>
  );
}
