"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Player, Team, LivePlayerStats } from "@/types/fpl";
import { POSITION_MAP, POSITION_COLORS } from "@/lib/constants";

interface Props {
  liveData: LivePlayerStats[];
  players: Player[];
  teams: Team[];
}

export function DreamTeam({ liveData, players, teams }: Props) {
  const teamMap = new Map(teams.map((t) => [t.id, t]));
  const playerMap = new Map(players.map((p) => [p.id, p]));

  // Get dream team members (in_dreamteam flag)
  const dreamTeamIds = liveData
    .filter((l) => l.stats.in_dreamteam)
    .map((l) => l.id);

  // If no dream team data, pick top by position: 1 GK, 4 DEF, 3 MID, 3 FWD
  let dreamTeamPlayers: { player: Player; points: number }[];

  if (dreamTeamIds.length > 0) {
    dreamTeamPlayers = dreamTeamIds
      .map((id) => {
        const player = playerMap.get(id);
        const live = liveData.find((l) => l.id === id);
        return player && live
          ? { player, points: live.stats.total_points }
          : null;
      })
      .filter(Boolean) as { player: Player; points: number }[];
  } else {
    // Fallback: pick best by position
    const byPosition = new Map<number, { player: Player; points: number }[]>();
    for (const live of liveData) {
      const player = playerMap.get(live.id);
      if (!player || live.stats.minutes === 0) continue;
      const pos = player.element_type;
      if (!byPosition.has(pos)) byPosition.set(pos, []);
      byPosition.get(pos)!.push({ player, points: live.stats.total_points });
    }
    for (const arr of byPosition.values()) {
      arr.sort((a, b) => b.points - a.points);
    }
    const picks: { player: Player; points: number }[] = [];
    const quotas: Record<number, number> = { 1: 1, 2: 4, 3: 3, 4: 3 };
    for (const [pos, count] of Object.entries(quotas)) {
      const available = byPosition.get(parseInt(pos)) || [];
      picks.push(...available.slice(0, count));
    }
    dreamTeamPlayers = picks;
  }

  // Group by position for display
  const grouped = new Map<number, { player: Player; points: number }[]>();
  for (const entry of dreamTeamPlayers) {
    const pos = entry.player.element_type;
    if (!grouped.has(pos)) grouped.set(pos, []);
    grouped.get(pos)!.push(entry);
  }

  const positions = [1, 2, 3, 4];

  return (
    <Card className="bg-fpl-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Dream Team</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {positions.map((pos) => {
            const group = grouped.get(pos) || [];
            if (group.length === 0) return null;
            return (
              <div key={pos}>
                <div className="flex items-center gap-2 mb-2">
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
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.map((entry) => {
                    const team = teamMap.get(entry.player.team);
                    return (
                      <div
                        key={entry.player.id}
                        className="flex items-center gap-2 rounded-lg bg-fpl-elevated px-3 py-2"
                      >
                        <div>
                          <span className="text-xs font-medium">
                            {entry.player.web_name}
                          </span>
                          <span className="text-[10px] text-muted-foreground ml-1">
                            {team?.short_name}
                          </span>
                        </div>
                        <span className="font-stat text-sm font-semibold text-fpl-emerald">
                          {entry.points}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
