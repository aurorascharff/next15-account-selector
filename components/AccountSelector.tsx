'use client';

import { useRouter } from 'next/navigation';
import React, { use, useState } from 'react';
import toast from 'react-hot-toast';
import { cn } from '@/utils/cn';
import Divider from './ui/Divider';
import Spinner from './ui/Spinner';
import { StarMarker } from './ui/StarMarker';
import { ActionIcon } from './ui/icons/ActionIcon';
import { ChevronIcon } from './ui/icons/ChevronIcon';
import type { Account } from '@prisma/client';

type Props = {
  accountsPromise: Promise<Account[]>;
  currentAccountPromise: Promise<Account | null>;
};

export default function AccountSelector({ accountsPromise, currentAccountPromise }: Props) {
  const accounts = use(accountsPromise);
  const currentAccountResolved = use(currentAccountPromise);
  const [currentAccount, setCurrentAccount] = useState<Account | null>(currentAccountResolved);
  const [isPending, setIsPending] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  return (
    <div className="relative">
      <div className="mb-2 font-bold">ACCOUNT</div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            return setExpanded(!expanded);
          }}
          className={cn(
            'bg-primary hover:bg-primary-dark border-primary flex items-center gap-2 rounded-2xl border px-4 py-2 text-white shadow-md outline-offset-1 focus:outline focus:-outline-offset-4 focus:outline-white',
            expanded &&
              'focus:outline-primary hover:bg-gray-light bg-white text-black focus:outline-2 focus:-outline-offset-1',
          )}
        >
          {currentAccount?.name}
          <ChevronIcon
            aria-hidden="true"
            width={10}
            height={10}
            className={cn('ml-1 transition-transform', expanded && 'rotate-180')}
          />
        </button>
        {isPending && <Spinner />}
      </div>
      {expanded && (
        <div className="border-gray-light focus-visible:outline-primary dark:border-gray-dark absolute top-20 flex w-[257px] flex-col gap-2 rounded-sm border bg-white shadow-lg -outline-offset-1 focus-visible:outline-2 dark:bg-black">
          <div className="flex items-start justify-between px-3 py-2 text-lg">
            <div className="flex flex-col gap-2">
              <span className="font-semibold">{currentAccount?.name}</span>
              <span className="flex gap-2 text-sm capitalize italic">
                {currentAccount?.plan} plan ({currentAccount?.type}){currentAccount?.plan === 'pro' && <StarMarker />}
              </span>
            </div>
            <div className="hover:outline-primary mt-2 cursor-pointer rounded-full p-1 hover:outline">
              <span className="sr-only">Account options</span>
              <ActionIcon aria-hidden="true" width={16} height={16} />
            </div>
          </div>
          <Divider />
          {accounts.map(account => {
            return (
              <button
                disabled={account.inactive}
                key={account.id}
                className="hover:bg-gray-light disabled:text-gray dark:hover:bg-neutral focus-visible:bg-primary dark:focus-visible:bg-primary mx-2 flex items-center justify-between gap-4 rounded-md px-4 py-2 focus-visible:text-white"
                onClick={async () => {
                  if (currentAccount?.id === account.id) {
                    return;
                  }
                  setIsPending(true);
                  const previousAccount = currentAccount;
                  setCurrentAccount(account);
                  const response = await fetch('/api/account', {
                    body: JSON.stringify(account.id),
                    method: 'POST',
                  });
                  setIsPending(false);
                  if (!response.ok) {
                    const body = await response.json();
                    toast.error(body.error);
                    setCurrentAccount(previousAccount);
                  } else {
                    router.refresh();
                  }
                }}
              >
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="font-semibold">
                      {account.name} {account.inactive && '(inactive)'}{' '}
                    </span>
                    {account?.plan === 'pro' && <StarMarker />}
                  </div>
                  <span className="text-sm">{account.email}</span>
                </div>
              </button>
            );
          })}
          <Divider />
        </div>
      )}
    </div>
  );
}

export function AccountSelectorSkeleton() {
  return (
    <div className="flex w-fit flex-col">
      <span className="mb-2 font-bold">ACCOUNT</span>
      <button disabled className="border-gray text-gray rounded-2xl border px-4 py-2">
        Loading...
      </button>
    </div>
  );
}
