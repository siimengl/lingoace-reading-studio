# AI Chinese Reading Production Studio

Portfolio prototype for an AI-assisted Chinese reading curriculum production workflow.

## What It Demonstrates

- Editable learner profile, instructional brief, and content guardrails
- Reactive deterministic QA for vocabulary/character coverage, length, schema validity, and required sections
- AI-assisted pre-review with explicit expert-judgment boundaries
- Human expert review and version lifecycle
- Illustrative pilot feedback and revision history
- Model evaluation framework comparing candidate-output tradeoffs

## Workflow

Brief & Guardrails → Draft & Quality Gate → Expert Review → Pilot & Version

## Key Product Decisions

- Deterministic checks remain separate from AI-assisted pedagogical evaluation
- Human curriculum review retains final approval
- QA reacts to course-package edits
- Benchmark candidates demonstrate coverage, language-difficulty, and structural-reliability tradeoffs
- Live AI generation is an experimental path; the complete illustrative workflow remains available independently

## Data & Provenance

Uses illustrative curriculum content only. No proprietary LingoAce curriculum or real student data is used.

## Tech

Next.js · React · TypeScript · Deterministic QA · Server-side AI API integration architecture
