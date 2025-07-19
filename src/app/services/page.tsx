'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Services() {
  return (
    <div className="min-h-screen bg-[var(--brand-blue)]">
      <Header currentPage="services" />

      {/* Main Content */}
      <main className="relative z-10 px-6 py-5">
        <div className="max-w-6xl mx-auto">
          {/* Services Card Container */}
          <div className="bg-white rounded-2xl p-12 shadow-2xl">
            {/* Title */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-[var(--brand-blue)] mb-6">
                Our services
              </h1>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Networking and Infrastructure */}
              <div className="flex flex-col h-full">
                <div className="text-center mb-6">
                  <div className="w-full h-48 bg-[var(--brand-teal)] rounded-lg flex items-center justify-center">
                    <div className="text-white text-6xl">🔌</div>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-[var(--brand-blue)] mb-4 text-center">
                    Networking and Infrastructure
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed text-center flex-grow">
                    From secure Wi-Fi to reliable internet connections, we design and maintain robust networks that keep your business or home connected and operational.
                  </p>
                  <div className="text-center mt-auto">
                    <button className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-6 py-3 rounded-lg transition-colors font-semibold">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

              {/* Home Automation */}
              <div className="flex flex-col h-full">
                <div className="text-center mb-6">
                  <div className="w-full h-48 bg-[var(--brand-teal)] rounded-lg flex items-center justify-center">
                    <div className="text-white text-6xl">🏠</div>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-[var(--brand-blue)] mb-4 text-center">
                    Home Automation
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed text-center flex-grow">
                    Experience the convenience of a connected home. We design and install smart systems for lighting, thermostats, and more, creating a personalized living environment.
                  </p>
                  <div className="text-center mt-auto">
                    <button className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-6 py-3 rounded-lg transition-colors font-semibold">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

              {/* Self Hosted Concierge */}
              <div className="flex flex-col h-full">
                <div className="text-center mb-6">
                  <div className="w-full h-48 bg-[var(--brand-teal)] rounded-lg flex items-center justify-center">
                    <div className="text-white text-6xl">💻</div>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-[var(--brand-blue)] mb-4 text-center">
                    Self Hosted Concierge
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed text-center flex-grow">
                    Advanced self-hosted solutions for busy tech enthusiasts. We handle the setup and maintenance, so you can enjoy cutting-edge apps and services without the time investment or loss of privacy.
                  </p>
                  <div className="text-center mt-auto">
                    <button className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-6 py-3 rounded-lg transition-colors font-semibold">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Smart Home Index Section */}
      <section className="py-5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-12 shadow-2xl">
            {/* Smart Home Index Header */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--brand-blue)] mb-6">
                Smart Home Index
              </h2>
              <div className="mb-8">
                <button className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-6 py-3 rounded-lg transition-colors font-semibold">
                  Go to the Smart Home Index
                </button>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
                In today&apos;s rapidly evolving world of smart home technology, choosing the right devices for your home can feel overwhelming. With so many options available, how do you know which smart home gadgets are best suited for your needs? This is where the Smart Home Index comes in - a free, user-friendly platform that simplifies the process of finding and comparing smart home devices.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Side - Main App Screenshot Placeholder */}
              <div className="space-y-6">
                <div className="w-full h-64 bg-[var(--brand-teal)] rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">📱</div>
                    <div className="text-sm">Smart Home Index Dashboard</div>
                  </div>
                </div>
                {/* Newsletter Signup */}
                <div className="bg-[var(--brand-teal)]/10 border-2 border-[var(--brand-teal)]/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-[var(--brand-blue)] mb-4 text-center">
                    Stay up to date with Smart Home Index updates
                  </h3>
                  <p className="text-gray-700 mb-4 text-center">
                    Sign up with your email address to receive news and updates, including new devices that are added to the Smart Home Index.
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--brand-teal)]"
                    />
                    <button className="bg-[var(--brand-teal)] hover:bg-[var(--brand-green)] text-white px-6 py-2 rounded-lg transition-colors font-semibold">
                      Sign Up
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    We respect your privacy.
                  </p>
                </div>
              </div>

              {/* Right Side - Secondary Screenshots and Content */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-[var(--brand-teal)] rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-2xl mb-1">🔍</div>
                      <div className="text-xs">Search Interface</div>
                    </div>
                  </div>
                  <div className="h-32 bg-[var(--brand-teal)] rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-2xl mb-1">📊</div>
                      <div className="text-xs">Comparison View</div>
                    </div>
                  </div>
                </div>

                <div className="h-48 bg-[var(--brand-teal)] rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl mb-2">💻</div>
                    <div className="text-sm">Detailed Device Analysis</div>
                  </div>
                </div>

                {/* Why We Made It Section */}
                <div>
                  <h3 className="text-2xl font-bold text-[var(--brand-blue)] mb-4">
                    Why did we make the Smart Home Index?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Search engines like Google and Amazon have become increasingly ineffective for finding smart home devices. The results are often skewed by sponsored products, making it difficult to find unbiased recommendations when wading through irrelevant listings. Additionally, vendors use inconsistent terminology, which makes comparing products across different brands a frustrating experience. With the wide variety of conflicting standards and smart home ecosystems, finding devices that truly fit your setup can be a daunting task. The Smart Home Index addresses these challenges by providing a clear, unbiased platform to search, compare, and choose the best devices for your smart home.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    At DataSolace we are looking to further the accessibility of Smart Homes, so building a clear and accurate feature index was an essential step in this mission.
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-3xl font-bold text-[var(--brand-blue)] mb-2">
                    Filter, Find, Learn, Compare
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Statement Section */}
      <section className="py-5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-12 shadow-2xl">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--brand-blue)] leading-relaxed">
                We understand the unique needs of small businesses, startups, and high net worth individuals. Let us take care of your IT infrastructure, so you can{' '}
                <span className="relative">
                  focus on what you do best.
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--brand-teal)]"></div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 