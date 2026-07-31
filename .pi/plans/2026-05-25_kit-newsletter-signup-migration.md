---
title: "Finish Kit Newsletter Signup Migration"
slug: kit-newsletter-signup-migration
created_at: 2026-05-25T20:09:40.643Z
status: complete
updated_at: 2026-07-31
---

## Goal
Complete the deferred Kit.com newsletter signup integration for the DataSolace local Docker/Payload stack so the site's newsletter signup subscribes real users through Kit, logs durable outcomes in Payload, remains rate-limited and abuse-resistant, and is validated in staging before production rollout.

## Scope update (2026-07-29)
The original frontend (Smart Home Index form on `src/app/services/page.tsx`) was removed in commit `44a7e62` during the services-page rebuild. Agreed replacement scope:
- New shared `NewsletterSignup` client component placed on the blog index and blog post pages.
- Two Kit lists as separate tags on one Kit account: `datasolace` (general, default) and `smart-home-index` (retained for future SHI placements). The route maps an allowlisted `newsletterId` to a per-tag env var.
- Kit API v4 subscribe flow replaces the placeholder `KIT_WEBHOOK_URL` model. Contact-form checkbox behavior remains intent-only and untouched.

## Constraints
- Keep production stable: validate on staging first, then promote to production only after successful staging checks.
- Do not change the contact-form newsletter checkbox behavior in this plan unless explicitly requested; it should continue to log intent only and not subscribe via Kit.
- Use Docker-based build/runtime validation; avoid relying on local app builds as the source of truth.
- Docker builds must continue to use npm@latest and the 14-day package age cutoff already configured in the Dockerfiles.
- Do not commit Kit API keys, form IDs if considered sensitive, test email addresses tied to private accounts, `.env`, backups, or tunnel tokens.
- Use Payload `newsletter-events` as the durable audit log for every valid, invalid, blocked, accepted, subscribed, and provider-failed attempt.
- Frontend UX for the new blog signup component: success clears the field, failure shows a retryable error, honeypot remains invisible. Do not modify `src/app/services/page.tsx`.
- Prefer the official Kit API v4 flow over an opaque webhook URL: create/upsert a subscriber via `POST https://api.kit.com/v4/subscribers` with `X-Kit-Api-Key`, then add the subscriber to the configured form/tag if required by the chosen Kit target.
- Treat real Kit account details as deployment configuration: staging and production may use different Kit API keys and form/tag IDs.

## Relevant Files
- src/app/api/newsletter/route.ts - current newsletter endpoint with validation, honeypot, placeholder Kit handling, Payload event logging, and provider response parsing.
- src/components/NewsletterSignup.tsx - new client component: email input + honeypot POSTing to `/api/newsletter` with a `newsletterId`.
- src/app/blog/page.tsx and src/app/blog/[slug]/page.tsx - blog pages that render the new signup component.
- src/lib/payloadApi.ts - shared Payload helper for creating newsletter event documents and hashing client IPs.
- cms/src/collections/NewsletterEvents.ts - Payload collection storing newsletter attempts, provider status, response IDs, and error details.
- compose.yml - production and staging public app environment variables for Kit configuration.
- .env.example - non-secret documentation for Kit-related configuration names.
- nginx.conf and nginx.staging.conf - rate limiting for `/api/newsletter` and JSON 429 response behavior.
- docs/deployment/payload-local-stack.md - deployment documentation that currently notes Kit is deferred.
- Dockerfile.public - Docker build policy for public app validation.
- .pi/plans/2026-05-25_payload-cms-migration-implementation.md - completed migration plan that intentionally deferred real Kit provider validation.

## Plan
- [x] Confirm the exact Kit target configuration out-of-band: single Kit account (DataSolace) shared by staging and production; created tag `List: DataSolace Newsletter` (21718003) for `datasolace`, reusing `List: Smart Home Index - Changelog Newsletter` (5594413) for `smart-home-index`; values set in local `.env` only.
- [x] Update `.env.example`, `compose.yml`, and deployment docs to replace the placeholder webhook-only model with explicit Kit API v4 configuration: `KIT_API_KEY`, `KIT_TAG_ID_DATASOLACE`, `KIT_TAG_ID_SMART_HOME_INDEX`, plus `STAGING_` equivalents.
- [x] Refactor `src/app/api/newsletter/route.ts` into small helpers for config validation, Kit API requests, response parsing, and Payload event logging while preserving existing request/response semantics for invalid input, honeypot, provider failure, and success.
- [x] Implement the Kit API v4 subscription flow: create or update a subscriber by email, then attach the subscriber to the tag resolved from the allowlisted `newsletterId` (`datasolace` default, `smart-home-index` retained); reject unknown `newsletterId` values as invalid input; record provider IDs, HTTP statuses, and safe response/error snippets in Payload.
- [x] Make duplicate/already-subscribed behavior idempotent from the user's perspective: return success when Kit indicates the subscriber already exists or is already attached, while logging the precise provider status for admin review (200 on both Kit calls logs `already_subscribed`).
- [x] Review and extend `cms/src/collections/NewsletterEvents.ts`: added `already_subscribed` status option; `newsletterId` default changed to `datasolace` (applies via `PAYLOAD_DB_PUSH` on restart).
- [x] Build the `NewsletterSignup` client component (email input, invisible honeypot, success clears field, retryable error) and place it on the blog index and blog post pages posting `newsletterId: "datasolace"`.
- [x] Validate the blog signup frontend against the updated endpoint: local smoke test (mock Payload) confirmed invalid email 400/`invalid`, honeypot fake-success/`blocked_honeypot`, unknown newsletterId 400/`invalid_newsletter_id`, missing config 500/`kit_not_configured`, malformed body 400 — all with matching Payload events. Success path and 429 remain for staging with real Kit values.
- [x] Run Docker-based builds/restarts for staging and production public app services, then smoke-test staging through `staging.datasolace.com` before updating production Kit env values and restarting production public app. (2026-07-31; also rebuilt payload containers and applied `ALTER TYPE ... ADD VALUE 'already_subscribed'` manually on both DBs — `PAYLOAD_DB_PUSH` does not apply in production containers.)
- [x] Update deployment docs with exact operational steps for rotating Kit keys/tag IDs, testing with a safe address, interpreting Payload newsletter events, rolling back by clearing Kit env values, and the manual enum/schema gotcha.
- [x] After staging and production validation, update the plan status/checklist, inspect diffs, stage only relevant files and this plan, run pre-commit checks, and commit with a conventional commit message. (Shipped via PR #11 + follow-up docs PR.)

## Validation (all executed 2026-07-31)
- [x] Staging `/api/newsletter` returns 400 and logs `invalid` for malformed email without calling Kit.
- [x] Staging honeypot newsletter POST returns fake success and logs `blocked_honeypot` without calling Kit.
- [x] Missing Kit config returns safe JSON error and logs `provider_failed` with `kit_not_configured` (validated in local smoke test pre-deploy; staging/production deployed configured).
- [x] Staging valid newsletter POST with real Kit configuration returns success, creates the Kit subscriber (4231977835), attaches tag 21718003, and logs a Payload `subscribed` event with provider ID.
- [x] Staging repeated signup is idempotent and user-successful, logged as `already_subscribed` (after manual enum ALTER; see schema gotcha in deployment docs).
- [x] Staging `/api/newsletter` rate limiting returns parseable JSON 429 through nginx.
- [x] Payload events store only truncated safe details; no API keys present in events.
- [x] Docker build/restart validation passed for public app and payload with npm@latest and the 14-day package-age cutoff.
- [x] Production signup succeeds through `https://datasolace.com/api/newsletter` (subscriber 4231984194 tagged 21718003, `subscribed` then `already_subscribed` events logged).
- [x] Production blog pages render the signup form.
- [x] Rollback path exercised pre-config: unconfigured env fails safely as `kit_not_configured` while still logging locally; clearing Kit env values restores that behavior.

## Risks
- Kit API v4 may require a specific resource model: creating a subscriber may not automatically add them to a form, tag, or sequence, so the selected target ID must be correct.
- Real Kit credentials or IDs could be accidentally exposed in logs, docs, commits, shell history, or screenshots if not handled carefully.
- Duplicate subscriber semantics may vary by Kit endpoint and could surface as 409/422 rather than success; the endpoint must map safe duplicate states to user-successful outcomes.
- Using a production Kit list for tests can subscribe real addresses or send confirmation emails; staging should use a safe test target where possible.
- Kit API outages, rate limits, or response-shape changes could cause false failures; Payload logging should preserve safe diagnostics for follow-up.
- Overly detailed provider error logging could store personal data or sensitive response text in Payload; error details must be truncated and sanitized.
- Changing env variable names can leave production configured with stale `KIT_WEBHOOK_URL` values unless docs and deployment steps are clear.
- A rollback that disables Kit should not break the rest of the services page or contact form behavior.
