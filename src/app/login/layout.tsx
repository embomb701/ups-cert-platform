import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — Mastering Field Service',
  description:
    'Sign in or create a free account to access field service training, certifications, and job opportunities on Mastering Field Service.',
  robots: { index: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
