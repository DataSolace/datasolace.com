import Link from 'next/link';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPostSlugs, getRelatedBlogPosts } from '../../../lib/blog';
import { marked } from 'marked';
import { urlFor } from '../../../sanity/client';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  // Get related posts
  const relatedPosts = await getRelatedBlogPosts(post._id, post.category, 2);

  // Parse markdown content to HTML and handle Sanity image references
  const parseMarkdown = (markdown: string) => {
    try {
      // Replace Sanity image references with proper URLs
      let processedMarkdown = markdown.replace(
        /!\[([^\]]*)\]\(sanity:\/\/([^)]+)\)/g,
        (match, altText, assetId) => {
          // Create a temporary image object for urlFor
          const imageAsset = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId
            }
          };

          // Generate the image URL
          const imageUrl = urlFor(imageAsset).url();

          // Return standard markdown image syntax with the Sanity URL
          return `![${altText}](${imageUrl})`;
        }
      );

      return marked(processedMarkdown);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return markdown; // Fallback to raw markdown if parsing fails
    }
  };

  return (
    <div className="min-h-screen bg-[var(--brand-blue)]">
      <Header currentPage="blog" />

      {/* Blog Post Content */}
      <section className="py-20 px-6 pt-32">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-white hover:text-[var(--brand-teal)] transition-colors inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Article */}
          <article className="bg-white rounded-2xl p-8 md:p-12">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-[var(--brand-teal)] bg-[var(--brand-teal)]/10 px-3 py-1 rounded">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString('en-GB')}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--brand-blue)] mb-6">
                {post.title}
              </h1>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                {post.description}
              </p>
            </header>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="mb-8">
                <Image
                  src={post.featuredImage.asset.url}
                  alt={post.featuredImage.alt}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-gray-700">
              {post.contentType === 'markdown' && post.markdownContent ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(post.markdownContent)
                  }}
                />
              ) : post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <p>Content not available.</p>
              )}
            </div>

            {/* Share and Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex space-x-4">
                  <span className="text-gray-600">Share:</span>
                  <a href="#" className="text-[var(--brand-teal)] hover:text-[var(--brand-green)] transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="text-[var(--brand-teal)] hover:text-[var(--brand-green)] transition-colors">
                    LinkedIn
                  </a>
                </div>
                
                <Link
                  href="/blog"
                  className="text-[var(--brand-teal)] hover:text-[var(--brand-green)] transition-colors font-medium"
                >
                  ← Back to Blog
                </Link>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Related Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.length > 0 ? (
                relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost._id}
                    href={`/blog/${relatedPost.slug.current}`}
                    className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg font-bold text-[var(--brand-blue)] mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {relatedPost.description.substring(0, 120)}...
                    </p>
                    <span className="text-[var(--brand-teal)] text-sm font-medium">
                      Read More →
                    </span>
                  </Link>
                ))
              ) : (
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-bold text-[var(--brand-blue)] mb-2">
                    More posts coming soon...
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    We&apos;re working on bringing you more great content. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 