export default function TeamsLoading() {
  return (
    <div className="space-y-6">
      {/* Team selectors skeleton */}
      <div className="flex items-end gap-6">
        <div className="space-y-1.5">
          <div className="h-4 w-12 rounded bg-fpl-card animate-pulse" />
          <div className="h-10 w-[200px] rounded-lg bg-fpl-card animate-pulse" />
        </div>
        <div className="h-5 w-6 rounded bg-fpl-card animate-pulse mb-2" />
        <div className="space-y-1.5">
          <div className="h-4 w-12 rounded bg-fpl-card animate-pulse" />
          <div className="h-10 w-[200px] rounded-lg bg-fpl-card animate-pulse" />
        </div>
      </div>

      <div className="text-center py-16 text-muted-foreground">
        Loading team data...
      </div>
    </div>
  );
}
