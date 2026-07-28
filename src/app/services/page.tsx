import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Process mapping, systems integration, custom internal tools, and managed hosting for UK small businesses — designed, built, and run by the same people.',
};

const capabilities = [
  {
    title: 'Process mapping & documentation',
    body: 'Every engagement starts here. We sit with the people who run the work and write down how it really moves — who touches it, where it stalls, what lives only in someone’s head.',
    examples: [
      'A written map of how an enquiry becomes an invoice, including the exceptions',
      'Handover notes and checklists that don’t depend on one person’s memory',
      'A record you can train new starters from',
    ],
  },
  {
    title: 'Systems integration',
    body: 'Your inbox, forms, spreadsheets, and job records already hold the information. We connect the tools you’ve already chosen so records move between them on their own.',
    examples: [
      'Enquiries from email, phone, and web forms logged in one place',
      'Customer details that flow from quote to booking to invoice without retyping',
      'Reminders and chase-ups triggered by what’s actually happening, not by memory',
    ],
  },
  {
    title: 'Custom internal tools',
    body: 'When nothing off the shelf fits how you work, we build the missing piece — shaped around your process, not the other way round.',
    examples: [
      'A job sheet your team fills in on site from a phone',
      'A dashboard showing where every job sits today',
      'A portal where customers check progress without ringing the office',
    ],
  },
  {
    title: 'Hosting & infrastructure',
    body: 'We run what we build. Hosting, backups, monitoring, updates, and the networks the work happens on — maintained by the people who designed the system, including self-hosted setups where your data stays on equipment you control.',
    examples: [
      'Systems hosted, backed up, and monitored without you thinking about them',
      'Self-hosted options where privacy or ownership of your data matters',
      'Secure, reliable networking in the places the work actually happens',
    ],
  },
];

const engagementSteps = [
  {
    step: '1',
    title: 'Map the process',
    body: 'A direct conversation, then time spent watching how the work actually runs. We write it down and agree what should change before proposing any system.',
  },
  {
    step: '2',
    title: 'Build the system',
    body: 'We connect the tools you already use and build what’s missing, testing against real jobs — not a demo dataset.',
  },
  {
    step: '3',
    title: 'Keep it running',
    body: 'We host and maintain what we deliver. When something needs changing, you talk to the people who built it.',
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[var(--brand-blue)]">
      <Header currentPage="services" />

      <main className="relative z-10 px-6 py-5 pt-36">
        <div className="max-w-6xl mx-auto">
          {/* Capabilities */}
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-2xl">
            <div className="max-w-2xl mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-[var(--brand-blue)] mb-6 text-balance">
                What we automate.
              </h1>
              <p className="text-xl leading-relaxed text-[#374151]">
                Four things, done properly: understanding how your work runs,
                connecting the tools that carry it, building what&apos;s missing,
                and keeping all of it running. No named clients appear below —
                our client work is confidential — so we describe the work
                itself, specifically.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
              {capabilities.map((cap) => (
                <div key={cap.title}>
                  <h2 className="text-2xl font-bold text-[var(--brand-blue)] mb-3">
                    {cap.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-[#374151] max-w-[52ch] mb-4">
                    {cap.body}
                  </p>
                  <p className="text-sm font-semibold text-[#4B5563] mb-2">
                    What that looks like
                  </p>
                  <ul className="space-y-2">
                    {cap.examples.map((example) => (
                      <li key={example} className="flex items-start gap-2.5 text-[#374151] leading-relaxed">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 w-1.5 h-1.5 flex-shrink-0 rounded-full bg-[var(--brand-teal)]"
                        />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* How an engagement runs */}
      <section className="py-5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--brand-blue)] mb-12 text-balance">
              How an engagement runs
            </h2>
            <ol className="grid md:grid-cols-3 gap-10">
              {engagementSteps.map((item) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-9 h-9 rounded-full border-2 border-[var(--brand-teal)] text-[var(--brand-blue)] font-bold grid place-items-center"
                  >
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--brand-blue)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#374151] leading-relaxed">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Build proof: Smart Home Index */}
      <section className="py-5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[var(--brand-blue)] mb-6 text-balance">
                  Something we built and run
                </h2>
                <p className="text-lg leading-relaxed text-[#374151] mb-4 max-w-[58ch]">
                  Smart Home Index is a free, live device-comparison platform we
                  designed, built, and operate ourselves. Thousands of devices,
                  modelled consistently so they can actually be compared —
                  running in production, maintained by us.
                </p>
                <p className="text-lg leading-relaxed text-[#374151] mb-8 max-w-[58ch]">
                  It&apos;s the same discipline we bring to client systems: careful
                  data modelling, honest search and comparison, and
                  infrastructure that stays up.
                </p>
                <a
                  href="https://smarthomeindex.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-6 py-3.5 rounded-lg text-xl font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-blue)]"
                >
                  Visit Smart Home Index
                </a>
              </div>
              <div className="relative">
                <div className="max-w-md">
                  <Image
                    src="/SHI-device-select.webp"
                    alt="Smart Home Index device selection screen listing comparable smart home devices"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg shadow-xl"
                  />
                </div>
                <div className="max-w-md ml-10 lg:ml-16 -mt-6 relative z-10">
                  <Image
                    src="/SHI-device-compare.webp"
                    alt="Smart Home Index side-by-side device comparison screen"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-5 pb-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-2xl">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-blue)] mb-4 text-balance">
                Small enough to know your process. Capable enough to run it.
              </h2>
              <p className="text-lg leading-relaxed text-[#374151] mb-8">
                Tell us about the admin that keeps landing back on your desk,
                and we&apos;ll tell you honestly what&apos;s worth automating.
              </p>
              <Link
                href="/appointments"
                className="inline-block bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-8 py-4 rounded-lg text-xl font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-blue)]"
              >
                Book an intro call
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
