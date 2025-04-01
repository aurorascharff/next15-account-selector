import './globals.css';

import { Geist } from 'next/font/google';
import Button from '@/components/ui/Button';
import { logIn } from '@/data/actions/account';
import { hasSelectedAccount } from '@/data/services/account';
import { cn } from '@/utils/cn';
import type { Metadata } from 'next';

const GeistSans = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Account Selector using Server Functions, React 19 and Ariakit',
  title: 'Next.js 15 Account Selector',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const selectedAccount = await hasSelectedAccount();

  return (
    <html lang="en">
      <body className={cn(GeistSans.className, 'p-4 sm:p-10 md:px-40 xl:px-96')}>
        {selectedAccount ? (
          children
        ) : (
          <form className="place-self-center" action={logIn.bind(null, 'John Doe')}>
            <Button>Log in as John Doe</Button>
          </form>
        )}
      </body>
    </html>
  );
}
