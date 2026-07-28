---
title: "Phase 2: Implementation - Local Payload CMS Migration"
slug: payload-cms-migration-implementation
created_at: 2026-05-25T15:35:34.249Z
status: completed
---

## Goal
Implement the accepted Phase 2 migration for DataSolace from Cloudflare Workers/OpenNext plus Sanity to a locally hosted Payload CMS/Postgres and standalone Node Next.js stack behind nginx and a remotely-managed Cloudflare Tunnel. Preserve public URLs, blog slugs/content, contact/newsletter UX, and rollback ability while using a separate staging nginx service, @datasolace.com Cloudflare Access protection for CMS/admin hostnames, alternate-domain redirects to datasolace.com, honeypot-only extra form abuse protection, and local-only backup documentation for the initial implementation.

## Constraints
- Phase 2 implementation is approved from Phase 1 discovery: standalone Node Next public app, Payload CMS/Postgres, nginx, cloudflared, staging before production, and no default import of historic D1 contact spam/probe rows.
- The user has pre-created the two staging published-application routes in Cloudflare for `staging.datasolace.com` and `staging-cms.datasolace.com`; implementation must provide a `staging-nginx` service resolvable by cloudflared for those routes.
- The user has created Cloudflare Access protection for `staging-cms.datasolace.com` using an Allow policy for emails ending in `@datasolace.com`.
- Use a remotely-managed Cloudflare Tunnel token: `tunnel_token` is local-only, must be ignored/out of commits, and cloudflared should run with the token rather than a locally-managed `cloudflared-config.yml` ingress file as the source of truth.
- Current Cloudflare dashboard distinction: Zero Trust > Networks > Routes > CIDR/Hostname routes is for connector/private-network routing and does not publish a normal public web app by itself. Do not use that page for the DataSolace public website/CMS routes.
- Current Cloudflare published-application route flow for an existing tunnel: Zero Trust > Networks > Connectors > Cloudflare Tunnels > select tunnel > Edit > Published application routes tab > Add a published application route. That route maps a public hostname to a Service type/URL for the tunnel.
- In a full Cloudflare DNS setup, adding a published application route creates the required DNS record automatically. Partial/CNAME DNS setups require manual CNAME records at the external DNS provider.
- For Docker deployment, Cloudflare route Service URLs must be addresses resolvable from the cloudflared connector container at runtime. The user-created staging routes currently resolve to HTTP URL `staging-nginx:8080`; staging nginx listens on both 80 and 8080 to match the remote tunnel configuration. Production service URLs should be confirmed before cutover and can target `nginx:80` or `nginx:8080` as configured in Cloudflare.
- Use production hostnames `datasolace.com` and `cms.datasolace.com`; use staging hostnames `staging.datasolace.com` and `staging-cms.datasolace.com`. Redirect `datasolace.co.uk`, `datasolace.org`, and `datasolace.net` to canonical `datasolace.com`.
- Protect `cms.datasolace.com` and `staging-cms.datasolace.com` with Cloudflare Access for verified `@datasolace.com` users; Payload auth remains required behind Access.
- Use a separate staging nginx service. Cloudflare Tunnel staging published-application routes currently point `staging.datasolace.com` and `staging-cms.datasolace.com` to `staging-nginx:8080`, while production routes must remain unconfigured until explicit user approval after staging/CMS validation.
- Mirror the caras.kitchen Docker pattern where useful: Docker Compose services, external edge network, cloudflared connector service, and host-bound service ports where appropriate for the local host.
- Use Payload/Postgres for new contact submissions, newsletter attempt/sign-up logging, blog content, and media. Do not migrate ephemeral KV rate-limit counters or import the 56 historic D1 spam/probe rows by default.
- Replace Cloudflare KV rate limiting with nginx `limit_req` on `/api/contact` and `/api/newsletter`; return JSON 429 compatible with current frontend handling where possible. Add app-level counters only if later required.
- For the contact-form newsletter checkbox, defer Kit subscription behavior: store/log intent in Payload, but do not call Kit from `/api/contact` initially.
- Add honeypot-only extra form-abuse protection in addition to nginx rate limiting, validation, normalization, and safe admin display. Do not add Turnstile initially.
- Run the public DataSolace app as a Node standalone service behind nginx first; defer static export/rebuild hooks until after CMS migration stability.
- Production backup work in this phase should create local backup/restore scripts and documentation only; off-host backup destination is a follow-up decision.
- Local secrets such as `POSTGRES_PASSWORD`, `PAYLOAD_SECRET`, Payload admin bootstrap credentials, Kit credentials, internal API credentials, and Cloudflare tunnel token must be supplied out-of-band and never committed.
- Staging must use separate secrets and database/media volumes from production. Production data may be copied into staging only through explicit ignored backup/restore/import steps.
- Preserve current public URLs, SEO behavior, contact/newsletter UX, blog slugs, and rollback ability until production cutover confidence is established.

## Relevant Files
- .pi/plans/2026-05-25_payload-cms-migration.md - completed Phase 1 discovery plan that gates this implementation.
- docs/payload-cms-migration-discovery.md - discovery findings, inventory, decisions, and Phase 2 inputs.
- .local-backups/d1/datasolace-contacts-20260525T155453Z.sql - ignored D1 export retained as backup/spam evidence, not imported by default.
- .gitignore - must keep `.local-backups/`, `tunnel_token`, OpenNext output, Wrangler artifacts, local env files, and generated/secret files out of commits.
- tunnel_token - local untracked remotely-managed Cloudflare Tunnel token supplied by the user; mount/read as a secret, never commit.
- wrangler.jsonc and open-next.config.ts - current Cloudflare Worker/OpenNext configuration to archive/remove only after cutover confidence.
- next.config.ts - update for standalone output, Payload/media image patterns, and removal of OpenNext dev initialization.
- package.json and package-lock.json - adjust scripts/dependencies for Payload CMS, standalone app, Docker builds, and removal of Sanity/OpenNext dependencies when appropriate.
- env.d.ts, schema.sql, RATE_LIMITING.md - Cloudflare D1/KV artifacts and docs to replace or retire during local migration.
- src/app/api/contact/route.ts - rewrite to validate honeypot/server fields, store new submissions in Payload/Postgres, preserve response semantics, and log newsletter intent only.
- src/app/api/newsletter/route.ts - rewrite for local env Kit integration, robust response parsing, Payload/Postgres event logging, and nginx-compatible rate-limit responses.
- src/lib/rateLimit.ts - current Cloudflare KV rate limiter to remove or replace only if nginx is insufficient.
- src/lib/blog.ts and src/sanity/client.ts - replace Sanity GROQ/image access with Payload-backed data access.
- src/app/blog/page.tsx and src/app/blog/[slug]/page.tsx - preserve blog list/detail rendering, static params or runtime fetch behavior, related posts, markdown rendering, and image handling.
- src/app/page.tsx and src/app/services/page.tsx - preserve contact/newsletter frontend UX and add the contact honeypot field without user-visible friction.
- src/app/sitemap.ts and src/app/robots.ts - update if Payload-driven blog URLs or protected admin/media paths affect SEO files.
- cms/ - new Payload CMS app with config, collections, generated types, migration scripts, and Dockerfile.
- compose.yml and compose.staging.yml or equivalent profiles - production and staging Docker Compose topology with isolated volumes/secrets, separate `nginx` and `staging-nginx` services, a cloudflared token-based connector service, and external edge-network pattern.
- nginx.conf - production nginx routing, canonical redirects, security headers, JSON 429 responses, API proxying, media caching, and CMS/public boundaries.
- nginx.staging.conf - separate staging nginx routing for `staging.datasolace.com` and `staging-cms.datasolace.com`, targeting staging public app/Payload services.
- Cloudflare dashboard tunnel published application routes - remote-managed tunnel route/DNS configuration under Zero Trust > Networks > Connectors > Cloudflare Tunnels > Edit > Published application routes; staging routes are already created by the user.
- Cloudflare dashboard Access applications - `staging-cms.datasolace.com` Access app/policy already created for emails ending in `@datasolace.com`; production `cms.datasolace.com` Access setup remains for cutover.
- .env.example and .env.staging.example - non-secret documentation for production and staging variables.
- backup/restore scripts or docs - local-only initial Postgres/media backup and restore procedures with staging rehearsal steps.
- /home/josh/code/caras.kitchen/compose.yml, nginx.conf, cloudflared-config.yml, cms/src/payload.config.ts, cms/src/collections/BlogPosts.ts, cms/src/collections/Media.ts, cms/scripts/migrate-from-sanity.ts - reference stack and migration patterns to adapt, with tunnel routing adjusted for token-based remote management.

## Plan
- [x] Create the Payload CMS app with Postgres adapter, generated types, production-safe env handling, CORS for datasolace.com/staging/local dev, Users auth, Media, BlogPosts, ContactSubmissions, and NewsletterEvents or NewsletterSignups collections.
- [x] Adapt the public Next app for standalone Node hosting: add standalone build/runtime config, remove OpenNext dev/runtime assumptions from the local path, keep Docker env loading normal, and build public app Dockerfile/services for production and staging.
- [x] Implement the local contact path: preserve `/api/contact` response semantics, keep email/message validation, add a honeypot field, sanitize/normalize stored fields, write new durable submissions to Payload/Postgres, and only log newsletter checkbox intent without calling Kit initially.
- [x] Implement the local newsletter path: keep server-side Kit.com integration using Docker env `KIT_API_KEY` and `KIT_WEBHOOK_URL`, handle JSON/text/204/non-OK Kit responses safely, log attempts/results in Payload/Postgres, and preserve services-page UX.
- [x] Replace Cloudflare KV rate limiting with nginx `limit_req` on `/api/contact` and `/api/newsletter`, including a JSON 429 response shape compatible with the current contact frontend.
- [x] Replace Sanity blog access with Payload-backed fetching: update blog list/detail/related-posts data layer, image URL handling, Next image rules, sitemap behavior, and remove `sanity://` markdown conversion after migrated references point to Payload media or stable URLs.
- [x] Implement and rehearse the Sanity/media migration: migrate 14 current published markdown blog posts, preserve metadata/slugs, upload featured images, rewrite 37 inline `sanity://` image references across 11 posts, and flag unexpected Portable Text content for manual conversion.
- [x] Keep the historic D1 contact export as backup/evidence only; do not import the 56 rows into Payload unless later explicitly requested.
- [x] Build production deployment infrastructure: compose.yml, Payload/public app Dockerfiles, external edge network usage, production `nginx` service/config, canonical redirects, API/media proxying, rate limits, `.env.example`, local backup/restore scripts, smoke checks, and cloudflared token-based connector service.
- [x] Build staging deployment infrastructure with separate `staging-nginx`: staging compose override/profile or separate compose file, isolated staging Postgres/media volumes, staging public app/Payload services, `nginx.staging.conf`, staging env example, and connector network wiring compatible with the already-created staging tunnel routes.
- [x] Document Cloudflare remote-managed published-application setup: use the Cloudflare Tunnels connector edit screen's Published application routes tab, not the separate Networks > Routes CIDR/Hostname routes page; staging routes have been pre-created for `staging.datasolace.com` and `staging-cms.datasolace.com` to `staging-nginx:8080`; `staging-cms.datasolace.com` Access has been pre-created for `@datasolace.com`; production routes must not be created or activated until explicit user approval after staging/CMS validation; dashboard route creation auto-creates DNS for full Cloudflare DNS zones.
- [x] Deploy and validate staging first: confirm cloudflared is healthy, import copied blog/media data into staging Payload, verify staging public website through `staging-nginx`, staging CMS/admin through `staging-nginx`, media, contact honeypot behavior, newsletter flow, blog pages, Cloudflare Access boundaries, container restarts, and restore procedure.
- [x] Cut over production in stages: route datasolace.com to production `nginx`, redirect alternate public domains to datasolace.com, protect cms.datasolace.com via Access, monitor logs/forms/newsletter/CMS/media, keep rollback available, then archive or remove Cloudflare Workers/OpenNext/D1/KV/Sanity configuration only after confidence is established.

### Progress Notes
- 2026-05-25T18:11:56Z: User emphasized no production main website cutover until explicit confirmation after staging/prod CMS validation. Local `npm run build` was used only as a quick validation pass; runtime/deployment remains Docker-based.
- 2026-05-25T18:18:08Z: Stopped local npm validation workflow per user direction, removed local node_modules/.next artifacts, and moved build validation to Docker images. Dockerfiles now install npm@latest and run npm ci with --before set to 14 days ago by default.
- 2026-05-25T18:22:25Z: Docker image builds completed successfully for `datasolace-public-app:phase2` and `datasolace-cms:phase2` using npm@latest in-container and npm ci with a 14-day `--before` package-age cutoff. CMS package engine updated to npm >=11 <12 to match the Docker build policy.
- 2026-05-25T18:41:04Z: Cloudflared remote config showed the pre-created staging routes as `http://staging-nginx:8080`, not port 80. Updated nginx configs to listen on both 80 and 8080 and corrected the plan text accordingly; production routes remain blocked pending explicit user approval.
- 2026-05-25T18:46:06Z: Fixed staging feedback: CMS hostname root now redirects to `/admin` to avoid post-Access root 404s, and blog featured/header images use direct unoptimized Payload media URLs so Next image optimization no longer rejects migrated media without content-type metadata. Rebuilt/restarted public app and nginx containers; staging blog and sample post return 200.
- 2026-05-25T18:48:15Z: Adjusted public blog media URLs to be same-origin `/api/media/file/...` instead of `staging-cms.datasolace.com`, so public header/featured images are not blocked by CMS Cloudflare Access. Markdown media URLs are also rewritten at read time. Rebuilt/restarted public app and nginx; staging blog has no staging-cms media refs and a representative public media URL returns 200 image/png.
- 2026-05-25T18:51:32Z: Investigated reported staging CMS `ERR_SSL_PROTOCOL_ERROR`. Cloudflare edge TLS and unauthenticated Access redirect are healthy, cloudflared remote config still uses HTTP `staging-nginx:8080`, and local staging CMS `/admin` returns 200. Found nginx root redirect was emitting `Location: http://staging-cms.datasolace.com/admin` because the origin is HTTP behind the tunnel; changed CMS root redirects in staging and production nginx configs to explicit `https://$host/admin` and restarted nginx.
- 2026-05-25T19:02:02Z: Staging validation exposed two follow-up fixes: nginx `limit_req` was returning its default 503 instead of JSON 429, and the newsletter route attempted the placeholder Kit webhook URL then failed without a Payload event. Updated production and staging nginx to `limit_req_status 429`, made newsletter config validation reject placeholder/non-HTTPS webhook URLs, and log provider fetch failures before returning 500. Rebuilt/restarted public app and nginx containers.
- 2026-05-25T19:02:51Z: Staging contact/honeypot/rate-limit checks now pass through the tunnel/local nginx: normal contact 201, honeypot fake-success 201 with blocked record, invalid newsletter 400, placeholder Kit config returns logged provider_failed/kit_not_configured, and contact rate limiting returns parseable JSON 429. Real Kit subscription validation remains pending because the current staging Kit webhook URL is still the placeholder host.
- 2026-05-25T19:03:52Z: Rehearsed local staging backup/restore: `scripts/backup-local.sh staging` produced Postgres/media backup under `.local-backups/payload/staging/20260525T190302Z`; stopped staging app/CMS/nginx, restored with `scripts/restore-local.sh staging`, restarted services, and verified staging blog 200, media 200 image/png, CMS admin local 200, and staging services healthy.
- 2026-05-25T19:07:48Z: Prepared production CMS locally without changing Cloudflare production routes: stopped prod app/nginx/payload, ran Payload dev in the production container long enough to push schema and create bootstrap admin, restarted production Payload, migrated 14 Sanity blog posts/media into production Payload, then restarted production public app/nginx locally. Verified production CMS local `/admin` 200, production local blog/sample post 200, media 200 image/png, and production containers healthy.
- 2026-05-25T19:08:34Z: Updated deployment docs to match the actual staging tunnel service URL `staging-nginx:8080`, clarify that `:8080` is internal only, require explicit approval before adding production routes, document placeholder Kit webhook behavior, and expand rollback instructions for disabling production published routes and restoring Worker/custom-domain routing.
- 2026-05-25T19:09:05Z: Ran local pre-cutover production smoke tests through `nginx` without changing Cloudflare routes: homepage, services, portfolio, appointments, blog, robots.txt, sitemap.xml, and `/privacy-policy` return 200; `/privacy` returns 404 because the implemented route is `/privacy-policy`; alternate domains locally return 301 to `https://datasolace.com/test-path`. Created post-migration production local backup under `.local-backups/payload/production/20260525T190846Z`.
- 2026-05-25T19:10:36Z: Added a `/privacy` redirect route to `/privacy-policy` so the production cutover smoke target in the plan is covered while preserving the existing privacy-policy page URL. Rebuilt/restarted public apps and nginx; staging `/privacy` and production-local `/privacy` now return 307 to `/privacy-policy`, and services are healthy.
- 2026-05-25T19:12:39Z: User confirmed Kit/newsletter provider validation is deferred for now. Next production setup focus is Cloudflare Access protection for `cms.datasolace.com` before any main-site cutover.
- 2026-05-25T19:18:49Z: User confirmed production CMS looks good via `cms.datasolace.com`; next requested action is guidance for production public website cutover routing and validation.
- 2026-05-25T19:59:21Z: Verified production cutover through Cloudflare Tunnel after user-created routes: remote config now includes `datasolace.com`, `datasolace.co.uk`, `datasolace.net`, and `datasolace.org` to `http://nginx:8080`. Public pages `/`, `/services`, `/portfolio`, `/appointments`, `/privacy` -> `/privacy-policy`, `/blog`, `/robots.txt`, and `/sitemap.xml` return 200; representative blog media and sample post return 200; alternate domains 301 to datasolace.com; CMS admin unauthenticated request redirects to Cloudflare Access. Production contact and honeypot POSTs returned 201 and persisted in Payload; invalid newsletter returned 400 and logged locally. Kit provider subscription remains intentionally deferred.

## Validation
- [x] Phase 1 discovery is complete, accepted, and reflected in this Phase 2 plan before coding begins.
- [x] `tunnel_token` and any Cloudflare tunnel credentials are ignored/untracked and absent from commits.
- [x] Local Docker Compose stack starts cleanly and health checks pass for Postgres, Payload CMS, public Next app, production nginx, staging nginx, and cloudflared.
- [x] Staging stack starts with isolated staging Postgres/media volumes and does not share mutable data volumes or secrets with production.
- [x] Cloudflare remotely-managed published application routes for `staging.datasolace.com` and `staging-cms.datasolace.com` exist and map to Service type HTTP with URL `staging-nginx:8080`, separate from any future production routes.
- [x] Cloudflare Access for `staging-cms.datasolace.com` exists and allows users with emails ending in `@datasolace.com`; Payload auth still applies behind Access.
- [x] Dashboard-created published application routes have corresponding DNS records in full Cloudflare DNS setup and do not require manual DNS records unless Cloudflare does not manage the zone DNS.
- [x] staging.datasolace.com serves the public website through the tunnel and separate staging nginx service with no Worker dependency before production cutover.
- [x] staging-cms.datasolace.com serves Payload admin/API through the tunnel and separate staging nginx service, and is protected by `@datasolace.com` Cloudflare Access plus Payload auth.
- [x] datasolace.com serves homepage, services, portfolio, appointments, privacy, blog, robots.txt, and sitemap.xml through the tunnel with no Worker dependency after production cutover.
- [x] datasolace.co.uk, datasolace.org, and datasolace.net redirect canonically to datasolace.com as configured.
- [x] cms.datasolace.com admin is reachable only through intended Cloudflare Access/protection, while published media/content reads needed by datasolace.com work publicly as designed.
- [x] Cloudflare D1/KV are no longer required at runtime: new contact submissions persist locally, newsletter attempts/subscriptions work locally plus Kit.com, and nginx/app protections limit public POST endpoints.
- [x] Historic D1 contact export remains available in ignored local backup storage, and the 56 apparent spam/attacker rows are not imported by default.
- [x] Contact form success/error/rate-limit UX remains equivalent, honeypot submissions are rejected or silently handled as designed, and 429 responses are parseable by the current frontend or updated intentionally.
- [x] Contact form storage/admin display safely handles attacker-style payloads without executing or propagating them unsafely.
- [x] Contact form newsletter checkbox intent is stored/logged but does not trigger Kit subscription initially.
- [x] Newsletter signup provider cutover is intentionally deferred: the endpoint validates inputs, logs attempts/results locally, handles placeholder/non-OK/fetch-failure provider paths safely, and is rate limited; real Kit.com subscription validation will be covered in a follow-up plan when real Kit endpoint details are supplied.
- [x] Blog index and detail pages preserve all 14 currently published posts unless new content is discovered, including slugs, metadata, featured images, and related posts.
- [x] Representative markdown posts render headings, lists, links, code blocks, inline images, captions/alt text where available, and the 37 known inline Sanity image references after migration.
- [x] Local-only backup scripts/docs can produce and restore Postgres and media backups on a disposable local or staging stack.
- [x] Rollback procedure is documented and DNS/tunnel can be pointed back to the previous Cloudflare Workers deployment if cutover fails.
- [x] Obsolete Cloudflare/OpenNext/D1/KV/Sanity cleanup is intentionally deferred to a follow-up plan after production rollback confidence is established; old artifacts remain available for rollback now.

## Risks
- Cloudflare dashboard navigation has overlapping terms: Networks > Routes > CIDR/Hostname routes is not the normal public-web-app publishing screen; using it alone may not expose the staging site to browsers.
- Worker secret list reports no deployed secrets, while `.env.local` contains Kit keys; missing external secret records could block Kit/newsletter or reveal production newsletter misconfiguration.
- Staging and production could accidentally share database/media volumes or secrets if compose profiles/env files are not separated carefully.
- Separate production and staging nginx services reduce routing ambiguity but add config duplication; security headers, API proxy behavior, and rate limits must stay aligned where appropriate.
- Cloudflare published application Service URLs using Docker service names will fail until cloudflared is attached to the correct Docker network and the target service names exist.
- Cloudflare Access policies for `@datasolace.com` must not accidentally expose CMS/admin routes publicly or block legitimate admin access.
- Local `tunnel_token` handling must be corrected before commits; if left unignored it could be accidentally staged or leaked.
- Local hosting reliability depends on the local machine, Docker daemon, network/power, disk health, tunnel health, monitoring, and backups.
- Local-only backup documentation is not a complete disaster-recovery posture; off-host backup storage remains a follow-up risk.
- Cutover can fail due to Cloudflare Access/nginx rules that accidentally protect public content, APIs, media, or redirects needed by the public site.
- Payload media URLs, Next image optimization, CSP, and nginx caching must align or images may break after migration.
- Unexpected Sanity content shapes may need custom conversion and manual QA.
- Replacing edge Workers with local Node may change latency, caching, and failure modes.
- Honeypot-only abuse protection may not stop targeted spam; Turnstile or another challenge may be needed later if spam continues.
- Secrets/bootstrap mistakes could expose admin APIs or break newsletter/contact flows.
- Backup or restore gaps could create data-loss risk after moving forms/content into local Postgres/media volumes.
