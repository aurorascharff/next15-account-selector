import React from 'react';
import { cn } from '@/utils/cn';

export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn(className, 'bg-gray-light dark:bg-neutral gap-6 rounded-xl p-4 md:p-8')}>{children}</div>;
}
