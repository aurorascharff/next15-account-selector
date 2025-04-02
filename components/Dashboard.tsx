import Link from 'next/link';
import React from 'react';
import { getCurrentAccount } from '@/data/services/account';
import Skeleton from './ui/Skeleton';

export default async function Dashboard() {
  const account = await getCurrentAccount();
  const isPro = account?.plan === 'pro';

  return (
    <div className="flex flex-col gap-8 px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl"> Welcome, {account?.name}!</h1>
        <h2 className="text-sm">What are you working on today?</h2>
      </div>
      <ul className="flex grid-cols-2 flex-col gap-x-8 gap-y-4 sm:grid">
        <DashboardItem>View Reports</DashboardItem>
        <DashboardItem>Manage Team</DashboardItem>
        <DashboardItem>Update Settings</DashboardItem>
        {isPro && (
          <>
            <DashboardItem isPro>Access Advanced Analytics</DashboardItem>
            <DashboardItem isPro>Priority Support</DashboardItem>
          </>
        )}
      </ul>
    </div>
  );
}

function DashboardItem({ children, isPro }: { children: React.ReactNode; isPro?: boolean }) {
  return (
    <li>
      <Link
        href="#"
        className="group flex w-full items-center justify-between gap-2 rounded border-gray bg-primary-lighter p-4 hover:bg-primary-light focus:outline-2 focus:outline-primary dark:bg-neutral-900 dark:hover:bg-neutral-800"
      >
        <span className="group-hover:underline">{children}</span>
        <span className="text-yellow-500">{isPro && '★'}</span>
      </Link>
    </li>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="px-4">
      <Skeleton />
    </div>
  );
}
