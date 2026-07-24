"use client";

import { Box, Typography } from "@mui/material";
import { useThemeMode } from "@/theme/theme-context";

type GlowGlobeLogoProps = {
  compact?: boolean;
  showWordmark?: boolean;
  subtitle?: string;
};

export function GlowGlobeLogo({ compact = false, showWordmark = true, subtitle }: GlowGlobeLogoProps) {
  const { themeMode } = useThemeMode();
  const iconSize = compact ? 30 : 38;
  const isEarthy = themeMode === "earthy";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: compact ? 1.25 : 1.6, minWidth: 0 }}>
      {/* Dynamic Dune Glowglobe / Palantír Orb Icon */}
      <Box
        aria-hidden
        sx={{
          width: iconSize,
          height: iconSize,
          position: "relative",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          "&:hover": {
            transform: "scale(1.1) rotate(6deg)",
          },
        }}
      >
        {isEarthy ? (
          /* Dune Suspensor Glowglobe & Ancient Palantír (Earthy Theme) */
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 4px 10px rgba(117, 85, 48, 0.35))" }}
          >
            <defs>
              {/* Burnished Brass Levitation Ring Gradient */}
              <linearGradient id="earthyRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4A359" />
                <stop offset="50%" stopColor="#8C5828" />
                <stop offset="100%" stopColor="#4A2C11" />
              </linearGradient>

              {/* Dune Spice & Warm Amber Palantír Inner Sphere */}
              <radialGradient id="earthyOrbGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFF2D6" />
                <stop offset="25%" stopColor="#F5B942" />
                <stop offset="65%" stopColor="#B87328" />
                <stop offset="100%" stopColor="#4D270B" />
              </radialGradient>

              {/* Core Radiance Glow */}
              <filter id="amberGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Outer Suspensor Levitation Ring */}
            <circle cx="20" cy="20" r="18" stroke="url(#earthyRingGrad)" strokeWidth="1.8" strokeDasharray="26 3 8 3" />

            {/* Suspensor Notches / Gimbal Knobs */}
            <circle cx="20" cy="2" r="1.5" fill="#D4A359" />
            <circle cx="38" cy="20" r="1.5" fill="#8C5828" />
            <circle cx="20" cy="38" r="1.5" fill="#4A2C11" />
            <circle cx="2" cy="20" r="1.5" fill="#8C5828" />

            {/* Floating Glowglobe Sphere */}
            <circle cx="20" cy="20" r="14" fill="url(#earthyOrbGrad)" />

            {/* Antique Equatorial & Meridian Rings */}
            <ellipse cx="20" cy="20" rx="14" ry="5" stroke="rgba(255, 245, 220, 0.45)" strokeWidth="1" />
            <ellipse cx="20" cy="20" rx="5" ry="14" stroke="rgba(255, 245, 220, 0.35)" strokeWidth="0.9" />

            {/* Spice Glow Spark (Core Radiance) */}
            <circle cx="15" cy="14" r="2.2" fill="#FFFFFF" filter="url(#amberGlow)" />
            <circle cx="15" cy="14" r="1" fill="#FFF2D6" />
          </svg>
        ) : (
          /* Luminous Cybernetic Emerald Sphere (Glassmorphic Theme) */
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 4px 14px rgba(16, 185, 129, 0.45))" }}
          >
            <defs>
              <linearGradient id="glassRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="60%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              <radialGradient id="glassOrbGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="30%" stopColor="#34D399" />
                <stop offset="70%" stopColor="#059669" />
                <stop offset="100%" stopColor="#064E3B" />
              </radialGradient>

              <filter id="emeraldGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Orbital Glass Ring */}
            <circle cx="20" cy="20" r="18.5" stroke="url(#glassRingGrad)" strokeWidth="1.5" strokeDasharray="30 4 10 4" opacity="0.85" />

            {/* Glowing Glass Sphere */}
            <circle cx="20" cy="20" r="14.5" fill="url(#glassOrbGrad)" />

            {/* Celestial Meridian Grids */}
            <ellipse cx="20" cy="20" rx="14.5" ry="5.5" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" />
            <ellipse cx="20" cy="20" rx="5.5" ry="14.5" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.9" />

            {/* Celestial Spark */}
            <circle cx="14.5" cy="13.5" r="2.5" fill="#FFFFFF" filter="url(#emeraldGlow)" />
          </svg>
        )}
      </Box>

      {/* Wordmark Typography */}
      {showWordmark ? (
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              background: isEarthy
                ? "linear-gradient(135deg, #4A3525 0%, #755530 55%, #A3753F 100%)"
                : "linear-gradient(135deg, #FFFFFF 0%, #34D399 65%, #F59E0B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: isEarthy
                ? '"Iowan Old Style", "Palatino Linotype", Georgia, serif'
                : '"Plus Jakarta Sans", Inter, sans-serif',
              fontSize: compact ? 14 : 16.5,
              fontWeight: isEarthy ? 800 : 800,
              letterSpacing: isEarthy ? "0.08em" : "0.12em",
              lineHeight: 1.1,
              textTransform: isEarthy ? "none" : "uppercase",
              filter: isEarthy ? "none" : "drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
            }}
          >
            GlowGlobe
          </Typography>

          {subtitle ? (
            <Typography
              color="text.secondary"
              sx={{
                fontSize: 11.5,
                lineHeight: 1.25,
                mt: 0.3,
                overflowWrap: "anywhere",
                opacity: 0.85,
                fontFamily: isEarthy ? '"Iowan Old Style", Georgia, serif' : "inherit",
              }}
            >
              {subtitle}
            </Typography>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
}
