'use server';

import { cookies } from 'next/headers';
import { getAccount } from '../services/account';
import { toast } from '../utils/toast';

export async function setCurrentAccount(accountId: string) {
  const account = await getAccount(accountId);

  if (account.inactive) {
    const error = 'The selected account is currently inactive.';
    await toast.error(error);
    return {
      error,
    };
  }

  (await cookies()).set('selectedAccountId', accountId);
}
