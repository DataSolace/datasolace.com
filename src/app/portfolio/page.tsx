import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

/*
 * DRAFT — PENDING CLIENT PERMISSION
 * The client website case studies below name real clients and show their
 * sites. Do not merge to main until both clients have consented to being
 * featured. Tracked in the PR description.
 */

const clientWork = [
  {
    id: 'barkbuddiez',
    title: "BarkBuddiez — enquiries that arrive with the dog's details",
    subtitle: 'One-to-one dog grooming, Cranwell, Lincolnshire',
    image: '/portfolio-barkbuddiez.jpeg',
    slug: 'barkbuddiez-dog-grooming',
  },
  {
    id: 'caras-kitchen',
    title: "Cara's Kitchen — a market stall with a permanent address",
    subtitle: 'Handmade chutneys and jams, Lincolnshire',
    image: '/portfolio-caras-kitchen.jpeg',
    slug: 'caras-kitchen',
  },
];

const residentialWork = [
  {
    id: 1,
    title: 'Case Study: Safeguarding Tenants And Protecting Rental Properties From Damp',
    image: '/hands_on_a_window.webp',
    slug: 'safeguarding-tenants-damp-protection',
  },
  {
    id: 2,
    title: 'Case Study: Illuminating Independence - A Smart Home Solution for enhanced Mobility',
    image: '/lightbulbs.webp',
    slug: 'illuminating-independence-smart-home',
  },
];

export default function Portfolio() {
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
                The systems we build inside businesses stay confidential —
                clients aren&apos;t named and their tools aren&apos;t shown. But some of
                our work is public by design: the websites below are live
                client sites you can visit right now, each one the front door
                of a real business process.
              </p>

              <p>
                Further down are two projects from our residential systems
                practice, where DataSolace started — a different setting, the
                same discipline.
              </p>
            </div>
          </div>

          {/* Client Websites */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Websites for clients
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {clientWork.map((work) => (
              <Link
                key={work.id}
                href={`/portfolio/${work.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={work.image}
                    alt={`Screenshot of the ${work.title.split(' — ')[0]} website`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300 motion-reduce:transform-none"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--brand-blue)] group-hover:text-[var(--brand-teal)] transition-colors leading-tight mb-2">
                    {work.title}
                  </h3>
                  <p className="text-sm text-[#4B5563]">{work.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Residential heritage */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            From the residential practice
          </h2>
          <p className="text-[var(--brand-white)]/80 text-lg mb-8 max-w-[65ch]">
            Earlier DataSolace work — the engineering discipline behind the
            small business offer.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {residentialWork.map((study) => (
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
                    className="object-cover group-hover:scale-105 transition-transform duration-300 motion-reduce:transform-none"
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
