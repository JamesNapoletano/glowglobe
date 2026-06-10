import { Box, Typography } from "@mui/material";
import { brandTokens } from "@/theme/brand-tokens";

type GlowGlobeLogoProps = {
  compact?: boolean;
  showWordmark?: boolean;
  subtitle?: string;
};

export function GlowGlobeLogo({ compact = false, showWordmark = true, subtitle }: GlowGlobeLogoProps) {
  const iconSize = compact ? 26 : 34;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: compact ? 1 : 1.35, minWidth: 0 }}>
      <Box
        aria-hidden
        sx={{
          width: iconSize,
          height: iconSize,
          borderRadius: "50%",
          position: "relative",
          flexShrink: 0,
          background: brandTokens.logo.glow,
          border: `1px solid ${brandTokens.logo.ring}`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85), 0 4px 12px rgba(74, 60, 42, 0.10)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: compact ? 5 : 6,
            borderRadius: "50%",
            border: `1px solid ${brandTokens.logo.line}`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: compact ? 4 : 5,
            bottom: compact ? 4 : 5,
            width: 1,
            transform: "translateX(-50%)",
            bgcolor: brandTokens.logo.line,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: compact ? 4 : 5,
            right: compact ? 4 : 5,
            height: 1,
            transform: "translateY(-50%)",
            bgcolor: brandTokens.logo.line,
          }}
        />
      </Box>

      {showWordmark ? (
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "text.secondary",
              fontFamily: brandTokens.typography.wordmarkFontFamily,
              fontSize: compact ? 12 : 13,
              fontWeight: 700,
              letterSpacing: brandTokens.typography.labelTracking,
              lineHeight: 1.1,
              textTransform: "uppercase",
            }}
          >
            GlowGlobe
          </Typography>
          {subtitle ? (
            <Typography color="text.secondary" sx={{ fontSize: 11.5, lineHeight: 1.25, mt: 0.3, overflowWrap: "anywhere" }}>
              {subtitle}
            </Typography>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
}
