// Career tracks being scoped for a future full curriculum build. Deliberately
// kept out of COURSES (src/data/courses.ts) — that array is threaded through
// purchase flow, the signed-in training dashboard, sitemap generation, and
// exam routing, none of which should treat a not-yet-built track as real.
// This is just enough data to show an honest "coming soon" teaser card on
// the public catalog page.

export interface UpcomingCourse {
  id: string;
  title: string;
  tagline: string;
  color: 'blue' | 'orange' | 'teal' | 'amber' | 'violet' | 'yellow' | 'green' | 'sky' | 'rose' | 'cyan' | 'emerald';
}

export const UPCOMING_COURSES: UpcomingCourse[] = [
  {
    id: 'boiler-tech',
    title: 'Boiler Technician / Stationary Engineer',
    tagline: 'Operate and maintain commercial and industrial boiler plants — combustion, steam and hydronic systems, ASME/NBIC code compliance, and city/state stationary engineer licensing pathways.',
    color: 'orange',
  },
  {
    id: 'ic-tech',
    title: 'Instrumentation & Calibration Technician',
    tagline: 'Calibrate and troubleshoot process instrumentation — pressure, temperature, level, and flow transmitters, loop checks, and ISA-standard documentation for process industries.',
    color: 'violet',
  },
  {
    id: 'structured-cabling',
    title: 'Structured Cabling & Data Center Technician',
    tagline: 'Install and certify structured cabling and data center infrastructure — fiber and copper termination, TIA-942 standards, cable management, and BICSI certification pathways.',
    color: 'cyan',
  },
];
