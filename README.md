# AI Chinese Reading Production Studio

Portfolio prototype for an AI-assisted Chinese reading curriculum production workflow.

## What It Demonstrates

- Editable learner profile, instructional brief, and content guardrails
- Reactive deterministic QA for vocabulary/character coverage, length, schema validity, and required sections
- Rule-based illustrative screening with clear editor-judgment boundaries
- Human expert review and version lifecycle
- Illustrative pilot feedback and revision history
- Model evaluation framework comparing candidate-output tradeoffs

## Workflow

Brief & Guardrails → Draft & Quality Gate → Expert Review → Pilot & Version

## Key Product Decisions

- Deterministic checks are distinct from illustrative screening and human pedagogical review
- Human curriculum review retains final approval
- QA reacts to course-package edits
- Benchmark candidates demonstrate coverage, language-difficulty, and structural-reliability tradeoffs
- Live AI generation is an experimental path; the complete illustrative workflow remains available independently

## Data & Provenance

Uses fictional curriculum material. No company records or real student data are included.

## Tech

Next.js · React · TypeScript · Deterministic QA · Server-side AI API integration architecture
