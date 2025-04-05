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
      <div className="px-4">
        <Suspense fallback={<AccountSelectorSkeleton />}>
          <AccountSelector accountsPromise={accounts} currentAccountPromise={currentAccount} />
        </Suspense>
      </div>
      <Divider theme="primary" />
      <div className="flex flex-col gap-4 px-4">
        <div className="mt-4 flex flex-col gap-2">
          <Suspense fallback={<WelcomeMessageSkeleton />}>
            <WelcomeMessage />
          </Suspense>
        </div>
        <div className="@container flex flex-col gap-4">
          <h2 className="dark:text-gray text-base text-gray-500">What are you working on?</h2>
          <Suspense fallback={<DashboardSkeleton />}>
            <Dashboard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
