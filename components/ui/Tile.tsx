import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
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
      className="focus-visible:outline-primary dark:bg-section flex h-full w-full items-center justify-between gap-4 rounded-xl bg-white px-8 py-6 hover:underline focus-visible:outline-2"
    >
      <div className="s-10">{icon}</div>
      <div className="flex flex-grow flex-col gap-3">
        <span>
          <span className="mr-2 uppercase">{heading}</span>
          {starred && <StarMarker />}
        </span>
        <span className="text-sm">{children}</span>
      </div>
      <ChevronRight width={20} height={20} className="flex-shrink-0 text-black dark:text-white" />
    </Link>
  );
}
