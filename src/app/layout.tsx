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
    'Professional field service training and certification from FA Consulting and Recruiting. 28 career tracks — UPS, HVAC, Solar, Data Center, Elevator, Marine, BAS, PLC, Biomedical, and more — built on a shared electrical foundation, by Francis Aiello.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Mastering Field Service Training Portal',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masteringfse.com'}/api/og`,
        width: 1200,
        height: 630,
        alt: 'Mastering Field Service Training Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masteringfse.com'}/api/og`],
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
          {process.env.NEXT_PUBLIC_BETA_MODE !== 'false' && (
            <div className="w-full bg-amber-500 text-black text-center text-xs font-semibold py-2 px-4">
              ⚠ This site is currently in beta and not yet open to the public. Features and content are still being developed.
            </div>
          )}
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
