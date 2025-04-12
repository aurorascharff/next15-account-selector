'use client';

import { startTransition, useEffect, useOptimistic, useState } from 'react';
import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';
import { dismissToast } from '@/data/actions/toast';

type Toast = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};

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
      .filter(t => {
        return !sentToSonner.includes(t.id);
      })
      .forEach(t => {
        const toastOptions = {
          id: t.id,
          onAutoClose: () => {
            return t.dismiss();
          },
          onDismiss: () => {
            return t.dismiss();
          },
        };

        setSentToSonner(prev => {
          return [...prev, t.id];
        });
        if (t.type === 'error') {
          return sonnerToast.error(t.message, toastOptions);
        }
        if (t.type === 'info') {
          return sonnerToast(t.message, toastOptions);
        }
        if (t.type === 'success') {
          return sonnerToast.success(t.message, toastOptions);
        }
      });
  }, [localToasts, sentToSonner]);

  return <SonnerToaster position="top-right" />;
}
