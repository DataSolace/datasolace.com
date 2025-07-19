import Link from 'next/link';

export default function Portfolio() {
  const caseStudies = [
    {
      id: 1,
      title: "Case Study: Safeguarding Tenants And Protecting Rental Properties From Damp",
      image: "/api/placeholder/600/400?text=Hand+on+Rainy+Window",
      slug: "safeguarding-tenants-damp-protection"
    },
    {
      id: 2,
      title: "Case Study: Illuminating Independence - A Smart Home Solution for enhanced Mobility",
      image: "/api/placeholder/600/400?text=Hanging+Light+Bulbs",
      slug: "illuminating-independence-smart-home"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-900 via-slate-900 to-teal-900">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white text-2xl font-bold">DataSolace</Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-white hover:text-green-400 transition-colors">Services</Link>
            <Link href="/portfolio" className="text-green-400 font-semibold transition-colors">Portfolio</Link>
            <Link href="/blog" className="text-white hover:text-green-400 transition-colors">Blog</Link>
            <a href="#appointments" className="text-white hover:text-green-400 transition-colors">Appointments</a>
          </nav>
          <Link href="/#contact" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
            Contact Us
          </Link>
        </div>
      </header>

      {/* Portfolio Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Content */}
          <div className="bg-gradient-to-br from-slate-200 via-slate-100 to-teal-100 rounded-2xl p-12 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">
              Take a closer look...
            </h1>
            
            <div className="space-y-6 text-slate-700 text-lg leading-relaxed max-w-4xl">
              <p>
                Here are some of our favourite DataSolace projects. Every client presents a
                distinct set of challenges and specifications, so we work closely with them
                to cater to their unique needs.
              </p>
              
              <p>
                No two projects are identical, but using our industry gained experience we
                ensure that every installation puts security and reliability first.
              </p>
            </div>
          </div>

          {/* Case Studies Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <Link
                key={study.id}
                href={`/portfolio/${study.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium px-4 py-2 bg-white/80 rounded">
                      {study.id === 1 ? "🌧️ Hand on Rainy Window" : "💡 Hanging Light Bulbs"}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-green-600 transition-colors leading-tight">
                    {study.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-white text-xl mb-8">
              Want to see your project featured here?
            </p>
            <Link
              href="/#contact"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors inline-block"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 