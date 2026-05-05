"use client";

import type { EntityFormField, EntityWorkspaceMetric } from "@/components/entity-workspace";
import { EntityWorkspace } from "@/components/entity-workspace";

type PlanningEntityWorkspaceProps<T extends Record<string, string | number | undefined>> = {
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

export function PlanningEntityWorkspace<T extends Record<string, string | number | undefined>>(
  props: PlanningEntityWorkspaceProps<T>,
) {
  return <EntityWorkspace {...props} />;
}
