import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { COURSES } from '@/data/courses';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('course') ?? '';
  const course = COURSES.find((c) => c.id === courseId);

  const title = course?.title ?? 'Mastering Field Service';
  const tagline = course?.tagline ?? 'Professional Field Service Training & Certification';
  const certTitle = course?.certTitle ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0c0a09 0%, #1c1917 60%, #2e160a 100%)',
          padding: '64px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #f97316, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          </div>
          <span style={{ color: '#78716c', fontSize: '16px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Mastering Field Service Training Portal
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: '#fafaf9', fontSize: '52px', fontWeight: '800', lineHeight: '1.1', maxWidth: '900px' }}>
            {title}
          </div>
          <div style={{ color: '#a8a29e', fontSize: '22px', lineHeight: '1.4', maxWidth: '820px' }}>
            {tagline}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {certTitle && (
              <div style={{
                background: 'rgba(37,99,235,0.25)', border: '1px solid rgba(59,130,246,0.4)',
                borderRadius: '8px', padding: '8px 16px',
                color: '#93c5fd', fontSize: '14px', fontWeight: '600',
              }}>
                {certTitle}
              </div>
            )}
            <span style={{ color: '#57534e', fontSize: '14px' }}>Verified by employers · Self-paced</span>
          </div>
          <div style={{ color: '#44403c', fontSize: '14px' }}>fse-academy.com</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
