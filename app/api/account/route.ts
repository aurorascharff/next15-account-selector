import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAccount } from '@/data/services/auth';
import { slow } from '@/utils/slow';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  await slow();

  const accountId = await request.json();
  const account = await getAccount(accountId);

  if (account.inactive) {
    return NextResponse.json({ error: 'This account is currently inactive.' }, { status: 400 });
  }

  (await cookies()).set('selectedAccountId', accountId);

  return NextResponse.json({ message: 'Account switched' }, { status: 200 });
}
