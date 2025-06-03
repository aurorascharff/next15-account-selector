import { Mail, Phone, VideoIcon } from 'lucide-react';
import React, { Suspense } from 'react';
import AccountCircle, { AccountCircleSkeleton } from '@/components/AccountCircle';
import AccountSelector, { AccountSelectorSkeleton } from '@/components/AccountSelector';
import Dashboard, { DashboardSkeleton } from '@/components/Dashboard';
import FocusedProject, { FocusedProjectSkeleton } from '@/components/FocusedProject';
import Card from '@/components/ui/Card';
import Divider from '@/components/ui/Divider';
import IconButton from '@/components/ui/IconButton';
import { getAccounts, getCurrentAccount } from '@/data/services/auth';

export default async function RootPage() {
  const accounts = getAccounts();
  const currentAccount = getCurrentAccount();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex w-full flex-col items-start md:w-1/2">
          <div className="flex flex-row flex-wrap items-center justify-center gap-6 md:justify-start">
            <Suspense fallback={<AccountCircleSkeleton />}>
              <AccountCircle />
            </Suspense>
            <Suspense fallback={<AccountSelectorSkeleton />}>
              <AccountSelector accountsPromise={accounts} currentAccountPromise={currentAccount} />
            </Suspense>
          </div>
          <AccountActionButtons />
        </Card>
        <Card className="flex w-full flex-col justify-start gap-4 md:w-1/2">
          <h1 className="text-xl md:text-2xl">Focused project</h1>
          <Suspense fallback={<FocusedProjectSkeleton />}>
            <FocusedProject />
          </Suspense>
        </Card>
      </div>
      <Divider theme="primary" />
      <div className="flex flex-col gap-4">
        <Suspense fallback={<DashboardSkeleton />}>
          <Dashboard />
        </Suspense>
      </div>
    </div>
  );
}

function AccountActionButtons() {
  return (
    <div className="flex gap-5 text-white dark:text-black">
      <IconButton name="Send message">
        <Mail width={20} height={20} />
      </IconButton>
      <IconButton name="Start video call">
        <VideoIcon width={20} height={20} />
      </IconButton>
      <IconButton name="Start phone call">
        <Phone width={20} height={20} />
      </IconButton>
    </div>
  );
}
