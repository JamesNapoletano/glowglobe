import { createEmptyDocument, generateUuid, isValidUuid, stringToUuid } from "@/lib/domain/project-factory";
import type {
  Act,
  Beat,
  Book,
  Chapter,
  Character,
  CorkboardCard,
  GlossaryEntry,
  LoreNote,
  Planet,
  PlotThread,
  PovMarker,
  Project,
  ProjectLifecycleState,
  ProjectStatus,
  Region,
  Relationship,
  ResearchNote,
  RevisionSnapshot,
  RichTextDocument,
  RichTextNode,
  Scene,
  Socium,
  Species,
  StoryDocument,
  Subplot,
  TechnologyEntry,
  TimelineEvent,
  Location,
} from "@/lib/domain/types";

export function normalizeProject(project: Project): Project {
  const idMap = new Map<string, string>();

  function getOrGenerateUuid(id?: string): string {
    if (!id || typeof id !== "string") {
      return generateUuid();
    }
    if (isValidUuid(id)) {
      return id;
    }
    if (idMap.has(id)) {
      return idMap.get(id)!;
    }
    const deterministicUuid = stringToUuid(id);
    idMap.set(id, deterministicUuid);
    return deterministicUuid;
  }

  function remapRef(refId?: string): string | undefined {
    if (!refId) return undefined;
    return idMap.has(refId) ? idMap.get(refId)! : stringToUuid(refId);
  }

  function remapRefRequired(refId: string): string {
    if (!refId) return generateUuid();
    return idMap.has(refId) ? idMap.get(refId)! : stringToUuid(refId);
  }

  function remapRefArray(refIds?: string[]): string[] {
    return ensureArray(refIds).map((refId) => (idMap.has(refId) ? idMap.get(refId)! : stringToUuid(refId)));
  }

  // Pre-pass: build ID mapping for all entities if non-UUIDs exist
  const rawProject = project ?? {};
  if (rawProject.id && !isValidUuid(rawProject.id)) getOrGenerateUuid(rawProject.id);

  ensureArray(rawProject.books).forEach((b) => {
    if (b?.id && !isValidUuid(b.id)) getOrGenerateUuid(b.id);
    ensureArray(b?.chapters).forEach((c) => {
      if (c?.id && !isValidUuid(c.id)) getOrGenerateUuid(c.id);
      ensureArray(c?.scenes).forEach((s) => {
        if (s?.id && !isValidUuid(s.id)) getOrGenerateUuid(s.id);
      });
    });
  });
  ensureArray(rawProject.documents).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.characters).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.relationships).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.sociums).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.technologyEntries).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.locations).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.regions).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.planets).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.species).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.timelineEvents).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.corkboardCards).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.plotThreads).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.acts).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.beats).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.subplots).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.povMarkers).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.glossaryEntries).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.loreNotes).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.researchNotes).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));
  ensureArray(rawProject.revisionSnapshots).forEach((item) => item?.id && !isValidUuid(item.id) && getOrGenerateUuid(item.id));

  const title = project.title ?? "Untitled project";
  const projectId = getOrGenerateUuid(project.id);

  return {
    ...project,
    id: projectId,
    displayName: title,
    title,
    genre: project.genre ?? "Unspecified",
    description: project.description ?? "",
    status: normalizeStatus(project.status),
    lifecycleState: normalizeLifecycleState(project.lifecycleState),
    books: ensureArray(project.books).map((b) => normalizeBook(b, getOrGenerateUuid, remapRefArray)),
    documents: ensureArray(project.documents).map((d) => normalizeDocument(d, getOrGenerateUuid)),
    characters: ensureArray(project.characters).map((c) => normalizeCharacter(c, getOrGenerateUuid, remapRef, remapRefArray)),
    relationships: ensureArray(project.relationships).map((r) => normalizeRelationship(r, getOrGenerateUuid, remapRefRequired)),
    sociums: ensureArray(project.sociums).map((s) => normalizeSocium(s, getOrGenerateUuid)),
    technologyEntries: ensureArray(project.technologyEntries).map((t) => normalizeTechnologyEntry(t, getOrGenerateUuid)),
    locations: ensureArray(project.locations).map((l) => normalizeLocation(l, getOrGenerateUuid)),
    regions: ensureArray(project.regions).map((r) => normalizeRegion(r, getOrGenerateUuid)),
    planets: ensureArray(project.planets).map((p) => normalizePlanet(p, getOrGenerateUuid)),
    species: ensureArray(project.species).map((sp) => normalizeSpecies(sp, getOrGenerateUuid)),
    timelineEvents: ensureArray(project.timelineEvents).map((te) => normalizeTimelineEvent(te, getOrGenerateUuid)),
    corkboardCards: ensureArray(project.corkboardCards).map((cc) => normalizeCorkboardCard(cc, getOrGenerateUuid, remapRef)),
    plotThreads: ensureArray(project.plotThreads).map((pt) => normalizePlotThread(pt, getOrGenerateUuid)),
    acts: ensureArray(project.acts).map((a) => normalizeAct(a, getOrGenerateUuid)),
    beats: ensureArray(project.beats).map((b) => normalizeBeat(b, getOrGenerateUuid, remapRef)),
    subplots: ensureArray(project.subplots).map((sp) => normalizeSubplot(sp, getOrGenerateUuid)),
    povMarkers: ensureArray(project.povMarkers).map((pm) => normalizePovMarker(pm, getOrGenerateUuid, remapRef)),
    glossaryEntries: ensureArray(project.glossaryEntries).map((ge) => normalizeGlossaryEntry(ge, getOrGenerateUuid)),
    loreNotes: ensureArray(project.loreNotes).map((ln) => normalizeLoreNote(ln, getOrGenerateUuid)),
    researchNotes: ensureArray(project.researchNotes).map((rn) => normalizeResearchNote(rn, getOrGenerateUuid)),
    revisionSnapshots: ensureArray(project.revisionSnapshots).map((rs) => normalizeRevisionSnapshot(rs, getOrGenerateUuid)),
  };
}

function normalizeBook(
  book: Book,
  getUuid: (id?: string) => string,
  remapRefArray: (ids?: string[]) => string[],
): Book {
  const title = book.title ?? "Untitled book";
  return {
    ...book,
    id: getUuid(book.id),
    displayName: title,
    title,
    summary: book.summary ?? "",
    chapters: ensureArray(book.chapters).map((c) => normalizeChapter(c, getUuid, remapRefArray)),
  };
}

function normalizeChapter(
  chapter: Chapter,
  getUuid: (id?: string) => string,
  remapRefArray: (ids?: string[]) => string[],
): Chapter {
  const title = chapter.title ?? "Untitled chapter";
  return {
    ...chapter,
    id: getUuid(chapter.id),
    displayName: title,
    title,
    summary: chapter.summary ?? "",
    scenes: ensureArray(chapter.scenes).map((s) => normalizeScene(s, getUuid, remapRefArray)),
  };
}

function normalizeScene(
  scene: Scene,
  getUuid: (id?: string) => string,
  remapRefArray: (ids?: string[]) => string[],
): Scene {
  const title = scene.title ?? "Untitled scene";
  const editorDocument = normalizeRichTextDocument(scene.editorDocument);
  const excerpt = ensureArray(scene.excerpt).filter(Boolean);

  return {
    ...scene,
    id: getUuid(scene.id),
    displayName: title,
    title,
    summary: scene.summary ?? "",
    excerpt: excerpt.length > 0 ? excerpt : ["This scene is ready for drafting."],
    editorDocument,
    characterIds: remapRefArray(scene.characterIds),
    sociumIds: remapRefArray(scene.sociumIds),
    locationIds: remapRefArray(scene.locationIds),
    technologyEntryIds: remapRefArray(scene.technologyEntryIds),
    timelineEventIds: remapRefArray(scene.timelineEventIds),
    plotThreadIds: remapRefArray(scene.plotThreadIds),
    glossaryEntryIds: remapRefArray(scene.glossaryEntryIds),
  };
}

function normalizeDocument(document: StoryDocument, getUuid: (id?: string) => string): StoryDocument {
  const title = document.title ?? "Untitled document";
  return {
    ...document,
    id: getUuid(document.id),
    displayName: title,
    title,
    kind: document.kind ?? "note",
    content: normalizeRichTextDocument(document.content),
  };
}

function normalizeCharacter(
  character: Character,
  getUuid: (id?: string) => string,
  remapRef: (id?: string) => string | undefined,
  remapRefArray: (ids?: string[]) => string[],
): Character {
  const name = character.name ?? "Untitled character";
  return {
    ...character,
    id: getUuid(character.id),
    displayName: name,
    name,
    role: character.role ?? "",
    summary: character.summary ?? "",
    arc: character.arc ?? "",
    status: normalizeCharacterStatus(character.status),
    aliases: character.aliases ?? "",
    pronouns: character.pronouns ?? "",
    age: character.age ?? "",
    birthDate: character.birthDate ?? "",
    gender: character.gender ?? "",
    speciesId: remapRef(character.speciesId),
    occupation: character.occupation ?? "",
    sociumId: remapRef(character.sociumId),
    residence: character.residence ?? "",
    origin: character.origin ?? "",
    firstAppearance: character.firstAppearance ?? "",
    appearance: character.appearance ?? "",
    distinguishingFeatures: character.distinguishingFeatures ?? "",
    skills: character.skills ?? "",
    goals: character.goals ?? "",
    fears: character.fears ?? "",
    internalConflict: character.internalConflict ?? "",
    externalConflict: character.externalConflict ?? "",
    background: character.background ?? "",
    personality: character.personality ?? "",
    voice: character.voice ?? "",
    mannerisms: character.mannerisms ?? "",
    beliefs: character.beliefs ?? "",
    secrets: character.secrets ?? "",
    unresolvedThreads: character.unresolvedThreads ?? "",
    notes: character.notes ?? "",
    quote: character.quote ?? "",
    relationshipIds: remapRefArray(character.relationshipIds),
  };
}

function normalizeRelationship(
  relationship: Relationship,
  getUuid: (id?: string) => string,
  remapRefRequired: (id: string) => string,
): Relationship {
  const notes = relationship.notes ?? (relationship as Relationship & { description?: string }).description ?? "";
  const type = normalizeRelationshipType(relationship.type);
  const displayName = notes.trim() || `${type.charAt(0).toUpperCase() + type.slice(1)} relationship`;

  return {
    ...relationship,
    id: getUuid(relationship.id),
    displayName,
    sourceCharacterId: remapRefRequired(relationship.sourceCharacterId),
    targetCharacterId: remapRefRequired(relationship.targetCharacterId),
    type,
    notes,
  };
}

function normalizeSocium(socium: Socium, getUuid: (id?: string) => string): Socium {
  const name = socium.name ?? "Untitled socium";
  return {
    ...socium,
    id: getUuid(socium.id),
    displayName: name,
    name,
    type: normalizeSociumType(socium.type),
    summary: socium.summary ?? "",
    leadership: socium.leadership ?? "",
    headquarters: socium.headquarters ?? "",
    territory: socium.territory ?? "",
    scope: socium.scope ?? "",
    goals: socium.goals ?? "",
    beliefs: socium.beliefs ?? "",
    resources: socium.resources ?? "",
    methods: socium.methods ?? "",
    allies: socium.allies ?? "",
    rivals: socium.rivals ?? "",
    publicReputation: socium.publicReputation ?? "",
    internalConflicts: socium.internalConflicts ?? "",
    notes: socium.notes ?? "",
  };
}

function normalizeTechnologyEntry(entry: TechnologyEntry, getUuid: (id?: string) => string): TechnologyEntry {
  const name = entry.name ?? "Untitled technology";
  return {
    ...entry,
    id: getUuid(entry.id),
    displayName: name,
    name,
    summary: entry.summary ?? "",
    ruleNotes: ensureArray(entry.ruleNotes),
  };
}

function normalizeLocation(location: Location, getUuid: (id?: string) => string): Location {
  const name = location.name ?? "Untitled location";
  return {
    ...location,
    id: getUuid(location.id),
    displayName: name,
    name,
    summary: location.summary ?? "",
    regionName: location.regionName ?? "",
  };
}

function normalizeRegion(region: Region, getUuid: (id?: string) => string): Region {
  const name = region.name ?? "Untitled region";
  return {
    ...region,
    id: getUuid(region.id),
    displayName: name,
    name,
    summary: region.summary ?? "",
  };
}

function normalizePlanet(planet: Planet, getUuid: (id?: string) => string): Planet {
  const name = planet.name ?? "Untitled planet";
  return {
    ...planet,
    id: getUuid(planet.id),
    displayName: name,
    name,
    summary: planet.summary ?? "",
  };
}

function normalizeSpecies(species: Species, getUuid: (id?: string) => string): Species {
  const name = species.name ?? "Untitled species";
  return {
    ...species,
    id: getUuid(species.id),
    displayName: name,
    name,
    summary: species.summary ?? "",
    traits: species.traits ?? "",
    lifespan: species.lifespan ?? "",
    cultureNotes: species.cultureNotes ?? "",
    originWorld: species.originWorld ?? "",
  };
}

function normalizeTimelineEvent(event: TimelineEvent, getUuid: (id?: string) => string): TimelineEvent {
  const title = event.title ?? "Untitled event";
  return {
    ...event,
    id: getUuid(event.id),
    displayName: title,
    title,
    summary: event.summary ?? "",
    sequence: Number.isFinite(event.sequence) ? event.sequence : 1,
  };
}

function normalizeCorkboardCard(
  card: CorkboardCard,
  getUuid: (id?: string) => string,
  remapRef: (id?: string) => string | undefined,
): CorkboardCard {
  const title = card.title ?? "Untitled card";
  return {
    ...card,
    id: getUuid(card.id),
    displayName: title,
    title,
    summary: card.summary ?? "",
    linkedSceneId: remapRef(card.linkedSceneId),
  };
}

function normalizePlotThread(thread: PlotThread, getUuid: (id?: string) => string): PlotThread {
  const name = thread.name ?? "Untitled plot thread";
  return {
    ...thread,
    id: getUuid(thread.id),
    displayName: name,
    name,
    summary: thread.summary ?? "",
  };
}

function normalizeAct(act: Act, getUuid: (id?: string) => string): Act {
  const name = act.name ?? "Untitled act";
  return {
    ...act,
    id: getUuid(act.id),
    displayName: name,
    name,
    summary: act.summary ?? "",
    order: Number.isFinite(act.order) ? act.order : 1,
  };
}

function normalizeBeat(
  beat: Beat,
  getUuid: (id?: string) => string,
  remapRef: (id?: string) => string | undefined,
): Beat {
  const title = beat.title ?? "Untitled beat";
  return {
    ...beat,
    id: getUuid(beat.id),
    displayName: title,
    title,
    summary: beat.summary ?? "",
    order: Number.isFinite(beat.order) ? beat.order : 1,
    actId: remapRef(beat.actId),
    sceneId: remapRef(beat.sceneId),
  };
}

function normalizeSubplot(subplot: Subplot, getUuid: (id?: string) => string): Subplot {
  const name = subplot.name ?? "Untitled subplot";
  return {
    ...subplot,
    id: getUuid(subplot.id),
    displayName: name,
    name,
    summary: subplot.summary ?? "",
  };
}

function normalizePovMarker(
  marker: PovMarker,
  getUuid: (id?: string) => string,
  remapRef: (id?: string) => string | undefined,
): PovMarker {
  const label = marker.label ?? "Untitled POV marker";
  return {
    ...marker,
    id: getUuid(marker.id),
    displayName: label,
    label,
    summary: marker.summary ?? "",
    characterId: remapRef(marker.characterId),
    sceneId: remapRef(marker.sceneId),
  };
}

function normalizeGlossaryEntry(entry: GlossaryEntry, getUuid: (id?: string) => string): GlossaryEntry {
  const term = entry.term ?? "Untitled term";
  return {
    ...entry,
    id: getUuid(entry.id),
    displayName: term,
    term,
    definition: entry.definition ?? "",
  };
}

function normalizeLoreNote(note: LoreNote, getUuid: (id?: string) => string): LoreNote {
  const title = note.title ?? "Untitled lore note";
  return {
    ...note,
    id: getUuid(note.id),
    displayName: title,
    title,
    summary: note.summary ?? "",
  };
}

function normalizeResearchNote(note: ResearchNote, getUuid: (id?: string) => string): ResearchNote {
  const title = note.title ?? "Untitled research note";
  return {
    ...note,
    id: getUuid(note.id),
    displayName: title,
    title,
    summary: note.summary ?? "",
    source: note.source ?? undefined,
  };
}

function normalizeRevisionSnapshot(snapshot: RevisionSnapshot, getUuid: (id?: string) => string): RevisionSnapshot {
  const label = snapshot.label ?? "Untitled snapshot";
  return {
    ...snapshot,
    id: getUuid(snapshot.id),
    displayName: label,
    label,
    summary: snapshot.summary ?? "",
  };
}

function sanitizeRichTextContentNode(node: RichTextNode): RichTextNode {
  if (!node || typeof node !== "object") return node;
  if (node.type === "paragraph" && Array.isArray(node.content)) {
    const filteredContent = node.content
      .filter((child) => !(child && child.type === "text" && child.text === ""))
      .map(sanitizeRichTextContentNode);
    return filteredContent.length > 0 ? { ...node, content: filteredContent } : { type: "paragraph" };
  }
  if (Array.isArray(node.content)) {
    return {
      ...node,
      content: node.content
        .filter((child) => !(child && child.type === "text" && child.text === ""))
        .map(sanitizeRichTextContentNode),
    };
  }
  return node;
}

function normalizeRichTextDocument(document?: RichTextDocument): RichTextDocument {
  if (!document || document.type !== "doc" || !Array.isArray(document.content)) {
    return createEmptyDocument();
  }

  const sanitizedContent = document.content
    .filter((node) => node && typeof node === "object")
    .map(sanitizeRichTextContentNode);

  return {
    type: "doc",
    version: 1,
    content: sanitizedContent.length > 0 ? sanitizedContent : [{ type: "paragraph" }],
  };
}

function normalizeStatus(status?: ProjectStatus): ProjectStatus {
  return status && ["idea", "planning", "drafting", "revising", "complete"].includes(status)
    ? status
    : "planning";
}

function normalizeLifecycleState(state?: ProjectLifecycleState): ProjectLifecycleState {
  return state && ["active", "archived", "trashed"].includes(state)
    ? state
    : "active";
}

function ensureArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

function normalizeSociumType(value?: Socium["type"]): Socium["type"] {
  switch (value) {
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
      return value;
    default:
      return "faction";
  }
}

function normalizeCharacterStatus(value?: Character["status"]): Character["status"] {
  switch (value) {
    case "alive":
    case "dead":
    case "missing":
    case "unknown":
      return value;
    default:
      return "alive";
  }
}

function normalizeRelationshipType(value?: Relationship["type"]): Relationship["type"] {
  switch (value) {
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
      return value;
    default:
      return "ally";
  }
}
