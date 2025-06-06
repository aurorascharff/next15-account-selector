'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/utils/cn';
import Spinner from './Spinner';

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
  const isSubmitting = loading || pending;

  return (
    <button
      disabled={isSubmitting || disabled}
      type={type}
      className={cn(
        className,
        'bg-primary hover:bg-primary-dark disabled:bg-primary-darker rounded-lg px-4 py-2 text-white shadow-md focus-visible:-outline-offset-4 enabled:focus-visible:outline enabled:focus-visible:outline-white',
      )}
      {...otherProps}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center gap-2">
          {children}
          <Spinner className="text-white" width={16} height={16} />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
