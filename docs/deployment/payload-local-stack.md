# DataSolace Payload Local Stack

This stack is intentionally staged-first. Do not add or activate production Cloudflare Tunnel routes for `datasolace.com` until staging and CMS access have been validated and the user explicitly approves production cutover.

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

Already pre-created by the user:

- `staging.datasolace.com` -> Service type HTTP, URL `staging-nginx:8080`
- `staging-cms.datasolace.com` -> Service type HTTP, URL `staging-nginx:8080`

The staging nginx container listens on both 80 and 8080, but the current remotely-managed tunnel configuration uses 8080. Do not browse to `:8080`; that port is internal to the tunnel connector.
- Cloudflare Access for `staging-cms.datasolace.com` allowing emails ending in `@datasolace.com`

Production routes to add only after explicit approval, after staging and production CMS validation:

- `datasolace.com` -> Service type HTTP, URL `nginx:80` or `nginx:8080` to match the dashboard route convention chosen at cutover
- `cms.datasolace.com` -> Service type HTTP, URL `nginx:80` or `nginx:8080`, protected by Cloudflare Access for `@datasolace.com`
- alternate domains should redirect to `https://datasolace.com`

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

## Newsletter / Kit.com

Leave `KIT_WEBHOOK_URL` and `STAGING_KIT_WEBHOOK_URL` empty until real Kit endpoints are available. Placeholder values such as `https://your-kit-webhook-url-here` are treated as not configured, logged in Payload as `provider_failed` / `kit_not_configured`, and return a safe 500 JSON response.

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

Until production cutover is approved, the existing Cloudflare Worker remains the production fallback. If production cutover later fails, remove/disable the production published application routes for `datasolace.com`, `cms.datasolace.com`, and alternate domains, then restore the previous Worker/custom-domain routing in Cloudflare. Keep the local Payload/Postgres backup from immediately before cutover so new submissions/content can be recovered or replayed if routing is rolled back.
