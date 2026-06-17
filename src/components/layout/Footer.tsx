import Link from 'next/link';
import { FooterDisclaimer } from './FooterDisclaimer';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-auto">
      <div className="container-site py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-semibold text-white mb-3">[PLATFORM NAME]</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Professional UPS field service training and certification.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Certifications</p>
            <ul className="space-y-2">
              <li><Link href="/certifications/junior" className="text-sm text-gray-500 hover:text-white">Jr. FSC Exam</Link></li>
              <li><Link href="/certifications/proctored" className="text-sm text-gray-500 hover:text-white">FSC Exam</Link></li>
              <li><Link href="/certifications/compare" className="text-sm text-gray-500 hover:text-white">Compare</Link></li>
              <li><Link href="/verify" className="text-sm text-gray-500 hover:text-white">Verify Certificate</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Resources</p>
            <ul className="space-y-2">
              <li><Link href="/book" className="text-sm text-gray-500 hover:text-white">Book</Link></li>
              <li><Link href="/training" className="text-sm text-gray-500 hover:text-white">Training</Link></li>
              <li><Link href="/employers" className="text-sm text-gray-500 hover:text-white">Employers</Link></li>
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-white">About</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Legal</p>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-white">Terms & Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
          &copy; {year} [PLATFORM NAME]. All rights reserved.
        </div>
      </div>

      <FooterDisclaimer />
    </footer>
  );
}
