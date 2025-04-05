import React from 'react';

type Props = {
  className?: string;
};

export function ChevronIcon({ className, ...otherProps }: Props & React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...otherProps}
      className={className}
      fill="currentColor"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 407.437 407.437"
    >
      <polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 " />
    </svg>
  );
}
