import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Vistagram',
  description: 'Capture a POI and share it with the world.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-950/60 border-b border-gray-200/70 dark:border-gray-800">
          <div className="container flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 shadow-sm" />
              <h1 className="brand text-xl font-bold tracking-tight">
                Vistagram
              </h1>
            </div>
          </div>
        </header>
        <main className="container py-6 space-y-6">{children}</main>
      </body>
    </html>
  );
}
