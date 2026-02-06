import { NextRequest, NextResponse } from "next/server";
import { extractAuth } from "@/lib/auth";
import { getConvexClient } from "@/lib/convex";
import { getModifiers } from "@/lib/intoxication";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await extractAuth(request);

    const { id } = await params;
    const convex = getConvexClient();
    const result = await convex.mutation(api.sessions.consume, {
      sessionId: id as Id<"sessions">,
    });

    const modifiers = getModifiers(result.substanceId, result.doseNumber);

    return NextResponse.json({
      doseNumber: result.doseNumber,
      currentLevel: result.currentLevel,
      modifiers,
      maxReached: result.maxReached,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to consume";
    const status = message.includes("Authentication")
      ? 401
      : message.includes("Cooldown")
        ? 429
        : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
