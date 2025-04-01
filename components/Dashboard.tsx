import React from 'react';
import { getCurrentAccount } from '@/data/services/account';

export default async function Dashboard() {
  const account = await getCurrentAccount();
  const isPro = account?.plan === 'pro';

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1> Welcome, {account?.name}!</h1>
      <h2>Plan: {account?.plan}</h2>
      <ul className="flex flex-col gap-2 bg-gray-light p-4">
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
        {isPro && (
          <>
            <li>Pro Feature 1</li>
            <li>Pro Feature 2</li>
          </>
        )}
      </ul>
    </div>
  );
}
