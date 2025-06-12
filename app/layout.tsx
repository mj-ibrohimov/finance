import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryProvider } from '@/components/query-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FinanceHub - Professional Financial Analysis Platform',
  description: 'Advanced financial analysis platform with real-time data, expert insights, and comprehensive market intelligence.',
  keywords: 'finance, stocks, analysis, trading, market data, financial news',
  authors: [{ name: 'FinanceHub Team' }],
  openGraph: {
    title: 'FinanceHub - Professional Financial Analysis Platform',
    description: 'Advanced financial analysis platform with real-time data, expert insights, and comprehensive market intelligence.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <QueryProvider>
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}