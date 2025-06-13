import React from 'react';
import { cn } from '@/utils/cn';

type Props = {
  className?: string;
};

export default function Skeleton({ className }: Props) {
  return (
    <div className={cn('flex-1', className)}>
      <div className="liquid-glass skeleton-animation mb-2 h-3 w-10 rounded-xs backdrop-blur-sm" />
      <div className="liquid-glass skeleton-animation mb-2 h-4 rounded-xs backdrop-blur-sm" />
      <div className="liquid-glass skeleton-animation mb-2 h-4 rounded-xs backdrop-blur-sm" />
      <div className="liquid-glass skeleton-animation mb-2 h-2 w-12 rounded-xs backdrop-blur-sm" />
      <div className="liquid-glass skeleton-animation mb-2 h-2 w-20 rounded-xs backdrop-blur-sm" />
    </div>
  );
}
