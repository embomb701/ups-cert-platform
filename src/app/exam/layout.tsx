import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exam — Mastering Field Service',
  robots: { index: false },
};

export default function ExamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
