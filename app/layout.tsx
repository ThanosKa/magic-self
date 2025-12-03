import type React from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import { WebVitals } from "@/components/web-vitals";
import { SITE_CONFIG } from "@/lib/config";
import "./globals.css";

const siteUrl = SITE_CONFIG.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/icon",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: siteUrl,
    logo: `${siteUrl}/icon`,
    description: SITE_CONFIG.description,
    sameAs: [SITE_CONFIG.githubUrl],
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <Script
            id="organization-schema"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
          />
          <Script
            id="bmc-widget"
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
            data-name="BMC-Widget"
            data-cfasync="false"
            data-id="thaka"
            data-description="Support me on Buy me a coffee!"
            data-message=""
            data-color="#5F7FFF"
            data-position="Right"
            data-x_margin="18"
            data-y_margin="18"
            strategy="lazyOnload"
          />
        </head>
        <body
          className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
        >
          <ReactQueryProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </ReactQueryProvider>
          <WebVitals />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
