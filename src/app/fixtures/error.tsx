"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FixturesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <AlertTriangle className="h-10 w-10 text-fpl-warning" />
      <h2 className="text-lg font-semibold">Failed to load fixtures</h2>
      <p className="text-sm text-muted-foreground max-w-md text-center">
        {error.message || "The FPL API may be temporarily unavailable. Please try again."}
      </p>
      <Button onClick={reset} variant="outline" className="gap-2 bg-fpl-card border-border">
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}
