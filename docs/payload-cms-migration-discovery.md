# Payload CMS Migration Discovery Findings

Date: 2026-05-25
Phase 1 plan: `.pi/plans/2026-05-25_payload-cms-migration.md`
Phase 2 plan: `.pi/plans/2026-05-25_payload-cms-migration-implementation.md`

## Executive Summary

Phase 1 discovery is complete. The recommended implementation path is to move DataSolace from Cloudflare Workers/OpenNext plus Sanity to a local Docker Compose stack exposed by Cloudflare Tunnel, with:

- Public website served by a standalone Node Next.js app behind nginx.
- Payload CMS backed by Postgres for blog content, media, contact submissions, and newsletter event logging.
- nginx `limit_req` as the first-line replacement for Cloudflare KV rate limiting.
- Separate staging and production website/CMS hostnames, similar to the `caras.kitchen` deployment.
- No default import of historic D1 contact submissions, because the exported rows appear overwhelmingly spam/attacker probes.

## Current Deployment Inventory

### Cloudflare Worker/OpenNext

Current Cloudflare config lives in `wrangler.jsonc`:

- Worker name: `datasolace-com`
- Worker entrypoint: `.open-next/worker.js`
- Assets directory: `.open-next/assets`
- Compatibility flags:
  - `nodejs_compat`
  - `global_fetch_strictly_public`
- Observability enabled.
- Source maps uploaded.
- Current custom domains:
  - `datasolace.com`
  - `datasolace.co.uk`
  - `datasolace.org`
  - `datasolace.net`

`open-next.config.ts` only defines the default Cloudflare OpenNext config.

`next.config.ts` currently:

- Allows `cdn.sanity.io` images.
- Calls `initOpenNextCloudflareForDev()` for local Cloudflare context in `next dev`.

### Wrangler Inventory

After interactive Wrangler login, these read-only inventory commands succeeded:

- `wrangler whoami`
- `wrangler d1 list`
- `wrangler kv namespace list`
- `wrangler secret list --config wrangler.jsonc`
- `wrangler deployments list --config wrangler.jsonc`

Findings:

- Logged-in account email: `josh.jacobs@datasolace.com`
- Account ID: `be40ecad9605bdcc171bde887cc87d01`
- D1 database:
  - Name: `datasolace-contacts`
  - ID: `eff06927-bc71-4b4f-b05d-b485919924ef`
  - Row count in `contact_submissions`: `56`
- KV namespaces:
  - `RATE_LIMIT_KV` with ID `3851945bafba40b9b3e25879f3ca53dd`
  - `RATE_LIMIT_KV_preview` with ID `3eda35d9628848a69d428c761fe40d27`
- Worker secrets:
  - `wrangler secret list` returned `[]`
  - Note: Worker secret values cannot be read back even when present.
- Deployments listed through `2025-12-17`.

### D1 Export

A D1 SQL export was created locally at:

```text
.local-backups/d1/datasolace-contacts-20260525T155453Z.sql
```

`.local-backups/` is now ignored in `.gitignore`, so the SQL dump should not be committed.

The export contains the `contact_submissions` schema and 56 rows. The rows appear overwhelmingly spam or attacker probes, including SEO spam and apparent XSS, SQL-injection, and header-injection attempts. Recommendation: keep the dump as backup/evidence only and do **not** import these rows into Payload by default.

## Current Application Dependencies

### Cloudflare Runtime Dependencies

Cloudflare-specific runtime usage is concentrated in:

- `src/app/api/contact/route.ts`
  - Uses `getCloudflareContext()`.
  - Requires `env.DB` D1 binding.
  - Optionally uses `env.RATE_LIMIT_KV`.
- `src/app/api/newsletter/route.ts`
  - Uses `getCloudflareContext()`.
  - Optionally uses `env.RATE_LIMIT_KV`.
  - Reads `KIT_API_KEY` and `KIT_WEBHOOK_URL` from environment variables.
- `src/lib/rateLimit.ts`
  - Implements a Cloudflare KV sliding-window rate limiter.
- `env.d.ts`
  - Generated Cloudflare D1/KV types.
- `RATE_LIMITING.md`
  - Documents the current Cloudflare KV-based rate limiting.
- `schema.sql`
  - D1 schema for contact submissions.

### Sanity Dependencies

Sanity usage is concentrated in:

- `src/lib/blog.ts`
  - GROQ queries for blog list, detail, slugs, and related posts.
- `src/sanity/client.ts`
  - `next-sanity` client and Sanity image URL builder.
- `src/app/blog/page.tsx`
  - Renders Sanity-shaped blog post cards.
- `src/app/blog/[slug]/page.tsx`
  - Generates static params from Sanity slugs.
  - Fetches Sanity post details and related posts.
  - Converts inline `sanity://` markdown image references to CDN URLs.
- `next.config.ts`
  - Allows `cdn.sanity.io` for Next images.
- `package.json` / `package-lock.json`
  - Include `next-sanity` and `@sanity/image-url`.

## Sanity Content Discovery

Public Sanity dataset queried:

- Project ID: `9rq2s1dn`
- Dataset: `production`

Findings:

- Published blog posts: `14`
- All currently visible posts use `contentType: markdown`.
- No currently visible rich-text/Portable Text posts were found.
- Inline `sanity://` image references:
  - `37` total references
  - Across `11` posts
- Featured images are Sanity CDN assets and need migration or stable replacement URLs.

Recommendation:

- Payload `BlogPosts` should preserve the current Sanity shape where practical:
  - title
  - unique slug
  - description
  - category
  - publishedAt
  - featured image + alt text
  - excerpt
  - tags
  - contentType
  - markdownContent
- Migration should upload featured images and rewrite inline `sanity://` markdown image references to Payload media URLs or another stable local media URL.
- Keep an optional rich-text field/future migration path, but markdown migration is the near-term path.

## Runtime and Hosting Decision

Recommended public app runtime for Phase 2:

- Run the existing Next.js app as a standalone Node service behind nginx.

Rationale:

- The app currently has API routes for contact and newsletter.
- Blog pages depend on CMS data fetching and route generation.
- Static export would require more redesign and rebuild-hook work up front.
- Node standalone preserves existing dynamic/static behavior better while removing Cloudflare Worker bindings.

Deferred optimization:

- After Payload migration is stable, revisit static export/rebuild hooks if desired.

## Local Stack Topology

Recommended Docker Compose services:

- `postgres`
  - Payload CMS database.
- `payload`
  - CMS/admin/API/media service.
- `public-app`
  - Standalone Node Next.js public website.
- `nginx`
  - Host-aware routing, security headers, caching, public API proxying, and rate limits.
- `cloudflared`
  - Cloudflare Tunnel ingress.

Recommended production hostnames:

- `datasolace.com` -> public Next app through nginx.
- Existing alternate domains can be routed/redirected as desired:
  - `datasolace.co.uk`
  - `datasolace.org`
  - `datasolace.net`
- `cms.datasolace.com` -> Payload CMS/admin/API, protected by Cloudflare Access.

Recommended staging hostnames:

- `staging.datasolace.com` -> staging public website.
- `staging-cms.datasolace.com` -> staging Payload CMS/admin/API, protected by Cloudflare Access.

Staging requirements:

- Separate staging Postgres volume/database.
- Separate staging media volume.
- Separate staging env/secrets.
- Staging CMS protected independently from production CMS.
- Production data may be copied into staging only through explicit ignored backup/restore/import steps.

## D1/KV Replacement Decision

### Durable Data

Replace D1 with Payload/Postgres:

- New contact submissions go to Payload/Postgres.
- Newsletter attempts/signups can be logged in Payload/Postgres.
- Blog content and media move from Sanity to Payload/Postgres/media storage.

Do not import the 56 historic D1 contact rows by default because they appear to be spam/attacker probes.

### Rate Limiting

Replace Cloudflare KV rate-limit counters with nginx `limit_req` first:

- Protect `/api/contact`.
- Protect `/api/newsletter`.
- Return JSON 429 responses compatible with existing frontend handling where possible.

Do not migrate KV data:

- Current KV namespace is only for ephemeral rate-limit counters.
- `wrangler kv key list --prefix rate_limit:` returned no keys at discovery time.

Defer Valkey/Redis or Postgres app-level counters unless Phase 2 requires precise dynamic retry-after/reset metadata or shared quotas that nginx cannot provide cleanly.

## Payload Schema Recommendation

Recommended collections:

### Users

- Payload auth users for CMS/admin.

### Media

- Required `alt` field.
- Image sizes similar to `caras.kitchen`:
  - thumbnail/card/square/hero/large or DataSolace-specific equivalents.
- Public read access for media needed by the public website.

### BlogPosts

Fields:

- `title`
- `slug` unique
- `description`
- `category`
- `excerpt`
- `tags`
- `featuredImage` relation to Media
- `contentType`
- `markdownContent`
- optional future rich-text field
- `publishedAt`
- drafts/versions if useful for editorial workflow

### ContactSubmissions

For new submissions only by default.

Fields based on D1 schema plus operational metadata:

- `firstName`
- `lastName`
- `email`
- `phone`
- `newsletter`
- `message`
- `status`
- `requestId`
- `ipHash` or similar privacy-safe request identifier
- `userAgent`
- timestamps

Security note:

- Admin display must safely handle attacker-style payloads such as XSS strings, SQL-like strings, and header-injection attempts.

### NewsletterEvents or NewsletterSignups

Recommended to record Kit.com attempts/results:

- `email`
- `newsletterId`
- `status`
- `provider`
- `providerResponseId` or equivalent
- `errorCode`
- `errorDetail`
- timestamps

Optional future collections/globals:

- `SiteSettings`
- `PortfolioItems`
- `Services`

These can be deferred unless the Phase 2 scope expands beyond blog/forms/CMS migration.

## Secrets and Environment Variables

Existing `.env.local` contains these keys:

- `KIT_API_KEY`
- `KIT_WEBHOOK_URL`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`

Phase 2 local deployment will need out-of-band values for at least:

- `POSTGRES_PASSWORD`
- `PAYLOAD_SECRET`
- Payload admin bootstrap email/password or setup procedure
- Payload internal API token/credentials if the public app talks to Payload via authenticated routes
- `KIT_API_KEY`
- `KIT_WEBHOOK_URL`
- Cloudflare tunnel credentials or token
- staging equivalents for secrets and database/media volumes

Do not commit secret values.

## Backup and Restore Requirements

Ignored local backup path chosen during discovery:

```text
.local-backups/
```

Phase 2 should include backup/restore procedures for:

- Production Postgres.
- Production Payload media volume.
- Staging Postgres/media restore rehearsals.
- Sanity export/import artifacts.
- Existing D1 SQL export retained as backup/evidence.

Validation should include restoring backups into a disposable local or staging stack.

## Phase 2 Plan Updates Made

The Phase 2 implementation plan was updated to include:

- Standalone Node Next.js runtime behind nginx.
- Payload/Postgres durable storage.
- nginx rate limiting instead of KV.
- No default D1 contact import.
- Stronger form-abuse protections.
- Sanity migration counts and inline image rewrite requirement.
- Staging public website and staging CMS/admin hostnames.
- Isolated staging database/media volumes and secrets.
- Cloudflare Access protection for staging and production CMS/admin.

## Open Items for Phase 2 Review

Before coding Phase 2, confirm:

- Final staging hostnames:
  - proposed `staging.datasolace.com`
  - proposed `staging-cms.datasolace.com`
- Final production CMS hostname:
  - proposed `cms.datasolace.com`
- Whether alternate public domains should redirect to `datasolace.com` or serve the same app.
- Whether contact form newsletter checkbox should only log intent or also trigger Kit signup.
- Whether to add honeypot/Turnstile during the local form rewrite.
- Exact Cloudflare Access policy membership for CMS/admin hostnames.
- Where production backups should ultimately be stored beyond `.local-backups/`.
