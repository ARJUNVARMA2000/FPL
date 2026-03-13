"use client";

import { Fixture, Team } from "@/types/fpl";
import { DifficultyBadge } from "./difficulty-badge";
import { formatDate } from "@/lib/utils";

interface Props {
  fixture: Fixture;
  teams: Map<number, Team>;
}

export function FixtureCard({ fixture, teams }: Props) {
  const homeTeam = teams.get(fixture.team_h);
  const awayTeam = teams.get(fixture.team_a);
  const isFinished = fixture.finished || fixture.finished_provisional;

  return (
    <div className="rounded-lg border border-border bg-fpl-card p-4 hover:bg-fpl-elevated/50 transition-colors">
      <div className="flex items-center justify-between gap-3">
        {/* Home team */}
        <div className="flex-1 text-right">
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm font-medium">
              {homeTeam?.short_name || "???"}
            </span>
            <DifficultyBadge difficulty={fixture.team_h_difficulty} />
          </div>
        </div>

        {/* Score / Time */}
        <div className="flex flex-col items-center min-w-[60px]">
          {isFinished || fixture.started ? (
            <div className="font-stat text-lg font-bold">
              <span className={fixture.team_h_score! > fixture.team_a_score! ? "text-fpl-emerald" : ""}>
                {fixture.team_h_score}
              </span>
              <span className="text-muted-foreground mx-1">-</span>
              <span className={fixture.team_a_score! > fixture.team_h_score! ? "text-fpl-emerald" : ""}>
                {fixture.team_a_score}
              </span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">
              {fixture.kickoff_time ? formatDate(fixture.kickoff_time) : "TBD"}
            </span>
          )}
          {isFinished && (
            <span className="text-[10px] text-muted-foreground">FT</span>
          )}
          {fixture.started && !isFinished && (
            <span className="text-[10px] text-fpl-emerald animate-pulse">
              LIVE
            </span>
          )}
        </div>

        {/* Away team */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <DifficultyBadge difficulty={fixture.team_a_difficulty} />
            <span className="text-sm font-medium">
              {awayTeam?.short_name || "???"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
