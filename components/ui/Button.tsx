import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/utils/cn';

const shadow = 'shadow-sm active:enabled:shadow-xs disabled:shadow-xs';

export const button = cva('button', {
  defaultVariants: {
    theme: 'primary',
  },
  variants: {
    theme: {
      primary: [
        'outline-none',
        'rounded',
        'focus:outline-white',
        'focus:outline',
        'focus:-outline-offset-4',
        'bg-primary',
        'px-3',
        'py-2',
        'text-white',
        'hover:enabled:bg-primary-dark',
        'disabled:bg-gray-dark',
        shadow,
      ],
    },
  },
});

export type Props = {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
};

export default function Button({
  children,
  type,
  theme,
  className,
  ...otherProps
}: Props & React.HTMLProps<HTMLButtonElement> & VariantProps<typeof button>) {
  return (
    <button {...otherProps} type={type} className={cn(button({ className, theme }))}>
      {children}
    </button>
  );
}
