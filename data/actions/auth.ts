'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { toast } from '../utils/toast';

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
    const error = 'No account found with this email address.';
    return toast.error(error);
  }

  (await cookies()).set('selectedAccountId', account?.id);
}
