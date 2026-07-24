import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyPassword } from "@/lib/security/password";
import { checkRateLimit, AUTH_RATE_LIMIT_CONFIG } from "@/lib/security/rate-limiter";
import { signSessionToken, SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from "@/lib/security/tokens";
import type { User } from "@/lib/domain/user";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Demo user store reference
const demoUsersDb: Map<string, User & { passwordHash: string }> = new Map();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const rateLimit = checkRateLimit(`login_${ip}`, AUTH_RATE_LIMIT_CONFIG);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many failed login attempts. Please wait 15 minutes before trying again." },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const validation = LoginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || "Invalid credentials format" },
        { status: 400 },
      );
    }

    const { email, password } = validation.data;
    const normalizedEmail = email.toLowerCase().trim();

    const userEntry = demoUsersDb.get(normalizedEmail);

    // Fallback demo user for local testing if not found in db
    let validUser: User | null = null;
    if (userEntry) {
      const isValid = await verifyPassword(password, userEntry.passwordHash);
      if (isValid) {
        const { passwordHash: _, ...userNoHash } = userEntry;
        validUser = userNoHash;
      }
    } else if (normalizedEmail === "demo@glowglobe.app" && password === "Password123!") {
      validUser = {
        id: "d0000000-0000-4000-8000-000000000001",
        displayName: "Demo Author",
        email: "demo@glowglobe.app",
        name: "Demo Author",
        tier: "free",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    if (!validUser) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = await signSessionToken(validUser);
    const response = NextResponse.json({ success: true, user: validUser });
    response.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);

    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
