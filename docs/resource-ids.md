# ApproveIt Resource IDs

This file tracks all Cloudflare resource IDs for each environment.

## Development Environment ✅

**D1 Database:**
- Name: `approveit-db-dev`
- ID: `2b8c025a-9965-4e60-aba0-8204740d13dc`

**KV Namespaces:**
- USAGE: `1876df17bbf940b4a757736e2ce16e86`
- APPROVAL_REQUESTS: `0711cbe0889242d9ba1f6cf8b94df140`
- REMINDERS: `4555e5e51ce348ddaeaf32050a9763ba`

---

## Staging Environment ✅

**D1 Database:**
- Name: `approveit-db-staging`
- ID: `878ea383-d4a8-47e0-95d2-88870b50d30c`

**KV Namespaces:**
- USAGE_STAGING: `942adc75519446aeae357d528cdb5d06`
- APPROVAL_REQUESTS_STAGING: `d139014e71704cdb8070912847a070fa`
- REMINDERS_STAGING: `6d98dcd6fa1e4fc3b5d83c1c4b35838e`

---

## Production Environment ✅

**D1 Database:**
- Name: `approveit-db-production`
- ID: `42b99426-5506-4da5-98ac-c00f390a7359`

**KV Namespaces:**
- USAGE_PRODUCTION: `e73ea71b3f29423aab035174dd46aadd`
- APPROVAL_REQUESTS_PRODUCTION: `aa8d9eea94d049fb8b7d6f57ebcfd725`
- REMINDERS_PRODUCTION: `8b5f77558adb411d8f6a04ff1900e5f1`

---

## Next Steps

After creating staging and production resources:

1. **Update wrangler.toml** with staging and production IDs
2. **Apply database schema** to each environment:
   ```bash
   # Development (already done?)
   npx wrangler d1 execute approveit-db-dev --file=./schema.sql --remote
   
   # Staging
   npx wrangler d1 execute approveit-db-staging --file=./schema.sql --remote --env staging
   
   # Production
   npx wrangler d1 execute approveit-db-production --file=./schema.sql --remote --env production
   ```

3. **Set GitHub Secrets** for each environment (see [environment-setup.md](environment-setup.md#step-5-set-github-secrets))
