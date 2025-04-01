import React, { Suspense } from 'react';
import AccountSelector, { AccountSelectorSkeleton } from '@/components/AccountSelector';
import Dashboard from '@/components/Dashboard';
import Skeleton from '@/components/ui/Skeleton';
import { logOut } from '@/data/actions/account';
import { getAccounts, getCurrentAccount } from '@/data/services/account';

export default async function RootPage() {
  const accounts = getAccounts();
  const currentAccount = getCurrentAccount();

  return (
    <div className="flex flex-col gap-4">
      <form action={logOut}>
        <button type="submit">Log out</button>
      </form>
      <Suspense fallback={<AccountSelectorSkeleton />}>
        <AccountSelector accountsPromise={accounts} currentAccountPromise={currentAccount} />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
