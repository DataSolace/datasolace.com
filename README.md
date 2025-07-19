# DataSolace

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/next-starter-template)

This is the public-facing repository for DataSolace's statically generated website, showcasing our expertise in business and home automation solutions.

## About DataSolace

DataSolace is a trusted partner for Business and Home automation, bringing over a decade of systems design and engineering to those who want to focus on what matters most.

### Our Services

#### Business Automation
- **Infrastructure to Enable Business Growth** - Scalable solutions that grow with your business
- **Eliminate Time Consuming Activities** - Streamline operations and boost productivity
- **Protect Business Intellectual Property** - Secure systems and data protection
- **Consolidate Systems and Optimise Workflows** - Unified platforms for better efficiency

#### Home Automation
- **Enhanced Home Comfort and Efficiency** - Luxury automation for modern living
- **Premises Security and Access Management** - Advanced security solutions
- **Environmental Monitoring and Protection** - Smart environmental controls
- **Unified control and automated daily routines** - Seamless home management

## Technology Stack

This website is built with:
- [Next.js](https://nextjs.org/) - React framework for production
- [OpenNext](https://opennext.js.org/) - Cloudflare adapter for Next.js
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) - Edge computing platform
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/datasolace-com.git
cd datasolace-com
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

The website auto-updates as you edit files. You can start editing the main page by modifying `src/app/page.tsx`.

### Available Scripts

| Command                           | Action                                       |
| :-------------------------------- | :------------------------------------------- |
| `npm run dev`                     | Start development server                     |
| `npm run build`                   | Build your production site                   |
| `npm run preview`                 | Preview your build locally                   |
| `npm run build && npm run deploy` | Deploy your production site to Cloudflare    |

## Deployment

This website is deployed on Cloudflare Workers as a static website using the OpenNext Cloudflare adapter. The deployment process transforms the Next.js build output to run efficiently in Cloudflare's edge computing environment.

## Contact

Ready to automate your business or home? Get in touch with us:

- **Website**: [datasolace.com](https://datasolace.com)
- **Services**: Business and Home Automation
- **Expertise**: Systems Design and Engineering

## License

This project is proprietary software owned by DataSolace. All rights reserved.
