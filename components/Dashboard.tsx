import Link from 'next/link';
import React from 'react';
import { getCurrentAccount } from '@/data/services/account';
import { ProMarker } from './ProMarker';
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
            <DashboardItem plan="pro">Access Advanced Analytics</DashboardItem>
            <DashboardItem plan="pro">Priority Support</DashboardItem>
          </>
        )}
      </ul>
    </div>
  );
}

function DashboardItem({ children, plan }: { children: React.ReactNode; plan?: string }) {
  return (
    <li>
      <Link
        href="#"
        className="group border-gray bg-primary-lighter hover:bg-primary-light focus-visible:outline-primary flex w-full items-center justify-between gap-2 rounded-sm p-4 focus-visible:outline-2 dark:bg-neutral-900 dark:hover:bg-neutral-800"
      >
        <span className="group-hover:underline">{children}</span>
        <ProMarker plan={plan} />
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
