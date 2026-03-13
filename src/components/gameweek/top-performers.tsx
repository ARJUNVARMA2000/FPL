"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Player, Team, LivePlayerStats } from "@/types/fpl";
import { formatPrice } from "@/lib/utils";
import { POSITION_MAP, POSITION_COLORS } from "@/lib/constants";

interface Props {
  liveData: LivePlayerStats[];
  players: Player[];
  teams: Team[];
}

export function TopPerformers({ liveData, players, teams }: Props) {
  const teamMap = new Map(teams.map((t) => [t.id, t]));
  const playerMap = new Map(players.map((p) => [p.id, p]));

  // Sort by total_points desc, take top 15
  const topPlayers = [...liveData]
    .sort((a, b) => b.stats.total_points - a.stats.total_points)
    .slice(0, 15);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">Top Performers</h3>
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-fpl-card hover:bg-fpl-card border-border">
              <TableHead className="text-xs text-muted-foreground">#</TableHead>
              <TableHead className="text-xs text-muted-foreground">Player</TableHead>
              <TableHead className="text-xs text-muted-foreground">Team</TableHead>
              <TableHead className="text-xs text-muted-foreground">Pos</TableHead>
              <TableHead className="text-xs text-muted-foreground text-right">Pts</TableHead>
              <TableHead className="text-xs text-muted-foreground text-right">G</TableHead>
              <TableHead className="text-xs text-muted-foreground text-right">A</TableHead>
              <TableHead className="text-xs text-muted-foreground text-right">CS</TableHead>
              <TableHead className="text-xs text-muted-foreground text-right">Bon</TableHead>
              <TableHead className="text-xs text-muted-foreground text-right">Min</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topPlayers.map((live, i) => {
              const player = playerMap.get(live.id);
              if (!player) return null;
              const team = teamMap.get(player.team);
              const pos = player.element_type;

              return (
                <TableRow key={live.id} className="border-border hover:bg-fpl-elevated/50">
                  <TableCell className="font-stat text-xs text-muted-foreground">
                    {i + 1}
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    {player.web_name}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {team?.short_name}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-[10px] border-0"
                      style={{
                        backgroundColor: `${POSITION_COLORS[pos]}15`,
                        color: POSITION_COLORS[pos],
                      }}
                    >
                      {POSITION_MAP[pos]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-stat text-sm font-semibold text-fpl-emerald">
                      {live.stats.total_points}
                    </span>
                  </TableCell>
                  <TableCell className="font-stat text-sm text-right">
                    {live.stats.goals_scored}
                  </TableCell>
                  <TableCell className="font-stat text-sm text-right">
                    {live.stats.assists}
                  </TableCell>
                  <TableCell className="font-stat text-sm text-right">
                    {live.stats.clean_sheets}
                  </TableCell>
                  <TableCell className="font-stat text-sm text-right">
                    {live.stats.bonus}
                  </TableCell>
                  <TableCell className="font-stat text-sm text-right text-muted-foreground">
                    {live.stats.minutes}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
