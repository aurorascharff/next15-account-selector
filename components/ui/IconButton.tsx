import React from 'react';

type Props = {
  children: React.ReactNode;
  name: string;
};

export default function IconButton({ children, name }: Props) {
  return (
    <button className="liquid-glass !rounded-full rounded-lg border border-white/20 bg-white/10 !p-2 px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50">
      <span className="sr-only">{name}</span>
      <div aria-hidden="true">{children}</div>
    </button>
  );
}
