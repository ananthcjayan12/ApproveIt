# ApproveIt — Product Requirements Document (PRD)

> **One-Click Approval Workflows for monday.com**
> Version 1.0 | February 2026

---

## Table of Contents

1. [Product Vision & Opportunity](#1-product-vision--opportunity)
2. [Competitive Landscape & Gap Analysis](#2-competitive-landscape--gap-analysis)
3. [MVP Feature Specification](#3-mvp-feature-specification)
4. [User Experience & UI Flows](#4-user-experience--ui-flows)
5. [Technical Architecture (Cloudflare Workers)](#5-technical-architecture)
6. [Monday.com App Submission Requirements](#6-mondaycom-app-submission-requirements)
7. [Pricing Strategy](#7-pricing-strategy)
8. [Development Plan (Day-by-Day)](#8-development-plan-day-by-day)
9. [Risk Register & Mitigations](#9-risk-register--mitigations)
10. [Post-Launch Growth Playbook](#10-post-launch-growth-playbook)
11. [Appendix: API Reference & Code Samples](#appendix)

---

## 1. Product Vision & Opportunity

### The Problem

monday.com has **no native approval mechanism**. Teams hack it by using Status columns ("Pending" → "Approved"), which creates:

- ❌ **No accountability** — who approved what and when?
- ❌ **No notification chain** — approver isn't pinged, things get stuck
- ❌ **No multi-step approvals** — can't do Manager → Director → VP chains
- ❌ **No "request changes" flow** — only approve or reject, no middle ground
- ❌ **No audit trail** — compliance teams hate this
- ❌ **No approval deadlines** — requests rot in limbo

### The Market Signal

| App                                   | Installs   | Rating                | Takeaway                                                                               |
| ------------------------------------- | ---------- | --------------------- | -------------------------------------------------------------------------------------- |
| **Approvals for monday.com** (ApoFox) | **14,100** | **2.6★ (18 reviews)** | Massive demand, terrible execution. Users are screaming for a better alternative.      |
| Workflow (Spot-nik)                   | 17,000     | 4.8★                  | Full workflow builder — approvals are a tiny feature, not the focus. Priced at $25/mo. |
| Approval Workflows (ChangeIt)         | 413        | No reviews            | Too new / too small to matter                                                          |
| Lightning Approve                     | 62         | No reviews            | Just launched, no traction                                                             |
| Power Check                           | 85         | No reviews            | Negligible                                                                             |

**Market size:** 14,100 installs on the dominant (failing) app proves the demand is real.

**The gap:** The 2.6★ rating with 18 reviews means users install it, try it, hate it, and leave a bad review — but **keep using it** because there's no alternative. That's our opportunity.

### Why We Won't Be Rejected

> [!NOTE]
> Unlike the Google Sheets space (67 apps, official Google integration, saturation warning), the approval niche has:
> - Only 4 dedicated apps (3 with < 500 installs)
> - No official monday.com native feature
> - No saturation warning from Monday
> - The dominant player has a **2.6★ rating** — Monday wants someone to fix this

**Positioning:** We are NOT a "workflow builder" or "automation suite." We are a **dedicated, lightweight approval tool** — a different category from Workflow by Spot-nik or Autoboost.

---

## 2. Competitive Landscape & Gap Analysis

### Competitor 1: Approvals for monday.com (ApoFox) — 2.6★

**Why users hate it (analyzed from rating pattern):**
1. ❌ Complex setup — too many configuration steps
2. ❌ Notifications don't work reliably
3. ❌ No mobile-friendly approval (approvers need to log into monday.com)
4. ❌ Approval status gets out of sync with item status
5. ❌ No clear audit trail for compliance

**What we do better:**
- One-click setup (add to board → works immediately)
- Reliable notifications via Monday's native system
- Email-based approval (approve from inbox, no monday login required)
- Rock-solid status sync
- Built-in audit log with timestamps

### Competitor 2: Workflow by Spot-nik — 4.8★

**Why it's not a real competitor:**
- It's a **full workflow builder** (17K installs, $25/mo)
- Approvals are a minor feature buried in a complex tool
- Overkill for teams that just need "approve / reject"
- Different buyer persona (process engineers vs. team managers)

### Our Unique Value Matrix

| Feature                    | ApoFox (2.6★) | Workflow (4.8★)        | **ApproveIt (Ours)**           |
| -------------------------- | ------------- | ---------------------- | ------------------------------ |
| Dedicated approval UX      | ✅ but broken  | ❌ (buried in workflow) | ✅ **Purpose-built**            |
| One-click setup            | ❌ Complex     | ❌ Complex              | ✅ **< 60 seconds**             |
| Multi-step approval chains | ?             | ✅                      | ✅                              |
| Email-based approve/reject | ❌             | ❌                      | ✅ **Approve from inbox**       |
| Audit trail                | ❌             | Partial                | ✅ **Full log with timestamps** |
| Reminders / SLA            | ❌             | ❌                      | ✅ **Auto-reminders**           |
| Approval from mobile       | ❌             | ❌                      | ✅ **Email = mobile-native**    |
| Price                      | Unknown       | $25/mo                 | **$12/mo**                     |

---

## 3. MVP Feature Specification

### MVP Scope (Phase 1 — Ship in 4 Days)

| #   | Feature                                                                 | Priority | Effort |
| --- | ----------------------------------------------------------------------- | -------- | ------ |
| F1  | Item View — Approval Panel                                              | P0       | 6h     |
| F2  | "Request Approval" action button                                        | P0       | 3h     |
| F3  | Approver notification (Monday native)                                   | P0       | 3h     |
| F4  | One-click Approve / Reject / Request Changes                            | P0       | 4h     |
| F5  | Auto-update Status column on approval                                   | P0       | 2h     |
| F6  | Audit trail log (who, when, what)                                       | P0       | 3h     |
| F7  | Board View — Approval Dashboard                                         | P1       | 5h     |
| F8  | Integration Recipe: "When status changes to X, request approval from Y" | P1       | 4h     |
| F9  | Approval reminders (after 24h, 48h)                                     | P2       | 3h     |
| F10 | Email-based approve/reject (approve from inbox)                         | P2       | 4h     |

**MVP Total Estimate:** ~37 hours of focused development

### Feature Detail: F1 — Item View: Approval Panel

**What the user sees when they open any item:**

```
┌──────────────────────────────────────────────────┐
│  📋 Approval Status                               │
│                                                    │
│  Status: ⏳ Pending Approval                       │
│  Requested by: John Doe · Feb 24, 2026 3:15 PM   │
│  Approver: Jane Manager                           │
│                                                    │
│  ┌────────────┐ ┌────────────┐ ┌───────────────┐  │
│  │ ✅ Approve  │ │ ❌ Reject   │ │ 🔄 Changes    │  │
│  └────────────┘ └────────────┘ └───────────────┘  │
│                                                    │
│  💬 Add a note: [________________________]        │
│                                                    │
│  ── Approval History ──                           │
│  ✅ Jane Manager approved · Feb 24, 3:20 PM       │
│     "Looks good, approved for Q2 budget"          │
│  ⏳ Requested by John Doe · Feb 24, 3:15 PM       │
│     "Please review the updated proposal"          │
└──────────────────────────────────────────────────┘
```

- **Triggers:** Opens as an Item View panel on any item
- **Data stored:** Approval records in D1 (itemId, approver, status, note, timestamp)
- **Status sync:** When approved/rejected, automatically updates the item's Status column

### Feature Detail: F2 — "Request Approval" Action

- User opens an item → clicks "Request Approval" button
- A modal appears: "Who should approve this?"
  - Dropdown shows all board members (from Person column or board members API)
  - Optional: Add a note ("Please review the Q2 budget proposal")
- On submit:
  1. Creates approval record in D1 (status: pending)
  2. Updates item's Status column to "Pending Approval"
  3. Sends notification to approver via Monday API
  4. Approver sees the item in their "My Approvals" dashboard

### Feature Detail: F5 — Auto-Update Status Column

This is the **killer reliability feature** that ApoFox gets wrong:

```
When approval is REQUESTED  → Status = "⏳ Pending Approval"
When approval is APPROVED   → Status = "✅ Approved"
When approval is REJECTED   → Status = "❌ Rejected"
When changes REQUESTED      → Status = "🔄 Changes Requested"
```

**Implementation:** Direct Monday GraphQL mutation to update the column value. We don't rely on webhooks for this — we mutate directly on the approval action for instant updates.

### Feature Detail: F7 — Board View: Approval Dashboard

A board-level view showing all items with pending/recent approvals:

```
┌──────────────────────────────────────────────────────────────┐
│  📊 Approval Dashboard                    [My Approvals (3)] │
│                                                              │
│  ⏳ PENDING (3)                                               │
│  ├─ "Q2 Marketing Budget"   · Requested by John · 2h ago    │
│  ├─ "New Hire: Sarah Chen"  · Requested by Mike · 5h ago    │
│  └─ "Vendor Contract #412" · Requested by Lisa · 1d ago ⚠️  │
│                                                              │
│  ✅ RECENTLY APPROVED (5)                                     │
│  ├─ "Product Roadmap v3"    · Approved by Jane · 3h ago     │
│  ├─ "Travel Request #89"   · Approved by Jane · 1d ago     │
│  └─ ... show more                                           │
│                                                              │
│  ❌ RECENTLY REJECTED (1)                                     │
│  └─ "Overtime Request"      · Rejected by VP · 2d ago       │
└──────────────────────────────────────────────────────────────┘
```

### Phase 2 Features (Week 2-4, Post-Launch)

| Feature                        | Description                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| **Multi-step approval chains** | Manager → Director → VP sequential approval                                           |
| **Approval templates**         | Pre-defined approval flows per board (e.g., "Budget Approval" always goes to Finance) |
| **Email approve/reject**       | One-click approve/reject directly from email notification (no monday login needed)    |
| **SLA tracking**               | "Must be approved within 48 hours" with escalation                                    |
| **Dashboard Widget**           | Cross-board approval summary widget                                                   |
| **Bulk approve**               | Approve multiple items at once                                                        |

---

## 4. User Experience & UI Flows

### Flow 1: Requesting an Approval (< 30 seconds)

```
User opens board → Clicks on item → Sees ApproveIt Item View panel
        ↓
Clicks "🔵 Request Approval" button
        ↓
Modal: "Who should approve?" → Selects approver from dropdown
       "Add a note (optional)" → Types reason
        ↓
Clicks "Send Request"
        ↓
✅ Status column auto-updates to "⏳ Pending Approval"
✅ Approver gets monday notification
✅ Approval appears in dashboard
```

### Flow 2: Approving an Item (< 10 seconds)

```
Approver gets notification: "John requested your approval on 'Q2 Budget'"
        ↓
Clicks notification → Opens item → Sees ApproveIt panel
        ↓
Reviews item details → Clicks "✅ Approve" (or "❌ Reject" or "🔄 Request Changes")
        ↓
Optional: Types a note ("Looks good, approved for Q2")
        ↓
Clicks "Confirm"
        ↓
✅ Status updates to "✅ Approved"
✅ Requester gets notification
✅ Audit trail updated
```

### UI Design Principles

1. **3 buttons, that's it** — Approve / Reject / Request Changes. No complex config.
2. **Works within monday's native UX** — Uses Vibe design system, feels like a native monday feature
3. **Zero setup required** — Install → open any item → start approving. No board configuration needed.
4. **Status column is the source of truth** — Everyone on the board sees approval status at a glance without opening the item.

---

## 5. Technical Architecture

### System Overview (Cloudflare Stack)

```
┌──────────────────┐                    ┌──────────────────────────────────────┐
│   monday.com     │  Notifications &   │  Cloudflare Workers (Edge)           │
│                  │  GraphQL API       │                                      │
│   ┌────────────┐ │ ◄──────────────── │  ┌────────────┐  ┌────────────────┐  │
│   │ Item View  │ │                    │  │ Hono Router │  │ D1 (SQLite)    │  │
│   │ (React)    │─┼───── REST API ───►│  │ /api/*      │  │ - approvals    │  │
│   │            │ │                    │  └────────────┘  │ - audit_logs   │  │
│   ├────────────┤ │                    │                   │ - configs      │  │
│   │ Board View │ │                    │  ┌────────────┐  └────────────────┘  │
│   │ (React)    │─┼───── REST API ───►│  │ KV          │                      │
│   └────────────┘ │                    │  │ (sessions)  │                      │
└──────────────────┘                    │  └────────────┘                      │
                                        └──────────────────────────────────────┘
```

### Tech Stack

| Component              | Technology                            | Why                                         |
| ---------------------- | ------------------------------------- | ------------------------------------------- |
| **Backend**            | Cloudflare Workers + Hono             | $0 hosting, auto-scaling, edge-deployed     |
| **Frontend**           | React + `monday-ui-react-core` (Vibe) | Required by Monday for native look          |
| **Database**           | Cloudflare D1 (SQLite)                | Stores approval records, audit logs, config |
| **Cache**              | Cloudflare KV                         | Session data, user context caching          |
| **Hosting (frontend)** | Cloudflare Pages                      | Free, global CDN                            |

### Database Schema (D1 — SQLite)

```sql
-- schema.sql

-- Approval requests (core data)
CREATE TABLE IF NOT EXISTS approvals (
  id                TEXT PRIMARY KEY,      -- UUID
  monday_item_id    INTEGER NOT NULL,
  monday_board_id   INTEGER NOT NULL,
  monday_account_id INTEGER NOT NULL,
  requester_id      INTEGER NOT NULL,      -- monday user ID of who requested
  requester_name    TEXT NOT NULL,
  approver_id       INTEGER NOT NULL,      -- monday user ID of who needs to approve
  approver_name     TEXT NOT NULL,
  status            TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'changes_requested'
  requester_note    TEXT,                  -- "Please review the Q2 budget"
  approver_note     TEXT,                  -- "Looks good, approved"
  status_column_id  TEXT,                  -- monday column ID to auto-update
  requested_at      TEXT NOT NULL,         -- ISO 8601
  resolved_at       TEXT,                  -- ISO 8601, set on approve/reject
  created_at        TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_approvals_item ON approvals(monday_item_id);
CREATE INDEX IF NOT EXISTS idx_approvals_approver ON approvals(approver_id, status);
CREATE INDEX IF NOT EXISTS idx_approvals_board ON approvals(monday_board_id);

-- Audit trail (immutable log)
CREATE TABLE IF NOT EXISTS audit_log (
  id                TEXT PRIMARY KEY,
  approval_id       TEXT NOT NULL REFERENCES approvals(id),
  action            TEXT NOT NULL,          -- 'requested', 'approved', 'rejected', 'changes_requested', 'reminded'
  actor_id          INTEGER NOT NULL,
  actor_name        TEXT NOT NULL,
  note              TEXT,
  timestamp         TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_audit_approval ON audit_log(approval_id);

-- Board-level configuration (optional)
CREATE TABLE IF NOT EXISTS board_configs (
  id                TEXT PRIMARY KEY,
  monday_board_id   INTEGER NOT NULL UNIQUE,
  monday_account_id INTEGER NOT NULL,
  status_column_id  TEXT,                  -- which Status column to auto-update
  default_approver_column TEXT,            -- Person column to auto-pick approver
  reminder_hours    INTEGER DEFAULT 24,    -- auto-remind after X hours
  created_at        TEXT DEFAULT (datetime('now'))
);

-- Usage tracking
-- Uses KV: key = "usage:{account_id}:{YYYY-MM}", value = count, TTL = 60 days
```

### API Endpoints

```
POST   /api/approvals                    — Create new approval request
GET    /api/approvals?boardId=X          — List approvals for a board
GET    /api/approvals?approverId=X       — List "my pending approvals"
PATCH  /api/approvals/:id/approve        — Approve (with optional note)
PATCH  /api/approvals/:id/reject         — Reject (with optional note)
PATCH  /api/approvals/:id/changes        — Request changes (with note)
GET    /api/approvals/:id/audit          — Get audit trail for an approval
GET    /api/boards/:boardId/config       — Get board approval config
PUT    /api/boards/:boardId/config       — Update board approval config
GET    /api/usage/:accountId             — Usage stats
```

### Core Webhook: Approval Action Handler

```typescript
// src/routes/approvals.ts
import { Hono } from 'hono';
import { Env } from '../types';
import { v4 as uuid } from 'uuid';

const approvals = new Hono<{ Bindings: Env }>();

// Create an approval request
approvals.post('/', async (c) => {
  const { itemId, boardId, accountId, requesterId, requesterName,
          approverId, approverName, note, statusColumnId } = await c.req.json();

  const id = uuid();
  const now = new Date().toISOString();

  // 1. Insert approval record
  await c.env.DB.prepare(`
    INSERT INTO approvals (id, monday_item_id, monday_board_id, monday_account_id,
      requester_id, requester_name, approver_id, approver_name,
      requester_note, status_column_id, requested_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(id, itemId, boardId, accountId, requesterId, requesterName,
          approverId, approverName, note, statusColumnId, now).run();

  // 2. Insert audit log entry
  await c.env.DB.prepare(`
    INSERT INTO audit_log (id, approval_id, action, actor_id, actor_name, note)
    VALUES (?, ?, 'requested', ?, ?, ?)
  `).bind(uuid(), id, requesterId, requesterName, note).run();

  // 3. Update monday.com status column to "Pending Approval"
  await updateMondayStatus(c.env, boardId, itemId, statusColumnId, 'Pending Approval');

  // 4. Send notification to approver via Monday API
  await sendMondayNotification(c.env, approverId, itemId,
    `${requesterName} requested your approval on this item`);

  return c.json({ id, status: 'pending' }, 201);
});

// Approve an item
approvals.patch('/:id/approve', async (c) => {
  const { id } = c.req.param();
  const { actorId, actorName, note } = await c.req.json();
  const now = new Date().toISOString();

  // 1. Update approval status
  await c.env.DB.prepare(`
    UPDATE approvals SET status = 'approved', approver_note = ?, resolved_at = ?
    WHERE id = ?
  `).bind(note, now, id).run();

  // 2. Insert audit log
  await c.env.DB.prepare(`
    INSERT INTO audit_log (id, approval_id, action, actor_id, actor_name, note)
    VALUES (?, ?, 'approved', ?, ?, ?)
  `).bind(uuid(), id, actorId, actorName, note).run();

  // 3. Get approval details to update Monday
  const approval = await c.env.DB.prepare(
    'SELECT * FROM approvals WHERE id = ?'
  ).bind(id).first();

  // 4. Update Monday status to "Approved"
  await updateMondayStatus(c.env, approval.monday_board_id,
    approval.monday_item_id, approval.status_column_id, 'Approved');

  // 5. Notify requester
  await sendMondayNotification(c.env, approval.requester_id,
    approval.monday_item_id,
    `${actorName} approved your request${note ? ': ' + note : ''}`);

  // 6. Increment usage counter
  const month = now.slice(0, 7);
  const key = `usage:${approval.monday_account_id}:${month}`;
  const count = parseInt(await c.env.USAGE.get(key) || '0');
  await c.env.USAGE.put(key, String(count + 1), { expirationTtl: 90 * 86400 });

  return c.json({ status: 'approved' });
});

export default approvals;
```

### Monday.com GraphQL Helpers

```typescript
// src/services/monday-api.ts

async function updateMondayStatus(
  env: Env, boardId: number, itemId: number,
  columnId: string, label: string
) {
  const query = `mutation {
    change_simple_column_value(
      board_id: ${boardId},
      item_id: ${itemId},
      column_id: "${columnId}",
      value: "${label}"
    ) { id }
  }`;

  await fetch('https://api.monday.com/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': env.MONDAY_API_TOKEN,
      'API-Version': '2025-04',
    },
    body: JSON.stringify({ query }),
  });
}

async function sendMondayNotification(
  env: Env, userId: number, itemId: number, text: string
) {
  const query = `mutation {
    create_notification(
      user_id: ${userId},
      target_id: ${itemId},
      text: "${text}",
      target_type: Project
    ) { text }
  }`;

  await fetch('https://api.monday.com/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': env.MONDAY_API_TOKEN,
      'API-Version': '2025-04',
    },
    body: JSON.stringify({ query }),
  });
}
```

### Project Structure

```
approveit/
├── wrangler.toml
├── schema.sql
├── src/
│   ├── index.ts                # Hono entry point
│   ├── routes/
│   │   ├── approvals.ts        # CRUD for approval requests
│   │   ├── boards.ts           # Board config endpoints
│   │   └── usage.ts            # Usage tracking
│   ├── services/
│   │   ├── monday-api.ts       # GraphQL mutations & queries
│   │   └── notifications.ts    # Notification helpers
│   └── types.ts
├── frontend/                   # React (Cloudflare Pages)
│   ├── src/
│   │   ├── views/
│   │   │   ├── ItemView.tsx    # Approval panel for items
│   │   │   └── BoardView.tsx   # Approval dashboard
│   │   ├── components/
│   │   │   ├── ApprovalPanel.tsx
│   │   │   ├── RequestModal.tsx
│   │   │   ├── ApprovalActions.tsx  # Approve/Reject/Changes buttons
│   │   │   ├── AuditTrail.tsx
│   │   │   └── ApprovalDashboard.tsx
│   │   └── api/
│   │       └── client.ts       # fetch wrapper for API calls
│   └── package.json
└── package.json
```

### wrangler.toml

```toml
name = "approveit-api"
main = "src/index.ts"
compatibility_date = "2026-02-24"

[[d1_databases]]
binding = "DB"
database_name = "approveit-db"
database_id = "<created-via-wrangler>"

[[kv_namespaces]]
binding = "USAGE"
id = "<created-via-wrangler>"

[vars]
MONDAY_CLIENT_ID = "your-monday-app-client-id"

# Set via CLI:
# wrangler secret put MONDAY_API_TOKEN
# wrangler secret put MONDAY_SIGNING_SECRET
```

---

## 6. Monday.com App Submission Requirements

### Pre-Submission Checklist

| #   | Requirement                | Value                                       | Status                   |
| --- | -------------------------- | ------------------------------------------- | ------------------------ |
| 1   | **App Name** (≤ 30 chars)  | `ApproveIt`                                 | ✅ Unique, clear          |
| 2   | **Short Description**      | Draft below                                 |                          |
| 3   | **Long Description**       | Draft below                                 |                          |
| 4   | **App Icon** (256×256 px)  | TO CREATE                                   | Green checkmark + shield |
| 5   | **Gallery Images** (min 3) | TO CREATE                                   |                          |
| 6   | **App Features**           | Item View + Board View + Integration Recipe |                          |
| 7   | **Privacy Policy URL**     | TO CREATE on domain                         |                          |
| 8   | **Terms of Service URL**   | TO CREATE on domain                         |                          |
| 9   | **Support Email**          | TO SET                                      |                          |
| 10  | **API version**            | `2025-04` or later                          |                          |
| 11  | **Vibe Design System**     | `monday-ui-react-core`                      |                          |

### Draft: Short Description

> *One-click approval workflows with audit trails. Request, approve, or reject any item — with full accountability and zero setup.*

### Draft: Long Description

> **ApproveIt adds professional approval workflows to any monday.com board — no complex setup required.**
>
> Stop using Status columns as makeshift approval systems. ApproveIt gives your team a proper approval process with full audit trails, notifications, and one-click actions.
>
> **Key Features:**
> - ✅ **One-Click Approvals** — Approve, reject, or request changes with a single click
> - 🔔 **Smart Notifications** — Approvers are notified instantly, with auto-reminders for overdue requests
> - 📋 **Full Audit Trail** — See who approved what, when, and why — perfect for compliance
> - 📊 **Approval Dashboard** — Board-level view of all pending, approved, and rejected items
> - ⚡ **Auto Status Updates** — Approval decisions sync to your Status column instantly
> - 🤖 **Automation Recipes** — "When status changes, request approval from..." 
>
> **Perfect for:** Budget approvals, purchase orders, content reviews, HR requests, contract sign-offs, and any process that needs a paper trail.
>
> **Zero setup:** Install → open any item → request approval. That's it.
>
> Free plan included. Start approving in under 60 seconds.

---

## 7. Pricing Strategy

### Pricing Tiers

| Plan           | Price                  | Includes                                                                    | Target                  |
| -------------- | ---------------------- | --------------------------------------------------------------------------- | ----------------------- |
| **Free**       | $0/mo                  | 50 approvals/month, 1 board, basic audit log                                | Solo users, evaluation  |
| **Pro**        | $12/mo (billed yearly) | Unlimited approvals, 10 boards, full audit trail, reminders                 | Small teams             |
| **Business**   | $29/mo (billed yearly) | Unlimited everything, multi-step chains, email approvals, export audit logs | Mid-market              |
| **Enterprise** | $49/mo (billed yearly) | All features + SLA, priority support, SSO                                   | Large orgs / compliance |

### Why This Pricing Works

1. **$12/mo Pro** is 52% cheaper than ApoFox's workflow competitor — easy switch
2. **Approval workflows = compliance requirement** — teams MUST pay, it's not optional
3. **Free tier (50 approvals)** is enough for a small team to get hooked and leave a 5★ review
4. **$29/mo Business** adds multi-step chains — the feature that managers will pay for
5. **$49/mo Enterprise** anchors the other prices as "cheap"

### Revenue Path to $1,000 MRR

| Month | Free Users | Paid Users (5%) | Avg Price | MRR      |
| ----- | ---------- | --------------- | --------- | -------- |
| 1     | 300        | 15              | $15       | $225     |
| 2     | 700        | 35              | $15       | $525     |
| 3     | 1,200      | 60              | $17       | $1,020 ✅ |
| 6     | 3,000      | 150             | $18       | $2,700   |

---

## 8. Development Plan (Day-by-Day)

### Day 0: Setup (4 hours total)

| Task                                                                          | Duration |
| ----------------------------------------------------------------------------- | -------- |
| Create monday.com Developer Account + App in Developer Center                 | 30 min   |
| `npm create cloudflare@latest approveit-api`                                  | 15 min   |
| `wrangler d1 create approveit-db` + run `schema.sql`                          | 15 min   |
| `wrangler kv:namespace create USAGE`                                          | 5 min    |
| `wrangler secret put MONDAY_API_TOKEN` + signing secret                       | 10 min   |
| Register domain + deploy landing page with Privacy Policy to Cloudflare Pages | 2 hours  |
| Configure Monday app: add Item View + Board View features in Developer Center | 30 min   |

### Day 1: Core Backend + Item View

| Time | Task                   | Details                                                                             |
| ---- | ---------------------- | ----------------------------------------------------------------------------------- |
| 0-1h | **Hono scaffolding**   | Entry point, route structure, D1 bindings, wrangler.toml                            |
| 1-3h | **Approvals CRUD API** | POST/GET/PATCH endpoints for creating approvals, approving, rejecting               |
| 3-4h | **Monday API helpers** | `updateMondayStatus()`, `sendMondayNotification()`, `getBoardColumns()`             |
| 4-5h | **Audit trail**        | Auto-log every action with actor, timestamp, note                                   |
| 5-7h | **Item View React**    | Monday SDK context, ApprovalPanel component, RequestModal, Approve/Reject buttons   |
| 7-8h | **Deploy + test**      | `wrangler deploy`, add Item View URL in Developer Center, test on real Monday board |

**Day 1 Deliverable:** User can open any item, click "Request Approval," select an approver, and the approver can approve/reject. Status column updates. Audit trail logged.

### Day 2: Board View + Notifications

| Time | Task                                  | Details                                                                            |
| ---- | ------------------------------------- | ---------------------------------------------------------------------------------- |
| 0-3h | **Board View: Approval Dashboard**    | React component showing Pending / Approved / Rejected sections with item details   |
| 3-5h | **Monday notifications**              | Notify approver on request, notify requester on approval/rejection                 |
| 5-6h | **Board config**                      | Settings modal: select which Status column to auto-update, default approver column |
| 6-8h | **Usage tracking + free tier limits** | KV-based counter, show usage bar in UI, block actions after limit                  |

**Day 2 Deliverable:** Full approval dashboard, notifications working, usage limits enforced.

### Day 3: Integration Recipe + Polish

| Time | Task                   | Details                                                                                                                      |
| ---- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 0-3h | **Integration recipe** | "When status changes to [X], request approval from [Person Column]" — Monday Developer Center config + custom_action handler |
| 3-5h | **UI polish**          | Loading states, error handling, empty states, responsive layout, Vibe design system refinement                               |
| 5-7h | **End-to-end testing** | Test full flow: request → notify → approve → status update → audit log. Test reject and changes_requested flows.             |
| 7-8h | **Edge cases**         | What if approver is removed from board? What if item is deleted? What if status column is renamed?                           |

**Day 3 Deliverable:** Feature-complete app with integration recipe, polished UI, and edge cases handled.

### Day 4: App Store Submission + Docs

| Time | Task                             | Details                                                                                 |
| ---- | -------------------------------- | --------------------------------------------------------------------------------------- |
| 0-2h | **App icon + gallery images**    | 256×256 icon, 3+ screenshots (1920×1080) showing approval panel, dashboard, audit trail |
| 2-3h | **Listing copy**                 | Finalize descriptions, categories, tags                                                 |
| 3-4h | **Help documentation**           | 3 articles: Quick Start, Approval Dashboard Guide, FAQ                                  |
| 4-5h | **Demo video**                   | 90-second Loom showing full approval flow                                               |
| 5-6h | **Security review**              | CORS, rate limiting, input sanitization, monday signing secret verification             |
| 6-7h | **Submit to Monday marketplace** | Publish, fill form, wait for review                                                     |
| 7-8h | **Landing page finalization**    | Hero section, feature highlights, pricing table, install CTA                            |

**Day 4 Deliverable:** App submitted for review. Documentation live. Landing page ready.

---

## 9. Risk Register & Mitigations

| #   | Risk                                       | Impact   | Probability | Mitigation                                                                                                                                                 |
| --- | ------------------------------------------ | -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R1  | **Monday says "ApoFox already does this"** | 🟡 Medium | Low         | Our listing emphasizes "audit trail" and "zero-setup" as differentiators, not just "approval." Position as "Compliance-Ready Approval Tracking" if needed. |
| R2  | **Low install velocity**                   | 🟡 Medium | Medium      | Aggressive free tier (50 approvals) + community forum posts + direct outreach to ApoFox 1-star reviewers                                                   |
| R3  | **ApoFox improves their app**              | 🟡 Medium | Low         | First-mover with better UX + reviews wins. Entrenched users rarely switch.                                                                                 |
| R4  | **Monday builds native approvals**         | 🔴 High   | Low         | Unlikely in short term. If they do, we pivot to "Advanced Approvals" with chains + audit export + compliance features they won't build.                    |
| R5  | **D1 performance at scale**                | 🟢 Low    | Low         | D1 handles our query patterns easily. Index on `monday_board_id` and `approver_id`.                                                                        |

---

## 10. Post-Launch Growth Playbook

### Week 1: Steal ApoFox's Frustrated Users

1. **Find every 1-2 star review of "Approvals for monday.com"** on the marketplace
2. **Respond to Monday Community posts** where users complain about approval workflows
3. **Post:** "We built a simpler alternative to [competitor] — looking for beta testers, free Pro plan for 3 months"
4. **Direct message users** who posted about approval pain points

### Week 2-3: Review Velocity

1. **In-app prompt after 5th approval:** "Enjoying ApproveIt? A review helps other teams find us! ⭐"
2. **Email early adopters** personally: "Hey, we're a small team building this — your honest review would mean the world to us"
3. **Target: 15+ five-star reviews in 30 days** — this puts us above ApoFox immediately

### Month 2-3: Feature Expansion

1. **Multi-step approval chains** (Pro feature) — the #1 upgrade driver
2. **Email-based approve/reject** (Business feature) — approve without logging into monday
3. **Audit log CSV export** — compliance teams will pay $29-49/mo for this alone

---

## Appendix

### Key Monday.com API Calls

**Get board columns (to find Status column):**
```graphql
query {
  boards(ids: [BOARD_ID]) {
    columns { id title type }
  }
}
```

**Get board members (for approver dropdown):**
```graphql
query {
  boards(ids: [BOARD_ID]) {
    subscribers { id name email }
  }
}
```

**Update status column:**
```graphql
mutation {
  change_simple_column_value(
    board_id: BOARD_ID,
    item_id: ITEM_ID,
    column_id: "status",
    value: "Approved"
  ) { id }
}
```

**Send notification:**
```graphql
mutation {
  create_notification(
    user_id: USER_ID,
    target_id: ITEM_ID,
    text: "Your request was approved by Jane Manager",
    target_type: Project
  ) { text }
}
```

---

> **Document Status:** Ready for development team handoff.
> **Last Updated:** February 24, 2026
> **Author:** Product & Growth Analysis Team
