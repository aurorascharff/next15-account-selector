'use server';

import { cookies } from 'next/headers';
import { slow } from '@/utils/slow';
import { getAccount } from '../services/account';
import { toast } from '../utils/toast';

export async function setCurrentAccount(accountId: string) {
  await slow();

  const account = await getAccount(accountId);

  if (account.inactive) {
    const error = 'The selected account is currently inactive.';
    await toast.error(error);
    return {
      error,
    };
  }

  (await cookies()).set('selectedAccountId', accountId);
  await toast.success('Account changed successfully!');
}
