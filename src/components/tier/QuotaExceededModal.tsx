"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import LockRounded from "@mui/icons-material/LockRounded";
import WorkspacePremiumRounded from "@mui/icons-material/WorkspacePremiumRounded";
import { TIER_DEFINITIONS, type SubscriptionTier } from "@/lib/domain/user";
import { useThemeMode } from "@/theme/theme-context";

type QuotaExceededModalProps = {
  open: boolean;
  currentTier: SubscriptionTier;
  currentActiveCount: number;
  onClose: () => void;
  onSelectTierUpgrade?: (newTier: SubscriptionTier) => void;
};

export function QuotaExceededModal({
  open,
  currentTier,
  currentActiveCount,
  onClose,
  onSelectTierUpgrade,
}: QuotaExceededModalProps) {
  const { themeMode } = useThemeMode();
  const currentLimits = TIER_DEFINITIONS[currentTier] ?? TIER_DEFINITIONS.free;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth className="glass-dialog">
      <DialogTitle sx={{ p: 3, pb: 1 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 2,
              bgcolor: "warning.main",
              color: "warning.contrastText",
              display: "flex",
            }}
          >
            <LockRounded />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Project Quota Limit Reached
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your {currentLimits.name} allows a maximum of {currentLimits.maxActiveProjects} active project.
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Alert severity="warning">
            You currently have <strong>{currentActiveCount} active project</strong>. To create or import additional manuscripts, please upgrade your subscription tier below.
          </Alert>

          <Grid container spacing={2}>
            {/* Hobby Tier Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                className="glass-panel"
                sx={{
                  height: "100%",
                  border: "2px solid",
                  borderColor: "primary.main",
                  borderRadius: 3,
                  position: "relative",
                  transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {TIER_DEFINITIONS.hobby.name}
                      </Typography>
                      <WorkspacePremiumRounded color="primary" />
                    </Box>

                    <Typography variant="h4" sx={{ fontWeight: 900, color: "primary.main" }}>
                      20 Projects
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Perfect for prolific authors, series writers, and worldbuilders managing multiple books.
                    </Typography>

                    <Stack spacing={1} sx={{ pt: 1 }}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <CheckCircleRounded color="primary" fontSize="small" />
                        <Typography variant="body2">Up to 20 Active Projects</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <CheckCircleRounded color="primary" fontSize="small" />
                        <Typography variant="body2">20 Archived Project Slots</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <CheckCircleRounded color="primary" fontSize="small" />
                        <Typography variant="body2">Full Story Bible & Entity Exports</Typography>
                      </Stack>
                    </Stack>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      onClick={() => {
                        onSelectTierUpgrade?.("hobby");
                        onClose();
                      }}
                      sx={{ mt: 2, fontWeight: 700 }}
                    >
                      Select Hobby Tier
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Pro Tier Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card
                className="glass-panel"
                sx={{
                  height: "100%",
                  border: "2px solid",
                  borderColor: "secondary.main",
                  borderRadius: 3,
                  position: "relative",
                  transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {TIER_DEFINITIONS.pro.name}
                      </Typography>
                      <WorkspacePremiumRounded color="secondary" />
                    </Box>

                    <Typography variant="h4" sx={{ fontWeight: 900, color: "secondary.main" }}>
                      100 Projects
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Designed for publishing studios, literary agencies, and multi-world universe creators.
                    </Typography>

                    <Stack spacing={1} sx={{ pt: 1 }}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <CheckCircleRounded color="secondary" fontSize="small" />
                        <Typography variant="body2">Up to 100 Active Projects</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <CheckCircleRounded color="secondary" fontSize="small" />
                        <Typography variant="body2">Unlimited Project Archives</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <CheckCircleRounded color="secondary" fontSize="small" />
                        <Typography variant="body2">Priority AI & Processing Queues</Typography>
                      </Stack>
                    </Stack>

                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      size="large"
                      onClick={() => {
                        onSelectTierUpgrade?.("pro");
                        onClose();
                      }}
                      sx={{ mt: 2, fontWeight: 700 }}
                    >
                      Select Pro Tier
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
