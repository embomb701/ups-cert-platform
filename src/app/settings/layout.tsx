import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings — Mastering Field Service',
  robots: { index: false },
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
