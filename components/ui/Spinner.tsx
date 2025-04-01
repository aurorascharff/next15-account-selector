import React from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';

export default function Spinner() {
  return (
    <div aria-label="searching..." className="h-fit w-fit animate-spin">
      <SpinnerIcon aria-hidden="true" width={16} height={16} />
    </div>
  );
}
