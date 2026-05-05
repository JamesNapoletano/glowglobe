import type {
  Chapter,
  Project,
  ProjectStatus,
  RichTextDocument,
  Scene,
} from "@/lib/domain/types";

export type CreateProjectInput = {
  title: string;
  genre: string;
  description: string;
};

export type SceneLinkPayload = {
  characterIds: string[];
  locationIds: string[];
  technologyEntryIds: string[];
  timelineEventIds: string[];
  plotThreadIds: string[];
  glossaryEntryIds: string[];
};

export type CharacterInput = { name: string; role: string; arc: string };
export type RelationshipInput = { sourceCharacterId: string; targetCharacterId: string; description: string };
export type TechnologyEntryInput = { name: string; summary: string; ruleNotesText: string };
export type LocationInput = { name: string; summary: string; regionName: string };
export type RegionInput = { name: string; summary: string };
export type PlanetInput = { name: string; summary: string };
export type TimelineEventInput = { title: string; summary: string; sequence: number };
export type CorkboardCardInput = { title: string; summary: string; linkedSceneId?: string };
export type PlotThreadInput = { name: string; summary: string };
export type ActInput = { name: string; summary: string; order: number };
export type BeatInput = { title: string; summary: string; order: number; actId?: string; sceneId?: string };
export type SubplotInput = { name: string; summary: string };
export type PovMarkerInput = { label: string; summary: string; characterId?: string; sceneId?: string };
export type GlossaryEntryInput = { term: string; definition: string };
export type LoreNoteInput = { title: string; summary: string };
export type ResearchNoteInput = { title: string; summary: string; source?: string };

export function createProjectFromInput(input: CreateProjectInput): Project {
  const timestamp = new Date().toISOString();
  const projectId = createEntityId("project");
  const bookId = createEntityId("book");
  const chapterId = createEntityId("chapter");
  const sceneId = createEntityId("scene");
  const normalizedTitle = input.title.trim();
  const summary = input.description.trim() || `A new ${input.genre.toLowerCase()} project.`;

  return {
    id: projectId,
    createdAt: timestamp,
    updatedAt: timestamp,
    title: normalizedTitle,
    genre: input.genre.trim(),
    description: summary,
    status: createInitialProjectStatus(summary),
    books: [
      {
        id: bookId,
        createdAt: timestamp,
        updatedAt: timestamp,
        title: normalizedTitle,
        summary: "Primary manuscript workspace.",
        chapters: [
          {
            id: chapterId,
            createdAt: timestamp,
            updatedAt: timestamp,
            title: "Chapter 01",
            summary: "Opening chapter scaffold.",
            scenes: [createScene({ title: "Scene 01", summary: "A blank opening scene ready for drafting." }, sceneId, timestamp)],
          },
        ],
      },
    ],
    documents: [],
    characters: [],
    relationships: [],
    technologyEntries: [],
    locations: [],
    regions: [],
    planets: [],
    timelineEvents: [],
    corkboardCards: [],
    plotThreads: [],
    acts: [],
    beats: [],
    subplots: [],
    povMarkers: [],
    glossaryEntries: [],
    loreNotes: [],
    researchNotes: [],
    revisionSnapshots: [],
  };
}

export function createEmptyDocument(): RichTextDocument {
  return {
    type: "doc",
    version: 1,
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: "" }],
      },
    ],
  };
}

export function sortProjectsByUpdatedAt(projects: Project[]): Project[] {
  return [...projects].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export function createChapter(input?: { title?: string; summary?: string }): Chapter {
  const timestamp = new Date().toISOString();

  return {
    id: createEntityId("chapter"),
    createdAt: timestamp,
    updatedAt: timestamp,
    title: input?.title?.trim() || "New Chapter",
    summary: input?.summary?.trim() || "A new chapter scaffold.",
    scenes: [createScene()],
  };
}

export function createScene(
  input?: { title?: string; summary?: string },
  forcedId?: string,
  forcedTimestamp?: string,
): Scene {
  const timestamp = forcedTimestamp ?? new Date().toISOString();

  return {
    id: forcedId ?? createEntityId("scene"),
    createdAt: timestamp,
    updatedAt: timestamp,
    title: input?.title?.trim() || "New Scene",
    summary: input?.summary?.trim() || "A fresh scene scaffold ready for drafting.",
    excerpt: [
      "This scene is ready for drafting. Add the first beats, then connect it to character, setting, and timeline context.",
    ],
    editorDocument: createEmptyDocument(),
    characterIds: [],
    locationIds: [],
    technologyEntryIds: [],
    timelineEventIds: [],
    plotThreadIds: [],
    glossaryEntryIds: [],
  };
}

export function addChapterToProject(project: Project, input?: { title?: string; summary?: string }) {
  const timestamp = new Date().toISOString();
  const nextChapter = createChapter(input);
  const primaryBook = project.books[0];

  if (!primaryBook) {
    const nextBook = {
      id: createEntityId("book"),
      createdAt: timestamp,
      updatedAt: timestamp,
      title: project.title,
      summary: "Primary manuscript workspace.",
      chapters: [nextChapter],
    };

    return {
      project: {
        ...project,
        updatedAt: timestamp,
        books: [nextBook],
      },
      chapterId: nextChapter.id,
      sceneId: nextChapter.scenes[0]?.id ?? null,
    };
  }

  const nextPrimaryBook = {
    ...primaryBook,
    updatedAt: timestamp,
    chapters: [...primaryBook.chapters, nextChapter],
  };

  return {
    project: {
      ...project,
      updatedAt: timestamp,
      books: [nextPrimaryBook, ...project.books.slice(1)],
    },
    chapterId: nextChapter.id,
    sceneId: nextChapter.scenes[0]?.id ?? null,
  };
}

export function addSceneToChapter(project: Project, chapterId: string, input?: { title?: string; summary?: string }) {
  const timestamp = new Date().toISOString();
  const nextScene = createScene(input);

  return {
    project: updatePrimaryBookChapter(project, chapterId, timestamp, (chapter) => ({
      ...chapter,
      updatedAt: timestamp,
      scenes: [...chapter.scenes, nextScene],
    })),
    sceneId: nextScene.id,
  };
}

export function updateSceneMetadata(project: Project, chapterId: string, sceneId: string, input: { title: string; summary: string }) {
  const timestamp = new Date().toISOString();

  return updateScene(project, chapterId, sceneId, timestamp, (scene) => ({
    ...scene,
    updatedAt: timestamp,
    title: input.title.trim() || scene.title,
    summary: input.summary.trim() || scene.summary,
  }));
}

export function updateSceneDocument(project: Project, chapterId: string, sceneId: string, editorDocument: RichTextDocument) {
  const timestamp = new Date().toISOString();
  const excerpt = createExcerptFromDocument(editorDocument);

  return updateScene(project, chapterId, sceneId, timestamp, (scene) => ({
    ...scene,
    updatedAt: timestamp,
    editorDocument,
    excerpt,
  }));
}

export function updateSceneLinks(project: Project, chapterId: string, sceneId: string, links: SceneLinkPayload) {
  const timestamp = new Date().toISOString();

  return updateScene(project, chapterId, sceneId, timestamp, (scene) => ({
    ...scene,
    updatedAt: timestamp,
    ...links,
  }));
}

export function upsertCharacter(project: Project, input: CharacterInput, characterId?: string) {
  return upsertCollectionItem(project, "characters", characterId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    name: input.name.trim() || existing?.name || "Untitled character",
    role: input.role.trim(),
    arc: input.arc.trim(),
    relationshipIds: existing?.relationshipIds ?? [],
  }));
}

export function removeCharacter(project: Project, characterId: string) {
  const timestamp = new Date().toISOString();

  return {
    ...project,
    updatedAt: timestamp,
    characters: project.characters.filter((character) => character.id !== characterId),
    relationships: project.relationships.filter(
      (relationship) => relationship.sourceCharacterId !== characterId && relationship.targetCharacterId !== characterId,
    ),
    books: project.books.map((book, bookIndex) =>
      bookIndex === 0
        ? {
            ...book,
            updatedAt: timestamp,
            chapters: book.chapters.map((chapter) => ({
              ...chapter,
              updatedAt: timestamp,
              scenes: chapter.scenes.map((scene) => ({
                ...scene,
                updatedAt: timestamp,
                characterIds: scene.characterIds.filter((id) => id !== characterId),
              })),
            })),
          }
        : book,
    ),
  };
}

export function upsertRelationship(project: Project, input: RelationshipInput, relationshipId?: string) {
  return upsertCollectionItem(project, "relationships", relationshipId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    sourceCharacterId: input.sourceCharacterId,
    targetCharacterId: input.targetCharacterId,
    description: input.description.trim(),
  }));
}

export function removeRelationship(project: Project, relationshipId: string) {
  return removeCollectionItem(project, "relationships", relationshipId);
}

export function upsertTechnologyEntry(project: Project, input: TechnologyEntryInput, technologyEntryId?: string) {
  return upsertCollectionItem(project, "technologyEntries", technologyEntryId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    name: input.name.trim() || existing?.name || "Untitled technology",
    summary: input.summary.trim(),
    ruleNotes: input.ruleNotesText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
  }));
}

export function removeTechnologyEntry(project: Project, technologyEntryId: string) {
  const timestamp = new Date().toISOString();

  return {
    ...removeCollectionItem(project, "technologyEntries", technologyEntryId),
    books: project.books.map((book, bookIndex) =>
      bookIndex === 0
        ? {
            ...book,
            updatedAt: timestamp,
            chapters: book.chapters.map((chapter) => ({
              ...chapter,
              updatedAt: timestamp,
              scenes: chapter.scenes.map((scene) => ({
                ...scene,
                updatedAt: timestamp,
                technologyEntryIds: scene.technologyEntryIds.filter((id) => id !== technologyEntryId),
              })),
            })),
          }
        : book,
    ),
    updatedAt: timestamp,
  };
}

export function upsertLocation(project: Project, input: LocationInput, locationId?: string) {
  return upsertCollectionItem(project, "locations", locationId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    name: input.name.trim() || existing?.name || "Untitled location",
    summary: input.summary.trim(),
    regionName: input.regionName.trim(),
  }));
}

export function removeLocation(project: Project, locationId: string) {
  const timestamp = new Date().toISOString();

  return {
    ...removeCollectionItem(project, "locations", locationId),
    books: project.books.map((book, bookIndex) =>
      bookIndex === 0
        ? {
            ...book,
            updatedAt: timestamp,
            chapters: book.chapters.map((chapter) => ({
              ...chapter,
              updatedAt: timestamp,
              scenes: chapter.scenes.map((scene) => ({
                ...scene,
                updatedAt: timestamp,
                locationIds: scene.locationIds.filter((id) => id !== locationId),
              })),
            })),
          }
        : book,
    ),
    updatedAt: timestamp,
  };
}

export function upsertRegion(project: Project, input: RegionInput, regionId?: string) {
  return upsertCollectionItem(project, "regions", regionId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    name: input.name.trim() || existing?.name || "Untitled region",
    summary: input.summary.trim(),
  }));
}

export function removeRegion(project: Project, regionId: string) {
  return removeCollectionItem(project, "regions", regionId);
}

export function upsertPlanet(project: Project, input: PlanetInput, planetId?: string) {
  return upsertCollectionItem(project, "planets", planetId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    name: input.name.trim() || existing?.name || "Untitled planet",
    summary: input.summary.trim(),
  }));
}

export function removePlanet(project: Project, planetId: string) {
  return removeCollectionItem(project, "planets", planetId);
}

export function upsertTimelineEvent(project: Project, input: TimelineEventInput, timelineEventId?: string) {
  return upsertCollectionItem(project, "timelineEvents", timelineEventId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    title: input.title.trim() || existing?.title || "Untitled event",
    summary: input.summary.trim(),
    sequence: Number.isFinite(input.sequence) ? input.sequence : existing?.sequence ?? 1,
  }));
}

export function removeTimelineEvent(project: Project, timelineEventId: string) {
  const timestamp = new Date().toISOString();

  return {
    ...removeCollectionItem(project, "timelineEvents", timelineEventId),
    books: project.books.map((book, bookIndex) =>
      bookIndex === 0
        ? {
            ...book,
            updatedAt: timestamp,
            chapters: book.chapters.map((chapter) => ({
              ...chapter,
              updatedAt: timestamp,
              scenes: chapter.scenes.map((scene) => ({
                ...scene,
                updatedAt: timestamp,
                timelineEventIds: scene.timelineEventIds.filter((id) => id !== timelineEventId),
              })),
            })),
          }
        : book,
    ),
    updatedAt: timestamp,
  };
}

export function upsertCorkboardCard(project: Project, input: CorkboardCardInput, corkboardCardId?: string) {
  return upsertCollectionItem(project, "corkboardCards", corkboardCardId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    title: input.title.trim() || existing?.title || "Untitled card",
    summary: input.summary.trim(),
    linkedSceneId: input.linkedSceneId,
  }));
}

export function removeCorkboardCard(project: Project, corkboardCardId: string) {
  return removeCollectionItem(project, "corkboardCards", corkboardCardId);
}

export function upsertPlotThread(project: Project, input: PlotThreadInput, plotThreadId?: string) {
  return upsertCollectionItem(project, "plotThreads", plotThreadId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    name: input.name.trim() || existing?.name || "Untitled plot thread",
    summary: input.summary.trim(),
  }));
}

export function removePlotThread(project: Project, plotThreadId: string) {
  const timestamp = new Date().toISOString();

  return {
    ...removeCollectionItem(project, "plotThreads", plotThreadId),
    books: project.books.map((book, bookIndex) =>
      bookIndex === 0
        ? {
            ...book,
            updatedAt: timestamp,
            chapters: book.chapters.map((chapter) => ({
              ...chapter,
              updatedAt: timestamp,
              scenes: chapter.scenes.map((scene) => ({
                ...scene,
                updatedAt: timestamp,
                plotThreadIds: scene.plotThreadIds.filter((id) => id !== plotThreadId),
              })),
            })),
          }
        : book,
    ),
    updatedAt: timestamp,
  };
}

export function upsertAct(project: Project, input: ActInput, actId?: string) {
  return upsertCollectionItem(project, "acts", actId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    name: input.name.trim() || existing?.name || "Untitled act",
    summary: input.summary.trim(),
    order: Number.isFinite(input.order) ? input.order : existing?.order ?? 1,
  }));
}

export function removeAct(project: Project, actId: string) {
  const timestamp = new Date().toISOString();

  return {
    ...removeCollectionItem(project, "acts", actId),
    beats: project.beats.map((beat) => ({
      ...beat,
      updatedAt: timestamp,
      actId: beat.actId === actId ? undefined : beat.actId,
    })),
    updatedAt: timestamp,
  };
}

export function upsertBeat(project: Project, input: BeatInput, beatId?: string) {
  return upsertCollectionItem(project, "beats", beatId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    title: input.title.trim() || existing?.title || "Untitled beat",
    summary: input.summary.trim(),
    order: Number.isFinite(input.order) ? input.order : existing?.order ?? 1,
    actId: input.actId,
    sceneId: input.sceneId,
  }));
}

export function removeBeat(project: Project, beatId: string) {
  return removeCollectionItem(project, "beats", beatId);
}

export function upsertSubplot(project: Project, input: SubplotInput, subplotId?: string) {
  return upsertCollectionItem(project, "subplots", subplotId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    name: input.name.trim() || existing?.name || "Untitled subplot",
    summary: input.summary.trim(),
  }));
}

export function removeSubplot(project: Project, subplotId: string) {
  return removeCollectionItem(project, "subplots", subplotId);
}

export function upsertPovMarker(project: Project, input: PovMarkerInput, povMarkerId?: string) {
  return upsertCollectionItem(project, "povMarkers", povMarkerId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    label: input.label.trim() || existing?.label || "Untitled POV marker",
    summary: input.summary.trim(),
    characterId: input.characterId,
    sceneId: input.sceneId,
  }));
}

export function removePovMarker(project: Project, povMarkerId: string) {
  return removeCollectionItem(project, "povMarkers", povMarkerId);
}

export function upsertGlossaryEntry(project: Project, input: GlossaryEntryInput, glossaryEntryId?: string) {
  return upsertCollectionItem(project, "glossaryEntries", glossaryEntryId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    term: input.term.trim() || existing?.term || "Untitled term",
    definition: input.definition.trim(),
  }));
}

export function removeGlossaryEntry(project: Project, glossaryEntryId: string) {
  const timestamp = new Date().toISOString();

  return {
    ...removeCollectionItem(project, "glossaryEntries", glossaryEntryId),
    books: project.books.map((book, bookIndex) =>
      bookIndex === 0
        ? {
            ...book,
            updatedAt: timestamp,
            chapters: book.chapters.map((chapter) => ({
              ...chapter,
              updatedAt: timestamp,
              scenes: chapter.scenes.map((scene) => ({
                ...scene,
                updatedAt: timestamp,
                glossaryEntryIds: scene.glossaryEntryIds.filter((id) => id !== glossaryEntryId),
              })),
            })),
          }
        : book,
    ),
    updatedAt: timestamp,
  };
}

export function upsertLoreNote(project: Project, input: LoreNoteInput, loreNoteId?: string) {
  return upsertCollectionItem(project, "loreNotes", loreNoteId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    title: input.title.trim() || existing?.title || "Untitled lore note",
    summary: input.summary.trim(),
  }));
}

export function removeLoreNote(project: Project, loreNoteId: string) {
  return removeCollectionItem(project, "loreNotes", loreNoteId);
}

export function upsertResearchNote(project: Project, input: ResearchNoteInput, researchNoteId?: string) {
  return upsertCollectionItem(project, "researchNotes", researchNoteId, (timestamp, id, existing) => ({
    id,
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    title: input.title.trim() || existing?.title || "Untitled research note",
    summary: input.summary.trim(),
    source: input.source?.trim() || undefined,
  }));
}

export function removeResearchNote(project: Project, researchNoteId: string) {
  return removeCollectionItem(project, "researchNotes", researchNoteId);
}

function createExcerptFromDocument(editorDocument: RichTextDocument): string[] {
  const paragraphs = editorDocument.content.map((node) => flattenText(node).trim()).filter(Boolean);

  return paragraphs.length > 0
    ? paragraphs
    : [
        "This scene is ready for drafting. Start shaping the opening beats, then connect it to character, setting, and timeline context.",
      ];
}

function flattenText(node: RichTextDocument["content"][number]): string {
  if (node.text) {
    return node.text;
  }

  if (!node.content) {
    return "";
  }

  return node.content.map((child) => flattenText(child)).join("");
}

function createInitialProjectStatus(description: string): ProjectStatus {
  return description.trim() ? "planning" : "idea";
}

function createEntityId(prefix: string): string {
  const uuid = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${uuid}`;
}

function updateScene(
  project: Project,
  chapterId: string,
  sceneId: string,
  timestamp: string,
  updater: (scene: Scene) => Scene,
) {
  return updatePrimaryBookChapter(project, chapterId, timestamp, (chapter) => ({
    ...chapter,
    updatedAt: timestamp,
    scenes: chapter.scenes.map((scene) => (scene.id === sceneId ? updater(scene) : scene)),
  }));
}

function updatePrimaryBookChapter(
  project: Project,
  chapterId: string,
  timestamp: string,
  updater: (chapter: Chapter) => Chapter,
) {
  const nextBooks = project.books.map((book, bookIndex) => {
    if (bookIndex !== 0) {
      return book;
    }

    return {
      ...book,
      updatedAt: timestamp,
      chapters: book.chapters.map((chapter) => (chapter.id === chapterId ? updater(chapter) : chapter)),
    };
  });

  return {
    ...project,
    updatedAt: timestamp,
    books: nextBooks,
  };
}

function upsertCollectionItem<K extends CollectionKeys>(
  project: Project,
  key: K,
  itemId: string | undefined,
  factory: (timestamp: string, id: string, existing: Project[K][number] | undefined) => Project[K][number],
): Project {
  const timestamp = new Date().toISOString();
  const currentItems = project[key] as Project[K];
  const existing = currentItems.find((item) => item.id === itemId) as Project[K][number] | undefined;
  const id = itemId ?? createEntityId(getCollectionPrefix(key));
  const nextItem = factory(timestamp, id, existing);
  const nextItems = existing
    ? currentItems.map((item) => (item.id === id ? nextItem : item))
    : [...currentItems, nextItem];

  return {
    ...project,
    updatedAt: timestamp,
    [key]: nextItems,
  } as Project;
}

function removeCollectionItem<K extends CollectionKeys>(project: Project, key: K, itemId: string): Project {
  const timestamp = new Date().toISOString();

  return {
    ...project,
    updatedAt: timestamp,
    [key]: (project[key] as Project[K]).filter((item) => item.id !== itemId),
  } as Project;
}

type CollectionKeys =
  | "characters"
  | "relationships"
  | "technologyEntries"
  | "locations"
  | "regions"
  | "planets"
  | "timelineEvents"
  | "corkboardCards"
  | "plotThreads"
  | "acts"
  | "beats"
  | "subplots"
  | "povMarkers"
  | "glossaryEntries"
  | "loreNotes"
  | "researchNotes";

function getCollectionPrefix(key: CollectionKeys): string {
  switch (key) {
    case "characters":
      return "character";
    case "relationships":
      return "relationship";
    case "technologyEntries":
      return "technology";
    case "locations":
      return "location";
    case "regions":
      return "region";
    case "planets":
      return "planet";
    case "timelineEvents":
      return "timeline";
    case "corkboardCards":
      return "card";
    case "plotThreads":
      return "thread";
    case "acts":
      return "act";
    case "beats":
      return "beat";
    case "subplots":
      return "subplot";
    case "povMarkers":
      return "pov";
    case "glossaryEntries":
      return "glossary";
    case "loreNotes":
      return "lore";
    case "researchNotes":
      return "research";
  }
}
