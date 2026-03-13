"use client";

import { useState, useMemo } from "react";
import { Fixture, Team, Gameweek } from "@/types/fpl";
import { FixtureCard } from "./fixture-card";
import { GameweekSelector } from "./gameweek-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  fixtures: Fixture[];
  teams: Team[];
  gameweeks: Gameweek[];
}

export function FixturesView({ fixtures, teams, gameweeks }: Props) {
  const currentEvent =
    gameweeks.find((gw) => gw.is_current)?.id ||
    gameweeks.find((gw) => gw.is_next)?.id ||
    1;
  const [selectedGw, setSelectedGw] = useState(currentEvent);
  const [teamFilter, setTeamFilter] = useState<string>("all");

  const teamMap = useMemo(
    () => new Map(teams.map((t) => [t.id, t])),
    [teams]
  );

  const gwFixtures = useMemo(() => {
    let filtered = fixtures.filter((f) => f.event === selectedGw);
    if (teamFilter !== "all") {
      const teamId = parseInt(teamFilter);
      filtered = filtered.filter(
        (f) => f.team_h === teamId || f.team_a === teamId
      );
    }
    return filtered;
  }, [fixtures, selectedGw, teamFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <GameweekSelector
          gameweeks={gameweeks}
          currentGw={selectedGw}
          onSelect={setSelectedGw}
        />
        <Select value={teamFilter} onValueChange={setTeamFilter}>
          <SelectTrigger className="w-[160px] bg-fpl-card border-border">
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

      {gwFixtures.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No fixtures found for this gameweek.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {gwFixtures.map((fixture) => (
            <FixtureCard
              key={fixture.id}
              fixture={fixture}
              teams={teamMap}
            />
          ))}
        </div>
      )}
    </div>
  );
}
