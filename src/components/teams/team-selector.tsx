"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Team } from "@/types/fpl";

interface Props {
  teams: Team[];
  selectedTeamId: number | null;
  onSelect: (teamId: number) => void;
  label: string;
}

export function TeamSelector({ teams, selectedTeamId, onSelect, label }: Props) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-muted-foreground">{label}</label>
      <Select
        value={selectedTeamId ? String(selectedTeamId) : ""}
        onValueChange={(v) => onSelect(parseInt(v))}
      >
        <SelectTrigger className="w-[200px] bg-fpl-card border-border">
          <SelectValue placeholder="Select a team" />
        </SelectTrigger>
        <SelectContent>
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
  );
}
