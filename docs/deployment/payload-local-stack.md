# DataSolace Payload Local Stack

This stack is the active production path for DataSolace. Production and staging traffic both enter through a remotely-managed Cloudflare Tunnel and terminate at local Docker nginx services. Legacy Cloudflare Worker/OpenNext, D1, KV, and Sanity runtime artifacts have been removed from active repo configuration; any remaining remote resource cleanup must be handled as an explicit decommissioning step.

## Local secrets

1. Copy `.env.example` to `.env` and fill real values locally.
2. Keep `tunnel_token` in the repository root as a local ignored file and mirror it into ignored `.env` as `CLOUDFLARE_TUNNEL_TOKEN` before starting `cloudflared`. The token must never be committed.
3. Use different staging and production Postgres/Payload secrets.

## Docker network

The compose file mirrors the caras.kitchen pattern with an external edge network:

```sh
docker network create datasolace-edge
```

If using a different name, set `DATASOLACE_EDGE_NETWORK` in `.env`.

## Cloudflare Tunnel

The tunnel is remotely managed in Cloudflare. The local connector only runs with the token from `tunnel_token`.

Current expected published application routes:

- `datasolace.com` -> Service type HTTP, URL `nginx:80` or `nginx:8080` depending on the Cloudflare dashboard route convention in use
- `cms.datasolace.com` -> Service type HTTP, URL `nginx:80` or `nginx:8080`, protected by Cloudflare Access for `@datasolace.com`
- `staging.datasolace.com` -> Service type HTTP, URL `staging-nginx:80` or `staging-nginx:8080`
- `staging-cms.datasolace.com` -> Service type HTTP, URL `staging-nginx:80` or `staging-nginx:8080`, protected by Cloudflare Access for `@datasolace.com`
- alternate domains should redirect to `https://datasolace.com`

Do not browse to `:8080`; that port is internal to the tunnel connector when used. Keep Worker custom domains/routes disabled or detached from these hostnames once the tunnel routes are verified.

## Startup

Builds run inside Docker. The Dockerfiles update npm to the current latest major (`npm@latest`) and run `npm ci` with `--before` set to 14 days ago by default, so newly published packages are avoided during image builds. Override with `NPM_MIN_PACKAGE_AGE_DAYS` only if required.

```sh
docker compose up -d --build
```

Staging uses isolated services and volumes:

- `staging-postgres`
- `staging-payload`
- `staging-public-app`
- `staging-nginx`
- `staging_pg_data`
- `staging_media_uploads`

Production uses separate services and volumes:

- `postgres`
- `payload`
- `public-app`
- `nginx`
- `pg_data`
- `media_uploads`

## Legacy Worker/D1/KV cleanup status

The previous Cloudflare Worker/OpenNext deployment used `wrangler.jsonc`, `open-next.config.ts`, generated `env.d.ts`, D1 contact-submission schema, and Cloudflare KV rate-limit documentation. Those files are no longer active configuration for this stack.

Current replacements:

- Public app: Docker `public-app` service built from `Dockerfile.public`.
- CMS/content: Payload CMS and Postgres services in `compose.yml`.
- Edge routing: Cloudflare Tunnel connector service `cloudflared` to local nginx.
- Contact storage and rate limiting: Payload/Postgres plus nginx limits, not D1/KV.

Remote Cloudflare Worker, D1, KV, and Sanity resources are not deleted by repo cleanup. Before remote deletion, use `docs/deployment/legacy-remote-cleanup-checklist.md` to verify tunnel routes, confirm Worker routes/custom domains are detached, archive Sanity before deleting it, and preserve any D1/KV/Sanity evidence the user wants to retain.

## Newsletter / Kit.com

`/api/newsletter` subscribes through the Kit API v4: it upserts the subscriber
(`POST https://api.kit.com/v4/subscribers`) and then attaches the tag for the
requested newsletter (`POST /v4/tags/{tag_id}/subscribers`), authenticating with
the `X-Kit-Api-Key` header.

Configuration (per environment, staging uses the `STAGING_` prefix):

- `KIT_API_KEY` — a V4 API key created under Kit account settings > Developer.
- `KIT_TAG_ID_DATASOLACE` — numeric tag ID for the general `datasolace` list
  (the default when the frontend sends no `newsletterId`).
- `KIT_TAG_ID_SMART_HOME_INDEX` — numeric tag ID for the `smart-home-index`
  list (retained for future SHI placements; no live form sends it today).

Operational notes:

- Leave all Kit variables empty until real values are available. Missing or
  non-numeric configuration is logged in Payload as `provider_failed` /
  `kit_not_configured` and returns a safe 500 JSON response; the site otherwise
  functions normally, so clearing these variables (and restarting the public
  app) is also the rollback path.
- Key rotation: reset the key in Kit's Developer settings, update `.env`, then
  restart the affected `public-app` / `staging-public-app` service. Old keys
  stop working immediately after reset.
- Testing: use a personal test address on staging first. Repeat signups are
  safe — Kit's subscriber create is an upsert, and a repeat is recorded in
  Payload as `already_subscribed` (both Kit calls return 200) rather than
  `subscribed`.
- Auditing: every attempt writes a `newsletter-events` document (statuses:
  `subscribed`, `already_subscribed`, `provider_failed`, `invalid`,
  `blocked_honeypot`) with the Kit subscriber ID in `providerResponseId` and a
  truncated `errorDetail` on failures. Investigate provider issues from those
  events; API keys are never stored in them.

## Backups

Initial backup target is local-only under `.local-backups/payload/`.

```sh
scripts/backup-local.sh staging
scripts/backup-local.sh production
```

Restore into a running stack:

```sh
scripts/restore-local.sh staging .local-backups/payload/staging/<timestamp>
scripts/restore-local.sh production .local-backups/payload/production/<timestamp>
```

Off-host backup storage remains a follow-up decision.

## Rollback

Use the local Payload/Postgres backup from immediately before major cleanup or routing changes as the primary data rollback point. The legacy Worker path is now historical only: reactivation would require restoring the removed Worker/OpenNext configuration from git history and reattaching Worker custom domains/routes in Cloudflare. Prefer fixing the Docker/tunnel stack in place unless the user explicitly asks for a Worker rollback.
