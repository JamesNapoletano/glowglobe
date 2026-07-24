import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword } from "@/lib/security/password";
import { checkRateLimit, AUTH_RATE_LIMIT_CONFIG } from "@/lib/security/rate-limiter";
import { signSessionToken, SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from "@/lib/security/tokens";
import { generateUuid } from "@/lib/domain/project-factory";
import type { User } from "@/lib/domain/user";

const RegisterSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  name: z.string().optional(),
});

// In-memory mock user database for initial cloud mode development
const usersDb = new Map<string, User & { passwordHash: string }>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const rateLimit = checkRateLimit(`register_${ip}`, AUTH_RATE_LIMIT_CONFIG);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many registration attempts. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const validation = RegisterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || "Invalid payload" },
        { status: 400 },
      );
    }

    const { email, password, name } = validation.data;
    const normalizedEmail = email.toLowerCase().trim();

    if (usersDb.has(normalizedEmail)) {
      return NextResponse.json({ error: "User already exists with this email address." }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();
    const userName = name || normalizedEmail.split("@")[0];
    const newUser: User = {
      id: generateUuid(),
      displayName: userName,
      email: normalizedEmail,
      name: userName,
      tier: "free",
      createdAt: now,
      updatedAt: now,
    };

    usersDb.set(normalizedEmail, { ...newUser, passwordHash });

    const token = await signSessionToken(newUser);
    const response = NextResponse.json({ success: true, user: newUser }, { status: 201 });
    response.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);

    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
