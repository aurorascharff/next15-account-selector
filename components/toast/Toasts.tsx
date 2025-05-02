'use client';

import { startTransition, useEffect, useState } from 'react';
import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';
import { dismissToast } from '@/data/actions/toast';
import type { Toast as ToastType } from '@/types/toast';
import { Toast } from './Toast';

export function Toasts({ toasts }: { toasts: ToastType[] }) {
  const [sentToSonner, setSentToSonner] = useState<string[]>([]);

  const dismissToastAction = (id: string) => {
    startTransition(() => {
      dismissToast(id);
    });
  };

  useEffect(() => {
    toasts
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
              return dismissToastAction(toast.id);
            },
            onDismiss: () => {
              return dismissToastAction(toast.id);
            },
          },
        );
      });
  }, [toasts, sentToSonner]);

  return <SonnerToaster position="top-right" />;
}
