'use client';

import { Check, TriangleAlert, X } from 'lucide-react';
import { startTransition } from 'react';
import { toast as sonnerToast } from 'sonner';
import { dismissToast } from '@/data/actions/toast';
import type { ToastType } from '@/types/toast';
import { cn } from '@/utils/cn';

type Props = {
  message: string;
  id: string;
  type: ToastType;
};

export function Toast({ message, id, type }: Props) {
  return (
    <div
      className={cn(
        type === 'error' && 'bg-red-100 text-red-700',
        type === 'success' && 'bg-green-100 text-green-700',
        'flex items-center justify-between gap-4 rounded-xl px-6 py-3 text-sm shadow-md',
      )}
    >
      {type === 'success' ? (
        <Check aria-hidden="true" width={16} height={16} />
      ) : (
        <TriangleAlert aria-hidden="true" width={16} height={16} />
      )}
      <span className="sr-only">{type}</span>
      <p>{message}</p>
      <button
        className="rounded-full p-1 hover:outline"
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
          className={cn(type === 'error' && 'text-red-700', type === 'success' && 'text-green-700')}
        />
      </button>
    </div>
  );
}
