import { NextRequest, NextResponse } from "next/server";

function withSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

function withApiCorsHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Moltbook-Identity, X-Agent-Id, X-Agent-Name",
  );
  response.headers.set("Access-Control-Max-Age", "86400");
  return response;
}

export function proxy(request: NextRequest) {
  const isApiRoute = request.nextUrl.pathname.startsWith("/api/");

  if (isApiRoute && request.method === "OPTIONS") {
    return withApiCorsHeaders(withSecurityHeaders(new NextResponse(null, { status: 204 })));
  }

  const response = NextResponse.next();
  withSecurityHeaders(response);

  if (isApiRoute) {
    withApiCorsHeaders(response);
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/"],
};
