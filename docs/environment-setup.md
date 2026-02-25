# Environment Setup Guide

This guide covers setting up **Development** and **Production** environments for ApproveIt.

## Overview

### Environment Architecture

| Environment | Purpose | Branch | monday.com App | Worker URL | Pages URL |
|-------------|---------|--------|----------------|------------|-----------|
| **Development** | Local + sandbox testing | `main` | Sandbox app | `approveit-api.workers.dev` | `approveit-dev.pages.dev` |
| **Production** | Live marketplace | `prod` | Production app | `approveit-api-production.workers.dev` | `approveit.pages.dev` |

---

## Resource IDs (Already Created)

See [resource-ids.md](resource-ids.md) for all Cloudflare resource IDs.

---

## Step 1: Create monday.com Apps

You need **2 separate monday.com apps**:

### Development App (Sandbox)
1. Go to [monday.com Developer Portal](https://auth.monday.com/developers/)
2. Create new app: **"ApproveIt Dev"**
3. Enable features: Item View, Board View, Integration Recipe
4. Set OAuth redirect: `https://approveit-dev.pages.dev/oauth/callback`
5. Copy **Client ID** and **Client Secret**
6. Copy **Signing Secret** from each feature

### Production App (Marketplace)
1. Create new app: **"ApproveIt"**
2. Same features as dev
3. Set OAuth redirect: `https://approveit.pages.dev/oauth/callback`
4. Copy credentials
5. This will be submitted to marketplace later

---

## Step 2: Configure GitHub Environments

### In GitHub: Settings → Environments

Create two environments: `development`, `production`

#### Protection Rules (Recommended for Production)

**Production:**
- Deployment branches: `prod` only
- Wait timer: 5 minutes (optional)

---

## Step 3: Set GitHub Secrets

### Repository-Level Secrets (shared)

Go to **Settings → Secrets and variables → Actions → Repository secrets**:

```
CLOUDFLARE_API_TOKEN       (from Cloudflare dashboard)
CLOUDFLARE_ACCOUNT_ID      (from Cloudflare dashboard)
```

### Environment-Specific Secrets

For **each environment** (development, production):

Go to **Settings → Environments → [environment] → Environment secrets**:

```bash
# monday.com App Credentials (different per environment!)
MONDAY_CLIENT_SECRET       (from monday.com app OAuth settings)
MONDAY_SIGNING_SECRET      (from monday.com app feature settings)
VITE_MONDAY_CLIENT_ID      (from monday.com app - public ID)

# Worker URLs
VITE_WORKER_URL            
  # dev:  https://approveit-api.<your-subdomain>.workers.dev
  # prod: https://approveit-api-production.<your-subdomain>.workers.dev

# JWT Secret (generate unique per environment)
JWT_SECRET                 (openssl rand -base64 32)
```

---

## Step 4: Update wrangler.toml Client IDs

Replace placeholders in `wrangler.toml`:

```toml
# Development section
MONDAY_CLIENT_ID = "your-dev-monday-client-id"

# Production section  
MONDAY_CLIENT_ID = "your-production-monday-client-id"
```

---

## Step 5: Deploy!

### Branch-Based Deployment

The workflows automatically deploy based on branch:

```bash
# Deploy to Development
git push origin main

# Deploy to Production
git checkout prod
git merge main
git push origin prod
```

### Manual Deployment

Go to **Actions** tab → select workflow → **Run workflow** → choose environment

---

## Step 6: Verify Deployments

### Check Worker Deployments

```bash
npx wrangler list

# You should see:
# approveit-api
# approveit-api-production
```

### Check Pages Deployments

Go to Cloudflare Dashboard → **Workers & Pages** → **Pages**

You should see:
- `approveit-dev`
- `approveit` (production)

---

## Quick Reference: GitHub Secrets by Environment

| Secret | Development | Production |
|--------|-------------|------------|
| `MONDAY_CLIENT_SECRET` | Sandbox App | Prod App |
| `MONDAY_SIGNING_SECRET` | Sandbox App | Prod App |
| `VITE_MONDAY_CLIENT_ID` | Sandbox App ID | Prod App ID |
| `VITE_WORKER_URL` | `*-api.workers.dev` | `*-api-production.workers.dev` |
| `JWT_SECRET` | Unique value | Unique value |

---

## Local Development

For local testing:

```bash
# Run worker locally
npx wrangler dev

# Run frontend locally
cd frontend && npm run dev
```

Create `.dev.vars` for local secrets:
```bash
MONDAY_CLIENT_SECRET=your-dev-secret
MONDAY_SIGNING_SECRET=your-dev-signing-secret
JWT_SECRET=local-jwt-secret
```
