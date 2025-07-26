import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://datasolace.com'),
  title: "DataSolace - Business & Home Automation Solutions",
  description: "Enterprise automation solutions and luxury home automation that bring comfort, security and efficiency to your spaces.",
  keywords: ["business automation", "home automation", "smart home", "enterprise solutions", "luxury automation", "IoT", "smart technology"],
  authors: [{ name: "DataSolace" }],
  creator: "DataSolace",
  publisher: "DataSolace",
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
    title: 'DataSolace - Business & Home Automation Solutions',
    description: 'Enterprise automation solutions and luxury home automation that bring comfort, security and efficiency to your spaces.',
    images: [
      {
        url: '/social-share.webp',
        width: 1200,
        height: 630,
        alt: 'DataSolace - Business & Home Automation Solutions',
        type: 'image/webp',
      },
      {
        url: '/logo.webp',
        width: 512,
        height: 512,
        alt: 'DataSolace Logo',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@datasolace',
    creator: '@datasolace',
    title: 'DataSolace - Business & Home Automation Solutions',
    description: 'Enterprise automation solutions and luxury home automation that bring comfort, security and efficiency to your spaces.',
    images: ['/social-share.webp'],
  },
  other: {
    'theme-color': '#1e40af',
    'color-scheme': 'light dark',
    'msapplication-TileColor': '#1e40af',
    'msapplication-config': '/browserconfig.xml',
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
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#1e40af' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://datasolace.com',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Business & Home Automation Solutions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
