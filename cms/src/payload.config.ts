import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { BlogPosts } from './collections/BlogPosts'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Media } from './collections/Media'
import { NewsletterEvents } from './collections/NewsletterEvents'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function requireRuntimeEnv(name: string): string {
  const value = process.env[name]
  if (value) {
    return value
  }

  const isBuildPhase =
    process.env.npm_lifecycle_event === 'build' ||
    process.env.NEXT_PHASE === 'phase-production-build'

  if (isBuildPhase) {
    return `__build_placeholder_${name}__`
  }

  throw new Error(`Missing required environment variable: ${name}`)
}

const DATABASE_URI = requireRuntimeEnv('DATABASE_URI')
const PAYLOAD_SECRET = requireRuntimeEnv('PAYLOAD_SECRET')

const corsOrigins = [
  'https://datasolace.com',
  'https://cms.datasolace.com',
  'https://staging.datasolace.com',
  'https://staging-cms.datasolace.com',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:8080',
].filter(Boolean)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, '..'),
    },
  },
  collections: [Users, Media, BlogPosts, ContactSubmissions, NewsletterEvents],
  editor: lexicalEditor(),
  db: postgresAdapter({
    push: process.env.PAYLOAD_DB_PUSH === 'true',
    pool: {
      connectionString: DATABASE_URI,
    },
  }),
  secret: PAYLOAD_SECRET,
  serverURL: process.env.PAYLOAD_PUBLIC_URL || process.env.PAYLOAD_URL,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: corsOrigins,
  csrf: corsOrigins,
  sharp,
  async onInit(payload) {
    const email = process.env.PAYLOAD_ADMIN_EMAIL
    const password = process.env.PAYLOAD_ADMIN_PASSWORD

    if (!email || !password) {
      return
    }

    const existing = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
        },
      })
      payload.logger.info(`Created bootstrap Payload admin user: ${email}`)
    }
  },
})
