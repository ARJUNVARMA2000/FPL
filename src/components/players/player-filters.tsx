"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Team } from "@/types/fpl";
import { POSITION_MAP, POSITION_COLORS, STATUS_MAP } from "@/lib/constants";

export interface PlayerFilters {
  search: string;
  positions: number[];
  teams: number[];
  priceRange: [number, number];
  minPoints: number;
  minMinutes: number;
  status: string;
  maxOwnership: number;
}

export const DEFAULT_FILTERS: PlayerFilters = {
  search: "",
  positions: [],
  teams: [],
  priceRange: [30, 150], // raw cost (30 = £3.0m, 150 = £15.0m)
  minPoints: 0,
  minMinutes: 0,
  status: "all",
  maxOwnership: 100,
};

interface Props {
  filters: PlayerFilters;
  onChange: (filters: PlayerFilters) => void;
  teams: Team[];
}

export function PlayerFilterControls({ filters, onChange, teams }: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const update = (partial: Partial<PlayerFilters>) =>
    onChange({ ...filters, ...partial });

  const togglePosition = (pos: number) => {
    const next = filters.positions.includes(pos)
      ? filters.positions.filter((p) => p !== pos)
      : [...filters.positions, pos];
    update({ positions: next });
  };

  const activeFilterCount = [
    filters.positions.length > 0,
    filters.teams.length > 0,
    filters.priceRange[0] > 30 || filters.priceRange[1] < 150,
    filters.minPoints > 0,
    filters.minMinutes > 0,
    filters.status !== "all",
    filters.maxOwnership < 100,
  ].filter(Boolean).length;

  return (
    <div className="space-y-3">
      {/* Search + Position chips row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search players..."
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            className="pl-9 bg-fpl-card border-border"
          />
        </div>

        {/* Position chips */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((pos) => (
            <button
              key={pos}
              onClick={() => togglePosition(pos)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                filters.positions.includes(pos)
                  ? "text-white shadow-sm"
                  : "bg-fpl-card text-muted-foreground hover:text-foreground"
              )}
              style={
                filters.positions.includes(pos)
                  ? { backgroundColor: POSITION_COLORS[pos] }
                  : undefined
              }
            >
              {POSITION_MAP[pos]}
            </button>
          ))}
        </div>

        {/* Advanced toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="gap-1.5 bg-fpl-card border-border"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {activeFilterCount > 0 && (
            <Badge className="ml-1 h-5 w-5 justify-center rounded-full bg-fpl-purple p-0 text-[10px]">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange(DEFAULT_FILTERS)}
            className="text-muted-foreground hover:text-foreground gap-1"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </Button>
        )}
      </div>

      {/* Advanced filters panel */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 rounded-lg bg-fpl-card border border-border p-4">
          {/* Team filter */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Team</label>
            <Select
              value={filters.teams.length === 1 ? String(filters.teams[0]) : "all"}
              onValueChange={(v) =>
                update({ teams: v === "all" ? [] : [parseInt(v)] })
              }
            >
              <SelectTrigger className="bg-fpl-elevated border-border">
                <SelectValue placeholder="All teams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All teams</SelectItem>
                {teams
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((team) => (
                    <SelectItem key={team.id} value={String(team.id)}>
                      {team.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price range */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">
              Price: £{(filters.priceRange[0] / 10).toFixed(1)}m – £
              {(filters.priceRange[1] / 10).toFixed(1)}m
            </label>
            <Slider
              min={30}
              max={150}
              step={5}
              value={filters.priceRange}
              onValueChange={(v) =>
                update({ priceRange: [v[0], v[1]] })
              }
              className="py-2"
            />
          </div>

          {/* Min points */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">
              Min points: {filters.minPoints}
            </label>
            <Slider
              min={0}
              max={300}
              step={5}
              value={[filters.minPoints]}
              onValueChange={(v) => update({ minPoints: v[0] })}
              className="py-2"
            />
          </div>

          {/* Min minutes */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">
              Min minutes: {filters.minMinutes}
            </label>
            <Slider
              min={0}
              max={3000}
              step={90}
              value={[filters.minMinutes]}
              onValueChange={(v) => update({ minMinutes: v[0] })}
              className="py-2"
            />
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Status</label>
            <Select
              value={filters.status}
              onValueChange={(v) => update({ status: v })}
            >
              <SelectTrigger className="bg-fpl-elevated border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {Object.entries(STATUS_MAP).map(([key, val]) => (
                  <SelectItem key={key} value={key}>
                    {val.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ownership */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">
              Max ownership: {filters.maxOwnership}%
            </label>
            <Slider
              min={0}
              max={100}
              step={5}
              value={[filters.maxOwnership]}
              onValueChange={(v) => update({ maxOwnership: v[0] })}
              className="py-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}
