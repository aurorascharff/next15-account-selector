import Link from 'next/link';
import React from 'react';
import { getCurrentAccount } from '@/data/services/account';
import { ProMarker } from './ProMarker';
import Skeleton from './ui/Skeleton';

export default async function Dashboard() {
  const account = await getCurrentAccount();

  return (
    <div className="flex flex-col gap-8 px-4">
      <div className="mt-4 flex flex-col gap-2">
        <h1 className="text-3xl"> Welcome, {account?.name}!</h1>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-base">What would you like to manage today?</h2>
        <ul className="flex grid-cols-2 flex-col gap-x-8 gap-y-4 sm:grid">
          <DashboardItem>Create New Project</DashboardItem>
          <DashboardItem>View Task Board</DashboardItem>
          <DashboardItem>Manage Team Members</DashboardItem>
          {account?.plan === 'pro' && (
            <>
              <DashboardItem plan="pro">Access Advanced Project Insights</DashboardItem>
              <DashboardItem plan="pro">Set Custom Workflows</DashboardItem>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

function DashboardItem({ children, plan }: { children: React.ReactNode; plan?: string }) {
  return (
    <li>
      <Link
        href="#"
        className="group border-gray hover:bg-gray-light focus-visible:outline-primary flex w-full items-center justify-between gap-2 rounded-sm border p-4 focus-visible:outline-2 dark:border-white dark:hover:bg-neutral-800"
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
