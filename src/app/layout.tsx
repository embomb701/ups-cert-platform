import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/components/auth/AuthProvider';

export const metadata: Metadata = {
  title: {
    default: 'Field Service Engineering Academy — UPS Field Service Certification',
    template: '%s | FSE Academy',
  },
  description:
    'Professional UPS field service certification and training from FA Consulting and Recruiting. Junior FSE Exam and Proctored FSE Exam based on Mastering Uninterruptible Power Supplies, Field Service Engineering by Francis Aiello.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Field Service Engineering Academy',
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
