import type { Project, RichTextDocument } from "@/lib/domain/types";

const timestamp = "2026-04-19T12:00:00.000Z";

const sampleDocument: RichTextDocument = {
  type: "doc",
  version: 1,
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "The observatory windows had learned the exact shade of dawn before Mara ever noticed how lonely the planet sounded.",
        },
      ],
    },
  ],
};

export const sampleProject: Project = {
  id: "project-aurora-protocol",
  createdAt: timestamp,
  updatedAt: timestamp,
  title: "Aurora Protocol",
  genre: "Speculative Fiction",
  description:
    "A speculative novel workspace used to validate GlowGlobe's manuscript-first shell, contextual reference model, and planning surfaces.",
  status: "drafting",
  books: [
    {
      id: "book-aurora-protocol",
      createdAt: timestamp,
      updatedAt: timestamp,
      title: "Aurora Protocol",
      summary: "Book one manuscript draft.",
      chapters: [
        {
          id: "chapter-01",
          createdAt: timestamp,
          updatedAt: timestamp,
          title: "Chapter 01 · Glass Morning",
          summary: "Mara detects the first anomaly in the observatory ring.",
          scenes: [
            {
              id: "scene-01",
              createdAt: timestamp,
              updatedAt: timestamp,
              title: "Scene 01 · Opening Signal",
              summary:
                "Mara studies a fractured transmission while the observatory wakes around her, setting up the novel's tone and central mystery.",
              excerpt: [
                "Mara listened to the station breathe around her: a soft procession of vents, relays, and thermal shutters teasing daylight across the glass.",
                "On the main lens, the gas giant below reflected a pale corona back into the room, and for a moment the fractured signal on her screen looked less like noise and more like handwriting.",
                "She tagged the anomaly for the timeline, marked the scene against the observatory ring, and opened a note for the name she still could not say aloud.",
              ],
              editorDocument: sampleDocument,
              characterIds: ["character-mara-vale"],
              locationIds: ["location-helion-observatory"],
              technologyEntryIds: ["technology-aurora-array"],
              timelineEventIds: ["timeline-first-signal"],
              plotThreadIds: ["thread-signal-mystery"],
              glossaryEntryIds: ["glossary-aurora-array"],
            },
          ],
        },
      ],
    },
  ],
  documents: [
    {
      id: "document-manuscript-outline",
      createdAt: timestamp,
      updatedAt: timestamp,
      title: "Manuscript Outline",
      kind: "note",
      content: sampleDocument,
    },
  ],
  characters: [
    {
      id: "character-mara-vale",
      createdAt: timestamp,
      updatedAt: timestamp,
      name: "Mara Vale",
      role: "Lead astronomer",
      arc: "Moves from isolated pattern-seeker to someone willing to trust others with the truth she uncovers.",
      relationshipIds: [],
    },
  ],
  relationships: [],
  technologyEntries: [
    {
      id: "technology-aurora-array",
      createdAt: timestamp,
      updatedAt: timestamp,
      name: "Aurora Array",
      summary: "A signal lattice capable of translating magnetosphere turbulence into decipherable harmonic patterns.",
      ruleNotes: ["Requires planetary storms", "Degrades under sustained overload"],
    },
  ],
  locations: [
    {
      id: "location-helion-observatory",
      createdAt: timestamp,
      updatedAt: timestamp,
      name: "Helion Observatory",
      summary: "An orbital research ring where silence, light, and instrumentation define the rhythm of daily life.",
      regionName: "Upper Ring",
    },
  ],
  regions: [
    {
      id: "region-upper-ring",
      createdAt: timestamp,
      updatedAt: timestamp,
      name: "Upper Ring",
      summary: "The colder, high-visibility spine of the observatory.",
    },
  ],
  planets: [
    {
      id: "planet-sera",
      createdAt: timestamp,
      updatedAt: timestamp,
      name: "Sera",
      summary: "A storm-heavy gas giant whose upper atmosphere carries the signal anomalies central to the story.",
    },
  ],
  timelineEvents: [
    {
      id: "timeline-first-signal",
      createdAt: timestamp,
      updatedAt: timestamp,
      title: "First signal fracture detected",
      summary: "The opening anomaly that triggers Mara's investigation.",
      sequence: 1,
    },
  ],
  corkboardCards: [
    {
      id: "card-opening-signal",
      createdAt: timestamp,
      updatedAt: timestamp,
      title: "Opening Signal",
      summary: "Introduce Mara, the observatory, and the mystery encoded in the storm noise.",
      linkedSceneId: "scene-01",
    },
  ],
  plotThreads: [
    {
      id: "thread-signal-mystery",
      createdAt: timestamp,
      updatedAt: timestamp,
      name: "Signal mystery",
      summary: "Track the meaning and origin of the fractured transmission.",
    },
  ],
  acts: [
    {
      id: "act-discovery",
      createdAt: timestamp,
      updatedAt: timestamp,
      name: "Act I · Discovery",
      summary: "Establish Mara's isolated routine and the signal that breaks it.",
      order: 1,
    },
  ],
  beats: [
    {
      id: "beat-first-fracture",
      createdAt: timestamp,
      updatedAt: timestamp,
      title: "Signal fracture",
      summary: "The mystery enters the story and forces Mara to respond.",
      order: 1,
      actId: "act-discovery",
      sceneId: "scene-01",
    },
  ],
  subplots: [
    {
      id: "subplot-trust",
      createdAt: timestamp,
      updatedAt: timestamp,
      name: "Trust and disclosure",
      summary: "Mara's reluctance to share what she sees becomes a source of tension.",
    },
  ],
  povMarkers: [
    {
      id: "pov-mara-opening",
      createdAt: timestamp,
      updatedAt: timestamp,
      label: "Mara POV",
      summary: "Opening chapter viewpoint anchor.",
      characterId: "character-mara-vale",
      sceneId: "scene-01",
    },
  ],
  glossaryEntries: [
    {
      id: "glossary-aurora-array",
      createdAt: timestamp,
      updatedAt: timestamp,
      term: "Aurora Array",
      definition: "Instrumentation lattice used to read storm harmonics.",
    },
  ],
  loreNotes: [
    {
      id: "lore-observatory-charter",
      createdAt: timestamp,
      updatedAt: timestamp,
      title: "Observatory Charter",
      summary: "The ring was commissioned to study magnetosphere behavior without direct colonial intervention.",
    },
  ],
  researchNotes: [
    {
      id: "research-gas-giant-reference",
      createdAt: timestamp,
      updatedAt: timestamp,
      title: "Gas giant storm reference",
      summary: "Notes on cloud banding and electrical storm behavior for atmospheric scenes.",
      source: "internal planning note",
    },
  ],
  revisionSnapshots: [
    {
      id: "snapshot-opening-pass",
      createdAt: timestamp,
      updatedAt: timestamp,
      label: "Opening pass",
      summary: "First pass of the opening chapter scaffold.",
    },
  ],
};
