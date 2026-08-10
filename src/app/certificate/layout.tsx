import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certificate — Mastering Field Service',
  robots: { index: false },
};

export default function CertificateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
