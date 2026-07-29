import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getAllBlogPosts } from '../../lib/blog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Writing on process automation for small businesses: how we map work, connect systems, and keep them running — plus the occasional technical deep-dive from our own tooling.',
};

export default async function Blog() {
  const blogPosts = await getAllBlogPosts();

  return (
    <div className="min-h-screen bg-[var(--brand-blue)]">
      <Header currentPage="blog" />

      {/* Blog Section */}
      <section className="py-20 px-6 pt-32">
        <div className="max-w-6xl mx-auto">
          {/* Header Content */}
          <div className="bg-white rounded-2xl p-8 sm:p-12 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--brand-blue)] mb-8 text-balance">
              Notes from the workshop.
            </h1>

            <div className="space-y-6 text-[#374151] text-lg leading-relaxed max-w-[65ch]">
              <p>
                Writing on process automation for small businesses: how we map
                work, connect systems, and keep them running — plus the
                occasional technical deep-dive from our own tooling.
              </p>

              <p>
                Plain language where possible, real detail where it matters.
              </p>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="bg-gray-200">
                  <Image
                    src={post.featuredImage.asset.url}
                    alt={post.featuredImage.alt}
                    width={600}
                    height={400}
                    unoptimized
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="p-6">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-[var(--brand-teal-text)] bg-[var(--brand-teal)]/10 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString('en-GB')}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-[var(--brand-blue)] group-hover:text-[var(--brand-teal-text)] transition-colors leading-tight mb-3">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.description}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-4">
                    <span className="text-[var(--brand-teal-text)] font-medium text-sm group-hover:text-[var(--brand-green)] transition-colors">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-white text-xl mb-8">
              Ready to implement these solutions in your business?
            </p>
            <Link
              href="/appointments"
              className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-8 py-4 rounded-lg text-xl font-bold transition-colors inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book an intro call
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 