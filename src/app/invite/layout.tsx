import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accept Invitation — Mastering Field Service',
  robots: { index: false },
};

export default function InviteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
