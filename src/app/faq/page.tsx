import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

export const metadata: Metadata = {
  title: 'FAQ — Mastering Field Service',
  description:
    'Answers to common questions about field service training and certification — cost, salary, how the exams work, and whether you need a college degree.',
  openGraph: {
    title: 'FAQ — Mastering Field Service',
    description: 'Cost, salary, exam levels, refunds, and everything else people ask before starting.',
    images: [{ url: `${SITE_URL}/api/og`, width: 1200, height: 630, alt: 'FAQ — Mastering Field Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${SITE_URL}/api/og`],
  },
};

interface FaqItem {
  q: string;
  a: string;
}

const GROUPS: { label: string; items: FaqItem[] }[] = [
  {
    label: 'Getting Started',
    items: [
      {
        q: 'Do I need a college degree?',
        a: 'No. None of the 29 career tracks require a degree. Every track is built around a shared electrical and safety foundation, then branches into trade-specific curriculum — the kind of thing people have historically learned on the job, just structured and self-paced.',
      },
      {
        q: 'How long does it take to become job-ready?',
        a: 'Most people finish a track in 3–6 months, working at their own pace. Modules stay unlocked once completed, so life happening — a busy week, a trip — doesn’t reset your progress.',
      },
      {
        q: 'Can I try it before paying anything?',
        a: 'Yes. Create a free account and the first 3 modules of every one of the 29 tracks are open at no cost — no card required to start.',
      },
      {
        q: 'Which track should I pick?',
        a: 'If you already know your trade, go straight to /courses. If you’re not sure, the course finder is a 5-question quiz that narrows the 29 tracks down to a few worth a closer look based on your interests and how you like to work.',
      },
    ],
  },
  {
    label: 'Cost & Payment',
    items: [
      {
        q: 'How much does it actually cost?',
        a: 'A full training course (all modules plus the certification exam) runs around $1,499, though it varies slightly by track. The first 3 modules of every track are free, so you can get a real feel for the material before spending anything.',
      },
      {
        q: "What's a \"test-out\" exam?",
        a: 'If you already have real field experience and don’t need the training modules, you can skip straight to the certification exam. Test-out pricing starts at $299 for the Jr. level — see /certifications/compare for all three exam levels side by side.',
      },
      {
        q: 'Do you offer refunds?',
        a: 'Exam purchases are generally non-refundable once a session has been started or unlocked. If you have questions before starting, contact support first — refund requests are evaluated case-by-case. Full terms are on the Terms & Disclaimer page.',
      },
      {
        q: 'Do employers get bundle or team pricing?',
        a: 'Yes. Employers can purchase seats for a whole team or crew at once — see /employers for package options.',
      },
    ],
  },
  {
    label: 'Certification & Exams',
    items: [
      {
        q: 'What’s the difference between Jr. FSE, AI Proctored, and Human Proctored?',
        a: 'They’re three levels of the same certification, each with different proctoring and cost: Jr. FSE ($299, no proctor, entry-level difficulty), AI Proctored ($349, webcam-monitored, flexible scheduling), and Human Proctored ($649, live proctor, the highest-credential option). Full side-by-side comparison at /certifications/compare.',
      },
      {
        q: 'Is this certification accredited, or does it replace my electrical license?',
        a: 'No. These are educational knowledge credentials — proof you’ve studied and retained the material. They do not authorize energized electrical work and do not replace employer training, OEM qualification, electrical licensing, NFPA 70E, OSHA requirements, or site-specific procedures.',
      },
      {
        q: 'Can an employer verify my certificate is real?',
        a: 'Yes. Every certificate has a public verification page at /verify/[certificate number] that any employer, recruiter, or customer can check — no login required.',
      },
      {
        q: 'What happens if someone cheats?',
        a: 'Certificates can be revoked for cheating, account sharing, or misrepresentation. A revoked certificate shows a "revoked" status on its public verification page — permanently.',
      },
    ],
  },
  {
    label: 'Career & Salary',
    items: [
      {
        q: 'What can I expect to earn?',
        a: 'Entry-level roles across the 29 tracks generally start in the $55K–$98K range, reaching $135K+ with a few years of experience. Actual pay varies by track, region, employer, and how much travel the role involves.',
      },
      {
        q: 'Do you help with finding a job?',
        a: 'Yes. There’s a job board at /jobs and a searchable candidate profile system at /candidates that employers browse directly — your certifications and completed tracks show up automatically.',
      },
    ],
  },
  {
    label: 'Trust & Legitimacy',
    items: [
      {
        q: 'Who’s actually behind this platform?',
        a: 'Francis Aiello, who spent 25+ years working every level of the UPS and critical power field service industry before writing Mastering Uninterruptible Power Supplies, Field Service Engineering — the technical foundation the certifications are built on. More at /about.',
      },
      {
        q: 'Is this affiliated with any employer or manufacturer?',
        a: 'No. The platform is operated independently and isn’t affiliated with, endorsed by, or sponsored by any employer, manufacturer, customer, or service company unless explicitly stated on a specific page.',
      },
    ],
  },
];

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GROUPS.flatMap((group) =>
      group.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      }))
    ),
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <section className="border-b border-gray-800 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">FAQ</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            Questions people actually ask
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Cost, salary, how the exams work, whether you need a degree — the stuff worth knowing
            before you start.
          </p>
        </div>
      </section>

      {/* Groups */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          {GROUPS.map((group) => (
            <div key={group.label}>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                {group.label}
              </h2>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    className="card-dark p-5 group [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm font-semibold text-white">
                      {item.q}
                      <span className="text-gray-500 group-open:rotate-45 transition-transform text-lg leading-none shrink-0">
                        +
                      </span>
                    </summary>
                    <p className="text-sm text-gray-400 leading-relaxed mt-3">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 py-14 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-lg font-bold text-white mb-3">Still have questions?</h2>
          <p className="text-gray-400 text-sm mb-6">
            Reach out directly, or just start with a free account — the first 3 modules of every
            track are open at no cost.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/login" className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors">
              Start Free →
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold text-sm transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
