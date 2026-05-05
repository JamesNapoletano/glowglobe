# Implementation Strategy - Orientation
#project-concept

## Purpose
Define the first implementation direction for the application stack, app shell, editor foundation, and persistence model.

## Current Reality
The repository has concept and architecture artifacts but no application code. The next bounded step is implementation planning for the first buildable version.

## Desired Outcome
The project has a coherent v1 implementation direction that is simple to start, aligned with the manuscript-first product shape, and ready to evolve into an online service later.

## Important Actors or Stakeholders
- Primary author as end user
- Future hosted single-user account system
- Future implementation contributors

## Key Artifacts or Interfaces
- Frontend application stack — framework and UI foundation
- App shell — workspace layout and navigation model
- Rich editor foundation — manuscript editing engine
- Persistence layer — local storage abstraction and sync-ready boundaries

## Constraints
- Must support rich formatting well
- Must preserve local-first behavior
- Must stay single-author in v1
- Must avoid architecture choices that block future online sync

## Open Questions
- Whether desktop packaging is a near-term concern or a later concern
- Which export formats should be implemented in the first coding phase

## Link to Detailed Context
[[Implementation Strategy - Detailed Context]]
