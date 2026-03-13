"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Player, Team } from "@/types/fpl";
import { formatPrice, formatStat } from "@/lib/utils";
import { POSITION_MAP, POSITION_COLORS, STATUS_MAP } from "@/lib/constants";

export type PlayerRow = Player & {
  team_name: string;
  team_short: string;
};

function SortHeader({
  column,
  label,
  className,
}: {
  column: { getIsSorted: () => false | "asc" | "desc"; toggleSorting: (desc?: boolean) => void };
  label: string;
  className?: string;
}) {
  const sorted = column.getIsSorted();
  return (
    <button
      className={`flex items-center gap-1 hover:text-foreground ${className || ""}`}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}
      {sorted === "asc" ? (
        <ArrowUp className="h-3.5 w-3.5" />
      ) : sorted === "desc" ? (
        <ArrowDown className="h-3.5 w-3.5" />
      ) : (
        <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
      )}
    </button>
  );
}

export function createColumns(teams: Team[]): ColumnDef<PlayerRow>[] {
  const teamMap = new Map(teams.map((t) => [t.id, t]));

  return [
    {
      accessorKey: "web_name",
      header: ({ column }) => <SortHeader column={column} label="Name" />,
      cell: ({ row }) => {
        const player = row.original;
        const status = STATUS_MAP[player.status];
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">{player.web_name}</span>
            {player.status !== "a" && status && (
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: status.color }}
                title={status.label}
              />
            )}
          </div>
        );
      },
      size: 160,
    },
    {
      accessorKey: "team_short",
      header: ({ column }) => <SortHeader column={column} label="Team" />,
      cell: ({ row }) => {
        const team = teamMap.get(row.original.team);
        return (
          <span className="text-muted-foreground text-xs">
            {team?.short_name || row.original.team_short}
          </span>
        );
      },
      size: 60,
    },
    {
      accessorKey: "element_type",
      header: ({ column }) => <SortHeader column={column} label="Pos" />,
      cell: ({ row }) => {
        const pos = row.original.element_type;
        return (
          <Badge
            variant="outline"
            className="font-stat text-xs border-0"
            style={{
              backgroundColor: `${POSITION_COLORS[pos]}15`,
              color: POSITION_COLORS[pos],
            }}
          >
            {POSITION_MAP[pos]}
          </Badge>
        );
      },
      size: 60,
    },
    {
      accessorKey: "now_cost",
      header: ({ column }) => (
        <SortHeader column={column} label="Price" className="justify-end" />
      ),
      cell: ({ row }) => (
        <span className="font-stat text-sm text-right block">
          {formatPrice(row.original.now_cost)}
        </span>
      ),
      size: 80,
    },
    {
      accessorKey: "total_points",
      header: ({ column }) => (
        <SortHeader column={column} label="Pts" className="justify-end" />
      ),
      cell: ({ row }) => (
        <span className="font-stat text-sm font-semibold text-fpl-emerald text-right block">
          {row.original.total_points}
        </span>
      ),
      size: 60,
    },
    {
      accessorKey: "form",
      header: ({ column }) => (
        <SortHeader column={column} label="Form" className="justify-end" />
      ),
      cell: ({ row }) => {
        const form = parseFloat(row.original.form);
        return (
          <span
            className="font-stat text-sm text-right block"
            style={{
              color:
                form >= 6 ? "#06d6a0" : form >= 3 ? "#f59e0b" : "#94a3b8",
            }}
          >
            {formatStat(row.original.form)}
          </span>
        );
      },
      sortingFn: (a, b) =>
        parseFloat(a.original.form) - parseFloat(b.original.form),
      size: 60,
    },
    {
      accessorKey: "expected_goals",
      header: ({ column }) => (
        <SortHeader column={column} label="xG" className="justify-end" />
      ),
      cell: ({ row }) => (
        <span className="font-stat text-sm text-muted-foreground text-right block">
          {formatStat(row.original.expected_goals)}
        </span>
      ),
      sortingFn: (a, b) =>
        parseFloat(a.original.expected_goals) -
        parseFloat(b.original.expected_goals),
      size: 60,
    },
    {
      accessorKey: "expected_assists",
      header: ({ column }) => (
        <SortHeader column={column} label="xA" className="justify-end" />
      ),
      cell: ({ row }) => (
        <span className="font-stat text-sm text-muted-foreground text-right block">
          {formatStat(row.original.expected_assists)}
        </span>
      ),
      sortingFn: (a, b) =>
        parseFloat(a.original.expected_assists) -
        parseFloat(b.original.expected_assists),
      size: 60,
    },
    {
      accessorKey: "ict_index",
      header: ({ column }) => (
        <SortHeader column={column} label="ICT" className="justify-end" />
      ),
      cell: ({ row }) => (
        <span className="font-stat text-sm text-muted-foreground text-right block">
          {formatStat(row.original.ict_index)}
        </span>
      ),
      sortingFn: (a, b) =>
        parseFloat(a.original.ict_index) - parseFloat(b.original.ict_index),
      size: 60,
    },
    {
      accessorKey: "selected_by_percent",
      header: ({ column }) => (
        <SortHeader column={column} label="Own%" className="justify-end" />
      ),
      cell: ({ row }) => (
        <span className="font-stat text-sm text-muted-foreground text-right block">
          {row.original.selected_by_percent}%
        </span>
      ),
      sortingFn: (a, b) =>
        parseFloat(a.original.selected_by_percent) -
        parseFloat(b.original.selected_by_percent),
      size: 70,
    },
    {
      accessorKey: "goals_scored",
      header: ({ column }) => (
        <SortHeader column={column} label="G" className="justify-end" />
      ),
      cell: ({ row }) => (
        <span className="font-stat text-sm text-right block">
          {row.original.goals_scored}
        </span>
      ),
      size: 50,
    },
    {
      accessorKey: "assists",
      header: ({ column }) => (
        <SortHeader column={column} label="A" className="justify-end" />
      ),
      cell: ({ row }) => (
        <span className="font-stat text-sm text-right block">
          {row.original.assists}
        </span>
      ),
      size: 50,
    },
    {
      accessorKey: "clean_sheets",
      header: ({ column }) => (
        <SortHeader column={column} label="CS" className="justify-end" />
      ),
      cell: ({ row }) => (
        <span className="font-stat text-sm text-right block">
          {row.original.clean_sheets}
        </span>
      ),
      size: 50,
    },
    {
      accessorKey: "minutes",
      header: ({ column }) => (
        <SortHeader column={column} label="Min" className="justify-end" />
      ),
      cell: ({ row }) => (
        <span className="font-stat text-sm text-muted-foreground text-right block">
          {row.original.minutes.toLocaleString()}
        </span>
      ),
      size: 70,
    },
    {
      accessorKey: "bonus",
      header: ({ column }) => (
        <SortHeader column={column} label="Bon" className="justify-end" />
      ),
      cell: ({ row }) => (
        <span className="font-stat text-sm text-right block">
          {row.original.bonus}
        </span>
      ),
      size: 50,
    },
    {
      accessorKey: "points_per_game",
      header: ({ column }) => (
        <SortHeader column={column} label="PPG" className="justify-end" />
      ),
      cell: ({ row }) => (
        <span className="font-stat text-sm text-right block">
          {formatStat(row.original.points_per_game)}
        </span>
      ),
      sortingFn: (a, b) =>
        parseFloat(a.original.points_per_game) -
        parseFloat(b.original.points_per_game),
      size: 60,
    },
  ];
}

export const DEFAULT_VISIBLE_COLUMNS = [
  "web_name",
  "team_short",
  "element_type",
  "now_cost",
  "total_points",
  "form",
  "expected_goals",
  "expected_assists",
  "ict_index",
  "selected_by_percent",
  "goals_scored",
  "assists",
];
