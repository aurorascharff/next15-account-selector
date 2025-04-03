import { cookies } from 'next/headers';
import { unauthorized } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';

export async function isAuthenticated() {
  const selectedAccountId = (await cookies()).get('selectedAccountId')?.value;
  if (!selectedAccountId) {
    return false;
  }
  return true;
}

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

export const getCurrentAccount = cache(async () => {
  await slow(1000);

  const selectedAccountId = (await cookies()).get('selectedAccountId')?.value;
  if (!selectedAccountId) {
    unauthorized();
  }

  const account = await prisma.account.findUnique({
    where: {
      id: selectedAccountId,
    },
  });

  if (!account) {
    unauthorized();
  }
  return account;
});
