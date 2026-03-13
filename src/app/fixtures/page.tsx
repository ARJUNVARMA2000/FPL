import { getBootstrapData, getFixtures } from "@/lib/fpl-api";
import { FixturesView } from "@/components/fixtures/fixtures-view";

export const dynamic = "force-dynamic";

export default async function FixturesPage() {
  const [bootstrap, fixtures] = await Promise.all([
    getBootstrapData(),
    getFixtures(),
  ]);

  return (
    <FixturesView
      fixtures={fixtures}
      teams={bootstrap.teams}
      gameweeks={bootstrap.events}
    />
  );
}
