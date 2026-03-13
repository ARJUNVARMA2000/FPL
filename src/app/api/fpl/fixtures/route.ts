import { NextResponse } from "next/server";

const FPL_BASE = "https://fantasy.premierleague.com/api";

export async function GET() {
  try {
    const res = await fetch(`${FPL_BASE}/fixtures/`, {
      headers: {
        "User-Agent": "FPL-Dashboard/1.0",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch fixtures", status: res.status },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "FPL API unavailable", details: String(error) },
      { status: 503 }
    );
  }
}
