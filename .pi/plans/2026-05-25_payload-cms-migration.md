---
title: "Phase 1: Discovery - Local Payload CMS Migration"
slug: payload-cms-migration
created_at: 2026-05-25T07:43:50.170Z
status: completed
---

## Goal
**Phase 1 is discovery only.** Complete the investigation needed to make the DataSolace local Payload CMS migration safe and execution-ready, including Wrangler/Cloudflare inventory, local tunnel topology, runtime decisions, storage/rate-limit replacements, Payload schema mapping, and an updated **Phase 2 implementation plan** that reflects the findings.

## Constraints
- **This plan is Phase 1: Discovery.** Its deliverable is decisions, inventory, migration mapping, and a revised Phase 2 implementation plan.
- **No implementation happens in Phase 1:** do not create the CMS app, change the public app runtime, alter Docker/nginx/tunnel config, migrate data, or cut over DNS as part of this plan.
- **Phase 2 is a separate implementation plan:** `.pi/plans/2026-05-25_payload-cms-migration-implementation.md`.
- **Phase 2 must not start until Phase 1 is complete, reviewed, and the implementation plan has been updated with the discovery findings.**
- Wrangler may be used for read-only metadata inspection; exports that write local backup artifacts require an agreed output location before running.
- Worker secrets cannot be read back via Wrangler, so discovery must identify secret names and replacement sources without exposing values.
- Cloudflare Tunnel is only ingress/proxying to local origins; it will not provide Worker runtime bindings such as env.DB or env.RATE_LIMIT_KV to local Node code.
- Prefer a local Docker Compose stack with Postgres, Payload CMS, public Next app, nginx, and cloudflared unless discovery finds a blocking constraint.
- Prefer Postgres/Payload for durable contact/newsletter/blog data and nginx limit_req for first-line throttling; add Valkey/Redis only if discovery proves app-level shared counters or precise retry-after UX are required.
- Keep the Phase 2 implementation plan gated on Phase 1 discovery outcomes; revise it before any implementation coding begins.

## Relevant Files
- wrangler.jsonc - current Cloudflare Worker bindings, D1/KV identifiers, and deployment metadata to inventory.
- open-next.config.ts - current OpenNext/Workers deployment behavior to account for during local migration.
- next.config.ts - current Next build/image/runtime settings that affect standalone Node hosting.
- package.json and package-lock.json - current scripts/dependencies used to evaluate runtime strategy and migration impact.
- src/app/api/contact/route.ts - current D1/KV-backed contact endpoint to map to local persistence and rate limiting.
- src/app/api/newsletter/route.ts - current newsletter endpoint and secret/KV assumptions to map to local env/rate limiting.
- src/lib/rateLimit.ts - current Cloudflare KV rate limiter to replace or intentionally defer.
- src/lib/blog.ts and src/sanity/client.ts - current Sanity query/image layer to map to Payload.
- src/app/blog/page.tsx and src/app/blog/[slug]/page.tsx - current blog rendering and static param behavior to preserve.
- schema.sql, env.d.ts, RATE_LIMITING.md - current Cloudflare D1/KV artifacts and documentation to inventory.
- public/blog/ and public/*.webp - existing media assets to classify as static assets or Payload media migration inputs.
- /Users/josh/code/caras.kitchen/compose.yml - reference local Docker Compose topology.
- /Users/josh/code/caras.kitchen/nginx.conf - reference nginx routing, security headers, and local ingress.
- /Users/josh/code/caras.kitchen/cloudflared-config.yml - reference Cloudflare Tunnel hostname mapping.
- /Users/josh/code/caras.kitchen/cms/src/payload.config.ts - reference Payload/Postgres/CORS/admin configuration.
- /Users/josh/code/caras.kitchen/cms/src/collections/BlogPosts.ts and Media.ts - reference collection and media patterns.
- /Users/josh/code/caras.kitchen/cms/scripts/migrate-from-sanity.ts - reference Sanity-to-Payload migration script structure.

## Plan
- [x] Audit current DataSolace deployment/runtime configuration and code paths that depend on Cloudflare Workers, D1, KV, OpenNext, Sanity, and Worker secrets.
- [x] Run or prepare the agreed Wrangler read-only inventory for Worker, D1, KV, and deployment metadata; identify which D1 data, if any, needs export and where backup artifacts should live.
- [x] Compare the caras.kitchen local stack with DataSolace requirements and document the proposed tunnel/nginx/Docker topology for datasolace.com and cms.datasolace.com, including Cloudflare Access boundaries.
- [x] Evaluate the public app runtime options and record a decision: Node standalone behind nginx first versus static export/rebuild hooks, including implications for API routes, dynamic blog pages, image handling, and rollback.
- [x] Evaluate D1/KV replacements and record a decision for contact persistence, newsletter logging, and rate limiting, including whether nginx-only throttling is sufficient or whether Postgres/Valkey app-level counters are needed.
- [x] Draft the DataSolace-specific Payload content model and migration map for BlogPosts, Media, Users, ContactSubmissions, NewsletterSignups or NewsletterEvents, and optional future SiteSettings/PortfolioItems/Services.
- [x] Identify required local secrets, environment variables, backup/restore requirements, protected/public routes, and operational risks for local hosting.
- [x] Update the separate Phase 2 implementation plan with discovery findings, concrete file changes, sequencing, validation checks, and any changed assumptions before implementation coding begins.

### Progress Notes
- 2026-05-25T15:46:37Z: Wrangler read-only inventory is blocked by authentication: wrangler whoami/d1 list/kv namespace list/secret list/deployments list all fail with 'Failed to fetch auth token' and require CLOUDFLARE_API_TOKEN or interactive login.
- 2026-05-25T15:56:15Z: Refreshed Phase 2 implementation plan after successful Wrangler inventory: added D1 export path, 56-row contact import requirement, KV namespace details, and no-secret-list finding.
- 2026-05-25T16:03:38Z: Updated Phase 2 assumptions after reviewing D1 submissions with the user: the 56 historic contact rows appear mostly spam/attacker probes, so keep the D1 export as ignored backup/evidence and do not import those rows into Payload by default.
- 2026-05-25T16:15:29Z: Created standalone Phase 1 findings document at docs/payload-cms-migration-discovery.md covering Wrangler inventory, D1 export/spam finding, Sanity counts, runtime/topology/storage/rate-limit decisions, staging requirements, and Phase 2 inputs.

## Validation
- [x] Current Cloudflare dependencies are inventoried with file references and no implementation changes made.
- [x] Wrangler discovery outputs or command notes are captured without committing secrets or backup dumps to git.
- [x] A topology decision exists for Docker Compose services, nginx routing, Cloudflare Tunnel hostnames, and Cloudflare Access protection.
- [x] A runtime decision exists for the public Next app with rationale and known follow-up changes.
- [x] A D1/KV replacement decision exists for contact, newsletter, and rate limiting with any Valkey/Postgres app-level need explicitly accepted or rejected.
- [x] A Payload schema and Sanity/media migration map exists for the implementation phase.
- [x] Required local secrets, env vars, backup paths, and rollback considerations are documented.
- [x] The Phase 2 implementation plan has been updated to reflect Phase 1 discovery outcomes and is ready for user review before coding.

## Risks
- Wrangler access may be missing, stale, or scoped differently than expected, which could delay inventory/export decisions.
- D1 may contain historic contact data whose retention/migration requirements are unclear until inspected.
- Worker secret values are not retrievable, so missing external secret records could block local newsletter/API testing later.
- The current OpenNext/Worker deployment may hide assumptions that require more app changes than a simple Node standalone move.
- Static export may not fit current API/dynamic behavior; Node hosting is likely safer but changes performance and caching characteristics.
- nginx-only rate limiting may not reproduce precise current retry-after/reset metadata if the frontend depends on it.
- Payload/Sanity content shape differences, media URL handling, or Portable Text/markdown variation may alter the implementation plan.
- Local hosting introduces uptime, backup, power/network, and disaster-recovery responsibilities that may change the final cutover approach.
