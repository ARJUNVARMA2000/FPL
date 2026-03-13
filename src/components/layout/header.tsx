"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/players": {
    title: "Players Explorer",
    description: "Search, filter, and compare all Premier League players",
  },
  "/fixtures": {
    title: "Fixtures",
    description: "Browse fixtures by gameweek with difficulty ratings",
  },
  "/gameweek": {
    title: "Gameweek Live",
    description: "Real-time scores, top performers, and dream team",
  },
  "/teams": {
    title: "Team Comparison",
    description: "Compare team stats side by side",
  },
};

export function Header() {
  const pathname = usePathname();
  const page = pageTitles[pathname] || pageTitles["/players"];

  return (
    <header className="border-b border-border bg-[#0d0d14]/80 backdrop-blur-sm">
      <div className="flex h-14 items-center px-6">
        <div>
          <h1 className="text-lg font-semibold">{page.title}</h1>
          <p className="text-xs text-muted-foreground">{page.description}</p>
        </div>
      </div>
    </header>
  );
}
