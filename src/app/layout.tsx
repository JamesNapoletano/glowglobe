import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import "./globals.css";
import { AmbientGlassBackground } from "@/theme/ambient-background";
import { ThemeModeProvider } from "@/theme/theme-context";

export const metadata: Metadata = {
  title: "GlowGlobe | Manuscript & Story Workspace",
  description: "A manuscript-first writing workspace for novels and long-form documents with selectable Earthy Parchment and Glassmorphic Obsidian themes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="theme-glassmorphic">
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeModeProvider>
            {/* Ambient Glass Aura Orbs (Rendered only in Glassmorphic mode) */}
            <AmbientGlassBackground />
            {/* Main Application Shell Container */}
            <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
              {children}
            </div>
          </ThemeModeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
