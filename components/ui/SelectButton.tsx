import React from 'react';
import { cn } from '@/utils/cn';

export type Props = {
  children?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export default function SelectButton({
  children,
  className,
  type = 'button',
  ...otherProps
}: Props & React.HTMLProps<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        'bg-primary hover:bg-primary-dark border-primary aria-expanded:hover:bg-gray-light aria-expanded:focus:outline-primary dark:aria-expanded:hover:bg-neutral rounded-2xl border px-4 py-2 text-white shadow-md outline-offset-1 focus:outline focus:-outline-offset-4 focus:outline-white aria-expanded:bg-white aria-expanded:text-black aria-expanded:focus:outline-2 aria-expanded:focus:-outline-offset-1 dark:aria-expanded:bg-black dark:aria-expanded:text-white',
        className,
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
}
