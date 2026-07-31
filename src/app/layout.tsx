import type { Metadata, Viewport } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://datasolace.com'),
  title: {
    default: "DataSolace - Small Business Process Automation | UK",
    template: "%s | DataSolace"
  },
  description: "Owner-led process automation for UK small businesses. We map how your work actually runs, connect the tools you already use, build what's missing, and keep it all running.",
  keywords: [
    "small business automation",
    "process automation",
    "process mapping",
    "business process documentation",
    "systems integration",
    "workflow automation",
    "custom internal tools",
    "business admin automation",
    "UK automation",
    "self-hosted business systems",
    "automation consulting"
  ],
  authors: [{ name: "DataSolace Ltd", url: "https://datasolace.com" }],
  creator: "DataSolace Ltd",
  publisher: "DataSolace Ltd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://datasolace.com',
    siteName: 'DataSolace',
    title: 'DataSolace - Small Business Process Automation | UK',
    description: 'Owner-led process automation for UK small businesses. We map how your work actually runs, connect the tools you already use, build what\'s missing, and keep it all running.',
    images: [
      {
        url: '/logo.webp',
        width: 512,
        height: 512,
        alt: 'DataSolace - Small Business Process Automation',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: '@datasolace',
    creator: '@datasolace',
    title: 'DataSolace - Small Business Process Automation | UK',
    description: 'Owner-led process automation for UK small businesses. We map the work, build the system, and keep it running.',
    images: ['/logo.webp'],
  },
  other: {
    'theme-color': '#1D2D46',
    'color-scheme': 'light dark',
    'msapplication-TileColor': '#1D2D46',
    'msapplication-config': '/browserconfig.xml',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'DataSolace',
    'application-name': 'DataSolace',
    'mobile-web-app-capable': 'yes',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#1D2D46' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://datasolace.com',
  },
  category: 'technology',
  classification: 'Small Business Process Automation',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Umami analytics (self-hosted, cookieless) — no SRI by design, see platform repo products/analytics/umami/README.md */}
        <script
          defer
          src="https://insights.datasolace.com/script.js"
          data-website-id="23e799f5-18de-433d-a379-0ac9edf6750e"
        />

        {/* Structured Data for Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DataSolace Ltd",
              "url": "https://datasolace.com",
              "logo": "https://datasolace.com/logo.webp",
              "description": "Owner-led process automation for UK small businesses: process mapping and documentation, systems integration, custom internal tools, and managed hosting.",
              "foundingDate": "2024",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GB"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://www.linkedin.com/company/datasolace",
                "https://twitter.com/datasolace",
                "https://www.instagram.com/datasolace"
              ],
              "serviceArea": {
                "@type": "Country",
                "name": "United Kingdom"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Process Automation Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Process Mapping & Documentation",
                      "description": "Observing how the work actually runs and writing it down so it stops depending on memory"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Systems Integration",
                      "description": "Connecting existing tools, APIs, and data flows so records move between systems without retyping"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Custom Internal Tools",
                      "description": "Bespoke apps, forms, dashboards, and portals built around a specific workflow"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Hosting & Infrastructure",
                      "description": "Running and maintaining delivered systems, including self-hosting, backups, and ongoing support"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* Additional Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "DataSolace Ltd",
              "url": "https://datasolace.com",
              "logo": "https://datasolace.com/logo.webp",
              "description": "Owner-led process automation partner for UK small businesses",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GB"
              },
              "email": "contact@datasolace.com",
              "priceRange": "££",
              "currenciesAccepted": "GBP",
              "paymentAccepted": "Cash, Credit Card, Bank Transfer",
              "areaServed": {
                "@type": "Country",
                "name": "United Kingdom"
              },
              "serviceType": ["Process Mapping & Documentation", "Systems Integration", "Custom Internal Tools", "Hosting & Infrastructure"],
              "openingHours": "Mo-Fr 09:00-17:00"
            })
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
