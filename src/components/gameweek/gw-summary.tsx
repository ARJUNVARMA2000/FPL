"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Star, ArrowRightLeft } from "lucide-react";
import { Gameweek, Player } from "@/types/fpl";

interface Props {
  gameweek: Gameweek;
  players: Player[];
}

export function GWSummary({ gameweek, players }: Props) {
  const mostCaptained = gameweek.most_captained
    ? players.find((p) => p.id === gameweek.most_captained)
    : null;
  const mostTransferredIn = gameweek.most_transferred_in
    ? players.find((p) => p.id === gameweek.most_transferred_in)
    : null;
  const topElement = gameweek.top_element_info
    ? players.find((p) => p.id === gameweek.top_element_info!.id)
    : null;

  const cards = [
    {
      title: "Average Score",
      value: gameweek.average_entry_score || "—",
      icon: TrendingUp,
      color: "#7c3aed",
    },
    {
      title: "Highest Score",
      value: gameweek.highest_score || "—",
      icon: Star,
      color: "#06d6a0",
    },
    {
      title: "Most Captained",
      value: mostCaptained?.web_name || "—",
      icon: Users,
      color: "#22d3ee",
    },
    {
      title: "Most Transferred In",
      value: mostTransferredIn?.web_name || "—",
      icon: ArrowRightLeft,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="bg-fpl-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${card.color}15` }}
              >
                <card.icon
                  className="h-5 w-5"
                  style={{ color: card.color }}
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{card.title}</p>
                <p className="font-stat text-lg font-semibold">
                  {card.value}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
