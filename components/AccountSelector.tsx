'use client';

import * as Ariakit from '@ariakit/react';
import { useRouter } from 'next/navigation';
import React, { use, useOptimistic, useTransition } from 'react';
import { logOut, setCurrentAccount } from '@/data/actions/account';
import { cn } from '@/utils/cn';
import { button } from './ui/Button';
import Spinner from './ui/Spinner';
import type { Account } from '@prisma/client';

type Props = {
  accountsPromise: Promise<Account[]>;
  currentAccountPromise: Promise<Account | null>;
};

export default function AccountSelector({ accountsPromise, currentAccountPromise }: Props) {
  const accounts = use(accountsPromise);
  const currentAccount = use(currentAccountPromise);
  console.log('currentAccount', currentAccount);
  const [optimisticAccount, setOptimisticAccount] = useOptimistic(currentAccount);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div>
      <Ariakit.SelectProvider defaultValue={currentAccount?.id}>
        <Ariakit.SelectLabel>ACCOUNT</Ariakit.SelectLabel>
        <div className="flex items-center gap-4">
          <Ariakit.Select
            className={cn(
              button({
                className:
                  'group flex items-center gap-2 rounded-xl outline-offset-1 aria-expanded:bg-white aria-expanded:text-black aria-expanded:outline-primary aria-expanded:hover:bg-gray-light aria-expanded:focus:outline-offset-1',
                theme: 'primary',
              }),
            )}
          >
            {optimisticAccount?.name}
            <Ariakit.SelectArrow className="transition-transform group-aria-expanded:rotate-180" />
          </Ariakit.Select>
          {isPending && <Spinner />}
        </div>
        <Ariakit.SelectPopover gutter={4} className="flex flex-col gap-2 bg-white shadow-md">
          <Ariakit.SelectHeading className="flex flex-col gap-2 px-3 py-2 text-lg">
            {optimisticAccount?.name}
            <span className="text-sm">{optimisticAccount?.email}</span>
            <span className="text-sm italic">{optimisticAccount?.plan}</span>
          </Ariakit.SelectHeading>
          <div className="h-[1px] bg-gray" />
          <Ariakit.SelectList>
            {accounts.map(account => {
              return (
                <Ariakit.SelectItem
                  className="flex items-center gap-4 rounded-md px-4 py-2 ring-primary hover:bg-gray-100 focus:ring-2"
                  key={account.id}
                  value={account.id}
                  onClick={() => {
                    if (optimisticAccount?.id === account.id) {
                      return;
                    }
                    startTransition(async () => {
                      // Opting out of suspense for dashboard
                      setOptimisticAccount(account);
                      await setCurrentAccount(account.id);
                      router.push('/');
                    });
                  }}
                >
                  <div className="flex flex-col">
                    <span>{account.name}</span>
                    <span className="text-sm">{account.email}</span>
                    <span className="text-sm italic">{account.plan}</span>
                  </div>
                  <Ariakit.SelectItemCheck />
                </Ariakit.SelectItem>
              );
            })}
          </Ariakit.SelectList>
          <div className="h-[1px] bg-gray" />
          <form className="self-end px-2 pb-1" action={logOut}>
            <button className="hover:underline" type="submit">
              Log out
            </button>
          </form>
        </Ariakit.SelectPopover>
      </Ariakit.SelectProvider>
    </div>
  );
}

export function AccountSelectorSkeleton() {
  return (
    <div className="flex w-fit flex-col">
      ACCOUNT
      <button disabled className="rounded border border-gray-light px-3 py-2 text-gray">
        Loading accounts...
      </button>
    </div>
  );
}
