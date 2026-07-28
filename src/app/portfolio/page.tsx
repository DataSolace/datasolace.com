import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Portfolio() {
  const caseStudies = [
    {
      id: 1,
      title: "Case Study: Safeguarding Tenants And Protecting Rental Properties From Damp",
      image: "/hands_on_a_window.webp",
      slug: "safeguarding-tenants-damp-protection"
    },
    {
      id: 2,
      title: "Case Study: Illuminating Independence - A Smart Home Solution for enhanced Mobility",
      image: "/lightbulbs.webp",
      slug: "illuminating-independence-smart-home"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--brand-blue)]">
      <Header currentPage="portfolio" />

      {/* Portfolio Section */}
      <section className="py-20 px-6 pt-32">
        <div className="max-w-6xl mx-auto">
          {/* Header Content */}
          <div className="bg-white rounded-2xl p-8 sm:p-12 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--brand-blue)] mb-8 text-balance">
              Work we can show.
            </h1>

            <div className="space-y-6 text-[#374151] text-lg leading-relaxed max-w-[65ch]">
              <p>
                Most of what we build for businesses is confidential — clients
                aren&apos;t named and their systems aren&apos;t shown. What we can share
                in full are these two projects from our residential systems
                practice, where DataSolace started.
              </p>

              <p>
                The setting is different from the work we do today; the
                discipline isn&apos;t. Understand how things actually run, measure
                honestly, automate only what earns its keep, and keep the
                system working long after installation.
              </p>
            </div>
          </div>

          {/* Case Studies Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <Link
                key={study.id}
                href={`/portfolio/${study.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--brand-blue)] group-hover:text-[var(--brand-teal)] transition-colors leading-tight">
                    {study.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-[var(--brand-white)]/90 text-xl mb-8">
              The same discipline, pointed at your admin.
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