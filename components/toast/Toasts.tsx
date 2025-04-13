'use client';

import { useEffect, useOptimistic, useState } from 'react';
import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';
import type { Toast as ToastType } from '@/types/toast';
import { Toast } from './Toast';

export function Toasts({ toasts }: { toasts: ToastType[] }) {
  const [optimisticToasts, dismissToastOptimistic] = useOptimistic(toasts, (current: ToastType[], id: string) => {
    return current.filter(toast => {
      return toast.id !== id;
    });
  });
  const [sentToSonner, setSentToSonner] = useState<string[]>([]);

  useEffect(() => {
    optimisticToasts
      .filter(toast => {
        return !sentToSonner.includes(toast.id);
      })
      .forEach(toast => {
        setSentToSonner(prev => {
          return [...prev, toast.id];
        });
        return sonnerToast.custom(id => {
          return <Toast dismiss={dismissToastOptimistic} id={id as string} type={toast.type} message={toast.message} />;
        });
      });
  }, [dismissToastOptimistic, optimisticToasts, sentToSonner]);

  return <SonnerToaster position="top-right" />;
}
