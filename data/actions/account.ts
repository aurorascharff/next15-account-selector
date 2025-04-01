'use server';

import { cookies } from 'next/headers';
import { slow } from '@/utils/slow';

export async function setCurrentAccount(accountId: string) {
  await slow();

  (await cookies()).set('selectedAccountId', accountId);
}

export async function logOut() {
  (await cookies()).delete('selectedAccountId');
}

export async function logIn(name: string) {
  if (name === 'John Doe') {
    (await cookies()).set('selectedAccountId', 'a833bc10-64dd-4069-8573-4bbb4b0065ed');
  }
  if (name === 'Jane Smith') {
    (await cookies()).set('selectedAccountId', '9e525f6f-b60e-4258-8c30-c289619525d6');
  }
}
