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
          <div className="bg-white rounded-2xl p-12 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--brand-blue)] mb-8">
              Take a closer look...
            </h1>
            
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed max-w-4xl">
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
            <p className="text-white text-xl mb-8">
              Want to see your project featured here?
            </p>
            <Link
              href="/#contact"
              className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors inline-block"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 