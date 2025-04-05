'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/utils/cn';
import { SpinnerIcon } from './icons/SpinnerIcon';

type Props = {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export default function SubmitButton({
  children,
  loading,
  type = 'submit',
  className,
  disabled,
  ...otherProps
}: Props & React.HTMLProps<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  const isSubmitting = pending || loading;

  return (
    <button
      disabled={isSubmitting || disabled}
      type={type}
      className={cn(
        className,
        'bg-primary hover:bg-primary-dark disabled:bg-primary-darker rounded-sm px-4 py-2 text-white shadow-md focus:-outline-offset-4 enabled:focus:outline enabled:focus:outline-white',
      )}
      {...otherProps}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center gap-2">
          {children}
          <div className="h-fit w-fit animate-spin">
            <SpinnerIcon aria-hidden="true" width={16} height={16} className="text-white" />
          </div>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
