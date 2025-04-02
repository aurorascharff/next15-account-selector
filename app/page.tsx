import React, { Suspense } from 'react';
import AccountSelector, { AccountSelectorSkeleton } from '@/components/AccountSelector';
import Dashboard, { DashboardSkeleton } from '@/components/Dashboard';
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
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
