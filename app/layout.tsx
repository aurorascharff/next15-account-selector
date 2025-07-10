import './globals.css';

import { Geist } from 'next/font/google';
import { Toaster } from '@/components/toast/Toaster';
import SubmitButton from '@/components/ui/SubmitButton';
import KeyPressed from '@/components/utils/KeyPressed';
import { logIn } from '@/data/actions/auth';
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
      <body className={cn(GeistSans.className, '3xl:px-96 mb-12 flex grow flex-col p-4 sm:p-10 xl:px-40 2xl:px-80')}>
        <main>
          <Toaster />
          {isAuth ? (
            children
          ) : (
            <div className="flex flex-col items-center justify-center pt-20">
              <form action={logIn.bind(null, 'jane.smith@work.com')}>
                <SubmitButton>Log in as Jane Smith</SubmitButton>
              </form>
            </div>
          )}
        </main>
        <KeyPressed />
      </body>
    </html>
  );
}
