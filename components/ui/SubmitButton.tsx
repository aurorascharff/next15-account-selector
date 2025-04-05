'use client';

import * as Ariakit from '@ariakit/react';

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
  ...otherProps
}: Props & React.HTMLProps<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  const isSubmitting = pending || loading;

  return (
    <Ariakit.Button
      aria-disabled={isSubmitting || otherProps['aria-disabled']}
      type={type}
      className={cn(
        className,
        'bg-primary hover:bg-primary-dark aria-disabled:bg-primary-darker rounded-sm px-4 py-2 text-white uppercase shadow-md focus:outline focus:-outline-offset-4 focus:outline-white',
      )}
      {...otherProps}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center gap-2">
          {children}
          <div className="h-fit w-fit animate-spin">
            <SpinnerIcon width={16} height={16} className="text-white" />
          </div>
        </div>
      ) : (
        children
      )}
    </Ariakit.Button>
  );
}
