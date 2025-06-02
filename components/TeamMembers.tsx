import { Plus } from 'lucide-react';
import React from 'react';
import { getCurrentAccount } from '@/data/services/account';
import { cn } from '@/utils/cn';
import Card from './ui/Card';
import { StarMarker } from './ui/StarMarker';

export default async function TeamMembers() {
  const account = await getCurrentAccount();
  const isPro = account?.plan === 'pro';
  if (!isPro) {
    return null;
  }

  return (
    <Card className="flex flex-col">
      <h2>
        Team members <StarMarker />
      </h2>
      <div className="flex gap-4 overflow-auto">
        <ul className="flex gap-4 overflow-auto">
          <TeamMember className="text-primary-variant-1" />
          <TeamMember className="text-primary-variant-2" />
          <TeamMember className="text-primary" />
          <TeamMember className="text-primary-darker" />
          <TeamMember className="text-primary-variant-3" />
        </ul>
        <button className="hover:bg-gray focus-visible:outline-primary size-12 cursor-pointer rounded-full bg-black p-1 text-white focus-visible:outline-2 focus-visible:-outline-offset-3 md:size-16 md:p-3 dark:bg-white dark:text-black">
          <span className="sr-only">Add team member</span>
          <Plus aria-hidden="true" width={40} height={40} />
        </button>
      </div>
    </Card>
  );
}

function TeamMember({ className, ...otherProps }: { className?: string }) {
  return (
    <li>
      <span className="sr-only">Team member</span>
      <svg
        {...otherProps}
        aria-hidden="true"
        className={cn('size-12 md:size-16', className)}
        height={80}
        width={80}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_126_2775)">
          <rect width="80" height="80" rx="40" fill="white" />
          <rect x="24" y="13" width="32" height="32" rx="16" fill="currentColor" />
          <rect x="-20" y="53" width="120" height="120" rx="60" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clip0_126_2775">
            <rect width="80" height="80" rx="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </li>
  );
}
