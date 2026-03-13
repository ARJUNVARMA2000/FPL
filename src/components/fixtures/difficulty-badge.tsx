"use client";

import { cn } from "@/lib/utils";
import { FDR_COLORS } from "@/lib/constants";

interface Props {
  difficulty: number;
  className?: string;
}

export function DifficultyBadge({ difficulty, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-bold font-stat",
        className
      )}
      style={{
        backgroundColor: `${FDR_COLORS[difficulty]}20`,
        color: FDR_COLORS[difficulty],
      }}
    >
      {difficulty}
    </span>
  );
}
