import { Calendar, LayoutDashboard, Plus, Users, Wrench } from 'lucide-react';
import React from 'react';
import { getCurrentAccount } from '@/data/services/account';
import TeamMembers from './TeamMembers';
import Card from './ui/Card';
import Skeleton from './ui/Skeleton';
import Tile from './ui/Tile';

export default async function Actions() {
  const account = await getCurrentAccount();
  const isPro = account?.plan === 'pro';

  return (
    <>
      {isPro && <TeamMembers />}
      <Card className="@container flex flex-col">
        <h2>Actions</h2>
        <ul className="flex grid-cols-2 flex-col gap-x-8 gap-y-4 @-lg:grid">
          <li>
            <Tile href="#" icon={<Plus width={30} height={30} />} heading="Create New Project">
              Start a new project and organize your tasks
            </Tile>
          </li>
          <li>
            <Tile href="#" icon={<Calendar width={30} height={30} />} heading="Schedule">
              View your calendar
            </Tile>
          </li>
          <li>
            <Tile href="#" icon={<LayoutDashboard width={30} height={30} />} heading="View Task Board">
              Keep track of your tasks and monitor progress in one place
            </Tile>
          </li>
          {isPro && (
            <li>
              <Tile href="#" icon={<Users width={30} height={30} />} heading="Manage Team Members" starred>
                Add, remove or update team members and their roles
              </Tile>
            </li>
          )}
          <li>
            <Tile href="#" icon={<Wrench width={30} height={30} />} heading="Settings">
              View and manage your account settings
            </Tile>
          </li>
        </ul>
      </Card>
    </>
  );
}

export function ActionsSkeleton() {
  return (
    <div className="@container px-10 py-20">
      <ul className="flex grid-cols-2 flex-col gap-x-10 gap-y-4 @-lg:grid">
        <Skeleton />
        <Skeleton />
      </ul>
    </div>
  );
}
