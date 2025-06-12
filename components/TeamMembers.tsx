import { Plus } from 'lucide-react';
import React from 'react';
import { getCurrentAccount } from '@/data/services/auth';
import { cn } from '@/utils/cn';
import { LiquidButton } from './LiquidButton';
import { LiquidGlass } from './LiquidGlass';
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
        <LiquidButton
          variant="ghost"
          size="lg"
          className="flex size-12 items-center justify-center !rounded-full border-2 border-dashed border-white/30 !p-0 hover:border-white/50 md:size-16"
        >
          <span className="sr-only">Add team member</span>
          <Plus aria-hidden="true" width={24} height={24} className="md:h-8 md:w-8" />
        </LiquidButton>
      </div>
    </Card>
  );
}

function TeamMember({ className, ...otherProps }: { className?: string }) {
  return (
    <li tabIndex={-1}>
      <span className="sr-only">Team member</span>
      <LiquidGlass variant="button" className="size-12 overflow-hidden rounded-full md:size-16">
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
      </LiquidGlass>
    </li>
  );
}
