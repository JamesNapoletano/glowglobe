"use client";

import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItemButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import {
  contrastGuardClassNames,
  getSoftSelectedListItemSx,
} from "@/components/selected-state-guardrails";

export type EntityFormField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number";
  placeholder?: string;
  required?: boolean;
};

export type EntityWorkspaceMetric = {
  label: string;
  value: string;
};

type EntityWorkspaceProps<T extends Record<string, string | number | undefined>> = {
  title: string;
  eyebrow: string;
  description: string;
  metrics?: EntityWorkspaceMetric[];
  items: Array<{ id: string; title: string; detail?: string }>;
  selectedId: string | null;
  selectedValues: T;
  fields: EntityFormField[];
  createLabel: string;
  emptyMessage: string;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  onSave: (values: T) => Promise<void>;
};

export function EntityWorkspace<T extends Record<string, string | number | undefined>>({
  title,
  eyebrow,
  description,
  metrics,
  items,
  selectedId,
  selectedValues,
  fields,
  createLabel,
  emptyMessage,
  onSelect,
  onCreate,
  onDelete,
  onSave,
}: EntityWorkspaceProps<T>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<T>({ defaultValues: selectedValues as DefaultValues<T> });

  useEffect(() => {
    reset(selectedValues);
  }, [reset, selectedValues]);

  return (
    <Stack spacing={2.5} sx={{ height: "100%" }}>
      <Card sx={{ bgcolor: "rgba(255,255,255,0.92)" }}>
        <CardContent sx={{ p: { xs: 2.5, xl: 2.75 } }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", xl: "row" }, gap: 2.5, justifyContent: "space-between" }}>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="overline" color="text.secondary">
                {eyebrow}
              </Typography>
              <Typography variant="h2" sx={{ mt: 0.75, overflowWrap: "anywhere" }}>
                {title}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1.25, maxWidth: 820, lineHeight: 1.72, overflowWrap: "anywhere" }}>
                {description}
              </Typography>
            </Box>

            <Stack spacing={1.5} sx={{ alignItems: { xs: "stretch", xl: "flex-end" }, minWidth: 0, width: { xs: "100%", xl: "auto" }, maxWidth: { xl: 460 } }}>
              <Button onClick={onCreate} startIcon={<AddRounded />} variant="outlined">
                {createLabel}
              </Button>

              {metrics?.length ? (
                <Grid container spacing={1.25} sx={{ width: "100%", minWidth: 0 }}>
                  {metrics.map((metric) => (
                    <Grid key={metric.label} size={{ xs: 12, sm: 6, xl: 4 }}>
                      <Card sx={{ bgcolor: "rgba(248,251,255,0.88)" }}>
                        <CardContent sx={{ p: 1.8 }}>
                          <Typography variant="overline" color="text.secondary" sx={{ overflowWrap: "anywhere" }}>
                            {metric.label}
                          </Typography>
                          <Typography variant="h3" sx={{ mt: 1, overflowWrap: "anywhere" }}>
                            {metric.value}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : null}
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={2.25} sx={{ flex: 1 }}>
        <Grid size={{ xs: 12, xl: 4 }}>
          <Card sx={{ height: "100%", bgcolor: "rgba(252,253,255,0.94)" }}>
            <CardContent sx={{ p: 2.5, height: "100%" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography variant="overline" color="text.secondary">
                    Directory
                  </Typography>
                  <Typography variant="h3" sx={{ mt: 0.75 }}>
                    Browse entries
                  </Typography>
                </Box>
                <Chip label={`${items.length} total`} variant="outlined" />
              </Box>

              <Box sx={{ mt: 2 }}>
                {items.length > 0 ? (
                  <List disablePadding sx={{ display: "grid", gap: 0.8 }}>
                    {items.map((item) => {
                      const isActive = item.id === selectedId;
                      return (
                        <ListItemButton
                          key={item.id}
                          onClick={() => onSelect(item.id)}
                          selected={isActive}
                          sx={(theme) => ({
                            ...getSoftSelectedListItemSx(theme, isActive),
                              px: 1.7,
                              py: 1.25,
                              alignItems: "flex-start",
                            })}
                        >
                          <Box sx={{ minWidth: 0, width: "100%" }}>
                            <Typography className={contrastGuardClassNames.primary} sx={{ fontWeight: 700, fontSize: 14, overflowWrap: "anywhere" }}>
                              {item.title}
                            </Typography>
                            {item.detail ? (
                              <Typography
                                className={contrastGuardClassNames.secondary}
                                sx={{
                                  mt: 0.5,
                                  lineHeight: 1.6,
                                  fontSize: 13,
                                  overflowWrap: "anywhere",
                                }}
                              >
                                {item.detail}
                              </Typography>
                            ) : null}
                          </Box>
                        </ListItemButton>
                      );
                    })}
                  </List>
                ) : (
                  <Card variant="outlined" sx={{ borderStyle: "dashed", bgcolor: "rgba(248,251,255,0.84)" }}>
                    <CardContent>
                      <Typography color="text.secondary">{emptyMessage}</Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, xl: 8 }}>
          <Card sx={{ height: "100%", bgcolor: "rgba(255,255,255,0.94)" }}>
            <CardContent sx={{ p: 2.5, height: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 1.5 }}>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography variant="overline" color="text.secondary">
                    Editor
                  </Typography>
                  <Typography variant="h3" sx={{ mt: 0.75, overflowWrap: "anywhere" }}>
                    {selectedId ? "Edit selected entry" : "Create a new entry"}
                  </Typography>
                </Box>
                {selectedId ? (
                  <Button color="error" onClick={() => onDelete(selectedId)} startIcon={<DeleteOutlineRounded />} variant="outlined">
                    Delete
                  </Button>
                ) : null}
              </Box>

              <Stack component="form" onSubmit={handleSubmit(async (values) => onSave(values as T))} spacing={2.25} sx={{ mt: 2.25 }}>
                {fields.map((field) => (
                  <TextField
                    key={field.name}
                    label={field.label}
                    minRows={field.type === "textarea" ? 5 : undefined}
                    multiline={field.type === "textarea"}
                    placeholder={field.placeholder}
                    type={field.type === "number" ? "number" : "text"}
                    {...register(field.name as never, {
                      required: field.required,
                      valueAsNumber: field.type === "number",
                    })}
                  />
                ))}

                <Box>
                  <Button disabled={isSubmitting} type="submit" variant="contained">
                    {isSubmitting ? "Saving..." : "Save entry"}
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
