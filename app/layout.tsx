import './globals.css';

import { Geist } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import KeyPressed from '@/components/KeyPressed';
import SubmitButton from '@/components/ui/SubmitButton';
import { logIn } from '@/data/actions/auth';
import { isAuthenticated } from '@/data/services/auth';
import { cn } from '@/utils/cn';
import type { Metadata } from 'next';

const GeistSans = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Account Selector using Server Functions, React 19 and Ariakit',
  title: 'Next.js 15 Account Selector',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isAuth = await isAuthenticated();

  return (
    <html lang="en">
      <body className={cn(GeistSans.className, 'mb-12 flex grow flex-col p-4 sm:p-10 md:px-40 xl:px-96')}>
        <main>
          <Toaster position="top-right" />
          {isAuth ? (
            children
          ) : (
            <form className="place-self-center pt-20" action={logIn.bind(null, 'jane.smith@personal.com')}>
              <SubmitButton>Log in as Jane Smith</SubmitButton>
            </form>
          )}
        </main>
        <KeyPressed />
      </body>
    </html>
  );
}
