export function ProMarker({ plan }: { plan?: string }) {
  return (
    <span className="text-yellow-500">
      <span className="sr-only">Pro account</span>
      <span aria-hidden="true">{plan === 'pro' ? '★' : ''}</span>
    </span>
  );
}
