'use client';

import * as Ariakit from '@ariakit/react';

import React, { use, useOptimistic, useTransition } from 'react';
import { logOut, setCurrentAccount } from '@/data/actions/account';
import { ProMarker } from './ProMarker';
import Divider from './ui/Divider';
import SelectButton from './ui/SelectButton';
import Spinner from './ui/Spinner';
import { ActionIcon } from './ui/icons/ActionIcon';
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

  return (
    <div>
      <Ariakit.SelectProvider value={optimisticAccount?.id}>
        <Ariakit.SelectLabel className="mb-2 font-bold">ACCOUNT</Ariakit.SelectLabel>
        <div className="flex items-center gap-4">
          <Ariakit.Select
            aria-busy={isPending}
            className="group flex items-center gap-2 aria-expanded:bg-white aria-expanded:text-black"
            render={<SelectButton />}
          >
            {optimisticAccount?.name}
            <Ariakit.SelectArrow className="transition-transform group-aria-expanded:rotate-180" />
          </Ariakit.Select>
          {isPending && <Spinner />}
        </div>
        <Ariakit.SelectPopover
          gutter={8}
          className="border-gray-light focus-visible:outline-primary dark:border-gray-dark flex flex-col gap-2 rounded-sm border bg-white shadow-lg -outline-offset-1 focus-visible:outline-2 dark:bg-black"
        >
          <div className="flex items-start justify-between px-3 py-2 text-lg">
            <div className="flex flex-col gap-2">
              {optimisticAccount?.name}
              <span className="flex gap-2 text-sm capitalize italic">
                {optimisticAccount?.plan} plan ({optimisticAccount?.type})
                <ProMarker plan={optimisticAccount?.plan} />
              </span>
            </div>
            <Ariakit.SelectItem className="data-active-item:outline-primary mt-2 cursor-pointer rounded-full p-1 data-active-item:outline">
              <span className="sr-only">Account options</span>
              <ActionIcon aria-hidden="true" width={16} height={16} />
            </Ariakit.SelectItem>
          </div>
          <Divider />
          {accounts.map(account => {
            return (
              <Ariakit.SelectItem
                className="data-active-item:bg-gray-light aria-disabled:text-gray mx-2 flex items-center justify-between gap-4 rounded-md px-4 py-2 dark:data-active-item:bg-neutral-800"
                key={account.id}
                value={account.id}
                disabled={account.inactive}
                onClick={() => {
                  if (optimisticAccount?.id === account.id) {
                    return;
                  }
                  startTransition(async () => {
                    setOptimisticAccount(account);
                    await setCurrentAccount(account.id);
                  });
                }}
              >
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span>
                      {account.name} {account.inactive && '(inactive)'}{' '}
                    </span>
                    <ProMarker plan={account.plan} />
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
            className="aria-disabled:text-gray self-end px-2 pb-2 aria-disabled:italic not-aria-disabled:data-active-item:underline"
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
      <span className="mb-2 font-bold">ACCOUNT</span>
      <button disabled className="border-gray text-gray rounded-2xl border px-4 py-2">
        Loading...
      </button>
    </div>
  );
}
