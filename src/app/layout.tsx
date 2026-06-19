import type { Metadata } from 'next';
import { Inter, Barlow_Semi_Condensed, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/components/auth/AuthProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Industrial, signage-style display face for headings — reads like a trade
// nameplate / spec sheet.
const display = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

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
    <html
      lang="en"
      className={`h-full ${inter.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="h-full flex flex-col bg-carbon-950 text-gray-200 antialiased">
        {/* Ambient blueprint backdrop — fixed so it stays put while scrolling. */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-grid-blueprint bg-[size:44px_44px]"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-carbon-radial"
        />
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
