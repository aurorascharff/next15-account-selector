export function ProMarker({ plan }: { plan?: string }) {
  return plan === 'pro' ? (
    <span className="text-yellow-400">
      <span className="sr-only">Pro account</span>
      <span aria-hidden="true">★</span>
    </span>
  ) : null;
}
