import React from 'react';
import { cn } from '@/utils/cn';
import { LiquidGlass } from '../LiquidGlass';

export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <LiquidGlass variant="card" intensity="medium" className={cn(className, 'gap-6 p-4 md:p-8')}>
      {children}
    </LiquidGlass>
  );
}
