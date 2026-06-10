"use client";

import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItemButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { Controller, useForm, type DefaultValues } from "react-hook-form";
import {
  contrastGuardClassNames,
  getSoftSelectedListItemSx,
} from "@/components/selected-state-guardrails";

export type EntityFormField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select";
  placeholder?: string;
  required?: boolean;
  options?: ReadonlyArray<{ label: string; value: string }>;
};

export type EntityWorkspaceMetric = {
  label: string;
  value: string;
};

export type WorkspaceSurfaceSection = {
  id: string;
  title: string;
  summary?: string;
  badge?: string;
  defaultExpanded?: boolean;
  content: ReactNode;
};

type WorkspaceSurfaceLayoutProps = {
  title: string;
  eyebrow: string;
  description: string;
  metrics?: EntityWorkspaceMetric[];
  sections: WorkspaceSurfaceSection[];
};

export type EntityWorkspaceSectionProps<T extends Record<string, string | number | undefined>> = {
  title: string;
  eyebrow: string;
  description: string;
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

type EntityWorkspaceProps<T extends Record<string, string | number | undefined>> = EntityWorkspaceSectionProps<T> & {
  metrics?: EntityWorkspaceMetric[];
};

export function WorkspaceSurfaceLayout({ title, eyebrow, description, metrics, sections }: WorkspaceSurfaceLayoutProps) {
  return (
    <Stack spacing={1.5}>
      <Card sx={{ bgcolor: "rgba(255,255,255,0.92)" }}>
        <CardContent sx={{ p: { xs: 2, xl: 2 } }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", xl: "row" }, gap: 1.5, justifyContent: "space-between" }}>
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

            {metrics?.length ? (
              <Grid container spacing={1.25} sx={{ width: "100%", minWidth: 0, maxWidth: { xl: 600 } }}>
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
          </Box>
        </CardContent>
      </Card>

      {sections.length >= 2 ? (
        <Card sx={{ bgcolor: "rgba(252,253,255,0.92)" }}>
          <CardContent sx={{ p: { xs: 1.8, xl: 2 } }}>
            <Typography variant="overline" color="text.secondary">
              Table of contents
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mt: 1.25, flexWrap: "wrap" }} useFlexGap>
              {sections.map((section, index) => (
                <Button
                  key={section.id}
                  component="a"
                  href={`#${section.id}`}
                  sx={{ justifyContent: "flex-start" }}
                  variant="outlined"
                >
                  {`${index + 1}. ${section.title}`}
                </Button>
              ))}
            </Stack>
          </CardContent>
        </Card>
      ) : null}

      <Stack spacing={1.5}>
        {sections.map((section) => (
          <Box id={section.id} key={section.id} sx={{ scrollMarginTop: { xs: 88, xl: 112 } }}>
            <Accordion
              defaultExpanded={section.defaultExpanded ?? true}
              disableGutters
              sx={{
                bgcolor: "rgba(255,255,255,0.92)",
                boxShadow: "none",
                borderRadius: 0,
                overflow: "hidden",
                "&::before": { display: "none" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreRounded />} sx={{ px: 2, py: 0.35 }}>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography variant="overline" color="text.secondary">
                    Section
                  </Typography>
                  <Typography variant="h3" sx={{ mt: 0.45, overflowWrap: "anywhere" }}>
                    {section.title}
                  </Typography>
                  {section.summary ? (
                    <Typography color="text.secondary" sx={{ mt: 0.75, lineHeight: 1.65, overflowWrap: "anywhere" }}>
                      {section.summary}
                    </Typography>
                  ) : null}
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ px: { xs: 1.35, xl: 1.6 }, pb: { xs: 1.35, xl: 1.6 } }}>{section.content}</AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

export function EntityWorkspaceSection<T extends Record<string, string | number | undefined>>({
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
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<T>({ defaultValues: selectedValues as DefaultValues<T> });

  useEffect(() => {
    reset(selectedValues);
  }, [reset, selectedValues]);

  return (
    <Stack spacing={1.5}>
      <Card sx={{ bgcolor: "rgba(252,253,255,0.94)" }}>
        <CardContent sx={{ p: { xs: 2, xl: 2.2 } }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 1.5 }}>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="overline" color="text.secondary">
                Directory
              </Typography>
              <Typography variant="h3" sx={{ mt: 0.75, overflowWrap: "anywhere" }}>
                Browse entries
              </Typography>
            </Box>

            <Button onClick={onCreate} startIcon={<AddRounded />} variant="outlined">
              {createLabel}
            </Button>
          </Box>

          <Box sx={{ mt: 2, minHeight: 0, maxHeight: { xs: 280, xl: 340 }, overflowY: "auto", pr: 0.2 }}>
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
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                          <Typography className={contrastGuardClassNames.primary} sx={{ fontWeight: 700, fontSize: 14, overflowWrap: "anywhere" }}>
                            {item.title}
                          </Typography>
                          <Chip label={isActive ? "Selected" : "Entry"} size="small" variant="outlined" />
                        </Box>
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

      <Card sx={{ bgcolor: "rgba(255,255,255,0.94)" }}>
        <CardContent sx={{ p: { xs: 2, xl: 2.2 } }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 1.5 }}>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="overline" color="text.secondary">
                Editor
              </Typography>
              <Typography variant="h3" sx={{ mt: 0.75, overflowWrap: "anywhere" }}>
                {selectedId ? "Edit selected entry" : "Create a new entry"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Chip label={`${items.length} total`} variant="outlined" />
              {selectedId ? (
                <Button color="error" onClick={() => onDelete(selectedId)} startIcon={<DeleteOutlineRounded />} variant="outlined">
                  Delete
                </Button>
              ) : null}
            </Box>
          </Box>

          <Stack component="form" onSubmit={handleSubmit(async (values) => onSave(values as T))} spacing={2.25} sx={{ mt: 2.25 }}>
            {fields.map((field) => (
              <Controller
                key={field.name}
                control={control}
                name={field.name as never}
                rules={{
                  required: field.required,
                }}
                render={({ field: controlledField }) => (
                  <TextField
                    {...controlledField}
                    fullWidth
                    label={field.label}
                    minRows={field.type === "textarea" ? 5 : undefined}
                    multiline={field.type === "textarea"}
                    placeholder={field.placeholder}
                    select={field.type === "select"}
                    type={field.type === "number" ? "number" : "text"}
                    value={controlledField.value ?? ""}
                    onChange={(event) => {
                      if (field.type === "number") {
                        const nextValue = event.target.value;
                        controlledField.onChange(nextValue === "" ? undefined : Number(nextValue));
                        return;
                      }

                      controlledField.onChange(event.target.value);
                    }}
                  >
                    {field.type === "select"
                      ? field.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))
                      : null}
                  </TextField>
                )}
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
    </Stack>
  );
}

export function EntityWorkspace<T extends Record<string, string | number | undefined>>({ metrics, ...props }: EntityWorkspaceProps<T>) {
  return (
    <WorkspaceSurfaceLayout
      description={props.description}
      eyebrow={props.eyebrow}
      metrics={metrics}
      sections={[
        {
          id: slugifySectionId(props.title),
          title: props.title,
          summary: props.description,
          content: <EntityWorkspaceSection {...props} />,
        },
      ]}
      title={props.title}
    />
  );
}

function slugifySectionId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
