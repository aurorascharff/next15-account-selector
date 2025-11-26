'use server';

import { refresh } from 'next/cache';
import { cookies } from 'next/headers';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { getAccount } from '../services/auth';

export async function switchAccount(accountId: string) {
  const account = await getAccount(accountId);

  if (account.inactive) {
    const error = 'The selected account is currently inactive.';
    return {
      error,
    };
  }

  (await cookies()).set('selectedAccountId', accountId);
  refresh();
}

export async function logOut() {
  await slow();

  (await cookies()).delete('selectedAccountId');
}

export async function logIn(email: string) {
  await slow();

  const account = await prisma.account.findFirst({
    where: {
      email: email,
    },
  });

  if (!account) {
    throw new Error('No account found with this email address.');
  }

  (await cookies()).set('selectedAccountId', account?.id);
}
