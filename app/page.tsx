import React, { Suspense } from 'react';
import AccountSelector, { AccountSelectorSkeleton } from '@/components/AccountSelector';
import Dashboard, { DashboardSkeleton } from '@/components/Dashboard';
import WelcomeMessage, { WelcomeMessageSkeleton } from '@/components/WelcomeMessage';
import Divider from '@/components/ui/Divider';
import { getAccounts, getCurrentAccount } from '@/data/services/account';

export default async function RootPage() {
  const accounts = getAccounts();
  const currentAccount = getCurrentAccount();

  return (
    <div className="flex flex-col gap-8">
      <Suspense fallback={<AccountSelectorSkeleton />}>
        <AccountSelector accountsPromise={accounts} currentAccountPromise={currentAccount} />
      </Suspense>
      <Divider theme="primary" />
      <div className="mt-2 flex flex-col gap-4">
        <Suspense fallback={<WelcomeMessageSkeleton />}>
          <WelcomeMessage />
        </Suspense>
        <h2 className="dark:text-gray mt-4 text-base text-gray-500">What are you working on?</h2>
        <Suspense fallback={<DashboardSkeleton />}>
          <Dashboard />
        </Suspense>
      </div>
    </div>
  );
}
