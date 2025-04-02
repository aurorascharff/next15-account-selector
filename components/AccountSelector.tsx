'use client';

import * as Ariakit from '@ariakit/react';
import { useRouter } from 'next/navigation';
import React, { use, useOptimistic, useTransition } from 'react';
import { logOut, setCurrentAccount } from '@/data/actions/account';
import { cn } from '@/utils/cn';
import { button } from './ui/Button';
import Divider from './ui/Divider';
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
  const router = useRouter();

  return (
    <div>
      <Ariakit.SelectProvider defaultValue={currentAccount?.id}>
        <Ariakit.SelectLabel className="mb-2 font-bold">ACCOUNT</Ariakit.SelectLabel>
        <div className="flex items-center gap-4">
          <Ariakit.Select
            className={cn(
              button({
                className:
                  'group flex items-center gap-2 rounded-xl outline-offset-1 aria-expanded:bg-white aria-expanded:text-black aria-expanded:outline-1 aria-expanded:-outline-offset-2 aria-expanded:outline-primary aria-expanded:hover:bg-gray-light aria-expanded:focus:-outline-offset-2 aria-expanded:dark:bg-black aria-expanded:dark:text-white aria-expanded:dark:hover:bg-gray-dark',
                theme: 'primary',
              }),
            )}
          >
            {optimisticAccount?.name}
            <Ariakit.SelectArrow className="transition-transform group-aria-expanded:rotate-180" />
          </Ariakit.Select>
          {isPending && <Spinner />}
        </div>
        <Ariakit.SelectPopover
          gutter={8}
          className="flex flex-col gap-2 rounded border border-gray-light bg-white shadow-lg dark:border-gray-dark dark:bg-black"
        >
          <div className="flex items-start justify-between px-3 py-2 text-lg">
            <div className="flex flex-col gap-2">
              {optimisticAccount?.name}
              <span className="text-sm capitalize italic">
                {optimisticAccount?.plan} plan {optimisticAccount?.plan === 'pro' ? '☆' : ''}
              </span>
            </div>
            <button className="mt-2">
              <ActionIcon width={16} height={16} />
            </button>
          </div>
          <Divider />
          {accounts.map(account => {
            return (
              <Ariakit.SelectItem
                className="mx-2 flex items-center gap-4 rounded-md px-4 py-2 outline-none outline-offset-0 hover:bg-gray-light focus:outline focus:outline-primary dark:hover:bg-gray-dark"
                key={account.id}
                value={account.id}
                onClick={() => {
                  if (optimisticAccount?.id === account.id) {
                    return;
                  }
                  startTransition(async () => {
                    setOptimisticAccount(account);
                    await setCurrentAccount(account.id);
                    router.push('/');
                  });
                }}
              >
                <div className="flex flex-col">
                  <span>{account.name}</span>
                  <span className="text-sm">{account.email}</span>
                </div>
                <Ariakit.SelectItemCheck />
              </Ariakit.SelectItem>
            );
          })}
          <Divider />
          <form className="self-end px-2 pb-2" action={logOut}>
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
      <span className="mb-2 font-bold">ACCOUNT</span>
      <button disabled className="rounded-xl border border-gray px-3 py-[7px] text-gray">
        Loading...
      </button>
    </div>
  );
}
