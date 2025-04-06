import 'server-only';

import { cookies } from 'next/headers';

export async function isAuthenticated() {
  const selectedAccountId = (await cookies()).get('selectedAccountId')?.value;
  if (!selectedAccountId) {
    return false;
  }
  return true;
}
