import React from 'react';
import { LiquidButton } from '../LiquidButton';

type Props = {
  children: React.ReactNode;
  name: string;
};

export default function IconButton({ children, name }: Props) {
  return (
    <LiquidButton variant="ghost" size="sm" className="!rounded-full !p-2">
      <span className="sr-only">{name}</span>
      <div aria-hidden="true">{children}</div>
    </LiquidButton>
  );
}
