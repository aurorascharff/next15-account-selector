import 'server-only';

import { cookies } from 'next/headers';
import { unauthorized } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function getAccounts() {
  await slow(2000);

  const accounts = await prisma.account.findMany({
    orderBy: {
      inactive: 'asc',
    },
  });

  if (accounts.length === 0) {
    throw new Error('No accounts found, run seed script');
  }

  return accounts;
}

export const getAccount = cache(async (accountId: string) => {
  await slow(1000);

  const account = await prisma.account.findUnique({
    where: {
      id: accountId,
    },
  });

  if (!account) {
    unauthorized();
  }
  return account;
});

export const getCurrentAccount = cache(async () => {
  const selectedAccountId = (await cookies()).get('selectedAccountId')?.value;
  if (!selectedAccountId) {
    unauthorized();
  }

  return getAccount(selectedAccountId);
});

export const isAuthenticated = cache(async () => {
  const selectedAccountId = (await cookies()).get('selectedAccountId')?.value;
  if (!selectedAccountId) {
    return false;
  }
  return true;
});
