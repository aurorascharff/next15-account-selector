import Link from 'next/link';
import React from 'react';
import { getCurrentAccount } from '@/data/services/account';
import Skeleton from './ui/Skeleton';

function DashboardItem({ children, isPro }: { children: React.ReactNode; isPro?: boolean }) {
  return (
    <li>
      <Link
        href="#"
        className="group flex w-full items-center justify-between gap-2 rounded bg-gray-light p-4 dark:bg-gray-dark"
      >
        <span className="group-hover:underline">{children}</span>
        <span>{isPro && '☆'}</span>
      </Link>
    </li>
  );
}

export default async function Dashboard() {
  const account = await getCurrentAccount();
  const isPro = account?.plan === 'pro';

  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl"> Welcome, {account?.name}!</h1>
        <h2 className="text-sm">What are you working on today?</h2>
      </div>
      <ul className="flex grid-cols-2 flex-col gap-4 sm:grid dark:bg-gray-dark">
        <DashboardItem>Feature 1</DashboardItem>
        <DashboardItem>Feature 2</DashboardItem>
        <DashboardItem>Feature 3</DashboardItem>
        {isPro && (
          <>
            <DashboardItem isPro>Pro Feature 1 </DashboardItem>
            <DashboardItem isPro>Pro Feature 2</DashboardItem>
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
