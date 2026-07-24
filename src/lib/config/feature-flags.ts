/**
 * Runtime Feature Flags for GlowGlobe
 *
 * Controls whether cloud authentication, multi-tenant backend APIs,
 * and subscription tier project quotas are active.
 */

export const FEATURE_FLAGS = {
  /**
   * When true, route middleware enforces login and project creation checks user tier limits.
   * When false, GlowGlobe operates seamlessly offline in local-first IndexedDB mode.
   */
  ENABLE_USER_AUTH: process.env.NEXT_PUBLIC_ENABLE_AUTH === "true",

  /**
   * Enforces project quota checks based on user tier (Free: 1, Hobby: 20, Pro: 100).
   * Defaults to false when auth is disabled so local users have unlimited projects.
   */
  ENABLE_TIER_LIMITS: process.env.NEXT_PUBLIC_ENABLE_TIER_LIMITS === "true",

  /**
   * Allows manual offline toggle in UI header for local editing.
   */
  ALLOW_OFFLINE_BYPASS: true,
} as const;

export function isAuthEnabled(): boolean {
  if (typeof window !== "undefined") {
    const override = window.localStorage.getItem("glowglobe.overrideAuth");
    if (override === "true") return true;
    if (override === "false") return false;
  }
  return FEATURE_FLAGS.ENABLE_USER_AUTH;
}

export function isTierLimitsEnabled(): boolean {
  if (typeof window !== "undefined") {
    const override = window.localStorage.getItem("glowglobe.overrideTiers");
    if (override === "true") return true;
    if (override === "false") return false;
  }
  return isAuthEnabled() || FEATURE_FLAGS.ENABLE_TIER_LIMITS;
}
