import path from 'node:path'

// Historical one-time import utility retained for rollback/reconciliation only.
// The public site now reads blog content from Payload; do not treat this script
// as a runtime Sanity dependency. Archive/remove after Sanity decommissioning is final.
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9rq2s1dn'
const SANITY_DATASET = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const PAYLOAD_URL = (process.env.PAYLOAD_URL || 'http://localhost:3001').replace(/\/$/, '')
const PAYLOAD_EMAIL = process.env.PAYLOAD_ADMIN_EMAIL
const PAYLOAD_PASSWORD = process.env.PAYLOAD_ADMIN_PASSWORD

type SanityAsset = {
  _id?: string
  url?: string
  originalFilename?: string
  mimeType?: string
}

type SanityPost = {
  _id: string
  title?: string
  slug?: { current?: string }
  description?: string
  category?: string
  publishedAt?: string
  featuredImage?: {
    asset?: SanityAsset
    alt?: string
  }
  excerpt?: string
  tags?: string[]
  contentType?: 'richText' | 'markdown'
  markdownContent?: string
}

type PayloadMediaResult = {
  id: string | number
  url?: string
}

const assetMap = new Map<string, PayloadMediaResult>()

function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function assetRefToCdnUrl(assetRef: string): string | null {
  const normalized = assetRef.replace(/^sanity:\/\//, '')
  const match = normalized.match(/^image-([a-f0-9]+)-(\d+x\d+)-([a-z0-9]+)$/i)
  if (!match) {
    return null
  }

  return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${match[1]}-${match[2]}.${match[3]}`
}

function fileNameFromAsset(assetRef: string, fallbackUrl: string): string {
  const normalized = assetRef.replace(/^sanity:\/\//, '')
  const match = normalized.match(/^image-([a-f0-9]+)-(\d+x\d+)-([a-z0-9]+)$/i)
  if (match) {
    return `${match[1]}-${match[2]}.${match[3]}`
  }

  return path.basename(new URL(fallbackUrl).pathname) || 'sanity-image.jpg'
}

async function payloadFetch(pathname: string, init: RequestInit = {}) {
  const response = await fetch(`${PAYLOAD_URL}${pathname}`, init)
  if (!response.ok) {
    throw new Error(`Payload request failed ${response.status} ${pathname}: ${(await response.text()).slice(0, 500)}`)
  }
  return response
}

async function getToken(): Promise<string> {
  const email = required(PAYLOAD_EMAIL, 'PAYLOAD_ADMIN_EMAIL')
  const password = required(PAYLOAD_PASSWORD, 'PAYLOAD_ADMIN_PASSWORD')
  const response = await payloadFetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = (await response.json()) as { token?: string }
  if (!data.token) {
    throw new Error('Payload login did not return a token')
  }
  return data.token
}

async function fetchSanityPosts(): Promise<SanityPost[]> {
  const query = `*[_type == "blogPost" && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    publishedAt,
    featuredImage {
      asset->{ _id, url, originalFilename, mimeType },
      alt
    },
    excerpt,
    tags,
    contentType,
    markdownContent
  }`

  const url = new URL(`https://${SANITY_PROJECT_ID}.api.sanity.io/v2025-02-19/data/query/${SANITY_DATASET}`)
  url.searchParams.set('query', query)

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Sanity query failed: ${response.status} ${await response.text()}`)
  }

  const data = (await response.json()) as { result?: SanityPost[] }
  return data.result || []
}

async function uploadImage(token: string, assetRef: string, url: string, alt: string): Promise<PayloadMediaResult> {
  const cacheKey = assetRef || url
  const cached = assetMap.get(cacheKey)
  if (cached) {
    return cached
  }

  const imageResponse = await fetch(url)
  if (!imageResponse.ok) {
    throw new Error(`Failed to download image ${url}: ${imageResponse.status}`)
  }

  const contentType = imageResponse.headers.get('content-type') || 'image/jpeg'
  const buffer = await imageResponse.arrayBuffer()
  const blob = new Blob([buffer], { type: contentType })
  const form = new FormData()
  form.append('file', blob, fileNameFromAsset(assetRef, url))
  form.append('_payload', JSON.stringify({ alt, sourceId: assetRef }))

  const response = await payloadFetch('/api/media', {
    method: 'POST',
    headers: {
      Authorization: `JWT ${token}`,
    },
    body: form,
  })

  const data = (await response.json()) as { doc?: PayloadMediaResult }
  if (!data.doc?.id) {
    throw new Error(`Payload media upload returned no doc ID for ${url}`)
  }

  assetMap.set(cacheKey, data.doc)
  return data.doc
}

async function rewriteInlineImages(token: string, markdown: string): Promise<string> {
  const matches = [...markdown.matchAll(/!\[([^\]]*)\]\(sanity:\/\/([^)]+)\)/g)]
  let rewritten = markdown

  for (const match of matches) {
    const [fullMatch, altText, assetRef] = match
    const url = assetRefToCdnUrl(assetRef)
    if (!url) {
      console.warn(`Could not parse inline Sanity asset ref: ${assetRef}`)
      continue
    }

    const media = await uploadImage(token, assetRef, url, altText || 'Blog image')
    if (!media.url) {
      console.warn(`Uploaded inline image has no URL: ${assetRef}`)
      continue
    }

    rewritten = rewritten.replace(fullMatch, `![${altText}](${media.url})`)
  }

  return rewritten
}

async function findExistingPost(token: string, slug: string, sanityId: string): Promise<string | number | null> {
  const params = new URLSearchParams({
    limit: '1',
    'where[or][0][slug][equals]': slug,
    'where[or][1][sanityId][equals]': sanityId,
  })
  const response = await payloadFetch(`/api/blog-posts?${params.toString()}`, {
    headers: { Authorization: `JWT ${token}` },
  })
  const data = (await response.json()) as { docs?: Array<{ id: string | number }> }
  return data.docs?.[0]?.id || null
}

async function upsertPost(token: string, post: SanityPost): Promise<void> {
  const slug = post.slug?.current
  if (!slug || !post.title || !post.description || !post.category || !post.publishedAt) {
    console.warn(`Skipping incomplete post: ${post._id}`)
    return
  }

  const featuredAsset = post.featuredImage?.asset
  const featuredAssetRef = featuredAsset?._id || featuredAsset?.url || `${post._id}:featured`
  const featuredAssetUrl = featuredAsset?.url || (featuredAsset?._id ? assetRefToCdnUrl(featuredAsset._id) : null)

  if (!featuredAssetUrl) {
    console.warn(`Skipping post without featured image URL: ${post.title}`)
    return
  }

  const featuredImage = await uploadImage(
    token,
    featuredAssetRef,
    featuredAssetUrl,
    post.featuredImage?.alt || post.title,
  )

  const markdownContent = post.markdownContent
    ? await rewriteInlineImages(token, post.markdownContent)
    : undefined

  const body = {
    title: post.title,
    slug,
    description: post.description,
    category: post.category,
    excerpt: post.excerpt,
    tags: (post.tags || []).map((tag) => ({ tag })),
    featuredImage: featuredImage.id,
    contentType: post.contentType || 'markdown',
    markdownContent,
    publishedAt: post.publishedAt,
    sanityId: post._id,
    _status: 'published',
  }

  const existingId = await findExistingPost(token, slug, post._id)
  if (existingId) {
    await payloadFetch(`/api/blog-posts/${existingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(body),
    })
    console.log(`Updated blog post: ${post.title}`)
    return
  }

  await payloadFetch('/api/blog-posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(body),
  })
  console.log(`Created blog post: ${post.title}`)
}

async function main() {
  console.log(`Migrating Sanity ${SANITY_PROJECT_ID}/${SANITY_DATASET} -> ${PAYLOAD_URL}`)
  const posts = await fetchSanityPosts()
  console.log(`Found ${posts.length} published Sanity blog posts`)

  const token = await getToken()
  for (const post of posts) {
    await upsertPost(token, post)
  }

  console.log('Sanity blog/media migration complete')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
