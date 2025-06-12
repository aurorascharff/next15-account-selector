'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface LiquidButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  onClick?: () => void;
}

export function LiquidButton({
  children,
  className = '',
  style = {},
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  ...props
}: LiquidButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variantClasses = {
    ghost: 'bg-white/10 border-white/20 text-white hover:bg-white/20',
    primary: 'bg-blue-500/20 border-blue-400/30 text-white hover:bg-blue-400/30',
    secondary: 'bg-purple-500/20 border-purple-400/30 text-white hover:bg-purple-400/30',
  };

  const sizeClasses = {
    lg: 'px-6 py-3 text-lg',
    md: 'px-4 py-2 text-base',
    sm: 'px-3 py-1.5 text-sm',
    xl: 'px-8 py-4 text-xl',
  };

  return (
    <button
      className={cn(
        'liquid-glass',
        'rounded-lg border transition-all duration-300',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50',
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      style={style}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
