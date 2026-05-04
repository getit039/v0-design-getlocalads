import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { cn } from '../lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GetLocalAds - Local Ads. Real Results.',
  description: 'The unified network connecting buyers and sellers across homes, jobs, cars, events and more. AI-powered local classifieds.',
  generator: 'v0.app',
  keywords: ['classifieds', 'local ads', 'homes for sale', 'jobs', 'cars', 'apartments', 'rentals', 'events'],
};

export const viewport: Viewport = {
  themeColor: '#0a0a12',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'antialiased min-h-screen bg-background text-foreground'
        )}
        suppressHydrationWarning
      >
        <main>{children}</main>
        <Toaster closeButton position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
