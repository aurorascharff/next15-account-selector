import './globals.css';

import { Geist } from 'next/font/google';
import { Suspense } from 'react';
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
      <body className={cn(GeistSans.className, 'relative min-h-screen overflow-hidden')}>
        {/* Background with gradient and effects */}
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            // eslint-disable-next-line quotes
            backgroundImage: "url('https://picsum.photos/1920/1080?random=1')",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Animated background elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-white/5 blur-3xl" />
          <div
            className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/5 blur-3xl"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-blue-400/5 blur-2xl"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <main className="relative z-10 mb-12 flex grow flex-col p-4 sm:p-10 xl:px-40 2xl:px-96">
          <Suspense>
            <Toaster />
          </Suspense>
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
