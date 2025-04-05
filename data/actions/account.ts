'use server';

import { cookies } from 'next/headers';
import { slow } from '@/utils/slow';

export async function setCurrentAccount(accountId: string) {
  await slow();

  // Simulate failure for a specific account ID
  if (accountId === 'd71ab200-18ed-4384-a4a7-a907bf169c9f') {
    return {
      error: 'This account is currently inactive.',
    };
  }

  (await cookies()).set('selectedAccountId', accountId);
}

export async function logOut() {
  await slow();

  (await cookies()).delete('selectedAccountId');
}

export async function logIn(email: string) {
  await slow();

  if (email === 'jane.smith@personal.com') {
    (await cookies()).set('selectedAccountId', 'a833bc10-64dd-4069-8573-4bbb4b0065ed');
  }
}
