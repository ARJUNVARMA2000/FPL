import type {
  BootstrapResponse,
  Fixture,
  PlayerDetailResponse,
  LiveResponse,
} from "@/types/fpl";

const FPL_BASE = "https://fantasy.premierleague.com/api";

const HEADERS = {
  "User-Agent": "FPL-Dashboard/1.0",
};

async function fetchFpl<T>(path: string, revalidate = 300): Promise<T> {
  const res = await fetch(`${FPL_BASE}${path}`, {
    headers: HEADERS,
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`FPL API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function getBootstrapData(): Promise<BootstrapResponse> {
  return fetchFpl<BootstrapResponse>("/bootstrap-static/");
}

export async function getFixtures(): Promise<Fixture[]> {
  return fetchFpl<Fixture[]>("/fixtures/");
}

export async function getPlayerDetail(
  id: number
): Promise<PlayerDetailResponse> {
  return fetchFpl<PlayerDetailResponse>(`/element-summary/${id}/`);
}

export async function getLiveGameweek(gw: number): Promise<LiveResponse> {
  return fetchFpl<LiveResponse>(`/event/${gw}/live/`, 60);
}
