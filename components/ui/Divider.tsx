import React from 'react';
import { cn } from '@/utils/cn';

export default function Divider({ theme = 'gray' }: { theme?: 'primary' | 'gray' }) {
  return <div className={cn('h-[1px]', theme === 'gray' ? 'bg-gray-light dark:bg-gray-dark' : 'bg-primary')} />;
}
