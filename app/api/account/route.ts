import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { slow } from '@/utils/slow';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  await slow();

  const accountId = await request.json();

  // Simulate failure for a specific account ID
  if (accountId === 'd71ab200-18ed-4384-a4a7-a907bf169c9f') {
    return NextResponse.json({ error: 'This account is currently inactive.' }, { status: 400 });
  }

  (await cookies()).set('selectedAccountId', accountId);

  return NextResponse.json({ message: 'Account switched' }, { status: 200 });
}
