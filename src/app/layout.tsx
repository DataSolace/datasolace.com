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
    default: "DataSolace - Business & Home Automation Solutions | UK",
    template: "%s | DataSolace"
  },
  description: "Transform your business and home with cutting-edge automation solutions. From enterprise infrastructure to luxury smart homes, we deliver bespoke automation that scales with your needs. Based in the UK, serving clients worldwide.",
  keywords: [
    "business automation",
    "home automation",
    "smart home",
    "enterprise solutions",
    "luxury automation",
    "IoT",
    "smart technology",
    "UK automation",
    "business infrastructure",
    "home security",
    "smart building",
    "automation consulting",
    "systems integration",
    "workflow automation"
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
    title: 'DataSolace - Business & Home Automation Solutions | UK',
    description: 'Transform your business and home with cutting-edge automation solutions. From enterprise infrastructure to luxury smart homes, we deliver bespoke automation that scales with your needs.',
    images: [
      {
        url: '/logo.webp',
        width: 512,
        height: 512,
        alt: 'DataSolace - Business & Home Automation Solutions',
        type: 'image/webp',
      },
      {
        url: '/SHI-hotpotAI_1920_1200.webp',
        width: 1920,
        height: 1200,
        alt: 'DataSolace Automation Solutions',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@datasolace',
    creator: '@datasolace',
    title: 'DataSolace - Business & Home Automation Solutions | UK',
    description: 'Transform your business and home with cutting-edge automation solutions. From enterprise infrastructure to luxury smart homes.',
    images: ['/SHI-hotpotAI_1920_1200.webp'],
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
  classification: 'Business & Home Automation Solutions',
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
        {/* Preload critical resources */}
        <link rel="preload" href="/logo.webp" as="image" type="image/webp" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

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
              "description": "Transform your business and home with cutting-edge automation solutions. From enterprise infrastructure to luxury smart homes, we deliver bespoke automation that scales with your needs.",
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
                "name": "Automation Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Business Automation",
                      "description": "Enterprise automation solutions including infrastructure, workflow optimisation, and systems integration"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Home Automation",
                      "description": "Luxury home automation solutions for comfort, security, and efficiency"
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
              "description": "UK-based automation solutions provider for businesses and homes",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GB"
              },
              "telephone": "+44",
              "email": "contact@datasolace.com",
              "priceRange": "££",
              "currenciesAccepted": "GBP",
              "paymentAccepted": "Cash, Credit Card, Bank Transfer",
              "areaServed": {
                "@type": "Country",
                "name": "United Kingdom"
              },
              "serviceType": ["Business Automation", "Home Automation", "Systems Integration"],
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
