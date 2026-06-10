"use client";

import {
  EntityWorkspace,
  EntityWorkspaceSection,
  type EntityFormField,
  type EntityWorkspaceMetric,
  type EntityWorkspaceSectionProps,
} from "@/components/entity-workspace";

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

export type PlanningEntityWorkspaceSectionProps<T extends Record<string, string | number | undefined>> = EntityWorkspaceSectionProps<T>;

export function PlanningEntityWorkspace<T extends Record<string, string | number | undefined>>(
  props: PlanningEntityWorkspaceProps<T>,
) {
  return <EntityWorkspace {...props} />;
}

export function PlanningEntityWorkspaceSection<T extends Record<string, string | number | undefined>>(
  props: PlanningEntityWorkspaceSectionProps<T>,
) {
  return <EntityWorkspaceSection {...props} />;
}
