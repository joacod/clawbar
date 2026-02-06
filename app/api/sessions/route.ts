import { NextRequest, NextResponse } from "next/server";
import { extractAuth } from "@/lib/auth";
import { getConvexClient } from "@/lib/convex";
import { SUBSTANCES } from "@/lib/substances";
import { getCurrentLevel } from "@/lib/intoxication";
import { parseBody } from "@/lib/sanitize";
import { api } from "@/convex/_generated/api";

export async function POST(request: NextRequest) {
  try {
    const auth = await extractAuth(request);

    const body = await parseBody<{ substanceId?: string }>(request);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid or oversized request body (max 1KB)" },
        { status: 400 },
      );
    }

    if (!body.substanceId || typeof body.substanceId !== "string") {
      return NextResponse.json(
        { error: "substanceId is required" },
        { status: 400 },
      );
    }

    const substance = SUBSTANCES[body.substanceId];
    if (!substance) {
      return NextResponse.json(
        { error: `Unknown substance: ${body.substanceId}` },
        { status: 400 },
      );
    }

    const convex = getConvexClient();
    const result = await convex.mutation(api.sessions.createSession, {
      agentId: auth.agentId,
      agentName: auth.agentName,
      substanceId: body.substanceId,
    });

    const level = getCurrentLevel(body.substanceId, 0);

    return NextResponse.json({
      sessionId: result.sessionId,
      substance: {
        id: substance.id,
        name: substance.name,
        emoji: substance.emoji,
        unit: substance.unit,
        maxDoses: substance.maxDoses,
      },
      currentLevel: level.name,
      modifiers: level.modifiers,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create session";
    const status = message.includes("Authentication") ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
