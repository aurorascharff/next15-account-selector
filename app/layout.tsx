import './globals.css';

import { Geist } from 'next/font/google';
import Button from '@/components/ui/Button';
import { logIn } from '@/data/actions/account';
import { hasSelectedAccount } from '@/data/services/account';
import { cn } from '@/utils/cn';
import type { Metadata } from 'next';

const GeistSans = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next.js 15 Async Select with Ariakit and React 19',
  title: 'Next.js 15 Async Select',
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
