import Link from 'next/link';
import { FooterDisclaimer } from './FooterDisclaimer';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-carbon-950">
      <div className="rule-voltage" />
      <div className="container-site py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-voltage-gradient">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-carbon-950" fill="currentColor" aria-hidden>
                  <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
                </svg>
              </span>
              <p className="font-display text-sm font-bold uppercase tracking-wide text-white">
                Mastering FSE
              </p>
            </div>
            <p className="text-xs leading-relaxed text-gray-500">
              Professional UPS field service training and certification — built to help technicians
              learn the fundamentals and advance their careers.
            </p>
          </div>

          <div>
            <p className="kicker mb-3">Certifications</p>
            <ul className="space-y-2">
              <li><Link href="/certifications/junior" className="text-sm text-gray-500 hover:text-white">Jr. FSE Exam</Link></li>
              <li><Link href="/certifications/ai-proctored" className="text-sm text-gray-500 hover:text-white">FSE AI Exam</Link></li>
              <li><Link href="/certifications/proctored" className="text-sm text-gray-500 hover:text-white">FSE Exam</Link></li>
              <li><Link href="/certifications/compare" className="text-sm text-gray-500 hover:text-white">Compare</Link></li>
              <li><Link href="/verify" className="text-sm text-gray-500 hover:text-white">Verify Certificate</Link></li>
            </ul>
          </div>

          <div>
            <p className="kicker mb-3">Resources</p>
            <ul className="space-y-2">
              <li><Link href="/book" className="text-sm text-gray-500 hover:text-white">Book</Link></li>
              <li><Link href="/training" className="text-sm text-gray-500 hover:text-white">Training</Link></li>
              <li><Link href="/employers" className="text-sm text-gray-500 hover:text-white">Employers</Link></li>
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-white">About</Link></li>
            </ul>
          </div>

          <div>
            <p className="kicker mb-3">Legal</p>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-white">Terms &amp; Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-gray-600">
          &copy; {year} Mastering FSE. All rights reserved.
        </div>
      </div>

      <FooterDisclaimer />
    </footer>
  );
}
