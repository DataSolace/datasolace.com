# Legacy Remote Cleanup Checklist

Use this checklist after the local repository cleanup has landed. These steps are intentionally manual and gated because they affect remote Cloudflare and Sanity resources.

## Current local baseline

- Production serving path: Cloudflare Tunnel -> local `cloudflared` -> Docker `nginx` -> `public-app` / `payload`.
- Staging serving path: Cloudflare Tunnel -> local `cloudflared` -> Docker `staging-nginx` -> `staging-public-app` / `staging-payload`.
- Local rollback backup captured before cleanup: `.local-backups/payload/production/20260526T083703Z`.
- Sanity runtime code and `cdn.sanity.io` Next image allow-list entries have been removed from the public app.
- Production Payload/Postgres was scanned for `sanity` text references after cleanup and returned zero matches.

## Sanity project archive trial

Legacy Sanity project details from the removed Worker config and migration script:

- Project ID: `9rq2s1dn`
- Dataset: `production`

Manual archive checklist:

- [ ] In Sanity Manage, open project `9rq2s1dn` and confirm it is the legacy DataSolace project.
- [ ] Export/preserve the `production` dataset before changing project status.
- [ ] Confirm no current DataSolace environment variable or deployment secret still points the public app at Sanity.
- [ ] Archive the Sanity project, rather than deleting it, so API/CDN access is blocked but the project can be reactivated.
- [ ] Tell the coding agent that Sanity is archived and ask it to rerun: repo legacy grep, production/staging smoke tests, blog/media checks, and a Sanity API/CDN blocked-access check.
- [ ] Leave the project archived for a confidence period if desired.
- [ ] Delete the Sanity project only after the archive trial has passed and the user explicitly approves permanent deletion.

Do not delete the Sanity project immediately after archiving. If any blog/media/API issue appears during the archive trial, reactivate the project and investigate before trying again.

## Cloudflare Worker / D1 / KV cleanup

Legacy Cloudflare resources from the removed `wrangler.jsonc`:

- Worker name: `datasolace-com`
- D1 database: `datasolace-contacts`
- D1 database ID: `eff06927-bc71-4b4f-b05d-b485919924ef`
- KV binding: `RATE_LIMIT_KV`
- KV namespace ID: `3851945bafba40b9b3e25879f3ca53dd`
- KV preview namespace ID: `3eda35d9628848a69d428c761fe40d27`
- Legacy Worker custom domains/routes: `datasolace.com`, `datasolace.co.uk`, `datasolace.org`, `datasolace.net`

Manual Cloudflare cleanup checklist:

- [ ] In Cloudflare Zero Trust / Tunnels, confirm the active tunnel has published application routes for `datasolace.com`, `cms.datasolace.com`, `staging.datasolace.com`, and `staging-cms.datasolace.com` pointing at the local Docker nginx services.
- [ ] In Cloudflare Workers & Pages, open Worker `datasolace-com` and confirm it is not receiving live traffic.
- [ ] Remove or disable Worker routes/custom domains for `datasolace.com`, `datasolace.co.uk`, `datasolace.org`, and `datasolace.net` only after the tunnel routes and canonical redirects are verified.
- [ ] Verify `https://datasolace.com/`, `https://cms.datasolace.com/admin`, `https://staging.datasolace.com/`, and alternate-domain redirects still behave correctly after Worker route removal.
- [ ] Preserve the D1 export/evidence already kept under ignored local backups, or create a fresh export if desired.
- [ ] Delete or archive D1 database `datasolace-contacts` only after the user confirms old contact-row evidence is no longer needed.
- [ ] Delete KV namespace `3851945bafba40b9b3e25879f3ca53dd` and preview namespace `3eda35d9628848a69d428c761fe40d27` only after confirming no Worker route depends on them.
- [ ] Delete Worker `datasolace-com` only after routes/custom domains, D1, and KV have been handled and live smoke tests still pass.
- [ ] Tell the coding agent what was changed so it can rerun smoke tests and update the plan validation.

Do not delete the active Cloudflare Tunnel, its token, `cloudflared` connector, Access applications, or DNS records used by the current local stack.
