import './globals.css';
import { Inter } from 'next/font/google';

import Button from '@/components/ui/Button';
import { logIn } from '@/data/actions/account';
import { hasSelectedAccount } from '@/data/services/account';
import { cn } from '@/utils/cn';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Next.js App Router Starter',
  title: 'Next.js App Router starter with ESLint, Prettier, and Tailwind',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const selectedAccount = await hasSelectedAccount();

  if (selectedAccount) {
    return children;
  }

  return (
    <html lang="en">
      <body className={cn(inter.className, 'h-svh')}>
        {selectedAccount ? (
          children
        ) : (
          <form action={logIn.bind(null, 'John Doe')}>
            <Button>Log in as John Doe</Button>
          </form>
        )}
      </body>
    </html>
  );
}
