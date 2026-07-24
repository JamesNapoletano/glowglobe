"use client";

import { useThemeMode } from "@/theme/theme-context";

export function AmbientGlassBackground() {
  const { themeMode } = useThemeMode();

  if (themeMode !== "glassmorphic") {
    return null;
  }

  return (
    <div className="ambient-glass-background">
      <div className="aurora-orb aurora-orb-1" />
      <div className="aurora-orb aurora-orb-2" />
      <div className="aurora-orb aurora-orb-3" />
    </div>
  );
}
