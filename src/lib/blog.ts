import { client } from '../sanity/client'

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

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const query = `
    *[_type == "blogPost" && publishedAt <= now()] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      category,
      publishedAt,
      featuredImage {
        asset-> {
          url
        },
        alt
      },
      excerpt,
      tags
    }
  `

  try {
    const posts = await client.fetch(query)
    return posts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const query = `
    *[_type == "blogPost" && slug.current == $slug && publishedAt <= now()][0] {
      _id,
      title,
      slug,
      description,
      category,
      publishedAt,
      featuredImage {
        asset-> {
          url
        },
        alt
      },
      excerpt,
      tags,
      contentType,
      content,
      markdownContent
    }
  `

  try {
    const post = await client.fetch(query, { slug })
    return post
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function getAllBlogPostSlugs(): Promise<string[]> {
  const query = `
    *[_type == "blogPost" && publishedAt <= now()] {
      "slug": slug.current
    }
  `

  try {
    const slugs = await client.fetch(query)
    return slugs.map((item: { slug: string }) => item.slug)
  } catch (error) {
    console.error('Error fetching blog post slugs:', error)
    return []
  }
}

export async function getRelatedBlogPosts(currentPostId: string, category: string, limit: number = 2): Promise<BlogPost[]> {
  const query = `
    *[_type == "blogPost" && _id != $currentPostId && category == $category && publishedAt <= now()] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      description,
      category,
      publishedAt,
      featuredImage {
        asset-> {
          url
        },
        alt
      },
      excerpt,
      tags
    }
  `

  try {
    const posts = await client.fetch(query, { currentPostId, category, limit })
    return posts
  } catch (error) {
    console.error('Error fetching related blog posts:', error)
    return []
  }
} 