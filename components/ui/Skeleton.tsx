import React from 'react';
import { cn } from '@/utils/cn';
import { LiquidGlass } from '../LiquidGlass';

type Props = {
  className?: string;
};

export default function Skeleton({ className }: Props) {
  return (
    <div className={cn('flex-1', className)}>
      <LiquidGlass variant="default" intensity="low" className="skeleton-animation mb-2 h-3 w-10 rounded-xs" />
      <LiquidGlass variant="default" intensity="low" className="skeleton-animation mb-2 h-4 rounded-xs" />
      <LiquidGlass variant="default" intensity="low" className="skeleton-animation mb-2 h-4 rounded-xs" />
      <LiquidGlass variant="default" intensity="low" className="skeleton-animation mb-2 h-2 w-12 rounded-xs" />
      <LiquidGlass variant="default" intensity="low" className="skeleton-animation mb-2 h-2 w-20 rounded-xs" />
    </div>
  );
}
