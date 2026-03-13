export default function GameweekLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-7 w-40 rounded bg-fpl-card animate-pulse" />
        <div className="h-6 w-20 rounded bg-fpl-card animate-pulse" />
      </div>

      {/* Summary cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-lg border border-border bg-fpl-card animate-pulse"
          />
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border border-border bg-fpl-card animate-pulse h-[400px]" />
    </div>
  );
}
