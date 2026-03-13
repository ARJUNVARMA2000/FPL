"use client";

import { useState, useMemo } from "react";
import { Player, Team } from "@/types/fpl";
import { TeamSelector } from "./team-selector";
import { TeamStatsCard, computeTeamStats } from "./team-stats-card";
import { TeamRadarChart } from "./team-radar-chart";
import { Badge } from "@/components/ui/badge";
import { POSITION_MAP, POSITION_COLORS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

interface Props {
  players: Player[];
  teams: Team[];
}

export function TeamsView({ players, teams }: Props) {
  const [teamAId, setTeamAId] = useState<number | null>(null);
  const [teamBId, setTeamBId] = useState<number | null>(null);

  const teamA = teams.find((t) => t.id === teamAId) || null;
  const teamB = teams.find((t) => t.id === teamBId) || null;

  const statsA = useMemo(
    () => (teamA ? computeTeamStats(teamA, players) : null),
    [teamA, players]
  );
  const statsB = useMemo(
    () => (teamB ? computeTeamStats(teamB, players) : null),
    [teamB, players]
  );

  // Best players per team
  const topPlayersA = useMemo(
    () =>
      teamAId
        ? players
            .filter((p) => p.team === teamAId)
            .sort((a, b) => b.total_points - a.total_points)
            .slice(0, 5)
        : [],
    [players, teamAId]
  );
  const topPlayersB = useMemo(
    () =>
      teamBId
        ? players
            .filter((p) => p.team === teamBId)
            .sort((a, b) => b.total_points - a.total_points)
            .slice(0, 5)
        : [],
    [players, teamBId]
  );

  return (
    <div className="space-y-6">
      {/* Team selectors */}
      <div className="flex flex-wrap items-end gap-6">
        <TeamSelector
          teams={teams}
          selectedTeamId={teamAId}
          onSelect={setTeamAId}
          label="Team A"
        />
        <span className="text-muted-foreground text-sm pb-2">vs</span>
        <TeamSelector
          teams={teams}
          selectedTeamId={teamBId}
          onSelect={setTeamBId}
          label="Team B"
        />
      </div>

      {statsA && statsB ? (
        <>
          {/* Stats cards side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TeamStatsCard stats={statsA} color="#7c3aed" />
            <TeamStatsCard stats={statsB} color="#06d6a0" />
          </div>

          {/* Radar chart */}
          <div className="rounded-lg border border-border bg-fpl-card p-6">
            <h3 className="text-sm font-semibold mb-4">Head-to-Head Comparison</h3>
            <TeamRadarChart statsA={statsA} statsB={statsB} />
          </div>

          {/* Top players per team */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { label: "Top Players", color: "#7c3aed", list: topPlayersA, team: teamA },
              { label: "Top Players", color: "#06d6a0", list: topPlayersB, team: teamB },
            ].map((section, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-fpl-card p-4 space-y-3">
                <h4
                  className="text-sm font-semibold"
                  style={{ color: section.color }}
                >
                  {section.team?.name} — {section.label}
                </h4>
                <div className="space-y-2">
                  {section.list.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{p.web_name}</span>
                        <Badge
                          variant="outline"
                          className="text-[10px] border-0"
                          style={{
                            backgroundColor: `${POSITION_COLORS[p.element_type]}15`,
                            color: POSITION_COLORS[p.element_type],
                          }}
                        >
                          {POSITION_MAP[p.element_type]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-stat text-xs text-muted-foreground">
                          {formatPrice(p.now_cost)}
                        </span>
                        <span className="font-stat text-sm font-semibold text-fpl-emerald">
                          {p.total_points} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          Select two teams above to compare their stats.
        </div>
      )}
    </div>
  );
}
