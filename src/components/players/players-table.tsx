"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  VisibilityState,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Player, Team } from "@/types/fpl";
import { createColumns, PlayerRow, DEFAULT_VISIBLE_COLUMNS } from "./columns";
import {
  PlayerFilterControls,
  PlayerFilters,
  DEFAULT_FILTERS,
} from "./player-filters";
import { PlayerCard } from "./player-card";

interface Props {
  players: Player[];
  teams: Team[];
}

export function PlayersTable({ players, teams }: Props) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "total_points", desc: true },
  ]);
  const [filters, setFilters] = useState<PlayerFilters>(DEFAULT_FILTERS);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => {
      const vis: VisibilityState = {};
      const allCols = [
        "web_name", "team_short", "element_type", "now_cost", "total_points",
        "form", "expected_goals", "expected_assists", "ict_index",
        "selected_by_percent", "goals_scored", "assists", "clean_sheets",
        "minutes", "bonus", "points_per_game",
      ];
      allCols.forEach((col) => {
        vis[col] = DEFAULT_VISIBLE_COLUMNS.includes(col);
      });
      return vis;
    }
  );

  const teamMap = useMemo(
    () => new Map(teams.map((t) => [t.id, t])),
    [teams]
  );

  // Apply filters to create the data set
  const filteredData = useMemo(() => {
    const rows: PlayerRow[] = players.map((p) => {
      const team = teamMap.get(p.team);
      return {
        ...p,
        team_name: team?.name || "",
        team_short: team?.short_name || "",
      };
    });

    return rows.filter((p) => {
      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const nameMatch =
          p.web_name.toLowerCase().includes(q) ||
          p.first_name.toLowerCase().includes(q) ||
          p.second_name.toLowerCase().includes(q);
        if (!nameMatch) return false;
      }

      // Position
      if (
        filters.positions.length > 0 &&
        !filters.positions.includes(p.element_type)
      )
        return false;

      // Team
      if (filters.teams.length > 0 && !filters.teams.includes(p.team))
        return false;

      // Price
      if (
        p.now_cost < filters.priceRange[0] ||
        p.now_cost > filters.priceRange[1]
      )
        return false;

      // Points
      if (p.total_points < filters.minPoints) return false;

      // Minutes
      if (p.minutes < filters.minMinutes) return false;

      // Status
      if (filters.status !== "all" && p.status !== filters.status) return false;

      // Ownership
      if (parseFloat(p.selected_by_percent) > filters.maxOwnership)
        return false;

      return true;
    });
  }, [players, teamMap, filters]);

  const columns = useMemo(() => createColumns(teams), [teams]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 25 },
    },
  });

  const selectedPlayer = selectedPlayerId
    ? players.find((p) => p.id === selectedPlayerId) || null
    : null;

  return (
    <div className="space-y-4">
      <PlayerFilterControls
        filters={filters}
        onChange={setFilters}
        teams={teams}
      />

      {/* Results count */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {filteredData.length} player{filteredData.length !== 1 ? "s" : ""}
        </span>
        {/* Column toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          {table.getAllColumns().filter(c => c.getCanHide()).map((col) => (
            <button
              key={col.id}
              onClick={() => col.toggleVisibility()}
              className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${
                col.getIsVisible()
                  ? "bg-fpl-purple/20 text-fpl-purple"
                  : "bg-fpl-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {col.id === "web_name" ? "Name" :
               col.id === "team_short" ? "Team" :
               col.id === "element_type" ? "Pos" :
               col.id === "now_cost" ? "Price" :
               col.id === "total_points" ? "Pts" :
               col.id === "expected_goals" ? "xG" :
               col.id === "expected_assists" ? "xA" :
               col.id === "ict_index" ? "ICT" :
               col.id === "selected_by_percent" ? "Own%" :
               col.id === "goals_scored" ? "Goals" :
               col.id === "clean_sheets" ? "CS" :
               col.id === "points_per_game" ? "PPG" :
               col.id.charAt(0).toUpperCase() + col.id.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-fpl-card hover:bg-fpl-card border-border"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-xs text-muted-foreground h-10"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-muted-foreground"
                >
                  No players found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer border-border hover:bg-fpl-elevated/50 transition-colors"
                  onClick={() =>
                    setSelectedPlayerId(
                      selectedPlayerId === row.original.id
                        ? null
                        : row.original.id
                    )
                  }
                  data-state={
                    selectedPlayerId === row.original.id ? "selected" : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2.5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-fpl-card border-border"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-fpl-card border-border"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Player detail card */}
      {selectedPlayer && (
        <PlayerCard
          player={selectedPlayer}
          teams={teams}
          onClose={() => setSelectedPlayerId(null)}
        />
      )}
    </div>
  );
}
