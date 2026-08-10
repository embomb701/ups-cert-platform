import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Candidate Search — Mastering Field Service',
  robots: { index: false },
};

export default function CandidatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
