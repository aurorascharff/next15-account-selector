'use server';

import { cookies } from 'next/headers';
import { getAccount } from '../services/account';

export async function setCurrentAccount(accountId: string) {
  const account = await getAccount(accountId);

  if (account.inactive) {
    const error = 'The selected account is currently inactive.';
    return {
      error,
    };
  }

  (await cookies()).set('selectedAccountId', accountId);
}
