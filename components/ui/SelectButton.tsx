import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/utils/cn';

const shadow = 'shadow-xs active:enabled:shadow-2xs disabled:shadow-2xs';

export const selectButton = cva('selectButton', {
  defaultVariants: {
    theme: 'primary',
  },
  variants: {
    theme: {
      primary: [
        'rounded-sm',
        'focus:outline-white',
        'focus:outline',
        'focus:-outline-offset-4',
        'bg-primary',
        'px-4',
        'py-2',
        'text-white',
        'hover:enabled:bg-primary-dark',
        'disabled:bg-primary-darker',
        shadow,
        'rounded-2xl',
        'border',
        'border-primary',
        'outline-offset-1',
        'dark:aria-expanded:bg-black',
        'dark:aria-expanded:text-white',
        'aria-expanded:hover:bg-gray-light',
        'aria-expanded:focus:outline-2',
        'aria-expanded:focus:-outline-offset-1',
        'aria-expanded:focus:outline-primary',
        'dark:aria-expanded:hover:bg-neutral-800',
      ],
    },
  },
});

export type Props = {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
};

export default function SelectButton({
  children,
  type,
  theme,
  className,
  ...otherProps
}: Props & React.HTMLProps<HTMLButtonElement> & VariantProps<typeof selectButton>) {
  return (
    <button {...otherProps} type={type} className={cn(selectButton({ className, theme }))}>
      {children}
    </button>
  );
}
