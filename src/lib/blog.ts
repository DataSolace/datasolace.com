import { getPayloadInternalUrl } from './payloadApi'

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  description: string
  category: string
  publishedAt: string
  featuredImage: {
    asset: {
      url: string
    }
    alt: string
  }
  excerpt?: string
  tags?: string[]
  contentType?: 'richText' | 'markdown'
  content?: unknown
  markdownContent?: string
}

type PayloadMedia = {
  id?: string | number
  url?: string
  alt?: string
  filename?: string
}

type PayloadTag = {
  tag?: string
}

type PayloadBlogPost = {
  id: string | number
  title?: string
  slug?: string
  description?: string
  category?: string
  publishedAt?: string
  featuredImage?: PayloadMedia | string | number
  excerpt?: string
  tags?: PayloadTag[]
  contentType?: 'richText' | 'markdown'
  content?: unknown
  markdownContent?: string
}

type PayloadListResponse<T> = {
  docs?: T[]
}

function publicMediaUrl(url: string): string {
  try {
    const parsed = new URL(url)
    if (parsed.pathname.startsWith('/api/media/file/')) {
      return parsed.pathname
    }
  } catch {
    if (url.startsWith('/api/media/file/')) {
      return url
    }
  }

  return url
}

function rewritePublicMediaUrls(markdown: string | undefined): string | undefined {
  return markdown?.replace(/https?:\/\/[^\s)"']+(\/api\/media\/file\/[^\s)"']+)/g, '$1')
}

function mediaUrl(media: PayloadMedia | string | number | undefined): string {
  if (!media || typeof media === 'string' || typeof media === 'number') {
    return ''
  }

  if (media.filename) {
    return `/api/media/file/${media.filename}`
  }

  if (media.url) {
    return publicMediaUrl(media.url)
  }

  return ''
}

function toBlogPost(post: PayloadBlogPost): BlogPost | null {
  const slug = typeof post.slug === 'string' ? post.slug : ''
  const image = typeof post.featuredImage === 'object' ? post.featuredImage : undefined
  const featuredImageUrl = mediaUrl(image)

  if (!slug || !post.title || !post.description || !post.category || !post.publishedAt) {
    return null
  }

  return {
    _id: String(post.id),
    title: post.title,
    slug: { current: slug },
    description: post.description,
    category: post.category,
    publishedAt: post.publishedAt,
    featuredImage: {
      asset: {
        url: featuredImageUrl,
      },
      alt: image?.alt || post.title,
    },
    excerpt: post.excerpt,
    tags: post.tags?.map((tag) => tag.tag).filter((tag): tag is string => Boolean(tag)),
    contentType: post.contentType,
    content: post.content,
    markdownContent: rewritePublicMediaUrls(post.markdownContent),
  }
}

async function fetchPayloadPosts(params: URLSearchParams): Promise<PayloadBlogPost[]> {
  params.set('depth', params.get('depth') || '1')
  params.set('limit', params.get('limit') || '100')
  params.set('where[_status][equals]', 'published')
  params.set('where[publishedAt][less_than_equal]', new Date().toISOString())

  const response = await fetch(`${getPayloadInternalUrl()}/api/blog-posts?${params.toString()}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Payload blog fetch failed: ${response.status}`)
  }

  const data = (await response.json()) as PayloadListResponse<PayloadBlogPost>
  return data.docs || []
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const params = new URLSearchParams({
      sort: '-publishedAt',
    })
    const posts = await fetchPayloadPosts(params)
    return posts.map(toBlogPost).filter((post): post is BlogPost => Boolean(post))
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const params = new URLSearchParams({
      limit: '1',
      'where[slug][equals]': slug,
    })
    const posts = await fetchPayloadPosts(params)
    return posts.length > 0 ? toBlogPost(posts[0]) : null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function getAllBlogPostSlugs(): Promise<string[]> {
  try {
    const posts = await getAllBlogPosts()
    return posts.map((post) => post.slug.current)
  } catch (error) {
    console.error('Error fetching blog post slugs:', error)
    return []
  }
}

export async function getRelatedBlogPosts(currentPostId: string, category: string, limit: number = 2): Promise<BlogPost[]> {
  try {
    const params = new URLSearchParams({
      sort: '-publishedAt',
      limit: String(limit),
      'where[category][equals]': category,
      'where[id][not_equals]': currentPostId,
    })
    const posts = await fetchPayloadPosts(params)
    return posts.map(toBlogPost).filter((post): post is BlogPost => Boolean(post))
  } catch (error) {
    console.error('Error fetching related blog posts:', error)
    return []
  }
}
