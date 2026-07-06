# Workstream Ownership Map

Maps every file in this repo to one of the 3 workstreams defined in
`docs/planning/project-manifest.json`, so each of the 3 interns has a clear,
non-overlapping set of files to own. This limits git conflicts — two people
should rarely need to edit the same file at the same time.

Owner names are TBD in the manifest — fill in as assigned.

## WS1 — Data Ingestion & Validation Pipeline
*Parse the Excel export into clean structured data + human validation UI.*
Owner: TBD

- `dev/js/10-intake-upload.js` — file/transcript intake
- `dev/js/12-detection.js` — column/header detection on parsed data
- `dev/js/13-self-directed.js` — self-directed account detection logic
- `docs/planning/workstream-1-data-pipeline.json` — WS1 task list
- `docs/planning/shared-data-schema.json` — validated_portfolio.json contract (shared — coordinate changes with WS2/WS3)

## WS2 — Deck Generation & Brand Compliance
*Intro deck, templated slides, PPTX export, brand compliance.*
Owner: TBD

- `dev/js/03-slide-lib.js` — slide template library
- `dev/js/04-stage2-blueprint.js` — blueprint/slide selection UI
- `dev/js/06-stage4-deck.js` — deck assembly stage
- `dev/js/07-slide-content.js` — slide content generation
- `dev/js/08-custom-components.js` — custom slide component builder
- `dev/js/09-export.js` — PPTX export
- `dev/js/15-custom-charts.js` — chart rendering for slides
- `docs/planning/AI_Prospect_Initiative_Deck_July2026.pptx` — reference deck

**Missing:** `workstream-2-deck-generation.json` was not in the zip — the file with that
name actually contained the project manifest instead. Get the real WS2 task list
from whoever wrote the plan (see `docs/planning/README.md`).

## WS3 — Narrative Builder & Compliance Review
*PM story/angle selection, drafted narratives, SEC Marketing Rule flagging.*
Owner: TBD

- `dev/js/05-analysis.js` — AI portfolio analysis / narrative context
- `dev/js/11-topics-tiles.js` — story/topic selection tiles
- `docs/planning/workstream-3-narrative-compliance.json` — WS3 task list

## Shared / Infrastructure — not owned by one workstream
*Touching these affects everyone — flag changes in your team channel.*

- `dev/index.html` — main app shell
- `dev/css/styles.css` — global styles
- `dev/js/00-config.js` — feature flags (baseline vs nice-to-have)
- `dev/js/01-ai.js` — AI/API key management helpers
- `dev/js/02-panels-state.js` — resizable panel UI framework
- `dev/js/14-init.js` — app init / demo prefill
- `dev/js/99-baseline-gate.js` — applies feature flags from 00-config.js, loads last
- `docs/PRD.md` — product requirements, baseline decisions
- `docs/planning/project-manifest.json` — project overview, milestones
- `docs/planning/moscow-requirements.json` — MoSCoW requirement list (shared)
- `docs/planning/README.md` — planning docs index
- `docs/planning/Prototype_Decision_OnePager.pdf`
- `docs/feedback/` — meeting notes, feedback
- `docs/prototype/` — frozen demo snapshots (reference only, don't edit)
- `docs/Project_Context_FillIn.docx`

## Suggested repo folder convention going forward

When each workstream starts producing new files (parsers, generators, etc.),
put them under a matching subfolder so ownership stays obvious at a glance:

```
dev/
  js/
    ws1-data-pipeline/
    ws2-deck-generation/
    ws3-narrative-compliance/
    shared/
```

This is optional for the existing files above (moving them now would break
the working prototype), but worth adopting for anything new.
