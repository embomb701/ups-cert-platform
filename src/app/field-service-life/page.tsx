import type { Metadata } from 'next';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com';

export const metadata: Metadata = {
  title: 'Embracing the Field Service Life — Mastering Field Service',
  description:
    'What it actually means to live the field service life — the travel, the network, the points and status, the craft, and what the road costs. Written for people considering the career, by people who live it.',
  openGraph: {
    title: 'Embracing the Field Service Life',
    description:
      'The travel, the network, the points and status, the craft, and what the road really costs — an honest look at life as a field service tech.',
    images: [{ url: `${SITE_URL}/api/og`, width: 1200, height: 630, alt: 'Embracing the Field Service Life' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${SITE_URL}/api/og`],
  },
};

export default function FieldServiceLifePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Embracing the Field Service Life',
    description:
      'What it actually means to live the field service life — travel, reputation, points and status, craft, autonomy, access, and what the road costs.',
    author: { '@type': 'Organization', name: 'Mastering Field Service' },
    publisher: { '@type': 'Organization', name: 'Mastering Field Service', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/field-service-life`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="section-pad bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container-site max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            Field Service Life
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
            Embracing the <span className="text-gradient">Field Service Life</span>
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            You didn&apos;t sign up for a desk. You signed up for a bag that&apos;s always half-packed,
            a truck or a rental with your gear dialed in, and a different building every few weeks.
          </p>
          <p className="text-gray-400 leading-relaxed mt-4">
            Guys who don&apos;t last in this job spend their whole career treating that as a cost.
            Guys who do last figure out, usually a few years in, that it&apos;s actually the job&apos;s
            biggest perk — if you play it right.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-site max-w-3xl mx-auto space-y-14">

          {/* The Map in Your Head */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🗺️</span>
              <h2 className="text-xl font-bold text-white">The Map in Your Head</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              <p>
                Ask a tourist about Cedar Rapids, or Council Bluffs, or some data center park off a
                highway exit outside a city you couldn&apos;t have placed on a map a year ago, and
                they&apos;ll shrug. Ask a field tech who spent a week there, and they&apos;ll tell you
                where to get the real breakfast, which side of the building blocks the wind in
                February, and which local electrician actually knows the site cold.
              </p>
              <p>
                You end up with a version of the country most people never see. Not the postcard
                version — the working version. Different climates in the same month. Different site
                cultures: union shops, non-union shops, buttoned-up campuses, plants that have run
                the same way since 1987. You learn to read a place fast — where to eat, where not to
                park, who&apos;s actually in charge on site versus who just has the title.
              </p>
              <p>
                That&apos;s not a booked vacation. It&apos;s something else, and in its own way it&apos;s
                better. You&apos;re not visiting. You&apos;re working there, which means people talk to
                you differently, and you see the town differently too.
              </p>
            </div>
          </div>

          {/* The People Who Remember You */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🤝</span>
              <h2 className="text-xl font-bold text-white">The People Who Remember You</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              <p>
                Every site has a facility manager who&apos;s watched twenty techs walk through that
                door and can tell within ten minutes which ones actually know what they&apos;re doing.
                Every site has an electrician, a controls guy, a security vendor, a superintendent —
                people watching you work whether you notice or not.
              </p>
              <p>
                Show up prepared, explain what you&apos;re doing without being asked, leave the panel
                cleaner than you found it, and word gets around. Facility managers start requesting
                you by name. Building owners remember the tech who caught the problem nobody else
                saw. That reputation follows you — sometimes literally, when a facilities director
                changes companies and calls you six months later at their new site.
              </p>
              <p>
                You also build something you can&apos;t get behind a desk: a real network, spread
                across states, made of people who&apos;ve actually watched you work under pressure.
                That network becomes your next job lead. It becomes a favor when you need a part at
                9pm on a Sunday. It becomes the guy on the phone at 2am who&apos;s dealt with this
                exact unit before and walks you through it while you&apos;re standing in front of it,
                hands full.
              </p>
            </div>
          </div>

          {/* The Quiet Stack */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">✈️</span>
              <h2 className="text-xl font-bold text-white">The Quiet Stack</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              <p>
                Here&apos;s the part nobody tells you about when you take this job: all that travel
                adds up to something. Every hotel night is a point. Every flight is a mile. Every
                rental is a step closer to a status tier. None of that shows up on a paycheck, but it
                shows up in your life.
              </p>
              <p>
                Pick one hotel chain. Pick one airline. Stick with them even when a competitor is a
                few bucks cheaper for one trip — the loyalty is worth more than the discount. A year
                or two in, you&apos;re not standing in the same line as everyone else. You&apos;re
                getting upgraded, getting the room on the quiet floor, getting late checkout without
                asking, getting into the lounge before an early flight instead of eating vending
                machine food at the gate.
              </p>
              <p>
                Eventually those points turn into something that has nothing to do with work: a free
                week at the beach with your family, flights home for a trip you&apos;d have put off
                otherwise, a hotel night that doesn&apos;t cost you anything on a trip that&apos;s
                actually yours.
              </p>
              <p>
                On top of the points, there&apos;s the plain math. When the company&apos;s covering the
                flight, the hotel, and paying per diem for meals, that&apos;s money that would
                normally come out of your own pocket — gas, lunch, whatever — and now it doesn&apos;t.
                Add in the overtime that tends to come with this kind of work, and travel stops being
                the downside people warn you about and starts being part of what makes the job pay off.
              </p>
            </div>
          </div>

          {/* The Craft Advantage */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🛠️</span>
              <h2 className="text-xl font-bold text-white">The Craft Advantage</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              <p>
                Work the same building for ten years and you get good at that building. Work forty
                different sites in the same ten years and you get good, period. You&apos;ll run into a
                unit older than you are, sitting right next to something installed last quarter.
                You&apos;ll see the same manufacturer&apos;s gear wired three different ways by three
                different contractors, and you&apos;ll figure out fast which one was done right.
              </p>
              <p>
                That kind of exposure makes you sharper, faster, than someone who&apos;s only ever
                seen one environment. You show up to a site nobody else wants, something&apos;s down,
                the facility manager is standing there — and you get it running. That&apos;s not
                abstract. That&apos;s a scoreboard you can see: it was down, now it&apos;s up, and
                you&apos;re the reason.
              </p>
            </div>
          </div>

          {/* Autonomy */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔑</span>
              <h2 className="text-xl font-bold text-white">Nobody&apos;s Standing Over Your Shoulder</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              <p>
                On site, you&apos;re it. There&apos;s no manager two cubicles over second-guessing every
                call. The facility is looking at you to make the decision, and you make it.
                That&apos;s a different kind of pressure than office politics — it&apos;s real, but
                it&apos;s clean. You own the job start to finish, and you don&apos;t have to fight
                anybody for credit when it goes right.
              </p>
            </div>
          </div>

          {/* Access */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🏢</span>
              <h2 className="text-xl font-bold text-white">What Most People Never See</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              <p>
                Most people will never stand on the floor of a hyperscale data center, walk the
                back-of-house of a hospital, or see inside a bank&apos;s core infrastructure room. You
                will — regularly, because someone decided you&apos;re trustworthy enough to be there.
                That&apos;s not a small thing. Facilities like that don&apos;t let just anyone near
                equipment that can&apos;t go down. Getting handed that kind of trust, over and over,
                on more sites than most people see in a lifetime, is its own kind of access.
              </p>
            </div>
          </div>

          {/* What the Road Costs */}
          <div className="card-dark p-6 border-amber-900/40">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎒</span>
              <h2 className="text-xl font-bold text-white">What the Road Costs</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              <p>
                None of this is free. You&apos;ll eat a lot of hotel breakfasts alone. You&apos;ll miss
                dinners, birthdays, a few things you wish you hadn&apos;t. That&apos;s real, and anyone
                who tells you otherwise is selling something.
              </p>
              <p>
                Here&apos;s what it also costs, physically: airport concourses at a jog because your
                gate changed, site walk-throughs that put more steps on your legs than most people
                log in a week, stairs when the elevator&apos;s the thing you&apos;re there to fix, a
                bag that never gets lighter.
              </p>
              <p>
                The people who last don&apos;t pretend that away. They plan around it. They use the
                drive time and the flight time on purpose — podcasts, planning the next three stops,
                or just sitting there and decompressing instead of doom-scrolling. They protect a few
                non-negotiables at home — a call every night, a trip they don&apos;t miss — and they
                let the job be the job the rest of the time instead of resenting it for not being a
                9-to-5.
              </p>
            </div>
          </div>

          {/* Where It Leads */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🚀</span>
              <h2 className="text-xl font-bold text-white">Where It Leads</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
              <p>
                Every site you save, every facility manager who remembers your name, every problem
                you solved that somebody else couldn&apos;t — that&apos;s a résumé nobody can fake.
                It&apos;s the kind of experience that turns into senior tech, commissioning work,
                sales engineering, running a crew, training the next generation, or eventually your
                own service company. Customers don&apos;t remember the logo on your shirt nearly as
                well as they remember who actually showed up and fixed it.
              </p>
              <p>
                And underneath all of it is the plain version of why this job holds people: you keep
                things online. Hospitals stay open. Data centers stay up. Plants keep running. When
                you pack up and drive away, the building works because you were there. That doesn&apos;t
                get old.
              </p>
            </div>
          </div>

          {/* Who this is for */}
          <div className="card-dark p-8">
            <h2 className="text-xl font-bold text-white mb-4">This Life Fits You If…</h2>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex gap-2.5">
                <span className="text-blue-400 mt-0.5">—</span>
                You&apos;d rather see forty sites than master one.
              </li>
              <li className="flex gap-2.5">
                <span className="text-blue-400 mt-0.5">—</span>
                You want to be the tech who shows up prepared, not the one who just talks the loudest.
              </li>
              <li className="flex gap-2.5">
                <span className="text-blue-400 mt-0.5">—</span>
                A rental car and a rotating diet of gas-station coffee sounds like part of the job, not a complaint.
              </li>
              <li className="flex gap-2.5">
                <span className="text-blue-400 mt-0.5">—</span>
                You want a network, not just a paycheck.
              </li>
              <li className="flex gap-2.5">
                <span className="text-blue-400 mt-0.5">—</span>
                You&apos;re fine being the expert in the room, and fine answering for it when things go wrong.
              </li>
            </ul>
            <p className="text-sm text-gray-400 leading-relaxed mt-5">
              If that sounds like more of what you already are than something you&apos;d have to
              become — you already know this life fits.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <h2 className="text-lg font-bold text-white mb-3">
              The life starts with the fundamentals.
            </h2>
            <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
              Every career track on this platform starts with the same electrical and safety
              foundation the field actually runs on. Build that first.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/login" className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors">
                Start Training Free →
              </Link>
              <Link href="/courses" className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold text-sm transition-colors">
                See All 29 Career Tracks
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
