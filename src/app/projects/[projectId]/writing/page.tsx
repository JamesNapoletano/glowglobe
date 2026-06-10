import { WorkspaceRoot } from "@/components/workspace-root";

export default async function ProjectWritingPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return <WorkspaceRoot routeState={{ projectId, surface: "writing" }} />;
}
