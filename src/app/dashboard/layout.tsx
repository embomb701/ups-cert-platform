import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard — Mastering Field Service',
  robots: { index: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
