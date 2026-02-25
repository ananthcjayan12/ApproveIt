# ApproveIt — Delivery Tickets (MVP → Marketplace)

Scope source: `approveit_prd.md` + `Monday_documentation/documentation.md`

## Ticket format
- **ID**: unique ticket id
- **Outcome**: what is delivered
- **Tasks**: smallest implementation steps
- **Acceptance criteria**: done definition
- **Estimate**: focused build time
- **Depends on**: prerequisite ticket IDs

---

## Epic 0 — Foundation & Environment

### AP-001 — Create Cloudflare Workers backend scaffold
- **Outcome**: runnable backend app with route mounting and health endpoint
- **Tasks**:
  - Initialize worker app structure (`src/index.ts`, `src/routes`, `src/services`, `src/types.ts`)
  - Add `GET /health` endpoint
  - Register route namespaces for approvals, boards, usage
- **Acceptance criteria**:
  - Local dev server starts without errors
  - `GET /health` returns `200` with `{ ok: true }`
- **Estimate**: 1h
- **Depends on**: none

### AP-002 — Configure Wrangler bindings and secrets
- **Outcome**: deploy-ready `wrangler.toml` for D1 + KV + vars
- **Tasks**:
  - Add D1 binding `DB`
  - Add KV binding `USAGE`
  - Add required `vars` placeholders
  - Document required `wrangler secret put` keys
- **Acceptance criteria**:
  - `wrangler deploy` validates config
  - Missing secret errors are explicit and actionable
- **Estimate**: 45m
- **Depends on**: AP-001

### AP-003 — Create D1 schema and migration baseline
- **Outcome**: `schema.sql` with approvals, audit log, board configs, indexes
- **Tasks**:
  - Implement tables from PRD schema
  - Add indexes for item, board, approver and audit queries
  - Add migration README snippet for local/prod apply
- **Acceptance criteria**:
  - Schema applies cleanly to empty D1 DB
  - All indexes exist after migration
- **Estimate**: 1h
- **Depends on**: AP-002

### AP-004 — Establish typed domain models and validation helpers
- **Outcome**: shared request/response and DB types with input validation
- **Tasks**:
  - Add TypeScript interfaces for approval states and payloads
  - Add validator for required IDs, names, and note length
  - Add status enum guard (`pending|approved|rejected|changes_requested`)
- **Acceptance criteria**:
  - Invalid payload returns `400` with clear error messages
  - Route handlers compile with strict typing
- **Estimate**: 1.5h
- **Depends on**: AP-001, AP-003

---

## Epic 1 — Core Approval API (P0)

### AP-005 — Implement `POST /api/approvals`
- **Outcome**: create approval request and persist pending record
- **Tasks**:
  - Parse payload: item/board/account/requester/approver/note/statusColumnId
  - Insert approval row with `requested_at`
  - Insert `requested` audit event
- **Acceptance criteria**:
  - Returns `201` with approval `id` and `status: pending`
  - DB row is created in `approvals` and `audit_log`
- **Estimate**: 2h
- **Depends on**: AP-004

### AP-006 — Implement approve/reject/changes PATCH endpoints
- **Outcome**: status transition endpoints for approver actions
- **Tasks**:
  - Add `PATCH /api/approvals/:id/approve`
  - Add `PATCH /api/approvals/:id/reject`
  - Add `PATCH /api/approvals/:id/changes`
  - Set `resolved_at` for non-pending states
  - Add matching audit events
- **Acceptance criteria**:
  - Each endpoint updates status correctly
  - Unknown `id` returns `404`
  - Closed approvals cannot transition again (`409`)
- **Estimate**: 3h
- **Depends on**: AP-005

### AP-007 — Implement list/query endpoints
- **Outcome**: board and approver filtered listing
- **Tasks**:
  - Implement `GET /api/approvals?boardId=X`
  - Implement `GET /api/approvals?approverId=X&status=pending`
  - Add pagination (`limit`, `cursor` or offset)
- **Acceptance criteria**:
  - Filters return only matching rows
  - Default sort is newest first
  - Pagination prevents unbounded reads
- **Estimate**: 2h
- **Depends on**: AP-005

### AP-008 — Implement audit endpoint
- **Outcome**: immutable timeline for a given approval
- **Tasks**:
  - Add `GET /api/approvals/:id/audit`
  - Return chronological events with actor/note/timestamp
- **Acceptance criteria**:
  - Events match inserted history exactly
  - Missing approval returns `404`
- **Estimate**: 1h
- **Depends on**: AP-005

---

## Epic 2 — monday API Service Layer (P0)

### AP-009 — Build monday GraphQL client wrapper
- **Outcome**: centralized typed fetch helper with retry support
- **Tasks**:
  - Add helper for auth headers + API version
  - Parse GraphQL `errors` consistently
  - Add retry for transient failures with bounded backoff
- **Acceptance criteria**:
  - All monday calls use single service wrapper
  - Failed calls surface sanitized errors (no secret/token logs)
- **Estimate**: 2h
- **Depends on**: AP-001

### AP-010 — Implement `updateMondayStatus()` helper
- **Outcome**: reliable status column sync mutation
- **Tasks**:
  - Implement `change_simple_column_value` mutation
  - Escape user-provided values safely in GraphQL variables
  - Return mutation result for observability
- **Acceptance criteria**:
  - Pending/Approved/Rejected/Changes labels map correctly
  - Status is updated immediately on action calls
- **Estimate**: 1.5h
- **Depends on**: AP-009

### AP-011 — Implement `sendMondayNotification()` helper
- **Outcome**: requester/approver notifications through monday
- **Tasks**:
  - Implement `create_notification` mutation
  - Standardize message templates per action
- **Acceptance criteria**:
  - Notification sent on request creation
  - Notification sent to requester on approve/reject/changes
- **Estimate**: 1.5h
- **Depends on**: AP-009

### AP-012 — Wire API actions to monday side effects atomically
- **Outcome**: API endpoints trigger status sync + notifications consistently
- **Tasks**:
  - Connect AP-005/AP-006 handlers to AP-010/AP-011
  - Define failure policy (DB succeeded, monday failed => retry queue/log)
  - Add structured logs for failures
- **Acceptance criteria**:
  - Successful action updates DB and monday status
  - Side-effect failures are visible and retriable
- **Estimate**: 2h
- **Depends on**: AP-006, AP-010, AP-011

---

## Epic 3 — Frontend Item View (P0)

### AP-013 — Bootstrap React frontend for monday views
- **Outcome**: frontend app with shared API client and env config
- **Tasks**:
  - Create frontend app scaffold and routing for item/board views
  - Add API client wrapper with typed methods
  - Add base monday SDK initialization
- **Acceptance criteria**:
  - Frontend builds and runs locally
  - Item and board entry points render
- **Estimate**: 2h
- **Depends on**: AP-001

### AP-014 — Build `ApprovalPanel` (Item View)
- **Outcome**: panel showing current approval state + metadata
- **Tasks**:
  - Render status, requester, approver, request timestamp
  - Render note input and action footer area
  - Show loading/empty/error states
- **Acceptance criteria**:
  - Panel renders for item context from monday SDK
  - Missing approval shows clear CTA to request approval
- **Estimate**: 2h
- **Depends on**: AP-013, AP-007

### AP-015 — Build `RequestModal` for selecting approver and note
- **Outcome**: request approval UX under 30 seconds
- **Tasks**:
  - Add approver dropdown source (board subscribers/person mapping)
  - Add optional requester note field
  - Submit to `POST /api/approvals`
- **Acceptance criteria**:
  - Successful submit closes modal and refreshes panel
  - Form validation blocks empty approver
- **Estimate**: 2.5h
- **Depends on**: AP-014, AP-005

### AP-016 — Build `ApprovalActions` (Approve/Reject/Changes)
- **Outcome**: one-click approver actions with optional note
- **Tasks**:
  - Add 3 action buttons + confirmation state
  - Call relevant PATCH endpoint
  - Disable actions while request in-flight
- **Acceptance criteria**:
  - Action updates visible status and history
  - Duplicate clicks do not create duplicate transitions
- **Estimate**: 2h
- **Depends on**: AP-014, AP-006

### AP-017 — Build `AuditTrail` component
- **Outcome**: immutable approval history timeline in item view
- **Tasks**:
  - Fetch `/api/approvals/:id/audit`
  - Render event icon, actor, timestamp, note
- **Acceptance criteria**:
  - Timeline reflects all actions in order
  - Empty state shown when no events exist
- **Estimate**: 1.5h
- **Depends on**: AP-008, AP-014

---

## Epic 4 — Frontend Board View Dashboard (P1)

### AP-018 — Build board dashboard layout + sections
- **Outcome**: Pending / Recently Approved / Recently Rejected sections
- **Tasks**:
  - Fetch board approvals list
  - Group records by status and recency
  - Display key metadata per row
- **Acceptance criteria**:
  - Board view matches PRD structure
  - State sections update after item actions
- **Estimate**: 3h
- **Depends on**: AP-013, AP-007

### AP-019 — Add “My Approvals” filter and overdue indicator
- **Outcome**: approver-centric queue with urgency hints
- **Tasks**:
  - Toggle all approvals vs current approver
  - Mark `>24h` pending as overdue
- **Acceptance criteria**:
  - “My Approvals” count matches backend result
  - Overdue indicator appears only for stale pending approvals
- **Estimate**: 1.5h
- **Depends on**: AP-018

---

## Epic 5 — Integration Recipe + Config (P1)

### AP-020 — Implement board config endpoints
- **Outcome**: get/update board-level config
- **Tasks**:
  - Add `GET /api/boards/:boardId/config`
  - Add `PUT /api/boards/:boardId/config`
  - Persist status column ID, default approver column, reminder hours
- **Acceptance criteria**:
  - Board config upserts successfully
  - Validation rejects invalid column IDs
- **Estimate**: 2h
- **Depends on**: AP-003

### AP-021 — Add board config UI
- **Outcome**: UI to choose status column and default approver column
- **Tasks**:
  - Build settings form in board view
  - Save via AP-020 endpoint
- **Acceptance criteria**:
  - Save updates are visible after refresh
  - Invalid inputs show inline errors
- **Estimate**: 2h
- **Depends on**: AP-020, AP-018

### AP-022 — Build custom action handler for integration recipe
- **Outcome**: “When status changes to X, request approval from Y” flow
- **Tasks**:
  - Implement action endpoint payload parsing
  - Resolve approver from person column/default config
  - Reuse AP-005 logic
- **Acceptance criteria**:
  - Triggered recipe creates pending approval
  - Missing approver yields actionable error
- **Estimate**: 3h
- **Depends on**: AP-005, AP-020

---

## Epic 6 — Usage Limits, Reliability, Security (P1/P2)

### AP-023 — Implement monthly usage tracking in KV
- **Outcome**: account usage counter per month
- **Tasks**:
  - Increment usage on resolved approvals
  - Add `GET /api/usage/:accountId`
  - Include plan limit in response
- **Acceptance criteria**:
  - Counter key format `usage:{accountId}:{YYYY-MM}` is used consistently
  - Usage endpoint returns current count and threshold
- **Estimate**: 1.5h
- **Depends on**: AP-006

### AP-024 — Enforce free-tier limits
- **Outcome**: block over-limit actions with clear upgrade messaging
- **Tasks**:
  - Add middleware check for create/resolve actions
  - Return `402/403` style business error payload
- **Acceptance criteria**:
  - Over-limit create returns blocked response
  - UI displays limit reached message without crashing
- **Estimate**: 1.5h
- **Depends on**: AP-023

### AP-025 — Add request authentication and signature verification
- **Outcome**: secure server endpoints for monday-originating calls
- **Tasks**:
  - Verify JWT/signature where required by app feature type
  - Validate tenant context (`accountId`, `boardId`) before mutation
- **Acceptance criteria**:
  - Invalid signature/token requests are rejected (`401`)
  - Cross-account writes are prevented
- **Estimate**: 2h
- **Depends on**: AP-001

### AP-026 — Add API hardening and observability
- **Outcome**: production-grade resilience controls
- **Tasks**:
  - Add rate-limiting guard
  - Add input sanitization and max field lengths
  - Add structured error logs + correlation IDs
- **Acceptance criteria**:
  - No raw stack traces leaked to clients
  - Logs allow tracing request-to-side-effect path
- **Estimate**: 2h
- **Depends on**: AP-004, AP-009

---

## Epic 7 — Reminders + Email Actions (P2)

### AP-027 — Implement reminder scheduler logic
- **Outcome**: notify approvers for stale pending approvals (24h/48h)
- **Tasks**:
  - Build scheduled worker query for stale approvals
  - Send reminder notification and log `reminded` action
- **Acceptance criteria**:
  - Pending approvals older than threshold receive one reminder per window
  - Reminder events appear in audit log
- **Estimate**: 2h
- **Depends on**: AP-011, AP-008

### AP-028 — Build email approve/reject endpoints
- **Outcome**: secure one-click approval from inbox
- **Tasks**:
  - Generate signed short-lived action links
  - Add endpoints for approve/reject/changes via link token
  - Reuse AP-006 transition logic
- **Acceptance criteria**:
  - Valid link resolves action without monday login
  - Expired/tampered link is rejected safely
- **Estimate**: 3h
- **Depends on**: AP-006, AP-025

---

## Epic 8 — QA, Marketplace Readiness, Submission

### AP-029 — Build test suite for core workflow
- **Outcome**: automated tests for request/approve/reject/changes flow
- **Tasks**:
  - Add unit tests for validation and state transitions
  - Add integration tests for API endpoints + D1 operations
- **Acceptance criteria**:
  - Core workflow tests pass in CI
  - Regression tests cover status sync and audit writes
- **Estimate**: 3h
- **Depends on**: AP-012

### AP-030 — Marketplace asset pack and listing copy finalization
- **Outcome**: submission-ready app listing artifacts
- **Tasks**:
  - Prepare icon and minimum 3 gallery images
  - Finalize short/long description from PRD
  - Verify support email, privacy policy URL, terms URL
- **Acceptance criteria**:
  - All required listing fields completed
  - Assets meet size/format requirements
- **Estimate**: 3h
- **Depends on**: AP-018

### AP-031 — App review checklist pass
- **Outcome**: pre-submission verification pass for review team
- **Tasks**:
  - Verify item view + board view + integration recipe behavior
  - Confirm monday design system alignment and responsive behavior
  - Confirm error handling and retry logic for integrations
- **Acceptance criteria**:
  - Checklist signed off with no P0/P1 defects
  - Ready to submit in Developer Center
- **Estimate**: 2h
- **Depends on**: AP-029, AP-030

### AP-032 — Submit to monday marketplace
- **Outcome**: app submitted for review with complete metadata
- **Tasks**:
  - Submit app and monitor review feedback
  - Create feedback response SLA process
- **Acceptance criteria**:
  - Submission acknowledged
  - Feedback tracker created
- **Estimate**: 45m
- **Depends on**: AP-031

---

## Suggested Sprint Slice (fastest path)
- **Sprint 1 (2 days):** AP-001 → AP-012 (core backend + monday side effects)
- **Sprint 2 (2 days):** AP-013 → AP-019 (item + board UX)
- **Sprint 3 (1–2 days):** AP-020 → AP-026 (integration recipe, config, security, limits)
- **Sprint 4 (post-MVP):** AP-027 → AP-032 (reminders, email approvals, submission)

---

## Ticket Status (Current)

| Ticket | Status | Notes |
| --- | --- | --- |
| AP-001 | Done | Backend scaffold, health endpoint, and route namespaces added |
| AP-002 | Done | Wrangler bindings/vars and secrets setup documented |
| AP-003 | Done | Added `schema.sql` baseline and D1 local/remote apply instructions |
| AP-004 | Done | Added shared types, validator service, and `POST /api/approvals` 400 validation handling |
| AP-005 | Done | Implemented create endpoint with D1 insert, requested audit event, and duplicate pending guard |
| AP-006 | Done | Added approve/reject/changes PATCH endpoints with pending-only transitions and audit events |
| AP-007 | Done | Added filtered/paginated list endpoint with account isolation and newest-first ordering |
| AP-008 | Done | Added approval audit timeline endpoint with account-scoped 404 behavior |
| AP-009 | Done | Added centralized monday GraphQL wrapper with standardized headers, error mapping, and bounded retry |
| AP-010 | Done | Added `updateMondayStatus()` helper with required approval-to-status label mapping |
| AP-011 | Done | Added `sendMondayNotification()` helper with action-based templates |
| AP-012 | Done | Wired create/transition routes to monday status + notifications with retriable failure queue/logging |
| AP-013 | Done | Added React+Vite frontend scaffold, monday SDK init, typed API client, and item/board routes |
| AP-014 | Done | Added `ApprovalPanel` with loading/empty/error states and approval metadata rendering |
| AP-015 | Done | Added `RequestModal` with approver/details form validation and create request submission |
| AP-016 | Done | Added `ApprovalActions` with Approve/Reject/Request Changes and in-flight disabling |
| AP-017 | Done | Added `AuditTrail` component and Item View timeline fetch/render wiring |
| AP-018 | Done | Added Board View dashboard sections for Pending/Recently Approved/Recently Rejected |
| AP-019 | Done | Added My Approvals filter toggle with pending overdue indicator (`>24h`) |
| AP-020 | Done | Added board config `GET/PUT` endpoints with D1 upsert and column/reminder validation |
| AP-021 | Done | Added board settings form in Board View with load/save and inline validation messaging |
| AP-022 | Done | Added integration custom action endpoint to create approvals with config fallback and actionable errors |
| AP-023 | Done | Added monthly KV usage tracking helpers and `GET /api/usage/:accountId` response with threshold |
| AP-024 | Done | Added free-tier limit checks for create/resolve/integration actions with clear block payloads |
| AP-025 | Done | Added monday signature verification for integration-originating action calls and `401` rejection handling |
| AP-026 | Done | Added request IDs, KV-backed API rate limiting, and sanitized structured error logging/response handling |
| AP-027 | Done | Added scheduled reminder sweep (`24h/48h`) with monday notifications and immutable audit events |
| AP-028 | Done | Added signed short-lived email action token flow with approve/reject/changes endpoints |
| AP-029 | Done | Added Vitest suite for validation, status mapping, and signed token verification |
| AP-030 | Done | Finalized listing copy + asset specification + draft icon artifact in docs |
| AP-031 | Done | Finalized review checklist and submission runbook for pre-review verification |
| AP-032 | In Progress | Submission tracker and handoff prepared; final Developer Center submit is manual/external |

---

## Test Cases by Ticket

### AP-001
- `TC-AP-001-01`: `GET /health` returns `200` + `{ ok: true }`.
- `TC-AP-001-02`: Route namespaces load without runtime import errors.

### AP-002
- `TC-AP-002-01`: `wrangler deploy` succeeds with configured bindings.
- `TC-AP-002-02`: Missing secret produces readable startup/deploy error.

### AP-003
- `TC-AP-003-01`: D1 migration creates `approvals`, `audit_log`, `board_configs`.
- `TC-AP-003-02`: Required indexes exist for board/item/approver queries.

### AP-004
- `TC-AP-004-01`: Invalid IDs/types return `400` with machine-readable code.
- `TC-AP-004-02`: Overlong notes are rejected by validator.

### AP-005
- `TC-AP-005-01`: Valid request creates approval row with `pending` status.
- `TC-AP-005-02`: Audit row is written with `requested` action.

### AP-006
- `TC-AP-006-01`: Approve/reject/changes update status and `resolved_at` correctly.
- `TC-AP-006-02`: Second transition on resolved approval returns `409`.

### AP-007
- `TC-AP-007-01`: `boardId` filter returns only board-scoped approvals.
- `TC-AP-007-02`: Pending approver query returns only approver + pending rows.

### AP-008
- `TC-AP-008-01`: Audit endpoint returns events ordered by timestamp.
- `TC-AP-008-02`: Unknown approval ID returns `404`.

### AP-009
- `TC-AP-009-01`: GraphQL errors are mapped to consistent API error shape.
- `TC-AP-009-02`: Retry runs only for transient failures and stops at max attempts.

### AP-010
- `TC-AP-010-01`: Status helper updates monday status column successfully.
- `TC-AP-010-02`: Variables-based mutation handles quotes/special chars safely.

### AP-011
- `TC-AP-011-01`: Notification helper sends message to expected user.
- `TC-AP-011-02`: Failure path returns mapped error without leaking secrets.

### AP-012
- `TC-AP-012-01`: Approval action writes DB + updates monday status.
- `TC-AP-012-02`: monday side-effect failure is logged and marked retriable.

### AP-013
- `TC-AP-013-01`: Item and board view entry routes render.
- `TC-AP-013-02`: Shared API client handles auth/context headers correctly.

### AP-014
- `TC-AP-014-01`: Panel shows status/requester/approver metadata.
- `TC-AP-014-02`: Loading/empty/error states render correctly.

### AP-015
- `TC-AP-015-01`: Submitting valid request creates approval and refreshes panel.
- `TC-AP-015-02`: Missing approver fails client validation.

### AP-016
- `TC-AP-016-01`: Each action button triggers matching endpoint and UI refresh.
- `TC-AP-016-02`: Double-click does not produce duplicate transition.

### AP-017
- `TC-AP-017-01`: Timeline displays actor/action/note/time from audit API.
- `TC-AP-017-02`: Empty history displays explicit empty-state message.

### AP-018
- `TC-AP-018-01`: Dashboard groups by pending/approved/rejected correctly.
- `TC-AP-018-02`: Data refresh reflects item-view actions.

### AP-019
- `TC-AP-019-01`: My Approvals filter matches approver-specific API count.
- `TC-AP-019-02`: Overdue marker appears only when pending age > 24h.

### AP-020
- `TC-AP-020-01`: Board config upsert persists and re-fetches correctly.
- `TC-AP-020-02`: Invalid config payload returns validation error.

### AP-021
- `TC-AP-021-01`: UI saves status/person column config successfully.
- `TC-AP-021-02`: Invalid selections display inline errors.

### AP-022
- `TC-AP-022-01`: Triggered integration action creates pending approval.
- `TC-AP-022-02`: Missing approver path returns actionable error text.

### AP-023
- `TC-AP-023-01`: Usage key increments on resolved approvals.
- `TC-AP-023-02`: Usage endpoint returns current month count and plan limit.

### AP-024
- `TC-AP-024-01`: Over-limit create action is blocked with business error.
- `TC-AP-024-02`: UI shows non-crashing upgrade/limit message.

### AP-025
- `TC-AP-025-01`: Invalid JWT/signature requests return `401`.
- `TC-AP-025-02`: Cross-account mutation attempts are rejected.

### AP-026
- `TC-AP-026-01`: Rate limiter blocks burst requests after threshold.
- `TC-AP-026-02`: Error logs include correlation ID and omit sensitive values.

### AP-027
- `TC-AP-027-01`: Scheduler sends reminder for stale pending approvals.
- `TC-AP-027-02`: Reminder audit event (`reminded`) is appended once per window.

### AP-028
- `TC-AP-028-01`: Valid signed email link performs expected transition.
- `TC-AP-028-02`: Expired/tampered link is rejected securely.

### AP-029
- `TC-AP-029-01`: Unit tests cover validator and transition guard logic.
- `TC-AP-029-02`: Integration tests cover request→resolve→audit flow.

### AP-030
- `TC-AP-030-01`: Icon/screenshots satisfy size/format requirements.
- `TC-AP-030-02`: Listing fields are complete (support, privacy, terms).

### AP-031
- `TC-AP-031-01`: End-to-end checklist passes on item, board, integration flows.
- `TC-AP-031-02`: Responsive and error-state checks pass in review sheet.

### AP-032
- `TC-AP-032-01`: Submission is accepted by Developer Center.
- `TC-AP-032-02`: Review feedback tracker is created and linked to ticket board.
