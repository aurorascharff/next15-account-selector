'use client';

import { startTransition, useEffect, useOptimistic, useState } from 'react';
import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';
import { dismissToast } from '@/data/actions/toast';
import type { Toast } from './Toaster';

export function Toasts({ toasts }: { toasts: Toast[] }) {
  const [optimisticToasts, dismissToastOptimistic] = useOptimistic(toasts, (current, id) => {
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
        const toastOptions = {
          id: toast.id,
          onAutoClose: () => {
            return toast.dismiss();
          },
          onDismiss: () => {
            return toast.dismiss();
          },
        };

        setSentToSonner(prev => {
          return [...prev, toast.id];
        });
        if (toast.type === 'error') {
          return sonnerToast.error(toast.message, toastOptions);
        }
        if (toast.type === 'info') {
          return sonnerToast(toast.message, toastOptions);
        }
        if (toast.type === 'success') {
          return sonnerToast.success(toast.message, toastOptions);
        }
      });
  }, [localToasts, sentToSonner]);

  return <SonnerToaster position="top-right" />;
}
