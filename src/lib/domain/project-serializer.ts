import { normalizeProject } from "@/lib/domain/project-normalizer";
import { generateUuid } from "@/lib/domain/project-factory";
import type { Project } from "@/lib/domain/types";

export const GLOWGLOBE_EXPORT_FORMAT = "glowglobe-project";
export const GLOWGLOBE_EXPORT_VERSION = 1;

export type ProjectExportEnvelope = {
  format: typeof GLOWGLOBE_EXPORT_FORMAT;
  version: typeof GLOWGLOBE_EXPORT_VERSION;
  exportedAt: string;
  project: Project;
};

export type ImportValidationResult =
  | {
      success: true;
      project: Project;
      warning?: string;
    }
  | {
      success: false;
      error: string;
    };

/**
 * Serializes a Project object into a formatted JSON string with an export envelope.
 */
export function serializeProjectToJson(project: Project): string {
  const normalized = normalizeProject(project);
  const envelope: ProjectExportEnvelope = {
    format: GLOWGLOBE_EXPORT_FORMAT,
    version: GLOWGLOBE_EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    project: normalized,
  };

  return JSON.stringify(envelope, null, 2);
}

/**
 * Triggers a browser file download of the project JSON file.
 */
export function downloadProjectAsJsonFile(project: Project): void {
  const jsonString = serializeProjectToJson(project);
  const safeTitle =
    project.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "project";
  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `${safeTitle}-glowglobe-${dateStr}.json`;

  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Parses and validates an imported JSON string. Accepts both envelope format and raw Project JSON.
 */
export function parseAndValidateProjectImport(
  jsonString: string,
  existingProjectIds: string[] = [],
): ImportValidationResult {
  if (!jsonString || typeof jsonString !== "string" || jsonString.trim().length === 0) {
    return {
      success: false,
      error: "The provided file is empty.",
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown JSON syntax error";
    return {
      success: false,
      error: `Failed to parse JSON file: ${message}`,
    };
  }

  if (!parsed || typeof parsed !== "object") {
    return {
      success: false,
      error: "Invalid file content: Expected a JSON object.",
    };
  }

  const payload = parsed as Record<string, unknown>;
  let rawProject: Record<string, unknown> | null = null;

  if (payload.format === GLOWGLOBE_EXPORT_FORMAT && payload.project && typeof payload.project === "object") {
    rawProject = payload.project as Record<string, unknown>;
  } else if (payload.id && typeof payload.id === "string" && payload.title) {
    rawProject = payload;
  }

  if (!rawProject) {
    return {
      success: false,
      error:
        "Unrecognized file format. Expected a GlowGlobe project export file (.json) or a valid project object.",
    };
  }

  try {
    const normalized = normalizeProject(rawProject as unknown as Project);

    if (!normalized.id || typeof normalized.id !== "string" || normalized.id.trim() === "") {
      normalized.id = generateUuid();
    }

    if (!normalized.title || typeof normalized.title !== "string" || normalized.title.trim() === "") {
      normalized.title = "Imported Project";
      normalized.displayName = "Imported Project";
    }

    let warning: string | undefined;

    if (existingProjectIds.includes(normalized.id)) {
      const newId = generateUuid();
      normalized.id = newId;
      normalized.title = `${normalized.title} (Imported)`;
      normalized.displayName = normalized.title;
      normalized.updatedAt = new Date().toISOString();
      warning =
        "A project with the same ID already existed in your workspace. A new project ID was assigned and title updated so no existing work was overwritten.";
    }

    return {
      success: true,
      project: normalized,
      warning,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Normalization error";
    return {
      success: false,
      error: `Failed to validate and normalize project data: ${message}`,
    };
  }
}

/**
 * Reads a File object as text.
 */
export function readJsonFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        resolve(content);
      } else {
        reject(new Error("Failed to read file as text string."));
      }
    };

    reader.onerror = () => {
      reject(reader.error ?? new Error("File reading error."));
    };

    reader.readAsText(file, "UTF-8");
  });
}
