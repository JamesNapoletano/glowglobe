import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/security/tokens";
import { checkProjectCreationQuota } from "@/lib/services/tier-service";
import { createProjectFromInput } from "@/lib/domain/project-factory";
import type { Project } from "@/lib/domain/types";

const CreateProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  summary: z.string().optional(),
  author: z.string().optional(),
});

// Mock server-side project storage for API testing
const userProjectsStore = new Map<string, Project[]>();

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized. Login required." }, { status: 401 });
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: "Invalid session." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = CreateProjectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || "Invalid payload" },
        { status: 400 },
      );
    }

    const existingProjects = userProjectsStore.get(session.sub) || [];

    // ENFORCE SUBSCRIPTION TIER QUOTA (Free: 1, Hobby: 20, Pro: 100)
    const quotaCheck = checkProjectCreationQuota(session.tier, existingProjects, "active");
    if (!quotaCheck.allowed) {
      return NextResponse.json(
        {
          error: "Quota Exceeded",
          message: quotaCheck.message,
          tier: session.tier,
          maxAllowed: quotaCheck.maxAllowed,
          currentCount: quotaCheck.currentCount,
        },
        { status: 403 },
      );
    }

    const title = validation.data.title;
    const summary = validation.data.summary || "";
    const newProject = createProjectFromInput({
      title,
      genre: "General",
      description: summary,
    });

    existingProjects.push(newProject);
    userProjectsStore.set(session.sub, existingProjects);

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
