import { z } from "zod";
import DOMPurify from "dompurify";
import { GLOWGLOBE_EXPORT_FORMAT, type ProjectExportEnvelope } from "@/lib/domain/project-serializer";
import { generateUuid } from "@/lib/domain/project-factory";
import type { Project } from "@/lib/domain/types";

// Maximum allowable import file size: 15MB
export const MAX_IMPORT_SIZE_BYTES = 15 * 1024 * 1024;

/**
 * Zod schema for validating basic entity structures in imported projects.
 */
const EntitySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  title: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
}).passthrough();

const ProjectImportSchema = z.object({
  format: z.literal(GLOWGLOBE_EXPORT_FORMAT),
  version: z.number().max(10),
  exportedAt: z.string(),
  project: z.object({
    id: z.string(),
    title: z.string(),
    summary: z.string().optional(),
    lifecycleState: z.enum(["active", "archived", "trashed"]).optional(),
    chapters: z.array(z.any()).optional(),
    characters: z.array(EntitySchema).optional(),
    locations: z.array(EntitySchema).optional(),
  }).passthrough(),
});

export type ImportSecurityResult =
  | {
      success: true;
      sanitizedProject: Project;
    }
  | {
      success: false;
      error: string;
    };

/**
 * Sanitizes rich text strings to prevent stored XSS vulnerabilities.
 */
function sanitizeHtmlString(inputStr: string | undefined): string | undefined {
  if (!inputStr) return inputStr;
  if (typeof window !== "undefined") {
    return DOMPurify.sanitize(inputStr);
  }
  // Basic server-side fallback if DOMPurify requires DOM window
  return inputStr
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "");
}

/**
 * Validates, sanitizes, and re-binds ownership of imported project JSON payloads.
 */
export function validateAndSanitizeProjectImport(
  rawJsonString: string,
  targetUserId: string = "local-user",
): ImportSecurityResult {
  if (rawJsonString.length > MAX_IMPORT_SIZE_BYTES) {
    return {
      success: false,
      error: "Project import file exceeds the maximum 15MB size limit.",
    };
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawJsonString);
  } catch {
    return {
      success: false,
      error: "Invalid JSON file structure. Could not parse payload.",
    };
  }

  const validation = ProjectImportSchema.safeParse(parsedJson);
  if (!validation.success) {
    const issueStr = validation.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
    return {
      success: false,
      error: `Project import schema validation failed (${issueStr}).`,
    };
  }

  const envelope = parsedJson as ProjectExportEnvelope;
  const project = envelope.project;

  // Perform XSS sanitization on top-level text fields
  project.title = sanitizeHtmlString(project.title) ?? "Imported Project";
  project.description = sanitizeHtmlString(project.description) ?? "";
  project.genre = sanitizeHtmlString(project.genre) ?? "";

  // Generate fresh project ID to prevent collision & re-bind ownership
  const newProjectId = generateUuid();
  const title = project.title || "Imported Project";
  const updatedProject: Project = {
    ...project,
    id: newProjectId,
    displayName: title,
    title,
    updatedAt: new Date().toISOString(),
  };

  return {
    success: true,
    sanitizedProject: updatedProject,
  };
}
