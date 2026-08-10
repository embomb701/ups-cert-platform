import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account — Mastering Field Service',
  robots: { index: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
