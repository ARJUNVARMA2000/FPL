"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Player, Team } from "@/types/fpl";
import { formatStat } from "@/lib/utils";

export interface TeamStats {
  team: Team;
  totalPoints: number;
  goalsScored: number;
  assists: number;
  cleanSheets: number;
  xG: number;
  xGA: number;
  topPlayer: Player | null;
  averageForm: number;
  totalMinutes: number;
}

export function computeTeamStats(
  team: Team,
  players: Player[]
): TeamStats {
  const teamPlayers = players.filter((p) => p.team === team.id);

  const totalPoints = teamPlayers.reduce((s, p) => s + p.total_points, 0);
  const goalsScored = teamPlayers.reduce((s, p) => s + p.goals_scored, 0);
  const assists = teamPlayers.reduce((s, p) => s + p.assists, 0);
  const cleanSheets = Math.max(
    ...teamPlayers.map((p) => p.clean_sheets),
    0
  );
  const xG = teamPlayers.reduce(
    (s, p) => s + parseFloat(p.expected_goals || "0"),
    0
  );
  const xGA = teamPlayers.reduce(
    (s, p) => s + parseFloat(p.expected_goals_conceded || "0"),
    0
  );
  const topPlayer = teamPlayers.length > 0
    ? teamPlayers.reduce((best, p) =>
        p.total_points > best.total_points ? p : best
      )
    : null;
  const formsArr = teamPlayers
    .filter((p) => p.minutes > 0)
    .map((p) => parseFloat(p.form));
  const averageForm =
    formsArr.length > 0
      ? formsArr.reduce((s, f) => s + f, 0) / formsArr.length
      : 0;
  const totalMinutes = teamPlayers.reduce((s, p) => s + p.minutes, 0);

  return {
    team,
    totalPoints,
    goalsScored,
    assists,
    cleanSheets,
    xG,
    xGA,
    topPlayer,
    averageForm,
    totalMinutes,
  };
}

interface Props {
  stats: TeamStats;
  color: string;
}

export function TeamStatsCard({ stats, color }: Props) {
  const statRows = [
    { label: "Total Points", value: stats.totalPoints },
    { label: "Goals Scored", value: stats.goalsScored },
    { label: "Assists", value: stats.assists },
    { label: "Clean Sheets", value: stats.cleanSheets },
    { label: "xG", value: formatStat(stats.xG) },
    { label: "xG Conceded", value: formatStat(stats.xGA) },
    { label: "Avg Form", value: formatStat(stats.averageForm) },
    { label: "Top Player", value: stats.topPlayer?.web_name || "—" },
  ];

  return (
    <Card className="bg-fpl-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base" style={{ color }}>
          {stats.team.name}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          W{stats.team.win} D{stats.team.draw} L{stats.team.loss} — {stats.team.points} pts (#{stats.team.position})
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {statRows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between border-b border-border/50 pb-1.5 last:border-0"
            >
              <span className="text-xs text-muted-foreground">{row.label}</span>
              <span className="font-stat text-sm font-medium">{row.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
