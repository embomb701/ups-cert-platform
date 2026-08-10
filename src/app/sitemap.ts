import type { MetadataRoute } from 'next';
import { COURSES } from '@/data/courses';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masteringfse.com';

const HUB_ROUTES: Record<string, string> = {
  ups: '/training/ups', kitchen: '/training/kitchen', hvac: '/training/hvac',
  generator: '/training/generator', solar: '/training/solar', battery: '/training/battery',
  datacenter: '/training/datacenter', 'dc-ops': '/training/dc-ops', dcplants: '/training/dcplants',
  evcharging: '/training/evcharging', 'industrial-ref': '/training/industrial-ref',
  'building-cx': '/training/building-cx', telecom: '/training/telecom',
  'critical-environment': '/training/critical-environment',
  dcengineer: '/training/dcengineer', marine: '/training/marine', pool: '/training/pool',
  'hvac-tech': '/training/hvac-tech', 'solar-inst': '/training/solar-inst',
  'wind-tech': '/training/wind-tech', 'elevator-tech': '/training/elevator-tech',
  'fire-alarm-tech': '/training/fire-alarm-tech', 'bmet-tech': '/training/bmet-tech',
  'bas-tech': '/training/bas-tech', 'ref-tech': '/training/ref-tech',
  'plc-tech': '/training/plc-tech', 'security-tech': '/training/security-tech',
  'field-pm': '/training/field-pm', 'pump-tech': '/training/pump-tech',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/courses`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/certifications/junior`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/certifications/ai-proctored`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/certifications/proctored`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/certifications/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/employers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/employers/packages`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/jobs`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${SITE_URL}/verify`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/book`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/login`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // One entry per course hub page
  const coursePages: MetadataRoute.Sitemap = COURSES
    .filter((c) => HUB_ROUTES[c.id])
    .map((c) => ({
      url: `${SITE_URL}${HUB_ROUTES[c.id]}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [...staticPages, ...coursePages];
}
