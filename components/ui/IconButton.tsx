import React from 'react';

type Props = {
  children: React.ReactNode;
  name: string;
};

export default function IconButton({ children, name }: Props) {
  return (
    <button className="hover:bg-gray focus-visible:outline-primary cursor-pointer rounded-full bg-black p-2 text-white focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-white dark:text-black">
      <span className="sr-only">{name}</span>
      <div aria-hidden="true">{children}</div>
    </button>
  );
}
