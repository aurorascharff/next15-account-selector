'use client';

import * as Ariakit from '@ariakit/react';
import { EllipsisVertical } from 'lucide-react';
import React, { use, useOptimistic, useTransition } from 'react';
import { logOut, switchAccount } from '@/data/actions/auth';
import Divider from './ui/Divider';
import SelectButton from './ui/SelectButton';
import Spinner from './ui/Spinner';
import { StarMarker } from './ui/StarMarker';
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
  const [logoutIsPending, startLogoutTransition] = useTransition();

  const handleSwitchAccount = async (account: Account) => {
    if (optimisticAccount?.id === account.id) {
      return;
    }
    startTransition(async () => {
      setOptimisticAccount(account);
      await switchAccount(account.id);
    });
  };

  return (
    <div>
      <Ariakit.SelectProvider value={optimisticAccount?.id}>
        <Ariakit.SelectLabel className="mb-2 font-bold text-white">ACCOUNT</Ariakit.SelectLabel>
        <div className="flex items-center gap-4">
          <Ariakit.Select aria-busy={isPending} className="group flex items-center gap-2" render={<SelectButton />}>
            {optimisticAccount?.name}
            <Ariakit.SelectArrow className="transition-transform group-aria-expanded:rotate-180" />
          </Ariakit.Select>
          {isPending && <Spinner />}
        </div>
        <Ariakit.SelectPopover
          gutter={8}
          render={<div className="liquid-glass rounded-2xl backdrop-blur-md" />}
          className="flex w-[257px] flex-col gap-2 text-white"
        >
          <div className="flex items-start justify-between px-3 py-2 text-lg">
            <div className="flex flex-col gap-2">
              <span className="font-semibold">{optimisticAccount?.name}</span>
              <span className="flex gap-2 text-sm capitalize italic">
                {optimisticAccount?.plan} plan ({optimisticAccount?.type})
                {optimisticAccount?.plan === 'pro' && <StarMarker />}
              </span>
            </div>
            <Ariakit.SelectItem className="liquid-glass mt-2 cursor-pointer rounded-full border border-white/20 bg-white/10 p-1 text-white transition-all duration-300 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50">
              <span className="sr-only">Account options</span>
              <EllipsisVertical aria-hidden="true" width={16} height={16} />
            </Ariakit.SelectItem>
          </div>
          <Divider />
          {accounts.map(account => {
            return (
              <Ariakit.SelectItem
                className="liquid-glass mx-2 flex items-center justify-between gap-4 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-white transition-all duration-300 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 disabled:cursor-not-allowed disabled:opacity-50"
                key={account.id}
                value={account.id}
                disabled={account.inactive}
                onClick={() => {
                  handleSwitchAccount(account);
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
                <Ariakit.SelectItemCheck />
              </Ariakit.SelectItem>
            );
          })}
          <Divider />
          <Ariakit.SelectItem
            aria-disabled={logoutIsPending}
            className="liquid-glass self-end border border-white/20 bg-white/10 px-2 pb-2 text-white transition-all duration-300 hover:bg-white/20 not-aria-disabled:hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 aria-disabled:cursor-not-allowed aria-disabled:text-white/50 aria-disabled:italic"
            onClick={() => {
              startLogoutTransition(async () => {
                await logOut();
              });
            }}
          >
            {logoutIsPending ? 'Logging out...' : 'Log out'}
          </Ariakit.SelectItem>
        </Ariakit.SelectPopover>
      </Ariakit.SelectProvider>
    </div>
  );
}

export function AccountSelectorSkeleton() {
  return (
    <div className="flex w-fit flex-col">
      <span className="mb-2 font-bold text-white">ACCOUNT</span>
      <button
        disabled
        className="liquid-glass cursor-not-allowed rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white opacity-50 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
      >
        Loading...
      </button>
    </div>
  );
}
