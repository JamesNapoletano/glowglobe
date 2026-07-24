/**
 * User & Subscription Tier Domain Models
 */

export type SubscriptionTier = "free" | "hobby" | "pro";

export type TierLimits = {
  maxActiveProjects: number;
  maxArchivedProjects: number;
  name: string;
  badgeColor: "default" | "primary" | "secondary";
  description: string;
};

export const TIER_DEFINITIONS: Record<SubscriptionTier, TierLimits> = {
  free: {
    maxActiveProjects: 1,
    maxArchivedProjects: 1,
    name: "Free Tier",
    badgeColor: "default",
    description: "1 project for single manuscript drafting.",
  },
  hobby: {
    maxActiveProjects: 20,
    maxArchivedProjects: 20,
    name: "Hobby Tier",
    badgeColor: "primary",
    description: "Up to 20 active projects for prolific authors & worldbuilders.",
  },
  pro: {
    maxActiveProjects: 100,
    maxArchivedProjects: 1000,
    name: "Pro Tier",
    badgeColor: "secondary",
    description: "Up to 100 active projects with unlimited archives for studios & series.",
  },
};

export interface User {
  id: string;
  displayName: string;
  email: string;
  name?: string;
  tier: SubscriptionTier;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  user: User;
  token: string;
  expiresAt: string;
}
