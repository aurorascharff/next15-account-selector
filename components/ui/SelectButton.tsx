import React from 'react';
import { cn } from '@/utils/cn';

export type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function SelectButton({
  children,
  className,
  ...otherProps
}: Props & React.HTMLProps<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        'bg-primary hover:bg-primary-dark border-primary aria-expanded:hover:bg-gray-light aria-expanded:focus:outline-primary rounded-2xl border px-4 py-2 text-white shadow-md outline-offset-1 focus:outline focus:-outline-offset-4 focus:outline-white aria-expanded:focus:outline-2 aria-expanded:focus:-outline-offset-1 dark:aria-expanded:bg-black dark:aria-expanded:text-white dark:aria-expanded:hover:bg-neutral-800',
        className,
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
}
