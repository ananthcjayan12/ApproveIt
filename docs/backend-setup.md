# Backend Setup (Worker + D1 + KV)

## 1) Install dependencies

```bash
npm install
```

## 2) Create Cloudflare resources

```bash
wrangler d1 create approveit-db
wrangler kv namespace create USAGE
```

Update the generated IDs in [wrangler.toml](../wrangler.toml).

## 2.1) Apply D1 schema

```bash
# local
wrangler d1 execute approveit-db --local --file=schema.sql

# remote
wrangler d1 execute approveit-db --remote --file=schema.sql
```

## 3) Configure required secrets

```bash
wrangler secret put MONDAY_API_TOKEN
wrangler secret put MONDAY_SIGNING_SECRET
```

## 4) Configure required vars

Set in [wrangler.toml](../wrangler.toml):

- `MONDAY_CLIENT_ID`
- `MONDAY_API_VERSION` (default: `2025-04`)

## 5) Local run and deploy

```bash
npm run dev
npm run deploy
```

## 6) Smoke check

After local run/deploy:

- `GET /health` should return `{ "ok": true }`.