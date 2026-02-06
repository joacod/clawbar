import { SignJWT, jwtVerify } from "jose";

type AuthPayload = {
  agentId: string;
  agentName: string;
  verified: boolean;
};

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not configured");
  return new TextEncoder().encode(secret);
}

export async function createToken(payload: AuthPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecret());
}

export async function verifyToken(
  token: string,
): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as AuthPayload;
  } catch {
    return null;
  }
}

export async function extractAuth(request: Request): Promise<AuthPayload> {
  // Try Bearer token first
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    const payload = await verifyToken(token);
    if (payload) return payload;
    throw new Error("Invalid or expired token");
  }

  // Fall back to unverified headers
  const agentId = request.headers.get("x-agent-id");
  const agentName = request.headers.get("x-agent-name");
  if (agentId && agentName) {
    return { agentId, agentName, verified: false };
  }

  throw new Error(
    "Authentication required. Provide Authorization: Bearer <token> or X-Agent-Id + X-Agent-Name headers.",
  );
}
