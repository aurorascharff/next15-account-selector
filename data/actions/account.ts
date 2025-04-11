'use server';

import { cookies } from 'next/headers';
import { slow } from '@/utils/slow';
import { toast } from '../utils/toast';

export async function setCurrentAccount(accountId: string) {
  await slow();

  // Simulate failure for a specific account ID
  if (accountId === 'd71ab200-18ed-4384-a4a7-a907bf169c9f') {
    const error = 'The selected account is currently inactive.';
    await toast.error(error);
    return {
      error: error,
    };
  }

  (await cookies()).set('selectedAccountId', accountId);
  await toast.success('Account changed successfully!');
}
