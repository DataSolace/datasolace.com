import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getAllBlogPosts } from '../../lib/blog';

export default async function Blog() {
  const blogPosts = await getAllBlogPosts();

  return (
    <div className="min-h-screen bg-[var(--brand-blue)]">
      <Header currentPage="blog" />

      {/* Blog Section */}
      <section className="py-20 px-6 pt-32">
        <div className="max-w-6xl mx-auto">
          {/* Header Content */}
          <div className="bg-white rounded-2xl p-12 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--brand-blue)] mb-8">
              Latest Insights & Updates
            </h1>
            
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed max-w-4xl">
              <p>
                Stay up to date with the latest developments in automation technology,
                smart home solutions, and business optimization strategies from our team
                of experts.
              </p>
              
              <p>
                From detailed technical guides to industry insights, our blog covers
                everything you need to know about transforming your business and home
                through intelligent automation.
              </p>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                  <Image
                    src={post.featuredImage.asset.url}
                    alt={post.featuredImage.alt}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="p-6">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-[var(--brand-teal)] bg-[var(--brand-teal)]/10 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString('en-GB')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[var(--brand-blue)] group-hover:text-[var(--brand-teal)] transition-colors leading-tight mb-3">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.description}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-4">
                    <span className="text-[var(--brand-teal)] font-medium text-sm group-hover:text-[var(--brand-green)] transition-colors">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination or Load More */}
          <div className="text-center mt-16">
            <Link
              href="/blog"
              className="text-white hover:text-[var(--brand-teal)] transition-colors inline-flex items-center text-xl"
            >
              Older Posts
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-white text-xl mb-8">
              Ready to implement these solutions in your business or home?
            </p>
            <Link
              href="/#contact"
              className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors inline-block"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 