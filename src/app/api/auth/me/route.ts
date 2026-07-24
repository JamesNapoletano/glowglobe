import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/security/tokens";
import { TIER_DEFINITIONS } from "@/lib/domain/user";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    const response = NextResponse.json({ authenticated: false, error: "Session expired or invalid" }, { status: 401 });
    response.cookies.delete(SESSION_COOKIE_NAME);
    return response;
  }

  const tierLimits = TIER_DEFINITIONS[payload.tier] ?? TIER_DEFINITIONS.free;

  return NextResponse.json({
    authenticated: true,
    user: {
      id: payload.sub,
      email: payload.email,
      tier: payload.tier,
      tierLimits,
    },
  });
}
