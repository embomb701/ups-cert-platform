import { COURSE_SEQUENCES } from '@/data';

// ---------------------------------------------------------------
// Course stats surfaced on cards (training hub, course hub header).
// Derived entirely from content that already exists — no new data
// entry required per course. Time estimate assumes ~7 minutes per
// slide (reading + key points + embedded quiz), rounded to the
// nearest half hour so it reads like a real duration, not a formula.
// ---------------------------------------------------------------

export interface CourseStats {
  totalModules: number;
  totalSlides: number;
  estimatedHours: number;
}

const MINUTES_PER_SLIDE = 7;

export function getCourseStats(accessKey: string): CourseStats {
  const seq = COURSE_SEQUENCES[accessKey] ?? [];
  const totalModules = seq.length;
  const totalSlides = seq.reduce((sum, m) => sum + m.slides.length, 0);
  const totalMinutes = totalSlides * MINUTES_PER_SLIDE;
  const estimatedHours = totalMinutes === 0 ? 0 : Math.max(0.5, Math.round((totalMinutes / 60) * 2) / 2);
  return { totalModules, totalSlides, estimatedHours };
}

export function formatHours(hours: number): string {
  if (hours === 0) return '—';
  return Number.isInteger(hours) ? `${hours} hr` : `${hours} hr`;
}
