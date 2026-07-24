"use client";

import { Box, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import WorkspacePremiumRounded from "@mui/icons-material/WorkspacePremiumRounded";
import StorageRounded from "@mui/icons-material/StorageRounded";
import { TIER_DEFINITIONS, type SubscriptionTier } from "@/lib/domain/user";
import { isTierLimitsEnabled } from "@/lib/config/feature-flags";

type TierBannerProps = {
  tier: SubscriptionTier;
  activeCount: number;
  onUpgradeClick?: () => void;
};

export function TierBanner({ tier, activeCount, onUpgradeClick }: TierBannerProps) {
  const isLimitsActive = isTierLimitsEnabled();
  const limits = TIER_DEFINITIONS[tier] ?? TIER_DEFINITIONS.free;
  const max = limits.maxActiveProjects;
  const percentage = isLimitsActive ? Math.min(100, Math.round((activeCount / max) * 100)) : 0;

  const isAtLimit = isLimitsActive && activeCount >= max;

  return (
    <Box
      className="glass-panel"
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "background.panel",
        border: "1px solid",
        borderColor: isAtLimit ? "warning.main" : "divider",
      }}
    >
      <Stack spacing={1}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            {isLimitsActive ? (
              <WorkspacePremiumRounded color={tier === "pro" ? "secondary" : "primary"} fontSize="small" />
            ) : (
              <StorageRounded color="primary" fontSize="small" />
            )}
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {isLimitsActive ? `${limits.name} Workspace Storage` : "Local Manuscript Storage"}
            </Typography>
          </Stack>

          <Chip
            label={isLimitsActive ? `${activeCount} / ${max} Active Projects` : `${activeCount} Projects (Unlimited)`}
            size="small"
            color={isLimitsActive ? (isAtLimit ? "warning" : tier === "pro" ? "secondary" : "primary") : "default"}
            variant="outlined"
            onClick={isLimitsActive ? onUpgradeClick : undefined}
            sx={{ cursor: isLimitsActive && onUpgradeClick ? "pointer" : "default", fontWeight: 600 }}
          />
        </Box>

        {isLimitsActive ? (
          <LinearProgress
            variant="determinate"
            value={percentage}
            color={isAtLimit ? "warning" : tier === "pro" ? "secondary" : "primary"}
            sx={{ height: 6, borderRadius: 3 }}
          />
        ) : (
          <LinearProgress
            variant="determinate"
            value={100}
            color="primary"
            sx={{ height: 4, borderRadius: 2, opacity: 0.3 }}
          />
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="caption" color="text.secondary">
            {isLimitsActive
              ? limits.description
              : "Standalone offline mode. Tier limits & login walls are currently disabled."}
          </Typography>
          {isLimitsActive && tier !== "pro" && (
            <Typography
              variant="caption"
              sx={{
                cursor: "pointer",
                fontWeight: 700,
                color: "primary.main",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={onUpgradeClick}
            >
              Upgrade Tier
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
