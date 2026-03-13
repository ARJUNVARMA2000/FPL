export default function PlayersLoading() {
  return (
    <div className="space-y-4">
      {/* Filter bar skeleton */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-64 rounded-lg bg-fpl-card animate-pulse" />
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-8 w-12 rounded-md bg-fpl-card animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border border-border overflow-hidden">
        {/* Header */}
        <div className="bg-fpl-card h-10 flex items-center gap-4 px-4">
          {[120, 50, 50, 60, 50, 50, 50, 50, 50, 60].map((w, i) => (
            <div
              key={i}
              className="h-4 rounded bg-fpl-elevated animate-pulse"
              style={{ width: w }}
            />
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="h-12 flex items-center gap-4 px-4 border-t border-border"
          >
            {[120, 50, 50, 60, 50, 50, 50, 50, 50, 60].map((w, j) => (
              <div
                key={j}
                className="h-4 rounded bg-fpl-card animate-pulse"
                style={{ width: w, opacity: 1 - i * 0.05 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
