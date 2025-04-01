'use client';

import { useRouter } from 'next/navigation';
import React, { use, useOptimistic, useTransition } from 'react';
import { setCurrentAccount } from '@/data/actions/account';
import Button from './ui/Button';
import Skeleton from './ui/Skeleton';
import Spinner from './ui/Spinner';
import type { Account } from '@prisma/client';

type Props = {
  accountsPromise: Promise<Account[]>;
  currentAccountPromise: Promise<Account | null>;
};

export default function AccountSelector({ accountsPromise, currentAccountPromise }: Props) {
  const accounts = use(accountsPromise);
  const currentAccount = use(currentAccountPromise);
  const [optimisticAccount, setOptimisticAccount] = useOptimistic(currentAccount);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return accounts.length > 0 ? (
    <div className="border-primary flex flex-col gap-4 border p-4">
      <span>Account Selector</span>
      <div className="flex gap-2">
        <span>
          Current Account: {optimisticAccount?.name} - {optimisticAccount?.plan}
        </span>
        {isPending && <Spinner />}
      </div>
      <ul className="flex flex-col gap-2">
        {accounts.map(account => {
          return (
            <li key={account.id}>
              <Button
                disabled={optimisticAccount?.id === account.id}
                onClick={() => {
                  startTransition(async () => {
                    // Opting out of suspense for dashboard
                    setOptimisticAccount(account);
                    await setCurrentAccount(account.id);
                    // Why don't I need a second startTransition here?
                    router.push('/');
                  });
                }}
              >
                {account.name} - {account.plan}
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <div>
      <h1>No accounts found</h1>
    </div>
  );
}

export function AccountSelectorSkeleton() {
  return (
    <div className="border-primary border p-4">
      <Skeleton />
    </div>
  );
}
