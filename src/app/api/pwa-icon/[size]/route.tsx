import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

// Maskable PWA install icons — referenced by manifest.ts. Next's
// icon.tsx/apple-icon.tsx conventions only cover browser-tab and iOS
// home-screen sizes, not the 192/512 sizes the Web App Manifest spec
// wants for install prompts, so those are served from here instead.
export async function GET(_req: NextRequest, { params }: { params: Promise<{ size: string }> }) {
  const { size: sizeParam } = await params;
  const size = sizeParam === '512' ? 512 : 192;
  const iconSize = Math.round(size * 0.55);

  return new ImageResponse(
    (
      <div
        style={{
          width: `${size}px`, height: `${size}px`,
          background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="white">
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
