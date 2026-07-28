---
title: "Clean Up Legacy Cloudflare Worker and Sanity Artifacts"
slug: legacy-worker-sanity-cleanup
created_at: 2026-05-25T20:12:25.669Z
status: completed
---

## Goal
Remove or archive the obsolete Cloudflare Workers/OpenNext, D1/KV, and Sanity integration artifacts now that DataSolace production is served by the local Docker/Payload/nginx/Cloudflare Tunnel stack, while preserving rollback evidence. Use Sanity project archiving as an intermediate offline checkpoint before any final Sanity deletion, and avoid deleting remote Cloudflare resources until explicitly confirmed.

## Constraints
- Production currently serves through Cloudflare Tunnel to local `nginx`; do not change working production tunnel routes except as part of explicit legacy Worker route cleanup validation.
- Keep rollback available until the user explicitly confirms remote Worker/D1/KV/Sanity resource deletion is acceptable; local repo cleanup can happen before remote resource deletion, but remote destructive operations should be separately confirmed.
- Use Sanity project archiving, not immediate deletion, as the first remote Sanity action: archive blocks API/CDN access without permanently deleting the project, allowing live-site verification before final deletion.
- Export or otherwise preserve the Sanity dataset/project evidence before archiving or deleting, so the project can be compared/reactivated if needed.
- Do not remove Payload CMS, Postgres, nginx, cloudflared, staging, backup/restore, or migration documentation needed by the new stack.
- Do not delete ignored local backups such as `.local-backups/`; they include historic D1 spam/probe evidence and local Payload backups.
- Do not commit secrets, `.env`, `tunnel_token`, Cloudflare credentials, local backups, `node_modules`, or build artifacts.
- Prefer Docker-based validation/builds where practical; if dependency lockfile updates require local npm for pre-commit, clean local artifacts afterwards.
- Keep the Sanity migration script under `cms/scripts/migrate-from-sanity.ts` until after the user confirms no further Sanity re-import/reconciliation is needed, or explicitly move/archive it rather than deleting accidentally.
- The Kit newsletter follow-up is covered by a separate draft plan and should not be mixed into this cleanup except where legacy Worker dependencies overlap.

## Relevant Files
- package.json - still contains Cloudflare/OpenNext/Sanity dependencies, metadata, and scripts (`deploy`, `preview`, `cf-typegen`) that should be removed or replaced.
- package-lock.json - must be updated after removing obsolete dependencies/scripts from `package.json`.
- wrangler.jsonc - legacy Worker, D1, KV, Sanity vars, and custom domain route configuration; should be archived or removed after remote route safety is confirmed.
- open-next.config.ts - legacy OpenNext Cloudflare config no longer used by the Docker/standalone deployment.
- env.d.ts - large Wrangler-generated Cloudflare Worker binding types for D1/KV/assets; no longer needed by runtime TypeScript after migration.
- schema.sql - legacy D1 contact-submissions schema retained only as historical reference/evidence unless archived.
- RATE_LIMITING.md - legacy Cloudflare KV rate-limiting documentation replaced by nginx rate limiting.
- src/sanity/client.ts - obsolete Sanity client/image builder now that blog reads come from Payload.
- src/lib/blog.ts - should be checked to ensure there are no remaining Sanity imports or Sanity URL dependencies before deleting Sanity packages.
- cms/scripts/migrate-from-sanity.ts - current one-time migration utility; decide whether to keep, archive, or mark as historical rather than delete prematurely.
- docs/deployment/payload-local-stack.md - update to document legacy cleanup status and rollback/deletion checkpoints.
- .gitignore and .dockerignore - ensure ignored backup/secret/build artifacts remain protected after cleanup.
- Sanity Manage project settings - archive the legacy project as an offline checkpoint before any deletion, then verify the site does not depend on Sanity API/CDN access.
- Cloudflare dashboard Worker/custom domains, D1 database, KV namespace, and Sanity project - remote resources to audit and optionally disable/delete only after explicit confirmation.

## Plan
- [x] Audit the repo and dependency graph for remaining references to `@opennextjs/cloudflare`, `wrangler`, `next-sanity`, `@sanity/image-url`, `wrangler.jsonc`, `open-next.config.ts`, `env.d.ts`, D1, KV, and `src/sanity/client.ts`; record any live references before removing files.
- [x] Verify current production and staging tunnel routes are healthy and capture a fresh local Payload backup before making cleanup changes, so rollback remains possible.
- [x] Remove or archive obsolete local Worker/OpenNext/D1/KV files: `wrangler.jsonc`, `open-next.config.ts`, `env.d.ts`, `schema.sql`, and `RATE_LIMITING.md`, replacing them with updated deployment docs that point to Payload/Postgres/nginx/cloudflared and the follow-up remote cleanup process.
- [x] Remove obsolete Sanity runtime code and dependencies once `src/lib/blog.ts` and pages are confirmed Payload-only: delete `src/sanity/client.ts`, remove `next-sanity` and `@sanity/image-url`, and document the status of `cms/scripts/migrate-from-sanity.ts` as a historical one-time migration utility or archive it if approved.
- [x] Update `package.json` scripts and metadata to remove Worker/OpenNext deployment commands and Cloudflare template metadata; keep only Docker/Next scripts that are still useful for local validation/pre-commit.
- [x] Regenerate/update `package-lock.json` consistently after dependency removal, using npm with the same supply-chain policy where practical, and remove any local `node_modules`/`.next` artifacts after validation.
- [x] Run validation: TruffleHog/pre-commit, lint/type/build checks, Docker public/CMS image build checks if affected, and live smoke tests against `datasolace.com`, `cms.datasolace.com`, staging, forms, blog, media, and alternate-domain redirects.
- [x] Prepare a remote Cloudflare cleanup checklist for user confirmation: disable/remove old Worker custom domains/routes if still present, verify tunnel routes remain active, then only later delete or archive the Worker, D1 database, and KV namespace according to the user's retention preference.
- [x] Prepare a Sanity decommission checklist for user confirmation: preserve/export the dataset first, archive the Sanity project in Manage to block API/CDN access without permanent deletion, run live-site and repo checks while archived, then delete the project only after the user confirms the archive trial found no dependency.
- [x] Commit the local cleanup with a completed plan file and relevant code/docs changes only; do not push and do not perform destructive remote deletion unless the user explicitly asks.

### Progress Notes
- 2026-05-26T08:40:09Z: Also removed cdn.sanity.io from Next image remotePatterns so archived Sanity/CDN access failures surface instead of being silently permitted.
- 2026-05-26T16:01:59Z: User chose not to complete/commit yet; plan remains active with local cleanup changes validated but uncommitted, and remote Sanity/Cloudflare cleanup documented as pending manual action.
- 2026-05-26T16:04:40Z: User reports the legacy Sanity project has been archived and verified via API; rerunning post-archive repo/live-site/Sanity checks before final completion.
- 2026-05-26T16:05:04Z: Post-archive checks passed: Sanity API now returns 402 Project Disabled; active repo grep found only retained migration/traceability references; live production/staging/blog/media/CMS Access/alternate-domain probes still pass.
- 2026-05-26T16:06:45Z: User confirmed not to finalize/commit yet after post-Sanity-archive checks; plan remains active and local cleanup changes remain uncommitted.
- 2026-05-26T19:16:57Z: After user deleted the legacy Cloudflare Worker/resources, re-smoke passed: Docker services healthy, production/staging pages/media/API validation/CMS Access/alternate redirects pass, and Sanity remains archived with 402 Project Disabled.

## Validation
- [x] No tracked source file imports `next-sanity`, `@sanity/image-url`, `@opennextjs/cloudflare`, `wrangler`, `src/sanity/client.ts`, `env.d.ts`, D1, or Cloudflare KV runtime bindings after cleanup.
- [x] `package.json` no longer advertises Cloudflare Worker template metadata or Worker/OpenNext deploy/preview/typegen scripts that are not used by the new stack.
- [x] `package-lock.json` reflects removal of obsolete Worker/OpenNext/Sanity packages without introducing unrelated dependency churn.
- [x] Legacy files are removed or archived intentionally: `wrangler.jsonc`, `open-next.config.ts`, `env.d.ts`, `schema.sql`, `RATE_LIMITING.md`, and `src/sanity/client.ts` are not left as misleading active configuration.
- [x] Deployment docs clearly state that production now runs through Cloudflare Tunnel to local nginx/Payload and that remote Worker/D1/KV/Sanity deletion is a separate explicit-confirmation step.
- [x] A fresh local Payload backup exists before cleanup and ignored backup/secret files remain untracked.
- [x] Docker stack remains healthy for production and staging after cleanup, including `postgres`, `payload`, `public-app`, `nginx`, `staging-*`, and `cloudflared`.
- [x] Live production smoke tests still pass for homepage, services, portfolio, appointments, privacy, blog, robots.txt, sitemap.xml, representative media, contact form, and CMS Access redirect.
- [x] Alternate domains `datasolace.co.uk`, `datasolace.org`, and `datasolace.net` still redirect canonically to `datasolace.com`.
- [x] Pre-commit checks pass with TruffleHog installed and no secrets are staged.
- [x] Sanity project is either left active pending user action, archived and verified with live-site checks, or deleted only after explicit user confirmation; there is no ambiguous half-decommissioned state.
- [x] If Sanity is archived, API/CDN access is confirmed blocked and the site remains healthy without Sanity.
- [x] Remote Cloudflare cleanup is either explicitly performed and verified, or documented as pending with no ambiguous half-deleted state.

## Risks
- Removing `wrangler.jsonc` or Worker scripts too early can make emergency rollback harder if the old Worker route must be redeployed quickly.
- Some dependencies may appear unused but still be required by old docs, examples, or migration scripts; audit before removal to avoid breaking the Sanity migration archive path.
- Archiving Sanity intentionally blocks API/CDN access; any hidden runtime dependency on Sanity will surface as broken content or failed checks and may require reactivation.
- Deleting remote Worker/D1/KV/Sanity resources is irreversible or slow to recover; require explicit user confirmation and fresh exports/backups before any destructive dashboard/API action.
- Lockfile updates can create large diffs or pull new transitive versions if not controlled; use `npm ci`/lockfile workflows carefully and validate builds.
- Cloudflare may still have hidden custom domain bindings or routes attached to the Worker even after tunnel cutover; cleanup must not disturb active tunnel routes.
- Generated `env.d.ts` removal could surface TypeScript references that were masked by global Cloudflare types; fix those intentionally rather than reintroducing Worker bindings.
- Leaving stale docs around can cause future operators to deploy the wrong stack or recreate D1/KV resources.
- Remote Sanity project deletion before confidence could eliminate a useful source-of-truth comparison for migrated blog content.
