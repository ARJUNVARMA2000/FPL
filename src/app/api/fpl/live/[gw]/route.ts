import { NextResponse } from "next/server";

const FPL_BASE = "https://fantasy.premierleague.com/api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ gw: string }> }
) {
  const { gw } = await params;

  try {
    const res = await fetch(`${FPL_BASE}/event/${gw}/live/`, {
      headers: {
        "User-Agent": "FPL-Dashboard/1.0",
      },
      next: { revalidate: 60 }, // Live data refreshes more often
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch GW${gw} live data`, status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "FPL API unavailable", details: String(error) },
      { status: 503 }
    );
  }
}
