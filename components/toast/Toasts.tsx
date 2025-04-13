'use client';

import { startTransition, useEffect, useOptimistic, useState } from 'react';
import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';
import { dismissToast } from '@/data/actions/toast';
import type { Toast as ToastType } from '@/types/toast';
import { Toast } from './Toast';

export function Toasts({ toasts }: { toasts: ToastType[] }) {
  const [optimisticToasts, dismissToastOptimistic] = useOptimistic(toasts, (current: ToastType[], id: string) => {
    return current.filter(toast => {
      return toast.id !== id;
    });
  });
  const [sentToSonner, setSentToSonner] = useState<string[]>([]);

  const localToasts = optimisticToasts.map(toast => {
    return {
      ...toast,
      dismiss: async () => {
        return startTransition(async () => {
          dismissToastOptimistic(toast.id);
          await dismissToast(toast.id);
        });
      },
    };
  });

  useEffect(() => {
    localToasts
      .filter(toast => {
        return !sentToSonner.includes(toast.id);
      })
      .forEach(toast => {
        setSentToSonner(prev => {
          return [...prev, toast.id];
        });
        return sonnerToast.custom(
          id => {
            return <Toast id={id as string} type={toast.type} message={toast.message} />;
          },
          {
            id: toast.id,
            onAutoClose: () => {
              return toast.dismiss();
            },
            onDismiss: () => {
              return toast.dismiss();
            },
          },
        );
      });
  }, [localToasts, sentToSonner]);

  return <SonnerToaster position="top-right" />;
}
