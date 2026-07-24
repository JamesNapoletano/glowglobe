import { TIER_DEFINITIONS, type SubscriptionTier } from "@/lib/domain/user";
import type { Project } from "@/lib/domain/types";
import { isTierLimitsEnabled } from "@/lib/config/feature-flags";

export type QuotaCheckResult = {
  allowed: boolean;
  tier: SubscriptionTier;
  maxAllowed: number;
  currentCount: number;
  remainingCount: number;
  message?: string;
};

/**
 * Calculates project usage breakdown for a project list.
 */
export function calculateProjectUsage(projects: Project[]) {
  const activeCount = projects.filter((p) => (p.lifecycleState ?? "active") === "active").length;
  const archivedCount = projects.filter((p) => p.lifecycleState === "archived").length;
  const trashedCount = projects.filter((p) => p.lifecycleState === "trashed").length;

  return { activeCount, archivedCount, trashedCount };
}

/**
 * Checks whether a user on a given subscription tier can create or import a new project.
 * When feature flags for tier limits/auth are OFF, project creation is UNLIMITED.
 */
export function checkProjectCreationQuota(
  tier: SubscriptionTier,
  projects: Project[],
  targetState: "active" | "archived" = "active",
): QuotaCheckResult {
  const { activeCount, archivedCount } = calculateProjectUsage(projects);
  const currentCount = targetState === "active" ? activeCount : archivedCount;

  // UNLIMITED MODE: When login/tier limits flag is OFF, allow unlimited projects
  if (!isTierLimitsEnabled()) {
    return {
      allowed: true,
      tier,
      maxAllowed: Infinity,
      currentCount,
      remainingCount: Infinity,
    };
  }

  const limits = TIER_DEFINITIONS[tier] ?? TIER_DEFINITIONS.free;
  const maxAllowed = targetState === "active" ? limits.maxActiveProjects : limits.maxArchivedProjects;

  const allowed = currentCount < maxAllowed;
  const remainingCount = Math.max(0, maxAllowed - currentCount);

  let message: string | undefined;
  if (!allowed) {
    message = `You have reached the maximum allowed ${targetState} projects (${currentCount}/${maxAllowed}) for the ${limits.name}. Please upgrade to create or import more projects.`;
  }

  return {
    allowed,
    tier,
    maxAllowed,
    currentCount,
    remainingCount,
    message,
  };
}
