# Copilot Instructions — ApproveIt (monday.com Marketplace)

These instructions apply to the whole repository.

## 1) Product and scope guardrails
- Build a focused approval app for monday.com: **request, approve, reject, request changes, audit trail, dashboard, integration recipe**.
- Do not expand into generic workflow-builder features for MVP.
- Favor the smallest implementation that satisfies the PRD acceptance criteria.

## 2) monday platform alignment
- App features in scope: **Item View**, **Board View**, **Integration Recipe** (automation block/custom action).
- Ensure all UX is compatible with monday contexts and feature constraints.
- Keep mobile behavior in mind for supported feature types (item view, board view, integrations).

## 3) UI/UX standards (monday best practices)
- Use monday’s Vibe system (`monday-ui-react-core`) and native interaction patterns.
- Keep approval actions simple and explicit: exactly 3 primary actions (`Approve`, `Reject`, `Request Changes`).
- Prioritize clear loading, empty, and error states over visual complexity.
- No custom visual framework or off-brand design language.

## 4) API and integration rules
- Use monday GraphQL API through a centralized service layer.
- Use GraphQL variables instead of string interpolation where possible.
- Standardize headers (`Authorization`, `API-Version`, content type) in one place.
- Implement resilient API handling:
  - retry only transient failures,
  - bounded backoff,
  - structured error mapping,
  - idempotency protections for user actions.

## 5) Security and auth requirements
- Never log secrets or tokens.
- Validate tenant context on every mutating call (`accountId`, `boardId`, `itemId` relationships).
- Verify signatures/JWT for monday-originating backend calls where applicable.
- Sanitize and validate all client input (IDs, enum status, note length).
- Use least-privilege token usage and store secrets via environment/worker secrets only.

## 6) Data and multitenancy constraints
- Use D1 as source of truth for approvals and audit events.
- Audit events are append-only and immutable.
- Enforce account isolation in all queries and updates.
- Add indexes for board, item, and approver access paths.

## 7) Backend conventions
- Organize by domain:
  - `src/routes/*` for HTTP handlers,
  - `src/services/*` for monday/D1/KV integrations,
  - `src/types.ts` for shared contracts.
- Keep handlers thin; business logic goes to services.
- Return consistent JSON error shape with machine-readable code and user-safe message.

## 8) Frontend conventions
- Views:
  - Item View: approval status card, action controls, audit timeline.
  - Board View: pending/recent buckets + “My Approvals”.
- Keep components small and composable (`ApprovalPanel`, `RequestModal`, `ApprovalActions`, `AuditTrail`, `ApprovalDashboard`).
- Centralize API calls in `frontend/src/api/client.ts`.

## 9) Status sync and action integrity
- Status column sync is mandatory and immediate on action events:
  - request -> `Pending Approval`
  - approve -> `Approved`
  - reject -> `Rejected`
  - changes -> `Changes Requested`
- Action handlers must prevent duplicate transitions and race-condition double writes.

## 10) Quality bar before merge
- Validate locally:
  - typecheck,
  - lint,
  - tests for core approval transitions.
- Add or update tests when behavior changes.
- Do not refactor unrelated code while implementing focused tickets.

## 11) Marketplace readiness checklist (ongoing)
- Keep app listing requirements current in docs:
  - app name/description,
  - icon/screenshots,
  - support email,
  - privacy policy URL,
  - terms URL.
- Ensure app behavior and copy clearly differentiate from saturated categories and existing alternatives.

## 12) Copilot behavior expectations for this repo
When generating code, Copilot should:
1. Prefer incremental, reviewable diffs over large rewrites.
2. Preserve existing naming and project structure unless ticket explicitly changes it.
3. Add concise comments only where non-obvious logic exists.
4. Include acceptance criteria mapping in PR descriptions (ticket ID -> implemented behavior).
5. If requirement ambiguity exists, propose the simplest monday-native implementation first.

## 13) Non-goals for MVP
- Full workflow engine/builder.
- Complex multi-step chain editor UI.
- Cross-product AI features.
- Non-monday theming systems.

## 14) Source documents
- PRD: `/approveit_prd.md`
- monday reference bundle: `/Monday_documentation/documentation.md`
