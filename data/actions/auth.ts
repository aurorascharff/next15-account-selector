'use server';

import { cookies } from 'next/headers';
import { slow } from '@/utils/slow';

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
