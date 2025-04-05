import Link from 'next/link';
import React from 'react';
import { getCurrentAccount } from '@/data/services/account';
import { ProMarker } from './ProMarker';
import Skeleton from './ui/Skeleton';
import { ChevronIcon } from './ui/icons/ChevronIcon';

export default async function Dashboard() {
  const account = await getCurrentAccount();

  return (
    <div className="@container">
      <ul className="flex grid-cols-2 flex-col gap-x-8 gap-y-4 @-lg:grid">
        <DashboardItem heading="Create New Project">
          Start a new project and organize your tasks efficiently.
        </DashboardItem>
        <DashboardItem heading="View Task Board">
          Keep track of your tasks and monitor progress in one place.
        </DashboardItem>
        <DashboardItem heading="Manage Team Members">
          Add, remove, or update team members and their roles.
        </DashboardItem>
        {account?.plan === 'pro' ? (
          <>
            <DashboardItem heading="Access Advanced Project Insights" plan="pro">
              Gain deeper insights into your projects with advanced analytics.
            </DashboardItem>
            <DashboardItem heading="Set Custom Workflows" plan="pro">
              Customize workflows to suit your team&apos;s unique needs.
            </DashboardItem>
          </>
        ) : (
          <DashboardItem heading="Upgrade to Pro" plan="pro">
            Unlock advanced features and tools for better project management.
          </DashboardItem>
        )}
      </ul>
    </div>
  );
}

function DashboardItem({ children, plan, heading }: { children: React.ReactNode; plan?: string; heading: string }) {
  return (
    <li>
      <Link
        href="#"
        className="group hover:bg-primary-light bg-primary-lighter focus-visible:outline-primary dark:bg-neutral dark:hover:bg-neutral-light flex h-full w-full items-center justify-between gap-4 rounded-sm px-8 py-4 focus-visible:outline-2"
      >
        <div className="flex flex-grow flex-col gap-2">
          <span>
            <span className="mr-2 font-semibold uppercase group-hover:underline">{heading}</span>
            <ProMarker plan={plan} />
          </span>
          <span className="text-sm">{children}</span>
        </div>
        <ChevronIcon width={16} height={16} className="flex-shrink-0 -rotate-90 text-black dark:text-white" />
      </Link>
    </li>
  );
}

export function DashboardSkeleton() {
  return (
    <ul className="flex grid-cols-2 flex-col gap-x-8 gap-y-4 @-lg:grid">
      <Skeleton />
      <Skeleton />
    </ul>
  );
}
