import Link from 'next/link';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

// Portfolio case study data
const portfolioItems = {
  'safeguarding-tenants-damp-protection': {
    title: "Safeguarding Tenants And Protecting Rental Properties From Damp",
    heroImage: "/hands_on_a_window.webp",
    excerpt: "Taking a proactive approach to environmental health and the conditions that lead to damp.",
    date: "December 2024",
    author: "DataSolace Team",
    content: `
This valued client approached us looking for a monitoring solution for 2 rental properties in Stockport. The properties were showing signs of damp and condensation and the landlord needed to understand if tenants were taking enough action before proceeding with costly construction remediations.

Damp complaints can be distressing for tenants, leading to health issues and concerns about their right to a safe, dry home. Understanding the root cause is crucial for both tenant wellbeing and property protection.

## The Problem

In 2019, 3% of households had damp, with many more cases unreported. Types of damp include 'rising damp', 'penetrating damp', and 'serious condensation or mould'.

The fall in damp instances over 20 years is due to improved building standards, but older builds remain susceptible. This creates severe consequences for both tenants and property owners.

## The DataSolace Solution

DataSolace specialises in integrating sensors for temperature, humidity, and window contact to detect moisture levels and enable data-driven decisions.

The client's properties are 1970's semi-detached homes with limited sunlight, making them particularly susceptible to damp, especially in the bathroom and kitchen areas.

We installed sensors in problematic rooms and intermediate spaces. When thresholds are exceeded, the system alerts both tenants and landlords for prompt action.

## What You Can Do to Prevent Damp and Mould

- Cover pans when cooking
- Use extractor fans in kitchens and bathrooms
- Close internal doors when you cook or shower
- Leave a gap between furniture and external walls
- Dry clothes outdoors or use a vented tumble dryer
- Open bedroom windows for 5-10 minutes when you get up

Customizable dashboards allow both tenants and landlords to monitor conditions and visualize trends over time. Customizable notifications provide clear instructions on how to address alerts, helping maintain a healthy living environment and reducing long-term costs.

Despite the tenant's efforts, one property's humidity was still excessive, leading to a decision for construction measures to improve natural ventilation.

## Conclusion

As a property owner, you have the power to make a positive impact on the lives of your tenants while also safeguarding your investment. By embracing environmental sensors and automation systems, you can create a healthier, more sustainable living environment that benefits everyone - from tenants to landlords and beyond.
    `
  },
  'illuminating-independence-smart-home': {
    title: "Illuminating Independence - A Smart Home Solution for Enhanced Mobility",
    heroImage: "/lightbulbs.webp",
    excerpt: "Smart home technology at its best: solving real problems, enhancing safety, and improving quality of life with thoughtful automation.",
    date: "December 2024",
    author: "DataSolace Team",
    content: `
Smart home technology at its best: solving real problems, enhancing safety, and improving quality of life with thoughtful automation.

Meet Sophie, a young woman with cerebral palsy who uses a wheelchair or walker. Sophie's family approached DataSolace after she experienced several falls while trying to access light switches in her home. The challenge was clear: create a lighting system that would enhance Sophie's safety and independence without disrupting her daily routine or requiring complex interactions.
## The Challenge

- Safety Concerns: Sophie was at risk of falls when reaching for light switches
- Independence Limitations: Traditional switches were difficult to access from her wheelchair
- Dual-Use Requirements: The system needed to work for both Sophie and her family members
- Seamless Integration: The solution had to blend naturally with their existing home environment

## The DataSolace Solution

We implemented a comprehensive smart home lighting system using Sonoff ZEMINI devices controlled through a Home Assistant platform. The system features Everything Presence Lite sensors for precise motion detection and zone calibration, ensuring lights respond accurately to Sophie's movements.

The solution includes circadian lighting features that automatically adjust brightness and color temperature throughout the day, creating a more natural and comfortable environment. All devices are locally controlled, ensuring privacy and reliability without dependence on cloud services.

## Implementation Process

The entire installation was completed in a single day, with most preparation work done off-site. Our team carefully placed sensors in strategic locations throughout Sophie's home, then spent time fine-tuning the system with her direct input to ensure it met her specific needs.

We provided comprehensive orientation for Sophie's care team, ensuring everyone understood how to use and maintain the system. The installation was minimally disruptive, with no major construction or wiring changes required.

## Results & Benefits

The new lighting system has significantly reduced Sophie's fall risk by eliminating the need to reach for switches. Enhanced safety features include automatic lighting when she enters rooms and the ability to control lights remotely through the Home Assistant interface.

An unexpected benefit was the improvement to Sophie's multi-room audio system, which was integrated into the same Home Assistant platform. The local-first approach ensures all data stays private and the system remains functional even without internet connectivity.

## Client Testimonial

"The lighting system has made such a difference in my daily life. I feel much safer moving around my home, and I love that I can control everything from my phone. The audio system upgrade was a wonderful surprise too!" - Sophie

## Key Takeaways

This project highlights several important principles for successful smart home implementations:

1. Local-First Approach: Privacy and reliability through local control
2. Minimal Disruption: Installation completed without major home modifications
3. Focused Solutions: Addressing specific needs rather than implementing unnecessary features
4. Accessibility Through Simplicity: Intuitive controls that work for everyone
5. Self-Hosted Security: Complete control over data and system functionality

## Conclusion

Smart home technology is not just about convenience—it's about creating an environment that supports independence and enhances quality of life. By implementing intelligent lighting solutions, we can help individuals maintain their autonomy while providing peace of mind for caregivers and family members.
    `
  }
};

export default async function PortfolioItem({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = portfolioItems[slug as keyof typeof portfolioItems];
  
  if (!item) {
    return (
      <div className="min-h-screen bg-[var(--brand-blue)]">
        <Header currentPage="portfolio" />
        <div className="pt-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-8">Portfolio Item Not Found</h1>
            <Link href="/portfolio" className="bg-[var(--brand-teal)] text-white px-6 py-3 rounded-lg">
              Back to Portfolio
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isFirstItem = slug === 'safeguarding-tenants-damp-protection';
  const nextItem = isFirstItem ? 'illuminating-independence-smart-home' : 'safeguarding-tenants-damp-protection';
  const nextItemData = portfolioItems[nextItem as keyof typeof portfolioItems];

  return (
    <div className="min-h-screen bg-[var(--brand-blue)]">
      <Header currentPage="portfolio" />

            {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <Image
            src={item.heroImage}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 pt-20">
          <div className="mb-6">
            <span className="text-white/80 text-lg">{item.date}</span>
            <span className="text-white/60 mx-2">•</span>
            <span className="text-white/80 text-lg">{item.author}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {item.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl leading-relaxed">
            {item.excerpt}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Portfolio Content */}
          <div className="bg-white rounded-2xl p-12 mb-16">
            <div className="prose prose-lg max-w-none">
              {item.content.split('\n\n').map((paragraph: string, index: number) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;
                
                // Handle headings (## Heading)
                if (trimmed.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-3xl font-bold text-[var(--brand-blue)] mb-6 mt-12 first:mt-0">
                      {trimmed.replace('## ', '')}
                    </h2>
                  );
                }
                
                // Handle lists (lines starting with -)
                if (trimmed.includes('\n- ')) {
                  const lines = trimmed.split('\n');
                  const title = lines[0];
                  const listItems = lines.slice(1).filter(line => line.trim().startsWith('- '));
                  
                  return (
                    <div key={index}>
                      {title && (
                        <p className="text-gray-700 text-lg leading-relaxed mb-4">
                          {title}
                        </p>
                      )}
                      <div className="bg-[var(--brand-teal)] rounded-xl p-8 mb-8">
                        <ul className="grid md:grid-cols-2 gap-4">
                          {listItems.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start space-x-3">
                              <span className="text-white text-lg mt-1">•</span>
                              <span className="text-white/90">{item.replace('- ', '')}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                }
                
                // Regular paragraphs
                return (
                  <p key={index} className="text-gray-700 text-lg leading-relaxed mb-6">
                    {trimmed}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-2xl p-12 mb-16 text-center">
            <Link
              href="/#contact"
              className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors inline-block"
            >
              Get in touch with us to discuss your property automation issues
            </Link>
          </div>

          {/* Next Portfolio Item */}
          <div className="bg-white rounded-2xl p-8">
            <Link
              href={`/portfolio/${nextItem}`}
              className="flex items-center justify-between group"
            >
              <div>
                <p className="text-gray-600 text-sm">Next Portfolio Item</p>
                <h3 className="text-xl font-semibold text-[var(--brand-blue)] group-hover:text-[var(--brand-teal)] transition-colors">
                  {nextItemData.title}
                </h3>
              </div>
              <span className="text-[var(--brand-teal)] text-2xl group-hover:translate-x-2 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 