import { getBootstrapData } from "@/lib/fpl-api";
import { PlayersTable } from "@/components/players/players-table";

export const dynamic = "force-dynamic";

export default async function PlayersPage() {
  const data = await getBootstrapData();

  return (
    <PlayersTable players={data.elements} teams={data.teams} />
  );
}
