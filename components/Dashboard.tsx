import React from 'react';
import { getCurrentAccount } from '@/data/services/account';

export default async function Dashboard() {
  const account = await getCurrentAccount();

  return (
    <div className="border-gray border p-4">
      Dashboard
      <span>Account: {account?.name}</span>
      <span>Plan: {account?.plan}</span>
      {account?.plan === 'free' && <p>Free plan</p>}
      {account?.plan === 'pro' && <p>Pro plan</p>}
    </div>
  );
}
