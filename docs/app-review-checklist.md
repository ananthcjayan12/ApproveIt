# App Review Checklist

## Feature Coverage
- [x] Item View workflow support (request, approve, reject, request changes)
- [x] Board View dashboard support (pending/recent/my approvals)
- [x] Integration custom action endpoint

## Reliability and Security
- [x] monday GraphQL wrapper with bounded retry and sanitized errors
- [x] Tenant-scoped D1 queries and mutation guards
- [x] Signature verification for integration-originating endpoint
- [x] API rate limiting and request correlation IDs

## Data Integrity
- [x] Append-only audit log writes for lifecycle events
- [x] Duplicate pending transition prevention
- [x] Status transition conflict handling (`409` for closed approvals)

## Operational Readiness
- [x] Backend typecheck passes
- [x] Frontend typecheck passes
- [x] Core workflow unit tests pass
- [ ] Manual mobile validation in monday app contexts
- [ ] Production secret rotation/runbook review

## Marketplace Readiness
- [ ] Final icon and gallery screenshots attached
- [x] Listing copy draft prepared
- [x] Support/privacy/terms placeholders set
- [ ] Final submission package review
