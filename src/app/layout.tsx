import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/components/auth/AuthProvider';

export const metadata: Metadata = {
  title: {
    default: '[PLATFORM NAME] — UPS Field Service Certification',
    template: '%s | [PLATFORM NAME]',
  },
  description:
    'Professional UPS field service certification and training. Junior FSC Exam ($200) and Proctored FSC Exam ($500) based on Mastering Uninterruptible Power Supplies, Field Service Engineering.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: '[PLATFORM NAME]',
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
