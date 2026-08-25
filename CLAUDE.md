# AI Chinese Reading Production Studio

Portfolio-grade internal tool for curriculum specialists producing Chinese reading materials for overseas Chinese-heritage learners.

## Product Scope — Phase 1

### Fixed Logic
Human experts define instructional intent and constraints → AI-assisted content production → deterministic QA → AI pre-review → expert decision → pilot feedback → revised version.

This is an internal authoring/QA product, NOT a chatbot, AI tutor, LMS, or multi-agent showcase.

### Information Architecture
Single app with exactly 3 primary views:
1. **Brief & Guardrails** — Learner profile, instructional brief, content constraints
2. **Draft & Quality Gate** — Course package tabs, deterministic QA, AI pre-review, expert review
3. **Pilot & Version** — Version history, simulated teacher feedback, version diffs

**Model Benchmark** is a secondary drawer/panel only.

### Key Principles
- All illustrative portfolio data only
- Deterministic QA computed with TypeScript functions, not hard-coded
- AI pre-review clearly labeled as requiring expert approval
- Simulated teacher feedback always labeled as simulated
- No fake benchmarks or metrics
- Desktop-first mature B2B EdTech UI

### Implementation
- Next.js 16.3.2 App Router
- TypeScript
- Tailwind CSS 4
- React state (no external dependencies)
- Local data only

### Seeded Issues
- Term "迫不及待" flagged as exceeding reading level
- Shows detection and resolution through version lifecycle

### Technical Notes
- Reading level must be set before generation is enabled
- Version interactions are functional, not decorative
- QA results computed deterministically from brief/draft state
- Phase 1 state may reset on refresh (no persistence needed)

## Product Scope — Phase 3

### Live Claude API Course Generation

**Generate Course Package** now calls a live Claude API instead of resetting to seeded data.

#### API Architecture
- Server route: `src/app/api/generate/route.ts`
- Endpoint: User's Anthropic-compatible gateway (`ANTHROPIC_BASE_URL`)
- Model: `claude-sonnet-5`
- Uses structured output with `output_config.format.type: "json_schema"`
- Uses `output_config.effort: "medium"`
- Native `fetch` (no SDK dependencies)
- Base URL: `process.env.ANTHROPIC_BASE_URL`
- Auth token: `process.env.ANTHROPIC_AUTH_TOKEN`

#### Security Boundaries
- Base URL and auth token never exposed client-side
- Server-side only access to credentials
- `.env.local` is gitignored
- No credential logging or inspection
- Handles rate limits and API errors gracefully

#### Generation Flow
1. User completes Brief & Guardrails with reading level set
2. Clicks "Generate Course Package"
3. Client shows loading state: "Generating course package…"
4. POST to `/api/generate` with current profile/brief/constraints
5. Server constructs system prompt enforcing pedagogical requirements
6. Server calls Claude API with structured JSON schema
7. On success:
   - Replace CoursePackage with live generation
   - Show provenance label: "Live generation · Claude Sonnet 5"
   - Reset to Reading Passage tab
   - Clear reviewer state
   - Navigate to Draft & Quality Gate
   - Deterministic QA recomputes automatically
8. On failure:
   - Show error with Retry button
   - Do NOT overwrite existing CoursePackage
   - Do NOT silently fall back to seeded data

#### Prompt Engineering
System prompt enforces:
- Chinese reading content for overseas Chinese-heritage learners
- Respect oral vs literacy proficiency distinction
- Follow user-provided instructional intent and constraints
- Include target vocabulary/characters naturally
- Age-appropriate and culturally natural content
- No proprietary curriculum claims
- Human expert retains pedagogical approval

#### JSON Schema
Derived from existing `CoursePackage` type:
- `readingPassage`: string
- `vocabulary`: array of {word, pinyin, definition}
- `comprehensionQuestions`: array of {id, question, options?, answer}
- `practiceActivity`: string
- `teacherNotes`: string

All required fields enforced; no additional properties allowed.

#### Error Handling
- Missing base URL or auth token → 500 error
- Rate limit (429) → specific error message
- API failure → generic error with retry
- Malformed response → validation error
- Prevents duplicate generation clicks while loading

#### Preserved Behavior
- Seeded CoursePackage remains in codebase for demo/reference
- Seeded versions and lifecycle examples unchanged
- Deterministic QA logic unchanged
- AI pre-review remains placeholder (not live yet)
- Model Benchmark remains placeholder
- No new dependencies added
- No database/auth/persistence

#### Environment Variable Required
`ANTHROPIC_BASE_URL` and `ANTHROPIC_AUTH_TOKEN` must be set in `.env.local` for live generation to work.
