import React from 'react';
import { getCurrentAccount } from '@/data/services/account';
import Skeleton from './ui/Skeleton';

export default async function Dashboard() {
  const account = await getCurrentAccount();
  const isPro = account?.plan === 'pro';

  return (
    <div className="flex flex-col gap-4 px-4">
      <div>
        <h1 className="text-3xl"> Welcome, {account?.name}!</h1>
        <h2 className="text-lg">What are you working on today?</h2>
      </div>
      <ul className="grid grid-cols-2 gap-2 *:rounded *:bg-gray-light *:p-2 dark:bg-gray-dark">
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

export function DashboardSkeleton() {
  return (
    <div className="px-4">
      <Skeleton />
    </div>
  );
}
