# ApproveIt Development Cycle

This document explains how code changes flow through environments and how different types of changes are handled by CI/CD.

---

## Overview: Two-Environment Setup

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT CYCLE                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Feature Branch ──▶ main (development) ──▶ prod (production)           │
│                                                                         │
│   ┌──────────┐         ┌──────────┐         ┌──────────┐               │
│   │  Local   │────────▶│   Dev    │────────▶│   Prod   │               │
│   │  Dev     │         │  (main)  │         │  (prod)  │               │
│   └──────────┘         └──────────┘         └──────────┘               │
│        │                    │                    │                      │
│        ▼                    ▼                    ▼                      │
│   Local D1 DB          Dev D1 DB           Prod D1 DB                  │
│   Local KV             Dev KV              Prod KV                     │
│   Local Worker         Dev Worker          Prod Worker                 │
│                        Dev Pages           Prod Pages                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Branch Strategy

| Branch | Environment | Purpose | Auto-Deploy |
|--------|-------------|---------|-------------|
| `feature/*` | Local only | New features/fixes | No |
| `main` | Development | Integration testing + monday.com sandbox | ✅ Yes |
| `prod` | Production | Live marketplace app | ✅ Yes |

---

## What Gets Deployed Automatically

When you push to a branch, GitHub Actions handles everything:

### ✅ Frontend Changes (`frontend/*`)

**Workflow:** `deploy-frontend.yml`

| What | How |
|------|-----|
| Build | `npm run build` in frontend directory |
| Deploy | Cloudflare Pages deployment |
| Environment | Different Pages project per environment |

**Example:** Change a React component → Push → Frontend rebuilds and deploys automatically.

### ✅ Worker/Backend Changes (`src/*`)

**Workflow:** `deploy-worker.yml`

| What | How |
|------|-----|
| Typecheck | `tsc --noEmit` |
| Deploy | `wrangler deploy` |
| Secrets | Set via `wrangler secret put` |

**Example:** Add a new API endpoint → Push → Worker redeploys with new code.

### ✅ Database Schema Changes (`schema.sql`)

**Workflow:** `deploy-worker.yml`

| What | How |
|------|-----|
| Migration | `wrangler d1 execute <db-name> --file=./schema.sql` |
| Per-environment | Each environment has its own D1 database |

**Example:** Add a new column to `approvals` table → Update `schema.sql` → Push → Schema applied before worker deploys.

### ✅ KV Data (Runtime)

KV namespaces are already created and configured. Runtime KV operations happen in your worker code.

**Note:** KV is typically used for caching/ephemeral data. If you need to "migrate" KV data, you'd do that in worker code or via a one-time script.

---

## Typical Development Workflow

### 1. Start a Feature

```bash
# Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/add-approval-notes
```

### 2. Develop Locally

```bash
# Start local worker (uses local D1/KV)
npx wrangler dev

# In another terminal, start frontend
cd frontend
npm run dev
```

**Local Development Tips:**
- Worker runs at `http://localhost:8787`
- Frontend runs at `http://localhost:5173`
- Uses local D1 database (automatically created)
- Create `.dev.vars` for local secrets:
  ```bash
  MONDAY_CLIENT_SECRET=your-dev-secret
  MONDAY_SIGNING_SECRET=your-dev-signing-secret
  JWT_SECRET=local-dev-jwt-secret
  ```

### 3. Make Your Changes

#### Frontend Change
```tsx
// frontend/src/components/ApprovalPanel.tsx
// Add or modify component
```

#### Worker/API Change
```typescript
// src/routes/approvals.ts
// Add new endpoint or modify logic
```

#### Database Schema Change
```sql
-- schema.sql
-- Add new table or column
ALTER TABLE approvals ADD COLUMN notes TEXT;
```

### 4. Test Locally

```bash
# Apply schema locally
npx wrangler d1 execute approveit-db-dev --local --file=./schema.sql

# Test in browser
# Frontend: http://localhost:5173
# API: http://localhost:8787
```

### 5. Push to Development

```bash
# Commit changes
git add .
git commit -m "feat: add approval notes field"

# Push to feature branch
git push origin feature/add-approval-notes

# Create PR to main
# After review, merge to main
```

**What happens on merge to `main`:**
1. ✅ Frontend builds and deploys to `approveit-dev.pages.dev`
2. ✅ Schema.sql applied to `approveit-db-dev`
3. ✅ Worker deploys to `approveit-api.workers.dev`

### 6. Test in Development

- Test with monday.com sandbox account
- Verify all features work

### 7. Deploy to Production

```bash
# After dev testing, deploy to production
git checkout prod
git merge main
git push origin prod
```

**What happens on push to `prod`:**
1. ✅ Frontend builds and deploys to `approveit.pages.dev`
2. ✅ Schema.sql applied to `approveit-db-production`
3. ✅ Worker deploys to `approveit-api-production.workers.dev`

---

## CI/CD Pipeline Details

### deploy-worker.yml

```
Push to branch
    │
    ▼
┌─────────────────────┐
│ Checkout code       │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ Install deps        │
│ npm ci              │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ Typecheck           │
│ tsc --noEmit        │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ Set Secrets         │  ← Uses GitHub Environment Secrets
│ wrangler secret put │     (MONDAY_CLIENT_SECRET, etc.)
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ Run D1 Migrations   │  ← Applies schema.sql to correct database
│ d1 execute --file   │     based on environment
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ Deploy Worker       │  ← Deploys to correct worker
│ wrangler deploy     │     based on environment
└─────────────────────┘
```

### deploy-frontend.yml

```
Push to branch
    │
    ▼
┌─────────────────────┐
│ Checkout code       │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ Install deps        │
│ npm ci (frontend)   │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ Build               │  ← Uses VITE_WORKER_URL from
│ npm run build       │     GitHub Environment Secrets
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ Deploy to Pages     │  ← Different project per environment
│ pages deploy        │
└─────────────────────┘
```

---

## Secrets Management

### Where Secrets Live

| Secret Type | Storage | Committed to Git? |
|-------------|---------|-------------------|
| Resource IDs (D1, KV) | `wrangler.toml` | ✅ Yes - NOT sensitive |
| API Secrets | Cloudflare (via `wrangler secret put`) | ❌ No |
| CI/CD Secrets | GitHub Environments | ❌ No |

### GitHub Secrets Required (Per Environment)

| Secret | Purpose |
|--------|---------|
| `CLOUDFLARE_API_TOKEN` | Deploy to Cloudflare (repo-level) |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account (repo-level) |
| `MONDAY_CLIENT_SECRET` | monday.com OAuth |
| `MONDAY_SIGNING_SECRET` | Webhook signature verification |
| `JWT_SECRET` | Token signing |
| `VITE_WORKER_URL` | Frontend → backend URL |
| `VITE_MONDAY_CLIENT_ID` | Frontend monday.com auth |

### Security Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        SECRETS FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  GitHub Secrets                    Cloudflare                   │
│  ┌──────────────┐                 ┌──────────────┐              │
│  │ MONDAY_      │  ──wrangler──▶  │ Encrypted    │              │
│  │ CLIENT_SECRET│    secret put   │ Worker       │              │
│  └──────────────┘                 │ Secrets      │              │
│                                   └──────────────┘              │
│                                         │                       │
│                                         ▼                       │
│  wrangler.toml                   ┌──────────────┐              │
│  ┌──────────────┐                │   Worker     │              │
│  │ database_id  │  ──wrangler──▶ │   Runtime    │              │
│  │ kv_id        │    deploy      │ (env.SECRET) │              │
│  └──────────────┘                └──────────────┘              │
│  (Not secrets -                                                 │
│   just resource IDs)                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Handling Different Change Types

### Scenario 1: Frontend-Only Change

**Files changed:** `frontend/src/components/ApprovalPanel.tsx`

**What happens:**
1. `deploy-frontend.yml` triggers
2. Frontend builds with environment-specific `VITE_WORKER_URL`
3. Deploys to Cloudflare Pages

**Worker affected:** No
**Database affected:** No

### Scenario 2: API/Worker-Only Change

**Files changed:** `src/routes/approvals.ts`

**What happens:**
1. `deploy-worker.yml` triggers
2. Typechecks code
3. Sets secrets (if changed)
4. Runs D1 migrations (schema.sql - no changes = no-op)
5. Deploys worker

**Frontend affected:** No (unless API contract changed)
**Database affected:** Only if schema.sql changed

### Scenario 3: Database Schema Change

**Files changed:** `schema.sql`

**What happens:**
1. `deploy-worker.yml` triggers
2. Runs D1 migrations BEFORE deploying worker
3. Deploys worker

**Important:** Schema changes are applied to the correct environment's database automatically.

### Scenario 4: Full-Stack Change (Most Common)

**Files changed:**
- `frontend/src/components/ApprovalPanel.tsx`
- `src/routes/approvals.ts`
- `schema.sql`

**What happens:**
1. Both workflows trigger in parallel:
   - `deploy-frontend.yml` → builds and deploys frontend
   - `deploy-worker.yml` → runs migrations, deploys worker

**The workflows are independent but both triggered by the same push.**

---

## Rollback Procedures

### Rollback Worker

```bash
# List deployments
npx wrangler deployments list

# Rollback to previous version
npx wrangler rollback --env production
```

### Rollback Frontend

1. Go to Cloudflare Dashboard → Workers & Pages → Your project
2. Find previous deployment
3. Click "Rollback to this deployment"

### Rollback Database

**Warning:** D1 doesn't have automatic rollback. For breaking schema changes:

1. **Before migration:** Always write backward-compatible schema changes
2. **If needed:** Write a reverse migration script
3. **Emergency:** Restore from backup (if configured)

**Best Practice:** Use additive schema changes (add columns, not remove).

---

## Quick Reference Commands

```bash
# Local development
npx wrangler dev                    # Start worker locally
cd frontend && npm run dev          # Start frontend locally

# Apply schema locally
npx wrangler d1 execute approveit-db-dev --local --file=./schema.sql

# Deploy manually (if needed)
npx wrangler deploy                 # Dev
npx wrangler deploy --env production # Production

# Check logs
npx wrangler tail                   # Dev
npx wrangler tail --env production  # Production

# List all deployments
npx wrangler deployments list

# List all D1 databases
npx wrangler d1 list

# List all KV namespaces
npx wrangler kv namespace list
```

---

## Checklist: Before Merging to Production

- [ ] Feature tested locally
- [ ] PR reviewed (or self-reviewed)
- [ ] Merged to `main` and tested in dev environment
- [ ] Tested with monday.com sandbox
- [ ] Schema changes are backward-compatible
- [ ] No breaking API changes (or frontend updated accordingly)
- [ ] GitHub Actions completed successfully in dev
- [ ] Manual smoke test in dev environment
- [ ] Ready to merge to `prod`
