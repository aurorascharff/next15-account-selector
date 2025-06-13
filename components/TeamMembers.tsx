import { Plus } from 'lucide-react';
import React from 'react';
import { getCurrentAccount } from '@/data/services/auth';
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
        <button className="liquid-glass flex size-12 items-center justify-center !rounded-full rounded-lg border border-2 border-dashed border-white/20 border-white/30 bg-white/10 !p-0 px-6 py-3 text-lg text-white transition-all duration-300 hover:border-white/50 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 md:size-16">
          <span className="sr-only">Add team member</span>
          <Plus aria-hidden="true" width={24} height={24} className="md:h-8 md:w-8" />
        </button>
      </div>
    </Card>
  );
}

function TeamMember({ className, ...otherProps }: { className?: string }) {
  return (
    <li tabIndex={-1}>
      <span className="sr-only">Team member</span>
      <div className="liquid-glass size-12 cursor-pointer overflow-hidden rounded-full backdrop-blur-md md:size-16">
        <svg
          {...otherProps}
          aria-hidden="true"
          className={cn('size-full', className)}
          height={80}
          width={80}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_126_2775)">
            <rect width="80" height="80" rx="40" fill="rgba(255, 255, 255, 0.1)" />
            <rect x="24" y="13" width="32" height="32" rx="16" fill="currentColor" />
            <rect x="-20" y="53" width="120" height="120" rx="60" fill="currentColor" />
          </g>
          <defs>
            <clipPath id="clip0_126_2775">
              <rect width="80" height="80" rx="40" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </li>
  );
}
