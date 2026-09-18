export default function CarCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="aspect-[16/10] animate-pulse bg-ink-100" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-2/3 animate-pulse rounded bg-ink-100" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-ink-100" />
        <div className="flex gap-3 pt-2">
          <div className="h-3 w-12 animate-pulse rounded bg-ink-100" />
          <div className="h-3 w-12 animate-pulse rounded bg-ink-100" />
          <div className="h-3 w-12 animate-pulse rounded bg-ink-100" />
        </div>
        <div className="h-8 w-1/2 animate-pulse rounded bg-ink-100" />
      </div>
    </div>
  );
}
