import { NextResponse } from "next/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Moltbook-Identity, X-Agent-Id, X-Agent-Name",
  "Access-Control-Max-Age": "86400",
};

/** Add CORS headers to a NextResponse */
export function withCors(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

/** Preflight OPTIONS response */
export function corsPreflightResponse(): NextResponse {
  return withCors(new NextResponse(null, { status: 204 }));
}
