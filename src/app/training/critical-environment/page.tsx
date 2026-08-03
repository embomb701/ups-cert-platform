import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import Link from 'next/link';
import { ExternalLinkWarning } from '@/components/ExternalLinkWarning';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Critical Environment Fundamentals',
};

const MODULES = [
  {
    num: 1,
    title: 'What Is a Critical Environment?',
    description: 'Definition, examples (data centers, hospitals, power plants, telecom), uptime tiers, and why these facilities require special procedures.',
  },
  {
    num: 2,
    title: 'Electrical Hazard Awareness',
    description: 'Arc flash, shock, and electrocution risks. NFPA 70E basics, PPE requirements, approach boundaries, and the importance of de-energizing before work.',
  },
  {
    num: 3,
    title: 'Lockout / Tagout (LOTO)',
    description: 'OSHA 1910.147 control of hazardous energy. Step-by-step LOTO procedure, group lockout, and verification testing.',
  },
  {
    num: 4,
    title: 'Environmental Controls',
    description: 'Temperature and humidity management, hot/cold aisle containment, CRAC/CRAH units, and why environmental stability protects equipment and people.',
  },
  {
    num: 5,
    title: 'Access Control and Site Protocols',
    description: 'Visitor procedures, badging, escort requirements, clean-room etiquette, and communication with site leads before starting any work.',
  },
  {
    num: 6,
    title: 'Emergency Procedures',
    description: 'Fire suppression systems (clean agent vs. sprinkler), evacuation routes, emergency shutdowns, incident reporting, and who to call.',
  },
  {
    num: 7,
    title: 'CPR, First Aid, and AED',
    description: 'Why cardiac response skills are mandatory for anyone working near electrical equipment. Overview of what a current Red Cross certification covers and how to get it.',
  },
  {
    num: 8,
    title: 'Professionalism in the Field',
    description: 'Communication with customers and NOC teams, documentation, change management basics, and building a reputation as a trusted technician.',
  },
];

export default async function CriticalEnvironmentPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('firebase-token')?.value;
  if (!token) redirect('/login');

  try {
    await adminAuth.verifyIdToken(token);
  } catch {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <Link href="/training" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">← Back to Training Portal</Link>
          <div className="flex items-center gap-3 mt-4 mb-2">
            <span className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">CE Fundamentals</span>
            <span className="px-2 py-0.5 bg-emerald-800/50 border border-emerald-600/60 text-emerald-300 text-xs rounded font-semibold">Free</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Critical Environment Fundamentals</h1>
          <p className="text-gray-400">
            Essential knowledge for anyone entering mission-critical facilities. Complete all 8 modules to earn your
            <span className="text-emerald-400 font-semibold"> Critical Environment Fundamentals Certificate</span>.
          </p>
        </div>

        {/* CPR Safety callout */}
        <div className="rounded-lg bg-red-950/30 border border-red-800/50 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-red-400 font-semibold text-sm mb-1">CPR / First Aid / AED — Required for Electrical Workers</p>
            <p className="text-gray-400 text-xs">
              Anyone working in or around energized equipment must hold a current certification.
              Cardiac arrest from electrical shock can occur in seconds — trained response saves lives.
            </p>
          </div>
          <ExternalLinkWarning
            href="https://www.redcross.org/take-a-class"
            className="flex-shrink-0 inline-block py-2 px-4 bg-red-700 hover:bg-red-600 text-white text-xs font-semibold rounded-lg text-center transition-colors cursor-pointer whitespace-nowrap"
          >
            Get Certified — Red Cross ↗
          </ExternalLinkWarning>
        </div>

        {/* Module list */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Course Modules</h2>
          {MODULES.map((mod) => (
            <div key={mod.num} className="rounded-lg bg-gray-800/60 border border-gray-700 p-4 flex gap-4 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center text-emerald-400 text-xs font-bold">
                {mod.num}
              </span>
              <div>
                <p className="text-white font-semibold text-sm mb-0.5">{mod.title}</p>
                <p className="text-gray-500 text-xs">{mod.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate section */}
        <div className="rounded-xl border border-emerald-700/40 bg-emerald-950/20 p-6 text-center">
          <p className="text-emerald-400 text-sm font-semibold mb-1">Certificate of Completion</p>
          <p className="text-gray-300 font-bold text-lg mb-2">Critical Environment Fundamentals</p>
          <p className="text-gray-500 text-xs mb-4">
            Awarded upon successful completion of all 8 modules. Demonstrates foundational competency
            for entry into data centers, hospitals, and other mission-critical facilities.
          </p>
          <p className="text-gray-600 text-xs">Course content coming soon — check back for interactive lessons.</p>
        </div>

      </div>
    </div>
  );
}
