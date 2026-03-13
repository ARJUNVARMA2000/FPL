import { getBootstrapData } from "@/lib/fpl-api";
import { TeamsView } from "@/components/teams/teams-view";

export const dynamic = "force-dynamic";

export default async function TeamsPage() {
  const data = await getBootstrapData();

  return (
    <TeamsView players={data.elements} teams={data.teams} />
  );
}
