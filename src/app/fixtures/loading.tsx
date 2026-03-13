export default function FixturesLoading() {
  return (
    <div className="space-y-6">
      {/* Selector skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded bg-fpl-card animate-pulse" />
        <div className="h-10 w-[180px] rounded-lg bg-fpl-card animate-pulse" />
        <div className="h-8 w-8 rounded bg-fpl-card animate-pulse" />
      </div>

      {/* Fixture cards grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-lg border border-border bg-fpl-card animate-pulse"
            style={{ opacity: 1 - i * 0.08 }}
          />
        ))}
      </div>
    </div>
  );
}
