import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

// IBM Plex — designed for IBM's engineering/technical documentation, not a
// generic startup face. Reads as "credential" and "datasheet," which fits a
// trade-certification platform better than the default Inter-everywhere
// look. Plex Mono is used for stat figures and prices (tabular-feeling
// numbers), Plex Sans for everything else.
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister';

export const metadata: Metadata = {
  title: {
    default: 'Mastering Field Service Training Portal — Field Service Career Training & Certification',
    template: '%s | Mastering Field Service',
  },
  description:
    'Professional field service training and certification from Mastering Field Service. 30 career tracks — UPS, HVAC, Solar, Data Center, Elevator, Marine, BAS, PLC, Biomedical, and more — built on a shared electrical foundation, by Francis Aiello.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Mastering Field Service Training Portal',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com'}/api/og`,
        width: 1200,
        height: 630,
        alt: 'Mastering Field Service Training Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fse-academy.com'}/api/og`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${plexSans.variable} ${plexMono.variable}`}>
      <body className="h-full flex flex-col font-sans">
        <ServiceWorkerRegister />
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
