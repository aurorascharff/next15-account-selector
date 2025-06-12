import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { LiquidGlass } from '../LiquidGlass';
import { StarMarker } from './StarMarker';

type Props = {
  children: React.ReactNode;
  starred?: boolean;
  heading: string;
  href: string;
  icon?: React.ReactNode;
};

export default function Tile({ children, starred, href, heading, icon }: Props) {
  return (
    <Link
      href={href}
      className="block h-full w-full rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
    >
      <LiquidGlass
        variant="card"
        intensity="medium"
        className="flex h-full w-full items-center justify-between gap-4 px-8 py-6 transition-all duration-200 hover:scale-[1.02]"
      >
        <div className="s-10">{icon}</div>
        <div className="flex flex-grow flex-col gap-3">
          <span>
            <span className="mr-2 text-white uppercase">{heading}</span>
            {starred && <StarMarker />}
          </span>
          <span className="text-sm text-white/80">{children}</span>
        </div>
        <ChevronRight width={20} height={20} className="flex-shrink-0 text-white" />
      </LiquidGlass>
    </Link>
  );
}
