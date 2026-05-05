import { Box, Card, CardContent, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box component="main" sx={{ minHeight: "100vh", display: "grid", placeItems: "center", px: 3, py: 8 }}>
      <Card sx={{ maxWidth: 560, width: "100%", borderRadius: 4 }}>
        <CardContent sx={{ p: { xs: 4, md: 5 }, textAlign: "center" }}>
          <Typography variant="overline" color="text.secondary">
            GlowGlobe
          </Typography>
          <Typography variant="h2" sx={{ mt: 1.5 }}>
            Page not found
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>
            The page you requested does not exist in this manuscript workspace.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
