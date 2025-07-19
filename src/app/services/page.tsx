'use client';

import Link from 'next/link';

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-900 via-slate-900 to-teal-900">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white text-2xl font-bold">DataSolace</Link>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/services" className="text-white hover:text-green-400 transition-colors">Services</a>
            <a href="#portfolio" className="text-white hover:text-green-400 transition-colors">Portfolio</a>
            <a href="#blog" className="text-white hover:text-green-400 transition-colors">Blog</a>
            <a href="#appointments" className="text-white hover:text-green-400 transition-colors">Appointments</a>
          </nav>
          <Link href="/#contact" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
            Contact Us
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Services Card Container */}
          <div className="bg-white rounded-2xl p-12 shadow-2xl">
            {/* Title */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Our services
              </h1>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Networking and Infrastructure */}
              <div className="flex flex-col h-full">
                <div className="text-center mb-6">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <div className="text-white text-6xl">🔌</div>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Networking and Infrastructure
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed text-center flex-grow">
                    From secure Wi-Fi to reliable internet connections, we design and maintain robust networks that keep your business or home connected and operational.
                  </p>
                  <div className="text-center mt-auto">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

              {/* Home Automation */}
              <div className="flex flex-col h-full">
                <div className="text-center mb-6">
                  <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                    <div className="text-white text-6xl">🏠</div>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Home Automation
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed text-center flex-grow">
                    Experience the convenience of a connected home. We design and install smart systems for lighting, thermostats, and more, creating a personalized living environment.
                  </p>
                  <div className="text-center mt-auto">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>

              {/* Self Hosted Concierge */}
              <div className="flex flex-col h-full">
                <div className="text-center mb-6">
                  <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <div className="text-white text-6xl">💻</div>
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Self Hosted Concierge
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed text-center flex-grow">
                    Advanced self-hosted solutions for busy tech enthusiasts. We handle the setup and maintenance, so you can enjoy cutting-edge apps and services without the time investment or loss of privacy.
                  </p>
                  <div className="text-center mt-auto">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Bottom Statement Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-teal-200 to-green-200 rounded-2xl p-12 shadow-2xl">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed">
                We understand the unique needs of small businesses, startups, and high net worth individuals. Let us take care of your IT infrastructure, so you can{' '}
                <span className="relative">
                  focus on what you do best.
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500"></div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 