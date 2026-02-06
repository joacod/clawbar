import { NextRequest, NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex";
import { api } from "@/convex/_generated/api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const substance = searchParams.get("substance") ?? undefined;
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!, 10)
      : undefined;

    const convex = getConvexClient();
    const leaderboard = await convex.query(api.leaderboard.getLeaderboard, {
      substanceId: substance,
      limit,
    });

    return NextResponse.json({ leaderboard });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get leaderboard";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
