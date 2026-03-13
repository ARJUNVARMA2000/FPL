"use client";

import { Badge } from "@/components/ui/badge";
import { Gameweek, Player, Team, LivePlayerStats } from "@/types/fpl";
import { GWSummary } from "./gw-summary";
import { TopPerformers } from "./top-performers";
import { DreamTeam } from "./dream-team";

interface Props {
  gameweek: Gameweek;
  liveData: LivePlayerStats[];
  players: Player[];
  teams: Team[];
}

export function GameweekView({ gameweek, liveData, players, teams }: Props) {
  const statusLabel = gameweek.finished
    ? "Finished"
    : gameweek.is_current
    ? "In Progress"
    : "Upcoming";
  const statusColor = gameweek.finished
    ? "#94a3b8"
    : gameweek.is_current
    ? "#06d6a0"
    : "#f59e0b";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold font-stat">
          Gameweek {gameweek.id}
        </h2>
        <Badge
          variant="outline"
          className="border-0 text-xs"
          style={{
            backgroundColor: `${statusColor}15`,
            color: statusColor,
          }}
        >
          {statusLabel}
        </Badge>
        {gameweek.chip_plays && gameweek.chip_plays.length > 0 && (
          <div className="flex gap-1.5 ml-2">
            {gameweek.chip_plays.map((chip) => (
              <Badge
                key={chip.chip_name}
                variant="outline"
                className="text-[10px] border-border"
              >
                {chip.chip_name}: {chip.num_played.toLocaleString()}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Summary cards */}
      <GWSummary gameweek={gameweek} players={players} />

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TopPerformers liveData={liveData} players={players} teams={teams} />
        </div>
        <div>
          <DreamTeam liveData={liveData} players={players} teams={teams} />
        </div>
      </div>
    </div>
  );
}
