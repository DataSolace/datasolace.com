import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Documenting Business Processes the Fast Way, Without Microsoft SharePoint",
      description: "Every small business faced that moment: a key employee leaves, taking crucial operational knowledge with them. The isn't just inconvenient—it's costly and risky. Process documentation is the solution, but traditional platforms like SharePoint can be expensive...",
      category: "Customer Experience, Documentation",
      date: "12/03/2025",
      image: "/api/placeholder/600/400?text=Business+Documentation",
      slug: "documenting-business-processes-fast-way"
    },
    {
      id: 2,
      title: "Streamlining Customer Feedback for UK Businesses with Formbricks",
      description: "Discover how Formbricks transforms feedback collection for small UK businesses through adaptive surveys and intelligent question logic. Learn how coffee shops, boutiques, and other businesses can connect with customers more effectively...",
      category: "Customer Experience",
      date: "07/03/2025",
      image: "/api/placeholder/600/400?text=Customer+Feedback",
      slug: "streamlining-customer-feedback-formbricks"
    },
    {
      id: 3,
      title: "How UK Small Businesses Can Turn Customer Feedback into Growth with Metabase",
      description: "Discover how small UK businesses can use Metabase's user-friendly analytics platform to transform customer feedback into actionable insights. Learn how to create repeat customers through data-informed decisions...",
      category: "Customer Experience",
      date: "28/02/2025",
      image: "/api/placeholder/600/400?text=Data+Analytics",
      slug: "customer-feedback-growth-metabase"
    },
    {
      id: 4,
      title: "Introducing the Smart Home Index: The Ultimate Tool for Finding the Perfect IoT Devices",
      description: "DataSolace are excited to introduce the Smart Home Index, a free, comprehensive tool for researching and comparing smart home devices. Whether you're improving the perfect device for your smart home...",
      category: "IoT Devices",
      date: "20/10/2024",
      image: "/api/placeholder/600/400?text=Smart+Home+Index",
      slug: "smart-home-index-ultimate-tool"
    },
    {
      id: 5,
      title: "Frigate NVR Setup: AI-Powered Home Security Made Simple",
      description: "Discover how to set up Frigate, a powerful local Network Video Recorder (NVR) with AI object detection, perfect for busy homeowners who value privacy. This guide walks you through the basics of Frigate...",
      category: "Security",
      date: "25/09/2024",
      image: "/api/placeholder/600/400?text=Security+Camera",
      slug: "frigate-nvr-setup-ai-security"
    },
    {
      id: 6,
      title: "TrueNAS For Content Creators?",
      description: "Discover how TrueNAS compares to Unraid in our latest NAS showdown. We explore TrueNAS's robust data integrity, impressive scalability, and open source complexity. Find out if TrueNAS's advanced features...",
      category: "Network Storage",
      date: "12/09/2024",
      image: "/api/placeholder/600/400?text=Network+Storage",
      slug: "truenas-content-creators"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-900 via-slate-900 to-teal-900">
      <Header currentPage="blog" />

      {/* Blog Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Content */}
          <div className="bg-gradient-to-br from-slate-200 via-slate-100 to-teal-100 rounded-2xl p-12 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
              Latest Insights & Updates
            </h1>
            
            <div className="space-y-6 text-slate-700 text-lg leading-relaxed max-w-4xl">
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
                  <div className="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium px-4 py-2 bg-white/80 rounded">
                      {post.id === 1 ? "📄 Business Documentation" : 
                       post.id === 2 ? "📊 Customer Feedback" :
                       post.id === 3 ? "📈 Data Analytics" :
                       post.id === 4 ? "🏠 Smart Home Index" :
                       post.id === 5 ? "🔒 Security Camera" : "💾 Network Storage"}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-green-600 transition-colors leading-tight mb-3">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.description}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-4">
                    <span className="text-green-600 font-medium text-sm group-hover:text-green-700 transition-colors">
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
              className="text-white hover:text-green-400 transition-colors inline-flex items-center text-xl"
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
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors inline-block"
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