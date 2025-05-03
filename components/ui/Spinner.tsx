import { LoaderCircle } from 'lucide-react';
import React from 'react';
import { cn } from '@/utils/cn';

type Props = {
  className?: string;
  width?: number;
  height?: number;
};

export default function Spinner({ className, width = 20, height = 20 }: Props) {
  return (
    <div className={cn('text-gray h-fit w-fit animate-spin', className)}>
      <LoaderCircle aria-hidden="true" width={width} height={height} />
    </div>
  );
}
