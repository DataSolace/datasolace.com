import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-12 pt-24">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Privacy Policy for DataSolace LTD
            </h1>
            <p className="text-gray-600">
              Last updated: 22/07/2024
            </p>
          </header>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                DataSolace LTD (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting the privacy of our clients and
                website visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Personal information (such as name, email address, phone number)</li>
                <li>Business information (company name, job title)</li>
                <li>Technical information (IP address, browser type, device information)</li>
                <li>Usage information (pages visited, time spent on site)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Use of Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to collect and store certain information. 
                Cookies are small data files that are placed on your device when you visit our website.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the following types of cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Essential cookies:</strong> These are necessary for the website to function properly.</li>
                <li><strong>Analytical/performance cookies:</strong> These allow us to recognize and count the number of visitors 
                and see how visitors move around our website.</li>
                <li><strong>Functionality cookies:</strong> These are used to recognize you when you return to our website.</li>
                <li><strong>Targeting cookies:</strong> These record your visit to our website, the pages you have visited, and 
                the links you have followed.</li>
              </ul>
                             <p className="text-gray-700 leading-relaxed mt-4">
                 You can set your browser to refuse all or some browser cookies, or to alert you when websites 
                 set or access cookies. If you disable or refuse cookies, please note that some parts of this 
                 website may become inaccessible or not function properly.
               </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the collected information for purposes including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Providing and improving our services</li>
                <li>Communicating with you about our services</li>
                <li>Analyzing website usage and trends</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Service providers who assist us in operating our business</li>
                <li>Legal and regulatory authorities, when required by law</li>
                <li>Business partners, with your consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal 
                information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to or restrict processing of your information</li>
              </ul>
            </section>

                         <section className="mb-8">
               <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. GDPR Compliance</h2>
               <p className="text-gray-700 leading-relaxed mb-4">
                 For users and clients in the European Union (EU) and European Economic Area (EEA), we comply 
                 with the General Data Protection Regulation (GDPR). Under GDPR, you have additional rights 
                 regarding your personal data, including:
               </p>
               <p className="text-gray-700 leading-relaxed mb-4">
                 - Right to be informed, access, rectification, erasure, restrict processing, data portability, 
                 object, and rights related to automated decision-making.
               </p>
               <p className="text-gray-700 leading-relaxed">
                 We process personal data based on consent, contract, legal obligation, and legitimate 
                 interests. To exercise your rights or lodge a complaint, please contact us using the 
                 information provided in the &quot;Contact Us&quot; section.
               </p>
             </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-700">
                <a href="mailto:privacy@datasolace.com" className="text-green-600 hover:text-green-700 underline">
                  privacy@datasolace.com
                </a>
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 