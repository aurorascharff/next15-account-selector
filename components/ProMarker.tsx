import * as Ariakit from '@ariakit/react';

export function ProMarker({ plan }: { plan?: string }) {
  return (
    <span className="text-yellow-500">
      <Ariakit.VisuallyHidden>Pro account</Ariakit.VisuallyHidden>
      <span aria-hidden="true">{plan === 'pro' ? '★' : ''}</span>
    </span>
  );
}
