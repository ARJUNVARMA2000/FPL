import { getBootstrapData, getLiveGameweek } from "@/lib/fpl-api";
import { GameweekView } from "@/components/gameweek/gameweek-view";

export const dynamic = "force-dynamic";

export default async function GameweekPage() {
  const bootstrap = await getBootstrapData();

  // Find current or most recent finished gameweek
  const currentGw =
    bootstrap.events.find((gw) => gw.is_current) ||
    [...bootstrap.events]
      .reverse()
      .find((gw) => gw.finished) ||
    bootstrap.events[0];

  const liveData = await getLiveGameweek(currentGw.id);

  return (
    <GameweekView
      gameweek={currentGw}
      liveData={liveData.elements}
      players={bootstrap.elements}
      teams={bootstrap.teams}
    />
  );
}
