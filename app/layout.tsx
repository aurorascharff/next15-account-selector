import './globals.css';

import { Geist } from 'next/font/google';
import { Toaster } from 'sonner';
import SubmitButton from '@/components/ui/SubmitButton';
import KeyPressed from '@/components/utils/KeyPressed';
import { isAuthenticated } from '@/data/services/auth';
import { cn } from '@/utils/cn';
import type { Metadata } from 'next';

const GeistSans = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next.js 15 Account Selector using Server Functions, React 19 and Ariakit',
  title: 'Next.js 15 Account Selector',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isAuth = await isAuthenticated();

  return (
    <html lang="en">
      <body className={cn(GeistSans.className, 'mb-12 flex grow flex-col p-4 sm:p-10 xl:px-40 2xl:px-96')}>
        <main>
          <Toaster position="top-right" />
          {isAuth ? (
            children
          ) : (
            <div className="flex flex-col items-center justify-center pt-20">
              <SubmitButton>Log in as Jane Smith</SubmitButton>
            </div>
          )}
        </main>
        <KeyPressed />
      </body>
    </html>
  );
}
