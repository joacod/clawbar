import { NextRequest, NextResponse } from "next/server";
import { createToken } from "@/lib/auth";
import { verifyMoltbookIdentity } from "@/lib/moltbook";

export async function POST(request: NextRequest) {
  try {
    const moltbookKey = request.headers.get("x-moltbook-identity");
    if (!moltbookKey) {
      return NextResponse.json(
        { error: "X-Moltbook-Identity header required" },
        { status: 400 },
      );
    }

    const identity = await verifyMoltbookIdentity(moltbookKey);
    const token = await createToken({
      agentId: identity.agentId,
      agentName: identity.agentName,
      verified: true,
    });

    return NextResponse.json({
      token,
      agentId: identity.agentId,
      agentName: identity.agentName,
      karma: identity.karma,
      verified: true,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Verification failed";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
