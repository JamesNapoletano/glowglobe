"use client";

import { Box, Card, CardContent, Container, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { GlowGlobeLogo } from "@/components/glowglobe-logo";
import { AmbientGlassBackground } from "@/theme/ambient-background";
import { useThemeMode } from "@/theme/theme-context";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  const { themeMode } = useThemeMode();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        px: 2,
        position: "relative",
      }}
    >
      <AmbientGlassBackground />

      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={3} sx={{ alignItems: "center" }}>
          <GlowGlobeLogo subtitle="Manuscript & Story Workspace" />

          <Card
            className="glass-panel"
            sx={{
              width: "100%",
              borderRadius: 4,
              boxShadow:
                themeMode === "earthy"
                  ? "0 10px 30px rgba(67, 52, 35, 0.08)"
                  : "0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Stack spacing={2.5}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {subtitle}
                  </Typography>
                </Box>

                {children}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
