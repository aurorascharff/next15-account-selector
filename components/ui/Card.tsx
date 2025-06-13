import React from 'react';
import { cn } from '@/utils/cn';

export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('liquid-glass gap-6 rounded-xl p-4 backdrop-blur-md md:p-8', className)}>{children}</div>;
}
