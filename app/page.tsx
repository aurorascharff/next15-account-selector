import React, { Suspense } from 'react';
import AccountSelector, { AccountSelectorSkeleton } from '@/components/AccountSelector';
import Dashboard from '@/components/Dashboard';
import Skeleton from '@/components/ui/Skeleton';
import { getAccounts, getCurrentAccount } from '@/data/services/account';

export default async function RootPage() {
  const accounts = getAccounts();
  const currentAccount = getCurrentAccount();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between p-4">
        <Suspense fallback={<AccountSelectorSkeleton />}>
          <AccountSelector accountsPromise={accounts} currentAccountPromise={currentAccount} />
        </Suspense>
      </div>
      <div className="h-[1px] bg-primary" />
      <Suspense fallback={<Skeleton />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
