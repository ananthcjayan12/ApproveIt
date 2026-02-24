# monday Sandbox Testing Guide — ApproveIt

This guide defines how to validate ApproveIt in a monday developer/sandbox account before marketplace submission.

## 1) Prerequisites

- A monday **developer account** (sandbox) with admin access.
- Access to monday **Developer Center** for app configuration.
- Cloudflare resources ready:
  - Worker/API deployment target
  - D1 database
  - KV namespace
- Environment secrets configured:
  - `MONDAY_API_TOKEN`
  - `MONDAY_SIGNING_SECRET`
  - any additional auth secrets
- Local tools:
  - Node.js LTS
  - npm
  - Wrangler CLI

## 2) Sandbox Environment Setup

### 2.1 Create sandbox board

Create a board named `ApproveIt Sandbox` with:
- Status column (`status`)
- People column (`approver`)
- Text column (`request_note`)

Create 5 sample items:
- Q2 Marketing Budget
- New Hire: Sarah Chen
- Vendor Contract #412
- Product Roadmap v3
- Travel Request #89

### 2.2 Seed sandbox users/roles

Use at least 3 users:
- Requester user
- Approver user
- Observer/admin user

### 2.3 App feature setup in Developer Center

Enable and configure:
- Item View
- Board View
- Integration Recipe (custom action/block)

Point each feature URL to deployed endpoints.

## 3) Deploy to Sandbox

### 3.1 Backend deploy

- Run migration against sandbox D1.
- Deploy API worker.
- Verify health:
  - `GET /health` returns `200`.

### 3.2 Frontend deploy

- Deploy frontend build.
- Confirm item and board views render from monday.

### 3.3 App version discipline

- Test only against a dedicated draft/sandbox app version.
- Keep production/live version unchanged during sandbox QA.

## 4) Test Execution Flow (Recommended)

Run tests in this order:
1. Foundation and API checks
2. Item view actions
3. Board dashboard behavior
4. Integration recipe automation
5. Security and tenancy checks
6. Limits/reliability checks
7. Submission readiness checks

## 5) Ticket-to-Test Mapping

Use this mapping as the execution checklist in sandbox:

- AP-001 to AP-004: environment, migration, validation baseline
- AP-005 to AP-008: create/list/transition/audit API flows
- AP-009 to AP-012: monday GraphQL side-effects + retry/error handling
- AP-013 to AP-017: item view UX, action integrity, timeline rendering
- AP-018 to AP-019: board dashboard + my approvals + overdue
- AP-020 to AP-022: board config + integration recipe flow
- AP-023 to AP-026: usage limits, auth/signature, hardening
- AP-027 to AP-028: reminders + email action security
- AP-029 to AP-032: automated tests + marketplace readiness + submission

## 6) Core Scenario Tests (Manual in monday UI)

### Scenario A — Request approval

1. Open item as requester.
2. Select approver + optional note.
3. Submit request.

Expected:
- Approval record created.
- Status column becomes `Pending Approval`.
- Approver receives monday notification.
- Board view pending count increments.

### Scenario B — Approve

1. Open same item as approver.
2. Click `Approve` with optional note.

Expected:
- Status becomes `Approved`.
- Requester receives notification.
- Audit log includes `approved` event with note and timestamp.
- Board dashboard moves item to Recently Approved.

### Scenario C — Reject / Request Changes

Repeat scenario B with `Reject` and `Request Changes`.

Expected:
- Correct status mapping:
  - `Rejected`
  - `Changes Requested`
- Correct audit entries and notifications.

### Scenario D — Duplicate protection

Double-click action buttons quickly.

Expected:
- Single transition only.
- API responds with guard (`409`) on duplicate transition attempt.

### Scenario E — Integration recipe

Trigger configured automation condition.

Expected:
- New pending approval is created automatically.
- Correct approver resolution from config/person column.

## 7) Security and Multitenancy Tests

- Invalid signature/JWT request must fail with `401`.
- Attempt mutation with mismatched `accountId/boardId` must fail.
- Verify logs do not contain tokens/secrets.
- Confirm account A data is never returned when querying from account B context.

## 8) Reliability and Failure Injection

- Simulate monday API transient error (network/5xx).
- Confirm bounded retries execute.
- Confirm failure is logged with correlation ID.
- Confirm no duplicate DB writes under retry conditions.

## 9) Usage Limit Tests

- Set free tier threshold low in sandbox.
- Execute approvals until limit is reached.
- Confirm over-limit response blocks new actions and UI message is clear.

## 10) Reminder and Email Tests (if enabled)

- Backdate pending requests in sandbox DB (or lower reminder window).
- Run reminder scheduler.
- Confirm one reminder event per window and audit append.

For email actions:
- Open valid signed link: action succeeds.
- Open expired/tampered link: rejected safely.

## 11) Evidence Collection Template

For each ticket/scenario capture:
- Date/time
- Tester name
- Environment/app version
- Inputs
- Actual result
- Expected result
- Pass/Fail
- Screenshot/log link
- Follow-up issue (if fail)

## 12) Exit Criteria for Marketplace Submission

All must be true:
- All AP tickets have status updated and owner assigned.
- No open P0/P1 defects in sandbox.
- API + UI + integration recipe flows pass.
- Security/tenant checks pass.
- Required listing assets and legal links are ready.
- Final regression run completed in sandbox version.

## 13) Suggested Cadence

- Daily smoke run: scenarios A + B + board dashboard check.
- Pre-merge run: ticket-specific tests + impacted regression.
- Pre-release run: full checklist in this guide.
