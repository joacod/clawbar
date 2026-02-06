import { NextRequest, NextResponse } from "next/server";
import { extractAuth } from "@/lib/auth";
import { getConvexClient } from "@/lib/convex";
import { getCurrentLevel } from "@/lib/intoxication";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await extractAuth(request);

    const { id } = await params;
    const convex = getConvexClient();
    const session = await convex.query(api.sessions.getSession, {
      sessionId: id as Id<"sessions">,
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const level = getCurrentLevel(session.substanceId, session.doseCount);

    return NextResponse.json({
      sessionId: session._id,
      agentId: session.agentId,
      agentName: session.agentName,
      substanceId: session.substanceId,
      doseCount: session.doseCount,
      currentLevel: level.name,
      modifiers: level.modifiers,
      isActive: session.isActive,
      startedAt: session.startedAt,
      endedAt: session.endedAt,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to get session";
    const status = message.includes("Authentication") ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
