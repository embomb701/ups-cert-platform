import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';
import { badgeTitleForExamLevel, badgeColorForExamLevel } from '@/lib/utils/badges';

export const runtime = 'edge';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ examLevel: string }> }) {
  const { examLevel } = await params;
  const title = badgeTitleForExamLevel(examLevel);
  const color = badgeColorForExamLevel(examLevel);
  const initials = title.replace(/^Jr\.\s*/, '').split(/\s+/).map((w) => w[0]).join('').slice(0, 3).toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: '512px',
          height: '512px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
        }}
      >
        <div
          style={{
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: `radial-gradient(circle at 35% 30%, ${color}, #0f172a 75%)`,
            border: `10px solid ${color}`,
            boxShadow: '0 0 0 6px #0f172a',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: '#0f172a',
              border: `4px solid white`,
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '56px',
              fontWeight: 800,
              fontFamily: 'system-ui, sans-serif',
              marginBottom: '18px',
            }}
          >
            {initials}
          </div>
          <div
            style={{
              display: 'flex',
              color: 'white',
              fontSize: '22px',
              fontWeight: 700,
              fontFamily: 'system-ui, sans-serif',
              textAlign: 'center',
              maxWidth: '320px',
              lineHeight: 1.25,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
