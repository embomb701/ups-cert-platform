import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms & Disclaimer' };

export default function TermsPage() {
  return (
    <section className="section-pad">
      <div className="container-site max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-2">Terms of Use &amp; Disclaimer</h1>
        <p className="text-gray-500 text-xs mb-8">Last updated: [DATE]</p>

        <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
          <div>
            <h2 className="text-base font-semibold text-white mb-2">1. Educational Purpose</h2>
            <p>
              Mastering FSE provides educational content, certification exams, and training materials
              related to UPS and critical power field service. All products and services on this platform
              are intended for educational purposes only.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">2. Certification Disclaimer — IMPORTANT</h2>
            <p className="text-white font-medium mb-2">
              These certifications are educational knowledge credentials. They are not authorizations to
              perform energized electrical work.
            </p>
            <p className="mb-2">Specifically, these certifications do not:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Authorize energized electrical work of any kind</li>
              <li>Replace employer onboarding, qualification, or authorization</li>
              <li>Replace OEM training or manufacturer certification programs</li>
              <li>Replace electrical licensing or other professional credentials</li>
              <li>Replace NFPA 70E training or Arc Flash Hazard Analysis</li>
              <li>Replace OSHA compliance requirements</li>
              <li>Replace site-specific safety procedures</li>
              <li>Replace supervised field experience</li>
              <li>Constitute permission to work independently on UPS or critical power systems</li>
            </ul>
            <p className="mt-2">
              Employers must still qualify, train, supervise, and authorize personnel according to their
              own policies and applicable laws. Passing an exam on this platform does not create any
              obligation for any employer to hire, deploy, or authorize the certificate holder.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">3. Independence Statement</h2>
            <p>
              This is an independent educational platform and is not affiliated with, endorsed by, or
              sponsored by any employer, manufacturer, customer, or service company unless explicitly
              stated.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">4. Exam Rules and Integrity</h2>
            <p>
              By purchasing and taking an exam, you agree to the Exam Rules presented before each
              exam session. Violations including cheating, account sharing, distributing questions,
              or circumventing retake controls may result in certificate revocation, account termination,
              and loss of payments without refund.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">5. Refund Policy</h2>
            <p>
              Exam purchases are generally non-refundable once an exam session has been started or
              unlocked. Contact support before starting an exam if you have questions or concerns.
              Refund requests are evaluated on a case-by-case basis.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">6. Certificate Revocation</h2>
            <p>
              Certificates may be revoked if fraud, cheating, misrepresentation, or violation of these
              terms is discovered. Revoked certificates will reflect a &quot;revoked&quot; status on the
              public verification page.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">7. Limitation of Liability</h2>
            <p>
              This platform is not liable for any outcomes resulting from use of the information,
              certifications, or training materials provided here, including but not limited to
              employment decisions, field service outcomes, equipment damage, personal injury, or
              property damage. Use of this platform and its content is at your own risk.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white mb-2">8. Contact</h2>
            <p>Questions about these terms? Contact us at [SUPPORT EMAIL PLACEHOLDER].</p>
          </div>
        </div>
      </div>
    </section>
  );
}
