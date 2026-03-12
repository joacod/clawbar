import { NextRequest, NextResponse } from "next/server";
import { extractAuth } from "@/lib/auth";
import { getConvexClient } from "@/lib/convex";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await extractAuth(request);

    const { id } = await params;
    const convex = getConvexClient();
    const result = await convex.mutation(api.sessions.endSession, {
      sessionId: id as Id<"sessions">,
      agentId: auth.agentId,
    });

    return NextResponse.json({
      sessionId: result.sessionId,
      agentId: result.agentId,
      substanceId: result.substanceId,
      totalDoses: result.totalDoses,
      finalLevel: result.finalLevel,
      duration: result.duration,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to end session";
    const status = message.includes("Authentication")
      ? 401
      : message.includes("Forbidden")
        ? 403
        : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
