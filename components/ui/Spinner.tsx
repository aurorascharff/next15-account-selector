import React from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';

export default function Spinner() {
  return (
    <div aria-label="searching..." className="h-fit w-fit animate-spin text-gray">
      <SpinnerIcon aria-hidden="true" width={20} height={20} />
    </div>
  );
}
