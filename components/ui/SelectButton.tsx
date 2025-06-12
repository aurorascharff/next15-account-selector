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
        'liquid-glass rounded-2xl px-4 py-2 text-white transition-all duration-300',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50',
        'aria-expanded:border-white/40 aria-expanded:bg-white/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
}
