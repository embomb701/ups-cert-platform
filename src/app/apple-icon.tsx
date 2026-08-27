import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '180px', height: '180px', borderRadius: '40px',
          background: 'linear-gradient(135deg, #ce480c, #06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <svg width="100" height="100" viewBox="0 0 24 24" fill="white">
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
