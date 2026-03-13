"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gameweek } from "@/types/fpl";

interface Props {
  gameweeks: Gameweek[];
  currentGw: number;
  onSelect: (gw: number) => void;
}

export function GameweekSelector({ gameweeks, currentGw, onSelect }: Props) {
  const current = gameweeks.find((gw) => gw.id === currentGw);

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-fpl-card border-border"
        onClick={() => onSelect(Math.max(1, currentGw - 1))}
        disabled={currentGw <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Select
        value={String(currentGw)}
        onValueChange={(v) => onSelect(parseInt(v))}
      >
        <SelectTrigger className="w-[180px] bg-fpl-card border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {gameweeks.map((gw) => (
            <SelectItem key={gw.id} value={String(gw.id)}>
              Gameweek {gw.id}
              {gw.is_current ? " (Current)" : ""}
              {gw.is_next ? " (Next)" : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 bg-fpl-card border-border"
        onClick={() => onSelect(Math.min(38, currentGw + 1))}
        disabled={currentGw >= 38}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {current && (
        <span className="text-xs text-muted-foreground ml-2">
          {current.finished
            ? `Avg: ${current.average_entry_score} pts`
            : current.is_current
            ? "In Progress"
            : `Deadline: ${new Date(current.deadline_time).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}`}
        </span>
      )}
    </div>
  );
}
