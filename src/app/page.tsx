export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-900 via-slate-900 to-teal-900">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white text-2xl font-bold">DataSolace</div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-white hover:text-green-400 transition-colors">Services</a>
            <a href="#portfolio" className="text-white hover:text-green-400 transition-colors">Portfolio</a>
            <a href="#blog" className="text-white hover:text-green-400 transition-colors">Blog</a>
            <a href="#appointments" className="text-white hover:text-green-400 transition-colors">Appointments</a>
          </nav>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
            Contact Us
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-12">
            Automate your...
          </h1>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Business Side */}
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                💼 Business
              </h2>
              <p className="text-xl text-white/90 max-w-md mx-auto">
                Enterprise automation solutions that let you scale your business without scaling your problems
              </p>
            </div>

            {/* Life/Home Side */}
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                🏠 Life
              </h2>
              <p className="text-xl text-white/90 max-w-md mx-auto">
                Luxury home automation solutions that bring comfort, security and efficiency to your spaces
              </p>
            </div>
          </div>

          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors">
            💡 Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Let&apos;s Build 🔧 Brilliant Things
          </h2>
          <p className="text-xl text-gray-700 mb-16 max-w-4xl mx-auto">
            We are a trusted partner for Business and Home automation, bringing over a decade of systems design and engineering to those who want to focus on what matters most.
          </p>

          <div className="grid md:grid-cols-2 gap-16 mb-16">
            {/* Business Features */}
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Solutions</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">💼</span>
                  <span className="text-lg text-gray-700">Infrastructure to Enable Business Growth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">💼</span>
                  <span className="text-lg text-gray-700">Eliminate Time Consuming Activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">💼</span>
                  <span className="text-lg text-gray-700">Protect Business Intellectual Property</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">💼</span>
                  <span className="text-lg text-gray-700">Consolidate Systems and Optimise Workflows</span>
                </li>
              </ul>
            </div>

            {/* Home Features */}
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Home Solutions</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🏠</span>
                  <span className="text-lg text-gray-700">Enhanced Home Comfort and Efficiency</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🏠</span>
                  <span className="text-lg text-gray-700">Premises Security and Access Management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🏠</span>
                  <span className="text-lg text-gray-700">Environmental Monitoring and Protection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🏠</span>
                  <span className="text-lg text-gray-700">Unified control and automated daily routines</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors">
              🚀 Automate My Business
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors">
              🚀 Automate My Home
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-slate-800 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text Content */}
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-green-500 mb-6">
                Let&apos;s Work Together!
              </h2>
              <div className="text-white text-xl space-y-2">
                <p>Want to impress guests with a</p>
                <p>home that seems to run itself?</p>
                <p>We&apos;ll show you how!</p>
                <p className="font-semibold mt-4">Get in touch today.</p>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-green-400"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-green-400"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Email (required)</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-green-400"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-green-400"
                    placeholder="+44 20 7946 0958"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="w-4 h-4 text-green-500 bg-white/20 border-white/30 rounded focus:ring-green-400"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-white text-sm">
                    Sign up for news and updates
                  </label>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Message (required)</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-green-400 resize-none"
                    placeholder="Tell us about your automation needs..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
