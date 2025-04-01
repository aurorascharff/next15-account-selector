import React from 'react';
import { getCurrentAccount } from '@/data/services/account';

export default async function Dashboard() {
  const account = await getCurrentAccount();
  const isPro = account?.plan === 'pro';

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl"> Welcome, {account?.name}!</h1>
        <h2 className="text-lg">What are you working on today?</h2>
      </div>
      <ul className="flex flex-col gap-2 bg-gray-light p-4">
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
        {isPro && (
          <>
            <li>Pro Feature 1 ☆</li>
            <li>Pro Feature 2 ☆</li>
          </>
        )}
      </ul>
    </div>
  );
}
