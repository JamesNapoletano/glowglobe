import type { ThemeMode } from "@/theme/brand-tokens";
import type {
  CharacterStatus,
  Chapter,
  Project,
  ProjectStatus,
  RelationshipType,
  RichTextDocument,
  Scene,
} from "@/lib/domain/types";

export type CreateProjectInput = {
  title: string;
  genre: string;
  description: string;
  themeMode?: ThemeMode;
};

export type UpdateProjectDetailsInput = {
  title: string;
  genre: string;
  description: string;
  status: ProjectStatus;
  themeMode?: ThemeMode;
};

export type ProjectLifecycleState = Project["lifecycleState"];

export type SceneLinkPayload = {
  characterIds: string[];
  sociumIds: string[];
  locationIds: string[];
  technologyEntryIds: string[];
  timelineEventIds: string[];
  plotThreadIds: string[];
  glossaryEntryIds: string[];
};

export type CharacterInput = {
  name: string;
  role: string;
  summary: string;
  arc: string;
  status: CharacterStatus;
  aliases: string;
  pronouns: string;
  age: string;
  birthDate: string;
  gender: string;
  speciesId?: string;
  occupation: string;
  sociumId?: string;
  residence: string;
  origin: string;
  firstAppearance: string;
  appearance: string;
  distinguishingFeatures: string;
  skills: string;
  goals: string;
  fears: string;
  internalConflict: string;
  externalConflict: string;
  background: string;
  personality: string;
  voice: string;
  mannerisms: string;
  beliefs: string;
  secrets: string;
  unresolvedThreads: string;
  notes: string;
  quote: string;
};
export type RelationshipInput = {
  sourceCharacterId: string;
  targetCharacterId: string;
  type: RelationshipType;
  notes: string;
};
export type SociumInput = {
  name: string;
  type: string;
  summary: string;
  leadership: string;
  headquarters: string;
  territory: string;
  scope: string;
  goals: string;
  beliefs: string;
  resources: string;
  methods: string;
  allies: string;
  rivals: string;
  publicReputation: string;
  internalConflicts: string;
  notes: string;
};
export type TechnologyEntryInput = { name: string; summary: string; ruleNotesText: string };
export type LocationInput = { name: string; summary: string; regionName: string };
export type RegionInput = { name: string; summary: string };
export type PlanetInput = { name: string; summary: string };
export type SpeciesInput = { name: string; summary: string; traits: string; lifespan: string; cultureNotes: string; originWorld: string };
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
  const projectId = createEntityId();
  const bookId = createEntityId();
  const chapterId = createEntityId();
  const sceneId = createEntityId();
  const normalizedTitle = input.title.trim();
  const summary = input.description.trim() || `A new ${input.genre.toLowerCase()} project.`;

  return {
    id: projectId,
    displayName: normalizedTitle,
    createdAt: timestamp,
    updatedAt: timestamp,
    title: normalizedTitle,
    genre: input.genre.trim(),
    description: summary,
    status: createInitialProjectStatus(summary),
    lifecycleState: "active",
    themeMode: input.themeMode ?? "glassmorphic",
    books: [
      {
        id: bookId,
        displayName: normalizedTitle,
        createdAt: timestamp,
        updatedAt: timestamp,
        title: normalizedTitle,
        summary: "Primary manuscript workspace.",
        chapters: [
          {
            id: chapterId,
            displayName: "Chapter 01",
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
    sociums: [],
    technologyEntries: [],
    locations: [],
    regions: [],
    planets: [],
    species: [],
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

export function updateProjectDetails(project: Project, input: UpdateProjectDetailsInput): Project {
  const timestamp = new Date().toISOString();
  const nextTitle = input.title.trim() || project.title;
  const nextGenre = input.genre.trim() || project.genre;
  const nextDescription = input.description.trim() || project.description;
  const primaryBook = project.books[0];
  const shouldSyncPrimaryBookTitle = primaryBook ? primaryBook.title.trim() === project.title.trim() : false;

  const nextBooks = project.books.map((book, index) => {
    if (index !== 0 || !shouldSyncPrimaryBookTitle) {
      return book;
    }

    return {
      ...book,
      updatedAt: timestamp,
      title: nextTitle,
      displayName: nextTitle,
    };
  });

  return {
    ...project,
    updatedAt: timestamp,
    title: nextTitle,
    displayName: nextTitle,
    genre: nextGenre,
    description: nextDescription,
    status: input.status,
    themeMode: input.themeMode ?? project.themeMode ?? "glassmorphic",
    books: nextBooks,
  };
}

export function moveProjectToLifecycleState(project: Project, lifecycleState: ProjectLifecycleState): Project {
  const timestamp = new Date().toISOString();

  return {
    ...project,
    updatedAt: timestamp,
    lifecycleState,
  };
}

export function createEmptyDocument(): RichTextDocument {
  return {
    type: "doc",
    version: 1,
    content: [
      {
        type: "paragraph",
      },
    ],
  };
}

export function sortProjectsByUpdatedAt(projects: Project[]): Project[] {
  return [...projects].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export function createChapter(input?: { title?: string; summary?: string }): Chapter {
  const timestamp = new Date().toISOString();
  const title = input?.title?.trim() || "New Chapter";

  return {
    id: createEntityId(),
    displayName: title,
    createdAt: timestamp,
    updatedAt: timestamp,
    title,
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
  const title = input?.title?.trim() || "New Scene";

  return {
    id: forcedId ?? createEntityId(),
    displayName: title,
    createdAt: timestamp,
    updatedAt: timestamp,
    title,
    summary: input?.summary?.trim() || "A fresh scene scaffold ready for drafting.",
    excerpt: [
      "This scene is ready for drafting. Add the first beats, then connect it to character, setting, and timeline context.",
    ],
    editorDocument: createEmptyDocument(),
    characterIds: [],
    sociumIds: [],
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
      id: createEntityId(),
      displayName: project.title,
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

export function removeChapterFromProject(project: Project, chapterId: string) {
  const timestamp = new Date().toISOString();
  const primaryBook = project.books[0];

  if (!primaryBook || primaryBook.chapters.length <= 1 || !primaryBook.chapters.some((chapter) => chapter.id === chapterId)) {
    const fallbackChapter = primaryBook?.chapters[0] ?? null;

    return {
      project,
      deleted: false,
      fallbackChapterId: fallbackChapter?.id ?? null,
      fallbackSceneId: fallbackChapter?.scenes[0]?.id ?? null,
    };
  }

  const remainingChapters = primaryBook.chapters.filter((chapter) => chapter.id !== chapterId);
  const removedChapterIndex = primaryBook.chapters.findIndex((chapter) => chapter.id === chapterId);
  const fallbackChapter = remainingChapters[Math.min(removedChapterIndex, remainingChapters.length - 1)] ?? remainingChapters[0] ?? null;

  return {
    project: {
      ...project,
      updatedAt: timestamp,
      books: [
        {
          ...primaryBook,
          updatedAt: timestamp,
          chapters: remainingChapters,
        },
        ...project.books.slice(1),
      ],
    },
    deleted: true,
    fallbackChapterId: fallbackChapter?.id ?? null,
    fallbackSceneId: fallbackChapter?.scenes[0]?.id ?? null,
  };
}

export function removeSceneFromChapter(project: Project, chapterId: string, sceneId: string) {
  const timestamp = new Date().toISOString();
  const targetChapter = project.books[0]?.chapters.find((chapter) => chapter.id === chapterId);

  if (!targetChapter || targetChapter.scenes.length <= 1 || !targetChapter.scenes.some((scene) => scene.id === sceneId)) {
    return {
      project,
      deleted: false,
      fallbackSceneId: targetChapter?.scenes[0]?.id ?? null,
    };
  }

  const nextScenes = targetChapter.scenes.filter((scene) => scene.id !== sceneId);
  const removedSceneIndex = targetChapter.scenes.findIndex((scene) => scene.id === sceneId);
  const fallbackScene = nextScenes[Math.min(removedSceneIndex, nextScenes.length - 1)] ?? nextScenes[0] ?? null;

  return {
    project: updatePrimaryBookChapter(project, chapterId, timestamp, (chapter) => ({
      ...chapter,
      updatedAt: timestamp,
      scenes: chapter.scenes.filter((scene) => scene.id !== sceneId),
    })),
    deleted: true,
    fallbackSceneId: fallbackScene?.id ?? null,
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
  return upsertCollectionItem(project, "characters", characterId, (timestamp, id, existing) => {
    const name = input.name.trim() || existing?.name || "Untitled character";
    return {
      id,
      displayName: name,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      name,
      role: input.role.trim(),
      summary: input.summary.trim(),
      arc: input.arc.trim(),
      status: normalizeCharacterStatus(input.status, existing?.status),
      aliases: input.aliases.trim(),
      pronouns: input.pronouns.trim(),
      age: input.age.trim(),
      birthDate: input.birthDate.trim(),
      gender: input.gender.trim(),
      speciesId: input.speciesId?.trim() || undefined,
      occupation: input.occupation.trim(),
      sociumId: input.sociumId?.trim() || undefined,
      residence: input.residence.trim(),
      origin: input.origin.trim(),
      firstAppearance: input.firstAppearance.trim(),
      appearance: input.appearance.trim(),
      distinguishingFeatures: input.distinguishingFeatures.trim(),
      skills: input.skills.trim(),
      goals: input.goals.trim(),
      fears: input.fears.trim(),
      internalConflict: input.internalConflict.trim(),
      externalConflict: input.externalConflict.trim(),
      background: input.background.trim(),
      personality: input.personality.trim(),
      voice: input.voice.trim(),
      mannerisms: input.mannerisms.trim(),
      beliefs: input.beliefs.trim(),
      secrets: input.secrets.trim(),
      unresolvedThreads: input.unresolvedThreads.trim(),
      notes: input.notes.trim(),
      quote: input.quote.trim(),
      relationshipIds: existing?.relationshipIds ?? [],
    };
  });
}

export function removeCharacter(project: Project, characterId: string) {
  const timestamp = new Date().toISOString();

  return syncCharacterRelationshipIds({
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
  });
}

export function upsertRelationship(project: Project, input: RelationshipInput, relationshipId?: string) {
  return syncCharacterRelationshipIds(upsertCollectionItem(project, "relationships", relationshipId, (timestamp, id, existing) => {
    const type = normalizeRelationshipType(input.type, existing?.type);
    const notes = input.notes.trim();
    const displayName = notes || `${type.charAt(0).toUpperCase() + type.slice(1)} relationship`;
    return {
      id,
      displayName,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      sourceCharacterId: input.sourceCharacterId,
      targetCharacterId: input.targetCharacterId,
      type,
      notes,
    };
  }));
}

export function removeRelationship(project: Project, relationshipId: string) {
  return syncCharacterRelationshipIds(removeCollectionItem(project, "relationships", relationshipId));
}

export function upsertSocium(project: Project, input: SociumInput, sociumId?: string) {
  return upsertCollectionItem(project, "sociums", sociumId, (timestamp, id, existing) => {
    const name = input.name.trim() || existing?.name || "Untitled socium";
    return {
      id,
      displayName: name,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      name,
      type: normalizeSociumType(input.type, existing?.type),
      summary: input.summary.trim(),
      leadership: input.leadership.trim(),
      headquarters: input.headquarters.trim(),
      territory: input.territory.trim(),
      scope: input.scope.trim(),
      goals: input.goals.trim(),
      beliefs: input.beliefs.trim(),
      resources: input.resources.trim(),
      methods: input.methods.trim(),
      allies: input.allies.trim(),
      rivals: input.rivals.trim(),
      publicReputation: input.publicReputation.trim(),
      internalConflicts: input.internalConflicts.trim(),
      notes: input.notes.trim(),
    };
  });
}

export function removeSocium(project: Project, sociumId: string) {
  return removeCollectionItem(project, "sociums", sociumId);
}

export function upsertTechnologyEntry(project: Project, input: TechnologyEntryInput, technologyEntryId?: string) {
  return upsertCollectionItem(project, "technologyEntries", technologyEntryId, (timestamp, id, existing) => {
    const name = input.name.trim() || existing?.name || "Untitled technology";
    return {
      id,
      displayName: name,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      name,
      summary: input.summary.trim(),
      ruleNotes: input.ruleNotesText
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };
  });
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
  return upsertCollectionItem(project, "locations", locationId, (timestamp, id, existing) => {
    const name = input.name.trim() || existing?.name || "Untitled location";
    return {
      id,
      displayName: name,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      name,
      summary: input.summary.trim(),
      regionName: input.regionName.trim(),
    };
  });
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
  return upsertCollectionItem(project, "regions", regionId, (timestamp, id, existing) => {
    const name = input.name.trim() || existing?.name || "Untitled region";
    return {
      id,
      displayName: name,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      name,
      summary: input.summary.trim(),
    };
  });
}

export function removeRegion(project: Project, regionId: string) {
  return removeCollectionItem(project, "regions", regionId);
}

export function upsertPlanet(project: Project, input: PlanetInput, planetId?: string) {
  return upsertCollectionItem(project, "planets", planetId, (timestamp, id, existing) => {
    const name = input.name.trim() || existing?.name || "Untitled planet";
    return {
      id,
      displayName: name,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      name,
      summary: input.summary.trim(),
    };
  });
}

export function removePlanet(project: Project, planetId: string) {
  return removeCollectionItem(project, "planets", planetId);
}

export function upsertSpecies(project: Project, input: SpeciesInput, speciesId?: string) {
  return upsertCollectionItem(project, "species", speciesId, (timestamp, id, existing) => {
    const name = input.name.trim() || existing?.name || "Untitled species";
    return {
      id,
      displayName: name,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      name,
      summary: input.summary.trim(),
      traits: input.traits.trim(),
      lifespan: input.lifespan.trim(),
      cultureNotes: input.cultureNotes.trim(),
      originWorld: input.originWorld.trim(),
    };
  });
}

export function removeSpecies(project: Project, speciesId: string) {
  const timestamp = new Date().toISOString();

  return {
    ...removeCollectionItem(project, "species", speciesId),
    characters: project.characters.map((character) => ({
      ...character,
      updatedAt: timestamp,
      speciesId: character.speciesId === speciesId ? undefined : character.speciesId,
    })),
    updatedAt: timestamp,
  };
}

export function upsertTimelineEvent(project: Project, input: TimelineEventInput, timelineEventId?: string) {
  return upsertCollectionItem(project, "timelineEvents", timelineEventId, (timestamp, id, existing) => {
    const title = input.title.trim() || existing?.title || "Untitled event";
    return {
      id,
      displayName: title,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      title,
      summary: input.summary.trim(),
      sequence: Number.isFinite(input.sequence) ? input.sequence : existing?.sequence ?? 1,
    };
  });
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
  return upsertCollectionItem(project, "corkboardCards", corkboardCardId, (timestamp, id, existing) => {
    const title = input.title.trim() || existing?.title || "Untitled card";
    return {
      id,
      displayName: title,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      title,
      summary: input.summary.trim(),
      linkedSceneId: input.linkedSceneId,
    };
  });
}

export function removeCorkboardCard(project: Project, corkboardCardId: string) {
  return removeCollectionItem(project, "corkboardCards", corkboardCardId);
}

export function upsertPlotThread(project: Project, input: PlotThreadInput, plotThreadId?: string) {
  return upsertCollectionItem(project, "plotThreads", plotThreadId, (timestamp, id, existing) => {
    const name = input.name.trim() || existing?.name || "Untitled plot thread";
    return {
      id,
      displayName: name,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      name,
      summary: input.summary.trim(),
    };
  });
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
  return upsertCollectionItem(project, "acts", actId, (timestamp, id, existing) => {
    const name = input.name.trim() || existing?.name || "Untitled act";
    return {
      id,
      displayName: name,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      name,
      summary: input.summary.trim(),
      order: Number.isFinite(input.order) ? input.order : existing?.order ?? 1,
    };
  });
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
  return upsertCollectionItem(project, "beats", beatId, (timestamp, id, existing) => {
    const title = input.title.trim() || existing?.title || "Untitled beat";
    return {
      id,
      displayName: title,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      title,
      summary: input.summary.trim(),
      order: Number.isFinite(input.order) ? input.order : existing?.order ?? 1,
      actId: input.actId,
      sceneId: input.sceneId,
    };
  });
}

export function removeBeat(project: Project, beatId: string) {
  return removeCollectionItem(project, "beats", beatId);
}

export function upsertSubplot(project: Project, input: SubplotInput, subplotId?: string) {
  return upsertCollectionItem(project, "subplots", subplotId, (timestamp, id, existing) => {
    const name = input.name.trim() || existing?.name || "Untitled subplot";
    return {
      id,
      displayName: name,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      name,
      summary: input.summary.trim(),
    };
  });
}

export function removeSubplot(project: Project, subplotId: string) {
  return removeCollectionItem(project, "subplots", subplotId);
}

export function upsertPovMarker(project: Project, input: PovMarkerInput, povMarkerId?: string) {
  return upsertCollectionItem(project, "povMarkers", povMarkerId, (timestamp, id, existing) => {
    const label = input.label.trim() || existing?.label || "Untitled POV marker";
    return {
      id,
      displayName: label,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      label,
      summary: input.summary.trim(),
      characterId: input.characterId,
      sceneId: input.sceneId,
    };
  });
}

export function removePovMarker(project: Project, povMarkerId: string) {
  return removeCollectionItem(project, "povMarkers", povMarkerId);
}

export function upsertGlossaryEntry(project: Project, input: GlossaryEntryInput, glossaryEntryId?: string) {
  return upsertCollectionItem(project, "glossaryEntries", glossaryEntryId, (timestamp, id, existing) => {
    const term = input.term.trim() || existing?.term || "Untitled term";
    return {
      id,
      displayName: term,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      term,
      definition: input.definition.trim(),
    };
  });
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
  return upsertCollectionItem(project, "loreNotes", loreNoteId, (timestamp, id, existing) => {
    const title = input.title.trim() || existing?.title || "Untitled lore note";
    return {
      id,
      displayName: title,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      title,
      summary: input.summary.trim(),
    };
  });
}

export function removeLoreNote(project: Project, loreNoteId: string) {
  return removeCollectionItem(project, "loreNotes", loreNoteId);
}

export function upsertResearchNote(project: Project, input: ResearchNoteInput, researchNoteId?: string) {
  return upsertCollectionItem(project, "researchNotes", researchNoteId, (timestamp, id, existing) => {
    const title = input.title.trim() || existing?.title || "Untitled research note";
    return {
      id,
      displayName: title,
      createdAt: existing?.createdAt ?? timestamp,
      updatedAt: timestamp,
      title,
      summary: input.summary.trim(),
      source: input.source?.trim() || undefined,
    };
  });
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

export function generateUuid(): string {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      Number(c) ^
      (Math.trunc(Math.random() * 256) & (15 >> (Number(c) / 4)))
    ).toString(16)
  );
}

export function isValidUuid(id?: string): boolean {
  if (!id || typeof id !== "string") return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

const KNOWN_UUID_MAP: Record<string, string> = {
  "project-aurora-protocol": "a0100000-0000-4000-8000-000000000001",
  "book-aurora-protocol": "a0200000-0000-4000-8000-000000000002",
  "chapter-01": "a0300000-0000-4000-8000-000000000003",
  "scene-01": "a0400000-0000-4000-8000-000000000004",
  "document-manuscript-outline": "a0500000-0000-4000-8000-000000000005",
  "character-mara-vale": "a0600000-0000-4000-8000-000000000006",
  "character-iven-rook": "a0600000-0000-4000-8000-000000000007",
  "relationship-mara-iven": "a0700000-0000-4000-8000-000000000008",
  "species-human": "a0800000-0000-4000-8000-000000000009",
  "socium-aurora-accord": "a0900000-0000-4000-8000-000000000010",
  "technology-aurora-array": "a1000000-0000-4000-8000-000000000011",
  "location-helion-observatory": "a1100000-0000-4000-8000-000000000012",
  "region-upper-ring": "a1200000-0000-4000-8000-000000000013",
  "planet-sera": "a1300000-0000-4000-8000-000000000014",
  "timeline-first-signal": "a1400000-0000-4000-8000-000000000015",
  "card-opening-signal": "a1500000-0000-4000-8000-000000000016",
  "thread-signal-mystery": "a1600000-0000-4000-8000-000000000017",
  "act-discovery": "a1700000-0000-4000-8000-000000000018",
  "beat-first-fracture": "a1800000-0000-4000-8000-000000000019",
  "subplot-trust": "a1900000-0000-4000-8000-000000000020",
  "pov-mara-opening": "a2000000-0000-4000-8000-000000000021",
  "glossary-aurora-array": "a2100000-0000-4000-8000-000000000022",
  "lore-observatory-charter": "a2200000-0000-4000-8000-000000000023",
  "research-gas-giant-reference": "a2300000-0000-4000-8000-000000000024",
  "snapshot-opening-pass": "a2400000-0000-4000-8000-000000000025",
};

export function stringToUuid(id?: string | null): string {
  if (!id || typeof id !== "string") {
    return generateUuid();
  }
  if (isValidUuid(id)) {
    return id;
  }
  if (KNOWN_UUID_MAP[id]) {
    return KNOWN_UUID_MAP[id];
  }
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < id.length; i++) {
    const c = id.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193);
    h2 = Math.imul(h2 ^ c, 0x811c9dc5);
  }
  const hex1 = (h1 >>> 0).toString(16).padStart(8, "0");
  const hex2 = (h2 >>> 0).toString(16).padStart(8, "0");
  const hex3 = ((h1 ^ h2) >>> 0).toString(16).padStart(8, "0");
  const hex4 = ((h1 + h2) >>> 0).toString(16).padStart(8, "0");

  const p1 = hex1;
  const p2 = hex2.slice(0, 4);
  const p3 = `4${hex2.slice(4, 7)}`;
  const p4 = `a${hex3.slice(0, 3)}`;
  const p5 = `${hex3.slice(3, 7)}${hex4.slice(0, 8)}`;

  return `${p1}-${p2}-${p3}-${p4}-${p5}`;
}

function createEntityId(): string {
  return generateUuid();
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
  const id = itemId ?? createEntityId();
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
  | "sociums"
  | "technologyEntries"
  | "locations"
  | "regions"
  | "planets"
  | "species"
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

function normalizeSociumType(input: string, fallback?: Project["sociums"][number]["type"]) {
  switch (input) {
    case "faction":
    case "clan":
    case "guild":
    case "kingdom":
    case "corporation":
    case "religion":
    case "tribe":
    case "order":
    case "house":
    case "other":
      return input;
    default:
      return fallback ?? "faction";
  }
}

function normalizeCharacterStatus(input?: CharacterStatus, fallback?: CharacterStatus): CharacterStatus {
  switch (input) {
    case "alive":
    case "dead":
    case "missing":
    case "unknown":
      return input;
    default:
      return fallback ?? "alive";
  }
}

function normalizeRelationshipType(input?: RelationshipType, fallback?: RelationshipType): RelationshipType {
  switch (input) {
    case "family":
    case "friend":
    case "ally":
    case "rival":
    case "enemy":
    case "mentor":
    case "student":
    case "romantic":
    case "subordinate":
    case "leader":
      return input;
    default:
      return fallback ?? "ally";
  }
}

function syncCharacterRelationshipIds(project: Project): Project {
  const relationshipIdsByCharacter = new Map<string, string[]>();

  project.characters.forEach((character) => {
    relationshipIdsByCharacter.set(character.id, []);
  });

  project.relationships.forEach((relationship) => {
    if (relationshipIdsByCharacter.has(relationship.sourceCharacterId)) {
      relationshipIdsByCharacter.get(relationship.sourceCharacterId)?.push(relationship.id);
    }

    if (relationshipIdsByCharacter.has(relationship.targetCharacterId)) {
      relationshipIdsByCharacter.get(relationship.targetCharacterId)?.push(relationship.id);
    }
  });

  return {
    ...project,
    characters: project.characters.map((character) => ({
      ...character,
      relationshipIds: relationshipIdsByCharacter.get(character.id) ?? [],
    })),
  };
}
