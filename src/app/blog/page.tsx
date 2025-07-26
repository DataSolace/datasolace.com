import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Documenting Business Processes The Fast Way, Without Microsoft SharePoint",
      description: "Every small business has been there. Your star employee hands in their notice. Suddenly, you realise they're the only one who knows how to run that critical monthly report, manage that key client relationship, or troubleshoot when your ordering system goes haywire...",
      category: "Customer Experience, Documentation",
      date: "12/03/2025",
      image: "/blog/wiki.js-home_page.png",
      slug: "documenting-business-processes-fast-way"
    },
    {
      id: 2,
      title: "Streamlining Customer Feedback for UK Businesses with Formbricks",
      description: "In our previous post, we explored how small UK businesses can leverage Metabase to transform customer data into actionable insights. Today, we're tackling another critical piece of the data puzzle: how to effectively collect that customer feedback in the first place.",
      category: "Customer Experience",
      date: "07/03/2025",
      image: "/blog/formbricks-featured.png",
      slug: "streamlining-customer-feedback-formbricks"
    },
    {
      id: 3,
      title: "How UK Small Businesses Can Turn Customer Feedback into Growth with Metabase",
      description: "As a small business owner in the UK, you're likely wearing many hats – from sales and marketing to operations and finance. With so much on your plate, finding time to understand what's happening in your business can feel impossible. Yet the most successful small businesses are those that make data-informed decisions.",
      category: "Customer Experience",
      date: "28/02/2025",
      image: "/blog/coffee-shop-metabase-feedback.png",
      slug: "customer-feedback-growth-metabase"
    },
    {
      id: 4,
      title: "Introducing the Smart Home Index: The Ultimate Tool for Finding the Perfect IoT Devices",
      description: "In today's rapidly evolving world of smart home technology, choosing the right devices for your home can feel overwhelming. With so many options available, how do you know which smart home gadgets are best suited for your needs?",
      category: "IoT Devices",
      date: "20/10/2024",
      image: "/blog/smarthomeindex-1.png",
      slug: "smart-home-index-ultimate-tool"
    },
    {
      id: 5,
      title: "Frigate NVR Setup: AI-Powered Home Security Made Simple",
      description: "Frigate bills itself as 'a complete and local NVR designed for Home Assistant with AI object detection.' A Network Video Recorder, or NVR, is something you might not be familiar with if you're currently using something like a Ring doorbell.",
      category: "Security",
      date: "25/09/2024",
      image: "/blog/HackerWoman.png",
      slug: "frigate-nvr-setup-ai-security"
    },
    {
      id: 6,
      title: "TrueNAS For Content Creators?",
      description: "As part of our drive to give the right solution to our customers, Tom wrote a post on the use of UNRAID for Content Creators. Unraid isn't the only solution though. We run TrueNAS internally for many reasons, and a tonne of those apply to Content Creators too!",
      category: "Network Storage",
      date: "12/09/2024",
      image: "/blog/truenas-untitled.png",
      slug: "truenas-content-creators"
    }
  ];

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
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                  <Image
                    src={post.image}
                    alt={post.title}
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
                      {post.date}
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