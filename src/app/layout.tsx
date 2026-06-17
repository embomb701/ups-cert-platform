import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/components/auth/AuthProvider';

export const metadata: Metadata = {
  title: {
    default: 'Mastering FSE — UPS Field Service Certification',
    template: '%s | Mastering FSE',
  },
  description:
    'Professional UPS field service certification and training. Junior FSE Exam ($200) and Proctored FSE Exam ($500) based on Mastering Uninterruptible Power Supplies, Field Service Engineering.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Mastering FSE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
