'use client';

import { startTransition, useEffect, useOptimistic } from 'react';
import { dismissToast } from '@/data/actions/toast';
import { cn } from '@/utils/cn';
import { CloseIcon } from '../ui/icons/CloseIcon';

const background = {
  error: 'bg-red-500',
  info: 'bg-yellow-400',
  success: 'bg-green-500',
};
const text = {
  error: 'text-white outline-white',
  info: 'text-black outline-black',
  success: 'text-white outline-white',
};

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

  useEffect(() => {
    const timer = setTimeout(() => {
      optimisticToasts
        .filter(toast => {
          return toast.type === 'success';
        })
        .forEach(toast => {
          startTransition(async () => {
            dismissToastOptimistic(toast.id);
            await dismissToast(toast.id);
          });
        });
    }, 3000);

    return () => {
      return clearTimeout(timer);
    };
  }, [optimisticToasts, dismissToastOptimistic]);

  return (
    <div className="fixed top-8 z-50 mx-4 flex w-[calc(100%-64px)] flex-col gap-4 sm:right-10 sm:mx-0 sm:w-fit sm:max-w-[700px]">
      {optimisticToasts.map(toast => {
        const toastBackground = background[toast.type];
        const toastText = text[toast.type];

        return (
          <div
            role="alert"
            aria-live="assertive"
            key={toast.id}
            className={cn(
              toastBackground,
              toastText,
              'flex items-center justify-between gap-4 rounded-lg px-4 py-2 text-sm shadow-md',
            )}
          >
            <span className="sr-only">{'Toast message ' + toast.type}</span>
            <p>{toast.message}</p>
            <form
              action={async () => {
                dismissToastOptimistic(toast.id);
                await dismissToast(toast.id);
              }}
            >
              <button className="rounded-full p-1 hover:outline" type="submit">
                <span className="sr-only">Close</span>
                <CloseIcon width={12} height={12} aria-hidden="true" className={toastText} />
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
}
