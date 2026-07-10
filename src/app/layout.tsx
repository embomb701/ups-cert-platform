import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/components/auth/AuthProvider';

export const metadata: Metadata = {
  title: {
    default: 'Mastering Field Service Training Portal — Field Service Career Training & Certification',
    template: '%s | Mastering Field Service',
  },
  description:
    'Professional field service training and certification from FA Consulting and Recruiting. UPS and Commercial Kitchen FSE programs based on Mastering Uninterruptible Power Supplies, Field Service Engineering by Francis Aiello.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Mastering Field Service Training Portal',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${inter.variable}`}>
      <body className="h-full flex flex-col font-sans">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
