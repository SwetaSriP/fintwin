import type { Metadata } from 'next';
import './globals.css';
import './phase2.css';
import './dashboard-pages.css';
import './theme-rebrand.css';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'FinTwin | Your financial life, understood',
  description: 'A calm command center for your financial future.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Providers>{children}</Providers></body></html>;
}
