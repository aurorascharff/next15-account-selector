'use client';

import { Check, TriangleAlert, X } from 'lucide-react';
import { startTransition } from 'react';
import { toast as sonnerToast } from 'sonner';
import { dismissToast } from '@/data/actions/toast';
import type { ToastType } from '@/types/toast';
import { cn } from '@/utils/cn';
import { LiquidButton } from '../LiquidButton';
import { LiquidGlass } from '../LiquidGlass';

type Props = {
  message: string;
  id: string;
  type: ToastType;
};

export function Toast({ message, id, type }: Props) {
  return (
    <LiquidGlass
      variant="card"
      intensity="medium"
      className={cn(
        'flex items-center justify-between gap-4 px-6 py-3 text-sm',
        type === 'error' && 'border-red-400/30 bg-red-500/20 text-red-100',
        type === 'success' && 'border-green-400/30 bg-green-500/20 text-green-100',
      )}
    >
      {type === 'success' ? (
        <Check aria-hidden="true" width={16} height={16} />
      ) : (
        <TriangleAlert aria-hidden="true" width={16} height={16} />
      )}
      <span className="sr-only">{type}</span>
      <p className="flex-1">{message}</p>
      <LiquidButton
        variant="ghost"
        size="sm"
        className="!rounded-full !p-1"
        onClick={() => {
          startTransition(async () => {
            sonnerToast.dismiss(id);
            await dismissToast(id);
          });
        }}
      >
        <span className="sr-only">Close</span>
        <X
          width={16}
          height={16}
          aria-hidden="true"
          className={cn(type === 'error' && 'text-red-200', type === 'success' && 'text-green-200')}
        />
      </LiquidButton>
    </LiquidGlass>
  );
}
