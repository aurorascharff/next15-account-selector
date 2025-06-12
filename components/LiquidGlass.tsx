'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface LiquidGlassProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'panel' | 'card' | 'button';
  intensity?: 'low' | 'medium' | 'high';
}

export function LiquidGlass({
  children,
  className = '',
  style = {},
  variant = 'default',
  intensity = 'medium',
  ...props
}: LiquidGlassProps & React.HTMLAttributes<HTMLDivElement>) {
  const variantClasses = {
    button: 'rounded-md cursor-pointer',
    card: 'rounded-xl',
    default: 'rounded-lg',
    panel: 'rounded-2xl',
  };

  const intensityClasses = {
    high: 'backdrop-blur-lg',
    low: 'backdrop-blur-sm',
    medium: 'backdrop-blur-md',
  };

  return (
    <div
      className={cn('liquid-glass', variantClasses[variant], intensityClasses[intensity], className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
