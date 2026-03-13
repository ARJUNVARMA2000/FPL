"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Player, Team, PlayerDetailResponse } from "@/types/fpl";
import { formatPrice, formatStat } from "@/lib/utils";
import {
  POSITION_MAP,
  POSITION_COLORS,
  STATUS_MAP,
  FDR_COLORS,
} from "@/lib/constants";

interface Props {
  player: Player;
  teams: Team[];
  onClose: () => void;
}

export function PlayerCard({ player, teams, onClose }: Props) {
  const [detail, setDetail] = useState<PlayerDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const team = teams.find((t) => t.id === player.team);
  const teamMap = new Map(teams.map((t) => [t.id, t]));
  const status = STATUS_MAP[player.status];
  const pos = player.element_type;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/fpl/player/${player.id}`)
      .then((r) => r.json())
      .then((data) => setDetail(data))
      .catch(() => setDetail(null))
      .finally(() => setLoading(false));
  }, [player.id]);

  const statGroups = [
    {
      title: "Performance",
      stats: [
        { label: "Total Points", value: player.total_points },
        { label: "Form", value: player.form },
        { label: "PPG", value: player.points_per_game },
        { label: "ICT Index", value: player.ict_index },
      ],
    },
    {
      title: "Attack",
      stats: [
        { label: "Goals", value: player.goals_scored },
        { label: "Assists", value: player.assists },
        { label: "xG", value: formatStat(player.expected_goals) },
        { label: "xA", value: formatStat(player.expected_assists) },
      ],
    },
    {
      title: "Defense & Other",
      stats: [
        { label: "Clean Sheets", value: player.clean_sheets },
        { label: "Minutes", value: player.minutes.toLocaleString() },
        { label: "Bonus", value: player.bonus },
        { label: "BPS", value: player.bps },
      ],
    },
    {
      title: "Ownership",
      stats: [
        { label: "Selected By", value: `${player.selected_by_percent}%` },
        {
          label: "Transfers In (GW)",
          value: player.transfers_in_event.toLocaleString(),
        },
        {
          label: "Transfers Out (GW)",
          value: player.transfers_out_event.toLocaleString(),
        },
        {
          label: "Price Change (GW)",
          value: `${player.cost_change_event >= 0 ? "+" : ""}${(player.cost_change_event / 10).toFixed(1)}`,
        },
      ],
    },
  ];

  // Chart data from history
  const chartData =
    detail?.history.map((h) => ({
      gw: `GW${h.round}`,
      points: h.total_points,
      minutes: h.minutes,
    })) || [];

  // Upcoming fixtures
  const upcomingFixtures = detail?.fixtures.slice(0, 5) || [];

  return (
    <Card className="bg-fpl-card border-border">
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div>
          <CardTitle className="text-xl">
            {player.first_name} {player.second_name}
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">{team?.name}</span>
            <Badge
              variant="outline"
              className="text-xs border-0"
              style={{
                backgroundColor: `${POSITION_COLORS[pos]}15`,
                color: POSITION_COLORS[pos],
              }}
            >
              {POSITION_MAP[pos]}
            </Badge>
            <span className="font-stat text-sm text-fpl-purple">
              {formatPrice(player.now_cost)}
            </span>
            {status && player.status !== "a" && (
              <Badge
                variant="outline"
                className="text-xs border-0"
                style={{
                  backgroundColor: `${status.color}15`,
                  color: status.color,
                }}
              >
                {status.label}
              </Badge>
            )}
          </div>
          {player.news && (
            <p className="mt-2 text-xs text-muted-foreground">{player.news}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {group.title}
              </h4>
              <div className="space-y-1.5">
                {group.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-muted-foreground">
                      {stat.label}
                    </span>
                    <span className="font-stat text-sm">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-fpl-purple" />
          </div>
        )}

        {/* Points history chart */}
        {!loading && chartData.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Points by Gameweek
            </h4>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.06)"
                  />
                  <XAxis
                    dataKey="gw"
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    width={30}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1a2e",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="points"
                    stroke="#7c3aed"
                    strokeWidth={2}
                    dot={{ fill: "#7c3aed", r: 3 }}
                    activeDot={{ r: 5, fill: "#7c3aed" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Upcoming fixtures */}
        {!loading && upcomingFixtures.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Upcoming Fixtures
            </h4>
            <div className="flex flex-wrap gap-2">
              {upcomingFixtures.map((f) => {
                const opponent = f.is_home
                  ? teamMap.get(f.team_a)
                  : teamMap.get(f.team_h);
                return (
                  <div
                    key={f.id}
                    className="flex items-center gap-2 rounded-lg bg-fpl-elevated px-3 py-2"
                  >
                    <span className="text-[10px] text-muted-foreground">
                      GW{f.event}
                    </span>
                    <span className="text-xs font-medium">
                      {opponent?.short_name || "???"}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      ({f.is_home ? "H" : "A"})
                    </span>
                    <span
                      className="inline-flex items-center justify-center rounded px-1 py-0.5 text-[10px] font-bold font-stat"
                      style={{
                        backgroundColor: `${FDR_COLORS[f.difficulty]}20`,
                        color: FDR_COLORS[f.difficulty],
                      }}
                    >
                      {f.difficulty}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
