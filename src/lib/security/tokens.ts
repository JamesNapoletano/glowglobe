import { SignJWT, jwtVerify } from "jose";
import type { User, UserSession } from "@/lib/domain/user";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "glowglobe-secret-jwt-key-minimum-32-chars-long-for-security!",
);

export const SESSION_COOKIE_NAME = "glowglobe_session";
export const TOKEN_EXPIRATION = "7d"; // 7 days

export interface JWTPayload {
  sub: string;
  email: string;
  tier: User["tier"];
  role: string;
}

/**
 * Signs a JWT session token for a user.
 */
export async function signSessionToken(user: User): Promise<string> {
  return new SignJWT({
    email: user.email,
    tier: user.tier,
    role: "user",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRATION)
    .sign(JWT_SECRET);
}

/**
 * Verifies a JWT session token and returns the parsed payload.
 */
export async function verifySessionToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      sub: payload.sub as string,
      email: payload.email as string,
      tier: payload.tier as User["tier"],
      role: (payload.role as string) || "user",
    };
  } catch {
    return null;
  }
}

/**
 * Standard cookie config options for HTTP-only SameSite=Strict cookies.
 */
export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
};
