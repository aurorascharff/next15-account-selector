'use client';

import { EllipsisVertical, ChevronDown, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { use, useState } from 'react';
import { toast as sonnerToast } from 'sonner';
import type { ToastType } from '@/types/toast';
import { cn } from '@/utils/cn';
import { Toast } from './toast/Toast';
import Divider from './ui/Divider';
import Spinner from './ui/Spinner';
import { StarMarker } from './ui/StarMarker';
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

  const toast = (message: string, type: ToastType) => {
    sonnerToast.custom(id => {
      return <Toast id={id as string} type={type} message={message} />;
    });
  };

  const handleSwitchAccount = async (account: Account) => {
    setExpanded(false);
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
      toast(body.error, 'error');
      setCurrentAccount(previousAccount);
    } else {
      toast('Account changed successfully!', 'success');
      router.refresh();
    }
  };

  return (
    <div className="relative">
      <div className="mb-2 font-bold">ACCOUNT</div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => {
            return setExpanded(!expanded);
          }}
          className={cn(
            'flex items-center gap-2',
            'bg-primary hover:bg-primary-dark border-primary flex items-center gap-2 rounded-2xl border px-4 py-2 text-nowrap text-white shadow-md outline-offset-1 focus-visible:outline focus-visible:-outline-offset-4 focus-visible:outline-white',
            expanded &&
              'focus-visible:outline-primary hover:bg-card bg-white text-black focus-visible:outline-2 focus-visible:-outline-offset-1',
          )}
        >
          {currentAccount?.name}
          <ChevronDown
            aria-hidden="true"
            width={16}
            height={16}
            className={cn('ml-1 transition-transform', expanded && 'rotate-180')}
          />
        </button>
        {isPending && <Spinner />}
      </div>
      {expanded && (
        <div className="border-divider focus-visible:outline-primary dark:border-divider-dark absolute top-20 flex w-[257px] flex-col gap-2 rounded-sm border bg-white shadow-lg -outline-offset-1 focus-visible:outline-2 dark:bg-black">
          <div className="flex items-start justify-between px-3 py-2 text-lg">
            <div className="flex flex-col gap-2">
              <span className="font-semibold">{currentAccount?.name}</span>
              <span className="flex gap-2 text-sm capitalize italic">
                {currentAccount?.plan} plan ({currentAccount?.type}){currentAccount?.plan === 'pro' && <StarMarker />}
              </span>
            </div>
            <div className="hover:outline-primary mt-2 cursor-pointer rounded-full p-1 hover:outline">
              <span className="sr-only">Account options</span>
              <EllipsisVertical aria-hidden="true" width={16} height={16} />
            </div>
          </div>
          <Divider />
          {accounts.map(account => {
            return (
              <button
                className="hover:bg-card disabled:text-gray dark:hover:bg-card-dark focus-visible:bg-primary mx-2 flex items-center justify-between gap-4 rounded-md px-4 py-2 focus-visible:text-white"
                key={account.id}
                disabled={account.inactive}
                onClick={() => {
                  return handleSwitchAccount(account);
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
                {account.id === currentAccount?.id && (
                  <span>
                    <span className="sr-only">Active account</span>
                    <Check aria-hidden="true" width={18} height={18} />
                  </span>
                )}
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
