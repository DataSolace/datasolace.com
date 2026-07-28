# DataSolace

The public-facing website for DataSolace — owner-led process automation for UK small businesses. We map how the work actually runs, connect the tools already in use, build what's missing, and keep it all running.

## What the site covers

- **Process mapping & documentation** — observing how work really moves and writing it down so it stops depending on memory
- **Systems integration** — connecting existing tools, APIs, and data flows so records move between systems without retyping
- **Custom internal tools** — bespoke apps, forms, dashboards, and portals built around a specific workflow
- **Hosting & infrastructure** — running and maintaining delivered systems, including self-hosted setups, backups, and ongoing support

Product and design context for contributors lives in [PRODUCT.md](PRODUCT.md) and [DESIGN.md](DESIGN.md).

## Technology Stack

- [Next.js 15](https://nextjs.org/) - public site (standalone output)
- [Payload CMS](https://payloadcms.com/) - content management (blog, portfolio), backed by Postgres 16
- [TypeScript](https://www.typescriptlang.org/) - type-safe JavaScript
- [Tailwind CSS 4](https://tailwindcss.com/) - styling
- Docker Compose + nginx + [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) - self-hosted deployment

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- Docker (only needed for the CMS-backed pages and full-stack work)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DataSolace/datasolace.com.git
cd datasolace.com
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The homepage, services, and appointments pages render standalone. Blog and portfolio pages fetch from Payload — bring up the CMS locally with `docker compose up postgres payload` (requires `POSTGRES_PASSWORD` and `PAYLOAD_SECRET` in your environment) if you're working on those.

## Development

### Pre-commit Hooks

This project uses [Husky](https://typicode.github.io/husky/) to run pre-commit checks that ensure code quality:

- **Secret scanning**: TruffleHog scans staged changes
- **Linting**: Runs ESLint to catch code style issues and potential errors
- **Build Check**: Verifies that the project builds successfully and TypeScript types are valid

If any checks fail, the commit is blocked until the issues are resolved.

> Note: the build check writes to the same `.next` directory as a running dev server, so `npm run dev` typically needs restarting (with `.next` removed) after each commit.

To manually run the checks:
```bash
npm run lint    # Run linting only
npm run check   # Run build and TypeScript checks
```

### Available Scripts

| Command         | Action                              |
| :-------------- | :---------------------------------- |
| `npm run dev`   | Start development server            |
| `npm run build` | Build the production site           |
| `npm run start` | Serve the production build locally  |
| `npm run lint`  | Run ESLint for code quality checks  |
| `npm run check` | Run build and TypeScript validation |

## Deployment

The site is self-hosted with Docker Compose: Postgres, Payload CMS, the Next.js public app, and nginx, with all ingress via a Cloudflare Tunnel (no publicly exposed ports). Production and staging run side by side from the same compose file, and deploys are `docker compose up -d --build` on the host.

See [docs/deployment/payload-local-stack.md](docs/deployment/payload-local-stack.md) for the full topology, secrets, and runbook. The previous Cloudflare Workers/OpenNext deployment is retired ([cleanup checklist](docs/deployment/legacy-remote-cleanup-checklist.md)).

## Contact

- **Website**: [datasolace.com](https://datasolace.com)
- **Book an intro call**: [datasolace.com/appointments](https://datasolace.com/appointments)

## License

This project is proprietary software owned by DataSolace. All rights reserved.
