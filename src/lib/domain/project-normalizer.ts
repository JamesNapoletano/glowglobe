import { createEmptyDocument } from "@/lib/domain/project-factory";
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
  ProjectStatus,
  Region,
  Relationship,
  ResearchNote,
  RevisionSnapshot,
  RichTextDocument,
  Scene,
  StoryDocument,
  Subplot,
  TechnologyEntry,
  TimelineEvent,
  Location,
} from "@/lib/domain/types";

export function normalizeProject(project: Project): Project {
  return {
    ...project,
    title: project.title ?? "Untitled project",
    genre: project.genre ?? "Unspecified",
    description: project.description ?? "",
    status: normalizeStatus(project.status),
    books: ensureArray(project.books).map(normalizeBook),
    documents: ensureArray(project.documents).map(normalizeDocument),
    characters: ensureArray(project.characters).map(normalizeCharacter),
    relationships: ensureArray(project.relationships).map(normalizeRelationship),
    technologyEntries: ensureArray(project.technologyEntries).map(normalizeTechnologyEntry),
    locations: ensureArray(project.locations).map(normalizeLocation),
    regions: ensureArray(project.regions).map(normalizeRegion),
    planets: ensureArray(project.planets).map(normalizePlanet),
    timelineEvents: ensureArray(project.timelineEvents).map(normalizeTimelineEvent),
    corkboardCards: ensureArray(project.corkboardCards).map(normalizeCorkboardCard),
    plotThreads: ensureArray(project.plotThreads).map(normalizePlotThread),
    acts: ensureArray(project.acts).map(normalizeAct),
    beats: ensureArray(project.beats).map(normalizeBeat),
    subplots: ensureArray(project.subplots).map(normalizeSubplot),
    povMarkers: ensureArray(project.povMarkers).map(normalizePovMarker),
    glossaryEntries: ensureArray(project.glossaryEntries).map(normalizeGlossaryEntry),
    loreNotes: ensureArray(project.loreNotes).map(normalizeLoreNote),
    researchNotes: ensureArray(project.researchNotes).map(normalizeResearchNote),
    revisionSnapshots: ensureArray(project.revisionSnapshots).map(normalizeRevisionSnapshot),
  };
}

function normalizeBook(book: Book): Book {
  return {
    ...book,
    title: book.title ?? "Untitled book",
    summary: book.summary ?? "",
    chapters: ensureArray(book.chapters).map(normalizeChapter),
  };
}

function normalizeChapter(chapter: Chapter): Chapter {
  return {
    ...chapter,
    title: chapter.title ?? "Untitled chapter",
    summary: chapter.summary ?? "",
    scenes: ensureArray(chapter.scenes).map(normalizeScene),
  };
}

function normalizeScene(scene: Scene): Scene {
  const editorDocument = normalizeRichTextDocument(scene.editorDocument);
  const excerpt = ensureArray(scene.excerpt).filter(Boolean);

  return {
    ...scene,
    title: scene.title ?? "Untitled scene",
    summary: scene.summary ?? "",
    excerpt: excerpt.length > 0 ? excerpt : ["This scene is ready for drafting."],
    editorDocument,
    characterIds: ensureArray(scene.characterIds),
    locationIds: ensureArray(scene.locationIds),
    technologyEntryIds: ensureArray(scene.technologyEntryIds),
    timelineEventIds: ensureArray(scene.timelineEventIds),
    plotThreadIds: ensureArray(scene.plotThreadIds),
    glossaryEntryIds: ensureArray(scene.glossaryEntryIds),
  };
}

function normalizeDocument(document: StoryDocument): StoryDocument {
  return {
    ...document,
    title: document.title ?? "Untitled document",
    kind: document.kind ?? "note",
    content: normalizeRichTextDocument(document.content),
  };
}

function normalizeCharacter(character: Character): Character {
  return {
    ...character,
    name: character.name ?? "Untitled character",
    role: character.role ?? "",
    arc: character.arc ?? "",
    relationshipIds: ensureArray(character.relationshipIds),
  };
}

function normalizeRelationship(relationship: Relationship): Relationship {
  return {
    ...relationship,
    sourceCharacterId: relationship.sourceCharacterId ?? "",
    targetCharacterId: relationship.targetCharacterId ?? "",
    description: relationship.description ?? "",
  };
}

function normalizeTechnologyEntry(entry: TechnologyEntry): TechnologyEntry {
  return {
    ...entry,
    name: entry.name ?? "Untitled technology",
    summary: entry.summary ?? "",
    ruleNotes: ensureArray(entry.ruleNotes),
  };
}

function normalizeLocation(location: Location): Location {
  return {
    ...location,
    name: location.name ?? "Untitled location",
    summary: location.summary ?? "",
    regionName: location.regionName ?? "",
  };
}

function normalizeRegion(region: Region): Region {
  return {
    ...region,
    name: region.name ?? "Untitled region",
    summary: region.summary ?? "",
  };
}

function normalizePlanet(planet: Planet): Planet {
  return {
    ...planet,
    name: planet.name ?? "Untitled planet",
    summary: planet.summary ?? "",
  };
}

function normalizeTimelineEvent(event: TimelineEvent): TimelineEvent {
  return {
    ...event,
    title: event.title ?? "Untitled event",
    summary: event.summary ?? "",
    sequence: Number.isFinite(event.sequence) ? event.sequence : 1,
  };
}

function normalizeCorkboardCard(card: CorkboardCard): CorkboardCard {
  return {
    ...card,
    title: card.title ?? "Untitled card",
    summary: card.summary ?? "",
    linkedSceneId: card.linkedSceneId ?? undefined,
  };
}

function normalizePlotThread(thread: PlotThread): PlotThread {
  return {
    ...thread,
    name: thread.name ?? "Untitled plot thread",
    summary: thread.summary ?? "",
  };
}

function normalizeAct(act: Act): Act {
  return {
    ...act,
    name: act.name ?? "Untitled act",
    summary: act.summary ?? "",
    order: Number.isFinite(act.order) ? act.order : 1,
  };
}

function normalizeBeat(beat: Beat): Beat {
  return {
    ...beat,
    title: beat.title ?? "Untitled beat",
    summary: beat.summary ?? "",
    order: Number.isFinite(beat.order) ? beat.order : 1,
    actId: beat.actId ?? undefined,
    sceneId: beat.sceneId ?? undefined,
  };
}

function normalizeSubplot(subplot: Subplot): Subplot {
  return {
    ...subplot,
    name: subplot.name ?? "Untitled subplot",
    summary: subplot.summary ?? "",
  };
}

function normalizePovMarker(marker: PovMarker): PovMarker {
  return {
    ...marker,
    label: marker.label ?? "Untitled POV marker",
    summary: marker.summary ?? "",
    characterId: marker.characterId ?? undefined,
    sceneId: marker.sceneId ?? undefined,
  };
}

function normalizeGlossaryEntry(entry: GlossaryEntry): GlossaryEntry {
  return {
    ...entry,
    term: entry.term ?? "Untitled term",
    definition: entry.definition ?? "",
  };
}

function normalizeLoreNote(note: LoreNote): LoreNote {
  return {
    ...note,
    title: note.title ?? "Untitled lore note",
    summary: note.summary ?? "",
  };
}

function normalizeResearchNote(note: ResearchNote): ResearchNote {
  return {
    ...note,
    title: note.title ?? "Untitled research note",
    summary: note.summary ?? "",
    source: note.source ?? undefined,
  };
}

function normalizeRevisionSnapshot(snapshot: RevisionSnapshot): RevisionSnapshot {
  return {
    ...snapshot,
    label: snapshot.label ?? "Untitled snapshot",
    summary: snapshot.summary ?? "",
  };
}

function normalizeRichTextDocument(document?: RichTextDocument): RichTextDocument {
  if (!document || document.type !== "doc" || !Array.isArray(document.content)) {
    return createEmptyDocument();
  }

  return {
    type: "doc",
    version: 1,
    content: document.content,
  };
}

function normalizeStatus(status?: ProjectStatus): ProjectStatus {
  return status && ["idea", "planning", "drafting", "revising", "complete"].includes(status)
    ? status
    : "planning";
}

function ensureArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}
