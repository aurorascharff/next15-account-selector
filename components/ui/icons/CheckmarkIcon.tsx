import React from 'react';

type Props = {
  className?: string;
};

export function CheckmarkIcon({ className, ...otherProps }: Props & React.SVGAttributes<SVGElement>) {
  return (
    <svg {...otherProps} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.9647 14.9617L17.4693 7.44735L18.5307 8.50732L9.96538 17.0837L5.46967 12.588L6.53033 11.5273L9.9647 14.9617Z"
        fill="currentColor"
      />
    </svg>
  );
}
